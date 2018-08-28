import React from 'react'
import _get from 'lodash/get'

export default (loadComponent, selector, defaultComponent = null, onLoaded) => (
  class LazyLoadedComponent extends React.Component {
    mounted = false

    state = {
      Component: null
    }

    select(Component) {
      return selector ? _get(Component, selector) : Component
    }

    componentWillMount() {
      if (this.state.Component === null) {
        loadComponent().then(Component => {
          if (this.mounted) {
            this.setState({Component: this.select(Component)})
          }

          if (onLoaded) {
            onLoaded()
          }
        })
      }
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    render() {
      const {Component} = this.state
      if (Component !== null) {
        return <Component {...this.props}/>
      }

      return defaultComponent
    }
  }
)
