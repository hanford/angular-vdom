### angular-vdom

[![NPM][angular-vdom-icon]][angular-vdom-url]

angular-vdom allows you to have ultra high performance rendering with virtual-dom components angular 1.5. Under the hood, anguar-vdom takes uses the new .component() lifecycle hooks and works perfectly with stateless components

#### How?
angular-vdom uses [virtual-dom](https://github.com/Matt-Esch/virtual-dom) and [main-loop](https://github.com/raynos/main-loop), take a look at the source.. it's super straight forward

#### Usage
```js
// app.js
var h = require('virtual-dom/h')
var ngVirtualComponent = require('angular-vdom')
var virtualComponent = ngVirtualComponent(render, {bindings: {message: '<'}})

module.exports = require('angular')
  .module('app', [])
  .component('virtualComponent', virtualComponent)
  .name

// Doesn't need to be hyperscript as long as we return a VTree
function render (state) {
  return h('div', state.message)
}

```  

```html
// index.html
<div ng-app="app">
  <virtual-component message="Hello World!"></virtual-component>
</div>
```  

Usage with [ui-router](https://github.com/angular-ui/ui-router) too!
```js
var virtualComponent = ngVirtualComponent(render, {bindings: {message: '<'}})

angular
  .module('app', [])
  .component('virtualComponent', virtualComponent)
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('virtual', {
      url: '/virtual',
      template: '<virtual-component message="vd.message"></virtual-component>',
      controllerAs: 'vd',
      controller: function () {
        this.message = 'Hello World'
      }
    })
  }])
```  

#### API  
angular-vdom exports a function that takes two params:  
`ngVirtualComponent(render, options)`  


##### Render -> fn  
function that returns a VTree. I use [hyperscript](https://github.com/dominictarr/hyperscript) but you can use [hyperx](https://github.com/substack/hyperx) and even [jsx](https://github.com/alexmingoia/jsx-transform)

##### Options -> {object}  
Default values for configuring the angular component. When a binded value changes it will trigger an $onChange() event, which will then [rAF](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) and render

##### Using controllerAs?  
Just use the attribute  
`<virtual-component controller-as="vd" message="vd.message"></virtual-component>`

#### TODO
- Emit events for angular controller consumption


#### Building
``npm i && npm run build``  
``cd example/``  
``open index.html``

[angular component lifecycle hooks](https://docs.angularjs.org/guide/component)


[angular-vdom-icon]: https://nodei.co/npm/angular-vdom.png?downloads=true
[angular-vdom-url]: https://npmjs.org/package/angular-vdom
