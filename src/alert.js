import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { define } from "./define.js";
import { alertCss } from "./styles.generated.js";

export class ImdzAlert extends LitElement {
  static properties = {
    variant: { type: String },
    heading: { type: String },
  };

  static styles = [
    unsafeCSS(alertCss),
    css`
      :host {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.variant = "info";
    this.heading = "";
  }

  render() {
    const modifier = this.variant === "info" ? "" : ` ${this.variant}`;

    return html`
      <div
        class="alert${modifier}"
        role=${this.variant === "danger" ? "alert" : "status"}
      >
        ${this.heading
          ? html`<p class="title">${this.heading}</p>`
          : nothing}
        <div><slot></slot></div>
      </div>
    `;
  }
}

define("imdz-alert", ImdzAlert);

