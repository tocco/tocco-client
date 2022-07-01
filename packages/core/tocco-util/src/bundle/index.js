import {useBundledApp} from './hook'
import utils from './utils'

export default {
  useBundledApp,
  loadBundle: utils.loadBundle,
  loadScriptAsync: utils.loadScriptAsync,
  getEntryFilePath: utils.getEntryFilePath
}
