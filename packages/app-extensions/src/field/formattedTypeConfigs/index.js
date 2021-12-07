import description from './description'
import document from './document'
import moneyamount from './moneyamount'
import number from './number'
import remote from './remote'

export default {
  binary: document,
  document: document,
  image: document,
  'multi-remote-field': remote,
  'single-remote-field': remote,
  description: description,
  number: number,
  moneyamount: moneyamount
}
