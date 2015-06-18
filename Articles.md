---
title: Articles
layout: page
permalink: a/
---

{% assign sorted_pages = site.pages | sort: 'title' %}

{% for page in sorted_pages %}
{% if page.article %}
- [{{ page.title }}]({{ page.url }})
{% endif %}
{% endfor %}
