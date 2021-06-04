# Info Popup

This component displays an info icon that can render more detail when the user hovers over it.

![screenshot.png](screenshot.png)

A few attributes about it:
- It is tab-focusable - ie, pressing tab will toggle through it.
- It supports touch devices as well as devices with a cursor.

## Props
- `children: ReactElement | String` - The contents to render inside of the popup.
- `infoIconColor: string` - A hex color to use when coloring the info icon. Defaults to the value of
  brand primary.
- `singleLine: string` - If the popup is a single line in height, adjust the padding on the popup to
  make it look better.
- `verticalPopupOffset: number` - A number of pixels to shift the popup up or down. Used to adjust
  the gap between the popup and the target in different situations.
- `verticalIconOffset: number` = A number of pixels to shift the `(i)` icon in the vertical
  direction. Vertically positioning the icon next to text is sometimes difficult and this can help
  make it easier.
- `horizontalIconOffset: number` = A number of pixels to shift the `(i)` icon in the horizontal
  direction.
