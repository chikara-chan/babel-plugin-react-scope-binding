# babel-plugin-react-scope-binding

Babel plugin for React component to make event handler auto binding to context.

[![Travis branch](https://img.shields.io/travis/chikara-chan/babel-plugin-react-scope-binding/master.svg)](https://travis-ci.org/chikara-chan/babel-plugin-react-scope-binding)
[![npm](https://img.shields.io/npm/v/babel-plugin-react-scope-binding.svg)](https://www.npmjs.com/package/babel-plugin-react-scope-binding)
[![npm](https://img.shields.io/npm/l/babel-plugin-react-scope-binding.svg)](https://github.com/chikara-chan/babel-plugin-react-scope-binding/blob/master/LICENSE)

## Install

```bash
$ npm install babel-plugin-react-scope-binding --save-dev
# Or
$ yarn add babel-plugin-react-scope-binding --dev
```

## Why?

When you are building a React component, you have to be careful about event handler. In component, class methods are not bound by default. If you forget to bind `this.handleClick` and pass it to onClick, this will be undefined when the function is actually called.

Therefore, you have to bind the event handler in constructor method, like this,

``` jsx
class Header extends React.Component{
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this) // binding method
  }
  handleClick(e) {
    this.setSate({})
  }
  render() {
    return (
      <div onClick={this.handleClick}></div>
    )
  }
}

```

Oh shit! It's so troublesome.
So, this plugin is born to resolve these thorny problems.
With this plugin, you can easily code without caring about content.

Instead,

``` jsx
class Header extends React.Component{
  constructor() {
    super()
    // needn't binding method
  }
  handleClick(e) {
    this.setSate({})
  }
  render() {
    return (
      <div onClick={this.handleClick}></div>
    )
  }
}
```

## Usage

Write via [babelrc](https://babeljs.io/docs/usage/babelrc/).

``` json
// .babelrc
{
  "plugins": [
    ["react-scope-binding", {
      "propPrefix": "on",
      "advanced": true
    }]
  ]
}

```

#### Options

Name | Type | Default | Description
--- | --- | --- | ---
propPrefix | String \| Array | 'on' | Tell plugin what the JSX attributes need binding, default with 'on' prefix, e.g. onClick, onChange. You can also pass an Array to this option, such as ['on', '...']
advanced | Boolean | false | Enable advanced usage. In some situation, you want to pass value to event handler. With this option enabled, you can easily write a code such as `<div onClick={this.handleClick(item)}></div>`. Plugin will auto transpile it to `<div onClick={(e) => {this.handleClick(e, item)}></div>`

## Author

Chikara Chan

## License

Released under the [MIT](https://github.com/chikara-chan/babel-plugin-react-scope-binding/blob/master/LICENSE) license.
