import path from 'path'
import webpack from 'webpack'

import runConfig from '../config/index.js'

const replaceFileExtension = (filePath, newExtension) => {
  const {name, root, dir} = path.parse(filePath)
  return path.format({
    name,
    root,
    dir,
    ext: newExtension
  })
}

export default config => {
  const globals = {
    ...runConfig.globals,
    __PACKAGE__: "''",
    __PACKAGE_NAME__: "''"
  }

  config.plugins.push(new webpack.DefinePlugin(globals))

  config.module.rules = config.module.rules.map(data => {
    if (/svg\|/.test(String(data.test))) {
      data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
    }
    return data
  })

  config.plugins = config.plugins.filter(p => String(p.resourceRegExp) !== '/core-js/')

  config.module.rules = config.module.rules.map(data => {
    if (/jsx?/.test(String(data.test))) {
      data.resolve = {
        ...data.resolve,
        fullySpecified: false
      }
    }
    return data
  })

  /** fix webpack5 with esm https://github.com/storybookjs/storybook/issues/14877 */
  // Find the plugin instance that needs to be mutated
  const virtualModulesPlugin = config.plugins.find(plugin => plugin.constructor.name === 'VirtualModulesPlugin')

  // Change the file extension to .cjs for all files that end with "generated-stories-entry.js"
  virtualModulesPlugin._staticModules = Object.fromEntries(
    Object.entries(virtualModulesPlugin._staticModules).map(([key, value]) => {
      if (key.endsWith('generated-stories-entry.js')) {
        return [replaceFileExtension(key, '.cjs'), value]
      }
      return [key, value]
    })
  )

  // Change the entry points to point to the appropriate .cjs files
  config.entry = config.entry.map(entry => {
    if (entry.endsWith('generated-stories-entry.js')) {
      return replaceFileExtension(entry, '.cjs')
    }
    return entry
  })
  /** **** */

  config.module.rules.push(
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
      use: 'file-loader?name=imgs/[name].[contenthash].[ext]&mimetype=image/svg+xml'
    },
    {
      test: /\.(png|jpg|ico)$/,
      use: 'file-loader?name=imgs/[name].[contenthash].[ext]&limit=8192'
    }
  )

  return config
}
