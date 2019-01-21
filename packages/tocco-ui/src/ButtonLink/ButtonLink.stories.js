import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'
import _pick from 'lodash/pick'

import ButtonLink from './'
import {stylingInk, stylingLook, stylingPosition} from '../utilStyles'

storiesOf('ButtonLink', module)
  .addDecorator(withKnobs)
  .add(
    'ButtonLink',
    () => <ButtonLink
      alt={text('alt', 'This is a button link.')}
      buttonGroupMelt={boolean('buttonGroupMelt', false)}
      dense={boolean('dense', false) || undefined}
      download={text('download', 'tocco-101x101.png')}
      href={text('href', '#Link')}
      icon={text('icon', 'phone')}
      iconPosition={select('iconPosition', {'-': null, ..._pick(stylingPosition, ['PREPEND', 'SOLE'])}) || undefined}
      ink={select('ink', stylingInk)}
      label={text('label', 'Button Link')}
      look={select('look', {'-': null, ..._pick(stylingLook, ['BALL', 'FLAT'])}) || undefined}
      stopPropagation={boolean('stopPropagation', false)}
      title={text('title', 'This is the button link.')}
    />
  )
