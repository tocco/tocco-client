const ROOT_PATH_REGEX = /^\/docs\/?$/

const isRootLocation = pathname => ROOT_PATH_REGEX.test(pathname)

export default isRootLocation
