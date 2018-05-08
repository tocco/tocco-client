/* eslint-disable */
import React from 'react'
import Upload from './'

// real-import:import Upload from 'tocco-ui'

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: {
        binaryLink: 'https://unsplash.it/150',
        thumbnailLink: 'https://unsplash.it/150',
        fileName: 'example_file.jpg'
      }
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
        {/* start example */}
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
        {/* end example */}
      </div>
    )
  }
}

export default () => <Example/>
