import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define";
import { badgeCss } from "./styles.generated";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export class ImdzBadge extends LitElement {
  static properties = {
    variant: { type: String },
  };

  static styles = [
    unsafeCSS(badgeCss),
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  declare variant: BadgeVariant;

  constructor() {
    super();
    this.variant = "neutral";
  }

  render() {
    const modifier =
      this.variant === "neutral" ? "" : ` ${this.variant}`;
    return html`<span class="badge${modifier}"><slot></slot></span>`;
  }
}

define("imdz-badge", ImdzBadge);

declare global {
  interface HTMLElementTagNameMap {
    "imdz-badge": ImdzBadge;
  }
}
