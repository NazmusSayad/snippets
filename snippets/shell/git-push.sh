## Basic git push function
#/ This is the example explanation

ghp() {
  local msg=${*:-`git status --short --no-renames`}
  
  git status --short
  echo

  git add -A >> /dev/null &&
  git commit -m "$msg" &&
  echo &&
  git push --quiet
}