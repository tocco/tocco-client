module.exports = {
  stories: [
    '../packages/core/tocco-ui/src/**/*.stories.@(js|mdx)',
    '../packages/core/app-extensions/src/**/*.stories.@(js|mdx)',
    '../packages/apps/admin/src/*.stories.@(js|mdx)',
    '../packages/widgets/login/src/*.stories.@(js|mdx)',
    '../packages/widgets/entity-browser/src/*.stories.@(js|mdx)',
    '../packages/core/entity-list/src/*.stories.@(js|mdx)',
    '../packages/actions/input-edit/src/*.stories.@(js|mdx)',
    '../packages/actions/resource-scheduler/src/*.stories.@(js|mdx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    'storybook-addon-intl',
    'themeprovider-storybook/register',
    '@storybook/addon-a11y'
  ]
}
