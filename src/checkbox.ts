import { LitElement, css, html, unsafeCSS } from "lit";
import type { CSSResultGroup, PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { define } from "./define";
import { checkboxCss } from "./styles.generated";

/**
 * Checkbox that takes part in forms. The label goes as content.
 *
 * @fires change - When checked or unchecked.
 */
export class ImdzCheckbox extends LitElement {
  static formAssociated = true;

  static properties = {
    name: { type: String, reflect: true },
    value: { type: String },
    checked: { type: Boolean, reflect: true },
    required: { type: Boolean },
    disabled: { type: Boolean, reflect: true },
  };

  static styles: CSSResultGroup = [
    unsafeCSS(checkboxCss),
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  declare name: string;
  declare value: string;
  declare checked: boolean;
  declare required: boolean;
  declare disabled: boolean;

  private internals = this.attachInternals();

  constructor() {
    super();
    this.name = "";
    this.value = "on";
    this.checked = false;
    this.required = false;
    this.disabled = false;
  }

  /** CSS block the element uses. */
  protected get block() {
    return "checkbox";
  }

  /** ARIA role of the input, if it isn't a checkbox's. */
  protected get inputRole(): string | undefined {
    return undefined;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("checked") || changed.has("value")) {
      this.internals.setFormValue(this.checked ? this.value : null);
    }
  }

  private handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  render() {
    return html`
      <label class=${this.block}>
        <input
          class="input"
          type="checkbox"
          role=${ifDefined(this.inputRole)}
          .checked=${this.checked}
          ?required=${this.required}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
        />
        <span><slot></slot></span>
      </label>
    `;
  }
}

define("imdz-checkbox", ImdzCheckbox);

declare global {
  interface HTMLElementTagNameMap {
    "imdz-checkbox": ImdzCheckbox;
  }
}
