# Change Log

The following is a curated list of changes in the Enact agate module, newest changes on the top.

## [1.1.0] - 2020-12-22

### Added

- `agate/Button` prop `iconOnly`, `iconPosition`, and `minWidth`
- `agate/Checkbox` prop `disabled`, `indeterminate`, and `indeterminateIcon`
- `agate/CheckboxItem` prop `disabled`, `indeterminate`, `indeterminateIcon`, and `slotbefore`
- `agate/DatePicker` prop `onSpotlightDisappear` and `spotlightDisabled`
- `agate/Marquee` component
- `agate/Picker` prop `noAnimation` and `wrap`
- `agate/RangePicker` prop `noAnimation` and `wrap`
- `agate/TimePicker` prop `onSpotlightDisappear` and `spotlightDisabled`
 
### Fixed

- `agate/ArcPicker` to display correct `font-size` and `font-weight`
- `agate/Button` to marquee when focused
- `agate/Button` to show a tooltip when hovered
- `agate/DateTimePicker` returned value by onChange event
- `agate/FanSpeedControl` to center text when there is no icon
- `agate/Heading` to support `spacing` for Gallium and Silicon
- `agate/IncrementSlider` button color for Gallium skin
- `agate/Input` run time error when using `dismissOnEnter`
- `agate/Keypad` to not show console error in sampler
- `agate/Keypad`, `agate/MediaPlayer`, and `agate/ToggleButton` to have buttons with proper width
- `agate/LabeledIconButton` button shape to circular
- `agate/MediaPlayer` to not show console error when next or previous button is pressed several times during playing
- `agate/Panels` to show close button properly for night mode
- `agate/Picker` picker item width in horizontal for silicon
- `agate/PopupMenu` to display distinguishable title
- `agate/SliderButton` to not show console error in sampler
- `agate/Spinner` to pause the animation when `paused` prop is true
- `agate/Spinner` to show correct layout when `type` is `loading` in `right-to-left` locale
- `agate/Spinner` to support `transparent` prop properly
- `agate/SwitchItem` icon position for all skins in RTL locale and Electro/Titanium in all locales
- `agate/TemperatureControl` to not be draggable when it's disabled

## [1.0.0] - 2020-10-14

Initial release.
