import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { define } from "./define";
import { ImdzFormField } from "./form-field";

export class ImdzInput extends ImdzFormField {
  static properties = {
    type: { type: String },
    placeholder: { type: String },
  };

  declare type: string;
  declare placeholder: string | undefined;

  constructor() {
    super();
    this.type = "text";
  }

  protected renderControl(describedBy?: string) {
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

declare global {
  interface HTMLElementTagNameMap {
    "imdz-input": ImdzInput;
  }
}
