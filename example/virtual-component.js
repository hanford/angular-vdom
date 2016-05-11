var h = require('virtual-dom/h')

module.exports = Counter

function Counter () {}

Counter.render = function render (state) {
  return h('div', {}, 'virtual-dom: ' + state.count)
}
