# PercentageBar

This component renders a horizontal bar with a percentage on the right side of the bar. It's used on
the insights list and detail pages when rendering a space's utilization. It's a stateful component -
it uses the react lifecycle to listen for window resize events, and if the windoe width goes below
`breakWidth`, collapses the component.

If the `percentageFormatter` prop below returns `null`, the component renders its "empty" state.
When in this state, the bar is rendered ampty and a gray300 dash is rendered instead of the percentage.

## Component Props
- `percentage: Number` - One-hot encoded percentage (0...1)
- `percentageFormatter: (Number) => String` - A function to convert a numerical percentage into the
  string representation of the percentage that is drawn to the right of the percentage bar. Defaults
  to `n => n.toFixed(2)+'%'`
- `breakWidth: Number` - When the window width (document.body.clientWidth) is less than this number,
  only render the formatted percentage. If above this number, render the percentage bar too.
  Defaults to `gridVariables.screenSmMin`.
