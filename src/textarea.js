import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { define } from "./define.js";
import { ImdzFormField } from "./form-field.js";
import { textareaCss } from "./styles.generated.js";

export class ImdzTextarea extends ImdzFormField {
  static properties = {
    placeholder: { type: String },
    rows: { type: Number },
  };

  static styles = [ImdzFormField.styles, unsafeCSS(textareaCss)];

  constructor() {
    super();
    this.rows = 4;
  }

  renderControl(describedBy) {
    return html`
      <textarea
        id="input"
        class="input textarea"
        .value=${this.value}
        rows=${this.rows}
        placeholder=${ifDefined(this.placeholder)}
        ?required=${this.required}
        ?disabled=${this.disabled}
        aria-invalid=${this.error ? "true" : "false"}
        aria-describedby=${ifDefined(describedBy)}
        @input=${this.handleInput}
        @change=${this.handleChange}
      ></textarea>
    `;
  }
}

define("imdz-textarea", ImdzTextarea);

