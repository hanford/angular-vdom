var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')

module.exports = virtualComponent

function virtualComponent (render, state, componentConfig) {
  // when template or templateUrl is a function, $element and $attrs are
  // always injected, giving us access to the element immdiately
  // https://docs.angularjs.org/api/ng/provider/$compileProvider#component
  var element

  return defaults(componentConfig, {
    bindings: {},
    template: function ($element) {
      element = $element[0]
    },
    controller: function () {
      var loop = Loop(state, render, vdom)

      return {
        $onInit: $onInit,
        $onDestroy: $onDestroy,
        $onChanges: $onChanges
      }

      function $onInit () {
        element.appendChild(loop.target)
      }

      function $onDestroy () {
        loop.target = null
      }

      function $onChanges (change) {
        Object.keys(componentConfig.bindings)
          .forEach(function (binding) {
            if (change[binding].currentValue) {
              loop.update(change[binding].currentValue)
            }
          })
      }
    }
  })
}
