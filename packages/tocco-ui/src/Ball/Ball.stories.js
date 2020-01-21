import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, withKnobs} from '@storybook/addon-knobs'

import Ball from './'

storiesOf('Tocco-UI | Buttons / Ball', module)
  .addDecorator(withKnobs)
  .add(
    'Showcase',
    () => {
      const knobs = {
        disabled: boolean('disabled', false) || undefined
      }

      return <React.Fragment>
        <Ball
          {...knobs}
          icon="chevron-double-right"
          title="You are right"
        />
        <Ball
          {...knobs}
          icon="chevron-down"
        />
        <Ball
          {...knobs}
          icon="chevron-double-right"
          ink="primary"
        />
        <Ball
          {...knobs}
          icon="facebook-f"
          look="raised"
        />
        <Ball
          {...knobs}
          icon="chevron-down"
          ink="primary"
          look="raised"
        />
        <Ball
          {...knobs}
          icon="times"
          ink="primary"
          look="flat"
        />
        <Ball
          {...knobs}
          icon="phone"
          look="flat"
        />
        <Ball
          {...knobs}
          icon="chevron-down"
          ink="primary"
          look="raised"
        />
      </React.Fragment>
    }
  )
