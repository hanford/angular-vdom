var virtualComponent = require('../index.js')
var Counter = require('./virtual-component')
var countComponent = virtualComponent(Counter, {scope: {count: '<'}})

module.exports = require('angular')
  .module('example1', [])
  .directive('counter', countComponent)
  .controller('example1Ctrl', function () {})
  .name
