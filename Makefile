NODE_BIN = ./node_modules/.bin

.PHONY: dev
dev:
	${NODE_BIN}/webpack-cli --watch

.PHONY: test
test:
	${NODE_BIN}/mocha -r ts-node/register test/*.ts
