import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define.js";
import { badgeCss } from "./styles.generated.js";

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

