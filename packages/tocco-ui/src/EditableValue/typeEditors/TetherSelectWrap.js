import React from 'react'
import Select from 'react-select'
import TetherComponent from 'react-tether'

/** from https://github.com/JedWatson/react-select/issues/810#issuecomment-250274937 **/
export default class TetheredSelectWrap extends Select {
  constructor(props) {
    super(props)
    this.renderOuter = this._renderOuter
  }

  _renderOuter() {
    const menu = super.renderOuter.apply(this, arguments)

    if (!menu) {
      return
    }

    const selectWidth = this.wrapper ? this.wrapper.offsetWidth : null

    return (
      <TetherComponent
        renderElementTo=".tocco-ui-theme"
        attachment="top left"
        targetAttachment="bottom left"
        constraints={[{
          to: 'window',
          attachment: 'together'
        }]}
        classes={{
          element: 'tocco-ui-theme tether-select'
        }}
      >
        <div></div>
        {React.cloneElement(menu, {style: {position: 'static', width: selectWidth}})}
      </TetherComponent>
    )
  }
}
