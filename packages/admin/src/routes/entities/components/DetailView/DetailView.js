import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import styled from 'styled-components'

import RelationsView from '../RelationsView'
import EditView from '../EditView'

const DetailViewContainer = styled.div`
  display:flex;
  flex-direction: row;
`

const DetailViewPart = styled.div`
  margin: 5px;
  flex: 1;
`

const DetailView = props => (
  <DetailViewContainer>
    <DetailViewPart>
      <EditView match={props.match} history={props.history}/>
    </DetailViewPart>
    <DetailViewPart>
      <RelationsView match={props.match}/>
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
