import preAction from './preAction'
import confirmHandler from './confirm'
import initialForm from './initialForm'

const preActions = [confirmHandler, initialForm]

export default {run: preAction(preActions)}
