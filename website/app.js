var angular = require('angular')
var ngVirtualComponent = require('../index')
var h = require('virtual-dom/h')
var counter = ngVirtualComponent(renderCounter, {bindings: {total: '<'}})

angular
  .module('app', [])
  .component('counter', counter)
  .controller('ctrl', ['$scope', function ($scope) {
    $scope.jack = 'Hello'
    $scope.total = 0

    $scope.add = function () {
      $scope.total = $scope.total + 1
    }
  }])

function renderCounter (state) {
  return h('div', 'virtual-dom: ' + state.total)
}
