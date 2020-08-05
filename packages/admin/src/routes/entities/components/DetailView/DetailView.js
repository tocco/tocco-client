import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import styled from 'styled-components'
import {theme, StyledScrollbar, scale} from 'tocco-ui'

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
`

const DetailViewPartEdit = styled(DetailViewPart)`
  padding: 0 0 2rem 1.5rem;
  margin-right: 1rem;
  background-color: ${theme.color('paper')};
  overflow-y: auto;
  ${StyledScrollbar}

  .StyledRelationsViewWrapper {
    background-color: ${theme.color('paper')};
    position: sticky;
    top: 0;
    z-index: 1;
    padding-bottom: ${scale.space(-0.5)};
    display: flex;
    flex-wrap: wrap;

    & > * {
      margin-top: ${scale.space(-0.5)};
    }
  }
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
  currentViewInfo: currentViewPropType
}

export default DetailView
