import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define.js";
import { dialogCss } from "./styles.generated.js";

/**
 * Modal dialog built on the native <dialog>.
 *
 * @fires close - When it closes, from code, with Escape or with the close button.
 */
export class ImdzDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    heading: { type: String },
    closeLabel: { type: String, attribute: "close-label" },
    hasFooter: { state: true },
  };

  static styles = [
    unsafeCSS(dialogCss),
    css`
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
    this.open = false;
    this.heading = "";
    this.closeLabel = "Close";
    this.hasFooter = false;
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  updated(changed) {
    if (!changed.has("open")) return;
    const element = this.renderRoot.querySelector("dialog");
    if (!element) return;
    if (this.open && !element.open) element.showModal();
    if (!this.open && element.open) element.close();
  }

  handleClose() {
    this.open = false;
    this.dispatchEvent(new Event("close"));
  }

  handleFooterChange(event) {
    const slot = event.target;
    this.hasFooter = slot.assignedElements().length > 0;
  }

  render() {
    return html`
      <dialog
        class="dialog"
        aria-labelledby="title"
        @close=${this.handleClose}
      >
        <header class="header">
          <h2 id="title" class="title">${this.heading}</h2>
          <button
            class="close"
            type="button"
            aria-label=${this.closeLabel}
            @click=${this.close}
          >
            &times;
          </button>
        </header>
        <div class="body"><slot></slot></div>
        <footer class="footer" ?hidden=${!this.hasFooter}>
          <slot name="footer" @slotchange=${this.handleFooterChange}></slot>
        </footer>
      </dialog>
    `;
  }
}

define("imdz-dialog", ImdzDialog);

