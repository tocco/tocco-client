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
