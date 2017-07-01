// Karma configuration file

if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
  console.error('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
  process.exit(1)
}

const BROWSERS = {
  chrome: [
    '58',
    // '59'
  ],
  firefox: [
    '53',
    // '54'
  ]
}

const PLATFORMS = {
  Windows: [
    '7',
    // '8',
    // '8.1',
    '10'
  ],
  Mac: [
    '10.9',
    '10.10',
    // '10.11',
    '10.12'
  ],
  Linux: [null]
}

function createCustomLauncher(browser, version, platform) {
  return {
    base: 'SauceLabs',
    browserName: browser,
    version: version,
    platform: platform
  }
}

function combineBrowsersWithPlatforms() {
  const customLaunchers = {}

  for (const browser in BROWSERS) {
    const browserVersions = BROWSERS[browser]
    for (const browserVersion of browserVersions) {
      for (const platform in PLATFORMS) {
        const platformVersions = PLATFORMS[platform]
        for (const platformVersion of platformVersions) {
          const launcher = `sl_${browser}_${browserVersion || 'latest'}_${platform}_${platformVersion || 'latest'}`
          const platformVersionString = platformVersion ? ` ${platformVersion}` : ''
          customLaunchers[launcher] = createCustomLauncher(browser, browserVersion, `${platform}${platformVersionString}`)
        }
      }
    }
  }

  return customLaunchers
}

module.exports = function(config) {
  // Combine all cross-platform browsers and platforms above
  const customLaunchers = combineBrowsersWithPlatforms()

  // Safari
  // customLaunchers.sl_safari_8_Mac_10 = createCustomLauncher('safari', '8', 'Mac 10.10')
  customLaunchers.sl_safari_9_Mac_11 = createCustomLauncher('safari', '9', 'Mac 10.11')
  // customLaunchers.sl_safari_10_Mac_11 = createCustomLauncher('safari', '10', 'Mac 10.11')
  customLaunchers.sl_safari_10_Mac_12 = createCustomLauncher('safari', '10', 'Mac 10.12')

  // IE
  // customLaunchers.sl_ie_9 = createCustomLauncher('internet explorer', '9', 'Windows 7')
  customLaunchers.sl_ie_10_Windows_7 = createCustomLauncher('internet explorer', '10', 'Windows 7')
  // customLaunchers.sl_ie_10_Windows_8 = createCustomLauncher('internet explorer', '10', 'Windows 8')
  // customLaunchers.sl_ie_11_Windows_81 = createCustomLauncher('internet explorer', '11', 'Windows 8.1')
  customLaunchers.sl_ie_11_Windows_10 = createCustomLauncher('internet explorer', '11', 'Windows 10')

  // Edge
  customLaunchers.sl_edge_13 = createCustomLauncher('microsoftedge', '13')
  customLaunchers.sl_edge_14 = createCustomLauncher('microsoftedge', '14')
  customLaunchers.sl_edge_15 = createCustomLauncher('microsoftedge', '15')

  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-sauce-launcher'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['dots', 'saucelabs'],
    autoWatch: false,
    sauceLabs: {
      testName: 'tour-of-heroes',
      public: 'public'
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true // only need to run 1 time on SauceLabs
  })
}
