import PropTypes from 'prop-types'
import React from 'react'
import {motion} from 'framer-motion'

/**
 * Animated Burger Menu Button
 */
const BurgerButton = ({isOpen, size = '20', color}) => {
  const variant = isOpen ? 'opened' : 'closed'
  const top = {
    closed: {
      rotate: 0,
      translateY: 0
    },
    opened: {
      rotate: 45,
      translateY: 2
    }
  }
  const center = {
    closed: {
      opacity: 1
    },
    opened: {
      opacity: 0
    }
  }
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0
    },
    opened: {
      rotate: -45,
      translateY: -2
    }
  }
  const lineProps = {
    stroke: color,
    vectorEffect: 'non-scaling-stroke',
    strokeWidth: 2,
    initial: 'closed',
    animate: variant,
    transition: {ease: 'easeOut', duration: 0.4}
  }

  return (
    <motion.svg
      viewBox="0 0 6 6"
      overflow="visible"
      preserveAspectRatio="none"
      width={size}
      height={size}
    >
      <motion.line
        x1="0"
        x2="6"
        y1="1"
        y2="1"
        variants={top}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2="6"
        y1="3"
        y2="3"
        variants={center}
        {...lineProps}
        transition={{ease: 'easeOut', duration: 0.1}}
      />
      <motion.line
        x1="0"
        x2="6"
        y1="5"
        y2="5"
        variants={bottom}
        {...lineProps}
      />
    </motion.svg>
  )
}

BurgerButton.propTypes = {
  /**
   * Specify width and height.
   */
  size: PropTypes.string,
  /**
   * Color
   */
  color: PropTypes.string,
  /**
   * Specify width and height.
   */
  isOpen: PropTypes.bool

}

export default BurgerButton
