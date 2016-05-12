var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')
var each = require('foreach')

module.exports = virtualComponent

function virtualComponent (render, options) {
  return defaults(options, {
    bindings: {},
    controller: function ($element, $scope, $attrs) {
      var state = {}

      each(options.bindings, function (value, key, object) {
        if ($attrs.controllerAs !== undefined) {
          state[key] = $scope.$parent[$attrs.controllerAs][key]
        } else {
          state[key] = $scope.$parent[key]
        }
      })

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
        var updates = Object.keys(change)

        updates.forEach(function (key) {
          state[key] = change[key].currentValue
        })

        loop.update(state)
      }
    }
  })
}
