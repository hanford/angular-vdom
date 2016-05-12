var h = require('virtual-dom/h')

module.exports = render

function render (state) {
  return h('div', {}, 'virtual-dom: ' + state.count)
}
