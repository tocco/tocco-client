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
`

const DetailViewPart = styled.div`
  flex: 1;
  margin-right: 1rem;
  
  .tocco-entity-detail {
    padding: 1rem .5rem 2rem 1.5rem;
    background-color: ${theme.color('paper')};
  }
`

const DetailView = props => (
  <DetailViewContainer>
    <DetailViewPart>
      <EditView match={props.match} history={props.history}/>
    </DetailViewPart>
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
