import {pathToRegexp} from 'path-to-regexp'

export const extractParamsFromPath = (pathRegex, path) => {
  const pathParts = []
  const re = pathToRegexp(pathRegex, pathParts)
  const res = re.exec(path)

  if (res !== null) {
    return pathParts.reduce(
      (acc, pathPart, idx) => ({
        ...acc,
        [pathPart.name]: res[idx + 1]
      }),
      {}
    )
  }

  return null
}
