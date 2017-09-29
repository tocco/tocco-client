import _pick from 'lodash/pick'

const UPLOAD_ENDPOINT_URL = `${__BACKEND_URL__}/nice2/upload`

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

  const fetchOptions = {
    method: 'POST',
    credentials: 'include',
    body: data
  }

  return fetch(UPLOAD_ENDPOINT_URL, fetchOptions)
    .then(response => response.json())
}

export const documentToFormValueTransformer = (uploadResponse, file) => {
  const responseAttributes = _pick(uploadResponse, ['id', 'fileName', 'contentType'])

  return {
    ...responseAttributes,
    binaryLink: file.preview,
    thumbnailLink: file.preview
  }
}
