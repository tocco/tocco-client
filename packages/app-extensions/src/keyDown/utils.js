
export const getMatchingConfig = (configs, event, global) => configs.find(
  config => (config.code === event.code || config.key === event.key)
      && (config.ctrl
        ? (config.ctrl === event.ctrlKey || config.ctrl === event.metaKey)
        : (config.ctrl === event.ctrlKey && config.ctrl === event.metaKey))
      && config.alt === event.altKey
      && global === config.global)
