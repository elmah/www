#!/usr/bin/env bash

set -e

# Inpiration & credit:
# https://github.com/snarvaezsoft/docker-jekyll-pygments/blob/fc235030b74629d840d3e649592067fbe3087a4a/Dockerfile

apk update
apk add --no-cache ruby-dev
apk add --no-cache make
apk add --no-cache gcc
apk add --no-cache libc-dev
apk add --no-cache python
apk add --no-cache py-pygments

gem install pygments.rb

apk del ruby-dev
apk del make
apk del gcc
apk del libc-dev

bundle
jekyll "$@"
