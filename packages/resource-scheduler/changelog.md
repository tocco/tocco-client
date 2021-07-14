0.3.10-hotfix227.3
- Make whole row clickable in list
- Fix calender search bug
- Fix search-form remote bug

0.3.10-hotfix227.2
- Fix deselect all bug
- Map integer, counter and long to string
- Fix search form endless loading with empty filter field

0.3.10
- Adjust filter pane height when expanded
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Open remote fields on second click
- Set max width in layout box to prevent overflowing elements

0.3.9
- Reset css overwrites of Upload.js and refactor Preview.js
- Restrict urls in table to one line
- Adjust search filter height
- Set min and max width for modal
- List performance optimizations
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Remove stated value error animation, as it caused a wobble effect

0.3.8
- Build fields without model (refactoring)
- Hide readonly fields without value
- Style column picker dialog inside modal
- Fix overflow of column picker in case of long texts and change ok button look
- Remove all usages of old display endpoints and use 'entities/2.0/displays'
- Initialize container size for correct display in modal
- Add min width to modal

0.3.7
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Set box sizing on td to prevent overwrite in external context

0.3.6
- Entity list: Add support for `clickable` attribute
- Handle strings in search with "like" and add boolean handler

0.3.5
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalue colors for more contrast/readability
- Fix admin resource scheduler bug
- Fix tooltip outside calendar
- Fix width of table cells so that there is no overlap at the last column on smaller screens

0.3.4
- Allow calendars to be preselected by passing them to the preselectedCalendars input
- Table component
- Added button to reset all preferences
- Make all children of readonly layouts readonly
- Style input fields according to material design

0.3.3
- Fix shy in table header
- Adjust HTML Edit
- Support time fields in search form
- Table column positioning
- Enable 100% height of layout container in old client
- Menu makeover
- Style new dropdown menu
- Harmonize menu icon spacing
- Reposition notifier close icon
- sort list by preferences and save new preferences when changing the sorting
- Add button to reset sorting to entity-list
- Fix icon positioning within buttons
- Place button groups on same level
- Prevent action menu appearing underneath fixed menu bar
- Harmonize button spacing and sizing in list view
- Harmonize button sizing and spacing of button groups
- NumberFormatter can now handle options for setting the minimum fraction digits
- Adjust minimum height of table content to 300px
- Style kabob menu inside table header
- Center search filter icon vertically
- Center input field of select
- Fix sizing of ball

0.3.2
- Mitigate unwanted legacy action loading effects
- Harmonize notification spacing
- Add legacy icons
- Adjust advanced-search list limit
- Adjust list limit
- Enable table height in resource calender to full height
- Enable hover effect on first two table header elements
- Harmonize question icon size/spacing in detail view
- Adjust fulltext search to work the same way as in old client

0.3.1
- Adjust table padding and hover table heading hover
- Slim down left panel width in entity list view
- Remove additional clear icon in safari
- Fix fuzzy rendering of bold fonts in firefox
- Support description fields

0.3.0
- Table v2
- Fix display expressions
- Fix license

0.2.28
- Use new search filter endpoint
- Harmonize modal box spacing
- Disable caching for DEV
- Support multi-path select and remote fields

0.2.27
- Small date component improvements
- Fix fallback sorting bug
- Add white background to mitigate dark theme conflict in nice2
- Add simplified week view

0.2.26
- Constriction handling
- Searchform with tql
- Panel animation refactoring
- Fix &shy; in label
- Component type fix

0.2.25
- Fix display-expression not shown in list view
- View height fix (double scrollbar)

0.2.24
- Various styling adjustments

0.2.23
- Make scheduler smaller (Date formatting, time slot, styling)
- Fix resource resizing

0.2.22
- Checkbox margin fix for nice
- Only show remove all checkbox if resources loaded

0.2.21
- Improve responsiveness of select field in scheduler

0.2.20
- Fix tooltip styling collision with nice
- Fix event click handler
- Adjust button styling

0.2.19
- Add deselect all button
- Add date picker
- Adjust padding and fontsize
- Update fullcalendar
- Restrict global icon dom watch

0.2.18
- Cache forms and models
- Icon mapping list
- Increase record limit to 25
- Fix filter bug

0.2.17
- Add fullcalendar license

0.2.16
- Fix search-filter fields and loading bug
- use _remotefield form for remotefields

0.2.15
- Floating Labels
- Panel control (only one open)

0.2.14
- Format HTML event descriptions
- Remote advanced search list row selection bug fix

0.2.13
- Update React and React-Dom PeerDependency to 16.8.4
- Remove dependency inside tocco-theme

0.2.12
