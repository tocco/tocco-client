/* eslint no-console: 0 */
import React from 'react'
import FormattedValue from './'
// real-import:import {FormattedValue} from 'tocco-ui'

const Example = () => {
  const timeValue = {
    value: {
      hourOfDay: 23,
      minuteOfHour: 15,
      secondOfMinute: 0,
      millisOfSecond: 0
    }
  }

  return (
    <div>
      {/* start example */}
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>String</td>
            <td><FormattedValue type="string" value="Simple string"/></td>
          </tr>
          <tr>
            <td>Text</td>
            <td><FormattedValue type="text" value={'Test\nLine2'}/></td>
          </tr>
          <tr>
            <td>Url</td>
            <td><FormattedValue type="url" value="http://www.this-is-a.url"/></td>
          </tr>
          <tr>
            <td>DateTime</td>
            <td><FormattedValue type="datetime" value="2016-12-06T13:40:25.864Z"/></td>
          </tr>
          <tr>
            <td>Date</td>
            <td>
              <FormattedValue type="date" value="1980-08-02"/><br/>
              <FormattedValue type="date" value="1988-11-14"/>
            </td>
          </tr>
          <tr>
            <td>Time</td>
            <td><FormattedValue type="time" value={timeValue}/></td>
          </tr>
          <tr>
            <td>Phone</td>
            <td><FormattedValue type="phone" value="+41443886000"/></td>
          </tr>
          <tr>
            <td>Phone</td>
            <td><FormattedValue type="phone" value="+414438860011111110"/></td>
          </tr>
          <tr>
            <td>Duration</td>
            <td><FormattedValue type="duration" value={3020000}/></td>
          </tr>
          <tr>
            <td>Money</td>
            <td><FormattedValue type="moneyamount" value={1245.6}/></td>
          </tr>
          <tr>
            <td>Boolean</td>
            <td>
              <FormattedValue type="boolean" value/>
              <FormattedValue type="boolean" value={false}/><br/>
            </td>
          </tr>
          <tr>
            <td>Decimal</td>
            <td><FormattedValue type="decimal" value={3333.3}/></td>
          </tr>
          <tr>
            <td>Integer</td>
            <td><FormattedValue type="integer" value={1337}/></td>
          </tr>
          <tr>
            <td>Long/Langitude</td>
            <td>
              <FormattedValue type="longitude" value={{value: 0.82710405122667465}}/>
            </td>
          </tr>
          <tr>
            <td>Login</td>
            <td>
              <FormattedValue type="login" value={{username: 'dake'}}/>
            </td>
          </tr>
          <tr>
            <td>Percent</td>
            <td>
              <FormattedValue type="percent" value={99.9}/>
            </td>
          </tr>
          <tr>
            <td>Document</td>
            <td>
              <FormattedValue type="document" value={{
                fileName: 'Blue-Square.png',
                binaryLink: 'http://linkt.to/my/image.png',
                thumbnailLink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAQMAAADYVuV7AAAACXBIWXMAAA7EAAA'
                               + 'OxAGVKw4bAAAABlBMVEUCd72z5fwcX0uLAAAAHElEQVQ4y2NgwAns/8PBn1HOKGeUM8oZrBycAADOggXZNnQm'
                               + 'gAAAAABJRU5ErkJggg=='}}/>
            </td>
          </tr>
        </tbody>
      </table>
      {/* end example */}
    </div>
  )
}

export default Example
