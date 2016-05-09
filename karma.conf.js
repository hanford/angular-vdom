module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'browserify'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'example/angular-app.js',
      'tests/**/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'tests/**/*.js': ['browserify'],
      'example/angular-app.js': ['browserify']
    },
    browserify: {
      debug: true
    },
    browsers: [
      'Chrome'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: 'INFO',
    autoWatch: true,
    singleRun: true
  })
}
