.PHONY: build

install:
	@npm install

build: copy-assets
	@NODE_ENV='\"production\"' ./node_modules/.bin/webpack  --progress --colors --devtool source-map -p 

copy-assets:
	# @cp login.html dist/
	# @cp images/user.png dist/

run:
	@echo "**************************************************"
	@echo "* open http://localhost:8080/webpack-dev-server/ *"
	@echo "**************************************************"
	@./node_modules/.bin/webpack-dev-server --host=0.0.0.0 --progress --colors --devtool cheap-module-inline-source-map --hot --inline

data:
	@node dataGenerator/generate.js
