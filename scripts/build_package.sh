#!/bin/sh
set -e
yarn tsc -p ./configs/tsbuild_types.json
yarn tsc -p ./configs/tsbuild_esm.json
yarn tsc -p ./configs/tsbuild_cjs.json
wait
