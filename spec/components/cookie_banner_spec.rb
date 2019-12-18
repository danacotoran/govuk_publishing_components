require 'rails_helper'

describe "Cookie banner", type: :view do
  def component_name
    "cookie_banner"
  end

  it "renders with default values" do
    render_component({})
    assert_select '.gem-c-cookie-banner[id="global-cookie-message"][data-module="cookie-banner"]'
    assert_select '.govuk-width-container .gem-c-cookie-banner__message', text: "Tell us whether you accept cookies
          We use cookies to collect information about how you use GOV.UK. We use this information to make the website work as well as possible and improve government services."
    assert_select 'button[data-hide-cookie-banner="true"]'
  end

  it "renders a button for accepting cookies" do
    render_component(new_cookie_banner: true)
    assert_select '.gem-c-cookie-banner__buttons .gem-c-button', text: "Accept all cookies"
    assert_select '.gem-c-cookie-banner__buttons .gem-c-button[data-module=track-click][data-track-category=cookieBanner][data-track-action="Cookie banner accepted"]'
  end

  it "renders a button for viewing cookie settings" do
    render_component(new_cookie_banner: true)
    assert_select '.gem-c-cookie-banner__buttons .gem-c-button', text: "Set cookie preferences"
    assert_select '.gem-c-cookie-banner__buttons .gem-c-button[data-module=track-click][data-track-category=cookieBanner][data-track-action="Cookie banner settings clicked"]'
  end

  it "renders a confirmation message" do
    render_component(new_cookie_banner: true)
    assert_select '.gem-c-cookie-banner__confirmation-message', text: "You’ve accepted all cookies. You can change your cookie settings at any time."
  end

  it "renders a link to the settings page within the confirmation message" do
    render_component(new_cookie_banner: true)
    assert_select '.gem-c-cookie-banner__confirmation-message a', text: "change your cookie settings"
    assert_select '.gem-c-cookie-banner__confirmation-message a[data-module=track-click][data-track-category=cookieBanner][data-track-action="Cookie banner settings clicked from confirmation"]'
  end

  it "renders a hide link within the confirmation banner" do
    render_component(new_cookie_banner: true)

    assert_select '.gem-c-cookie-banner__confirmation .gem-c-cookie-banner__hide-button', text: "Hide"
    assert_select '.gem-c-cookie-banner__hide-button[data-module=track-click][data-track-category=cookieBanner][data-track-action="Hide cookie banner"]'
  end
end
