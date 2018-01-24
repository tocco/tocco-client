import consoleLogger from '../consoleLogger'
import {sleep} from './mockData'

export const setupUpload = (fetchMock, entityStore, timeout = 3000) => {
  fetchMock.post(
    new RegExp('^.*?/nice2/upload.*'),
    documentUploadResponse(timeout)
  )
}

const documentUploadResponse = timeout =>
  (url, opts, c) => {
    consoleLogger.log('fetchMock: file upload', opts)
    const fromData = opts.body
    const file = fromData.get('file')
    const isImage = file.name.endsWith('.jpg') || file.name.endsWith('.png')
    return sleep(timeout).then(() => {
      return {
        success: true,
        id: 'a6d97beb-4d9a-40ae-9754-1b8aff38b720',
        contentType: isImage ? 'image/jpeg' : 'text/plain',
        sizeInBytes: file.size,
        fileName: file.name
      }
    })
  }
