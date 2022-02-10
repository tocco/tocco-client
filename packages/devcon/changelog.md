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

0.4.0
- Added language upgrade form (in DB refactoring view)

0.3.1
- Fixed generating SQL and changesets in prod env

0.3.0
- Added simple log view
- Added simple model validation view
- Added simple SQL log view
- Prevent complete reload when changing page

0.2.0
- New input param `baseRoute`

0.1.0
- Initial release of Developer Console (DevCon) with simple DB refactoring
