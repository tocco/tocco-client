import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {setIntlConfig, withIntl} from 'storybook-addon-intl'

import Pagination from './'

setIntlConfig({
  getMessages: locale => ({
    'client.component.pagination.text': '{start} to {to} from {total}'
  })
})

storiesOf('Tocco-UI | Pagination', module)
  .addDecorator(withKnobs)
  .addDecorator(withIntl)
  .add(
    'Pagination',
    () => {
      const [currentPage, setCurrentPage] = useState(1)
      return <Pagination
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        recordsPerPage={20}
        totalCount={999}
      />
    }
  )
