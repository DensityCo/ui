# DateRangePicker
This component is used to allow the user to select a range of dates. It relies heavily on the  DateRangePicker from the [react-dates](https://github.com/airbnb/react-dates) library.

Along with the date range picker, this component includes functionality for commonly used ranges, as a shortcut to selecting date ranges. If common ranges are passed through as props, the component will render a collapsable list that controls the `startDate` and `endDate` of the parent component.

## Common Range Format
To enable the common range list, pass through a JSON array of common range definitions to the `commonRanges` prop. The formatting should follow:

```json
[
  {
    name: "Week to date",
    startDate: moment().startOf('week'),
    endDate: moment()
  },
  {
    name: "Month to date",
    startDate: moment().startOf('month'),
    endDate: moment()
  },
  {
    name: "Quarter to date",
    startDate: moment().startOf('quarter'),
    endDate: moment()
  }
]
```

## Component Props
- Allows for all component props of the [DateRangePicker](https://github.com/airbnb/react-dates/blob/master/src/components/DateRangePicker.jsx) from the react-dates library. Commonly used props include `startDate`, `endDate`, `onChange`, and `focusedInput`.
- `commonRanges: Array | null (optional)` - Array of common range definitions (documented above). If null, the toggleable list won't be rendered.
- `showCommonRangeSubtitles: Boolean` - Determines whether the range subtitles (containing the actual date ranges) are rendered. Defaults to false.
- `onSelectCommonRange: ()=> {CommonRangeObject}` - Triggered when a common range is selected. Use to modify the parent component's `startDate` and `endDate`
- `onOpenCommonRangeList: ()=> void` - Triggered when the common range list is opened.
