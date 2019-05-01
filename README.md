# ELMAH

[ELMAH (Error Logging Modules and Handlers)][elmah] is an application-wide
error logging facility that is completely pluggable. This is the
[Jekyll][jekyll] source to the [ELMAH web site][www].

## Building

Assuming Docker and PowerShell(Core) are installed, run:

    PS> ./build.ps1


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

If you have Docker and PowerShell(Core) installed, an easier way to run
Jekyll and serve the content is to run `./serve.ps1`.

Make commits atomic and logically coherent. It makes reviews easier and
reverting easier. Avoid, for example, bundling multiple and unrelated
changes together into the same commit even if they address the same issue.
If you are using *and* in your commit message, chances are good you are
bundling more than one (unrelated) change.


  [elmah]: https://code.google.com/p/elmah/
  [www]: https://elmah.github.io/
  [issues]: https://github.com/elmah/www/issues
  [pr]: https://github.com/elmah/www/compare/
  [jekyll]: http://jekyllrb.com/
  [jkinst]: http://jekyllrb.com/docs/installation/
  [PortableJekyll]: https://github.com/madhur/PortableJekyll