import {useState} from 'react'

import HtmlEditor from './HtmlEditor'

export default {
  title: 'Tocco-UI/HtmlEditor',
  component: HtmlEditor
}

export const Basic = args => {
  const [value, setValue] = useState('<p>Hallo</p>')
  return <HtmlEditor {...args} value={value} onChange={setValue} />
}
