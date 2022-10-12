import PropTypes from 'prop-types'
import {useCallback, useEffect, useState} from 'react'
import styled from 'styled-components'
import {rest} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import CommitInfo from '../CommitInfo'
import CommitMsg from '../CommitMsg'
import Header from '../Header'
import IssueInfos from '../IssueInfos'

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
  background: ${props => (props.isOdd ? '#F5F5F5' : '')};
`

const InstallationDelta = ({keys}) => {
  const [delta, setDelta] = useState(null)

  const fetchData = useCallback(() => {
    const url = `tocco/commit-info/installation/${keys[0]}/delta?installation=${keys[1]}`
    return rest.simpleRequest(url)
  }, [keys])

  useEffect(() => {
    fetchData().then(d => setDelta(d))
  }, [fetchData])

  return (
    <StyledInstallationDelta>
      <Header id="Header" keys={keys} delta={delta} />
      <LoadMask required={[delta]} text="Loading delta...">
        {delta &&
          delta.commits.map((commit, idx) => (
            <StyledRow isOdd={Boolean(idx % 2)} key={commit.commit.commitId}>
              <div>
                <CommitInfo
                  commitId={commit.commit.commitId}
                  author={commit.commit.author}
                  commitTimestamp={commit.commit.commitTimestamp}
                />
              </div>
              <div>
                <CommitMsg msg={commit.commit.commitMessage} />
              </div>
              <div>
                <IssueInfos issues={commit.issues} />
              </div>
            </StyledRow>
          ))}
      </LoadMask>
    </StyledInstallationDelta>
  )
}

InstallationDelta.propTypes = {
  keys: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default InstallationDelta
