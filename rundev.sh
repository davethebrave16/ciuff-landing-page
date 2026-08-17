#!/bin/bash
set -e

if [ ! -f .firebaserc ]; then
	echo "ERROR: .firebaserc not found. Run ./setup.sh first."
	exit 1
fi

if [ ! -d node_modules ]; then
	echo "==> node_modules not found, running npm install..."
	npm install
fi

echo "==> Starting Astro dev server..."
npm run dev
