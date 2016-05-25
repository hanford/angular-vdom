var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')
var each = require('foreach')

module.exports = virtualDirective

function virtualDirective (component, options) {
  var state
  var loop

  return function () {
    return defaults(options, {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {
        state = component()
        loop = Loop(state(), render, vdom)

        function render (state) {
          return component.render(state, scope)
        }

        element.append(loop.target)

        state(loop.update)
      },
      controller: ['$scope', '$attrs', function ($scope, $attrs) {
        each($attrs.$attr, function (value, key) {
          if (!value) return
          $scope.$watch(value, function (nv) {
            if (!nv) return
            state[value].set(nv)
          })
        })

        function $onDestroy () {
          // destroy the loop and struct when the scope is destroyed
          // to prevent memory leaks eventually crashing chrome
          loop.target = null
          state = function () {}
        }

        return {
          $onDestroy: $onDestroy
        }
      }]
    })
  }
}
