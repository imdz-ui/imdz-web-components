import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { define } from "./define.js";
import { ImdzFormField } from "./form-field.js";
import { selectCss } from "./styles.generated.js";

/**
 * Options are written as <option> children of the element. A <select> inside
 * the shadow DOM can't get them through a slot, so they're copied.
 */
export class ImdzSelect extends ImdzFormField {
  static properties = {
    options: { state: true },
  };

  static styles = [
    ImdzFormField.styles,
    unsafeCSS(selectCss),
  ];

  observer = new MutationObserver(() => this.readOptions());

  constructor() {
    super();
    this.options = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.readOptions();
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  readOptions() {
    const elements = Array.from(this.querySelectorAll("option"));
    this.options = elements.map((option) => ({
      value: option.value,
      label: option.textContent?.trim() ?? "",
      disabled: option.disabled,
    }));

    if (!this.value) {
      const initial =
        elements.find((option) => option.hasAttribute("selected")) ??
        elements[0];
      if (initial) this.value = initial.value;
    }
  }

  renderControl(describedBy) {
    return html`
      <select
        id="input"
        class="input select"
        ?required=${this.required}
        ?disabled=${this.disabled}
        aria-invalid=${this.error ? "true" : "false"}
        aria-describedby=${ifDefined(describedBy)}
        @input=${this.handleInput}
        @change=${this.handleChange}
      >
        ${this.options.map(
          (option) => html`
            <option
              value=${option.value}
              ?selected=${option.value === this.value}
              ?disabled=${option.disabled}
            >
              ${option.label}
            </option>
          `,
        )}
      </select>
    `;
  }
}

define("imdz-select", ImdzSelect);

