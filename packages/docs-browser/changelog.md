1.0.6-hotfix31.38
- support identifier type in tql builder

1.0.6-hotfix31.37
- fix performance of fulltext search

1.0.6-hotfix31.36
- fix whitespace in notification

1.0.6-hotfix31.35
- implement sticky buttons for simple-form modal
- add model name to notification

1.0.6-hotfix31.34
- check form definition if form is markable

1.0.6-hotfix31.33
- fix breakwords for email and phone formatter

1.0.6-hotfix31.32
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)

1.0.6-hotfix31.31
- add envelope icon
- add link to email and phone formatter
- add link to email and phone formatter
- fix loading form definition for dms

1.0.6-hotfix31.30
- remote fields now honor the constrictions defined on forms with remotefield scope
- entity list now uses a form definition passed as input without reloading it
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

1.0.6-hotfix31.29
- add css classes for display expressions styling

1.0.6-hotfix31.28
- reverse title order to first display entity name and then default display

1.0.6-hotfix31.27
- Length and size validators no longer trigger if the max or min is not defined

1.0.6-hotfix31.26
- show from and to placeholders on number ranges
- Add sorting field to entity-list sagas

1.0.6-hotfix31.25
- render html escape characters in breadcrumbs

1.0.6-hotfix31.24
- show from and to placeholders on ranges
- add calendar plus and minus icons
- add specific range icons for datetime
- use distinguishable icons for ranges

1.0.6-hotfix31.23
- fix integer input when min value is set
- fix state handling for report settings

1.0.6-hotfix31.22
- fix searchfilters url with query params

1.0.6-hotfix31.21
- fix too many field callbacks being called

1.0.6-hotfix31.20
- update of the values and field widths in duration edit fixed

1.0.6-hotfix31.19
- debouncer accepts value changes from outside

1.0.6-hotfix31.18
- keep all values on blur

1.0.6-hotfix31.17
- allow duration values to be negative

1.0.6-hotfix31.16
- use preformatted error message for tql

1.0.6-hotfix31.15
- invalidate cache on page refresh properly

1.0.6-hotfix31.14
- filter out null values on nested paths
- handle nested 'to many' relations on list forms

1.0.6-hotfix31.13
- fix double scrollbar on textarea

1.0.6-hotfix31.12
- do not reuse same tab for different reports

1.0.6-hotfix31.11
- update range values properly
- harmonize error list spacing within forms
- improve data handling on search query changes

1.0.6-hotfix31.10
- fix entity-list re-init handling on store updates
- fix docs browser back navigation for search view

1.0.6-hotfix31.9
- ace editor works again in create forms
- fix table flicker on firefox

1.0.6-hotfix31.8
- fix jumping layout on firefox

1.0.6-hotfix31.7
- onBlur of date component is called with value from onChange again
- legacy actions ignore some exceptions

1.0.6-hotfix31.6
- searchfilter show description as mouseover

1.0.6-hotfix31.5
- onChange is now debounced for CodeEdit
- added new button to clear the current query to QueryView

1.0.6-hotfix31.4
- introduce input prop `constriction`
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.

1.0.6-hotfix31.3
- Tiny millisecond values (1 - 3) are now displayed correctly.

1.0.6-hotfix31.2
- The model field in the QueryView is now a display.

1.0.6-hotfix31.1
- align choose document button to the right

1.0.6
- Display overflowing hours in durations
- auto focus basic search form
- fix onError of customAction
- change toaster type of aborted action handler
- Add second tab to search form that allows executing custom queries. Add additional actions to open search as query and save query as a new filter.
- change toaster to fixed positioning to guarantee visibility on scroll
- Use app locale automatically for all (REST) requests
- render modal action component with right locale
- render subgrids with correct locale
- Using the advanced search in multi-remote fields no longer ignores the current selection.
- Code editors used to write TQL can now be configured in the backend to assume some entity model as the given base, allowing only writing the 'where'- and 'order by'-parts of a query.
- The TQL editor in the query view now uses an implicit base model, which allows auto-complete to work.
- increase table style specificities to prevent them from being overwritten inside widgets
- support `locale` input

1.0.5
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

1.0.4
- remove framer-motion dependency for burger button and create pure css version instead
- fix sticky popover on table
- fix UploadInput.js button titles and refactor components
- Add notification support for anonymous users
- choose between different scroll behaviours

1.0.3
- register more icons
- open downloadable file in new tab to avoid errors
- fix docs-browser height inside modal

1.0.2
- add useDidUpdate helper hook
- reuse existing usePrevious hook
- add useApp helper hook

1.0.1
- harmonize popover background color and spacing
- register icons
- register more icons
- change notification title and refactor NotificationCenter
- create env utils
- add generic nice2 fetch wrapper
- add dynamic backend-url as input parameter

1.0.0
- register more icons
- increase z-index of popper menu to prevent it slipping behind modal
- show button hover title and pointer cursor
- harmonize detail footer spacing
- fix placing of chevron icon in placeholder panel of admin search form
- reset pagination on reload first page
- user agent detection
- improve performance on Safari
- fix missing popover in single values and overflowing in firefox
- add tooltip for remote fields
- Add Ace editor to code fields.
- add usePrevious helper hook
- cleanup flatpickr components
- propagate onSelectChange
- add option to choose document from dms
- fix jumping datepicker on Safari
- Show create form for remote fields again in the folder creation form
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
- fix html in toaster message
- tql builder support login type
- add no permission message for uploading document
- add title to custom action response
- add title to custom action response
- show no permission error if entity is created
- add no permission message for moving document
- throttle autosize to fix performance issues
- change toaster behavior to stay on hover and refactor ToasterDisplay
- the first search field in admin search forms now gets automatically focused on opening
- remove X-Enable-Notifications header

0.2.15
- only load huge global styles once per app
- Added actions to DMS lists
- Added a preview image on hovering over download icons.
- prevent position from switching between after/before
- generic resize util
- use scope for preferences
- refactor notification
- performance improvements
- fix drag and drop
- create link button
- create link button
- Add responsivity to all buttons so that the label disappears on smaller screens and only the icon is displayed
- show minimum 5 rows
- Fix datepickr disappearing behind modal

0.2.14
- Change icon size within docs-browser
- Harmonize link styling to be consistent
- Increase min-height of filter panel in search form
- change dms icons
- Improve table hover colors for better readability
- Change popover text color of paragraphs to white
- Reduce notification center title size
- fix state propagation in resize hook
- persist columns widths
- Dms edit and create messages clean up
- clean up documentation and fix dispatched actions
- fix websocket reconnection
- add footer with meta info
- refactor initial notification
- fix confirm handler
- calculate drop position before or after element
- provide sanitize function for html
- render sanitized html only
- don't resize column after mouse release
- Remote fields and select boxes now only load active relation values.
- add keyField to model transformer
- use dynamic key field
- Reset legacy overwrite of link color inside toasters
- Fix popper menu disappearing behind bm-menu elements
- Harmonize paragraph spacing whithin fields
- Lighten scrollbar color
- fix column position change
- Fix popper menu closing immediately when clicking an action
- add scope as input
- Style detail footer for better UX
- Add minimum box width property to Layout Container to better control column width
- add open in new tab to document compact

0.2.13
- Harmonize collapsible panel styling for better contrast
- Prevent early line breaks in popover menu
- Remove initial underline in notification detail link
- support disablePreferencesMenu in table
- Money post point digits fallback
- Update select
- Dms edit and create messages clean up
- Fix calendar entity-list text resources
- add "open output job" to notification
- Fix disabled delete button if nothing to delete
- Add background color to unread notifications
- fix opening task execution of notification
- Add button to remote fields that opens a popup containing a create form
- split session saga
- fix socket connection handling
- Fix suqare icon display expressions
- Swap out donwload and upload icons to harmonize look
- Change date picker month button color for better visibility
- Harmonize notification center styling
- Added new cancel button to toasters and notification center when task execution can be cancelled
- Change table hover colors to a more generic grey tone

0.2.12
- Prevent preview image collapsing to 1px if preview cannot be generated
- Refresh list on navigation back to list
- Harmonize html formatter spacing inside stated value
- Harmonize icon spacing and hover behaviour in notifications
- Add the feature to close modals via escape key
- Add underline to links
- Open Url in list in new window
- Fix simple-search extend button in remote search
- Improve browser tab title

0.2.11
- Harmonize marked icon inside table
- Harmonize marked icon inside detail view
- Increase z-index of modal holder to properly display as widget
- Show outdated error in detail
- Increase toaster z-index to properly display as widget

0.2.10
- Align modal globally at same position
- Fix modal overflow
- Harmonize toaster styling
- Fix blocking info being covered by header
- Fix notifications for already deleted outputjobs
- Add hover effect to column picker list
- Added support for "markable" feature
- Added support for "markable" feature
- Prevent dropdown menu being clipped in viewport
- Fix business unit change in edit action
- Support empty html edit field
- Has value for checkboxes change
- Improve pagination UX by moving it to the left and changing button behavior
- Fix search filter menu hover
- Add preview for documents
- Style location edit dropdown to match other dropdowns
- Remove download icon inside button of report settings
- Fix calender search bug

0.2.9
- Style new notification boxes
- Style notification center
- Fix broken modal layout
- Fix date-time search
- Fix overlay of modal in widget mode
- Fix popper menu on safari browsers
- Fix notification socket url
- refactor column picker
- Move useDnD
- Add search form customization
- Make select dropdown menu style more uniform for a more consistent UI
- Harmonize select box size und colors
- Change collapse icon for detail and list view

0.2.8
- Improve input field UX by better highlighting fields and labels
- Adapt input font-sizes for better readability
- Fix selection controller button font color
- Add collapse feature to search panel in list view
- Fix legacy actions popup (was hidden before)
- Disable sorting in "move" action

0.2.7
- Edit action only one message
- Adjust spacing and alignment of button inside modal
- Add action selection count confirm
- Forward input props to move action
- Fix various dms problems (navigation and search)

0.2.6
- Change cursor to pointer on panel header/footer hover
- Added options to create a search filter from the current search, edit or delete an existing filter
- Use explicit selection style
- datetime search fields now use a date field until the full range is expanded
- Fix hover delay and hover color of search filter buttons

0.2.5
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- Adjust left padding of Breadcrumbs in list view
- Location field focus problem fix
- Displayexpression call adjustment
- Bug fixing

0.2.4
- Fix select menu disappearing behind modal
- Fix fulltext search form

0.2.3
- Fix list bug

0.2.2
- Fix ignored domainTypes-Filter

0.2.1
- disable search form in widget

0.1.1
- fix long term caching

0.1.0
- Initial release
