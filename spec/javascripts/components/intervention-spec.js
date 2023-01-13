/* eslint-env jasmine, jquery */
/* global GOVUK */

describe('Intervention banner component', function () {
  'use strict'

  var container

  beforeEach(function () {
    container = document.createElement('div')
    container.innerHTML =
      '<section class="gem-c-intervention" data-module="intervention"><a class="govuk-link gem-c-intervention__dismiss-link">Dismiss</a></section>'

    document.body.appendChild(container)
    var element = document.querySelector('[data-module="intervention"]')
    new GOVUK.Modules.Intervention(element).init()

    window.GOVUK.setCookie('cookies_policy', '{"essential":true,"settings":true,"usage":true,"campaigns":true}')
  })

  afterEach(function () {
    GOVUK.deleteCookie('test-hide-intervention')
    document.body.removeChild(container)
  })

  describe('close banner', function () {
    it('should hide intervention banner', function () {
      var banner = document.querySelector('.gem-c-intervention')
      var close = document.querySelector('.gem-c-intervention__dismiss-link')
      close.click()

      expect(banner).toBeHidden()
    })

    it('sets a cookie value', function () {
      spyOn(GOVUK, 'cookie').and.callThrough()
      var close = document.querySelector('.gem-c-intervention__dismiss-link')
      close.click()

      expect(GOVUK.cookie).toHaveBeenCalled()
    })
  })

  describe('cookies are already set', function () {
    xit('', function () {

    })
  })
})
