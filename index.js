var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')

module.exports = virtualComponent

function virtualComponent (render, state, options) {
  return defaults(options, {
    bindings: {},
    controller: function ($element) {
      var loop = Loop(state, render, vdom)

      return {
        $onInit: $onInit,
        $onDestroy: $onDestroy,
        $onChanges: $onChanges
      }

      function $onInit () {
        $element.append(loop.target)
      }

      function $onDestroy () {
        loop.target = null
      }

      function $onChanges (change) {
        if (!change) return
        Object.keys(options.bindings)
          .forEach(function (binding) {
            if (change[binding].currentValue) {
              loop.update(change[binding].currentValue)
            }
          })
      }
    }
  })
}
