/* eslint-disable */
import React from 'react'
import {IntlProvider} from 'react-intl'
import Upload from './'
import {storiesOf} from '@storybook/react'
import {boolean, text, withKnobs} from '@storybook/addon-knobs'
import {Upload as Raw} from './Upload'

export class UploadStory extends React.Component {
  state = {
    value: {
      binaryLink: 'https://unsplash.it/400',
      thumbnailLink: 'https://unsplash.it/400',
      fileName: 'example_file.jpg'
    }
  }

  changeValue(file) {
    console.log('Upload called', file)

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
          readOnly={false}
          textResources={{
            upload: 'D`n`D or click',
            uploading: 'uploading...',
            download: 'DOWNLOAD',
            delete: 'DEL'
          }}
        />
      </div>
    )
  }
}

storiesOf('Edit Data', module)
  .addDecorator(withKnobs)
  .add(
    'Upload',
    () => <UploadStory
      readOnly={boolean('readonly', false)}
      textResources={{
        upload: text('upload', 'D`n`D or click'),
        uploading: text('uploading', 'uploading...'),
        download: text('download', 'DOWNLOAD'),
        delete: text('delete', 'DEL')
      }}
    />, {info: {propTables: [Raw], propTablesExclude: [UploadStory, IntlProvider], source: false}}
  )
