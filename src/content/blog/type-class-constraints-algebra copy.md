---
pubDate: "2024-01-05"
banner: "/img/blog/typeclass-constraints.jpg"
title: "Type class constraints in object algebras"
description: "Empower your object algebras"
---

It’s been a while since Julien Richard Foy has given a [talk](https://www.youtube.com/watch?v=snbsYyBS4Bs) about object algebras. Mean while he has been busy building [endpoint4s](https://github.com/endpoints4s/endpoints4s/) using this technique.

In this blog post I would like to go over type class constraints on object algebras which make object algebras more powerful. I’ve build a [toy library](https://github.com/Fristi/itinere) in 2018 myself using this technique which is similar to endpoint4s or tapir

## What is an object algebra?

An example is a to model abstract the `HttpResponse` of a endpoints library, this might look like this

```scala
trait HttpResponse[A] {
  type HttpResponse[A]
  type HttpResponseBody[A]
  type HttpResponseHeaders[A]

  def response[A, B](statusCode: HttpStatus, description: String, headers: HttpResponseHeaders[A] = emptyResponseHeaders, entity: HttpResponseEntity[B])(implicit T: Tupler[A, B]): HttpResponse[T.Out]

}
```

This is pretty abstract, the abstract types are implemented in the interpreters of the server, client and documentation. The response function accepts these abstract types, which will output a new type. `Tupler` concatenates two types yielding a `T.Out` I’ve implemented this in Scala 2, in Scala 3 you could do this with probably more elegantly

## Type class constraints on abstract types

Now next to the abstract types you could add type class constraint to these types as they match the kind `* -> *`

What type classes could you possibly apply to our types? Well for example Invariant from cats

### Invariant

A simplified definition is

```scala
trait Invariant[F[_]] {
  def imap[A, B](fa: F[A])(f: A => B)(g: B => A): F[B]
}
```

This gives us imap which is a combination of a map and contramap This is fits an isomorphism which allows you to convert for example from Celsius to Fahrenheit. But also for example from a `case class Person(name: String, age: Int)` to heterogeneous representation `String :: Int :: HNil` This is quite handy when you want to map input or outputs in your ESDL HTTP library to case classes and such.

An Invariant functor however does not account for any failure on decoding data. I’ve looked for a functor which did this, but at that time it wasn’t there and I created a Partial type class without any axioms

### Partial

The definition of Partial looks like this

```scala
trait Partial[F[_]] {
  def pmap[A, B](fa: F[A])(f: A => Attempt[B])(g: B => A): F[B]
}
```

This looks pretty similar to Invariant except that the map part now returns a Attempt which is an error type. Partial can be applied to parts of the HTTP algebra where decoding can fail. For example query strings, segments, headers, etc.

### CoCartesian

Another type class I invented myself is a dual of Cartesian which is in cats. It’s defined as:

```scala
trait CoCartesian[F[_]] {
  def sum[A, B](fa: F[A], fb: F[B]): F[Either[A, B]]
}
```

What do I mean with dual? In category theory you have products and coproducts. A product is the combination of two things which end up as tuple. The dual to a product is a coproduct which the combination of two things which either of one of these. That’s what been modeled with the CoCartesian type class.

This works together well with the Invariant type class. You have the following isomorphisms:

- Product: for a nested tuples (constructed with the Cartesian type class) like `(A, (B, (C, D)))` you can flatten them to a heterogeneous variant `A :: B :: C :: D :: HNil` which can in turn translated to a case class
- Coproduct: for a nested either (constructed with the CoCartesian type class) like `Either[A, Either[B, Either[C, D]]]` you can flatten them to union variant in shapeless or Scala 3 like `A | B | C | D` which is isomorphic to an algebraic data type

Where is this used? In the HTTP response, where a endpoint could return multiple responses like a error or an actual response.

#### http4s server

```scala
implicit val httpResponseCocartesian: CoCartesian[Lambda[A => Function[A, Resp[F]]]] = new CoCartesian[Function[?, Resp[F]]] {
    override def sum[A, B](fa: Function[A, Resp[F]], fb: Function[B, Resp[F]]): Function[Either[A, B], Resp[F]] = {
      case Left(a)  => fa(a)
      case Right(b) => fb(b)
    }
  }
```

We implemented the CoCartesian on http4s server part by a type lambda which returns a `Function[A, Resp[F]]` this is in turn implemented in sum as the return type `Function[Either[A, B], Resp[F]]` In the body you see that we just pattern match on the Either which delegates to the respective function fa and fb

#### openapi docs

Implementing this for OpenAPI docs was pretty straight forward

```scala
implicit override val httpResponseCocartesian: CoCartesian[Lambda[A => OpenApiResponses]] = new CoCartesian[Lambda[A => OpenApiResponses]] {
  override def sum[A, B](fa: OpenApiResponses, fb: OpenApiResponses): OpenApiResponses = OpenApiResponses(fa.byStatusCode ++ fb.byStatusCode)
}
```

It’s basically a basic concatenation of a Scala collection

## Conclusion

In this blog post I’ve gone over object algebra’s and type classes. Some of the concepts you may need to go over by yourself in the aforementioned links and videos. I think these a pretty powerful concepts to invent your own EDSL.

This could be foundational work for new libraries! Would be awesome to have AsyncAPI library which makes documenting asynchronous API’s a bit easier.

However note that working on new libraries takes a lot of effort and doing so involves marketing, website, have a support by multiple contributors and companies. For that reason I’ve stopped working on libraries as it’s quite involving.
