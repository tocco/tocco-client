// https://gist.github.com/julianocomg/296469e414db1202fc86
import PropTypes from 'prop-types'
import React from 'react'

class Affix extends React.Component {
  static propTypes = {
    offset: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
    offset: 0
  };

  constructor() {
    super()
    this.state = {
      affix: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const affix = this.state.affix
    const offset = this.props.offset
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    if (!affix && scrollTop >= offset) {
      this.setState({
        affix: true
      })
    }

    if (affix && scrollTop < offset) {
      this.setState({
        affix: false
      })
    }
  };

  render() {
    const affix = this.state.affix ? 'affix' : ''
    const {className, ...props} = this.props

    return (
      <div {...props} className={`${className || ''} ${affix}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Affix
