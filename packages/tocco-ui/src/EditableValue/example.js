/* eslint no-console: 0 */
import React from 'react'
import {intlShape} from 'react-intl'

import EditableValue from './'
// real-import:import {EditableValue} from 'tocco-ui'

const quillMarkup = `
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <p>Sunt in culpa qui officia deserunt ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <h6>Heading 6</h6>
  <p>Paragraph ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident</p>
  <p><a href="https://tocco.ch" target="_blank">www.tocco.ch</a></p>
  <p><strong>strong Laborum est molLit</strong></p>
  <p><em>em Laborum est molLit</em></p>
  <p><u>u Laborum est molLit</u></p>
  <ul>
    <li>dolore eu fugiat</li>
    <li class="ql-indent-1">in reprehenderit aute
    <li class="ql-indent-1">dolore eu fugiat</li>
    <li class="ql-indent-2">in reprehenderit aute</li>
    <li>Consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur.</li>
    <li>consectetur adipisicing</li>
  </ul>
  <ol>
    <li>dolore eu fugiat</li>
    <li class="ql-indent-1">in reprehenderit aute
    <li class="ql-indent-2">dolore eu fugiat</li>
    <li class="ql-indent-1">in reprehenderit aute</li>
    <li>Consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu
        fugiat nulla pariatur.</li>
    <li>consectetur adipisicing</li>
  </ol>
`

class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      readOnly: false,
      values: {
        string: 'Test String',
        text: 'Line\nLine2',
        url: 'http://www.tocco.ch',
        phone: '+41444005050',
        html: quillMarkup,
        singleSelect: {key: 2, display: 'Two'},
        multiSelect: [{key: 'a', display: 'One'}, {key: 'b', display: 'Two'}],
        date: '2015-12-18',
        multiDate: '2018-10-23',
        dateRangeFrom: '2015-12-21',
        dateRangeTo: '2015-12-24',
        datetime: '2017-01-25T15:15:00.000Z',
        decimal: 123456.78,
        duration: 3660000,
        boolean: false,
        number: 99,
        remote: {key: 999, display: 'Dummy User 999'},
        multiRemote: [
          {key: 999, display: 'Dummy User 999'},
          {key: 1234, display: 'Dummy User 1234'}
        ],
        document: {
          mimeType: 'image/png',
          fileExtension: 'png',
          sizeInBytes: 3336,
          fileName: 'Blue-Square.png',
          binaryLink: 'http://link.to/my/image.png',
          thumbnailLink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7'
          + 'EAAAOxAGVKw4bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAAD'
          + 'OggXZNnQmgAAAAABJRU5ErkJggg=='
        }
      },
      remoteOptions: [],
      multiRemoteOptions: []
    }
  }

  toggleReadOnly() {
    this.setState({
      ...this.state,
      readOnly: !this.state.readOnly
    })
  }

  changeValue(name, value) {
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        [name]: value
      }
    })
  }

  createOptions = (amount, input) => {
    const options = []

    if (input) {
      for (let i = 0; i < amount; i++) {
        options.push({key: i, display: `${input} ${i}`})
      }
    }

    return options
  }

  fetchRemoteOptions = searchTerm => {
    this.setState({
      ...this.state,
      remoteOptions: this.createOptions(10, searchTerm)
    })
  }

  fetchMultiRemoteOptions = searchTerm => {
    this.setState({
      ...this.state,
      multiRemoteOptions: this.createOptions(5, searchTerm)
    })
  }

  handleMockFileUpload = file => {
    console.log('upload', file)
    setTimeout(() => {
      this.changeValue('document', {
        binaryLink: file.preview,
        thumbnailLink: file.preview,
        fileName: file.name
      })
    }, 3000)
  }

  render() {
    return (
      <div>
        <input type="checkbox" checked={this.state.readOnly} onClick={this.toggleReadOnly.bind(this)}/> readOnly
        {/* start example */}
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>string</td>
              <td>
                <EditableValue
                  type="string"
                  value={this.state.values.string}
                  onChange={v => this.changeValue('string', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>text</td>
              <td>
                <EditableValue
                  type="text"
                  value={this.state.values.text}
                  onChange={v => this.changeValue('text', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>url</td>
              <td>
                <EditableValue
                  type="url"
                  value={this.state.values.url}
                  onChange={v => this.changeValue('url', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>phone</td>
              <td>
                <EditableValue
                  type="phone"
                  value={this.state.values.phone}
                  onChange={v => this.changeValue('phone', v)}
                  readOnly={this.state.readOnly}
                  option={{defaultCountry: 'CH'}}
                />
              </td>
            </tr>
            <tr>
              <td>number</td>
              <td>
                <EditableValue
                  type="number"
                  value={this.state.values.number}
                  onChange={v => this.changeValue('number', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>decimal</td>
              <td>
                <EditableValue
                  type="decimal"
                  value={this.state.values.decimal}
                  options={{
                    intl: this.context.intl
                  }}
                  onChange={v => this.changeValue('decimal', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>boolean</td>
              <td>
                <EditableValue
                  type="boolean"
                  value={this.state.values.boolean}
                  onChange={v => this.changeValue('boolean', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>single-select</td>
              <td>
                <EditableValue
                  type="single-select"
                  options={{
                    store: [
                      {key: 1, display: 'One'},
                      {key: 2, display: 'Two'},
                      {key: 3, display: 'Three'}
                    ]
                  }}
                  value={this.state.values.singleSelect}
                  onChange={v => this.changeValue('singleSelect', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>multi-select</td>
              <td>
                <EditableValue
                  type="multi-select"
                  value={this.state.values.multiSelect}
                  onChange={v => this.changeValue('multiSelect', v)}
                  options={{
                    store: [{key: 'a', display: 'One'}, {key: 'b', display: 'Two'},
                      {key: 'c', display: 'Three'}, {key: 'd', display: 'Four'}]
                  }}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>remote</td>
              <td>
                <EditableValue
                  type="remote"
                  onChange={v => this.changeValue('remote', v)}
                  readOnly={this.state.readOnly}
                  value={this.state.values.remote}
                  options={{
                    fetchOptions: this.fetchRemoteOptions,
                    searchPromptText: 'Type to search',
                    clearValueText: 'Clear value',
                    options: this.state.remoteOptions,
                    moreOptionsAvailable: true,
                    moreOptionsAvailableText: 'More Options available'
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>multi-remote</td>
              <td>
                <EditableValue
                  type="multi-remote"
                  onChange={v => this.changeValue('multiRemote', v)}
                  readOnly={this.state.readOnly}
                  value={this.state.values.multiRemote}
                  options={{
                    options: this.state.multiRemoteOptions,
                    fetchOptions: this.fetchMultiRemoteOptions,
                    searchPromptText: 'Type to search',
                    clearAllText: 'Clear all values',
                    moreOptionsAvailable: true,
                    moreOptionsAvailableText: 'More Options available'
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>date</td>
              <td>
                <EditableValue
                  type="date"
                  value={this.state.values.date}
                  onChange={v => this.changeValue('date', v)}
                  readOnly={this.state.readOnly}
                  options={{placeholderText: 'Pick a date', flatpickrOptions: {weekNumbers: true}}}
                />
              </td>
            </tr>
            <tr>
              <td>multi date</td>
              <td>
                <EditableValue
                  type="multi-date"
                  value={this.state.values.multiDate}
                  onChange={v => this.changeValue('multiDate', v)}
                  readOnly={this.state.readOnly}
                  options={{placeholderText: 'Pick a date', flatpickrOptions: {weekNumbers: true}}}
                />
              </td>
            </tr>
            <tr>
              <td>date-range</td>
              <td>
                <EditableValue
                  type="date-range"
                  value={{
                    from: this.state.values.dateRangeFrom,
                    to: this.state.values.dateRangeTo
                  }}
                  onChange={v => {
                    this.changeValue('dateRangeFrom', v ? v.from : null)
                    this.changeValue('dateRangeTo', v ? v.to : null)
                  }
                  }
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>datetime</td>
              <td>
                <EditableValue
                  type="datetime"
                  value={this.state.values.datetime}
                  onChange={v => this.changeValue('datetime', v)}
                  readOnly={this.state.readOnly}
                  options={{placeholderText: 'Pick a date time'}}
                />
              </td>
            </tr>
            <tr>
              <td>duration</td>
              <td>
                <EditableValue
                  type="duration"
                  value={this.state.values.duration}
                  onChange={v => this.changeValue('duration', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
            <tr>
              <td>document</td>
              <td>
                <EditableValue
                  type="document"
                  onChange={v => this.changeValue('document', v)}
                  value={this.state.values.document}
                  readOnly={this.state.readOnly}
                  options={{
                    uploadText: 'drag & drop',
                    uploadingText: 'uploading...',
                    upload: this.handleMockFileUpload
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>html</td>
              <td>
                <EditableValue
                  type="html"
                  value={this.state.values.html}
                  onChange={v => this.changeValue('html', v)}
                  readOnly={this.state.readOnly}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* end example */}
      </div>
    )
  }
}

Example.contextTypes = {
  intl: intlShape
}

export default () => <Example/>
