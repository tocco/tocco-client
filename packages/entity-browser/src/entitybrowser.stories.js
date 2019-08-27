import React from 'react'
import {storiesOf} from '@storybook/react'
import {array, boolean, number, text, object, withKnobs} from '@storybook/addon-knobs'
import {injectIntl, intlShape} from 'react-intl'

import EntityBrowserApp from './main'
import Readme from '../README.md'

storiesOf('Apps|Entity Browser', module)
  .addDecorator(withKnobs)
  .add(
    'Entity Browser',
    () => <EntityBrowserStoryIntl/>,
    {info: {disable: true}, notes: Readme}
  )

class EntityBrowserStory extends React.Component {
  key = 0

  render() {
    return <EntityBrowserApp
      key={this.key++}
      locale={this.props.intl.locale}
      entityName={text('entityName', 'User')}
      showSearchForm={boolean('showSearchForm', true)}
      disableSimpleSearch={boolean('disableSimpleSearch', false)}
      formBase={text('formBase', 'User')}
      limit={number('limit', 10)}
      preselectedSearchFields={object('preselectedSearchFields', [{
        id: 'txtFulltext',
        value: '',
        hidden: false
      }])}
      searchFilters={array('searchFilters', [])}
      initialKey={text('initialKey', '')}
      simpleSearchFields={text('simpleSearchFields', '')}
      nullBusinessUnit={boolean('nullBusinessUnit', false)}
      showCreateButton={boolean('showCreateButton', true)}
      memoryHistory={boolean('memoryHistory', false)}
    />
  }
}

EntityBrowserStory.propTypes = {
  intl: intlShape
}

const EntityBrowserStoryIntl = injectIntl(EntityBrowserStory)
