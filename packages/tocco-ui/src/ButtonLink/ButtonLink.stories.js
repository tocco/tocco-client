import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'

import ButtonLink from './'
import {stylingInk, stylingLook} from '../utilStyles'
import excludeIntlInfo from '../util/excludeIntlInfo'

const position = {
  PREPEND: 'prepend',
  SOLE: 'sole'
}

storiesOf('Navigation', module)
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
      iconPosition={select('iconPosition', {'-': null, ...position}) || undefined}
      ink={select('ink', stylingInk)}
      label={text('label', 'Button Link')}
      look={select('look', stylingLook)}
      stopPropagation={boolean('stopPropagation', false)}
      title={text('title', 'This is the button link.')}
    />, excludeIntlInfo()
  )
