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
- Add notification support for anonymous users
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
- fix socket connection handling
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

0.4.11
- Prevent dropdown menu being clipped in viewport
- fix notifications

0.4.10
- Fix notifications for already deleted outputjobs
- fix merge error summary

0.4.9
- Style new notification boxes
- Style notification center
- Improve input field UX by better highlighting fields and labels
- Adapt input font-sizes for better readability
- Fix broken modal layout
- Fix date-time search
- Fix overlay of modal in widget mode
- Fix popper menu on safari browsers
- Fix notification socket url
- move useDnD
- Make select dropdown menu style more uniform for a more consistent UI
- Harmonize select box size und colors
- Align modal globally at same position
- Fix modal overflow
- Style merge errors
- Harmonize toaster styling
- Fix blocking info being covered by header

0.4.8
- show client questions for merge action

0.4.7
- Fix select menu disappearing behind modal
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- Displayexpression call adjustment
- Change cursor to pointer on panel header/footer hover
- Datetime search fields now use a date field until the full range is expanded
- Add action selection count confirm
- Fix merge close function with query selection

0.4.6
- Keep scroll position on multi select selection
- fix menu in action
- move validation helper method to tocco-util
- Clear button in date fields only show up when data has been entered, tab and enter can now be used to navigate in the calendar popup and between date fields
- Prevent stacking of modal overlays
- render description field in form
- Fix popper menu positioning
- Prevent layout container overlap in detail view
- Fix html edit initial change
- Prevent range input overflow
- Adapt table colors to better differentiate from background
- refactor extracting displays

0.4.5
- Style upload and switch to light icons
- Prevent action buttons disappearing on scroll
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- Adjust label margin in input fields
- reload sources after deployment
- support selection of type query
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant
- Fix fulltext search
- support createuser & updateuser in tql builder

0.4.4
- Style upload and switch to light icons
- Prevent action buttons disappearing on scroll
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- fix long term caching

0.4.3
- Remove workaround for opening an entity list in the old client

0.4.2
- Style merge table header contents for better UX
- Style notifier popups to better harmonize with the existing styling
- Make panel header clickable so it can also expand the panel

0.4.1
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- Support shrinkToContent column attribute
- Fix path dirty bug
- Fix missing default values bug
- Fix default value serach filter bug
- Fix merge table and harmonize spacing/text
- Fix checkbox and menu background hover inside table heading
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)

0.4.0
- Merge V2!

0.3.6
- Reset css overwrites of Upload.js and refactor Preview.js
- Restrict urls in table to one line
- Set min and max width for modal
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Remove stated value error animation, as it caused a wobble effect
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Open remote fields on second click
- Set max width in layout box to prevent overflowing elements

0.3.5
- Table component
- Make all children of readonly layouts readonly
- Style input fields according to material design
- Use KEYS instead of IN in tql
-  Style draggable table headers and kabob menu
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalu colors for more contrast/readability
- Fix width of table cells so that there is no overlap at the last column on smaller screens
- Create new StyledLabel that fits with other elements
- Handle strings in search with "like" and add boolean handler
- Hide action in advanced search
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Set box sizing on td to prevent overwrite in external context
- Build fields without model (refactoring)
- Hide readonly fields without value
- Remove all usages of old display endpoints and use 'entities/2.0/displays'
- Add min width to modal

0.3.4
- Use new search filter endpoint
- harmonize modal box spacing
- Disable caching for DEV
- Fix display expressions
- remove additional clear icon in safari
- fix fuzzy rendering of bold fonts in firefox
- Support description fields
- harmonize notification spacing
- Add legacy icons
- Adjust advanced-search list limit
- enable hover effect on first two table header elements
- harmonize question icon size/spacing in detail view
- Adjust fulltext search to work the same way as in old client
- Adjust HTML Edit
- Support time fields in search form
- Enable 100% height of layout container in old client
- Menu makeover
- Style new dropdown menu
- Harmonize menu icon spacing
- Reposition notifier close icon
- Fix icon positioning within buttons
- Place button groups on same level
- Prevent action menu appearing underneath fixed menu bar
- Harmonize button sizing and spacing of button groups
- NumberFormatter can now handle options for setting the minimum fraction digits
- Center input field of select
- Fix sizing of ball

0.3.3
- Support of code and ipaddress datatypes fields
- Basic display-expression bootstrap class support
- Adjust responsive behavior of layout box in detail view
- Style button dropdown list
- Harmonize stated value box padding
- Panel animation refactoring
- Fix &shy; in label
- Component type fix
- Adapt success color for better readability
- Style range component
- Small date component improvements
- Fix label null bug
- Add white background to mitigate dark theme conflict in nice2
- Improve range style

0.3.2
- Styling

0.3.1
- Styling

0.3.0
- Update React and React-Dom PeerDependency to 16.8.4
- Remove dependency inside tocco-theme
