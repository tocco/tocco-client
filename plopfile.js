module.exports = function (plop) {
  plop.addHelper('ifIn', require('./plop/helpers/ifIn').default)
  plop.setGenerator('Package', require('./plop/generators/package').default)
  plop.setGenerator('Env', require('./plop/generators/env').default)
  plop.setGenerator('Bundle app', require('./plop/generators/bundle-app').default)
}
