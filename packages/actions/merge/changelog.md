1.0.74
- change HTTP method of `rest.fetchEntity` to POST
- add widget config key to env
- add custom create endpoint to validation
- remove removeCreate form modifier
- add addCreate form modifier

1.0.73
- add pen-field icon
- increase menu item padding on touch devices for better usability

1.0.71
- ignore any text and textarea fields of a datepicker when autofocusing

1.0.70
- fix date picker icon

1.0.69
- fix datepicker year dropdown closing on scroll
- fix whitespace in notification

1.0.68
- close datepicker on scroll
- add calendar icon
- add icon to date picker

1.0.67
- add model name to notification

1.0.66
- reset select dropdown to older state and implement close on scroll feature
- fix select dropdown dimension calculations

1.0.65
- adjust sizing of datepicker on mobile screens

1.0.64
- generate reports without dialog in widgets

1.0.63
- collapse buttons when wrapper is too small
- use responsiveness buttons on action bar

1.0.62
- add ballot-check icon

1.0.61
- quick fix that onChange is not infinite often triggered

1.0.60
- HTML editor: fix saving the form in source editing mode

1.0.59
- enable fullscreen modals for mobile/touch devices

1.0.58
- show collapse/expand icon on touch devices in panel header/footer
- harmonize modal spacing of modal message

1.0.57
- remove date picker arrow as the positioning seems to be off when fields are too long

1.0.56
- fix position of reports in form modifier
- fix datetime range with single default value
- do not clear date input on blur

1.0.55
- improve datepicker styling and fix bugs in widgets
- force hover styles of upload button when hovering upload field
- remove advanced search text in modal title
- fix input label being cut in widgets

1.0.54
- change signal box background colors for more consistency

1.0.53
- fix change date on range date picker
- fix datetime search field with default value
- keep ckeditor as similar as legacy editor

1.0.52
- add new list action icons
- use ckeditor
- only cache displays as long as tab is open

1.0.51
- accept fulltext search term for advanced search

1.0.50
- use constrictions from form in remotefield as well
- set current time as default time value in datepicker

1.0.49
- fix breakwords for email and phone formatter

1.0.48
- remotefields now sort the same way in select box and advanced search (form sorting first, then last updated)

1.0.47
- add list-check and percent icons
- allow date inputs without punctuation
- allow two digits year formats
- use save aborted key as textresource instead of message directly

1.0.46
- style new date picker like the old one
- fulltext search fields are now prioritized to be autofocused

1.0.45
- fix datetime in searchforms after using date-fns
- enhance breadcrumbs
- column labels in ColumnPicker no longer display escaped html elements

1.0.44
- add envelope icon
- add icon to email field to mail client
- add link to email and phone formatter

1.0.43
- today button in datepicker now behaves as expected

1.0.42
- reports added through formModifier are now placed directly into the action bar, instead of the output group
- report definitions now contain an icon as defined by the backend

1.0.41
- remote fields now honor the constrictions defined on forms with remotefield scope
- advanced search now uses form with remotefield scope if it exists
- remotefields now use sorting of their forms or entity models instead of only their timestamp

1.0.40
- optimize toggle behaviour of column picker to only select currently visible items
- do not import react components in widget-utils

1.0.39
- fix remote error handler
- remove momentjs in favor of date-fns
- create removeBoxes to help adjust forms
- fix error logging app extension

1.0.38
- convert phoneEdit to functional component
- convert layout to functional component
- convert statedvalue.stories to functional component
- convert typography to functional component

1.0.37
- show today button in datepicker

1.0.36
- fix datepicker max-, mind-date value for ranges

1.0.35
- replace flatpickr with react-datepicker

1.0.34
- add condition to remote and select field
- simple actions add conditions

1.0.33
- add css classes for display expressions styling

1.0.32
- reverse title order to first display entity name and then default display

1.0.31
- enhance column picker ux by adding numbering, mass selection and sorting features

1.0.30
- Length and size validators no longer trigger if the max or min is not defined

1.0.29
- show from and to placeholders on number ranges
- update of the values and field widths in duration edit fixed

1.0.28
- add form properties to prepare request

1.0.27
- render html escape characters in breadcrumbs

1.0.26
- fix state handling for report settings
- fix form mapping for search componentConfig
- use boolean search component for marking

1.0.25
- fix searchfilters url with query params
- add bundle packages
- fix integer input when min value is set

1.0.24
- add legacy-widget embedType
- show input on top only for remote multi selects
- fix broken disable styles on empty selects

1.0.23
- support browser plugins for phone numbers
- fix too many field callbacks being called

1.0.22
- fixate menu on multiremote select fields at bottom to improve ux

1.0.21
- support selectors in forms
- show empty fields that are children of selectors

1.0.20
- remove floating labels in favour of fixed labels

1.0.19
- change rank icon position and refactor table components
- convert HtmlEdit class component to functional component

1.0.18
- debouncer accepts value changes from outside

1.0.17
- allow duration values to be negative
- keep all values on blur

1.0.16
- add form modifier helper methods
- add report helper actions

1.0.15
- harmonize multi value select
- exclude selected values in suggestion

1.0.14
- possible to overwrite readonly form
- use distinguishable icons for ranges

1.0.13
- invalidate cache on page refresh properly
- correct dimension calculation of select menu since in some situations it does not seem to calculate the correct width/height

1.0.12
- updated fontawesome and added merge icon
- merge action now handles resolved entities instead of selection directly

1.0.11
- filter out null values on nested paths
- handle nested 'to many' relations on list forms

1.0.10
- make notification message at the end of notification center italic
- fix double scrollbar on textarea

1.0.9
- fix popper arrow positioning

1.0.8
- do not reuse same tab for different reports
- attach tether to target to prevent coverage of input fields

1.0.7
- update react-tether dependency and change Menu.js to new method
- update react-dropzone dependancy
- harmonize error list spacing within forms
- fix ignored first input click
- update range values properly
- constrain tether to parent element to prevent z-index problems inside modal
- use bolt-lightning as bolt icon
- tql autocompletion now displays localized labels in suggestions
- add hasFixedWidth prop to harmonize spacing if necessary
- show from and to placeholders on ranges
- add calendar plus and minus icons
- add specific range icons for datetime
- fix date picker modal position

1.0.6
- ace editor works again in create forms

1.0.5
- boolean search fields are now displayed as a single select box with fixed values to allow for ternary state and searching for explicit false values
- headers of right aligned table columns are right aligned now
- onBlur of date component is called with value from onChange again
- legacy actions ignore some exceptions
- fix jumping layout on firefox

1.0.4
- fix cache clearance to keep notifications session
- Navigating to detail pages through links in multi-select fields is now possible.
- Tiny millisecond values (1 - 3) are now displayed correctly.
- fix virtual form field handling
- implement theme type logic to enable loading of the widget theme
- Fixed searching in select boxes. Removed default searchOptions from Select.
- Fixed searching in select boxes. Removed default searchOptions from Select.
- onChange is now debounced for CodeEdit

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
