/* eslint-disable no-template-curly-in-string */

export default function (api) {
  // api.cache(true)
  // api.cache.forever()

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      [
        'transform-imports',
        {
          'tocco-app-extensions': {
            transform: 'tocco-app-extensions/src/${member}',
            preventFullImport: true
          },
          'tocco-util': {
            transform: 'tocco-util/src/${member}',
            preventFullImport: true
          },
          'tocco-test-util': {
            transform: 'tocco-test-util/src/${member}',
            preventFullImport: true
          },
          'tocco-theme': {
            transform: 'tocco-theme/src/${member}',
            preventFullImport: true
          },
          'redux-form': {
            transform: 'redux-form/es/${member}',
            preventFullImport: true
          }
        }
      ],
      [
        'babel-plugin-styled-components',
        {
          displayName: true,
          fileName: false,
          namespace: 'Tocco',
          ssr: false,
          transpileTemplateLiterals: false,
          minify: false
        }
      ],
      'lodash'
    ],
    env: {
      test: {
        plugins: ['dynamic-import-node']
      },
      production: {
        plugins: ['transform-react-remove-prop-types', '@babel/transform-react-constant-elements']
      }
    }
  }
}
