import entityReportReducer, {sagas as entityReportSagas} from './entityReport'

export default {
  entityReport: entityReportReducer
}
export const sagas = [entityReportSagas]
