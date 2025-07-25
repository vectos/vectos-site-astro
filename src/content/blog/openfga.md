---
pubDate: "2024-01-02"
banner: "/img/blog/openfga/banner.png"
title: "Fine grained authorization with OpenFGA"
description: "Fine grained authorization"
---

OpenFGA is an open-source authorization solution that allows developers to build granular access control using an easy-to-read modelling language and friendly APIs. FGA is an abbreviation for Fine Grained Authorization.

I discovered OpenFGA meanwhile researching ReBAC authorization for a project I joined on Flock’s hackathon. The authentication and authorization solution being used there was ORY. You can read more up on the problem [here](https://medium.com/flock-community/a-case-study-on-separating-iam-from-business-logic-with-ory-6ecbe3626069)

OpenFGA is a product like ORY Keto which allows you to model your authorization as a graph. Both products rely on the Zanzibar model. There are however some nice additional features being built-in into OpenFGA. This might be a good drop-in replacement for Keto if you would like.

I came across this alternative while researching the topic of listing entities which you have access to. Both products are not supplying any means to sort the expansion of the graph on any attribute as you are not able to store it in Keto or OpenFGA. The expansion of the graph could result in millions of entries which might be expensive to sort, so that makes sense. There are several strategies which you can use to list entities you have access to which can be found here.

## Whirlwind tour

In OpenFGA you can create a Store. A Store holds authorization data which is composed out of a model and relationship tuples. This allows OpenFGA to hold multiple authorization methods within one server, which is really nice!

The model is expressed in a DSL which can be encoded and decoded from JSON. Here’s an example of a basic model we would like to use for our workday application.

```
model
 schema 1.1
type person
 relations
   define managed_by: [person]
   define reader: [user] or reader from managed_by
type user
type workday
 relations
   define reader: [person#reader]
```

In this model we make a description of the relationships between the types of person, workday and user. A person is managed by another person and has reader permissions if it is connected to the user or is connected through the managed by attribute which is a recursive relationship. The user is a special type which refers to the user. The last type is the workday which defines as well the reader permission which refers to the person#reader permission.

Now we have to model, we don’t have actual data which will be able to represent relationships. For that we need to create relationship tuples. This can be done via the SDK or API. It requires you to supply a reference to a user, a reference to an object and the type of relation. OpenFGA keeps an audit log of which relationship tuples were added and removed. For governance reasons this might be of interest and it’s nice that this is already built-in.

The implemented model, tuples and assertions prove that we can as a manager `(user:2)` actually access the workday from `(user:1)` while there is no relationship tuple being present which states that we would have direct access.

![Workbench](/img/blog/openfga/workbench.webp)

To verify our model OpenFGA comes with a workbench web application which is shown in the screenshot. From the left it shows our model, in the middle it shows our created tuples and on the right you are able to add and run assertions. Since assertions are stored with the model, each time you make a change to the model you could quickly verify that other assertions still hold and your authorization mechanism is still working.

## Conclusion of OpenFGA

As you’ve reached the end of this section there are some interesting features in OpenFGA which are not in Keto. As mentioned assertions, multiple authorization models, the editor and audit log are viable additions to fine grained authorization. One other part which I’ve really liked is the extensive documentation. It covers the SDK, API, how to make the models, explains the concepts very clearly and goes into detail about more use-case topics like contextual tuples and time based authorization.
