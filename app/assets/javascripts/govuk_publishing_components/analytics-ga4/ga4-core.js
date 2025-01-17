//= require ../vendor/polyfills/closest.js
window.GOVUK = window.GOVUK || {}
window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {};

(function (analytics) {
  'use strict'

  var core = {
    load: function () {
      var firstScript = document.getElementsByTagName('script')[0]
      var newScript = document.createElement('script')
      newScript.async = true

      // initialise GTM
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ 'gtm.blocklist': ['customPixels', 'customScripts', 'html', 'nonGoogleScripts'] })
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

      var auth = window.GOVUK.analyticsGa4.vars.auth || ''
      var preview = window.GOVUK.analyticsGa4.vars.preview || ''
      if (auth) {
        auth = '&gtm_auth=' + auth
      }
      if (preview) {
        preview = '&gtm_preview=' + preview + '&gtm_cookies_win=x'
      }

      this.googleSrc = 'https://www.googletagmanager.com/gtm.js?id=' + window.GOVUK.analyticsGa4.vars.id + auth + preview
      newScript.src = this.googleSrc
      firstScript.parentNode.insertBefore(newScript, firstScript)
    },

    sendData: function (data) {
      data.govuk_gem_version = this.getGemVersion()
      window.dataLayer.push(data)
    },

    getGemVersion: function () {
      return window.GOVUK.analyticsGa4.vars.gem_version || 'not found'
    },

    trackFunctions: {
      findTrackingAttributes: function (clicked, trackingTrigger) {
        if (clicked.hasAttribute('[' + trackingTrigger + ']')) {
          return clicked
        } else {
          return clicked.closest('[' + trackingTrigger + ']')
        }
      },

      // create an object to split up long URLs and get around the 100 character limit on GTM data
      // this gets reassembled in GA4
      populateLinkPathParts: function (href) {
        var path = ''
        if (this.hrefIsRelative(href) || this.isMailToLink(href)) {
          path = href
        } else {
          // This regex matches a protocol and domain name at the start of a string such as https://www.gov.uk, http://gov.uk, //gov.uk
          path = href.replace(/^(http:||https:)?(\/\/)([^\/]*)/, '') // eslint-disable-line no-useless-escape
        }

        if (path === '/' || path.length === 0) {
          return
        }

        /*
        This will create an object with 5 keys that are indexes ("1", "2", etc.)
        The values will be each part of the link path split every 100 characters, or undefined.
        For example: {"1": "/hello/world/etc...", "2": "/more/path/text...", "3": undefined, "4": undefined, "5": undefined}
        Undefined values are needed to override the persistent object in GTM so that any values from old pushes are overwritten.
        */
        var parts = path.match(/.{1,100}/g)
        var obj = {}
        for (var i = 0; i < 5; i++) {
          obj[(i + 1).toString()] = parts[i]
        }
        return obj
      },

      hrefIsRelative: function (href) {
        // Checks that a link is relative, but is not a protocol relative url
        return href[0] === '/' && href[1] !== '/'
      },

      hrefIsAnchor: function (href) {
        return href[0] === '#'
      },

      isMailToLink: function (href) {
        return href.substring(0, 7) === 'mailto:'
      },

      getClickType: function (event) {
        switch (event.type) {
          case 'click':
            if (event.ctrlKey) {
              return 'ctrl click'
            } else if (event.metaKey) {
              return 'command/win click'
            } else if (event.shiftKey) {
              return 'shift click'
            } else {
              return 'primary click'
            }
          case 'mousedown':
            return 'middle click'
          case 'contextmenu':
            return 'secondary click'
        }
      },

      isInternalLink: function (href) {
        var internalDomains = window.GOVUK.analyticsGa4.vars.internalDomains
        if (this.hrefIsRelative(href) || this.hrefIsAnchor(href)) {
          return true
        }
        var result = false
        for (var i = 0; i < internalDomains.length; i++) {
          var internalDomain = internalDomains[i]
          if (this.hrefPointsToDomain(href, internalDomain)) {
            result = true
          }
        }
        return result
      },

      isExternalLink: function (href) {
        return !this.isInternalLink(href)
      },

      hrefPointsToDomain: function (href, domain) {
        /* Add a trailing slash to prevent an edge case such
        as the href www.gov.uk.domain.co.uk being detected as an internal link,
        if we were checking for 'www.gov.uk' instead of 'www.gov.uk/' */
        if (domain.substring(domain.length) !== '/') {
          domain = domain + '/'
        }

        /* If the href doesn't end in a slash, we add one.
        This fixes an edge case where the <a href> is exactly `https://www.gov.uk`
        but these checks would only look for `https://www.gov.uk/` */
        if (href.substring(href.length) !== '/') {
          href = href + '/'
        }
        // matches the domain preceded by https:// http:// or //
        var regex = new RegExp('^((http)*(s)*(:)*//)(' + domain + ')', 'g')
        return regex.test(href)
      },

      removeLinesAndExtraSpaces: function (text) {
        text = text.trim()
        text = text.replace(/(\r\n|\n|\r)/gm, ' ') // Replace line breaks with 1 space
        text = text.replace(/\s+/g, ' ') // Replace instances of 2+ spaces with 1 space
        return text
      },

      removeCrossDomainParams: function (href) {
        if (href.indexOf('_ga') !== -1 || href.indexOf('_gl') !== -1) {
          // _ga & _gl are values needed for cross domain tracking, but we don't want them included in our click tracking.
          href = href.replaceAll(/_g[al]=([^&]*)/g, '')

          // The following code cleans up inconsistencies such as gov.uk/&&, gov.uk/?&hello=world, gov.uk/?, and gov.uk/&.
          href = href.replaceAll(/(&&)+/g, '&')
          href = href.replace('?&', '?')
          if (this.stringEndsWith(href, '?') || this.stringEndsWith(href, '&')) {
            href = href.substring(0, href.length - 1)
          }
        }
        return href
      },

      stringStartsWith: function (string, stringToFind) {
        return string.substring(0, stringToFind.length) === stringToFind
      },

      stringEndsWith: function (string, stringToFind) {
        return string.substring(string.length - stringToFind.length, string.length) === stringToFind
      },

      populateLinkDomain: function (href) {
        // We always want mailto links to have an undefined link_domain
        if (this.isMailToLink(href)) {
          return undefined
        }

        if (this.hrefIsRelative(href) || this.hrefIsAnchor(href)) {
          return this.getProtocol() + '//' + this.getHostname()
        } else {
          // This regex matches a protocol and domain name at the start of a string such as https://www.gov.uk, http://gov.uk, //gov.uk
          var domainRegex = /^(http:||https:)?(\/\/)([^\/]*)/ // eslint-disable-line no-useless-escape
          var domain = domainRegex.exec(href)[0]
          return domain
        }
      },

      getProtocol: function () {
        return window.location.protocol
      },

      getHostname: function () {
        return window.location.hostname
      },

      appendDomainsWithoutWWW: function (domainsArrays) {
        // Add domains with www. removed, in case site hrefs are marked up without www. included.
        for (var i = 0; i < domainsArrays.length; i++) {
          var domain = domainsArrays[i]
          if (this.stringStartsWith(domain, 'www.')) {
            var domainWithoutWww = domain.replace('www.', '')
            domainsArrays.push(domainWithoutWww)
          }
        }
      }
    }
  }

  analytics.core = core
})(window.GOVUK.analyticsGa4)
