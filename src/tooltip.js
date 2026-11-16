import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define.js";
import { tooltipCss } from "./styles.generated.js";

/** Wraps an element and shows a short text on hover or focus. */
export class ImdzTooltip extends LitElement {
  static properties = {
    text: { type: String },
  };

  static styles = [
    unsafeCSS(tooltipCss),
    css`
      :host {
        display: inline-flex;
      }
    `,
  ];

  constructor() {
    super();
    this.text = "";
  }

  render() {
    return html`
      <span class="tooltip">
        <slot></slot>
        <span class="bubble" role="tooltip">${this.text}</span>
      </span>
    `;
  }
}

define("imdz-tooltip", ImdzTooltip);

