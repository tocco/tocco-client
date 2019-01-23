import React from 'react'

import Popover from './'
import Button from '../Button'
import Icon from '../Icon'
import Typography from '../Typography'
import Link from '../Link'
// real-import:import {Popover} from 'tocco-ui'

const image = <img src="https://picsum.photos/200/200" width="200" height="200"/>

const plainHtml = <div>
  <h4>dolor sit amet</h4>
  <p>Lorem <a>ipsum dolor sit</a> amet, consectetur adipisicing elit. Nesciunt rem
  repellat tenetur alias dicta at natus tempora saepe debitis voluptatem non totam
  distinctio soluta reiciendis est, quis iusto quibusdam vero?</p>
</div>

const typographicComponents = <div>
  <Typography.H4>dolor sit amet</Typography.H4>
  <Typography.P>Lorem <Link label="ipsum dolor sit" /> amet, consectetur adipisicing elit.
  Nesciunt rem repellat tenetur alias dicta at natus tempora saepe debitis voluptatem
  non totam distinctio soluta reiciendis est, quis iusto quibusdam vero?</Typography.P>
</div>

export default () => {
  return (
    <div>
      {/* start example */}
      <Popover
        content={image}
        rimless={true}
        placement="top"
      ><Typography.Span>Hover &lt;Span&gt;</Typography.Span></Popover>
      <Popover
        content={plainHtml}
        placement="bottom"
      ><Button label="Hover &lt;Button&gt;" /></Popover>
      <Popover
        content={typographicComponents}
        isPlainHtml={false}
        placement="bottom"
      ><Icon icon="info-circle" /></Popover>
      {/* end example */}
    </div>
  )
}
