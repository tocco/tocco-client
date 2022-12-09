0.4.37-hotfix229.25
- add locale to text resource caching key

0.4.37-hotfix229.24
- increase z-index for selects in modals

0.4.37-hotfix229.23
- fix z-index for entity-browser in old client

0.4.37-hotfix229.22
- add no permission message for uploading document
- add no permission message for moving document
- show no permission error if entity is created
- add title to custom action response
- add title to custom action response

0.4.37-hotfix229.21
- Fix datepickr disappearing behind modal

0.4.37-hotfix229.20
- Dms edit and create messages clean up
- Fix calendar entity-list text resources

0.4.37-hotfix229.19
- Refresh list on navigation back to list

0.4.37-hotfix229.18
- Increase z-index of modal holder to properly display as widget
- Prevent preview image collapsing to 1px if preview cannot be generated

0.4.37-hotfix229.17
- Add preview for documents

0.4.37-hotfix229.16


0.4.37-hotfix229.15
- Fix calender search bug
- Fix search-form remote bug

0.4.37-hotfix229.13
- Adjust height and width of input edit table
- Align modal globally at same position

0.4.37-hotfix229.11
- Fix popper menu on safari browsers

0.4.37-hotfix229.9
- Fix overlay of modal in widget mode

0.4.37-hotfix229.8
- Fix legacy actions popup in DMS (was hidden before)
- Disable sorting in "move" action in DMS

0.4.37-hotfix229.7
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- show client questions for merge action

0.4.37-hotfix229.6
- disable client questions for merge action
- Fix various dms problems

0.4.37-hotfix229.5
- Fix merge close function with query selection

0.4.37-hotfix229.4
- Entity-Docs open resource in full view
- Fix report settings

0.4.37-hotfix229.3
- forward input props to move action
- Use explicit selection style

0.4.37-hotfix229.2
- Adjust left padding of Breadcrumbs in list view
- Displayexpression call adjustment

0.4.37-hotfix229.1
- Fix docs-browser bugs

0.4.37
- refactor extracting displays
- Fix select menu disappearing behind modal
- Fix fulltext search form

0.4.36
- Fix doc-browsers client questions
- New input prop `businessUnit` to filter by business unit
- Prevent range input overflow
- Adapt table colors to better differentiate from background
- Remove obsolete left padding in table
- Ignore field if path is null in copy action

0.4.35
- Fix doc-browsers client questions

0.4.34
- Prevent stacking of modal overlays
- render description field in form
- Fix popper menu positioning
- Prevent layout container overlap in detail view
- Show not deletable entities with 0
- Fix html edit initial change
- Fix icon and document view in doc browser
- Fix dms reload
- Refactoring list initialization
- Fix tether dropdown z-index to prevent overlay on scroll
- Set background color of breadcrumbs inside doc browser to white

0.4.33
- Clear button in date fields only show up when data has been entered, tab and enter can now be used to navigate in the calendar popup and between date fields
- fix resetting search mode
- Embedd dms in entity view
- Text as html

0.4.32
- Handle client question cancellation
- Keep scroll position on multi select selection
- Fix menu in action
- Move validation helper method to tocco-util
- Add move action

0.4.31
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- New input param `domainTypes` to filter domains
- hide list navigation arrow if row is not clickable
- fix long term caching
- Adjust label margin in input fields
- support sorting by search filters and preferences
- reload sources after deployment
- clear selection if parent is set
- dispatch actions if store already exists
- support selection of type query
- Fix fulltext search form
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant
- New input parameter `keys`
- New input param `rootNodes` to define root items
- clear selection fire onSelectChange
- Fix fulltext search
- fix load data if parent is changed
- support createuser & updateuser in tql builder

0.4.30
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- New input param `domainTypes` to filter domains
- Hide list navigation arrow if row is not clickable
- Fix long term caching
- Adjust label margin in input fields
- Support sorting by search filters and preferences
- Reload sources after deployment
- Clear selection if parent is set
- Dispatch actions if store already exists
- Support selection of type query
- Fix fulltext search form
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant

0.4.29
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear
- New input param `domainTypes` to filter domains
- Hide list navigation arrow if row is not clickable
- Fix long term caching

0.4.28
- Introduce onResize external event
- Reset label spacing inside column picker for old client
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- No list refresh after selection clear

0.4.28


0.4.27
- Dms upload directory (TOCDEV-3042)
- Restrict max height of basic search form only in modal
- Prevent action buttons disappearing on scroll

0.4.26
-

0.4.25
- Change header color
- DMS delete

0.4.24
- Style upload and switch to light icons

0.4.23
- Fix icon and qr code spacing inside two factor connector
- Merge: Remove workaround for opening an entity list in the old client

0.4.22
- Fix spacing of notifiers without title
- Add dms edit action
- Add Domain create action

0.4.21
- Move buttons inside modals to the right to improve UX
- Fix hidden extender and force border rendering of ranges in chrome
- Fix empty report settings (TOCDEV-3218)

0.4.20
- Fix caching of business unit
- Vertically center spinner icon in delete progress
- Style merge table header contents for better UX
- Style notifier popups to better harmonize with the existing styling
- Make panel header clickable so it can also expand the panel
- Fix logo not displaying in login screen on iOS
- Fix height and action button styling of detail form in old client

0.4.19
- Fix empty create forms because of missing field information

0.4.17
- Fix merge table and harmonize spacing/text
- Harmonize text spacing in two factor connector
- Fix checkbox and menu background hover inside table heading
- support fullscreen action callbacks
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)
- Writable mutlipath fix (TOCDEV-3012)
- Load two-factor-connector in login when two-factor activation is forced
- Fix autofocus if first field is a textarea

0.4.16
- Support deletion of documents in docs route
- Fix relation selection bug (TOCDEV-3037)
- Fix default value serach filter bug

0.4.15
- Harmonize icon size and text spacing
- Fix blank screen after navigating away from the calendar
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- New input prop `contextParams` to extend context
- New action in the docs route to create a folder
- Support shrinkToContent column attribute
- Fix search form endless loading with empty filter field
- Fix path dirty bug
- Fix missing default values bug

0.4.13
- Support uploading documents in DMS
- Merge V2!

0.4.12
- Text autosize new component (Fixes Safari performance problems)

0.4.11
- Adjust left pane grid on for android tablets to prevent overflow
- Two Factor Connector process optimizations
- Upload component: Show file names only in upload process
- Style two-factor-connector app
- Login: fix leading zeros bug in two-factor code

0.4.10
- Async validation on blur

0.4.9
- Prevent content ghosting in safari when opening/closing collapsibles
- Add password-update and two-factor-connector to menu
- Update dependencies
- Update FullCalendar

0.4.8
- Introduce navigationStrategy
- Remove favicons inside react project, as they will loaded via the static index.html
- Remove obsolete right margin inside menu item
- Display integer and counter data unformatted
- Add copy action

0.4.7
- Refactor Layout components to use CSS Grid instead of JS for nested elements
- Fix positioning and z-index of ActionsWrapper
- Improve render of multi column layouts
- Change the text format if there are only fieldErrors
- Persist selected relation tab on detail
- Focus on first input field

0.4.6
- Use same width for all Fontawesome icons
- Introduce custom cell renderers
- New type icons in DMS list
- Disable pointer event on Desktop as text cant be copied otherwise in Firefox

0.4.5
- Fix top padding of modal
- Fix padding of immutable stated values

0.4.4
- Fix column picker styling
- Use column label as titles when hovering over headers
- Prevent mobile keyboard from pushing the modal up
- Fix bug on list and detail

0.4.3
- Fix table reset

0.4.2
- Fix the label of richtext fields to the top
- Reset load mask height to 100%
- Modal refactoring
- Remove hover background color on active filter buttons
- Add height to label to prevent vertical clip
- Hide overflow of single value element
- Default search filter is disabled when opening the relations view of an entity as its own list
- Prevent click on disabled date input field

0.4.1
- Prevent null pointer when opening DMS (no action bar in form model)

0.4.0
- Add initial version of DMS
- Hide burger menu button behind legacy modal window mask

0.3.36
- Fix reports without custom settings
- Add minimal padding to search filter to avoid scrollbar on fewer entries
- Style button inside table
- Add title tooltip to button
- Make whole row clickable in list

0.3.35
- Fix advanced search menu bug
- Change typography link color to secondary (blue)
- Do not display relation to parent entity in column picker if opened in a relation tab
- Display id instead of label if the label is empty in column

0.3.34
- Fix modal being push out of view when keyboard pops up on iOS
- Prevent label overflow inside input field
- Prevent popper menu disappearing behind main menu overlay

0.3.33
- Adjust tile width of modal to match modal width
- Adjust top margin of modal content
- Set height and width attribute to allow the browser to calculate/reserve sufficient space and minimize layout shifts
- Remove hover of relation boxes on mobile devices
- Add caption to preview
- Improve caching (long-term cache)

0.3.32
- Style popover to better align with overall design and have better contrast
- Add margin to error items inside popper
- Adjust entity list height inside detail view to scale on smaller screens
- Change link colors to secondary color

0.3.31
- Adjust relations view height for smaller screens
- Increase min-width of table column for more usability on smaller screens
- Disable touch on mobile and adjust margin
- Autocomplete support
- Fix select for mobile
- Fix display bug

0.3.30
- Adjust filter pane height when expanded
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Fix create reverse relation
- Open remote fields on second click
- Improve form error notification
- Set max width in layout box to prevent overflowing elements
- Hide horizontal scrollbar to prevent it appearing on while loading

0.3.29
- Remove stated value error animation, as it caused a wobble effect
- Extend actiom handling (precheck and initial forms with data)
- Optimize input edit initialization
- Fix relation columns edit bug


0.3.28
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Fix search filter sorting

0.3.27
- List performance optimizations
- Update style components

0.3.26
- Reset css overwrites of Upload and refactor Preview
- Restrict urls in table to one line
- Fix error field focus bug
- Fix breadcrumbs action bug
- Add create breadcrumbs
- Adjust search filter height
- Set min and max width for modal

0.3.25
- Initialize container size for correct display in modal
- Add min width to modal
- Center QR Code

0.3.24
- Searchform bug fix

0.3.23
- Narrow left panel width of input edit
- Improve UX of list and search view within modal
- Build fields without model (refactoring)
- Hide readonly fields without value
- Style column picker dialog inside modal
- Fix overflow of column picker in case of long texts and change ok button look
- Remove all usages of old display endpoints (refactoring)

0.3.22
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Adjust search filter area height to have minimal padding at bottom when expanded
- Set box sizing on td to prevent overwrite in external context
- Change error view background and icon size
- Admin loadCurrentViewInfo refactoring

0.3.21
- Remove about tocco modal title
- Form builder refactoring
- Fix action query selection bug

0.3.20
- Display search filter button only on hover - else hide
- Change help menu icon
- Hide action in advanced search
- Fix remote field

0.3.19
- Handle strings in search with "like" and add boolean handler
- Expand search filter list button area for better UX

0.3.18
- Use recaptcha v2
- Add tabindex for password update dialog
- Entity list: Add support for `clickable` attribute
- Menu entry to edit columns and reset

0.3.17
- Adjust gutter height in admin search form
- Style error view

0.3.16
- Change header ball menu icon to info symbol
- Style draggable gutter for more usability and design consistency
- Revert resource-scheduler tooltip border

0.3.15
- Add admin help menu
- Fix width of table cells so that there is no overlap at the last column on smaller screens
- Align bm button menu with content
- Add bottom padding to search box to prevent see through of underlying text
- Style input edit table to ensure consistend UI. Remove obsolete split pane feature
- Invert header color for TEST/Prod

0.3.14
- Style header logo depending on runEnv
- Use KEYS instead of IN in tql
- Style draggable table headers and kabob menu
- Show relation create button depending of permissions
- Handle notifications depending on parent
- Fix iOS relations boxes on iOS Tablets and restrict width of left pane in detail view to 40%
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalue colors for more contrast/readability
- Fix admin resource scheduler bug

0.3.13
- Allow calendars to be preselected by passing them to the preselectedCalendars input
- Table component
- Added button to reset all preferences
- Implement responsive height fixes for tablets
- Make all children of readonly layouts readonly
- Style input fields according to material design

0.3.12


0.3.11
- Improve handling of empty values in number fields

0.3.10
- Center search filter icon vertically
- Finish styling of input edit table
- Center input field of select
- Fix sizing of ball

0.3.9
- Place button groups on same level
- Prevent action menu appearing underneath fixed menu bar
- Enable wrapping of buttons in detail view with narrower screen width
- Harmonize button spacing and sizing in list view
- Harmonize button sizing and spacing of button groups
- Adapt navigation bar width to match the width of list view sidebars
- Style entity view screens
- NumberFormatter can now handle options for setting the minimum fraction digits
- InputEditTable now displays all readonly fields a FormattedValues
- Allow multiple selected Inputs to be handled in input-edit, if they are compatible.
- Add vertical scrolling to input edit table
- Adjust minimum height of table content to 300px
- Style kabob menu inside table header

0.3.8
- Style InputEdit Table
- Harmonize relations view spacing
- Enable 100% height of layout container in old client
- Menu makeover
- Style new dropdown menu
- Harmonize menu icon spacing
- Reposition notifier close icon
- sort list by preferences and save new preferences when changing the sorting
- Add button to reset sorting to entity-list
- Fix icon positioning within buttons
- Fix relation count

0.3.7
- Table column positioning
- Style Two-Step Login
- Fix Range delete value bug

0.3.6
- Fix delete bug

0.3.5
- Support time fields in search form
- Fix split action button
- Display notifications correctly in InputEdit

0.3.4
- Fix shy in table header
- Delete sso cookie on logout
- Adjust HTML Edit
- Optimize admin view loading
- Add actions to input-edit
- Enable notifications in input-edit
- Add information box to input-edit
- Fix readonly fields shown as editable
- Improve date time rendering
- Adjust table cell width of last column

0.3.3
- Mitigate unwanted legacy action loading effects
- Harmonize notification spacing
- Enable full height scaling of detail view
- Add legacy icons
- Adjust list limits
- Adjust advanced-search list limit
- Enable table height in resource calender to full height
- Enable hover effect on first two table header elements
- Delete Action
- Harmonize question icon size/spacing in detail view
- Adjust fulltext search to work the same way as in old client

0.3.2
- Support description fields

0.3.1
- Adjust table padding and hover table heading hover
- Slim down left panel width in entity list view
- Remove additional clear icon in safari
- Fix fuzzy rendering of bold fonts in firefox

0.3.0
- Table v2
- Fix display expressions
- Add custom app action handler

0.2.9
- Support new two-factor authentication
- Adjust two factor handling

0.2.8
- Fix two-factor authentication bug
- Hide actions in preview list
- Use new search filter endpoint
- Harmonize icon spacing in preview box
- Harmonize modal box spacing
- Disable caching for DEV
- Make welcome screen responsive
- Support multi-path select and remote fields

0.2.7
- Fix admin width problem

0.2.6
- Style range component
- Small date component improvements
- Fix fallback sorting bug
- Fix label null bug
- Add captcha to login
- Fix bug where old pw was displayed as invalid

0.2.5
- Component type fix
- Fix burger button
- Adapt success color for better readability

0.2.4
- Panel animation refactoring
- Animate burger icon
- Fix &shy; in label
- Improve modal ux

0.2.3
- Backend: Send searchform values with tql
- Minimize login form dimensions
- Menu arrow navigation
- Harmonize stated value box padding
- SSO integration

0.2.2
- Button hover styling
- Style display-expressions
- Adjust search-filter size automatically
- Crop search filter text
- Make login responsive
- Button adjustment for mobile
- Style button dropdown list
- Constriction bug fix

0.2.1
- Adjust responsive behavior of layout box in detail view
- Fix reports
- Animate validate error list

0.2.0
- Fix display-expression not shown in list view
- Basic display-expression bootstrap class support
- Fix display-expression sorting in list view
- Create multi relation create fix
- Optimize async validation in create
- Persist search-filters
- Fix prompt when changing relations preview
- Use relation-count client endpoint

0.1.26
- Fix principal service usage

0.1.25
- Fallback sorting (Last_updated) in lists
- Support of code and ipaddress datatypes fields

0.1.24
- Increase list limit
- Style fixing

0.1.23
- Fix list scrollbar

0.1.22
- Change fontSize and spacing
- Style List View
- Remove scrollbar of table
- Button styling
- Fix small icon bug

0.1.21
- Style filter buttons
- Welcome screen
- Detail view styling

0.1.20
- Style list view
- Style breadcrumbs
- Fetch form with scope (update/create)
- Rearrange search form buttons
- Load language from browser
- Translate breadcrumbs entity name
- Add User and Businessunit menu
- Disable word-break in table

0.1.19
- Fix upload

0.1.18
- Save button in action bar
- Style relations view

0.1.17
- Fix images

0.1.16
- New Icon set
- Styled search-box
- Styled top bar and menu
- Styled login text
- Styled breadcrumbs
- New selection controller

0.1.15
- Fix location field
- Fix sso-login

0.1.14
- Further style login view
- Use rest 2.0

0.1.13
- Fix bug where images were not loaded correctly

0.1.12
- Add relation preview open link on detail view
- Style login and sso-login
- Fix parent Search field bug
- Fix url view bug

0.1.11
- Fix navigation bug where the same url loaded different views
- View caching

0.1.10
- Restrict global icon dom watch
- Add search-filters to admin search form

0.1.9
- Menu endpoint url fix
- Size and padding

0.1.8
- Search Form Prototype

0.1.7
- Settings Menu
- Menu Shortcut fix
- Local caching
- Show current beta version on Dashboard

0.1.6
- General performance optimizations

0.1.5
- Detail performance improvement
- Relation view in detail

0.1.3
- menu and navigation improvements
- detail dashboard

0.1.2
- improved navigation and detail view

0.1.1
- Basic routing and prototype
- Login prototype

