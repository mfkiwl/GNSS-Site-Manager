const config = {
  baseUrl: 'http://localhost:5555/',

  specs: [
    './dist/e2e/**/*.e2e-spec.js'
  ],

  exclude: [],

  // 'jasmine' by default will use the latest jasmine framework
  framework: 'jasmine',
  chromeDriver: process.env.CHROMEDRIVER_BIN ? process.env.CHROMEDRIVER_BIN : undefined,

  // allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    // showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    // defaultTimeoutInterval: 400000
  },

  directConnect: true,

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
        binary: process.env.CHROME_BIN,
    },
  },

  onPrepare: function() {
    browser.ignoreSynchronization = false;
  },


  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
  useAllAngular2AppRoots: true
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'chrome'
  };
}

exports.config = config;
