# ELMAH

[ELMAH (Error Logging Modules and Handlers)][elmah] is an application-wide
error logging facility that is completely pluggable. This is the
[Jekyll][jekyll] source to the [ELMAH web site][www].

## Contributing

- Fork this repo; clone locally
- [Pick or open an issue][issues] to resolve; discuss first
- [Install Jekyll][jkinst]
- Run `jekyll serve` on your local clone
- Hack away pages in your favorite text editor
- Test in your local browser
- When happy, commit your changes to a branch appropriately named after the
  issue being addressed
- [Create a pull request][pr]

Make commits atomic and logically coherent. It makes reviews easier and
reverting easier. Avoid, for example, bundling multiple and unrelated
changes together into the same commit even if they address the same issue.
If you are using *and* in your commit message, chances are good you are
bundling more than one (unrelated) change.

### Contributing on Windows

On Windows, the simplest installation method is to use
[Portable Jekyll][PortableJekyll]. When using `jekyll serve` or `jekyll build`,
file monitoring can be problematic, causing constant rebuilding of the static
version of the site. Use the `--force_polling` as a workaround for either the
`server` or `build` subcommand.


  [elmah]: https://code.google.com/p/elmah/
  [www]: https://elmah.github.io/
  [issues]: https://github.com/elmah/www/issues
  [pr]: https://github.com/elmah/www/compare/
  [jekyll]: http://jekyllrb.com/
  [jkinst]: http://jekyllrb.com/docs/installation/
  [PortableJekyll]: https://github.com/madhur/PortableJekyll