import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { fieldCss } from "./styles.generated.js";

/**
 * Base for the text fields (input, textarea, select): label, hint, error and
 * form participation like a native control.
 */
export class ImdzFormField extends LitElement {
  static formAssociated = true;

  // Open type so subclasses declare only their own properties.
  static properties = {
    label: { type: String },
    hint: { type: String },
    error: { type: String },
    name: { type: String, reflect: true },
    value: { type: String },
    required: { type: Boolean },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = [
    unsafeCSS(fieldCss),
    css`
      :host {
        display: block;
      }
    `,
  ];

  internals = this.attachInternals();

  constructor() {
    super();
    this.label = "";
    this.hint = "";
    this.error = "";
    this.name = "";
    this.value = "";
    this.required = false;
    this.disabled = false;
  }

  updated(changed) {
    if (changed.has("value")) this.internals.setFormValue(this.value);
  }

  handleInput(event) {
    this.value = event.target.value;
  }

  // "change" doesn't cross the shadow DOM on its own.
  handleChange() {
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // Each subclass defines renderControl(describedBy): the control must have
  // id="input" and, if given, aria-describedby.

  render() {
    const message = this.error || this.hint;

    return html`
      <div class="field">
        ${this.label
          ? html`<label class="label" for="input">${this.label}</label>`
          : nothing}
        ${this.renderControl(message ? "message" : undefined)}
        ${message
          ? html`<p
              id="message"
              class=${this.error ? "error" : "hint"}
            >
              ${message}
            </p>`
          : nothing}
      </div>
    `;
  }
}
