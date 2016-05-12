var virtualComponent = require('../../index.js')
var render = require('./virtual-dom.component')

var countComponent = virtualComponent(render, {bindings: {count: '<', controllerAs: '@'}})

module.exports = require('angular')
  .module('example1', [])
  .component('counter', countComponent)
  .controller('ctrl', function () {
    this.count = 0
  })
  .name
