# Google Analytics 4 form tracker

This script is intended for adding GA4 tracking to forms, specifically for smart answers and simple smart answers. The script is triggered on the 'submit' event of the form. It depends upon the main GA4 analytics code to function.

## Basic use

```html
<form
  data-module="ga4-form-tracker"
  data-ga4-form='{ "event_name": "form_response", "type": "something", "section": "form title", "action": "Continue", "tool_name": "title" }'>
  <!-- form contents -->
</form>
```

The data attributes are used as follows:

- `type` records the type of form e.g. `smart answer` or `simple smart answer`
- `section` records the current question e.g. `What are your favourite puddings?`
- `action` records the text of the form submission button e.g. `Continue`
- `tool_name` records the overall name of the smart answer e.g. `How do I eat more healthily?`

The script will automatically collect the answer submitted in the `text` field. For questions where multiple answers are possible, these will be comma separated. Where the answer is a text input, the value given is replaced with `[REDACTED]`, to avoid collecting personally identifiable information.

In the example above, the following would be pushed to the dataLayer. Note that the schema automatically populates empty values, and that attributes not in the schema are ignored.

```
{
  'event': 'event_data',
  'event_data': {
    'event_name': 'form_response',
    'type': 'smart answer',
    'tool_name': 'How do I eat more healthily?',
    'section': 'What are your favourite puddings?',
    'text': 'yoghurt,pie,trifle',
    'action': 'Continue',
    'index': null,
    'index_total': null,
    'url': null,
    'external': null
  }
}
```
