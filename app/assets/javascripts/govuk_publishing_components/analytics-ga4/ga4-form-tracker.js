window.GOVUK = window.GOVUK || {}
window.GOVUK.Modules = window.GOVUK.Modules || {};

(function (Modules) {
  'use strict'

  function Ga4FormTracker (module) {
    this.module = module
    this.trackingTrigger = 'data-ga4-form' // elements with this attribute get tracked
  }

  Ga4FormTracker.prototype.init = function () {
    var consentCookie = window.GOVUK.getConsentCookie()

    if (consentCookie && consentCookie.settings) {
      this.startModule()
    } else {
      this.startModule = this.startModule.bind(this)
      window.addEventListener('cookie-consent', this.startModule)
    }
  }

  // triggered by cookie-consent event, which happens when users consent to cookies
  Ga4FormTracker.prototype.startModule = function () {
    if (window.dataLayer) {
      this.module.addEventListener('submit', this.trackFormSubmit.bind(this))
    }
  }

  Ga4FormTracker.prototype.trackFormSubmit = function (event) {
    var target = window.GOVUK.analyticsGa4.core.trackFunctions.findTrackingAttributes(event.target, this.trackingTrigger)
    if (target) {
      try {
        var data = target.getAttribute(this.trackingTrigger)
        data = JSON.parse(data)
      } catch (e) {
        // if there's a problem with the config, don't start the tracker
        console.warn('GA4 configuration error: ' + e.message, window.location)
        return
      }

      var formInputs = this.getFormInputs()
      var formData = this.getInputValues(formInputs)
      data.text = this.combineGivenAnswers(formData) || 'No answer given'

      var schemas = new window.GOVUK.analyticsGa4.Schemas()
      var schema = schemas.mergeProperties(data, 'event_data')
      window.GOVUK.analyticsGa4.core.sendData(schema)
    }
  }

  Ga4FormTracker.prototype.getFormInputs = function () {
    var inputs = []
    var labels = this.module.querySelectorAll('label')

    for (var i = 0; i < labels.length; i++) {
      var label = labels[i]
      var labelFor = label.getAttribute('for')
      var input = false
      if (labelFor) {
        input = this.module.querySelector('[id=' + labelFor + ']')
      } else {
        input = label.querySelector('input')
      }
      inputs.push({
        input: input,
        label: label
      })
    }
    return inputs
  }

  Ga4FormTracker.prototype.getInputValues = function (inputs) {
    for (var i = inputs.length - 1; i >= 0; i--) {
      var input = inputs[i]
      var elem = input.input
      var labelText = input.label.innerText || input.label.textContent
      var inputType = elem.getAttribute('type')
      var inputNodename = elem.nodeName

      if (inputType === 'checkbox' && elem.checked) {
        input.answer = labelText
      } else if (inputNodename === 'SELECT' && elem.options[elem.selectedIndex].value) {
        input.answer = elem.options[elem.selectedIndex].text
      } else if (inputType === 'text' && elem.value) {
        input.answer = '[REDACTED]'
      } else if (inputType === 'radio' && elem.checked) {
        input.answer = labelText
      } else {
        // remove the input from those gathered as it has no value
        inputs.splice(i, 1)
      }
    }
    return inputs
  }

  Ga4FormTracker.prototype.combineGivenAnswers = function (data) {
    var answers = ''
    for (var i = 0; i < data.length; i++) {
      var answer = data[i].answer
      if (answer) {
        answers += answer + ','
      }
    }
    // remove the trailing comma
    if (answers.length) {
      answers = answers.slice(0, -1)
      return answers
    }
  }

  Modules.Ga4FormTracker = Ga4FormTracker
})(window.GOVUK.Modules)
