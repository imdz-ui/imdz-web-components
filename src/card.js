import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { define } from "./define.js";
import { cardCss } from "./styles.generated.js";

export class ImdzCard extends LitElement {
  static properties = {
    heading: { type: String },
    hasFooter: { state: true },
  };

  static styles = [
    unsafeCSS(cardCss),
    css`
      :host {
        display: block;
      }
      [hidden] {
        display: none;
      }
      /* The content comes through a slot, so .body > :first-child and
         :last-child (no margin at the edges) can't reach it. Same result:
         slotted elements without margins and the space between them as a
         gap of 1em, like the margin of a paragraph. */
      .body {
        display: grid;
        gap: 1em;
      }
      .body ::slotted(*) {
        margin-block: 0;
      }
    `,
  ];

  constructor() {
    super();
    this.heading = "";
    this.hasFooter = false;
  }

  handleFooterChange(event) {
    const slot = event.target;
    this.hasFooter = slot.assignedElements().length > 0;
  }

  render() {
    return html`
      <div class="card">
        ${this.heading
          ? html`<h3 class="title">${this.heading}</h3>`
          : nothing}
        <div class="body"><slot></slot></div>
        <div class="footer" ?hidden=${!this.hasFooter}>
          <slot name="footer" @slotchange=${this.handleFooterChange}></slot>
        </div>
      </div>
    `;
  }
}

define("imdz-card", ImdzCard);

