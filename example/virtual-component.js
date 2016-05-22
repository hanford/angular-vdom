var h = require('virtual-dom/h')
var State = require('dover')
var Observ = require('observ')

module.exports = Counter

function Counter () {
  return State({
    count: Observ(0)
  })
}

Counter.render = function render (state) {
  return h('div', {}, 'virtual-dom: ' + state.count)
}
