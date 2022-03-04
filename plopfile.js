module.exports = function (plop) {
  plop.addHelper('ifIn', require('./plop/helpers/ifIn').default)
  plop.setGenerator('Component', require('./plop/generators/component').default)
  plop.setGenerator('Action', require('./plop/generators/action').default)
  plop.setGenerator('Package', require('./plop/generators/package').default)
  plop.setGenerator('Env', require('./plop/generators/env').default)
  plop.setGenerator('Nice2 Env', require('./plop/generators/nice2Env').default)
}
