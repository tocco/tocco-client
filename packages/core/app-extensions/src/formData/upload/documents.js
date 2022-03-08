import _pick from 'lodash/pick'
import {request} from 'tocco-util'

/**
 * Upload a file.
 *
 * @param file {File} File to upload
 *
 * @returns {Object} An object which contains the following options:
 * - contentType {String}
 * - fileName {String}
 * - id {String}
 * - size {String}
 * - sizeInBytes {Number}
 * - success {bool}
 * - binaryLink {string}
 * - thumbnailLink {string}
 */
export const uploadRequest = file => {
  const data = new FormData()
  data.append('file', file)

  const fetchOptions = {method: 'POST', body: data}
  return request.executeRequest('upload', fetchOptions).then(request.extractBody)
}

export const documentToFormValueTransformer = (uploadResponse, file) => {
  const responseAttributes = _pick(uploadResponse, ['id', 'fileName'])
  const mimeType = uploadResponse.contentType

  return {
    ...responseAttributes,
    binaryLink: file.preview,
    thumbnailLink: mimeType.startsWith('image') ? file.preview : null
  }
}
