var expect = require('chai').expect
var virtualComponent = require('../../index.js')

var exampleApp = require('../../example/angular-app')

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
    var element = $compile("<div ng-init='count = 0'><counter count='count'></counter></div>")($rootScope)
    $rootScope.$digest()
    expect(element.html()).to.equal('<counter count="count" class="ng-isolate-scope"><div>virtual-dom: 0</div></counter>')
  })
})
