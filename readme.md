### angular-vdom

angular-vdom allows you to take advantage of ultra high performance rendering virtual-dom components in an angular 1.5 application. Under the hood anguar-vdom takes advantage of angulars new .component() lifecycle hooks

#### How?
angular-vdom uses [virtual-dom](https://github.com/Matt-Esch/virtual-dom) and [main-loop](https://github.com/raynos/main-loop)

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
function render (message) {
  return h('div', message)
}

```  

```html
// index.html

<div ng-app="app">
  <virtual-component message="Hello World!"></virtual-component>
</div>
```

#### api 
angular-vdom exports a function that takes two params:  
`ngVirtualComponent(render, options)`  


<b>Render function</b>  
required: `true`  
function that returns a VTree. I use [hyperscript](https://github.com/dominictarr/hyperscript) but you can use [hyperx](https://github.com/substack/hyperx) and even [jsx](https://github.com/alexmingoia/jsx-transform)

<b>Options</b>  
required: `true`  
type: `object`  
Default values for configuring the angular component. Binded value changes will trigger an .$onChange(), which will then [rAF](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) and render


#### Building
``npm i && npm run build``  
``cd example/``  
``open index.html``

[angular component lifecycle hooks](https://docs.angularjs.org/guide/component)
