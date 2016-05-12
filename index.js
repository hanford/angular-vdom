var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')
var each = require('foreach')

module.exports = virtualComponent

function virtualComponent (render, options) {
  return defaults(options, {
    bindings: {},
    controller: function ($element, $scope) {
      var state = {}

      each(options.bindings, function (value, key, object) {
        state[key] = $scope.$parent[key] !== undefined ? $scope.$parent[key] : findControllerAs($scope.$parent)[key]
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

function findControllerAs (scope) {
  // Probably a pretty gross hack. If the user is using controllerAs, then their values binded to the component
  // are one level deeper then non controllerAs, we simple iterate over the $scope object and find the first
  // item that isn't prefixed with a '$' as that will be the controllerAs variable.
  var controllerAs = Object.keys(scope)
    .filter(function (k) {
      return k.indexOf('$') === -1
    })[0]

  return scope[controllerAs]
}
