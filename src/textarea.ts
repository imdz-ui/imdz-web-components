import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { define } from "./define";
import { ImdzFormField } from "./form-field";
import { textareaCss } from "./styles.generated";

export class ImdzTextarea extends ImdzFormField {
  static properties = {
    placeholder: { type: String },
    rows: { type: Number },
  };

  static styles = [ImdzFormField.styles, unsafeCSS(textareaCss)];

  declare placeholder: string | undefined;
  declare rows: number;

  constructor() {
    super();
    this.rows = 4;
  }

  protected renderControl(describedBy?: string) {
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

declare global {
  interface HTMLElementTagNameMap {
    "imdz-textarea": ImdzTextarea;
  }
}
