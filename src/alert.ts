import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { define } from "./define";
import { alertCss } from "./styles.generated";

export type AlertVariant = "info" | "success" | "warning" | "danger";

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

  declare variant: AlertVariant;
  declare heading: string;

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

declare global {
  interface HTMLElementTagNameMap {
    "imdz-alert": ImdzAlert;
  }
}
