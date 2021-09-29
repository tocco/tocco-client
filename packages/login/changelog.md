0.2.25
- Style new notification boxes
- Style notification center
- Introduce new prop to determine if layout containers should occupy remaining height on screen
- Displayexpression call adjustment
- Change cursor to pointer on panel header/footer hover
- Enable body scrolling on login screen for smaller screens
- datetime search fields now use a date field until the full range is expanded
-  Add action selection count confirm
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
- Harmonize toaster styling
- Fix blocking info being covered by header
- Fix notifications for already deleted outputjobs
- Prevent dropdown menu being clipped in viewport
- Support empty html edit field
- Has value for checkboxes change
- Improve pagination UX by moving it to the left and changing button behavior
- Fix search filter menu hover
- Add preview for documents
- Style location edit dropdown to match other dropdowns
- Remove download icon inside button of report settings
- Fix calender search bug
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
- rename username to usernameOrPk for passwordUpdate

0.2.24
- render description field in form
- Fix popper menu positioning
- Prevent layout container overlap in detail view
- Fix html edit initial change
- Prevent range input overflow
- Adapt table colors to better differentiate from background
- Fix select menu disappearing behind modal

0.2.23
- Clear button in date fields only show up when data has been entered, tab and enter can now be used to navigate in the calendar popup and between date fields
- Text as html
- Prevent stacking of modal overlays

0.2.22
- Adjust label margin in input fields
- reload sources after deployment
- Restrict max width of popover to 400px
- Reference text ressources for aria-labels for improved localization
- Increase contrast of theme colors to ensure WCAG 2.0 standards
- Change spacing/hover colors inside table and adjust scrollbar width
- Change notifier style to a solid variant to increase contrast/visibility
- Change popover style to solid for increased contrast
- Adjust text shade colors to a lighter variant
- Fix fulltext search
- support createuser & updateuser in tql builder
- Keep scroll position on multi select selection
- fix menu in action
- move validation helper method to tocco-util

0.2.21
- Move buttons inside modals to the right to improve UX
- Fix hidden extender and force border rendering of ranges in chrome
- Fix empty report settings (TOCDEV-3218)
- Fix spacing of notifiers without title
- Fix icon and qr code spacing inside two factor connector
- Style upload and switch to light icons
- Fix empty pop-up in old client
- Fix empty pop-up in old client
- Prevent action buttons disappearing on scroll
- Introduce onResize external event
- Harmonize popover placement on description formatter
- Add aria-labels to improve accessibility
- fix long term caching

0.2.20
- Move buttons inside modals to the right to improve UX
- Fix hidden extender and force border rendering of ranges in chrome
- Fix empty report settings (TOCDEV-3218)
- Fix spacing of notifiers without title
- Fix icon and qr code spacing inside two factor connector
- Style upload and switch to light icons
- Fix empty pop-up in old client
- Fix empty pop-up in old client
- Prevent action buttons disappearing on scroll
- Introduce onResize external event

0.2.19
- Style notifier popups to better harmonize with the existing styling
- Make panel header clickable so it can also expand the panel
- Fix logo not displaying in login screen on iOS

0.2.18
- Text autosize new component (Fixes Safari performance problems)
- Support multipart/form-data requests in `rest` extension
- Handle answer from custom actions
- Harmonize icon size and text spacing
- Style datepicker so that it fits better into the rest of admin
- Add a popover variant that is placed on the right of element
- Prevent flickering effect for tooltips
- Support shrinkToContent column attribute
- Fix path dirty bug
- Fix missing default values bug
- Fix default value serach filter bug
- Harmonize text spacing in two factor connector
- Fix checkbox and menu background hover inside table heading
- Set origin id for each session (TOCDEV-2980)
- Writable mutlipath fix (TOCDEV-3012)
- Writable mutlipath fix (TOCDEV-3012)
- Load two-factor-connector in login when two-factor activation is forced

0.2.17
- Increase min-width of table column for more usability on smaller screens
- Disable touch on mobile and adjust margin
- Fix select for mobile
- Style popover to better align with overall design and have better contrast
- Change link colors to secondary color
- Adjust ttile width of modal to match modal width
- Adjust top margin of modal content
- Add caption to preview
- Fix modal being push out of view when keyboard pops up on iOS
- Prevent label overflow inside input field
- Prevent popper menu disappearing behind main menu overlay
- Fix advanced search menu bug
- Change typography link color to secondary (blue)
- Fix reports without custom settings
- Style button inside table
- Add title tooltip to button
- Fix the label of richtext fields to the top
- Reset load mask height to 100%
- Add height to label to prevent vertical clip
- Hide overflow of single value element
- Prevent click on disabled date input field
- Use column label as titles when hovering over headers
- Prevent mobile keyboard from pushing the modal up
- Fix top padding of modal
- Fix padding of immutable stated values
- Use same width for all Fontawesome icons
- Disable pointer event on Desktop as text cant be copied otherwise in Firefox
- Refactor Layout components to use CSS Grid instead of JS for nested elements
- Fix positioning and z-index of ActionsWrapper
- Improve render of multi column layouts
- Introduce navigationStrategy
- Introduce navigationStrategy
- Remove obsolete right margin inside menu item
- Display integer and counter data unformatted
- Prevent content ghosting in safari when opening/closing collapsibles
- Adjust left pane grid on for android tablets to prevent overflow
- Upload component: Show file names only in upload process
- Login: fix leading zeros bug in two-factor code

0.2.16
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

0.2.15
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

0.2.14
- Use recaptcha v2
- Add tabindex for password update dialog

0.2.13
- Style input fields according to material design
- Change Stated and Editablevalue colors for more contrast/readability

0.2.12
- Style Inputfield in two step login form
- Fix icon positioning within buttons
- Harmonize button sizing and spacing of button group

0.2.11
- Fix two factor bug

0.2.10
- Support new two-factor authentication
- Adjust two factor handling
- Fix display expressions
- remove additional clear icon in safari
- fix fuzzy rendering of bold fonts in firefox
- Support description fields
0.2.10
- Adjust two factor handling
- Fix display expressions
- Remove additional clear icon in safari
- Fix fuzzy rendering of bold fonts in firefox
- Support description fields

0.2.9
- Support new two-factor authentication

0.2.8
- Disable caching for DEV

0.2.7
- Fix two-factor authentication bug

0.2.6
- responsive adjustments of login for mobile
- Adapt success color for better readability
- Add captcha to login
- Fix bug where old pw was displayed as invalid

0.2.5
- Adjust login button style

0.2.4
- Fix locale change bug

0.2.3
- Various style adjustments

0.2.2
-  Fix Chrome autofill bug

0.2.1
-  Floating labels

0.2.0
- Update React and React-Dom PeerDependency to 16.8.4
- Remove dependency inside tocco-theme

0.1.39
