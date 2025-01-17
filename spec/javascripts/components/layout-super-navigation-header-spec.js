/* eslint-env jasmine, jquery */
/* global GOVUK */

describe('The super header navigation', function () {
  'use strict'

  var container
  var thisModule

  beforeEach(function () {
    container = document.createElement('div')
    container.className = 'js-enabled'
    container.innerHTML =
      '<nav aria-labelledby="super-navigation-menu-heading" class="gem-c-layout-super-navigation-header__content js-module-initialised" data-module="super-navigation-mega-menu" data-super-navigation-mega-menu-module-started="true" style="margin-bottom: 0px;">' +
          '<h2 id="super-navigation-menu-heading" class="govuk-visually-hidden">' +
              'Navigation menu' +
          '</h2>' +
          '<a class="gem-c-layout-super-navigation-header__navigation-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse" data-track-dimension="Menu" data-track-dimension-index="29" href="/browse" hidden="hidden">' +
              '<span class="gem-c-layout-super-navigation-header__navigation-item-link-inner">' +
                  'Menu' +
              '</span>' +
          '</a>' +
          '<button aria-controls="super-navigation-menu" aria-expanded="false" aria-label="Show navigation menu" class="gem-c-layout-super-navigation-header__navigation-top-toggle-button" data-text-for-hide="Hide navigation menu" data-text-for-show="Show navigation menu" data-toggle-desktop-group="top" data-toggle-mobile-group="top" data-tracking-key="testing" data-ga4="{&quot;event_name&quot;:&quot;select_content&quot;,&quot;type&quot;:&quot;header menu bar&quot;,&quot;text&quot;:&quot;Menu&quot;,&quot;section&quot;:&quot;Menu&quot;}" id="super-navigation-menu-toggle" type="button">' +
              '<span class="gem-c-layout-super-navigation-header__navigation-top-toggle-button-inner">Menu</span>' +
          '</button>' +
          '<div class="gem-c-layout-super-navigation-header__navigation-item gem-c-layout-super-navigation-header__navigation-items">' +
              '<div id="super-navigation-menu" class="gem-c-layout-super-navigation-header__navigation-dropdown-menu" hidden="hidden">' +
                  '<div class="govuk-width-container gem-c-layout-super-navigation-header__width-container">' +
                      '<div class="govuk-grid-row">' +
                          '<div class="govuk-grid-column-two-thirds-from-desktop gem-c-layout-super-navigation-header__column--topics">' +
                              '<div class="govuk-width-container">' +
                                  '<h3 class="govuk-heading-m gem-c-layout-super-navigation-header__column-header">' +
                                      'Topics' +
                                  '</h3>' +
                              '</div>' +
                              '<div class="govuk-width-container">' +
                                  '<ul class="gem-c-layout-super-navigation-header__navigation-second-items gem-c-layout-super-navigation-header__navigation-second-items--topics">' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/benefits" data-track-dimension="Benefits" data-track-dimension-index="29" href="/browse/benefits">Benefits</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/births-deaths-marriages" data-track-dimension="Births, death, marriages and care" data-track-dimension-index="29" href="/browse/births-deaths-marriages">Births, death, marriages and care</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/business" data-track-dimension="Business and self-employed" data-track-dimension-index="29" href="/browse/business">Business and self-employed</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/childcare-parenting" data-track-dimension="Childcare and parenting" data-track-dimension-index="29" href="/browse/childcare-parenting">Childcare and parenting</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/citizenship" data-track-dimension="Citizenship and living in the UK" data-track-dimension-index="29" href="/browse/citizenship">Citizenship and living in the UK</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/cost-of-living" data-track-dimension="Cost of Living support" data-track-dimension-index="29" href="/cost-of-living">Cost of Living support</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/justice" data-track-dimension="Crime, justice and the law" data-track-dimension-index="29" href="/browse/justice">Crime, justice and the law</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/disabilities" data-track-dimension="Disabled people" data-track-dimension-index="29" href="/browse/disabilities">Disabled people</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/driving" data-track-dimension="Driving and transport" data-track-dimension-index="29" href="/browse/driving">Driving and transport</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/education" data-track-dimension="Education and learning" data-track-dimension-index="29" href="/browse/education">Education and learning</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/employing-people" data-track-dimension="Employing people" data-track-dimension-index="29" href="/browse/employing-people">Employing people</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/environment-countryside" data-track-dimension="Environment and countryside" data-track-dimension-index="29" href="/browse/environment-countryside">Environment and countryside</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/housing-local-services" data-track-dimension="Housing and local services" data-track-dimension-index="29" href="/browse/housing-local-services">Housing and local services</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/tax" data-track-dimension="Money and tax" data-track-dimension-index="29" href="/browse/tax">Money and tax</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/abroad" data-track-dimension="Passports, travel and living abroad" data-track-dimension-index="29" href="/browse/abroad">Passports, travel and living abroad</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/visas-immigration" data-track-dimension="Visas and immigration" data-track-dimension-index="29" href="/browse/visas-immigration">Visas and immigration</a>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/browse/working" data-track-dimension="Working, jobs and pensions" data-track-dimension-index="29" href="/browse/working">Working, jobs and pensions</a>' +
                                      '</li>' +
                                  '</ul>' +
                              '</div>' +
                          '</div>' +
                          '<div class="govuk-grid-column-one-third-from-desktop gem-c-layout-super-navigation-header__column--government-activity">' +
                              '<div class="govuk-width-container">' +
                                  '<h3 class="govuk-heading-m gem-c-layout-super-navigation-header__column-header">' +
                                      'Government activity' +
                                  '</h3>' +
                              '</div>' +
                              '<div class="govuk-width-container">' +
                                  '<ul class="gem-c-layout-super-navigation-header__navigation-second-items gem-c-layout-super-navigation-header__navigation-second-items--government-activity">' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/government/organisations" data-track-dimension="Departments" data-track-dimension-index="29" href="/government/organisations">Departments</a>' +
                                          '<p class="gem-c-layout-super-navigation-header__navigation-second-item-description">Departments, agencies and public bodies</p>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/search/news-and-communications" data-track-dimension="News" data-track-dimension-index="29" href="/search/news-and-communications">News</a>' +
                                          '<p class="gem-c-layout-super-navigation-header__navigation-second-item-description">News stories, speeches, letters and notices</p>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/search/guidance-and-regulation" data-track-dimension="Guidance and regulation" data-track-dimension-index="29" href="/search/guidance-and-regulation">Guidance and regulation</a>' +
                                          '<p class="gem-c-layout-super-navigation-header__navigation-second-item-description">Detailed guidance, regulations and rules</p>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/search/policy-papers-and-consultations" data-track-dimension="Policy papers and consultations" data-track-dimension-index="29" href="/search/policy-papers-and-consultations">Policy papers and consultations</a>' +
                                          '<p class="gem-c-layout-super-navigation-header__navigation-second-item-description">Consultations and strategy</p>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/search/research-and-statistics" data-track-dimension="Research and statistics" data-track-dimension-index="29" href="/search/research-and-statistics">Research and statistics</a>' +
                                          '<p class="gem-c-layout-super-navigation-header__navigation-second-item-description">Reports, analysis and official statistics</p>' +
                                      '</li>' +
                                      '<li class="gem-c-layout-super-navigation-header__dropdown-list-item">' +
                                          '<a class="govuk-link gem-c-layout-super-navigation-header__navigation-second-item-link gem-c-layout-super-navigation-header__navigation-second-item-link--with-description" data-track-action="menuLink" data-track-category="headerClicked" data-track-label="/search/transparency-and-freedom-of-information-releases" data-track-dimension="Transparency" data-track-dimension-index="29" href="/search/transparency-and-freedom-of-information-releases">Transparency</a>' +
                                          '<p class="gem-c-layout-super-navigation-header__navigation-second-item-description">Data, Freedom of Information releases and corporate reports</p>' +
                                      '</li>' +
                                  '</ul>' +
                              '</div>' +
                          '</div>' +
                      '</div>' +
                  '</div>' +
              '</div>' +
          '</div>' +
          '<button aria-controls="super-search-menu" aria-expanded="false" aria-label="Show search menu" class="gem-c-layout-super-navigation-header__search-toggle-button" data-text-for-hide="Hide search menu" data-text-for-show="Show search menu" data-toggle-mobile-group="top" data-toggle-desktop-group="top" data-tracking-key="search" id="super-search-menu-toggle" type="button" data-ga4="{&quot;event_name&quot;:&quot;select_content&quot;,&quot;type&quot;:&quot;header menu bar&quot;,&quot;text&quot;:&quot;Search&quot;,&quot;section&quot;:&quot;Search&quot;}">' +
              '<span class="govuk-visually-hidden">' +
                  'Search GOV.UK' +
              '</span>' +
              '<svg class="gem-c-layout-super-navigation-header__search-toggle-button-link-icon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
                  '<circle cx="12.0161" cy="11.0161" r="8.51613" stroke="currentColor" stroke-width="3"></circle>' +
                  '<line x1="17.8668" y1="17.3587" x2="26.4475" y2="25.9393" stroke="currentColor" stroke-width="3"></line>' +
              '</svg>' +
              '<span aria-hidden="true" class="gem-c-layout-super-navigation-header__navigation-top-toggle-close-icon" focusable="false">' +
                  '×' +
              '</span>' +
          '</button>' +
          '<div id="super-search-menu" class="gem-c-layout-super-navigation-header__search-items" hidden="hidden">' +
              '<h3 class="govuk-visually-hidden">' +
                  'Search' +
              '</h3>' +
              '<div class="gem-c-layout-super-navigation-header__search-item">' +
                  '<a class="gem-c-layout-super-navigation-header__search-item-link" href="/search" hidden="hidden">' +
                      '<span class="gem-c-layout-super-navigation-header__search-item-link-text">' +
                          'Search GOV.UK' +
                      '</span>' +
                      '<svg class="gem-c-layout-super-navigation-header__search-item-link-icon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
                          '<circle cx="10.0161" cy="10.0161" r="8.51613" stroke="currentColor" stroke-width="3"></circle>' +
                          '<line x1="15.8668" y1="16.3587" x2="25.4475" y2="25.9393" stroke="currentColor" stroke-width="3"></line>' +
                      '</svg>' +
                  '</a>' +
              '</div>' +
              '<div class="govuk-width-container gem-c-layout-super-navigation-header__search-and-popular">' +
                  '<div class="govuk-grid-row">' +
                      '<div class="govuk-grid-column-full">' +
                          '<form class="gem-c-layout-super-navigation-header__search-form" id="search" action="/search" method="get" role="search" aria-label="Site-wide">' +
                              '<div class="gem-c-search govuk-!-display-none-print  gem-c-search--large gem-c-search--on-white gem-c-search--separate-label" data-module="gem-toggle-input-class-on-focus" data-gem-toggle-input-class-on-focus-module-started="true">' +
                                  '<label for="search-main-7cccf557" class="govuk-label govuk-label--m">Search GOV.UK</label>' +
                                  '<div class="gem-c-search__item-wrapper">' +
                                      '<input enterkeyhint="search" class="gem-c-search__item gem-c-search__input js-class-toggle" id="search-main-7cccf557" name="q" title="Search" type="search" value="">' +
                                      '<div class="gem-c-search__item gem-c-search__submit-wrapper">' +
                                          '<button class="gem-c-search__submit" type="submit" data-track-category="headerClicked" data-track-action="searchSubmitted" data-track-label="/search/all" data-track-dimension="Search on GOV.UK" data-track-dimension-index="29" data-module="gem-track-click" enterkeyhint="search">' +
                                              'Search' +
                                              '<svg class="gem-c-search__icon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
                                                  '<circle cx="12.0161" cy="11.0161" r="8.51613" stroke="currentColor" stroke-width="3"></circle>' +
                                                  '<line x1="17.8668" y1="17.3587" x2="26.4475" y2="25.9393" stroke="currentColor" stroke-width="3"></line>' +
                                              '</svg>' +
                                          '</button> </div>' +
                                  '</div>' +
                              '</div>' +
                          '</form>' +
                      '</div>' +
                  '</div>' +
                  '<div class="govuk-grid-row">' +
                      '<div class="govuk-grid-column-full">' +
                          '<h3 class="govuk-heading-m">Popular on GOV.UK</h3>' +
                          '<ul class="govuk-list">' +
                              '<li class="gem-c-layout-super-navigation-header__popular-item">' +
                                  '<a class="govuk-link gem-c-layout-super-navigation-header__popular-link" data-track-action="popularLink" data-track-category="headerClicked" data-track-label="/check-benefits-financial-support" data-track-dimension="Check benefits and financial support you can get" data-track-dimension-index="29" href="/check-benefits-financial-support">Check benefits and financial support you can get</a>' +
                              '</li>' +
                              '<li class="gem-c-layout-super-navigation-header__popular-item">' +
                                  '<a class="govuk-link gem-c-layout-super-navigation-header__popular-link" data-track-action="popularLink" data-track-category="headerClicked" data-track-label="/guidance/getting-the-energy-bills-support-scheme-discount" data-track-dimension="Find out about the Energy Bills Support Scheme" data-track-dimension-index="29" href="/guidance/getting-the-energy-bills-support-scheme-discount">Find out about the Energy Bills Support Scheme</a>' +
                              '</li>' +
                              '<li class="gem-c-layout-super-navigation-header__popular-item">' +
                                  '<a class="govuk-link gem-c-layout-super-navigation-header__popular-link" data-track-action="popularLink" data-track-category="headerClicked" data-track-label="/find-a-job" data-track-dimension="Find a job" data-track-dimension-index="29" href="/find-a-job">Find a job</a>' +
                              '</li>' +
                              '<li class="gem-c-layout-super-navigation-header__popular-item">' +
                                  '<a class="govuk-link gem-c-layout-super-navigation-header__popular-link" data-track-action="popularLink" data-track-category="headerClicked" data-track-label="/coronavirus" data-track-dimension="Coronavirus (COVID-19)" data-track-dimension-index="29" href="/coronavirus">Coronavirus (COVID-19)</a>' +
                              '</li>' +
                              '<li class="gem-c-layout-super-navigation-header__popular-item">' +
                                  '<a class="govuk-link gem-c-layout-super-navigation-header__popular-link" data-track-action="popularLink" data-track-category="headerClicked" data-track-label="/sign-in-universal-credit" data-track-dimension="Universal Credit account: sign in" data-track-dimension-index="29" href="/sign-in-universal-credit">Universal Credit account: sign in</a>' +
                              '</li>' +
                          '</ul>' +
                      '</div>' +
                  '</div>' +
              '</div>' +
          '</div>' +
      '</nav>'

    document.body.appendChild(container)

    var $element = document.querySelector('[data-module="super-navigation-mega-menu"]')
    thisModule = new GOVUK.Modules.SuperNavigationMegaMenu($element)

    spyOn(GOVUK.analytics, 'trackEvent')
  })

  afterEach(function () {
    if (GOVUK.analytics.trackEvent.calls) {
      GOVUK.analytics.trackEvent.calls.reset()
    }

    document.body.removeChild(container)
  })

  describe('on both small and large screens', function () {
    beforeEach(function () {
      thisModule.init()
    })

    it('has the initialised class once the JavaScript has run', function () {
      var $module = document.querySelector('[data-module="super-navigation-mega-menu"]')

      expect($module).toHaveClass('js-module-initialised')
    })
  })

  describe('on small screens', function () {
    beforeEach(function () {
      // `windowSize` returns `'mobile'` or `'desktop'` depending on the screen
      // size. As we can't change the size of the browser window, we need to
      // change the return of this function to force the mobile or desktop
      // behaviour.
      thisModule.windowSize = function () {
        return 'mobile'
      }

      thisModule.init()
    })

    describe('the navigation toggle button', function () {
      var $button

      beforeEach(function () {
        $button = document.querySelector('#super-navigation-menu-toggle')
      })

      it('does not have the `hidden` attribute', function () {
        expect($button).not.toHaveAttr('hidden')
      })

      describe('has the correct ARIA attributes', function () {
        it('has `aria-controls` set to "super-navigation-menu"', function () {
          expect($button).toHaveAttr('aria-controls', 'super-navigation-menu')
        })

        it('has `aria-label` set to "Show navigation menu"', function () {
          expect($button).toHaveAttr('aria-label', 'Show navigation menu')
        })

        it('has `aria-expanded` set to false', function () {
          expect($button).toHaveAttr('aria-expanded', 'false')
        })
      })

      describe('updates correctly when clicked once', function () {
        var $button
        var $menu

        beforeEach(function () {
          $button = document.querySelector('#super-navigation-menu-toggle')
          $menu = document.querySelector('#super-navigation-menu')

          $button.click()
        })

        it('opens the menu', function () {
          expect($menu).not.toHaveAttr('hidden')
        })

        it('updates the button’s `aria-expanded` attribute to true', function () {
          expect($button).toHaveAttr('aria-expanded', 'true')
        })

        it('updates the button’s `aria-label`', function () {
          var hideLabel = $button.getAttribute('data-text-for-hide')
          expect($button).toHaveAttr('aria-label', hideLabel)
        })

        it('triggers the correct google analytics custom event', function () {
          expect(GOVUK.analytics.trackEvent).toHaveBeenCalledWith('headerClicked', 'testingOpened', {
            label: 'none'
          })
        })
      })

      describe('updates correctly when clicked twice', function () {
        var $button
        var $menu

        beforeEach(function () {
          $button = document.querySelector('#super-navigation-menu-toggle')
          $menu = document.querySelector('#super-navigation-menu')

          $button.click()
        })

        it('opens and then closes the menu', function () {
          expect($menu).not.toHaveAttr('hidden')
          $button.click()
          expect($menu).toHaveAttr('hidden')
        })

        it('sets the button’s `aria-expanded` attribute to true, then false', function () {
          expect($button).toHaveAttr('aria-expanded', 'true')
          $button.click()
          expect($button).toHaveAttr('aria-expanded', 'false')
        })

        it('sets the button’s `aria-label` attribute to "Hide navigation menu", then "Show navigation menu"', function () {
          expect($button).toHaveAttr('aria-label', 'Hide navigation menu')
          $button.click()
          expect($button).toHaveAttr('aria-label', 'Show navigation menu')
        })

        it('triggers the correct google analytics custom event', function () {
          $button.click()
          expect(GOVUK.analytics.trackEvent).toHaveBeenCalledWith('headerClicked', 'testingClosed', {
            label: 'none'
          })
        })
      })

      it('toggles the other menus in its group', function () {
        var $searchButton = document.querySelector('#super-search-menu-toggle')
        var $searchMenu = document.querySelector('#super-search-menu')

        $button.click()

        expect($searchButton).toHaveAttr('aria-expanded', 'false')
        expect($searchButton).toHaveAttr('aria-label', 'Show search menu')
        expect($searchMenu).toHaveAttr('hidden')

        $searchButton.click()

        expect($searchButton).toHaveAttr('aria-expanded', 'true')
        expect($searchButton).toHaveAttr('aria-label', 'Hide search menu')
        expect($searchMenu).not.toHaveAttr('hidden')

        $button.click()

        expect($searchButton).toHaveAttr('aria-expanded', 'false')
        expect($searchButton).toHaveAttr('aria-label', 'Show search menu')
        expect($searchMenu).toHaveAttr('hidden')
      })
    })

    describe('the search toggle button', function () {
      var $button

      beforeEach(function () {
        $button = document.querySelector('#super-search-menu-toggle')
      })

      it('does not have the `hidden` attribute', function () {
        expect($button).not.toHaveAttr('hidden')
      })

      describe('has the correct ARIA attributes', function () {
        it('has `aria-controls` set to "super-search-menu"', function () {
          expect($button).toHaveAttr('aria-controls', 'super-search-menu')
        })

        it('has `aria-label` set to "Show search menu"', function () {
          expect($button).toHaveAttr('aria-label', 'Show search menu')
        })

        it('has `aria-expanded` set to false', function () {
          expect($button).toHaveAttr('aria-expanded', 'false')
        })
      })

      describe('updates correctly when clicked once', function () {
        var $button
        var $menu

        beforeEach(function () {
          $button = document.querySelector('#super-search-menu-toggle')
          $menu = document.querySelector('#super-search-menu')

          $button.click()
        })

        it('opens the menu', function () {
          expect($menu).not.toHaveAttr('hidden')
        })

        it('updates the button’s `aria-expanded` attribute to true', function () {
          expect($button).toHaveAttr('aria-expanded', 'true')
        })

        it('updates the button’s `aria-label`', function () {
          var hideLabel = $button.getAttribute('data-text-for-hide')
          expect($button).toHaveAttr('aria-label', hideLabel)
        })
      })

      describe('updates correctly when clicked twice', function () {
        var $button
        var $menu

        beforeEach(function () {
          $button = document.querySelector('#super-search-menu-toggle')
          $menu = document.querySelector('#super-search-menu')

          $button.click()
        })

        it('opens and then closes the menu', function () {
          expect($menu).not.toHaveAttr('hidden')
          $button.click()
          expect($menu).toHaveAttr('hidden')
        })

        it('sets the button’s `aria-expanded` attribute to true, then false', function () {
          expect($button).toHaveAttr('aria-expanded', 'true')
          $button.click()
          expect($button).toHaveAttr('aria-expanded', 'false')
        })

        it('sets the button’s `aria-label` attribute to "Hide search menu", then "Show search menu"', function () {
          expect($button).toHaveAttr('aria-label', 'Hide search menu')
          $button.click()
          expect($button).toHaveAttr('aria-label', 'Show search menu')
        })
      })

      it('toggles the other menus in its group', function () {
        var $navigationButton = document.querySelector('#super-navigation-menu-toggle')
        var $navigationMenu = document.querySelector('#super-navigation-menu')

        $button.click()

        expect($navigationButton).toHaveAttr('aria-expanded', 'false')
        expect($navigationButton).toHaveAttr('aria-label', 'Show navigation menu')
        expect($navigationMenu).toHaveAttr('hidden')

        $navigationButton.click()

        expect($navigationButton).toHaveAttr('aria-expanded', 'true')
        expect($navigationButton).toHaveAttr('aria-label', 'Hide navigation menu')
        expect($navigationMenu).not.toHaveAttr('hidden')

        $button.click()

        expect($navigationButton).toHaveAttr('aria-expanded', 'false')
        expect($navigationButton).toHaveAttr('aria-label', 'Show navigation menu')
        expect($navigationMenu).toHaveAttr('hidden')
      })
    })
  })

  describe('on large screens', function () {
    beforeEach(function () {
      // `windowSize` returns `'mobile'` or `'desktop'` depending on the screen
      // size. As we can't change the size of the browser window, we need to
      // change the return of this function to force the mobile or desktop
      // behaviour.
      thisModule.windowSize = function () {
        return 'desktop'
      }

      thisModule.init()
    })

    describe('the search button', function () {
      var $button

      beforeEach(function () {
        $button = document.querySelector('#super-search-menu-toggle')
      })

      it('does not have the `hidden` attribute', function () {
        expect($button).not.toHaveAttr('hidden')
      })

      describe('has the correct ARIA attributes', function () {
        it('has `aria-controls` set to "super-search-menu"', function () {
          expect($button).toHaveAttr('aria-controls', 'super-search-menu')
        })

        it('has `aria-label` set to "Show search menu"', function () {
          expect($button).toHaveAttr('aria-label', 'Show search menu')
        })

        it('has `aria-expanded` set to false', function () {
          expect($button).toHaveAttr('aria-expanded', 'false')
        })
      })
    })
  })
})
