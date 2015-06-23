---
title: Using ELMAH with SQL Server Compact 4.0
layout: page
article: true
permalink: a/sql-server-compact/
---

ELMAH, from version 1.2 and onwards, supports the logging of errors to a [SQL Server Compact 4.0](http://www.microsoft.com/en-us/download/details.aspx?id=17876) database file using the `SqlServerCompactErrorLog`, but only against .NET Framework version 3.5 SP1 or a later release. It provides this support using the [SQL Server Compact ADO.NET Provider](http://msdn.microsoft.com/en-us/library/system.data.sqlserverce.aspx). The provider supports medium trust environments under ASP.NET 4.0 but requires full trust on earlier versions.

## Configuring ELMAH

If you look in the [sample web.config](http://elmah.googlecode.com/svn/tags/REL-1.2-SP1/samples/web.config) file, you will find commented examples of how to configure ELMAH with each available implementation, including SQL Server Compact 4.0. The main thing to consider is where you want your database to reside. The [sample web.config](http://elmah.googlecode.com/svn/tags/REL-1.2-SP1/samples/web.config) file suggests a database called `elmah.sdf` located in the `App_Data` folder of your website.

## Private Deployment of SQL Server Compact 4.0 Binaries

SQL Server Compact 4.0 supports private deployment of x86 and x64 binaries within the same folder structure. See the “[SQL Server Compact ‘Private Deployment’ on desktop–an overview](http://erikej.blogspot.com/2010/11/sql-server-compact-private-deployment.html)” blog post for details and links to further information.