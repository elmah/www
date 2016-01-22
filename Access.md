---
title: Using ELMAH with Microsoft Access
layout: page
permalink: a/msaccess/
article: true
---

## Introduction

ELMAH supports the logging of errors to a Microsoft Access database file using the `AccessErrorLog`, and does so against all versions of the .NET Framework. It provides this support using the in-built [OLE DB provider](http://msdn.microsoft.com/en-us/library/system.data.oledb.aspx). The managed OLE DB provider needs [OleDbPermission](http://msdn.microsoft.com/en-us/library/system.data.oledb.oledbpermission.aspx) to run therefore you will most likely encounter security issues when trying to use `AccessErrorLog` in a [medium trust environment](http://msdn.microsoft.com/en-us/library/ms998341.aspx).

## Configuring ELMAH

If you look in the sample [`web.config`][web.config] file. You will find commented examples of how to configure ELMAH with each available implementation, including Microsoft Access.

The main thing to consider here is where you want your database to reside. The sample [`web.config`][web.config] file suggests a database called `elmah.mdb` located in the `App_Data` folder of your website.

### Choosing App\_Data

There is one nice advantage of choosing the `App_Data` folder as the location for your Access database. Visual Studio will automatically detect it is there and will display it in the [Server Explorer](http://msdn.microsoft.com/en-us/library/x603htbk.aspx) window:

![Access Server Explorer](/img/AccessServerExplorer.png)

If you then bring up the context-menu for the `ELMAH_Error` table (usually by right-clicking the node) you will be able to select _Retrieve Data_ and then view your logged errors directly from within Visual Studio:

![Access Server Explorer Context Menu](/img/AccessServerExplorerContextMenu.png)

## Creating the Access Database

Normally, you shouldn't need to create the Access database that you have configured in your connection strings. If the database does not exist, `AccessErrorLog` will attempt to create it for you. In order for this to work, the user account that is running your website will need file creation permissions on the directory where the MDB will be created. In certain situations, this might not be possible (e.g. in a secure enterprise environment), so there is also a manual way of creating the database. The ELMAH source code includes a file called [`mkmdb.vbs`][mkmdb.vbs] which is the VBScript file that `AccessErrorLog` also executes at run-time to create the Access database. To create the database manually yourself, simply save [`mkmdb.vbs`][mkmdb.vbs] to a local disk and then run it as follows:

{% highlight text %}
mkmdb.vbs MDB-PATH
{% endhighlight %}

where `MDB-PATH` specifies the path at which the MDB file should be created, e.g.:

{% highlight text %}
mkmdb.vbs %temp%\elmah.mdb
{% endhighlight %}

_Note that the full path **must** exist in order for the VBScript to succeed._ Once the file has been created, you can move it and rename it so that it can be deployed to your secure environment.


  [mkmdb.vbs]: https://www.assembla.com/spaces/elmah/subversion/source/HEAD//trunk/src/Elmah/mkmdb.vbs
  [web.config]: https://www.assembla.com/spaces/elmah/subversion/source/HEAD//trunk/samples/web.config