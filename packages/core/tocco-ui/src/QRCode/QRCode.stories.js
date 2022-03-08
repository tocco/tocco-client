import React from 'react'

import QRCode from './'

export default {
  title: 'Tocco-UI/QRCode',
  component: QRCode,
  args: {value: 'Test'}
}

export const Basic = args => <QRCode {...args} />
