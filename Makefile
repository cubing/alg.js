NODE_BIN = ./node_modules/.bin

.PHONY: dist
dist: src/jison_parser/index.js
	${NODE_BIN}/webpack-cli

.PHONY: dev
dev: src/jison_parser/index.js
	${NODE_BIN}/webpack-cli --watch

.PHONY: test
test: dist
	${NODE_BIN}/mocha -r ts-node/register test/*.ts

./node_modules/.bin/jison:
	@echo "Run `yarn install` to run jison."

src/jison_parser/index.js: ./node_modules/.bin/jison src/jison_parser/index.jison
	$^ -o $@
	# Remove exports.main, since it attempts to import `fs`.
	sed -i "" "/exports\.main.*/,/^}$$/d" $@
