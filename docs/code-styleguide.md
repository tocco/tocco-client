# Coding Styleguide
## General
**ESlint**
Most code styles are enforced by eslint. The Travis CI build will fail if not every ESlint rule is fulfilled.
Active ESlint rules can be seen here:
https://github.com/tocco/tocco-client/blob/master/.eslintrc

## Folders and structure
### Naming conventions folders 

| What       | Case   | Example        |
|------------|--------|----------------|
| Packages   | Kebab  | entity-browser |
| Components | Pascal | SearchField    |
| Module     | Camel  | searchForm     |
| Any other  | Kebab  | test-data      |

## Actions
 - Wrap arguments in payload attribute
 - Use arrow functions
 - Returning object literals (no return statement used)

```js
    // Good
    export const setPending = (pending = false) => ({
      type: SET_PENDING,
      payload: {
        pending
      }
    })

    // Not so good
    export function setPending(pending = false) {
      return {
        type: SET_PENDING,
        pending: pending
       }
    }
```

## Reducers
- Use arrow functions
- Use destructuring assignment

```js
  // Good
  const updateOldPassword = (state, {payload}) => ({
    ...state,
    oldPassword: payload.oldPassword
  })

  // Not so good
  function updateOldPassword(state, args) {
    return Object.assign({}, state, {
      oldPassword: args.payload.oldPassword
    })
  }
```



## Tests
- Group tests hierarchically according to directory structure starting with the package-name
- *It* description should always start with `should`

```js
  // Good
  describe('package-name', () => {
    describe('components', () => {
      describe('Image', () => {
        it('should render an image', () => {
          //...

  // Bad
  describe('Image component', () => {
     it('renders an image', () => {
        //...
```

- Use Chai to.be.true instead of equal(true)

```js
  // Good
  expect(withTitle.find(LoginFormContainer).prop('showTitle')).to.be.true

  // Not so good
  expect(withTitle.find(LoginFormContainer).prop('showTitle')).to.equal(true)
```

- If enzyme is used to load a component, name the variable wrapper whenever possible

```js
  // Good
  const wrapper = shallow(<Foo onButtonClick={onButtonClick} />)
```
