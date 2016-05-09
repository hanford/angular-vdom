var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')

module.exports = virtualComponent

function virtualComponent (selector, render, state, componentConfig) {
  return defaults(componentConfig, {
    bindings: {},
    controller: function () {
      var loop = Loop(state, render, vdom)

      return {
        $onInit: $onInit,
        $onDestroy: $onDestroy,
        $onChanges: $onChanges
      }

      function $onInit () {
        document.querySelector(selector).appendChild(loop.target)
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
