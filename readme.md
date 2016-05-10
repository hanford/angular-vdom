### angular-vdom

Use virtual-dom components in an angular application by taking advantage of angulars new [component lifecycle hooks](https://docs.angularjs.org/guide/component).

#### Usage
```
// app.js
var h = require('virtual-dom/h')
var ngVirtualComponent = require('angular-vdom')
var virtualComponent = ngVirtualComponent(render, state, {bindings: {message: '<'}})

module.exports = require('angular')
  .module('app', [])
  .component('virtualComponent', virtualComponent)
  .name

function render (message) {
  return h('div', message)
}

```  

```
// index.html

<div ng-app="app">
  <virtual-component message="Hello World!"></virtual-component>
</div>
```

#### API 
angular-vdom exports a function that takes in few params:  
`ngVirtualComponent(render, state, options)`  

  
<b>Render function</b>  
required: `true`  
function that returns virtual nodes
  
<b>State</b>  
required: `true`  
type: `object`, `array`, `string` or `value`
Default values for bindings 

<b>Options</b>  
required: `true`  
type: `object`  
Default values for configuring the angular component. Binded value changes will trigger an .$onChange(), which will then [rAF](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) and render


#### Building
``npm i && npm run build``  
``cd example/``  
``open index.html``
