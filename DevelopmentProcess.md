---
title: Development Process
layout: page
permalink: a/development-process/
article: true
---

* TOC
{:toc}

## Target users

This document is for programmers who want to contribute changes to ELMAH.

## Version control

### Overview

ELMAH uses Mercurial, a distributed version control system. What this means is that, even though this page hosts a central repository, there can be many clone repositories with changes of their own, and then some of those can be merged back into the main repository.

The model for developing for ELMAH is the following:

1. Each developer creates a fork of the [main ELMAH repository](https://bitbucket.org/project-elmah/main). This fork is hosted on Bitbucket servers.
2. The developer then makes a local clone of his fork, which is then at his local machine.
3. The developer writes new code into his local clone and commits it locally.
4. When a change is ready to be integrated back into the main repository, that change is pushed from the developer's local clone to his fork.
5. The developer then creates a pull request including a description of what the change is supposed to do, and what are the relevant commits.
6. The code will be reviewed - if any further changes are suggested, the process repeats from (3)
7. Once the change is approved, a member of the ELMAH team will merge it back into the main repository

Next is an overview of each step, but if you want to really learn Mercurial, please look at the references at the bottom of this document.

### Mercurial installation

First, make sure you have Mercurial installed by running the command:

{% highlight bash %}
$ hg version
Mercurial Distributed SCM (version 2.0.1)
(see http://mercurial.selenic.com for more information)

Copyright (C) 2005-2011 Matt Mackall and others
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
{% endhighlight %}

If you don't want your hostname and username to be made public, you can change how you're identified in commits you make by editing your ~/.hgrc file:

{% highlight bash %}
[ui]
username = John Doe
{% endhighlight %}

### Making a clone of the repository

We'll need to create two clones of the main ELMAH repository - one online, and then a local clone of that one.

To create the online clone, click on **Fork** link. Give your clone a name and description, then click on **Fork repository**. At that point the online clone is ready.

To create the local clone, click on **Source** tab of your clone page, and then use the checkout command provided there:

{% highlight bash %}
hg clone https://johndoe@bitbucket.org/project-elmah/main johndoe-elmah
{% endhighlight %}

Optionally, you can add your username and password to it (so you don't have to type them in every time):

{% highlight bash %}
hg clone https://johndoe:mypassword@bitbucket.org/project-elmah/main johndoe-elmah
{% endhighlight %}

and that's it - you have a local copy of your clone (in this example, in subdirectory johndoe-elmah) which you can then make changes to.

### Bringing in new changes from the master repository

The recommended way of bringing changes in from the main repository is the use of hg fetch:

{% highlight bash %}
$ hg fetch https://bitbucket.org/project-elmah/main
{% endhighlight %}

Please note that the fetch command is a Mercurial extension which is equivalent to hg pull -u plus hg merge plus hg commit - for more details please see the references, but this basically means that it will try to merge the incoming changes with your local changes.

If you want to see what will be brought in with the above command before running it, you can use:

{% highlight bash %}
$ hg incoming
{% endhighlight %}

### Committing changes locally

Commiting changes locally is easy - run hg status to see the state of your local clone:

{% highlight bash %}
$ hg status
?  MyNewFile
M  MyChangedFile
!  MyDeletedFile
{% endhighlight %}

In the above example, it shows one file that it knows nothing about (MyNewFile), one that it knows about but is missing (MyDeletedFile) and one that has had changes made to it.

To add all the previously unknown files and remove any missing files, use the addremove command:

{% highlight bash %}
$ hg addremove
Adding MyNewFile
Deleting MyDeletedFile
{% endhighlight %}

hg status then shows the new status:

{% highlight bash %}
$ hg status
A  MyNewFile
M  MyChangedFile
D  MyDeletedFile
{% endhighlight %}

If you wish to see what has changed, you can use the hg diff command. Finally, you can commit the changes with

{% highlight bash %}
$ hg commit
{% endhighlight %}

which will open an editor for you to type in a description for these changes. Optionally, you can specify filenames to hg commit in order to commit only part of your current changes.

**IMPORTANT**: When your change is pulled into the main ELMAH source, the change description that you entered here will show up as changes in the main ELMAH source, so please use a meaningful description - "fixing bug", "making changes", etc. are not ok, please instead use something like "fixing GPX import bug caused bnull pointer", "adding Russian translation", etc. so that it makes sense in the context of ELMAH as a whole, not just your clone.

### Pushing changes to your online clone

Pushing changes to your online clone is incredibly simple:

{% highlight bash %}
$ hg push
pushing to https://johndoe:***@bitbucket.org/project-elmah/main
searching for changes
adding changesets
adding manifests
adding file changes
added 1 changesets with 1 changes to 1 files
{% endhighlight %}

and you're done.

If you want to see what changes you're going to push before you do it, you can also use the following command:

{% highlight bash %}
$ hg outgoing
comparing with https://johndoe:***@bitbucket.org/project-elmah/main
searching for changes
changeset:   5:b6fed4f21233
tag:         tip
user:        John Doe
date:        Tue May 05 06:55:53 2009 +0000
summary:     Added an extra line of output
{% endhighlight %}

### Requesting a code review

To request a code review, open a new Issue in ELMAH, select template Review request, fill out the fields from the template. Someone will then review the code changes and integrate them when ready.

## References

[Mercurial: The definitive guide](http://hgbook.red-bean.com/)

<hr/>

This wiki was adapted from the [Development Process wiki of mytracks project](http://code.google.com/p/mytracks/wiki/DevelopmentProcess).
