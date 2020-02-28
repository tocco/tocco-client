import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {hot} from 'react-hot-loader/root'
import {LoadMask} from 'tocco-ui'

import CommitMsg from '../CommitMsg'
import CommitInfo from '../CommitInfo'
import IssueInfos from '../IssueInfos'
import Header from '../Header'

const StyledInstallationDelta = styled.div`
  margin: 8px;
`

const StyledRow = styled.div`
  display: grid;
  padding: 3px;
  margin-top: 10px;
  grid-template-columns: 25% 50% 25%;
  grid-column-gap: 10px;
  border: 1px solid #888;
  background: ${props => props.isOdd ? '#F5F5F5' : ''};
`

const InstallationDelta = ({keys}) => {
  const [delta, setDelta] = useState(null)

  const fetchData = async() => {
    const options = {credentials: 'include'}
    const url = `${__BACKEND_URL__}/nice2/rest/tocco/commit-info/installation/${keys[0]}/delta?installation=${keys[1]}`
    const response = await fetch(url, options)
    return response.json()
  }

  useEffect(() => {
    fetchData().then(delta => { setDelta(delta) })
  }, [keys])

  return (
    <StyledInstallationDelta>
      <Header id="Header" keys={keys} delta={delta}/>
      <LoadMask required={[delta]} text="Loading delta...">
        {delta && delta.commits.map((commit, idx) =>
          <StyledRow isOdd={Boolean(idx % 2)} key={commit.commit.commitId}>
            <div>
              <CommitInfo
                commitId={commit.commit.commitId}
                author={commit.commit.author}
                commitTimestamp={commit.commit.commitTimestamp}
              />
            </div>
            <div>
              <CommitMsg msg={commit.commit.commitMessage}/>
            </div>
            <div>
              <IssueInfos issues={commit.issues} />
            </div>
          </StyledRow>
        )}
      </LoadMask>
    </StyledInstallationDelta>
  )
}

InstallationDelta.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default hot(InstallationDelta)
