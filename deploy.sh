#!/bin/bash
set -e

if [ ! -f .firebaserc ]; then
	echo "ERROR: .firebaserc not found. Run ./setup.sh first."
	exit 1
fi

PROJECT_ID=$(node -e "console.log(require('./.firebaserc').projects.default)")
if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "YOUR_FIREBASE_PROJECT_ID" ]; then
	echo "ERROR: Firebase project ID is not set in .firebaserc."
	exit 1
fi

echo "==> Building site..."
npm run build

echo ""
echo "Build complete. Summary:"
echo "  Project: $PROJECT_ID"
echo "  Hosting target: ciuff-landing-page"
echo "  Output: dist/"
echo ""
read -p "Deploy to Firebase Hosting? [y/N] " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
	echo "Deploy cancelled."
	exit 0
fi

echo "==> Deploying..."
firebase deploy --only hosting:ciuff-landing-page
echo ""
echo "Deploy complete."
