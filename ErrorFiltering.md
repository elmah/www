---
title: Error Filtering
layout: page
permalink: a/error-filtering/
article: true
---

* TOC
{:toc}

See also:

- [Error Filtering Examples](examples/)

## Introduction

When an unhandled exception is reported to ELMAH by ASP.NET, an application can decide whether to dismiss the exception or not. There are two ways for an application to do this, either programmatically or declaratively via the configuration file. The simpler of the two is programmatically because you do not need to learn anything new except write an event handler in your favorite language. The downside of the programmatic approach is that you need to write code and modify your web application (requiring possibly a static re-compile). With the configuration-based approach, you can simply apply filtering of exceptions to a running application.

## Filtering Programmatically

Let's assume the following:

  * You have the `ErrorLogModule` installed and configured to log errors.
  * The `ErrorLogModule` is named `ErrorLog` via the `name` attribute of the entry under the `<httpModules>` section.
  * You wish to filter exceptions of type `System.Web.HttpRequestValidationException`.

To add an exception filter programmatically, put the following in your `Global.asax` file (or in the code-behind file):

{% highlight csharp %}
// Don't forget to reference the Elmah assembly and import its namespace.

void ErrorLog_Filtering(object sender, ExceptionFilterEventArgs e)
{
    if (e.Exception.GetBaseException() is HttpRequestValidationException)
        e.Dismiss();
}
{% endhighlight %}

It's really simple as that. When the error logging module receives an exception, it raises the `Filtering` even to see if any listeners wish to dismiss the exception. If an event handler calls the `Dismiss` method of the `ExceptionFilterEventArgs` object then the exception is not logged. Note that dismissing an exception does not clear the error so it still continues to surface as an unhandled exception. Dismissing here means that the module will not log it.

If you also have the `ErrorMailModule` enabled, the filtering procedure is similar. You setup another event handler based on the name of the module and the event:

{% highlight csharp %}
void ErrorMail_Filtering(object sender, ExceptionFilterEventArgs e)
{
    if (e.Exception.GetBaseException() is HttpRequestValidationException)
        e.Dismiss();
}
{% endhighlight %} 

Naturally, you can combine the two by delegating to a common method so that you have the set of conditions for filtering in one place:

{% highlight csharp %}
void ErrorLog_Filtering(object sender, ExceptionFilterEventArgs args)
{
    Filter(args);
}

void ErrorMail_Filtering(object sender, ExceptionFilterEventArgs args)
{
    Filter(args);
}

void Filter(ExceptionFilterEventArgs args)
{
    if (args.Exception.GetBaseException() is HttpRequestValidationException)
        args.Dismiss();
}
{% endhighlight %} 

## Filtering Declaratively via Configuration

Filtering via configuration is a bit more involved than the programmatic approach but the benefit is that you can apply it to any running web application without the need to modify or re-compile the application.

The first step is to configure an additional module called `Elmah.ErrorFilterModule`. **Make sure you add it after any of the logging modules from ELMAH**, as shown here with `ErrorLogModule`:

{% highlight xml %}
<httpModules>
    ...
    <add name="ErrorLog" type="Elmah.ErrorLogModule, Elmah"/>
    <add name="ErrorFilter" type="Elmah.ErrorFilterModule, Elmah"/>
    ...
</httpModules>
{% endhighlight %} 

`ErrorFilterModule` takes care of subscribing to the `Filtering` event of the modules that precede it. When the logging and mailing modules fire their `Filtering` event, `ErrorFilterModule` runs through one or more assertions to decide whether to dismiss the exception or not. If the assertions test true, the exception is dismissed. The assertions are indicated in a separate configuration section. The configuration section is handled by `Elmah.ErrorFilterSectionHandler` and must be registered as shown here:

{% highlight xml %}
<configSections>
    ...
    <sectionGroup name="elmah">
        ...
        <section name="errorFilter" type="Elmah.ErrorFilterSectionHandler, Elmah"/>
        ...
    </sectionGroup>
    ...
</configSections>
{% endhighlight %} 

ASP.NET applications running under medium trust should use the following version for the `section` entry that specifies the additional `requirePermission` attribute and sets its value to `false`:

{% highlight xml %}
<section name="errorFilter" type="Elmah.ErrorFilterSectionHandler, Elmah" requirePermission="false" />
{% endhighlight %} 

Now you can add the actual section under the `<elmah>` group:

{% highlight xml %}
<elmah>
    ...
    <errorFilter>
        <test>
            <equal binding="HttpStatusCode" value="404" type="Int32" />
        </test>
    </errorFilter>
</elmah>
{% endhighlight %} 

In the above example, there is a single _assertion_ that will be true when the `HttpStatusCode` _equals_ the integer value `404`. There are a lot of components at work here so let's dissect this a bit more. ELMAH comes with a number of built-in assertions and you can even add your own. The most interesting of the assertions test their environment or context for a condition. If the condition is met, the assertion outcome is _true_. The _context_ is usually the exception that is being raised and the HTTP transaction running its course. Both of these are available to the handler of the `Filtering` event as properties of the `ExceptionFilterEventArgs`. The `ErrorFilterModule` takes these two and adds a few more helper properties that are subsequently available as the total context for all assertions. The `<equal>` assertion above has a `binding` attribute that is actually a data-binding expression that you already know. It is the very same expression and syntax you specify to the `Eval` method when data-binding within the server-side markup of ASP.NET pages and user controls. This expression is evaluated against the context so naturally `HttpStatusCode` is a property of the context. The assertion evaluates the expression and uses the resulting value to compare against the literal given in the `value` attribute. To compare apples to apples and oranges to oranges, you have to specify the type of the value expected from the binding expression as well as that of the text in the `value` attribute. That is the purpose of the `type` attribute, which can be one of the <tt><a href='http://msdn.microsoft.com/en-us/library/system.typecode.aspx'>TypeCode</a></tt> enumeration members. Consequently, the current set of _comparison assertions_ are limited to primitive types represented by the `TypeCode` members (except `Empty`, `DBNull` and `Object`). This may seem limiting at first but it will suffice the majority of filtering you will need. For exotic cases, you can always write your own assertions. If you omit the `type` attribute then the value type of `String` is assumed. Finally, if the comparison succeeds, the assertion flags true and the exception is eventually dismissed. With this explanation in mind, here is a quick recap of what happens in the above example. First `HttpStatusCode` is evaluated against the filter context. Its result is converted to a 32-bit integer and compared against the value 404. If they equal, the assertion tells the the `ErrorFilterModule` that the exception matches the condition for dismissal.

As mentioned earlier, ELMAH ships with several built-in assertions and you can use them together to create complex conditions. For example, here the `<and>`, `<greater>` and `<lesser>` assertions are used together to filter all exceptions where the HTTP status code for the response falls in the integer range 400 to 499 (inclusive).

{% highlight xml %}
<elmah>
    ...
    <errorFilter>
        <test>
            <and>
                <greater binding="HttpStatusCode" value="399" type="Int32" />
                <lesser  binding="HttpStatusCode" value="500" type="Int32" />
            </and>
        </test>
    </errorFilter>
</elmah>
{% endhighlight %} 

The `<and>` is a _composite assertion_ that results to true when all its sub-assertions also result to true. Likewise, you also have the logical `<or>` and `<not>` composite assertions.

### Using JScript

If you are familiar with the JavaScript programming language then you can also use the `<jscript>` assertion to specify a filtering condition as a simple JavaScript expression rather than using a whole tree of assertions. Below is an example of a complex condition expressed as JavaScript:

{% highlight xml %}
<elmah>
    …
    <errorFilter>
        <test>
            <jscript>
                <expression>
                <![CDATA[
                // @assembly mscorlib
                // @assembly System.Web, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a
                // @import System.IO
                // @import System.Web

                HttpStatusCode == 404
                || $.BaseException instanceof FileNotFoundException 
                || $.BaseException instanceof HttpRequestValidationException
                /* Using RegExp below (see http://msdn.microsoft.com/en-us/library/h6e2eb7w.aspx) */
                || $.Context.Request.UserAgent.match(/crawler/i)                      
                || $.Context.Request.ServerVariables['REMOTE_ADDR'] == '127.0.0.1' // IPv4 only
                ]]>
                </expression>
            </jscript>
        </test>
    </errorFilter>
</elmah>
{% endhighlight %} 

**NOTE!** For versions earlier than ELMAH 1.2 SP2, replace `$` in the example above with the undocumented `$context` to work around [issue #278](http://code.google.com/p/elmah/issues/detail?id=278).

The above causes errors to be filtered when any of the following is true:

  * The status code is set to [404](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5)
  * The root/base cause is [`System.IO.FileNotFoundException`](http://msdn.microsoft.com/en-us/library/system.io.filenotfoundexception.aspx)
  * The root/base cause is [`System.Web.HttpRequestValidationException`](http://msdn.microsoft.com/en-us/library/system.web.httprequestvalidationexception.aspx)
  * The [user agent](http://www.user-agents.org/) making the request identifies itself as "crawler"
  * The request is from the local machine

### Filtering By Source

With version 1.1, ELMAH allows filtering based on the source module, enabling scenarios like logging all errors but only having a subset being e-mailed. The three properties available for binding that enable this are called `FilterSource`, `FilterSourceType` and `FilterSourceAssemblyName`. `FilterSource` represents the object requesting filtering whereas `FilterSourceType` and `FilterSourceAssemblyName` are just helpers that yield the source object's type and assembly name. Using any of these, you can set up assertions that filter errors based on aspects of the source object. The following example shows how to prevent having 404 HTTP errors being mailed.

{% highlight xml %}
<elmah>
    ...
    <errorFilter>
        <test>
            <and>
                <equal binding="HttpStatusCode" value="404" type="Int32" />
                <regex binding="FilterSourceType.Name" pattern="mail" />
            </and>
        </test>
    </errorFilter>
</elmah>
{% endhighlight %} 

The `regex` assertion binds to the type name of the source object and checks if it contains the word "mail". When the mailing module from ELMAH is filtering, `FilterSource` will be an instance of `Elmah.ErrorMailModule`. The assertion will therefore get the type name (irrespective of namespace) and filter the error if it contains "mail". When the logging module from ELMAH is filtering, `FilterSource` will be an instance of `Elmah.ErrorLogModule` and the assertion will let the error pass through and get logged.

### Writing Your Own Assertion

Writing your own assertions is a two-step process. First, you create a class that implements the `IAssertion` interface from the `Elmah.Assertions` namespace. This interface contains only a single method called `Test` that receives a context as parameter and which should return a Boolean result depending on whether the condition represented by the assertion is met or not. Next, you create a factory method that will be called to initialize the assertion as the configuration is applied at run-time.

Here is how the `IAssertion` interface is defined:

{% highlight csharp %}
public interface IAssertion
{
    bool Test(object context);
}
{% endhighlight %} 

And here is a very simple implementation of the interface that always returns `true` no matter what:

{% highlight csharp %}
namespace MyAssertions
{
    public sealed class TrueAssertion : IAssertion
    {
        public bool Test(object context) 
        {
            return true;
        }
    }
}
{% endhighlight %} 

If you were to add this assertion as an error filter test then you effectively end up suppressing exceptions from being logged or mailed. Granted it is not very useful in practice, but it should be good enough to see its effect in action.

As a second step, you need to setup a factory class for your assertions. The factory class is used to convert the configuration elements into `IAssertion` objects at runtime. Here is the assertion factory for creating `TrueAssertion` objects:

{% highlight csharp %}
namespace MyAssertions
{
    public sealed class AssertionFactory
    {
        public static bool always_true(XmlElement config) 
        {
            return new TrueAssertion();
        }
    }
}
{% endhighlight %} 

To keep things simple, the assertion factory class is _required_ to follow a few conventions, which are:

  1. The factory class must be public
  1. The factory class must live in a namespace
  1. The factory class must be called `AssertionFactory`.

The factory class hosts factory methods, each of which is responsible for creating, configuring and returning an `IAssertion` object. Each factory method must observe the following rules:

  1. The factory method must be _public_.
  1. The factory method must be _static_ (not bound to any class instance).
  1. The return value of the factory method must be `IAssertion`.
  1. The factory method must accept a single parameter of type `XmlElement`.
  1. The factory method must be named after the XML configuration element. An underscore may be used in the method name where a dash is expected in the XML element name such that `not-equal` becomes `not_equal`.

Now on to using the actual assertion in the configuration file:

{% highlight xml %}
<errorFilter>
    <test 
        xmlns:my="http://schemas.microsoft.com/clr/nsassem/MyAssertions/MyAssertionsLib">
        <my:always-true />
    </test>
</errorFilter>
{% endhighlight %} 

Since our method was called `always_true`, it is a simple matter of naming the XML element correspondingly. In addition, you need to scope your element to an XML-based namespace whose value provides the necessary hints for the namespace and assembly where the factory class is located. In the above example, the `my` prefix corresponds to the XML namespace `http://schemas.microsoft.com/clr/nsassem/MyAssertions/MyAssertionsLib` and is used to scope `always-true`. Here is a deconstruction of how ELMAH converts the `always-true` element into an `IAssertion` object:

  1. The element prefix is used to lookup the corresponding XML namespace. If there is no prefix then the assertion is assumed to be one of the built-in ones provided by ELMAH.
  1. If the XML namesapce starts with `http://schemas.microsoft.com/clr/nsassem/` then the remaining two path components are extracted as the type namespace followed by the assembly name where the assertion class factory can be found.
  1. The `MyAssertionsLib` assembly is loaded.
  1. The assembly is probed for the type `MyAssertions.AssertionFactory`. Here, `AssertionFactory` is simply dot-appended to the type namespace extracted from the XML namespace.
  1. The XML element name (`always-true`) is unmangled by replacing dashes with underscores and then used to find a public and static method on `MyAssertions.AssertionFactory` called `always_true`.
  1. Finally, the `always_true` method is invoked (after passing signature compatibility checks) and given the entire XML configuration element as its sole parameter so that it can extract further information needed for the configuration of the actual assertion.

In the sample case of `TrueAssertion`, there is no configuration to be done so the factory method simply creates a new instance and returns it. In fact, it wouldn't even have to create a new instance each time since the assertion result is constant.

### Assertions Reference

  * equal
  * greater
  * greater-or-equal
  * is-type
  * is-type-compatible
  * lesser
  * lesser-or-equal
  * not
  * not-equal
  * regex
  * jscript

To be completed.