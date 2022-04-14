1.0.0-hotfix30.22
- invalidate cache on page refresh properly

1.0.0-hotfix30.21
- do not reuse same tab for different reports

1.0.0-hotfix30.20
- update range values properly
- harmonize error list spacing within forms

1.0.0-hotfix30.19
- fix sticky popover on table

1.0.0-hotfix30.18
- fix jumping layout on firefox

1.0.0-hotfix30.17
- legacy actions ignore some exceptions
- onBlur of date component is called with value from onChange again

1.0.0-hotfix30.16
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.

1.0.0-hotfix30.15
- Using the advanced search in multi-remote fields no longer ignores the current selection.

1.0.0-hotfix30.14
- reintroduce table min-height and refactor Dashboard.js

1.0.0-hotfix30.13
- improve DnD performance

1.0.0-hotfix30.12
- fix onError of customAction
- change toaster type of aborted action handler

1.0.0-hotfix30.11
- Display durations as hh:mm:ss consistently instead of like a timestamp

1.0.0-hotfix30.10
- allow whitelisted inline css for nice tooltips

1.0.0-hotfix30.9
- null pointer fixed in document field formatter (resp. merge action)

1.0.0-hotfix30.8
- use throttle for select instead of debounce to prevent flickering of dropdown

1.0.0-hotfix30.7
- do not load display of null entity

1.0.0-hotfix30.6
- validation errors fixed for location fields

1.0.0-hotfix30.5
- fix flicker in Firefox on panel hovers

1.0.0-hotfix30.4
- do not execute injected JS in html field
- no styles allowed in rendered HTML

1.0.0-hotfix30.3
- register more icons
- open downloadable file in new tab to avoid errors

1.0.0-hotfix30.2
- register more icons
- change notification title and refactor NotificationCenter

1.0.0-hotfix30.1
- harmonize popover background color and spacing
- register icons

1.0.0
- Increase z-index of modal holder to properly display as widget
- Increase toaster z-index to properly display as widget
- Prevent preview image collapsing to 1px if preview cannot be generated
- Harmonize html formatter spacing inside stated value
- Harmonize icon spacing and hover behaviour in notifications
- Add the feature to close modals via escape key
- Add underline to links
- Open Url in list in new window
- Fix simple-search extend button in remote search
- Improve browser tab title
- Harmonize collapsible panel styling for better contrast
- Prevent early line breaks in popover menu
- Remove initial underline in notification detail link
- Money post point digits fallback
- Update select
- add "open output job" to notification
- Add background color to unread notifications
- fix opening task execution of notification
- Add button to remote fields that opens a popup containing a create form
- split session saga
- Fix suqare icon display expressions
- Swap out donwload and upload icons to harmonize look
- Change date picker month button color for better visibility
- Harmonize notification center styling
- Added new cancel button to toasters and notification center when task execution can be cancelled
- Change table hover colors to a more generic grey tone
- Harmonize link styling to be consistent
- change dms icons
- Improve table hover colors for better readability
- Change popover text color of paragraphs to white
- Reduce notification center title size
- fix state propagation in resize hook
- fix state propagation in resize hook
- fix websocket reconnection
- refactor initial notification
- fix confirm handler
- calculate drop position before or after element
- provide sanitize function for html
- render sanitized html only
- don't resize column after mouse release
- Remote fields and select boxes now only load active relation values.
- add keyField to model transformer
- Reset legacy overwrite of link color inside toasters
- Fix popper menu disappearing behind bm-menu elements
- Lighten scrollbar color
- Fix popper menu closing immediately when clicking an action
- Add minimum box width property to Layout Container to better control column width
- add open in new tab to document compact
- only load huge global styles once per app
- Added a preview image on hovering over download icons.
- prevent position from switching between after/before
- generic resize util
- refactor notification
- performance improvements
- fix drag and drop
- create link button
- create link button
- Add responsivity to all buttons so that the label disappears on smaller screens and only the icon is displayed
- Fix datepickr disappearing behind modal
- show textarea bigger for better distinction
- table can be refreshed
- register more icons
- increase z-index of popper menu to prevent it slipping behind modal
- show button hover title and pointer cursor
- user agent detection
- improve performance on Safari
- fix missing popover in single values and overflowing in firefox
- add tooltip for remote fields
- Add Ace editor to code fields.
- add usePrevious helper hook
- cleanup flatpickr components
- fix jumping datepicker on Safari
- debounce autosize on textarea
- harmonize fontawesome icon spacing within table data cell
- register more icons
- improve dropdown performance for selects on Safari
- fix performance bottleneck on linked sleect values
- adjust z-index of modal to prevent legacy actions falling behind it
- add auto completion for TQL in code fields.
- prevent default behaviour on shortcuts
- adjust min width of location edit postcode and refactor component
- refactor largeSelectionHandler
- enable select dropdown indicators to be aligned at bottom of multiselect fields
- tql builder support login type
- add title to custom action response
- throttle autosize to fix performance issues
- change toaster behavior to stay on hover and refactor ToasterDisplay
- remove X-Enable-Notifications header

0.1.4
- Release to create tags for further auto releasing

0.1.3
- Styling

0.1.2
- Initial version

