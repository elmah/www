---
title: Using ELMAH with Oracle
layout: page
permalink: a/oracle/
article: true
---

ELMAH supports the logging of errors to an Oracle data store using the `OracleErrorLog`. This implementation is **not** supported in version 1.0 of the .NET Framework, as it relies on the Microsoft Oracle Client which was introduced with version 1.1 of the framework.

## Configuring Your Database

The first thing you need to do in order to use the `OracleErrorLog` is to configure your database. The ELMAH source code includes a file called [`Oracle.sql`](http://elmah.googlecode.com/svn/trunk/src/Elmah/Oracle.sql) which is the basis for everything you need to do.

### The Simple Way

The simplest way to get your database up and running is to:

  1. Log into Oracle as the owner of the objects that you are going to create (probably using SQL\*Plus)
  1. Run the [`Oracle.sql`](http://elmah.googlecode.com/svn/trunk/src/Elmah/Oracle.sql) script as is

NB In order to run the script, the logged in user will require `CREATE TABLE`, `CREATE PROCEDURE`, and `CREATE SEQUENCE` privileges.

You should also note, that if you go down this route, you will probably be connecting to Oracle (through ELMAH) as the owner of these objects.

### The "DBA" Way

Most Oracle deployments will actually require a little configuration, so before you start, read through the script and familiarize yourself with all the comments (prefixed by `--`).

You (or your DBA!) will now need to make a few decision based around Oracle security.

#### 1) Which user is going to own the Elmah data within Oracle?

You just need to log on as this user (who will require `CREATE TABLE`, `CREATE PROCEDURE`, `CREATE SEQUENCE` privileges) and run the script that is in the url above.

Optionally, you can uncomment the `-- TABLESPACE` bits to specify where you want to store the Elmah data.
If the owner doesn't have the privileges listed above, you can create the objects as a DBA in the desired user's schema.
To do this, modify all the `CREATE` statements to be qualified with the owner's schema... e.g. `CREATE TABLE owner.elmah$error` etc

#### 2) Which user will connect to the schema through ASP.NET?

If you are planning to use the data owner, you don't have to do anything else, as your database is set up and ready to go.
However, if you want to lock things down, you will need to `GRANT EXECUTE` privileges on the Oracle packages `pkg_elmah$log_error` and `pkg_elmah$get_error`. The comments at the end of the [`Oracle.sql`](http://elmah.googlecode.com/svn/trunk/src/Elmah/Oracle.sql) file give you three options on how to do this.

NB If you do take this approach, you will need to set the `schemaOwner` parameter in your `web.config`. In which case, please look at the sample [`web.config`](http://elmah.googlecode.com/svn/trunk/samples/web.config) file, which offers guidance.

## Configuring ELMAH

So at this point, Oracle is set up and you're pretty much done!!

You now need to set up your web.config to use Elmah and in particular the Oracle implementation. The best place to start here is to look in the sample [web.config](http://elmah.googlecode.com/svn/trunk/samples/web.config) file, which contains commented examples of how to configure Elmah with each available implementation, including Oracle.

NB You can use the Oracle implementation across multiple websites, or have a separate database for each one. You can set an application name for each website using the `applicationName="xxx"` setting, or you can leave Elmah to infer the application name by itself.

Here is an example for ASP.NET 2.0:

{% highlight xml %}
<elmah>
    <!--
        Use to log errors to Oracle
        using ASP.NET 2.0. Set value of connectionStringName attribute
        to the name of the connection string settings to use from
        the <connectionStrings> section.
    
        The schemaOwner parameter is *optional*. Use this if the owner of the
        ELMAH package (pkg_elmah$error) is not the same user that you are 
        using to connect to the database.
        
    <errorLog type="Elmah.OracleErrorLog, Elmah" 
        schemaOwner ="elmah_package_owner" />
        connectionStringName="elmah_oracle_connection_string" />
    -->
</elmah>
{% endhighlight xml %}
