const storage = {}

export const get = id => (storage[id])

export const set = (id, store) => {
  storage[id] = store
}
