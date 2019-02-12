/* eslint no-console: 0 */
import React from 'react'

import ButtonLink from './'
// real-import:import {ButtonLink} from 'tocco-ui'

const UrlOrBase64 = "data:image/png;base64,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"  // eslint-disable-line

export default () => {
  return (
    <div>
      {/* start example */}
      <ButtonLink
        href="#ButtonLink"
        label="Base color flat"
      />
      <ButtonLink
        href="#ButtonLink"
        ink="primary"
        label="Primary color flat"
      />
      <ButtonLink
        href="#ButtonLink"
        label="Base color raised"
        look="raised"
      />
      <ButtonLink
        href="#ButtonLink"
        ink="primary"
        label="Primary color raised"
        look="raised"
      />
      <ButtonLink
        alt="Tocco 101x101px"
        download="tocco-101x101.png"
        icon="download"
        href={UrlOrBase64}
        label="Download"
      />
      <ButtonLink
        alt="alt text"
        href="#ButtonLink"
        label="Link with alternative text and title"
        title="title text"
      />
      {/* end example */}
    </div>
  )
}
