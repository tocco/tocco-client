import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Typography} from 'tocco-ui'
import {Helmet} from 'react-helmet'
import styled from 'styled-components'

import {StyledLink} from '../../../../components/StyledLink'

const StyledBreadcumbs = styled.div`
  background-color: #DEE6ED;
  width: 100%;
  padding: 4px;
  margin-bottom: 6px;
`

const Breadcrumbs = ({breadcrumbsInfo}) => {
  if (breadcrumbsInfo.length === 0) { return null }

  return <StyledBreadcumbs>
    <Helmet defer={false}>
      <title>Tocco - {breadcrumbsInfo[breadcrumbsInfo.length - 1].display}</title>
    </Helmet>
    <div>  {
      breadcrumbsInfo
        .map((b, idx) => {
          return <Typography.Span key={idx}>
            <StyledLink to={`/e/${b.path}`}>
              {b.type === 'list' && <Icon icon="list" />}  {b.display ? b.display : ''}
            </StyledLink>
          </Typography.Span>
        })
        .reduce((prev, curr, idx) =>
          [prev,
            <Typography.Span key={'icon' + idx}> <Icon icon="caret-right"/> </Typography.Span>,
            curr]
        )}  </div>
  </StyledBreadcumbs>
}

Breadcrumbs.propTypes = {
  match: PropTypes.object,
  breadcrumbsInfo: PropTypes.array
}

export default Breadcrumbs
