---
title: Error Filtering Examples
layout: page
permalink: a/error-filtering/examples/
article: true
---

Do you have a handy error filter configuration that you have used time and time again? Why not share it? Drop it as a comment to this wiki and we'll add it here.

To learn more about how to filter harmless or noisy errors from your logs, see "[Error Filtering](/a/error-filtering/)".

---

Filter requests for [favicon.ico](http://en.wikipedia.org/wiki/Favicon) that end in a [404 status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5):

{% highlight xml %}
<errorFilter>
    <test>
        <and>
            <equal binding="HttpStatusCode" 
                   value="404" type="Int32" />
            <regex binding="Context.Request.ServerVariables['URL']" 
                   pattern="/favicon\.ico(\z|\?)" />
        </and>
    </test>
</errorFilter>
{% endhighlight %} 

---

Filter requests ending in [404](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5) or those (using a `jscript` assertion) where where the last raised VB error was a negative number:

{% highlight xml %}
<errorFilter> 
  <test> 
    <or> 
      <equal binding="HttpStatusCode" value="404" type="Int32" /> 
      <jscript> 
        <expression> 
        <![CDATA[ 
        // @assembly Microsoft.VisualBasic, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a 
        // @import Microsoft.VisualBasic 
        Information.Err().Number < 0 
        ]]> 
        </expression> 
      </jscript> 
    </or> 
  </test> 
</errorFilter>
{% endhighlight %} 

For background on the above filter, see the "[Err.raise, how do I filter out custom error numbers...](http://groups.google.com/group/elmah/browse_thread/thread/ccd5c1f47364f818)" thread in the [discussion group](http://groups.google.com/group/elmah).

---

Filters all exceptions that occur on local requests:

{% highlight xml %}
<errorFilter>
    <test>
        <equal binding="Context.Request.IsLocal" 
               value="True" type="Boolean" />
    </test>
</errorFilter>
{% endhighlight %} 

---

Filter exceptions where the exception message contains certain words. In the example below, the words must be _potentially_, _dangerous_, _value_, _detected_ and _client_ and in the mentioned sequence. This will filter an exception where the message reads "A potentially dangerous Request.Path value was detected from the client".

{% highlight xml %}
<errorFilter>
    <test>
        <regex binding="Exception.Message" 
               pattern="(?ix: \b potentially \b.+?\b dangerous \b.+?\b value \b.+?\b detected \b.+?\b client \b )" />
    </test>
</errorFilter>
{% endhighlight %} 

This example was created in response to the "[Filtering HttpException: A potentially dangerous Request.Path value was detected...](http://groups.google.com/group/elmah/t/a6dd1503430cb69d)" thread in the [discussion group](http://groups.google.com/group/elmah).

---

Filter exceptions of type [`FileNotFoundException`](http://msdn.microsoft.com/en-us/library/system.io.filenotfoundexception.aspx) only when an image is requested (request path ends in `.jpg`, `.gif` or `.png`). In addition, filters exceptions resulting from [compilation](http://msdn.microsoft.com/en-us/library/system.web.httpcompileexception.aspx) or [parsing](http://msdn.microsoft.com/en-us/library/system.web.httpparseexception.aspx) errors when the request is from local host and the application has [debugging enabled](http://msdn.microsoft.com/en-us/library/system.web.httpcontext.isdebuggingenabled.aspx) (typical when developing dynamically compiled pages with in-line code).

{% highlight xml %}
<errorFilter>
    <test>
        <jscript>
            <expression><![CDATA[
            // @assembly mscorlib
            // @assembly System.Web, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a
            // @import System.IO
            // @import System.Web
            
            // 404s for images
            
            (($.HttpStatusCode == 404 
              || $.BaseException instanceof FileNotFoundException) 
             && $.Context.Request.Path.match(/\.(jpg|png|gif)$/i))
            
            // Compilation errors during development
            
            || ($.Context.IsDebuggingEnabled
                && $.Context.Request.IsLocal 
                && ($.BaseException instanceof HttpCompileException
                    || $.BaseException instanceof HttpParseException))
            ]]></expression>
        </jscript>
    </test>
</errorFilter>
{% endhighlight %} 

---

Filter exceptions of type [`TaskCanceledException`](http://msdn.microsoft.com/en-us/library/system.threading.tasks.taskcanceledexception.aspx) but only when the HTTP request method is HEAD and the user agent string contains the text "Microsoft Office Existence Discovery".

{% highlight xml %}
<errorFilter>
    <test>
        <jscript>
            <expression><![CDATA[
            // @assembly mscorlib
            // @import System.Threading.Tasks
            
            // HEAD requests from Microsoft Excel that may cause
            // TaskCanceledException to be raised
                     
            ($.BaseException instanceof TaskCanceledException
             && 'HEAD' === $.Context.Request.HttpMethod
             && $.Context.Request.UserAgent.match(/\bMicrosoft\s+Office\s+Existence\s+Discovery\b/i))
            ]]></expression>
        </jscript>
    </test>
</errorFilter>
{% endhighlight %} 

This error typically occurs when Microsoft Excel is setup with a [Web Query](http://office.microsoft.com/en-us/excel-help/get-external-data-from-a-web-page-HA010218472.aspx) to asynchronous request handler in your application.
