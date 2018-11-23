/* eslint no-console: 0 */
import React from 'react'

import FormattedValue from './'
// real-import:import {FormattedValue} from 'tocco-ui'

const htmlMarkup = `
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<p>Sunt in culpa qui officia deserunt ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
ut aliquip ex ea commodo. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
  <li>dolore eu fugiat
    <ul>
      <li>in reprehenderit aute
      <li>dolore eu fugiat
        <ul>
          <li>in reprehenderit aute</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Consectetur adipisicing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur.</li>
  <li>consectetur adipisicing</li>
</ul>
<ol>
  <li>dolore eu fugiat
    <ol>
      <li>in reprehenderit aute
      <li>dolore eu fugiat
        <ol>
          <li>in reprehenderit aute</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>Consectetur adipisicing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu
      fugiat nulla pariatur.</li>
  <li>consectetur adipisicing</li>
</ol>
`

const Example = () => {
  const timeValue = {
    hourOfDay: 23,
    minuteOfHour: 15,
    secondOfMinute: 0,
    millisOfSecond: 0
  }

  return (
    <div>
      {/* start example */}
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>Boolean</td>
            <td>
              <FormattedValue type="boolean" value/><br/>
              <FormattedValue type="boolean" value={false}/>
            </td>
          </tr>
          <tr>
            <td>Birthdate<br/>Date</td>
            <td>
              <FormattedValue type="birthdate" value="1980-08-02"/><br/>
              <FormattedValue type="date" value="1988-11-14"/>
            </td>
          </tr>
          <tr>
            <td>Char<br/>Counter<br/>Createuser<br/>Email<br/>Identifier<br/>
              Ipaddress<br/>Postcode<br/>String<br/>Uuid</td>
            <td>
              <FormattedValue type="char" value="Simple string"/><br/>
              <FormattedValue type="counter" value="Simple string"/><br/>
              <FormattedValue type="createuser" value="Simple string"/><br/>
              <FormattedValue type="email" value="Simple string"/><br/>
              <FormattedValue type="identifier" value="Simple string"/><br/>
              <FormattedValue type="ipaddress" value="Simple string"/><br/>
              <FormattedValue type="postcode" value="Simple string"/><br/>
              <FormattedValue type="string" value="Simple string"/><br/>
              <FormattedValue type="uuid" value="Simple string"/>
            </td>
          </tr>
          <tr>
            <td>Createts<br/>Datetime</td>
            <td>
              <FormattedValue type="createts" value="2016-12-06T13:40:25.864Z"/><br/>
              <FormattedValue type="datetime" value="2017-11-16T03:21:23.123Z"/>
            </td>
          </tr>
          <tr>
            <td>Dataamount<br/>Integer<br/>Long<br/>Number<br/>Short<br/>Sorting<br/>Version</td>
            <td>
              <FormattedValue type="dataamount" value={1}/><br/>
              <FormattedValue type="integer" value={23}/><br/>
              <FormattedValue type="long" value={2345678}/><br/>
              <FormattedValue type="number" value={1337}/><br/>
              <FormattedValue type="short" value={2}/><br/>
              <FormattedValue type="sorting" value={4}/><br/>
              <FormattedValue type="version" value={1}/><br/>
            </td>
          </tr>
          <tr>
            <td>Decimal<br/>Double</td>
            <td>
              <FormattedValue type="decimal" value={3333.3}/><br/>
              <FormattedValue type="double" value={123.4}/>
            </td>
          </tr>
          <tr>
            <td>Document</td>
            <td>
              <FormattedValue type="document" value={{
                alt: 'orange jellyfish floating in the deep blue sea',
                binaryLink: 'https://picsum.photos/500/500?image=1069',
                fileName: 'jellyfish.jpg',
                thumbnailLink: 'https://picsum.photos/100/100?image=1069'}}/>
              <FormattedValue type="document" value={{
                alt: 'hundreds of juicy strawberries tempting to degustate',
                binaryLink: 'https://picsum.photos/500/500?image=1080',
                caption: 'hundred juicy strawberries',
                fileName: 'jellyfish.jpg',
                thumbnailLink: 'https://picsum.photos/100/100?image=1080'}}/>
            </td>
          </tr>
          <tr>
            <td>Document Compact</td>
            <td>
              <FormattedValue type="document-compact" value={{
                alt: 'orange jellyfish floating in the deep blue sea',
                binaryLink: 'https://picsum.photos/500/500?image=1069',
                fileName: 'jellyfish.jpg',
                thumbnailLink: 'https://picsum.photos/100/100?image=1069'}}/>&nbsp;
              <FormattedValue type="document-compact" value={{
                alt: 'hundreds of juicy strawberries tempting to degustate',
                binaryLink: 'https://picsum.photos/500/500?image=1080',
                caption: 'hundred juicy strawberries',
                fileName: 'jellyfish.jpg',
                thumbnailLink: 'https://picsum.photos/100/100?image=1080'}}/>
            </td>
          </tr>
          <tr>
            <td>Duration</td>
            <td><FormattedValue type="duration" value={83000}/></td>
          </tr>
          <tr>
            <td>HTML</td>
            <td><FormattedValue type="html" value={htmlMarkup}/></td>
          </tr>
          <tr>
            <td>Login</td>
            <td><FormattedValue type="login" value={{username: 'dake'}}/></td>
          </tr>
          <tr>
            <td>Latitude<br/>Longitude</td>
            <td>
              <FormattedValue type="latitude" value={{value: 45.976575}}/>,
              <FormattedValue type="longitude" value={{value: 7.658452}}/>
            </td>
          </tr>
          <tr>
            <td>Money</td>
            <td><FormattedValue type="moneyamount" value={1245.6}/></td>
          </tr>
          <tr>
            <td>Multi Remote<br/>Multi Select</td>
            <td>
              <FormattedValue type="multi-remote" value={
                [{key: '1', display: 'apple'}, {key: '2', display: 'khaki'}]}/><br/>
              <FormattedValue type="multi-select" value={
                [{key: '3', display: 'Matterhorn'}, {key: '4', display: 'Jungfraujoch'}, {key: '5', display: 'Rigi'}]}/>
            </td>
          </tr>
          <tr>
            <td>Percent</td>
            <td>
              <FormattedValue type="percent" value={99.9}/>
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>
              <FormattedValue type="phone" value="+41443886000"/><br/>
              <FormattedValue type="phone" value="+414438860011111110"/>
            </td>
          </tr>
          <tr>
            <td>Remote<br/>Single Select</td>
            <td>
              <FormattedValue type="remote" value={{key: '1', display: 'Apple'}}/><br/>
              <FormattedValue type="single-select" value={{key: '3', display: 'Matterhorn'}}/>
            </td>
          </tr>
          <tr>
            <td>Text</td>
            <td><FormattedValue type="text" value={'Lorem ipsum dolor sit amet.\nExcepturi alias face.'}/></td>
          </tr>
          <tr>
            <td>Time</td>
            <td><FormattedValue type="time" value={timeValue}/></td>
          </tr>
          <tr>
            <td>Url</td>
            <td><FormattedValue type="url" value="http://www.this-is-a.url"/></td>
          </tr>
        </tbody>
      </table>
      {/* end example */}
    </div>
  )
}

export default Example
