import React, {useState} from 'react'

import AceEditor from './'

export default {
  title: 'Tocco-UI/AceEditor',
  component: AceEditor,
  argTypes: {
    mode: {
      name: 'Language mode',
      type: 'string',
      options: [
        'tql',
        'ftl',
        'less',
        'groovy',
        'drools',
        'html',
        'xml',
        'json'
      ],
      control: {
        type: 'select'
      },
      defaultValue: 'tql'
    },
    showGutter: {
      name: 'Show gutter',
      type: 'boolean',
      defaultValue: true
    },
    minLines: {
      name: 'Minimum lines',
      type: 'number',
      defaultValue: 5
    },
    maxLines: {
      name: 'Maximum lines',
      type: 'number',
      defaultValue: 50
    },
    enableBasicAutocompletion: {
      name: 'Auto complete (Ctrl + Space)',
      type: 'boolean',
      defaultValue: true
    },
    enableLiveAutocompletion: {
      name: 'Auto complete while typing',
      type: 'boolean',
      defaultValue: true
    },
    enableSnippets: {
      name: 'Enable snippets',
      type: 'boolean',
      defaultValue: true
    },
    readOnly: {
      name: 'Read-Only',
      type: 'boolean',
      defaultValue: false
    }
  }
}

export const Default = args => {
  const [value, setValue] = useState('Some code here')
  return <AceEditor
    value={value}
    onChange={setValue}
    mode={args.mode}
    showGutter={args.showGutter}
    editorOptions={{
      minLines: args.minLines,
      maxLines: args.maxLines,
      enableBasicAutocompletion: args.enableBasicAutocompletion,
      enableLiveAutocompletion: args.enableLiveAutocompletion,
      enableSnippets: args.enableSnippets,
      readOnly: args.readOnly
    }}
  />
}

Default.args = {
}
