var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')
var each = require('foreach')

module.exports = virtualDirective

function virtualDirective (component, options) {
  var state = component()

  return function () {
    return defaults(options, {
      restrict: 'E',
      link: function (scope, element, attrs) {
        var loop = Loop(state(), render, vdom)

        function render (state) {
          return component.render(state)
        }

        element.append(loop.target)

        state(loop.update)
      },
      controller: ['$scope', '$attrs', function ($scope, $attrs) {
        each($attrs.$attr, function (value, key) {
          $scope.$watch(value, function (nv) {
            state[value].set(nv)
          })
        })
      }]
    })
  }
}
