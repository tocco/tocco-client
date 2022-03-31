/* eslint-disable react/prop-types */

import LoadMask from './'

export default {
  title: 'Tocco-UI/Load Mask',
  component: LoadMask,
  argTypes: {
    loaded: {type: 'boolean', defaultValue: false},
    loadingText: {type: 'string', defaultValue: 'Loading...'}
  }
}

export const Basic = ({loaded, ...args}) => (
  <LoadMask required={[loaded]} {...args}>
    LOADED
  </LoadMask>
)
