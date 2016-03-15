---
title: Compiling
layout: page
permalink: a/compiling/
article: true
---

## ELMAH 2x

You can compile ELMAH from the sources in one of two ways:

  * Interactively, using solution and project files supplied for Microsoft Visual Studio.
  * Using a batch script that requires MS Build

### Compiling Interactively Using Microsoft Visual Studio

Use the Microsoft Visual Studio solution named Elmah.sln found in the root directory. There are project files supplied for Microsoft Visual Studio 2013 under respective sub-directories.

### Batch Compiling Using MSBuild

The `build.cmd` script launches MSBuild to compile the solution from the command-line. The batch script detects the versions installed on your system and builds only using those versions that are found to be installed. The detection is very simple. It expects to find the various MSBuild versions to be installed in their known default locations. If you supplied a custom path during installation, you may have to adjust the script accordingly.

## ELMAH 1.2 SP2 and Earlier

You can compile ELMAH from the sources in one of three ways:

  * Interactively, using solution and project files supplied for the various Microsoft Visual Studio versions.
  * Using a batch script that requires MS Build (or Microsoft Visual Studio for .NET Framework 1.x) for compilation.
  * Using a batch script that uses only the Visual C# compiler for compilation (i.e. MS Build and Microsoft Visual Studio are not required).

### Compiling Interactively Using Microsoft Visual Studio

Use Microsoft Visual Studio solutions found under the `src/Solutions` directory. There are solution and project files supplied for Microsoft Visual Studio .NET 2002, Microsoft Visual Studio .NET 2003, and Microsoft Visual Studio 2010 under respective sub-directories.

### Batch Compiling Using Microsoft Visual Studio

The `src/Solutions/build.cmd` script launches Microsoft Visual Studio to compile each solution from the command-line. The batch script detects the versions installed on your system and builds only using those versions that are found to be installed. The detection is very simple. It expects to find the various Microsoft Visual Studio versions to be installed in their known default locations. If you supplied a custom path during installation, you may have to adjust the script accordingly.

For .NET Framework 2.0, however, only `msbuild.exe` and the runtime is needed. Microsoft Visual Studio 2010 is not required for compiling.

### Batch Compiling Using C# Compiler

The `build.cmd` in the root of the distribution uses the Visual C# compiler to compile the sources. The script takes a single argument of that specifies the .NET Framework runtime to target. You can specify `all`, `1.0`, `1.1` or `2.0`. Running the script without any arguments displays usage help, as shown in the following example:

{% highlight text %}
ELMAH - Error Logging Modules and Handlers for ASP.NET
Copyright (c) 2004-9 Atif Aziz. All rights reserved.

Usage: build TARGET

TARGET
    is the target to build (all, 1.0, 1.1, 2.0)

This is a batch script that can used to build ELMAH binaries for
Microsoft .NET Framework 1.x and 2.0. The binaries are created for
only those versions that are found to be installed in the expected
locations on the local machine.

The following versions appear to be installed on this system:

- v1.0.3705
- v1.1.4322
- v2.0.50727

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
{% endhighlight %} 