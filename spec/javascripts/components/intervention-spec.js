/* eslint-env jasmine, jquery */
/* global GOVUK */

describe('Intervention banner component', function () {
  'use strict'

  var container

  beforeEach(function () {
    container = document.createElement('div')
    container.innerHTML =
      '<section class="gem-c-intervention" data-module="intervention" data-intervention-name="test-intervention-name"><a class="govuk-link gem-c-intervention__dismiss-link">Dismiss</a></section>'

    document.body.appendChild(container)
    var element = document.querySelector('[data-module="intervention"]')
    new GOVUK.Modules.Intervention(element).init()

    window.GOVUK.setCookie('cookies_policy', '{"essential":true,"settings":true,"usage":true,"campaigns":true}')
  })

  afterEach(function () {
    GOVUK.deleteCookie('test_intervention_name')
    document.body.removeChild(container)
  })

  describe('close banner', function () {
    it('should hide intervention banner', function () {
      var banner = document.querySelector('.gem-c-intervention')
      var close = document.querySelector('.gem-c-intervention__dismiss-link')
      expect(banner).toBeVisible

      close.click()

      expect(banner).toBeHidden()
    })

    it('sets a cookie value', function () {
      spyOn(GOVUK, 'cookie').and.callThrough()
      var close = document.querySelector('.gem-c-intervention__dismiss-link')
      close.click()

      expect(GOVUK.cookie).toHaveBeenCalled()
      var bannerCookie = GOVUK.cookie('test_intervention_name')
      expect(bannerCookie).toEqual('true')
    })
  })

  describe('cookies are already set', function () {
    it('does not display the banner' , function () {
      var bannerCookie = GOVUK.cookie('test_intervention_name')
      if (bannerCookie == null) {
        GOVUK.setCookie('test_intervention_name', 'true', { days: 1 })
      }
      var banner = document.querySelector('.gem-c-intervention')

      expect(banner).toBeHidden()
    })
  })
})
