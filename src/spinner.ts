import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define";
import { spinnerCss } from "./styles.generated";

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
  declare label: string;
  declare size: "md" | "lg";

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

declare global {
  interface HTMLElementTagNameMap {
    "imdz-spinner": ImdzSpinner;
  }
}
