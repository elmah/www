---
title: Downloads
layout: page
permalink: downloads/
downloads: true
---

* TOC 
{:toc}

See also: [current](http://code.google.com/p/elmah/downloads/list), [featured](http://code.google.com/p/elmah/downloads/list?can=3), [deprecated](http://code.google.com/p/elmah/downloads/list?can=4) and [all](http://code.google.com/p/elmah/downloads/list?can=1) downloads

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
| [Binaries (x86)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp2-bin-x86.zip) | Binaries for deploying to a 32-bit (x86) environment running .NET Framework 1.x, 2.0 or a later version. This archive includes debug builds, samples, dependencies and scripts. Source code is not included. |
| [Binaries (x64)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp2-bin-x64.zip) | Binaries for deploying to a 64-bit (x64) environment running .NET Framework 1.x, 2.0 or a later version. This archive includes debug builds, samples, dependencies and scripts. Source code is not included. |
| [Sources](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp2-src.zip)            | Source files for development. Use this for private builds or to contribute fixes and enhancements back to the project. See [Compiling] for more help. |

If all you want is the ELMAH assembly for Microsoft .NET Framework 2.0 or a later version then download one of the _core binary_ archives below. The core binary includes built-in support for logging errors to memory, loose XML files, Microsoft Access, Microsoft SQL Server and Oracle.

| Download | Description |
|----------|-------------|
| [Core Binary](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp2-bin-core.zip)            | Stand-alone ELMAH binary, including Program Database (PDB) file. |
| [Core Binary (debug)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp2-dbg-core.zip)    | Stand-alone debug build of ELMAH, including Program Database (PDB) file. Use of debug build is recommended if you are developing on top of ELMAH and want maximum debugging support. It _not_ recommended for production use because it prevents the JIT compiler from making optimizations. |
| [Sample web.config](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp2-sample-web.config) | [Sample web.config](http://1x.elmah.googlecode.com/hg-history/v1.2-sp2/samples/web.config) file that illustrates how to configure the various options. It can be handy for necessary sections relevant for your own `web.config` and avoid unnecessary typos. |

If you downloaded the _core binary_ then you may need additional driver binaries from below depending on the database you choose for logging errors. These binaries go alongside `Elmah.dll`. You will also need to download a DDL script for creating database objects.

| Database | Driver Binaries | DDL Script | Notes |
|----------|-----------------|------------|-------|
| [Microsoft Access](http://office.microsoft.com/access/) | Included in .NET Framework | [MS Access DDL (WSH) Script](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-db-mkmdb.vbs) | The DDL script is also embedded in ELMAH. You may need it if you don't have sufficient rights to create the database at runtime. |
| [Microsoft SQL Server](http://www.microsoft.com/sqlserver/) | Included in .NET Framework | [MS SQL Server DDL Script](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-db-SQLServer.sql) | - |
| [MySQL](http://www.mysql.com/) | [MySQL Binaries](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-lib-MySql.zip) | [MySQL DDL Script](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-db-MySql.sql) | - |
| [Oracle](http://www.oracle.com/) | Included in .NET Framework 2.0+ | [Oracle DDL Script](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-db-Oracle.sql) | - |
| [PostgreSQL](http://www.postgresql.org/) | [PostgreSQL Binaries](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-lib-Pgsql.zip) | [PostgreSQL DDL Script](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-db-Pgsql.sql) | - |
| [SQLite](http://www.sqlite.org/) | [SQLite (x86)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-lib-SQLite-x32.zip) or [SQLite (x64)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-lib-SQLite-x64.zip) | Embedded in ELMAH | There is no separate DDL script available for download. `SQLiteErrorLog` in ELMAH will [create the database file](http://code.google.com/p/elmah/source/browse/src/Elmah/SQLiteErrorLog.cs?repo=1x&name=v1.2-sp2#122) and [objects within](http://code.google.com/p/elmah/source/browse/src/Elmah/SQLiteErrorLog.cs?repo=1x&name=v1.2-sp2#125) at run-time. Only the platform-specific driver binaries are needed. |
| [Microsoft SQL Server Compact (SSCE)](http://www.microsoft.com/sqlserver/en/us/editions/compact.aspx) 4.0 | See section on private deployment in [SQLServerCompact](https://code.google.com/p/elmah/wiki/SQLServerCompact) | Embedded in ELMAH | There is no separate DDL script available for download. `SqlCompactErrorLog` in ELMAH will [create the database file](http://code.google.com/p/elmah/source/browse/src/Elmah/SqlServerCompactErrorLog.cs?repo=1x&name=v1.2-sp2#107) and [objects within](http://code.google.com/p/elmah/source/browse/src/Elmah/SqlServerCompactErrorLog.cs?repo=1x&name=v1.2-sp2#129) at run-time. |

## Older Releases

### ELMAH 1.2 SP1

  * [Binaries (x86)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp1-bin-x86.zip)
  * [Binaries (x64)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp1-bin-x64.zip)
  * [Sources](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-sp1-src.zip)

### ELMAH 1.2

  * [Binaries (x86)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-bin-x86.zip)
  * [Binaries (x64)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-bin-x64.zip)
  * [Sources](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.2-src.zip)

### ELMAH 1.1

  * [Binaries (x86)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.1-bin.zip)
  * [Binaries (x64)](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.1-bin-x64.zip)
  * [Sources](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.1-src.zip)

### ELMAH 1.0

  * [Full Package](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.0-bin.zip)
  * [Binaries](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.0-bin.zip)
  * [Sources](http://code.google.com/p/elmah/downloads/detail?name=ELMAH-1.0-src.zip)