import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { define } from "./define.js";
import { ImdzFormField } from "./form-field.js";

export class ImdzInput extends ImdzFormField {
  static properties = {
    type: { type: String },
    placeholder: { type: String },
  };

  constructor() {
    super();
    this.type = "text";
  }

  renderControl(describedBy) {
    return html`
      <input
        id="input"
        class="input"
        .value=${this.value}
        type=${this.type}
        placeholder=${ifDefined(this.placeholder)}
        ?required=${this.required}
        ?disabled=${this.disabled}
        aria-invalid=${this.error ? "true" : "false"}
        aria-describedby=${ifDefined(describedBy)}
        @input=${this.handleInput}
        @change=${this.handleChange}
      />
    `;
  }
}

define("imdz-input", ImdzInput);

