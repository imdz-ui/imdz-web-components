import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define.js";
import { avatarCss } from "./styles.generated.js";

export class ImdzAvatar extends LitElement {
  static properties = {
    name: { type: String },
    src: { type: String },
    size: { type: String },
  };

  static styles = [
    unsafeCSS(avatarCss),
    css`
      :host {
        display: inline-flex;
      }
    `,
  ];

  /** The person's name: gives the initials and the alt text. */

  constructor() {
    super();
    this.name = "";
    this.size = "md";
  }

  get initials() {
    return this.name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("");
  }

  render() {
    const classes = `avatar${this.size === "lg" ? " lg" : ""}`;

    if (this.src) {
      return html`<span class=${classes}
        ><img src=${this.src} alt=${this.name}
      /></span>`;
    }

    return html`<span class=${classes} role="img" aria-label=${this.name}
      >${this.initials}</span
    >`;
  }
}

define("imdz-avatar", ImdzAvatar);

