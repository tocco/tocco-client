import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {injectIntl, intlShape} from 'react-intl'

import noBorder from '../../../storybook/addons/no-border'
import AdminApp from './main'
import Readme from '../README.md'

storiesOf('Apps|Admin', module)
  .addDecorator(withKnobs)
  .addDecorator(noBorder)
  .add(
    'Admin',
    () => <AdminStoryIntl/>,
    {info: {disable: true}, notes: Readme}
  )

class AdminStory extends React.Component {
  key = 0

  render() {
    return <AdminApp
      key={this.key++}
      baseRoute="iframe.html?id=apps-admin--entity-browser"
    />
  }
}

AdminStory.propTypes = {
  intl: intlShape
}

const AdminStoryIntl = injectIntl(AdminStory)
