import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import styled from 'styled-components'
import {theme} from 'tocco-ui'

import RelationsView from '../RelationsView'
import EditView from '../EditView'

const DetailViewContainer = styled.div`
  display:flex;
  flex-direction: row;
  
  .react-bs-container-body {
    height: auto !important;
  }
`

const DetailViewPart = styled.div`
  flex: 1;
`

const DetailViewPartEdit = styled(DetailViewPart)`
  padding: 1rem .5rem 2rem 1.5rem;
  margin-right: 1rem;
  background-color: ${theme.color('paper')};
`

const DetailView = props => (
  <DetailViewContainer>
    <DetailViewPartEdit>
      <EditView match={props.match} history={props.history}/>
    </DetailViewPartEdit>
    <DetailViewPart>
      <RelationsView match={props.match} history={props.history}/>
    </DetailViewPart>
  </DetailViewContainer>
)

DetailView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: PropTypes.object
}

export default DetailView
