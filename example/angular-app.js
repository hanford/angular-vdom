var virtualComponent = require('../index.js')
var angular = require('angular')
var Counter = require('./virtual-component')

var countComponent = virtualComponent('counter', Counter.render, 0, {bindings: {count: '<'}})

angular
  .module('example1', [])
  .component('counter', countComponent)
  .controller('example1Ctrl', function () {})
