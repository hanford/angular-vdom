var expect = require('chai').expect
var virtualComponent = require('../index.js')

var exampleApp = require('../example/angular-app')

var angular = require('angular')

describe('angular-vdom', function () {
  var $compile
  var $rootScope

  beforeEach(angular.mock.module(exampleApp))

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_
    $rootScope = _$rootScope_
  }))

  it('Replaces the element with the appropriate content', function () {
    var element = $compile("<counter count='count'></counter>")($rootScope)
    $rootScope.$digest()
    console.log(element.html())
    expect(element.html()).to.equal("<div>virtual-dom: 0</div>")
  })
})
