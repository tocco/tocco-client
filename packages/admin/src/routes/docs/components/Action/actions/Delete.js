import React from 'react'
import DeleteApp from 'tocco-delete/src/main'

export default props => <DeleteApp {...props} customDeleteEndpoint={'documents/delete'}/>
