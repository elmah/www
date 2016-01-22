---
title: Error Log Implementations and Guidance on Choosing
layout: page
permalink: a/error-log-implementations/
article: true
---

ELMAH currently ships with seven error log implementations, listed in alphabetical order in the following table, together with their compatibility and .NET Framework version availability:

| Implementation      | Description                                                | Medium Trust       | 1.0   | 1.1   | 2.0   | 3.5   |
|:--------------------|:-----------------------------------------------------------|:------------------:|:-----:|:-----:|:-----:|:-----:|
| `AccessErrorLog`    | Logs errors in an Microsoft Access database file           | :x:                | :ok:  | :ok:  | :ok:  | :ok:  |
| `MemoryErrorLog`    | Logs errors to (volatile) memory                           | :ok:               | :ok:  | :ok:  | :ok:  | :ok:  |
| `OracleErrorLog`    | Logs errors to an Oracle database                          | :x:                | :x:   | :ok:  | :ok:  | :ok:  |
| `SqlErrorLog`       | Logs errors to a Microsoft SQL Server database             | :ok:               | :ok:  | :ok:  | :ok:  | :ok:  |
| `SQLiteErrorLog`    | Logs errors to a SQLite database file                      | :x:                | :x:   | :ok:  | :ok:  | :ok:  |
| `VistaDBErrorLog`   | Logs errors to a VistaDB (Express Edition) database file   | :ok:               | :x:   | :x:   | :ok:  | :ok:  |
| `XmlFileErrorLog`   | Logs errors to a directory as loose XML files              | :ok:<sup>1</sup>   | :ok:  | :ok:  | :ok:  | :ok:  |

<div class="note info">
  <h5><code>XmlFileErrorLog</code> Under Medium Trust</h5>
  <p>
    XmlFileErrorLog provider works in medium trust as long as it is configured to store XML error files into a folder under the root of the Web application. Medium trust, in fact, does not allow access to the file system except for the application directory and its subfolders.
  </p>
</div>

## Choosing Your Weapon

The providers listed above can be split into three distinct categories which should help make your decision easier.

### Simple Providers

There are two simple providers to choose from:

  * `MemoryErrorLog`
  * `XmlFileErrorLog`

#### MemoryErrorLog

The `MemoryErrorLog`, as its name suggests, stores errors in memory. Storing errors in memory is fast and suitable as long as they don't need to survive application re-starts. Since application resets are often unpredictable, this log provider is usually employed for testing and troubleshooting only; in cases when everything is going wrong, it's good to remove dependencies on external services and the `MemoryErrorLog` might help reducing moving parts. By default, the `MemoryErrorLog` stores only the last 15 errors and can be configured to retain a maximum of 500.

#### XmlErrorLog

The `XmlFileErrorLog` stores errors into loose XML files in a configurable directory. Each error gets its own file containing all of its details. The files can easily be copied around, deleted, compressed or mailed to someone for further diagnostics. It does not require any database engine or setup, like with SQL Server and Oracle, so there is very little management overhead and you do not need to worry about additional costs when it comes to hosting plans. Although simple, it relies on the file system performance for shredding through the directory, reading files and sorting through them. A smart way of keeping logs based on `XmlFileErrorLog` running smoothly is to limit the number of files by scheduling a task to periodically archive the old logs and clean up the folder.

### Desktop Database Engines

In this category, there are three providers to choose from:

  * `AccessErrorLog`
  * `SQLiteErrorLog`
  * `VistaDBErrorLog`

Regardless of your choice here, these providers will create the underlying database file automatically, removing the need for any up-front setup. Each one creates only a single file on disk so all errors for an application can be handled (archived, compressed, mailed, put on USB stick etc.) as a single unit.

#### AccessErrorLog

The `AccessErrorLog`, as you would expect, uses Microsoft Access as its database engine. Of the three providers in this category, this is the only one that is supported by ASP.NET 1.x, making it a great choice for legacy applications. Being part of the Microsoft Office suite of products, it will also be familiar to many Windows desktop developers. A big benefit of using `AccessErrorLog` is that you can open up the MDB in Microsoft Access for further analysis or reporting.

#### SQLiteErrorLog

[SQLite](http://www.sqlite.org/) is a public-domain, light-weight and embeddable relational database engine. `SQLiteErrorLog` uses [`System.Data.SQLite`](http://sqlite.phxsoftware.com/), which is an open source ADO.NET provider for the SQLite database engine. The SQLite storage is a good choice in terms of speed and cost because it is known to be very fast and doesn't require any additional service to be provided by an operations staff or Web application hoster. Its main limitation is that it needs _full trust_ to work.

#### VistaDBErrorLog

The `VistaDBErrorLog` uses the [VistaDB.Net](http://www.vistadb.net/) [Express Edition](http://vistadb.net/blog/vistadb-news/vistadb-express-release/) as its backing store. VistaDB is a database engine that has been written in 100% managed code and is free for non-commercial use. Because it is written in 100% managed code and makes no unmanaged, unsafe and unverifiable calls, it can run in medium trust environments and is therefore perfect for shared hosting scenarios.

### Enterprise-Level Relational Databases

At the high end, there are only two choices for your persistence, but they both are excellent options:

  * `SqlErrorLog`
  * `OracleErrorLog`

#### SqlErrorLog

The `SqlErrorLog` supports Microsoft SQL Server 2000 and later versions. This error log has several advantages over the rest. It runs against every version of .NET Framework to date (1.0 through 3.5); it runs under medium trust and can scale to support a number of applications in a single database.

While no other error log comes close to offering all of this, the one downside is that it requires some manual setup like creating a database and running a script to create tables and stored procedures.

One final point of note: The SQL scripts that come with `SqlErrorLog` use the `ntext` data type. Whilst this data type has been [deprecated with SQL Server 2005](http://msdn.microsoft.com/en-us/library/ms143729.aspx),  it is still fully supported (Microsoft recommend using **`nvarchar(max)`** instead). In order to maintain backward compatibility with existing deployments, `SqlErrorLog` continues to use **`ntext`**, a design decision that will undoubtedly be reviewed as ELMAH involves and technology moves on apace.

#### OracleErrorLog

The `OracleErrorLog` offers the same features as `SqlErrorLog` but requires full trust and supported on .NET Framework 1.1 or later. This implementation can run against Oracle 8i (from 8.1.7 onwards), Oracle 9i and Oracle 10g. There is every reason to believe that it will also run perfectly well with Oracle 11g as there are no known compatibility issues that would affect ELMAH, though it hasn't been tested against this version of the database yet.

#### Common Advantages

Whenever Microsoft SQL Server or Oracle are available, they represent the best choice for every application size and complexity. Speed, performance, data resilience and many others features are intrinsic of relational database engines. Furthermore, being server-based error logging providers, they both feature the capability of storing exceptions coming from different applications. This means that several applications can point to the same database and ELMAH will be able to store their exceptions in a way that each application will only see and be notified of its own exceptions. This is accomplished by storing the unique name of each application into a field of the table where ELMAH logs the errors and subsequently filtering on the same field whenever a query is performed.

This is especially useful in case a hosting provider or an operations environment within an enterprise want to provide a centralized error logging mechanism out of the box without wasting too many server resources and without requiring each user to have its own database for that. They would expose a public connection string pointing to a database every user can connect to just for error logging.

Ultimately, the choice here is more than likely going to be governed by corporate standards and/or what is available to you.
Both options here require DBA (Database Administrator) skills to get things up and running, though the `SqlErrorLog` provider will probably be much more prevalent given the advantages already listed above.

#### Database License Costs

One of the biggest arguments against using enterprise-level databases is that of cost. Whilst license fees for both SQL Server and Oracle can be prohibitive for most users, it is worth pointing out that both SQL Server and Oracle come in free "Express Editions". There are a few limitations as to their use, but they are both more than adequate for use with ELMAH. [SQL Server Express Edition](http://www.microsoft.com/express/sql/default.aspx) and [OracleXE](http://www.oracle.com/technology/software/products/database/xe/index.html) are both worth investigating if you want an enterprise-level database but without the usual costs associated with it.