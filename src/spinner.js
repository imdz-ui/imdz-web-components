import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define.js";
import { spinnerCss } from "./styles.generated.js";

export class ImdzSpinner extends LitElement {
  static properties = {
    label: { type: String },
    size: { type: String },
  };

  static styles = [
    unsafeCSS(spinnerCss),
    css`
      :host {
        display: inline-flex;
      }
    `,
  ];

  /** Text for screen readers. */

  constructor() {
    super();
    this.label = "Loading";
    this.size = "md";
  }

  render() {
    const modifier = this.size === "lg" ? " lg" : "";
    return html`<span
      class="spinner${modifier}"
      role="status"
      aria-label=${this.label}
    ></span>`;
  }
}

define("imdz-spinner", ImdzSpinner);

