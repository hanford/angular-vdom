var h = require('virtual-dom/h')

module.exports = Counter

function Counter () {}

Counter.render = function render (count) {
  return h('div', {}, 'virtual-dom: ' + count)
}
