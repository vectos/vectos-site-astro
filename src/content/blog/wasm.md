---
pubDate: "2023-06-05"
banner: "/img/blog/wasm/banner.png"
title: "WASM x Backend: Time to shake things up?"
description: "Why should you keep an eye on WASM on the backend?"
---

You may have heard about WASM in the browser. It enables running games in the browser or even PHP and SQLite such that you can try out WordPress [without installing it](https://wordpress.wasmlabs.dev/). Another emerging trend is to run WASM on the backend. In this blog I'll go over what WASM is, different concepts like WASI, WAGI and the component model and how all of this could be of use.

## Motivation to go WASM on the backend

The main driver to use WASM on the backend is to extend a certain platform by plugins/extensions/webhooks. Examples of platforms are databases, Kubernetes, CI platforms, Firefox, Keycloak, Envoy, Docker, games, but also your API.

What criteria you would consider a certain extension format?

- **Compatibility & Portability**: How portable is the extension format? Do you need to recompile it for ARM/x86 or does it need a specific VM version? Can it easily be shared by a central repository?
- **Security**: Can the extension be run without security risks?
- **Performance**: How performant is the extension format? Does it have the overhead of TCP/Authentication/TLS or an interpreted language/virtual machine?
- **DX**: Do you need a specific toolchain? Do you need to read up on the intrinsics? How easy is it to test your extension?

## What do we have today?

There are a few approaches to plugins or extending a platform:

### Embed with the app
This means that you use the same programming language the application is written in and package it alongside the app. 

#### Keycloak & SonarQube

![keycloak](/img/blog/wasm/keycloak.png)

You need to use the same dependencies as the platform and implement a certain interface. The artifact of your extension will be a JAR. The JAR will be put on the same class path and dynamically discovered. 

#### Weak points

- It might break with new versions of Keycloak/SonarQube as the runtime might change, therefore your extension might be incompatible with a new version of Keycloak/SonarQube. Aswell if the Java version is upgraded, it would cause the same compatibility issues (Compatibility & Portability)
- There is no registry in place for Keycloak extensions (Compatibility & Portability)
- There is no auditing or constraints on the extensions. The extension might call malicious services (Security)
- There is no test kit available which might make testing your extension easier (DX)

### Interpreted language
They are interpreted by the runtime which allows them to call specific APIs or they have unbounded access to certain resources. Popular examples of using an interpreted are JavaScript or Lua, but there are also examples of specific DSL's

#### Github

![github](/img/blog/wasm/github.png)

The extensions of Github Actions are written in JavaScript and TypeScript. The portability of Github Actions is good. There is a marketplace and JavaScript/TypeScript doesn't break as fast as a Java upgrade.

#### World of Warcraft

![wow](/img/blog/wasm/wow.png)

The plugins for WoW are written in Lua. The portability of plugins in WoW was an afterthought. [Curseforge](https://www.curseforge.com/wow) introduces an add-on manager for WoW which solves this problem. 


#### Weak points

- It might break with new versions, the runtime might change (Compatibility & Portability)
- There is no auditing or constraints on the extensions. The extension might call malicious services (Security)
- It is interpreted and this has a (small) performance penalty (Performance)
- You need to learn a specific programming language in the case of World of Warcraft (DX)
- There is no test kit available which might make testing your extension easier (DX)

### RPC
The platform either calls the registered extension (webhooks) or if you have REST API yourself, it may be called by others to query or mutate entities.

#### Github

Github also uses webhooks to notify you of certain [events](https://docs.github.com/en/webhooks-and-events/webhooks/about-webhooks#events) via webhooks. 

#### Kubernetes operators

To create an operator for Kubernetes, you should use the [SDK](https://github.com/operator-framework/operator-sdk).
Operators are implemented as a collection of controllers where each controller watches a specific resource type. When a relevant event occurs on a watched resource a **reconcile cycle** is started. 

![operators](/img/blog/wasm/kubernetes-operators.webp)

For a Kubernetes operator, the extension is done by using **webhooks**. When a request is made to the Kubernetes API server, especially for create and delete requests, the request goes through the above phases. Notice that it is possible to specify webhooks to perform mutations and validations. If the operator introduces a new custom resource definition (CRD), we may have to also define those webhooks. Normally, the operator process would also implement the webhook endpoint.

#### Weak points

- Lack of versioning of your API might cause things to break (Compatibility & Portability)
- Your endpoints need to have authentication which might be weak or misconfigured (Security)
- Calling endpoints has overhead of TCP/TLS/Authentication (Performance)
- The endpoints may be down (Performance)

### What could be improved?

Most of the platforms which offer extensions struggle with **Compatibility & Portability**. While this is a hard topic, I think you can agree that Keycloak/SonarQube is struggling the most with this topic. If a new version of Keycloak/SonarQube is released it might break and if the Java version is bumped you might run into incompatible class file errors. Also, other platforms struggle to supply a central registry for extensions. 

In terms of **Security** there is a lot to win. While almost none of the formats audit their extensions (like Apple does with apps in their App store), there are usually no constraints in place. If you have access to TCP/HTTP you could send sensitive data to _any_ endpoint. With RPC-based platforms, you have to be careful to put up an properly configured authentication layer.

When it comes to **Performance** Keycloak/SonarQube is doing fine, the extensions are in the same process. When using extensions in Github Actions or World of Warcraft there might be a small penalty to the scripting engine like Lua. The most overhead can be found in RPC-based architectures where webhooks are used. For every event, you need a TCP/TLS socket that uses HTTP with either REST or gRPC. Added on that top of that there is authentication and/or authorization. 

The latest criteria is **DX**. The JVM-based platforms like Keycloak/Sonarqube are poor on this matter. You can only implement it in a JVM language. Next up is the interpreted languages, which aren't any better. For World of Warcraft you can only use Lua and for Github Actions there is only JavaScript and TypeScript. The best experience is when it comes to webhooks, you can implement this in the language you love. Almost or none of the options offer a test kit, which is disappointing.

## What is WASM?

WebAssembly, also known as WASM, is a binary instruction format designed to enable efficient execution of code on the web and backend. It is a portable, low-level format that allows developers to write programs in languages such as C, C++, Rust, and others.

Here are some key points about WebAssembly:

- **Performance**: WebAssembly is designed for performance and efficiency. It provides a compact binary format that can be quickly parsed and executed. There is no heavy garbage collector due to its linear memory model.
- **Language Agnostic**: WebAssembly is not tied to any specific programming language. It is designed to be language-agnostic, meaning that developers can write code in various languages and compile it into WebAssembly format.
- **Sandboxed Execution**: WebAssembly runs in a sandboxed environment. This means that it operates within strict security constraints, preventing it from accessing or modifying sensitive resources.
- **Broad Adoption**: WebAssembly has gained significant traction since its introduction. It is supported by major web browsers and has been embraced by a wide range of organizations and communities. It has applications beyond traditional web development, such as game development, scientific simulations, virtual reality experiences, cryptocurrency, and more.

## WASM runtimes

A WASM runtime is a _library_ that can be used in (one or multiple) programming language(s) to execute a `.wasm` file.

### Wasmer

![wasmer](/img/blog/wasm/wasmer.png)

Wasmer is a WebAssembly runtime that enables super lightweight containers to run anywhere from Desktop to the Cloud, Edge and IoT devices.

Wasmer provides a CLI to easily execute wasm files in the command line. It supports multiple backends including LLVM, Cranelift, and Single pass (dynasm).

#### Features

- Fast. Run WebAssembly at near-native speeds.
- Secure by default. No file, network, or environment access, unless explicitly enabled.
- Supports WASI and Emscripten out of the box.
- Embeddable in multiple programming languages
- Compliant with the latest WebAssembly Proposals (SIMD, Reference Types, Threads, ...)

Wasmer also features WAPM. WAPM is a package manager for WebAssembly modules that come bundled with the Wasmer itself.

Languages supported: **Rust, C, C++, C#, D, Python, JavaScript, Go, PHP, Ruby, Java, R, Postgres, Swift, Zig, Dart, Crystal, Lisp, Julia, V, OCaml**

### Wasmtime

![wasmtime](/img/blog/wasm/bytecode.svg)

Wasmtime is a [Bytecode Alliance](https://bytecodealliance.org/) project that is a standalone wasm-only optimizing runtime for WebAssembly and WASI.

Wasmtime is an open-source project and serves as an efficient and lightweight runtime environment for WebAssembly. It provides an implementation of the WebAssembly specification and allows you to execute Wasm modules directly on your machine. With Wasmtime, you can integrate WebAssembly into your applications.

Wasmtime also provides an API that allows you to embed the runtime into your applications, giving you fine-grained control over the execution of WebAssembly modules. Additionally, it offers integration with different host languages and environments, enabling interoperability between WebAssembly and the host platform.

Wasmtime passes the official WebAssembly test suite and implements future proposals to WebAssembly as well. Wasmtime developers are intimately engaged with the WebAssembly standards process all along the way too.

Languages supported: **Rust, C, C++, Python, .NET, Go**

## Component model

In the WebAssembly component model, developers can create application components in different languages, treating them as modular building blocks. This approach is compared to a crate of software "Lego" where developers can pick and choose the pieces they need.

This component model is expected to bring innovation to web application development. The web is a constrained environment with impatient users, making it conducive to experimentation. Components can facilitate the creation of language-neutral plugin systems. For instance, a language runtime like Python could be utilized by multiple components, reducing duplication and improving efficiency. 

The core WebAssembly Specification defines a format for representing executable code. A WebAssembly module may import functions, global variables, etc. from the host runtime, as well as export such items to the host. **However, there is no standard way to combine modules at runtime, nor is there a standard way to marshal high-level types (e.g. strings and records) across module boundaries.**

The component model solves that. The definition of a component is done in an IDL (interface description language). Here's a little example of so-called WIT (webassembly interface types) file:

```wit
interface http {
    record http-request {
        url: string,
        headers: list<tuple<string, string>>
    }

    record http-response {
        status: u16,
        body: list<u8>
    }

    enum http-error {
        network,
        timeout,
        invalid-url,
        invalid-request
    }

    send: func(req: http-request) -> result<http-response, http-error>
}


interface data {
   use self.http.{http-error}

   record commit {
      message: string,
      timestamp: u64
  }

  variant enrichment {
      link(string),
      none
  }

  variant enrichment-error {
    http-error(http-error),
    json-error(string)
  }

  enrich: func(commit: commit) -> result<enrichment, enrichment-error>
}

default world gitlog {

  import http: self.http

  export data: self.data

}
```

In this example, I've defined a simple and naive **HTTP** client. This is being _imported_ which means that the host needs to implement this interface. The _host_ in this matter is the executable that embeds a _WASM runtime_ and loads the `.wasm` file. 

Also, I've defined an interface `data` which defines a `record` and a few `variant`'s (which is a enumeration). As well there is a function `enrich`. This is being _exported_ which means that the guest needs to implement this interface. The _guest_ is in this matter the one who exports a `.wasm` file and implements this interface. 

The host will call the guest function `enrich` with the record being defined in this WIT. The implementation _inside_ can use the **HTTP** client which might be restricted to calling certain domains and also be instrumented with metrics or tracing.

The IDL is used to generate host and guest code, which is implemented on each side.

By using calling APIs without any overhead and implementing certain parts in either the host or guest code, it's an **ideal plugin system**. Whereas others restrict by only extending the runtime by programming in a specific language, the way is now open to implementing in the language you _love_. As well as in RPC-based plugin systems, there is no (TCP or HTTP) overhead in calling APIs.

## Emerging WASM standards

There are a few things still in the works, like threading, the component model and garbage collection. These proposed or implemented features can be found [here](https://github.com/WebAssembly/proposals).

A few notable WASM standards are:

## WASI

![WASI logo](/img/blog/wasm/wasi.png)

WASI stands for WebAssembly System Interface. It is a standardized system interface for WebAssembly, designed to provide a secure and portable execution environment for WebAssembly modules. WASI allows WebAssembly code to interact with the underlying operating system and access system resources in a controlled and platform-independent manner.

WASI is implemented via the WASM component model.

## WAGI

WAGI is an implementation of CGI for WebAssembly. That means that writing a Wagi module is as easy as sending properly formatted content to standard output. 

WAGI stands for WebAssembly Gateway Interface. It is an open standard that enables the execution of WebAssembly modules as HTTP servers. WAGI allows developers to build lightweight, portable, and secure serverless applications using WebAssembly.

## Out in the wild

Over the past few years, WASM has gained a lot of traction already in support from various companies. Here are a few examples

### Redpanda

![logo](/img/blog/wasm/redpanda.png)

Redpanda is a Kafka-compatible streaming data platform that is proven to be 10x faster, and 6x lower in total costs for GBps+ throughputs. It is also JVM-free, ZooKeeper-free, Jepsen-tested and source available.

Redpanda Data Transforms allow users to perform basic data transformations directly within the platform. These transformations include actions like capitalizing strings and filtering messages. By incorporating these features, the need for these specific consumers is eliminated, streamlining the process.

Redpanda supports [WASM](https://docs.redpanda.com/docs/22.2/labs/data-transform) to do data transformations. 

### ScyllaDB?

![logo](/img/blog/wasm/scylla.png)

ScyllaDB is an open-source distributed NoSQL database. It is built on the Apache Cassandra database protocol, but is implemented in C++. ScyllaDB is known for its ability to handle massive workloads and deliver low-latency responses, making it suitable for real-time applications that require high throughput and predictable performance.

ScyllaDB supports [WASM](https://www.scylladb.com/2022/04/14/wasmtime/) to define user defined functionds (UDF). 

### Envoy

![logo](/img/blog/wasm/envoy.png)

Envoy is an open source service proxy especially designed for cloud native applications. It has a wide variety of features like connection pooling, retry mechanism, TLS management, compression, health checking, fault injection, rate limiting, authorization etc. 

To create a filter you can use WASM as described [here](https://dev.to/satrobit/extending-envoy-with-webassembly-proxy-filters-1i96)

### Fermyon

![logo](/img/blog/wasm/fermyon.png)

Fermyon Technologies is a software development company that pioneers the next wave of cloud computing. With Spin, Fermyon's developer tool, Fermyon Cloud is the simplest method to deploy and manage cloud native WebAssembly applications.

To get started with Fermyon and WASM, read up [here](https://developer.fermyon.com/spin/index)


### Docker

![logo](/img/blog/wasm/docker.png)

Docker is an open-source platform that enables developers to automate the deployment and management of applications inside software containers. Containers provide a lightweight and isolated environment for running applications, allowing them to run consistently across different computing environments.

Docker recently started supporting WASM, by replacing POSIX with WASI, it can run WASM containers.

To get started with Docker and WASM, read up [here](https://docs.docker.com/desktop/wasm/)


### Fastly

![logo](/img/blog/wasm/fastly.png)

It describes its network as an edge cloud platform, which is designed to help developers extend their core cloud infrastructure to the edge of the network, closer to users. The Fastly edge cloud platform includes their content delivery network (CDN), image optimization, video and streaming, cloud security, and load balancing services. Fastly's cloud security services include denial-of-service attack protection, bot mitigation, and a web application firewall.

Compute@Edge is a compute platform. It enables you to execute your [WASM](https://developer.fastly.com/learning/compute/) on its global edge network, supporting multiple programming languages. By utilizing Compute@Edge, you gain access to various powerful features such as data stores, dynamic configuration, and real-time messaging provided by Fastly. 

## Conclusion

As you've reached the end of this post you may already have noticed that WebAssembly is already being used on various backend components. Databases like Redpanda and ScyllaDB already support it to support custom functions or transformations.

Also, companies like Fermyon and Fastly allow you to define serverless and handlers in WASM for optimal performance.

Docker is using WASM and WASI to replace the more "expensive" virtualized Linux environments. This results in a more secure, performant and compact format for running applications.

I predict that also [Temporal](https://temporal.io), a company that allows you to define business processes in a solid way by using different techniques like event sourcing and sagas to use WASM. This removes the need to run a server and client, but would run your custom business logic directly inside the runtime. There is maybe also potential for [Kalix](https://kalix.io) to do event sourcing using WASM and build a SaaS which solves the complexity of developing an event-based system.

But if you want to build your runtime? Like building a next-gen continuous integration platform or the next Keycloak with high extensibility in mind? Maybe it's worth looking into the component model. 

Good luck on your WASM journey!