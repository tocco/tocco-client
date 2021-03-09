import React from 'react'
import DocsBrowser from 'tocco-docs-browser/src/main'

import {ListLink, DetailLink} from '../entities/utils/navigationStrategy'

const DocsBrowserApp = props => (
  <DocsBrowser {...props} navigationStrategy={{
    ListLink,
    DetailLink
  }}/>
)

export default {
  container: DocsBrowserApp
}
