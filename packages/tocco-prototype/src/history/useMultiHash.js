function useMultiHash(createHistory) {
  return function(options = {}) {
    const history = createHistory(options)

    const { id, separator = ';' } = options
    const prefix = typeof id === 'string' && id.length > 0 ? '/' + id : null

    function find(paths) {
      return paths.findIndex(path => path.indexOf(prefix) === 0)
    }

    function stripPrefix(path) {
      if (path.indexOf(prefix) === 0) {
        return path.substring(prefix.length)
      }
      return path
    }

    function getHash() {
      let hash = window.location.hash
      if (hash.indexOf('#') === 0) {
        hash = hash.substring(1)
      }
      return hash
    }

    function getHashParts() {
      const hash = getHash()
      return hash.split(separator)
    }

    function updatePath(parts, path) {
      const index = find(parts)
      if (index === -1) {
        parts.push(path)
      } else {
        parts[index] = path
      }
    }

    function joinParts(parts) {
      return parts.filter(part => part !== '' && part !== '/').join(separator)
    }

    function insertPath(location) {
      if (prefix) {
        const newLocation = prefix + location
        const parts = getHashParts()
        updatePath(parts, newLocation)
        return joinParts(parts)
      }
      return location
    }

    function extractPath(location) {
      if (location.pathname !== '/' && prefix) {
        const parts = location.pathname.split(';')
        let pathIndex = find(parts)
        const path = pathIndex === -1 ? '/' : stripPrefix(parts[pathIndex])
        location.pathname = path
      }
      return location
    }

    // Override all read methods with prefix-aware versions.
    function listenBefore(hook) {
      return history.listenBefore(function(location, callback) {
        const result = hook(extractPath(location), callback)
        if (hook.length < 2) {
          // Assume the hook runs synchronously and automatically
          // call the callback with the return value.
          callback(result)
        }
      })
    }

    function listen(listener) {
      return history.listen(function(location) {
        listener(extractPath(location))
      })
    }

    // Override all write methods with prefix-aware versions.
    function push(location) {
      history.push(insertPath(location))
    }

    function replace(location) {
      history.replace(insertPath(location))
    }

    function createPath(location) {
      return history.createPath(insertPath(location))
    }

    function createLocation(location, ...args) {
      return extractPath(
        history.createLocation(insertPath(location), ...args)
      )
    }

    return {
      ...history,
      listenBefore,
      listen,
      push,
      replace,
      createPath,
      createLocation
    }
  }
}

export default useMultiHash
