---
date: 2026-01-20
description: Reflections on git show
---
# On git show

While I'm comfortable with branching, commiting and solving merge conflicts, I've always treated git as a write-only, read-never store. If I really wanted to look at an earlier state of my code, I would go to a web interface like GitHub to explore older versions. It occurred to me that it would be quite useful if I could quickly open up a different revision of a specific file in my code editor. 

Indeed, git supports this with the convenient command `git show <revision>:<path>`. So for example, `git show d8718b704e75fc6987bc123c271caf47bd58233e:public/data/blog/git/index.md` would show the first revision of this blog post:

```md
# On git

hello world
```

This would be so useful if it wasn't so terribly annoying to type! You have to first do `git log`, then copy the sha1 hash of the commit you want to see, then you have to type it in, followed by the path to the file, which can get quite long. Looking deeper into this, it turns out that `git show` doesn't expect a sha1 hash, but any object denoted by the [gitrevisions](https://git-scm.com/docs/gitrevisions) syntax. This means you have access to a whole slew of shortcuts for denoting relative commits.


```sh
# show latest commit in a branch
git show master

# show commit pointed to by HEAD
git show @

# show commit that came 3 commits before HEAD
git show @~3

# show commit that branch master pointed to one week ago
git show master@{"1 week ago"}

# show newest commit with a commit message that matches a given regex pattern
# this example matches a commit with this message: `ci: vercel rewrite to src`
git show :/rewrite
```

And most of these can be paired with a path, to denote a specific file rather than the whole commit:

```sh
# show latest commit in a branch
git show master:package.json

# show commit pointed to by HEAD
git show @:package.json

# show commit that came 3 commits before HEAD
git show @~3:package.json

# you can also repeat ~ instead of typing a number: (5 commits ago)
git show @~~~~~:package.json

# show commit that branch master pointed to one week ago
git show master@{"1 week ago"}:package.json

# :/<pattern> doesn't pair with a path, but @^{/<pattern>} does.
# The only difference is that it will only match commits 
# reachable from <rev> (in this case, @, aka HEAD, which 
# points to master, which points to d8718b7)
git show @^{/rewrite}:package.json
```

> Don't let git terminology confuse you. If you aren't 100% sure what a term means, take the time to look it up. The git docs has a helpful glossary which defines common terms. See [HEAD](https://git-scm.com/docs/gitglossary#Documentation/gitglossary.txt-HEAD).

Writing the file path may still be a pain, but usually I'm already in neovim when I want to look at a different revision. [vim-fugitive](https://github.com/tpope/vim-fugitive) provides the `:Git` command, which forwards commands to the terminal and outputs the result in a new split (mostly the same as `:new | read !git <command>`). This means that you can use Ex special characters ([`:h cmdline-special`](https://neovim.io/doc/user/cmdline.html#cmdline-special)) like `%` which expands to the path of the current file. Finally, this means that viewing the current file on a different branch is as simple as typing `:Git show master:%`.

If you instead use one of the fugitive commands like `:Gsplit master:%`, it will open with appropriate syntax highlighting, and put you in a special fugitive file tree. Here you can press `-` to move up one level, which will show you the tree object (a list of files in a directory). Pressing enter with your cursor on any of these files, will open it. You can also press `~` to move to the previous commit. This means that you can swiftly move around file history, right inside neovim, without having to create a new worktree, or clone the repo, or open a GUI.

Two use cases I can think of are:
* Deleted something a commit or two ago, and now you realise you needed part of that code? `git show @~:%`
* Master has a script that lints your code, but you're not ready to merge yet? `git show master:lint.py > lint.py`

If you're using Neogit or Emacs/Magit or something else, look into what your editor can do with git history. It can probably do more than you think.
