NODE_BIN = ./node_modules/.bin

.PHONY: dist
dist:
	env PROD=true ${NODE_BIN}/webpack-cli
