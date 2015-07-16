---
title: Prowling Errors
layout: page
permalink: a/prowling-errors/
article: true
---

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

![http://www.prowlapp.com/static/apps/prowlmail.png](http://www.prowlapp.com/static/apps/prowlmail.png)

[Prowl](http://prowlapp.com) is a [Growl-like](http://growl.info) application for iPhone and iPad. It sports a simple [API](http://www.prowlapp.com/api.php) using which one can emit notifications with HTTP POST and have them subequently deliviered to your device.

First, you will need to purchase the [Prowl application](https://itunes.apple.com/us/app/prowl-growl-client/id320876271?mt=8) for your device:

![http://www.prowlapp.com/static/home1.3/popup_full.png](http://www.prowlapp.com/static/home1.3/popup_full.png)

Next, [register with prowlapp.com](https://www.prowlapp.com/register.php) and once your account has been created and registration is complete, open the `web.config` of a web application already using ELMAH. Define the following section under the `<sectionGroup>` element for `elmah`:

{% highlight xml %}
<section
	name="errorTweet" requirePermission="false"
	type="Elmah.ErrorTweetSectionHandler, Elmah" />
{% endhighlight %}

Next, add the following section under the `<elmah>` section group:

{% highlight xml %}
<errorTweet
	formFormat="apikey=APIKEY&amp;application=ELMAH&amp;event=Error%20%40%20example.com&amp;priority=high&amp;description={0}"
	url="https://api.prowlapp.com/publicapi/add" />
{% endhighlight %}

Replace `APIKEY` in caps above with [your Prowl API key](https://www.prowlapp.com/api_settings.php). You may also want to replace `example.com` or other parts of the `formFormat` attribute to more meaningful values. See the [Prowl third-party API](http://www.prowlapp.com/api.php#add) for more details and the meaning of the various form fields.

You will then need to register the HTTP module by adding the following element in the `<httpModules>` section:

{% highlight xml %}
<add
	name="ErrorTweet"
	type="Elmah.ErrorTweetModule, Elmah" />
{% endhighlight %}

If you are using IIS 7 or later then you will need the following entry in the `<modules>` section:

{% highlight xml %}
<add
	name="ErrorTweet"
	type="Elmah.ErrorTweetModule, Elmah"
	preCondition="managedHandler" />
{% endhighlight %}

That's it! Next time you get an error, you should see a notification appear on your device, similar to screen captures below!

<img width='320' height='568' src='http://wiki.elmah.googlecode.com/hg/prowl-iphone-lock.png' />
<img width='320' height='568' src='http://wiki.elmah.googlecode.com/hg/prowl-iphone.png' />

Note that you can also use ErrorFiltering together with `ErrorTweetModule`. Just make sure that `ErrorTweetModule` is registered _before_ `ErrorFilterModule` in the modules section.

You can now imagine how you can use `ErrorTweetModule` to also send error notifications to a custom in-house service!