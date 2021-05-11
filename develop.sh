#!/bin/bash

# Set execution environment for strapi
NODE_ENV=production

# install | update "concurrently" globally
npm i -g concurrently

# start backend and frontend together using "concurrently" package (global);
concurrently "cd backend && npm run develop" "cd frontend && yarn start"