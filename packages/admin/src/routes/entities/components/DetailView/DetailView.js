import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import styled from 'styled-components'

import RelationsView from '../RelationsView'
import EditView from '../EditView'
import {currentViewPropType} from '../../utils/propTypes'

const DetailViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

  .react-bs-container-body {
    height: auto !important;
  }
`

const DetailViewPart = styled.div`
  flex: 1;

  &:first-child {
    margin-right: 1rem;
  }
`

const DetailView = ({match, history}) => <DetailViewContainer>
  <DetailViewPart>
    <EditView match={match} history={history}/>
  </DetailViewPart>
  <DetailViewPart>
    <RelationsView match={match} history={history}/>
  </DetailViewPart>
</DetailViewContainer>

DetailView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: currentViewPropType
}

export default DetailView
