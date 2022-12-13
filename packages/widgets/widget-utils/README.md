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
- `data-id` (optional): An id to be able to reference events and methods through `window` obj

#### Example

```html
<div data-tocco-widget-key="12"></div>
<script src="https://${customer.tocco.ch}/js/tocco-widget-utils/dist/bootstrap.js"></script>
```

### Events
A widget can provide events which will be invoked. When a widget gets rendered the event handlers which are defined on the `window.toccoEventHandlers` will be attached to the widget events.

Use an flat object of functions which will be used for each widget on that page. Preferably only used if only one widget is emebedded.
```js
window.toccoEventHandlers = {
  loginSuccess: () => {}
}
```

Use the `data-id` attribute to define the property name on the `toccoEventHandlers` obj to defined event handlers for each widget. Preferable used if multiple widgets are embedded.
```html
<div data-id="login" data-tocco-widget-key="12"></div>
```

```js
window.toccoEventHandlers = {
  login: {
    loginSuccess: () => {}
  }
}
```

### Methods
A widget can provide methods which can be invoked to communicate with the widget itself.
When a widget gets rendered these methods will be attached to `window.toccoMethods` to provide them to outer scripts.

The `data-id` attribute is used as a property name on the `window.toccoMethods` object. If the `data-id` attribute is not set the methods will not be attached to the `toccoMethods` object.

#### Example
```html
<div data-id="login" data-tocco-widget-key="12"></div>
```
```js
// use methods via `window.toccoMethods` object
window.toccoMethods.login.setLocale('fr-CH');
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

### Widget States
A widget can be in different states. Dependend on the state other html elements can be shown.

In order to show an element dependend on a widget state it has to have two attributes:
- `data-tocco-widget-ref` to define which widget it should listen to 
- `data-tocco-widget-states` to define the states of the widget to show the element as whitespace-separated list

```html
<div data-tocco-widget-key="12"></div>

<div data-tocco-widget-ref="12" data-tocco-widget-states="success">Erfolgreich.</div>

<div data-tocco-widget-ref="12" data-tocco-widget-states="list detail">...</div>
```
