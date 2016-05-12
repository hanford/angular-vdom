var expect = require('chai').expect
var virtualComponent = require('../../index.js')

var exampleApp = require('./controllerAs')

var angular = require('angular')

describe('angular-vdom', function () {
  var $compile
  var scope
  var element
  var $rootScope

  beforeEach(angular.mock.module(exampleApp))

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    element = angular.element("<div ng-controller='ctrl as app'><counter controller-as='app' count='app.count'></counter></div>")
    $compile = _$compile_
    $rootScope = _$rootScope_
    scope = $rootScope.$new()

    $compile(element)(scope)

    scope.$digest()
  }))

  it('Replaces the element with the appropriate content, with controllerAs', function () {
    expect(element.html()).to.equal('<counter controller-as="app" count="app.count" class="ng-isolate-scope"><div>virtual-dom: 0</div></counter>')
  })
})
