# Widget Utils

Contains tools that are needed to let our apps run in external websites.

## bootstrap

The `bootstrap` script finds all the widget containers in the website and renders the corresponding application.

### Import

```html
<script src="https://${customer}.tocco.ch/js/tocco-widget-utils/dist/bootstrap.js"/>
```

### Embed widgets

To embed a widget in the website, just add a `<div>` container and decorate it with the necessary attributes.

#### Attributes

- `data-tocco-widget` (required): The name of the widget (e.g. 'entity-explorer')
- `data-tocco-package` (optional): By default, the JS sources are loaded according to the given widget name. If the widget and package name are not the same, the package name can be decared explicitly.
- `data-XXX`: Any additional attributes that are passed to the app as
input params. Declare them in `snake-case`, they are transformed to `camelCase` (`data-` prefix is stripped).

### Example

```html
<div
    data-tocco-widget="entity-explorer"
    data-entity-name="User"
    data-form-base="User"
    data-memory-history="true"
></div>
<script src="https://${customer.tocco.ch}/js/tocco-widget-utils/dist/bootstrap.js"></script>
```

### Theme

A theme can be configured by defining a global theme object on `window.toccoTheme`.
```js
window.toccoTheme = {
  colors: {
    primary: '#BB8800'
  },
  fontSize: {
    base: 1.3
  }
}
```
