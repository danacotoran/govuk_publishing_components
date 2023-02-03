window.GOVUK = window.GOVUK || {}
window.GOVUK.Modules = window.GOVUK.Modules || {};

(function (Modules) {
  function Intervention ($module) {
    this.$module = $module
    this.$banner = this.$module.querySelector('.gem-c-intervention')
    this.$closeLink = this.$module.querySelector('.gem-c-intervention__dismiss-link')
    this.$bannerName = this.$module.getAttribute('data-intervention-name')
  }

  Intervention.prototype.init = function () {
    this.$module.close = this.handleClose.bind(this)

    if (this.$closeLink) {
      this.$closeLink.addEventListener('click', this.$module.close)
    }

    if (this.checkCookies()) {
      this.hideBanner()
    }
  }

  Intervention.prototype.handleClose = function (event) {
    if (event) {
      event.preventDefault()
    }

    this.hideBanner()
  }

  Intervention.prototype.checkCookies = function () {
    return !!(window.GOVUK.getCookie('cookies_policy') && (window.GOVUK.cookie('test_intervention_name')))
  }

  Intervention.prototype.setCookies = function () {
    if (window.GOVUK.getCookie('cookies_policy')) {
      window.GOVUK.setCookie('test_intervention_name', 'true', { days: 30 })
    }
  }

  Intervention.prototype.hideBanner = function () {
    if (!this.checkCookies()) {
      this.setCookies()
    }

    this.$module.hidden = true
    this.$module.style.display = 'none'
  }

  Modules.Intervention = Intervention
})(window.GOVUK.Modules)
