module GovukPublishingComponents
  module AppHelpers
    class AssetHelper
      # This is a list of all the components that have stylesheets - so a new
      # component needs to be added to this list rather than being laboriously
      # added and removed from every single rendering application.
      COMPONENT_CSS_PATHS = %w[
        accordion
        action-link
        attachment
        attachment-link
        back-link
        big-number
        breadcrumbs
        button
        cards
        character-count
        checkboxes
        contents-list
        contextual-guidance
        contextual-sidebar
        cookie-banner
        copy-to-clipboard
        date-input
        details
        devolved-nations
        document-list
        emergency-banner
        error-alert
        error-message
        error-summary
        feedback
        fieldset
        file-upload
        govspeak
        govspeak-html-publication
        heading
        hint
        image-card
        input
        inset-text
        intervention
        inverse-header
        label
        layout-footer
        layout-for-admin
        layout-for-public
        layout-header
        layout-super-navigation-header
        lead-paragraph
        metadata
        modal-dialogue
        notice
        organisation-logo
        panel
        phase-banner
        previous-and-next-navigation
        print-link
        radio
        related-navigation
        reorderable-list
        search
        select
        share-links
        show-password
        signup-link
        single-page-notification-button
        skip-link
        step-by-step-nav
        step-by-step-nav-header
        step-by-step-nav-related
        subscription-links
        success-alert
        summary-list
        table
        tabs
        textarea
        title
        translation-nav
        warning-text
      ].map { |component|
        "govuk_publishing_components/components/_#{component}.css"
      }.freeze

      def initialize
        # Set up the lists of gem components, app components, and views.
        @gem_component_stylesheets_being_used = []
        @app_component_stylesheets_being_used = []
        @view_stylesheets_being_used = []

        # This list includes components already included in Static; taken from
        # https://github.com/alphagov/static/blob/198a598682df40ce4a2c3c286c06244297c18cf0/app/assets/stylesheets/application.scss
        #
        # This is used to dedupe stylesheets without needing the full path.
        @stylesheet_list = %w[
          breadcrumbs
          button
          error-message
          heading
          hint
          input
          label
          search
          skip-link
          textarea
          title

          cookie-banner
          feedback
          layout-footer
          layout-for-public
          layout-header
          layout-super-navigation-header
        ]
      end

      # Used to add a component that exists in the gem to the list
      def add_gem_component(component)
        unless is_already_used?(component)
          @gem_component_stylesheets_being_used << "govuk_publishing_components/components/_#{component}.css"
          @stylesheet_list << component
        end
      end

      # Used to add a component that exists in the application to the list
      def add_component(component)
        unless is_already_used?(component)
          @app_component_stylesheets_being_used << "components/_#{component}.css"
          @stylesheet_list << component
        end
      end

      # Some applications have view-specific stylesheets - use this method
      # to add them to the list
      def add_view(view)
        unless is_already_used?(view)
          @view_stylesheets_being_used << "views/_#{view}.css"
          @stylesheet_list << view
        end
      end

      def get_stylesheets
        @gem_component_stylesheets_being_used.sort +
          @app_component_stylesheets_being_used.sort +
          @view_stylesheets_being_used.sort
      end

    private

      def is_already_used?(component)
        @stylesheet_list.include?(component)
      end
    end
  end
end
