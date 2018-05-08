/* eslint no-console: 0 */
import React from 'react'
import LoadMask from './'
// real-import:import LoadMask from 'tocco-ui'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    return (
      <div style={{height: '100px'}}>
        {/* start example */}
        <button
          onClick={() => this.setState({loaded: !this.state.loaded})}
          style={{position: 'absolute', zIndex: 1, right: 10}}
        >
          Load
        </button>
        <LoadMask
          required={[this.state.loaded]}
          loadingText="Loading..."
        >
          <span>loaded</span>
        </LoadMask>
        {/* end example */}
      </div>
    )
  }
}

export default () => <Example/>
