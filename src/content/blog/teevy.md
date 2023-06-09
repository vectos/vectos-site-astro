---
pubDate: "2016-05-31"
banner: "/img/blog/teevy/teevy_logo.png"
title: "Building a REST/JSON web service using a pure functional programming language"
description: "Haskell in production: A REST/JSON web service built with aeson, postgresql-simple, scotty and configurator."
---

In 2016 I joined a few friends who were working on a little hobby project. We were creating a website that allowed you to track the progression of your favorite television series. The project was called Teevy.

![A logged in user at teevy.co](/img/blog/teevy/teevy_webapp.png)

The goal was to develop a Minimal Viable Product (MVP) first. We had no real business model for it, we were just passionate about what we do and this was just a hobby project for us to try new things.

In the next few minutes, I want to tell you about my journey creating a REST/JSON backend for Teevy with a pure functional programming language called Haskell.

## Haskell, a pure functional programming language

Haskell, you say? Yes, Haskell. I didn't know that much Haskell at that time. I read some books about it, and I just wanted to give it a go and _learn_ it by applying it. So what are some nice properties of functional programming and Haskell?

### Types

Types are an important recipe for Haskell and functional programming. They allow us to exactly capture what a function should accept as input and will give as output. They also describe how data structures look like.

Types can assure you that you are using the right shapes. This is, in fact, some sort of test. Some languages remove the need for a lot of tests by using expressive types (for example vectors and matrices which have their dimensions included in the type). Also, typing makes refactoring a lot easier, since the compiler will tell you when you are using the wrong shape.

Opposed to dynamic languages which will let you know that you've made an error at runtime. To cover that usually, a lot of tests are written (which also need to be refactored after a refactoring) to avoid such errors.

### Side effects

In pure functional programming, all (side) effects are captured and are handled explicitly. Examples of effects are optional values (Option/Maybe), asynchronous values (IO/Future/Task), disjunction values (Either), concurrent values (STM), modification of values, etc.

The advantage is that you will handle all effects explicitly and therefore it reduces the risk of having a bug in your program. A well-known problem with a C# and Java programs is having the null pointer exception at runtime in your program. In that case, the program references to an unset reference in memory, causing the program to terminate. This might be okay if you have set up an exception handler, but mapping this error to a good human-readable error requires you rethrow exceptions and write lots of boilerplate. And what if you have two or more potential null cases in your program? Yes, it will be a mess. Also, these functions which do not handle these side effects explicitly do not compose.

What do I mean by this? Programs **without** explicit side effects can do things in between which might not give the same outcome every time. A pure expression like `1 + 1` will output `2` every time. In other words, create programs that are a bunch of expressions instead of a bunch of statements. Expressions compose!

### Type classes

A type class is a common structure, like an interface. But it is ad-hoc (that's why we call it a type class instance) and can abstract over high-kinded types (`Maybe a` is a higher kinded type, it takes one type parameter to create a fully constructed type).

The most well-known type classes in Haskell and functional programming are Functor, Monoid, Monad, Applicative, etc.

For example, we can have a Functor (which offers a map function) instance for an optional value and asynchronous values.

### Composition, composition and composition

Everywhere you look in functional programming, you will see **composition**. Functions compose, functors compose, applicatives compose, lenses compose, natural transformations compose, contravariant functors compose, etc. When you dig deeper you'll see it everywhere. In the end, when we are programming we decompose problems in small parts and compose them together to form a program.

### The ecosystem

Almost all libraries written in Haskell can be found on [hackage](http://hackage.haskell.org/). Ranging from database drivers, web servers, parser libraries to numerical computing. Also, the documentation of any library is very easy to comprehend. Some libraries I've used for Teevy are:

- Aeson: JSON encoding/decoding
- Postgresql-simple: Database access
- Scotty: Sinatra-like web framework
- Configurator: For loading configuration
- JWT: JSON Web Tokens for authentication

You can use cabal to install these packages, which I did back then. Nowadays you would use something like stack to manage your build (which uses cabal underneath).

## Creating a web service

So what do we need to build a _simple_ web service?

- Web server
- JSON encoding/decoding
- Database access
- Loading a configuration file

Let's start with the data part.

### Dealing with data

To create a web service, you'll need to define data types and create type class instances which can:

- Encode/decode JSON
- Persist these types to database
- Load data from the database

#### Our data

Let's pretend we are dealing with a user, just to keep things simple. Here's the definition of the user data record.

```haskell
data User = User { name :: String, fileQuota :: Int }
```

#### JSON

I've used the [aeson](https://hackage.haskell.org/package/aeson) library to work with JSON. An example of a JSON decoder type class instance for a user looks like this (if you write it out by hand).

```haskell
instance FromJSON User where
    parseJSON (Object v) = User <$>
                           v .: "name" <*>
                           v .: "fileQuota"
    -- A non-Object value is of the wrong type, so fail.
    parseJSON _          = empty
```

The symbols `<$>` and `<*>` are just functions. I won't go much into detail, but these functions are related to Functor and Applicative constructs in functional programming. Aeson and Haskell can automatically derive the type class instance for the type `User`. Removing the need to write this boilerplate. Something like this:

```haskell
instance FromJSON User
```

Finally we can use a `decode` function defined as `decode :: FromJSON a => ByteString -> Maybe a`. As you can see the generic parameter `a` requires you to have type class instance in scope of `FromJSON`. If that's the case, it will take `ByteString` and converts it into an optional value `Maybe a`.

This a great example of type classes (decoder type class) and explicit effects (returning an optional value).

#### Database

We can also do the type class stuff for database access (using [postgres-simple](https://hackage.haskell.org/package/postgresql-simple)). Like this:

```haskell
instance FromRow User where
    fromRow = User <$> field <*> field
```

The `FromRow` type class will extract columns from a result set and put them into a record. Selecting the right fields and the order of the fields in the query is important!

By supplying a instance of `FromRow` for the type `User` we can use it with `query_ :: FromRow r => Connection -> Query -> IO [r]`. As you can see it requires a `FromRow` type class instance again for `r`. If that's settled, we can supply a `Connection` and `Query`. It will give us back an `IO [r]` which is a list of `r` values.

Using this we can query the database. Like so:

```haskell
allUsers :: Connection -> IO [User]
allUsers conn = query_ conn "select * from user"
```

### Scotty

[Scotty](https://hackage.haskell.org/package/scotty) is a Haskell web framework inspired by Ruby's Sinatra, using WAI and Warp. A small example from their website:

```haskell
{-# LANGUAGE OverloadedStrings #-}

import Web.Scotty

import Data.Monoid (mconcat)

main = scotty 3000 $ do
  get "/:word" $ do
    beam <- param "word"
    html $ mconcat ["<h1>Scotty, ", beam, " me up!</h1>"]
```

This will host a scotty server at port 3000. When you enter `localhost:3000/mark` it will print you `"<h1>Scotty, mark me up!</h1>"`

Quite simple huh? (except the monoid stuff if you haven't seen it, but its just concat stuff really (with some laws)). In a few lines of code we've created a web service, how cool is that? :)

To output JSON we can use `json :: ToJSON a => a -> ActionM ()` instead of `html`. As you can see we need to have a `ToJSON` (encoder) type class instance in scope which is the opposite of `FromJSON` (decoder). I won't go into detail, but you can make an instance by using `instance ToJSON User`. For example, you could write `json fetchedUsers` where `fetchedUsers :: [User]` should return an array of users.

### Config parsing

Every website nowadays has some configuration file which contains database connection strings, Facebook secrets, settings, etc. Haskell has a nice library to work with config files called: [configurator](https://hackage.haskell.org/package/configurator)

In the example below we load the properties using the configurator library:

```haskell
data TvConfig = TvConfig {
        teevyConnectInfo :: ConnectInfo
    ,   teevyPort :: Int
    ,   teevySecret :: T.Text
    ,   tmdbApiKey :: TL.Text
    ,   facebookSecret :: B.ByteString
} deriving (Show, Eq)

processDatabaseInfo :: Config -> IO (Maybe ConnectInfo)
processDatabaseInfo cfg = do
  host <- lookup cfg "db.host"
  port <- lookup cfg "db.port"
  db <- lookup cfg "db.db"
  user <- lookup cfg "db.user"
  pass <- lookup cfg "db.pass"
  return (ConnectInfo <$> host <*> port <*> user <*> pass <*> db)

processConfig :: Config -> IO (Maybe TvConfig)
processConfig cfg = do
  db <- processDatabaseInfo cfg
  port <- lookup cfg "teevy.port"
  secret <- lookup cfg "teevy.secret"
  tmdbKey <- lookup cfg "tmdb.key"
  fbSecret <- lookup cfg "facebook.secret"
  return (TvConfig <$> db <*> port <*> secret <*> tmdbKey <*> fbSecret)

loadConfig :: String -> IO (Maybe TvConfig)
loadConfig path = do
  exists <- doesFileExist path
  if exists
  then withLoad [Required path] processConfig
  else return Nothing
```

The takeaways here once again: simple functions, declarative parsing of the different sections and taking failure into account.

## Conclusion

I've learned a lot and some stuff can be greatly simplified or improved. Looking back at it, I am quite satisfied with what I have achieved. I learned a tremendous amount and I've created a nice MVP :)

It also proves that you can write REST backends with Haskell. Many other people have done it and they also like the advantages of it. Some complementary work can be found at:

- [Making a website in Haskell](http://adit.io/posts/2013-04-15-making-a-website-with-haskell.html)
- [Building a JSON REST API in Haskell](http://taylor.fausak.me/2014/10/21/building-a-json-rest-api-in-haskell/)
- [Engineering Silk](http://engineering.silk.co/)
- [21 days of Hackage: scotty](https://ocharles.org.uk/blog/posts/2013-12-05-24-days-of-hackage-scotty.html)
- [21 days of Hackage: postgres-simple](https://ocharles.org.uk/blog/posts/2012-12-03-postgresql-simple.html)
- [21 days of Hackage: aeson](https://ocharles.org.uk/blog/posts/2012-12-07-24-days-of-hackage-aeson.html)
- [21 days of Hackage: configurator](https://ocharles.org.uk/blog/posts/2012-12-21-24-days-of-hackage-configurator.html)

## Learning Haskell

To learn Haskell, there are a few options. Like I have learned a lot from reading: [Learn you a Haskell for a Great Good](http://learnyouahaskell.com/), but it seems [Haskell programming](http://haskellbook.com/) gains more popularity lately.
