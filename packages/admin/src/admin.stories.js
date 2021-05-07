import React from 'react'

import noBorder from '../../../storybook/addons/no-border'
import AdminApp from './main'

export default {
  title: 'Admin/Admin',
  decorators: [noBorder]
}

export const Story = () => {
  const currentLocation = window.location.pathname + window.location.search
  return <AdminApp
    baseRoute={currentLocation}
  />
}
