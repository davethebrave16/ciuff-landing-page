#!/bin/bash
set -e

if [ ! -d node_modules ]; then
	echo "==> node_modules not found, running npm install..."
	npm install
fi

echo "==> Starting Astro dev server..."
npm run dev
