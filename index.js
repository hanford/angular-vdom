var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')

module.exports = virtualComponent

function virtualComponent (selector, render, state, componentConfig) {
  return defaults(componentConfig, {
    bindings: {},
    controller: function () {
      var loop = Loop(state, render, vdom)

      this.$onInit = function () {
        document.querySelector(selector).appendChild(loop.target)
      }

      this.$onDestroy = function () {
        loop.target = null
      }

      this.$onChanges = function (change) {
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
