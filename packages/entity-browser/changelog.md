0.10.17-hotfix227.5
- Fix calender search bug
- Fix detail form firing touched event without user interaction

0.10.17-hotfix227.4
- Fix multi-tab problem

0.10.17-hotfix227.3
- Make whole row clickable in list

0.10.17-hotfix227.2
- Fix search form endless loading with empty filter field
-  Fix action bar

0.10.17-hotfix227.1
- Map integer, counter and long to string

0.10.17
- Adjust filter pane height when expanded
- Change chevron icon in multi select input when dropdown is opened
- Change form field colors. Dirty: blue, Mandatory: organge
- Open remote fields on second click
- Improve form error notification
- Set max width in layout box to prevent overflowing elements

0.10.16
- Reset css overwrites of Upload.js and refactor Preview.js
- Restrict urls in table to one line
- Fix error field focus bug
- Adjust search filter height
- Set min and max width for modal
- List performance optimizations
- Change sort icon order and adjust table header styles to show marker on long columns when dragging
- Reset date/time indicators on input fields
- Remove stated value error animation, as it caused a wobble effect
- Add delete and qr action

0.10.15
- Narrow left panel width of input edit
- Improve UX of list and search view within modal
- Build fields without model (refactoring)
- Hide readonly fields without value
- Style column picker dialog inside modal
- Fix overflow of column picker in case of long texts and change ok button look
- Remove all usages of old display endpoints and use 'entities/2.0/displays'
- Initialize container size for correct display in modal
- Add min width to modal

0.10.14
- Change div to flex item for proper display in old client
- Change flex properties for proper display in old client
- Change div to flex item for proper display in old client
- Set box sizing on td to prevent overwrite in external context

0.10.13
- Entity list: Add support for `clickable` attribute
- Columns edit menu
- Handle strings in search with "like" and add boolean handler
- Hide action in advanced search
- Fix action selection bug
- Refactor form builder

0.10.11
- Table component
- Added button to reset all preferences
- Make all children of readonly layouts readonly
- Style input fields according to material design
- Use KEYS instead of IN in tql
- Style draggable table headers and kabob menu
- Handle notifications depending on parent
- Remove obsolete default searchfield styling and height in nested layout containers
- Change Stated and Editablevalue colors for more contrast/readability
- Fix width of table cells so that there is no overlap at the last column on smaller screens
- Style input edit table to ensure consistend UI. Remove obsolete split pane feature

0.10.10


0.10.9


0.10.8
- Center search filter icon vertically
- Center input field of select
- Fix sizing of ball

0.10.7
- Adjust minimum height of table content to 300px
- Style kabob menu inside table header

0.10.6
- Place button groups on same level
- Prevent action menu appearing underneath fixed menu bar
- Harmonize button spacing and sizing in list view
- Harmonize button sizing and spacing of button groups
- NumberFormatter can now handle options for setting the minimum fraction digits

0.10.5
- Fix icon positioning within buttons

0.10.4
- Support time fields in search form
- Display notifications correctly in InputEdit
- Table column positioning
- Style InputEdit Table
- Enable 100% height of layout container in old client
- Menu makeover
- Style new dropdown menu
- Harmonize menu icon spacing
- Reposition notifier close icon
- sort list by preferences and save new preferences when changing the sorting
- Add button to reset sorting to entity-list

0.10.3
- Fix shy in table header
- Enable opening of other apps in entity-browser
- Adjust HTML Edit

0.10.2
- Mitigate unwanted legacy action loading effects
- Harmonize notification spacing
- Add legacy icons
- Adjust advanced-search list limit
- Enable table height in resource calender to full height
- Enable hover effect on first two table header elements
- Harmonize question icon size/spacing in detail view
- Adjust fulltext search to work the same way as in old client

0.10.1
- Adjust table styling
- Remove additional clear icon in safari
- Fix fuzzy rendering of bold fonts in firefox
- Support description fields

0.10.0
- Table v2
- Fix display expressions

0.9.13
-

0.9.12
- Use new search filter endpoint
- Harmonize modal box spacing
- Disable caching for DEV
- Support multi-path select and remote fields

0.9.11
- Small date component improvements
- Fix fallback sorting bug
- Fix label null bug
- Add white background to mitigate dark theme conflict in nice2
- Improve range style

0.9.10
- Searchform with tql
- Harmonize stateted value box padding
- Panel animation refactoring
- Fix &shy; in label
- Component type fix
- adapt success color for better readability
- Range component

0.9.9
- Reset nice css leak

0.9.7
- Adjust responsive behavior of layout box in detail view
- Style display expressions
- Constriction bug fix

0.9.6
- Support of code and ipaddress datatypes fields
- Fix display-expression not shown in list view
- Basic display-expression bootstrap class support
- Fix display-expression sorting in list view
- Optimize async validation in create
- Persist search-filters

0.9.5
- Fallback sorting (last_updated)

0.9.4
- Various styling adjustments

0.9.3
- use _remotefield form for remotefields
- Cache forms and models
- Icon mapping list
- center icon of button
- format upload message
- Fix filter bug
- Adjust padding and fontsize
- Restrict global icon dom watch
- Add search-filters to admin search form
- Fix FormBuilder model bug

0.9.2
- Floating labels
- Location field support
- Various bug fixes

0.9.1
- Add location field support
- Fix confirm on leave bug when form was not dirty
- Various usability fixes in detail view
- Detail form performance improvements
- Various styling optimizations

0.9.0
- Multi page selection concept
- Update React and React-Dom PeerDependency to 16.8.4

0.8.16
- Fix readonly bug where fields where not shown in readonly mode

0.8.15
- Performance optimization in form
- Custom Signallist (used for Field errors)

0.8.14
- Auto Hide successful actiom message
