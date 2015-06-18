---
title: Error Log Download Applications
layout: page
permalink: a/error-log-download-applications/
article: true
---

ELMAH allows the entire error log to be downloaded as a single CSV format that be can useful for occasional and ad-hoc analysis, filtering and charting using [Microsoft Excel](http://www.microsoft.com/excel/) and/or [Microsoft Log Parser](http://www.microsoft.com/technet/scriptcenter/tools/logparser/default.mspx). The download feature also supports an additional format dubbed in ELMAH as HTML-JSONP. This format enables interesting, dynamic and asynchronous reporting pages to be developed on top of the error log.

In the HTML-JSONP format, ELMAH produces a single HTML document with [JSONP](http://en.wikipedia.org/wiki/JSONP) callbacks wrapped in `script` tags. Each callback delivers a single page of (hundred or so) errors. For best results, the HTML document is designed to be hosted in an `iframe` in a parent document with JSONP callbacks being delivered to it. This has two benefits. First, the _iframed_ HTML document loads asynchronously while the parent document can remain interactive. Second, ELMAH streams down the document in chunks so that the browser can parse and evaluate each `script` tag as it arrives and make the JSONP callbacks on the parent. This enables the parent or host document to process a page of errors as soon as it is delivered, meaning the user does not have to wait for the entire log to download before beginning to receive some feedback or reporting. This can be especially important when the log grows large or if you happen to be browsing on a mobile device such as a phone or a tablet and the network latency is high.

The HTML-JSONP format is requested by appending a query to the log download URL with the following named fields/parameters:

| Name       | Required | Meaning |
|------------|----------|---------|
| `format`   | Yes      | Must be `html-jsonp` |
| `callback` | Yes      | Client-side JavaScript method to call |
| `limit`    | No       | Maximum number of most recent errors to return from the log (entire log is returned if omitted) |

Assuming that ELMAH is deployed at `http://www.example.com/elmah.axd` and the download URL is `http://www.example.com/elmah.axd/download`, you would request HTML-JSONP format using `http://www.example.com/elmah.axd/download?format=html-json&callback=parent.onerrors`. The `callback` parameter identifies the JavaScript function to call back and here it is assumed that you have an `onerrors` function defined on the parent window. In the top HTML document, you would have an `iframe` like this:

{% highlight html %}
<iframe width="0" height="0"
        src="http://www.example.com/elmah.axd/download?format=html-json&callback=parent.onerrors"></iframe>
{% endhighlight %}

The callback function receives a single object value each time with two properties, namely `total` and `errors`. `total` is always a number representing the total errors recorded in the log whereas `errors` is an array whose each element is an object representing a single error entry. Below is an example of one such entry in JSON:

{% highlight json %}
{
  "application":"/LM/W3SVC/3/ROOT",
  "host":"EXAMPLEHOST",
  "type":"System.FormatException",
  "message":"Guid should contain 32 digits with 4 dashes (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).",
  "source":"mscorlib",
  "time":"2010-01-05T12:13:03.280Z",
  "hrefs":[
    {
      "type":"text/html",
      "href":"http://www.example.com/elmah.axd/detail?id=165fcfa3-ad18-41b0-9240-4357e29d4db3"
    },
    {
      "type":"aplication/json",
      "href":"http://www.example.com/elmah.axd/json?id=165fcfa3-ad18-41b0-9240-4357e29d4db3"
    },
    {
      "type":"application/xml",
      "href":"http://www.example.com/elmah.axd/xml?id=165fcfa3-ad18-41b0-9240-4357e29d4db3"
    }
  ]
}
{% endhighlight %}

Note the the `hrefs` array can be used to obtain further details about the error in various formats (HTML, JSON and XML). To tell the callback function that the entire log has been delivered, ELMAH issues a last callback where the errors array is empty.

The callback function should be designed to handle duplicate entires and a changing total number of errors. Both can happen, for example, when new errors get logged while the log is being downloaded. This is the reason ELMAH delivers the total count of error with each callback and page of errors.

[Elvue](https://bitbucket.org/raboof/elvue) is an open source and a working example of a single HTML page that produces a tabular and graphical report of the types of errors logged in an ELMAH error log (see screen shot below). You are encouraged to study the source and also contribute ideas.

<img width='800' height='609' src='http://wiki.elmah.googlecode.com/hg/elvue.png' />