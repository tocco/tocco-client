import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, number, select, text} from '@storybook/addon-knobs'
import _pick from 'lodash/pick'

import ButtonLink from './'
import {design} from '../utilStyles'

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
      iconPosition={select('iconPosition', {'-': null, ..._pick(design.position, ['PREPEND', 'SOLE'])}) || undefined}
      ink={select('ink', design.ink)}
      label={text('label', 'Button Link')}
      look={select('look', {'-': null, ..._pick(design.look, ['BALL', 'FLAT', 'RAISED'])}) || undefined}
      rel={text('rel', undefined)}
      stopPropagation={boolean('stopPropagation', false)}
      tabIndex={number('tabIndex', undefined)}
      target={select('target', ['_self', '_blank'])}
      title={text('title', 'This is the button link.')}
    />
  )
