import React, {useState} from 'react'

import Upload from './'

export const Story = args => {
  const [value, setValue] = useState({
    binaryLink: 'https://unsplash.it/400',
    thumbnailLink: 'https://unsplash.it/400',
    fileName: 'example_file.jpg'
  })

  const changeValue = file => {
    if (file === null) {
      setValue(null)
    } else {
      setTimeout(() => {
        setValue({
          binaryLink: file.preview,
          thumbnailLink: file.preview,
          fileName: file.name
        })
      }, 3000)
    }
  }

  return <Upload
    value={value}
    onUpload={changeValue}
    {...args}
  />
}

export default {
  title: 'Tocco-Ui/Upload',
  components: Upload,
  argTypes: {
    textResources: {
      type: 'object',
      defaultValue: {
        upload: 'D`n`D or click',
        uploading: 'uploading...',
        download: 'DOWNLOAD',
        delete: 'DEL'
      }
    }
  }
}
