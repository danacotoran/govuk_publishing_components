## Set up individual component CSS loading

Set the component gem up so that rendering applications can (optionally) load each component's stylesheet individually, as described in [RFC #149](https://github.com/alphagov/govuk-rfcs/pull/152).

### TL;DR
An array for stylesheet names is set up in the rendering application using a helper. Templates can then add the names of stylesheets the array, which is then used by the application to output all of the stylesheets needed on the page.

Example of rendering application upgrade: https://github.com/alphagov/frontend/pull/3342/

### Initial set up

First we initialise the `AssetHelper` to make all the helper methods available in the partial templates being used. The helper is initialised in the rendering application's `application_controller.rb` file:

```ruby
 @individual_stylesheets = GovukPublishingComponents::AppHelpers::AssetHelper.new
```

> ⚠️ The name of this instance variable must be `@individual_stylesheets` - this is the name of the variable that is used in all of the component partials in the gem.

There are 3 types of stylesheet that are used across GOVUK:

- CSS from components in the gem
- CSS from components in the application
- CSS from views in the application

The helper function adds each type of stylesheet to the list - gem components, app components, and views.

Any other styles should be added in the application's `application.scss` file.

There are three different methods for adding stylesheets to the list - one for each type of stylesheet:

 - `add_gem_component`
 - `add_component`
 - `add_view`

 These take the name of the Sass file relevant to the component or view:

 ```ruby
  @individual_stylesheets.add_gem_component("accordion")
 ```
 or

```ruby
  @individual_stylesheets.add_view("homepage")
```

These are best used when wrapped in a `defined?` check to ensure that the absence of this instance variable doesn't break anything:

```ruby
if defined? @individual_stylesheets
  @individual_stylesheets.add_component("calendar")
end
```

If individual loading of stylesheets isn't wanted, don't set the `@individual_stylesheets` instance variable and this feature won't be used.

### Precompiling

The stylesheets need to be added to the rendering applications list of things to precompile. This is available in a static array from the component gem by pushing `COMPONENT_CSS_PATHS` into `config.assets.precompile` in `config/application.rb`:

```ruby
config.assets.precompile << GovukPublishingComponents::AppHelpers::AssetHelper::COMPONENT_CSS_PATHS
```

Add the stylesheet filename to this list when creating a new component in the gem.

Any app component and view stylesheets should be added to the application's `manifest.js`.

### Getting the list of stylesheet paths

To get the list of stylesheets the helper has the `get_stylesheets` method. This will then return an array of paths to the stylesheets - this is just an array and there are no checks to make sure that the stylesheet actually exist.

Taking the previous three examples of adding a gem component, view, and app component, the `get_stylesheets` method:

```ruby
@individual_stylesheets.get_stylesheets
```

will return the following array:

```ruby
[
  "govuk_publishing_components/components/_accordion.css",
  "components/_calendar.css",
  "views/_homepage.css"
]
```

The order is always:
1. gem components in alphabetical order
2. app components in alphabetical order
3. views in alphabetical order

This can be looped and then used to get the stylesheet path using Rail's built in `stylesheet_link_tag` method, for example:

```ruby
<%=
  if defined? @individual_stylesheets
    list_of_stylesheets = @individual_stylesheets.get_stylesheets.map do | component |
      stylesheet_link_tag(component, integrity: false)
    end
    raw(list_of_stylesheets.join(""))
  end
%>
```

### Known problems

#### Nested components in GOV.UK Frontend

GOV.UK Frontend has components that use other components - for example, both the radio button and character count component include the label component. These are deduped by GOV.UK Frontend when compiling the CSS to a single file.

As this pull request includes the stylesheets for the components individually, this will mean that both the radio stylesheet and the character count stylesheet will include the label component.

This shouldn't make a difference in visual appearance of the site, since the stylesheets were included in alphabetical order and continue to do so. However, it means that there still is some CSS that is unnecessarily included twice.

The page sizes were calculated from individual compiled CSS files, so there still is a performance improvement - but it could be further improved.

Ideally there'd be a way of including only the components without including the nested components; for example, the partial for radio inputs would include both the label and radio:

```ruby
  @individual_stylesheets.add_gem_component("label")
  @individual_stylesheets.add_gem_component("radio")
```

which would then be deduped before being added to the array of stylesheets.

#### Increased request header size

Rails automatically adds the stylesheets on the page to the request `preload` header. This means that it gets bigger with every additional stylesheet that's added to the page. Coupled with a large <abbr title="Content Security Policy">CSP</abbr>, this means that some pages have a header size that nginx doesn't like at all - so causes nginx to return a 502 error. This error is seen on Integration, but not locally or on Heroku.

A pull request has been raised to fix this by [increasing the cache size in NGINX](https://github.com/alphagov/govuk-puppet/pull/11846).

**Note:**

We will use this feature in the `frontend` app first and review the performance impact before rolling out to other frontend apps.

The increased cache size in NGINX is large enough for the loading of individual CSS assets in the `frontend` app. However, we will need to increase the cache size further before being used in other apps such as `government-frontend` that use a larger number of components, and before it is used to load individual JS assets.

### Step by step changes to the rendering application

**Set up the AssetHelper** in `app/controllers/application_controller.rb` inside `before_action`:

```rb
begin
  @individual_stylesheets = GovukPublishingComponents::AppHelpers::AssetHelper.new
rescue NameError
  logger.warn("The version of the components gem being used doesn't support individual asset loading.")
end
```

**Set up the stylesheets to be precompiled**. Add any app components and views in `app/assets/config/manifest.js` (and then remove them from `app/assets/stylesheets/application.scss`).

```js
//= link components/_calendar.css
//= link views/_homepage.css
```

Add list of gem components to be precompiled in `config/application.rb` (and then all gem component `@import`s can also be removed from `app/assets/stylesheets/application.scss`):

```rb
config.assets.precompile << GovukPublishingComponents::AppHelpers::AssetHelper::COMPONENT_CSS_PATHS
```

**Add the app components and views** to the array. This bit will likely take the most time - and really benefits from a comprehensive list of what pages use which templates (and template variations).

Add the `add_view` and `add_component` to the top of each partial template that needs it:

```rb
if defined? @individual_stylesheets
  @individual_stylesheets.add_view("location_form")
end
```

```rb
if defined? @individual_stylesheets
  @individual_stylesheets.add_component("calendar")
end
```

Each stylesheet that is used individually will need an extra `@import` added to allow them to use GOV.UK Frontend variables and mixins:

```scss
@import "govuk_publishing_components/individual_component_support";
```

**Hoist the content of the body to the top of the base template in `app/views/layouts/application.html.erb`**. This ensures that all of the components are added to the array before the array is used in the `<head>` of the template.

On line 1:
```rb
<% content_for :body do %>
  <!-- Everything that was between <body> and </body> --->
<% end %>
```

And then between <body> and </body>:

```rb
<%= yield :body %>
```

**Add the stylesheets to the `<head>` of the base template**, placed directly after `application.css`:

```rb
<%= stylesheet_link_tag "application.css", integrity: false %>
<%=
  if defined? @individual_stylesheets
    list_of_stylesheets = @individual_stylesheets.get_stylesheets.map do | component |
      stylesheet_link_tag(component, integrity: false)
    end
    raw(list_of_stylesheets.join(""))
  end
%>
```

## Why

See [RFC #149](https://github.com/alphagov/govuk-rfcs/pull/152) for more details about this approach.