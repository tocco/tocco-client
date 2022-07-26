import {styles} from '@ckeditor/ckeditor5-dev-utils'
import webpack from '@storybook/builder-webpack5/node_modules/webpack'

import runConfig from '../config'
function isCssRule(rule) {
  return rule.test.toString().indexOf('css') > -1
}

function isSvgRule(rule) {
  return rule.test.toString().indexOf('svg') > -1
}

module.exports = ({config, configType}) => {
  const globals = {
    ...runConfig.globals,
    __PACKAGE__: "''",
    __PACKAGE_NAME__: "''"
  }

  config.plugins.push(new webpack.DefinePlugin(globals))

  config.module.rules.forEach(rule => {
    if (isCssRule(rule)) {
      rule.exclude = /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/
    }
  })

  config.module.rules.forEach(rule => {
    if (isSvgRule(rule)) {
      rule.exclude = /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/
    }
  })

  config.module.rules = config.module.rules.map(data => {
    if (/svg\|/.test(String(data.test))) {
      data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
    }
    return data
  })

  config.plugins = config.plugins.filter(p => String(p.resourceRegExp) !== '/core-js/')

  config.module.rules.push(
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
      use: ['raw-loader']
    },
    {
      test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
            attributes: {
              'data-cke': true
            }
          }
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        `sass-loader?data=$node-env:${runConfig.env};&includePaths[]=./packages/core/tocco-theme/node_modules/`
      ] // eslint-disable-line
    },
    {
      test: /\.woff(\?.*)?$/,
      use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=application/font-woff'
    },
    {
      test: /\.woff2(\?.*)?$/,
      use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=application/font-woff2'
    },
    {
      test: /\.otf(\?.*)?$/,
      use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=font/opentype'
    },
    {
      test: /\.ttf(\?.*)?$/,
      use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?.*)?$/,
      use: 'file-loader?name=fonts/[name].[contenthash].[ext]'
    },
    {
      test: /\.svg(\?.*)?$/,
      exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/],
      use: 'file-loader?name=imgs/[name].[contenthash].[ext]&mimetype=image/svg+xml'
    },
    {
      test: /\.(png|jpg|ico)$/,
      use: 'file-loader?name=imgs/[name].[contenthash].[ext]&limit=8192'
    }
  )

  return config
}
