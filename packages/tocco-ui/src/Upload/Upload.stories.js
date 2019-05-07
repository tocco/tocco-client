import React from 'react'
import {storiesOf} from '@storybook/react'
import {boolean, text, withKnobs} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'

import Upload from './'
import {Upload as RawUpload} from './Upload'

export class UploadStory extends React.Component {
  state = {
    value: {
      binaryLink: 'https://unsplash.it/400',
      thumbnailLink: 'https://unsplash.it/400',
      fileName: 'example_file.jpg'
    }
  }

  changeValue(file) {
    action('File uploaded')(file)

    if (file === null) {
      this.setState({
        value: null
      })
    } else {
      setTimeout(() => {
        this.setState({
          value: {
            binaryLink: file.preview,
            thumbnailLink: file.preview,
            fileName: file.name
          }
        })
      }, 3000)
    }
  }

  render() {
    return (
      <div>
        <Upload
          value={this.state.value}
          onUpload={this.changeValue.bind(this)}
          readOnly={boolean('readOnly', false)}
          textResources={{
            upload: text('upload', 'D`n`D or click'),
            uploading: text('uploading', 'uploading...'),
            download: text('download', 'DOWNLOAD'),
            delete: text('delete', 'DEL')
          }}
        />
      </div>
    )
  }
}

storiesOf('Tocco-UI | Upload', module)
  .addDecorator(withKnobs)
  .add(
    'Upload',
    () => <UploadStory/>, {info: {propTables: [RawUpload], propTablesExclude: [UploadStory], source: false}}
  )
