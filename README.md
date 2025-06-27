# React Todo List project

A simple React app to keep track of what you need to get done

### How to run
#### First Time:
1. npm install (if not done)

#### Running locally:
1. npm run dev
2. open localhost url in console

### Running tests:
For simplicity sake, the first thing to try is `npm test` from the root folder. If that doesn't work, here are some debugging steps that may be useful at first.

1. `npm install --save-dev vite vitest`
2. `npm run test --debug`
3. may hve to also run `npm install --save-dev jest@29 jest-environment-jsdom@29`

4. may also have to install babel
`npm install --save-dev @babel/preset-react`
`npm install --save-dev @babel/core @babel/preset-env`
3. once App.test.jsx runs, click 'a' to run all tests

For code coverage, run `npm test --coverage`
