---
title: Downloads
layout: page
permalink: downloads/
downloads: true
---

* TOC 
{:toc}

See also [archived download list](https://bitbucket.org/project-elmah/main/wiki/Downloads), including those [deprecated](https://bitbucket.org/project-elmah/main/wiki/Downloads#markdown-header-deprecated).

## Current Releases

### ELMAH 1.2 SP2

There are several ways to download ELMAH 1.2 Service Pack (SP) 2. You can either grab the fat archives containing everything you might ever need or go for leaner ones if you think you know exactly what you need.

<div class="note info">
  <h5>ELMAH, SQLite &amp; 32-bit vs. 64-bit</h5>
  <p>
    ELMAH itself is independent of <a href="http://msdn.microsoft.com/en-us/library/system.reflection.processorarchitecture.aspx">processor architecture</a> (i.e. pure managed code). However, it becomes important to distinguish between 32-bit (x86) and 64-bit (x64) environments for archives and deployments that include the SQLite driver binary.
  </p>
</div>

The fat downloads with most of what you might ever need are:

| Download | Description |
|----------|-------------|
| [Binaries (x86)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp2-bin-x86.zip) | Binaries for deploying to a 32-bit (x86) environment running .NET Framework 1.x, 2.0 or a later version. This archive includes debug builds, samples, dependencies and scripts. Source code is not included. |
| [Binaries (x64)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp2-bin-x64.zip) | Binaries for deploying to a 64-bit (x64) environment running .NET Framework 1.x, 2.0 or a later version. This archive includes debug builds, samples, dependencies and scripts. Source code is not included. |
| [Sources](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp2-src.zip)            | Source files for development. Use this for private builds or to contribute fixes and enhancements back to the project. See [Compiling] for more help. |

If all you want is the ELMAH assembly for Microsoft .NET Framework 2.0 or a later version then download one of the _core binary_ archives below. The core binary includes built-in support for logging errors to memory, loose XML files, Microsoft Access, Microsoft SQL Server and Oracle.

| Download | Description |
|----------|-------------|
| [Core Binary](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp2-bin-core.zip)            | Stand-alone ELMAH binary, including Program Database (PDB) file. |
| [Core Binary (debug)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp2-dbg-core.zip)    | Stand-alone debug build of ELMAH, including Program Database (PDB) file. Use of debug build is recommended if you are developing on top of ELMAH and want maximum debugging support. It _not_ recommended for production use because it prevents the JIT compiler from making optimizations. |
| [Sample web.config](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp2-sample-web.config) | [Sample web.config](https://bitbucket.org/project-elmah/1x/src/3a71f9a4eeb57921662b5a5acc211fc4b0932cae/samples/web.config?at=v1.2-sp2&fileviewer=file-view-default) file that illustrates how to configure the various options. It can be handy for necessary sections relevant for your own `web.config` and avoid unnecessary typos. |

If you downloaded the _core binary_ then you may need additional driver binaries from below depending on the database you choose for logging errors. These binaries go alongside `Elmah.dll`. You will also need to download a DDL script for creating database objects.

| Database | Driver Binaries | DDL Script | Notes |
|----------|-----------------|------------|-------|
| [Microsoft Access](http://office.microsoft.com/access/) | Included in .NET Framework | [MS Access DDL (WSH) Script](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-db-mkmdb.vbs) | The DDL script is also embedded in ELMAH. You may need it if you don't have sufficient rights to create the database at runtime. |
| [Microsoft SQL Server](http://www.microsoft.com/sqlserver/) | Included in .NET Framework | [MS SQL Server DDL Script](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-db-SQLServer.sql) | - |
| [MySQL](http://www.mysql.com/) | [MySQL Binaries](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-lib-MySql.zip) | [MySQL DDL Script](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-db-MySql.sql) | - |
| [Oracle](http://www.oracle.com/) | Included in .NET Framework 2.0+ | [Oracle DDL Script](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-db-Oracle.sql) | - |
| [PostgreSQL](http://www.postgresql.org/) | [PostgreSQL Binaries](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-lib-Pgsql.zip) | [PostgreSQL DDL Script](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-db-Pgsql.sql) | - |
| [SQLite](http://www.sqlite.org/) | [SQLite (x86)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-lib-SQLite-x32.zip) or [SQLite (x64)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-lib-SQLite-x64.zip) | Embedded in ELMAH | There is no separate DDL script available for download. `SQLiteErrorLog` in ELMAH will [create the database file](https://bitbucket.org/project-elmah/1x/src/3a71f9a4eeb57921662b5a5acc211fc4b0932cae/src/Elmah/SQLiteErrorLog.cs?at=v1.2-sp2&fileviewer=file-view-default#SQLiteErrorLog.cs-122) and [objects within](https://bitbucket.org/project-elmah/1x/src/3a71f9a4eeb57921662b5a5acc211fc4b0932cae/src/Elmah/SQLiteErrorLog.cs?at=v1.2-sp2&fileviewer=file-view-default#SQLiteErrorLog.cs-125) at run-time. Only the platform-specific driver binaries are needed. |
| [Microsoft SQL Server Compact (SSCE)](http://www.microsoft.com/sqlserver/en/us/editions/compact.aspx) 4.0 | See section on private deployment in [SQLServerCompact](/a/sql-server-compact/) | Embedded in ELMAH | There is no separate DDL script available for download. `SqlCompactErrorLog` in ELMAH will [create the database file](https://bitbucket.org/project-elmah/1x/src/3a71f9a4eeb57921662b5a5acc211fc4b0932cae/src/Elmah/SqlServerCompactErrorLog.cs?at=v1.2-sp2&fileviewer=file-view-default#SQLiteErrorLog.cs-107) and [objects within](https://bitbucket.org/project-elmah/1x/src/3a71f9a4eeb57921662b5a5acc211fc4b0932cae/src/Elmah/SqlServerCompactErrorLog.cs?at=v1.2-sp2&fileviewer=file-view-default#SQLiteErrorLog.cs-129) at run-time. |

### NuGet Packages

The quickest way to get started with ELMAH is to use one of the following NuGet
packages that already contain the necessary binaries, as well as initial
configuration for ASP.NET applications and various backing error log stores:

- [elmah.corelibrary](https://www.nuget.org/packages/elmah.corelibrary/):
  Just the library without any configuration
- [elmah](https://www.nuget.org/packages/elmah/):
  ELMAH with initial configuration for its ASP.NET modules and handlers
- [elmah.xml](https://www.nuget.org/packages/elmah.xml/):
  Configuration for logging to stand-alone XML files
- [elmah.sqlqerver](https://www.nuget.org/packages/elmah.sqlserver/):
  Configuration for logging to a Microsoft SQL Server (2000 or later)
- [elmah.sqlservercompact](https://www.nuget.org/packages/elmah.sqlservercompact/):
  Configuration for logging to a Microsoft SQL Server Compact database
- [elmah.access](https://www.nuget.org/packages/elmah.msaccess/):
  Configuration for logging to a Microsoft Access database
- [elmah.mysql](https://www.nuget.org/packages/elmah.mysql/):
  Configuration for logging to a MySQL 5.0+ database
- [elmah.oracle](https://www.nuget.org/packages/elmah.oracle/):
  Configuration for loggin to an Oracle database
- [elmah.postgresql](https://www.nuget.org/packages/elmah.postgresql/):
  Configuration for logging to a PostgreSQL database
  
Don't forget to also check-out the [many packages on NuGet that build on top of ELMAH](https://www.nuget.org/packages?q=ELMAH).

## Older Releases

### ELMAH 1.2 SP1

  * [Binaries (x86)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp1-bin-x86.zip)
  * [Binaries (x64)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp1-bin-x64.zip)
  * [Sources](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-sp1-src.zip)

### ELMAH 1.2

  * [Binaries (x86)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-bin-x86.zip)
  * [Binaries (x64)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-bin-x64.zip)
  * [Sources](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.2-src.zip)

### ELMAH 1.1

  * [Binaries (x86)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.1-bin.zip)
  * [Binaries (x64)](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.1-bin-x64.zip)
  * [Sources](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.1-src.zip)

### ELMAH 1.0

  * [Full Package](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.0-bin.zip)
  * [Binaries](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.0-bin.zip)
  * [Sources](https://bitbucket.org/project-elmah/main/downloads/ELMAH-1.0-src.zip)