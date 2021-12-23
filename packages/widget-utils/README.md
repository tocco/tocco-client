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

- `data-tocco-widget-key` (required): The key of the widget config

### Example

```html
<div data-tocco-widget-key="12"></div>
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
