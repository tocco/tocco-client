import React from 'react'
import {storiesOf} from '@storybook/react'
import {number, withKnobs} from '@storybook/addon-knobs'
import {injectIntl, intlShape} from 'react-intl'

import Readme from '../README.md'
import InputEditApp from './main'

storiesOf('Apps|Input Edit', module)
  .addDecorator(withKnobs)
  .add(
    'Input Edit',
    () => <InputEditStoryIntl/>,
    {info: {disable: true}, notes: Readme}

  )

class InputEditStory extends React.Component {
  key = 0

  render() {
    return (
      <div>
        <InputEditApp
          key={this.key++}
          locale={this.props.intl.locale}
          inputEntityKey={number('Input primary key', 1)}
        />
      </div>
    )
  }
}

InputEditStory.propTypes = {
  intl: intlShape
}

const InputEditStoryIntl = injectIntl(InputEditStory)
