1.0.3-hotfix31.30
- fix whitespace in notification

1.0.3-hotfix31.29
- add model name to notification

1.0.3-hotfix31.28
- fix breakwords for email and phone formatter

1.0.3-hotfix31.27
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)

1.0.3-hotfix31.26
- add envelope icon
- add link to email and phone formatter
- add link to email and phone formatter

1.0.3-hotfix31.25
- remote fields now honor the constrictions defined on forms with remotefield scope
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

1.0.3-hotfix31.24
- add css classes for display expressions styling

1.0.3-hotfix31.23
- reverse title order to first display entity name and then default display

1.0.3-hotfix31.22
- Length and size validators no longer trigger if the max or min is not defined

1.0.3-hotfix31.21
- show from and to placeholders on number ranges

1.0.3-hotfix31.20
- render html escape characters in breadcrumbs

1.0.3-hotfix31.19
- show from and to placeholders on ranges
- add calendar plus and minus icons
- add specific range icons for datetime
- use distinguishable icons for ranges

1.0.3-hotfix31.18
- fix integer input when min value is set
- fix state handling for report settings

1.0.3-hotfix31.17
- fix searchfilters url with query params

1.0.3-hotfix31.16
- fix too many field callbacks being called

1.0.3-hotfix31.15
- update of the values and field widths in duration edit fixed

1.0.3-hotfix31.14
- debouncer accepts value changes from outside

1.0.3-hotfix31.13
- keep all values on blur

1.0.3-hotfix31.12
- allow duration values to be negative

1.0.3-hotfix31.11
- invalidate cache on page refresh properly

1.0.3-hotfix31.10
- filter out null values on nested paths
- handle nested 'to many' relations on list forms

1.0.3-hotfix31.9
- fix double scrollbar on textarea

1.0.3-hotfix31.8
- do not reuse same tab for different reports

1.0.3-hotfix31.7
- update range values properly
- harmonize error list spacing within forms

1.0.3-hotfix31.6
- ace editor works again in create forms

1.0.3-hotfix31.5
- fix jumping layout on firefox

1.0.3-hotfix31.4
- onBlur of date component is called with value from onChange again
- legacy actions ignore some exceptions

1.0.3-hotfix31.3
- onChange is now debounced for CodeEdit

1.0.3-hotfix31.2
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.

1.0.3-hotfix31.1
- Navigating to detail pages through links in multi-select fields is now possible.

1.0.3
- do not execute injected JS in html field
- no styles allowed in rendered HTML
- fix flicker in Firefox on panel hovers
- validation errors fixed for location fields
- do not load display of null entity
- use throttle for select instead of debounce to prevent flickering of dropdown
- null pointer fixed in document field formatter (resp. merge action)
- add tql mapping for type text
- improve searching for text based types
- harmonize DurationEdit spacing and refactor class based component to functional component
- show seconds, milliseconds for small read-only duration
- allow whitelisted inline css for nice tooltips
- show seconds/milliseconds only for small duration
- Display overflowing hours in durations
- fix onError of customAction
- change toaster type of aborted action handler
- change toaster to fixed positioning to guarantee visibility on scroll
- Use app locale automatically for all (REST) requests
- render modal action component with right locale
- Using the advanced search in multi-remote fields no longer ignores the current selection.
- Code editors used to write TQL can now be configured in the backend to assume some entity model as the given base, allowing only writing the 'where'- and 'order by'-parts of a query.
- increase table style specificities to prevent them from being overwritten inside widgets

1.0.2
- register more icons
- open downloadable file in new tab to avoid errors
- remove framer-motion dependency for burger button and create pure css version instead
- fix sticky popover on table
- fix UploadInput.js button titles and refactor components
- add notification support for anonymous users

1.0.1
- harmonize popover background color and spacing
- register icons
- register more icons
- change notification title and refactor NotificationCenter
- create env utils
- add generic nice2 fetch wrapper
- add useDidUpdate helper hook
- add useApp helper hook

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
