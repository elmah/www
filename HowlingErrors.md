---
title: Howling Errors
layout: page
permalink: a/howling-errors/
article: true
deprecated: true
---

<div class="note warning">
  The Howl application no longer appears to be available online and on the <a href="https://itunes.apple.com/us/genre/ios/id36?mt=8">Apple App Store</a>
</div>

ELMAH ships with a module called `ErrorTweetModule` that was originally designed to post brief error notifications to a Twitter account. It only made sense, in fact, for a Twitter account where updates were locked away from public view. If the account had a following then those people would receive notifications as well.

`ErrorTweetModule` shipped with ELMAH before Twitter service [disabled the use of Basic authentication](http://blog.twitter.com/2010/08/twitter-applications-and-oauth.html). While `ErrorTweetModule` won't work for Twitter anymore, it was developed general enough that you can still use it with custom or other notification services. It's not by chance that the module was named `ErrorTweetModule` instead of `ErrorTwitterModule`; _tweet_, in this context, meaning a brief message or update. In this article, you will see how to use `ErrorTweetModule` to receive notification on an iPhone or an iPad without writing a single line of code!

`ErrorTweetModule` fundamentally takes an unhandled or [signaled](http://code.google.com/p/elmah/wiki/DotNetSlackersArticle#Signaling_errors) exception and turns it into an HTTP form post to any URL. Like most other modules in ELMAH, it can be configured with a few options. Out of the box, `ErrorTweetModule` is setup to post to Twitter such that all that was left to do in the past (while Twitter still supported Basic authentication) was configuring the user name and password of a Twitter account and one was good to go.

In its default state, the module is configured as if you had the following under `elmah` section group in your `web.config`:

{% highlight xml %}
<errorTweet
    userName=""
    password=""
    statusFormat="{Message}"
    maxStatusLength="140"
    ellipsis="..."
    url="http://twitter.com/statuses/update.xml"
    formFormat="status={0}" />
{% endhighlight %}

Following is a breif explanation of the attributes:

| Attribute         | Meaning |
|-------------------|---------|
| `userName`        | User name for (Basic) authentication |
| `password`        | User password for (Basic) authentication |
| `statusFormat`    | Template used to format the tweet, status update or notification message (hereafter referred to as simply _tweet_) |
| `maxStatusLength` | Maximum length of the tweet |
| `ellipsis`        | The text that is appended to the tweet if it is clipped, that is, if it exceeds `maxStatusLength` |
| `url`             | URL where to post the tweet |
| `formFormat`      | Template used to format the HTTP form posted |

Let's see how configuring these attributes, you can use have `ErrorTweetModule` send you nearly real-time notifications to a device such as an iPhone or an iPad.

<img src='https://pbs.twimg.com/profile_images/376423734/Howl-Icon-256.png' width='128' height='128'>

[Howl](http://howlapp.com/) is a Growl application for iPhone and iPad. It sports a simple [API](http://howlapp.com/interface.html) using which one can emit notifications with HTTP POST and have them subequently deliviered to your device.

First, you will need to purchase the [Howl application](http://itunes.apple.com/us/app/howl-a-growl-app/id327646112?mt=8) for your device:

<img src='http://a1.mzstatic.com/us/r1000/042/Purple/af/60/c2/mzl.kudjygoq.320x480-75.jpg' width='320' height='480' />

Next, setup an account from within the application. Make sure that when you setup your account, you supply a valid e-mail address (marked optional in the application but required for posting notifications). Once your e-mail address has been verified, open the `web.config` of a web application already using ELMAH. Define the following section under the `<sectionGroup>` element for `elmah`:

{% highlight xml %}
<section
    name="errorTweet" requirePermission="false"
    type="Elmah.ErrorTweetSectionHandler, Elmah" />
{% endhighlight %}

Next, add the following section under the `<elmah>` section group:

{% highlight xml %}
<errorTweet
    userName="USERNAME"
    password="PASSWORD"
    formFormat="name=error&amp;amp;title=Error%20%40%20example.com&amp;amp;description={0}&amp;amp;application=ELMAH&amp;amp;icon-name=warning"
    url="https://howlapp.com/public/api/notification" />
{% endhighlight %}

Replace `USERNAME` and `PASSWORD` in caps above with your Howl account user name and password. You may also want to replace `example.com` or other parts of the `formFormat` attribute to more meaningful values. See the [Howl public notification API](http://howlapp.com/interface.html) for more details and the meaning of the various form fields.

You will then need to register the HTTP module by adding the following element in the `<httpModules>` section:

{% highlight xml %}
<add name="ErrorTweet"
     type="Elmah.ErrorTweetModule, Elmah" />
{% endhighlight %}

If you are using IIS 7 or later then you will need the following entry in the `<modules>` section:

{% highlight xml %}
<add name="ErrorTweet"
     type="Elmah.ErrorTweetModule, Elmah"
     preCondition="managedHandler" />
{% endhighlight %}

That's it! Next time you get an error, you should see a notification appear on your device, similar to screen captures below!

<img width='320' height='480' src='http://wiki.elmah.googlecode.com/hg/howl-iphone-lock.png' />
<img width='320' height='480' src='http://wiki.elmah.googlecode.com/hg/howl-iphone.png' />

<img width='384' height='512' src='http://wiki.elmah.googlecode.com/hg/howl-ipad-lock.png' />
<img width='512' height='384' src='http://wiki.elmah.googlecode.com/hg/howl-ipad.png' />

Note that you can also use [error filtering](/a/error-filtering/) together with `ErrorTweetModule`. Just make sure that `ErrorTweetModule` is registered _before_ `ErrorFilterModule` in the modules section.

You can now imagine how you can use `ErrorTweetModule` to also send error notifications to a custom in-house service!