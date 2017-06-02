import React from 'react'
import {injectIntl} from 'react-intl'

import chImg from '../imgs/ch.png'
import deImg from '../imgs/de.png'
import itImg from '../imgs/it.png'
import enImg from '../imgs/en.png'
import frImg from '../imgs/fr.png'

const LocaleSwitcher = props => {
  const locales = [
    {name: 'de-CH', src: chImg},
    {name: 'de', src: deImg},
    {name: 'en', src: enImg},
    {name: 'fr', src: frImg},
    {name: 'it', src: itImg}
  ]

  const handleFlagClick = locale => {
    props.onLocaleChange(locale)
  }
  return (

    <div className="locale-switcher">
      {
        locales.map(locale => {
          const activeClass = locale.name === props.intl.locale ? 'active' : ''
          return <img
            key={locale.name}
            className={`flag ${activeClass}`}
            src={locale.src}
            onClick={() => handleFlagClick(locale.name)}
          />
        })
      }
    </div>
  )
}

LocaleSwitcher.propTypes = {
  intl: React.PropTypes.any,
  onLocaleChange: React.PropTypes.func
}

export default injectIntl(LocaleSwitcher)
