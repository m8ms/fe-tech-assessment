# hx Frontend Tech Assessment

This project is intended for use as part of Frontend Tech Assessment at hx. At it's core, this is a basic [Create React App](https://github.com/facebook/create-react-app) which shows off a Virtualizer component, allowing for live changes to its parameters.

The task is to review and and understand what the code is intending to do, and crucially what it is doing wrong/imperfectly. In this review you only need to concern yourself with the code in `src/component-library/Virtualizer.tsx`, if you like you may also examine how it is called within `src/App.tsx`, however this is not required.

There are no wholly correct solutions we are looking for, rather we are keen to see your thought processes and engineering approach, you may rewrite/comment/critique/take notes in whatever way you find easiest that we can refer to in a group discussion after the fact.

Good luck!

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Refactor

### Fixes introduced
- bugfixes:
    - list display fix
    - typing fixes
    - first render fix
    - hook deps added
- readability & maintainability:
    - `generateGrid` utility introduced
    - inline logic extracted to functions
    - types added: `VirtualizerProps` interface, `PositionInfo` type
- performance:
    - memoization of total height & width calculations

### Fixes NOT introduced:

- bugfixes:
    - no position recalculate on props update
    - **[ESSENTIAL!]** setting cell width and height using a function:
        - first & last visible index must be calculated based on real dimensions of each cell -> sum of all `rowHeight(i)` / `columnWidth(j)`
        - performance: must store virtual position of each index either using memoization or a 2d table
        - can collect all virtual positions within `getItemsTotalSize()`
        - consider memory usage and leaks
- readability & maintainability:
    - consider extracting Virtualizer logic to a hook
    - consider extracting propCheckers to another file
    - not sure about this `new Array(n).fill(null).map()` approach...
    - tests
