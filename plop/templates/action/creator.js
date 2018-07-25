
export const {{camelCase action}} = {{#if paramsLengthNotOne}}({{paramsFormatted}}){{else}}{{paramsFormatted}}{{/if}} => ({
  type: {{constantCase action}}{{#if hasParams}},
  payload: {
    {{paramsNewLine}}
  }
  {{else}}

  {{/if}}
})
