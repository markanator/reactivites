#!/bin/bash

protected_branch='main'
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

set -ex
localCi(){
	npm run build:client
	flyctl deploy
}

if  [ $current_branch = $protected_branch ]; then
  localCi
fi

unset localCi

exit 0