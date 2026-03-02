#!/bin/bash

echo "Build script"

npm run install:server

npm run install:client
npm run build:client

mkdir -p server/dist
cp -r client/dist/* server/dist/

echo "Build complete!"