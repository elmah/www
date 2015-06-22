---
title: Securing Error Log Pages
layout: page
permalink: a/securing-error-log-pages/
article: true
---

You can secure ELMAH's display or feeds in two ways:

  * Enabling or disabling remote access
  * Granting or denying access via ASP.NET authorization

Both of these are discussed in the sub-sections that follow.

<div class="note warning">
  <h5>Why is this so important?</h5>
  <p>
    See <a href="http://www.troyhunt.com/2012/01/aspnet-session-hijacking-with-google.html">ASP.NET session hijacking with Google and ELMAH</a>.
  </p>
</div>

## Enabling or Disabling Remote Access

ELMAH provides a configuration section and a setting to enable or disable remote access to the error log display and feeds. When disabled (the default), only local access to the error log display and feeds is allowed. The snippet below shows how to enable remote access:

{% highlight xml %}
<elmah>  
    <security allowRemoteAccess="1" />  
</elmah>  
{% endhighlight %}

Remote access is enabled when the value of the `allowRemoteAccess` attribute is either `1`, `yes`, `true` or `on`. Otherwise it is disabled. Local access is always available.

<div class="note info">
  <h5>Have expected configuration sections declared</h5>
  <p>
    Make sure you have declared the expected configuration sections in order to apply the above configuration.
    See <a href="http://code.google.com/p/elmah/wiki/DotNetSlackersArticle#Declaring_configuration_sections">Declaring configuration sections</a> for more.
  </p>
</div>

## Granting or Denying Access via ASP.NET Authorization

If you must enable remote access, it is paramount that you also secure access to only authorized users. You can do this using ASP.NET's built-in authorization mechanism.

Different locations in a web site can be secured with different authorization rules. Suppose your web application is deployed at `http://www.example.com/` and ELMAH is configured to respond to `elmah.axd`. You can secure `http://www.example.com/elmah.axd` from unauthorized users by adding a `location` element to your configuration as follows:

{% highlight xml %}
<location path="elmah.axd">  
    <system.web>
        <httpHandlers>
            <add verb="POST,GET,HEAD" 
                 path="elmah.axd" 
                 type="Elmah.ErrorLogPageFactory, Elmah" />
        </httpHandlers>
        <authorization>
            <deny users="*" />  
        </authorization>  
    </system.web>
    <system.webServer>
        <handlers>
            <add name="ELMAH" 
                 verb="POST,GET,HEAD"
                 path="elmah.axd" 
                 type="Elmah.ErrorLogPageFactory, Elmah"
                 preCondition="integratedMode" />
        </handlers>
    </system.webServer>
</location>  
{% endhighlight %}

There are three important things to note here:

  1. The handler registrations need to be moved under the `location` tag. Having them outside does not secure access sufficiently.
  1. The `location` element's `path` attribute carries the same value as the `path` attribute of the handler registrations. Unfortunately, it has to be repeated so if you change one, the others must be updated to match.
  1. The `authorization` element is where the authorization rules go and where you will want to selectively grant access.

The configuration example above denies access to all users, but that is a good starting point. You will probably want to add rules that allow access to only specific users and/or roles. For example, you might have a role for administrators and developers called _admin_ and _dev_, respectively. To allow users that are members of either role, you could configure the `authorization` section above as follows:

{% highlight xml %}
<authorization>  
    <allow roles="admin" />  
    <allow roles="dev" />  
    <deny users="*" />  
</authorization>  
{% endhighlight %}

### Further Information

For more information, see also:

  * [Q316871: How To Control Authorization Permissions in an ASP.NET Application](http://support.microsoft.com/kb/316871)
  * [Q815174: How To Make Application and Directory-Specific Configuration Settings in an ASP.NET Application](http://support.microsoft.com/kb/815174)
  * [Q301240: How To Implement Forms-Based Authentication in Your ASP.NET Application by Using C#.NET](http://support.microsoft.com/kb/301240)
  * [Securely Implement ELMAH For Plug And Play Error Logging](http://haacked.com/archive/2007/07/24/securely-implement-elmah-for-plug-and-play-error-logging.aspx) and the accompanying [demo sample](http://code.haacked.com/aspnet/securing-elmah-demo.zip)