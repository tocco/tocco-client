module.exports = {
  stories: [
    '../packages/tocco-ui/src/**/*.stories.@(js|mdx)',
    '../packages/app-extensions/src/**/*.stories.@(js|mdx)',
    '../packages/admin/src/*.stories.@(js|mdx)',
    '../packages/login/src/*.stories.@(js|mdx)',
    '../packages/entity-browser/src/*.stories.@(js|mdx)',
    '../packages/input-edit/src/*.stories.@(js|mdx)',
    '../packages/resource-scheduler/src/*.stories.@(js|mdx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    'storybook-addon-intl',
    'themeprovider-storybook/register',
    '@storybook/addon-a11y'
  ]
}
