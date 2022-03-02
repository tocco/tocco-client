import React from 'react'

import noBorder from '../../../../storybook/addons/no-border'
import AdminApp from './main'

export default {
  title: 'Apps/Admin',
  component: AdminApp,
  decorators: [noBorder]
}

export const Story = () => {
  const currentLocation = window.location.pathname + window.location.search
  return (
    <div>
      <AdminApp baseRoute={currentLocation} />
    </div>
  )
}
