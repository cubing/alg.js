NODE_BIN = ./node_modules/.bin

.PHONY: dist
dist: src/jison_parser/index.js
	env PROD=true ${NODE_BIN}/webpack-cli

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
	sed -i.bak "/exports\.main.*/,/^}$$/d" $@
	# We have to create a backup file and then delete it because the `-i` flag for
	# `sed` behaves differently on macOS.
	rm $@.bak

.PHONY: dist-for-git
dist-for-git: dist
	@echo "Current branch must be \`release\`."
	test "release" = `git rev-parse --abbrev-ref HEAD`
	git stage -f dist/*.js dist/*d.ts
