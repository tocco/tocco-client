# React Flows

## Development

### Prerequisites

Run a REST server on http://localhost:8080

### Getting started

```
npm install --global lerna@^2.0.0-beta
npm install
lerna bootstrap
npm start --package={PACKAGE_NAME}
```
Open http://localhost:3000 and start coding!

#### Tests
All packages:
```
npm test
```

Single Package:
```
npm test --package={PACKAGE_NAME}
```

During development with watch:
```
npm run test:dev --package={PACKAGE_NAME}
```


## Publish bundle

Once the package is ready to publish run following npm scripts. This registers the bundle
in the npm registry.

```
lerna publish
```

Only build:
```
npm run deploy:dev --package={PACKAGE_NAME}
npm run deploy:prod --package={PACKAGE_NAME}
```

### Setup Linting with IntelliJ
- Install ESLint Plugin
- Settings (Preferences on Mac) | Languages & Frameworks | JavaScript |  Code Quality Tools --enable
- Settings (Preferences on Mac) | Editor | Inspections | Code style issues | Unterminated statement -- disable
