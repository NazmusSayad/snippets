## Basic git push function [🔗](/snippets/shell/git-push.sh)

This is the example explanation

```sh
ghp() {
  local msg=${*:-`git status --short --no-renames`}
  
  git status --short
  echo

  git add -A >> /dev/null &&
  git commit -m "$msg" &&
  echo &&
  git push --quiet
}
```