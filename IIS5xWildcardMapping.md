---
title: IIS 5.x Wildcard Mapping and ELMAH
layout: page
permalink: a/iis-5x-wildcard-mapping/
article: true
---

## The Problem

As described in this [thread][ggthread], ELMAH does not work correctly with IIS5x in combination with Wildcard Mapping. The symptom of this is that you will see HTTP 404 errors when accessing elmah.axd/stylesheet, elmah.axd/rss and others.

The reason for this is because the `ErrorLogPageFactory` uses `Request.PathInfo` (i.e. the PATH\_INFO server variable) to determine which handler to use. With Wildcard Mapping, this variable gets calculated slightly differently, so ELMAH cannot identify which handler to use.

NB The ideas and basis for the solution to this problem have come from this [forum posting](http://forums.asp.net/t/1113541.aspx).

## The Solution

To overcome this you can add the `FixIIS5xWildcardMappingModule` to your application as follows:

{% highlight xml %}
<httpModules>
  <add name="FixIIS5xWildcardMappingModule" 
       type="Elmah.FixIIS5xWildcardMappingModule, Elmah"/>
</httpModules>
{% endhighlight %}

NB the [thread][ggthread] mentioned at the start of this article offers alternative solutions, but they have since been superseded by this one.

## Potential Issues

Firstly, this solution does not work with ASP.NET 1.0. This is because `HttpContext.RewritePath` does not exist in version 1.0 of the .NET Framework.

Secondly, there is a small possibility that the module will not work with ASP.NET 1.1 either. Version 1.1 of the .NET Framework does not include methods that can be used directly to ascertain the path attribute in the httpHandler declaration for `Elmah.ErrorLogPageFactory`. The module instead loads the `web.config` file into an `XmlDocument` and performs an `XPath` query to select the appropriate node. In the unlikely event that the `web.config` file cannot be successfully loaded, a default handler path of `elmah.axd` is assumed. Should this assumption be false, then the module will cease to function correctly.


  [ggthread]: http://groups.google.com/group/elmah/browse_thread/thread/c22b85ace3812da1
