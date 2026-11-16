import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import type {
  CSSResultGroup,
  PropertyDeclarations,
  PropertyValues,
  TemplateResult,
} from "lit";
import { fieldCss } from "./styles.generated";

/**
 * Base for the text fields (input, textarea, select): label, hint, error and
 * form participation like a native control.
 */
export abstract class ImdzFormField extends LitElement {
  static formAssociated = true;

  // Open type so subclasses declare only their own properties.
  static properties: PropertyDeclarations = {
    label: { type: String },
    hint: { type: String },
    error: { type: String },
    name: { type: String, reflect: true },
    value: { type: String },
    required: { type: Boolean },
    disabled: { type: Boolean, reflect: true },
  };

  static styles: CSSResultGroup = [
    unsafeCSS(fieldCss),
    css`
      :host {
        display: block;
      }
    `,
  ];

  declare label: string;
  declare hint: string;
  declare error: string;
  declare name: string;
  declare value: string;
  declare required: boolean;
  declare disabled: boolean;

  protected internals = this.attachInternals();

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

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("value")) this.internals.setFormValue(this.value);
  }

  protected handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  // "change" doesn't cross the shadow DOM on its own.
  protected handleChange() {
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /** The control must have id="input" and, if given, aria-describedby. */
  protected abstract renderControl(describedBy?: string): TemplateResult;

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
