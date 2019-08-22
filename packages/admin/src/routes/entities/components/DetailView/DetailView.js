import React from 'react'
import PropTypes from 'prop-types'
import {intlShape} from 'react-intl'
import {Flex, Box} from '@rebass/grid'

import RelationsView from '../RelationsView'
import EditView from '../EditView'

const DetailView = props => (
  <Flex key="flex">
    <Box width={1 / 2} p={10}>
      <EditView match={props.match} history={props.history}/>
    </Box>
    <Box width={1 / 2} p={10}>
      <RelationsView match={props.match}/>
    </Box>
  </Flex>
)

DetailView.propTypes = {
  intl: intlShape,
  match: PropTypes.object,
  history: PropTypes.object,
  currentViewInfo: PropTypes.object
}

export default DetailView
