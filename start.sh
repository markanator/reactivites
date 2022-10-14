#!/usr/bin/bash

set -ex
npm run build:client
flyctl deploy