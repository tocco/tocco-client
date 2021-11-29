import document from './document'
import remote from './remote'
import description from './description'
import number from './number'
import moneyamount from './moneyamount'

export default {
  'binary': document,
  'document': document,
  'image': document,
  'multi-remote-field': remote,
  'single-remote-field': remote,
  'description': description,
  'number': number,
  'moneyamount': moneyamount
}
