/* eslint-env jasmine */

describe('Google Analytics form tracking', function () {
  var GOVUK = window.GOVUK
  var element
  var expected

  function agreeToCookies () {
    GOVUK.setCookie('cookies_policy', '{"essential":true,"settings":true,"usage":true,"campaigns":true}')
  }

  function denyCookies () {
    GOVUK.setCookie('cookies_policy', '{"essential":false,"settings":false,"usage":false,"campaigns":false}')
  }

  beforeAll(function () {
    window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}
    window.GOVUK.analyticsGa4.vars = window.GOVUK.analyticsGa4.vars || {}
    window.GOVUK.analyticsGa4.vars.gem_version = 'aVersion'
  })

  beforeEach(function () {
    window.dataLayer = []
    element = document.createElement('form')
    document.body.appendChild(element)
    agreeToCookies()
  })

  afterEach(function () {
    document.body.removeChild(element)
  })

  afterAll(function () {
    window.dataLayer = []
  })

  describe('when the user has a cookie consent choice', function () {
    it('starts the module if consent has already been given', function () {
      agreeToCookies()
      var tracker = new GOVUK.Modules.Ga4FormTracker(element)
      spyOn(tracker, 'trackFormSubmit')
      tracker.init()

      window.GOVUK.triggerEvent(element, 'submit')
      expect(tracker.trackFormSubmit).toHaveBeenCalled()
    })

    it('starts the module on the same page as cookie consent is given', function () {
      denyCookies()
      var tracker = new GOVUK.Modules.Ga4FormTracker(element)
      spyOn(tracker, 'trackFormSubmit')
      tracker.init()

      window.GOVUK.triggerEvent(element, 'submit')
      expect(tracker.trackFormSubmit).not.toHaveBeenCalled()

      // page has not been reloaded, user consents to cookies
      window.GOVUK.triggerEvent(window, 'cookie-consent')

      window.GOVUK.triggerEvent(element, 'submit')
      expect(tracker.trackFormSubmit).toHaveBeenCalled()
    })

    it('does not do anything if consent is not given', function () {
      denyCookies()
      var tracker = new GOVUK.Modules.Ga4FormTracker(element)
      spyOn(tracker, 'trackFormSubmit')
      tracker.init()

      window.GOVUK.triggerEvent(element, 'submit')
      expect(tracker.trackFormSubmit).not.toHaveBeenCalled()
    })
  })

  describe('when tracking a form', function () {
    beforeEach(function () {
      var attributes = {
        event_name: 'form_response',
        type: 'smart answer',
        section: 'What is the title of this question?',
        action: 'Continue',
        tool_name: 'What is the title of this smart answer?'
      }
      element.setAttribute('data-ga4-form', JSON.stringify(attributes))
      expected = new GOVUK.analyticsGa4.Schemas().eventSchema()
      expected.event = 'event_data'
      expected.event_data.event_name = 'form_response'
      expected.event_data.type = 'smart answer'
      expected.event_data.section = 'What is the title of this question?'
      expected.event_data.action = 'Continue'
      expected.event_data.tool_name = 'What is the title of this smart answer?'
      expected.govuk_gem_version = 'aVersion'
      var tracker = new GOVUK.Modules.Ga4FormTracker(element)
      tracker.init()
    })

    it('collects basic data', function () {
      window.GOVUK.triggerEvent(element, 'submit')
      expected.event_data.text = 'No answer given'
      expect(window.dataLayer[0]).toEqual(expected)
    })

    it('redacts data from text inputs', function () {
      element.innerHTML =
        '<label for="textid">Label</label>' +
        '<input type="text" id="textid" name="test-text" value="test-text-value"/>'
      expected.event_data.text = '[REDACTED]'

      window.GOVUK.triggerEvent(element, 'submit')
      expect(window.dataLayer[0]).toEqual(expected)
    })

    it('redacts data from multiple text inputs', function () {
      element.innerHTML =
        '<label for="textid1">Label</label>' +
        '<input type="text" id="textid1" name="test-text1" value="text 1"/>' +
        '<label for="textid2">Label</label>' +
        '<input type="text" id="textid2" name="test-text2"/>' +
        '<label for="textid3">Label</label>' +
        '<input type="text" id="textid3" name="test-text3" value="text 3"/>'
      expected.event_data.text = '[REDACTED],[REDACTED]'

      window.GOVUK.triggerEvent(element, 'submit')
      expect(window.dataLayer[0]).toEqual(expected)
    })

    it('collects data from checkboxes', function () {
      element.innerHTML =
        '<label><input type="checkbox" id="c1" name="checkbox[]" value="checkbox1"/>checkbox1</label>' +
        '<label><input type="checkbox" id="c2" name="checkbox[]" value="checkbox2"/>checkbox2</label>' +
        '<label><input type="checkbox" id="c3" name="checkbox[]" value="checkbox3"/>checkbox3</label>'
      document.getElementById('c1').checked = true
      document.getElementById('c3').checked = true
      expected.event_data.text = 'checkbox1,checkbox3'

      window.GOVUK.triggerEvent(element, 'submit')
      expect(window.dataLayer[0]).toEqual(expected)
    })

    it('collects data from radio buttons', function () {
      element.innerHTML =
        '<label><input type="radio" id="r1" name="radio[]" value="radio1"/>radio1</label>' +
        '<label><input type="radio" id="r2" name="radio[]" value="radio2"/>radio2</label>' +
        '<label><input type="radio" id="r3" name="radio[]" value="radio3"/>radio3</label>'
      document.getElementById('r1').checked = true
      document.getElementById('r2').checked = true
      expected.event_data.text = 'radio2'

      window.GOVUK.triggerEvent(element, 'submit')
      expect(window.dataLayer[0]).toEqual(expected)
    })

    it('collects data from select elements', function () {
      element.innerHTML =
        '<label for="s1">Label</label>' +
        '<select name="select" id="s1">' +
          '<option value="option1">Option 1</option>' +
          '<option value="option2">Option 2</option>' +
          '<option value="option3">Option 3</option>' +
        '</select>'
      var select = document.getElementById('s1')
      select.selectedIndex = 2
      window.GOVUK.triggerEvent(select, 'change')
      expected.event_data.text = 'Option 3'

      window.GOVUK.triggerEvent(element, 'submit')
      expect(window.dataLayer[0]).toEqual(expected)
    })

    it('collects data from a select and a text input', function () {
      element.innerHTML =
        '<label for="s1">Label</label>' +
        '<select name="select" id="s1">' +
          '<option value="option1">Option 1</option>' +
          '<option value="option2">Option 2</option>' +
          '<option value="option3">Option 3</option>' +
        '</select>' +
        '<label for="text">Label</label>' +
        '<input type="text" id="text" name="test-text" value="Some text"/>'
      var select = document.getElementById('s1')
      select.selectedIndex = 2
      window.GOVUK.triggerEvent(select, 'change')
      expected.event_data.text = 'Option 3,[REDACTED]'

      window.GOVUK.triggerEvent(element, 'submit')
      expect(window.dataLayer[0]).toEqual(expected)
    })

    it('copes when the form is not well formed', function () {
      element.innerHTML =
        '<input type="text" id="textid" name="test-text" value="test-text-value"/>' +
        '<select name="select" id="s1">' +
          '<option value="option1">Option 1</option>' +
          '<option value="option2">Option 2</option>' +
          '<option value="option3">Option 3</option>' +
        '</select>' +
        '<input type="radio" id="r1" name="radio[]" value="radio1"/>radio1' +
        '<input type="radio" id="r2" name="radio[]" value="radio2"/>radio2' +
        '<input type="checkbox" id="c1" name="checkbox[]" value="checkbox1"/>checkbox1' +
        '<input type="checkbox" id="c2" name="checkbox[]" value="checkbox2"/>checkbox2'

      var select = document.getElementById('s1')
      select.selectedIndex = 2
      window.GOVUK.triggerEvent(select, 'change')
      window.GOVUK.triggerEvent(element, 'submit')
      expected.event_data.text = 'No answer given'

      expect(window.dataLayer[0]).toEqual(expected)
    })
  })
})
