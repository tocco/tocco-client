import React from 'react'

import Link from './'

export default {
  title: 'Tocco-UI/Link',
  component: Link,
  argTypes: {
    alt: {type: 'string', defaultValue: 'This is a phone link.'},
    breakWords: {type: 'boolean', defaultValue: false},
    download: {type: 'string', defaultValue: 'tocco-101x101.png'},
    href: {type: 'string', defaultValue: '#link'},
    icon: {options: ['envelope', 'phone']},
    label: {type: 'string', defaultValue: 'Phone link'},
    neutral: {type: 'boolean', defaultValue: false},
    target: {options: ['_self', '_blank']},
    title: {type: 'string', defaultValue: 'This is a phonelink'}
  }
}

export const Basic = args => <Link {...args}/>
