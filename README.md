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
