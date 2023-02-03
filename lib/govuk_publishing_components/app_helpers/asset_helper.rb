module GovukPublishingComponents
  module AppHelpers
    class AssetHelper
      # This is a list of all the components that have stylesheets - so a new
      # component needs to be added to this list rather than being laboriously
      # added and removed from every single rendering application.
      COMPONENT_CSS_PATHS = Dir.glob("#{GovukPublishingComponents::Config.gem_directory}/app/assets/stylesheets/govuk_publishing_components/components/_*.scss").map { |path|
        filename = path.split("/").last
        component_name = filename.sub("_", "").sub(".scss", "")
        "govuk_publishing_components/components/_#{component_name}.css"
      }.freeze

      # This list includes components already included in Static; taken from
      # https://github.com/alphagov/static/blob/198a598682df40ce4a2c3c286c06244297c18cf0/app/assets/stylesheets/application.scss

      # This is used to dedupe stylesheets without needing the full path.
      STYLESHEET_LIST = %w[
        govuk_publishing_components/components/_breadcrumbs.css
        govuk_publishing_components/components/_button.css
        govuk_publishing_components/components/_error-message.css
        govuk_publishing_components/components/_heading.css
        govuk_publishing_components/components/_hint.css
        govuk_publishing_components/components/_input.css
        govuk_publishing_components/components/_label.css
        govuk_publishing_components/components/_search.css
        govuk_publishing_components/components/_skip-link.css
        govuk_publishing_components/components/_textarea.css
        govuk_publishing_components/components/_title.css

        govuk_publishing_components/components/_cookie-banner.css
        govuk_publishing_components/components/_feedback.css
        govuk_publishing_components/components/_layout-footer.css
        govuk_publishing_components/components/_layout-for-public.css
        govuk_publishing_components/components/_layout-header.css
        govuk_publishing_components/components/_layout-super-navigation-header.css
      ].freeze

      def initialize
        # Set up the lists of gem components, app components, and views.
        @gem_component_stylesheets_being_used = []
        @app_component_stylesheets_being_used = []
        @view_stylesheets_being_used = []
      end

      def add_stylesheet_path(component_path)
        unless is_already_used?(component_path)
          STYLESHEET_LIST << component_path
        end
      end

      # Used to add a component that exists in the gem to the list
      def add_gem_component(gem_component)
        add_stylesheet_path("govuk_publishing_components/components/_#{gem_component}.css")
      end

      # Used to add a component that exists in the application to the list
      def add_component(app_component)
        add_stylesheet_path("components/_#{app_component}.css")
      end

      # Some applications have view-specific stylesheets - use this method
      # to add them to the list
      def add_view(view_component)
        add_stylesheet_path("views/_#{view_component}.css")
      end

      def get_stylesheets
        STYLESHEET_LIST
      end

    private

      def is_already_used?(component)
        STYLESHEET_LIST.include?(component)
      end
    end
  end
end
