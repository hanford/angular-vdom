var virtualComponent = require('../index.js')
var Counter = require('./virtual-component')
var countComponent = virtualComponent('counter', Counter.render, 0, {bindings: {count: '<'}})

module.exports = require('angular')
  .module('example1', [])
  .component('counter', countComponent)
  .controller('example1Ctrl', function () {})
  .name
