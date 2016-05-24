var defaults = require('defaults')
var Loop = require('main-loop')
var vdom = require('virtual-dom')
var each = require('foreach')

module.exports = virtualDirective

function virtualDirective (component, options) {
  var state = component()
  var loop

  return function () {
    return defaults(options, {
      restrict: 'E',
      link: function (scope, element, attrs) {
        loop = Loop(state(), component.render, vdom)

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
        $scope.$on('destroy', function () {
          loop.target = null
        })
      }]
    })
  }
}
