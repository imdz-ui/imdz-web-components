import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define";
import { accordionCss } from "./styles.generated";

const hostStyles = css`
  :host {
    display: block;
  }
`;

/**
 * Collapsible section of <imdz-accordion>, built on the native <details>.
 *
 * @fires toggle - When it opens or closes. The state is in `open`.
 */
export class ImdzAccordionItem extends LitElement {
  static properties = {
    heading: { type: String },
    open: { type: Boolean, reflect: true },
  };

  static styles = [unsafeCSS(accordionCss), hostStyles];

  declare heading: string;
  declare open: boolean;

  constructor() {
    super();
    this.heading = "";
    this.open = false;
  }

  /**
   * Before the section opens (the click on its summary, also with the
   * keyboard), the group can close the others in the same frame. Waiting for
   * the toggle event would paint both open for a moment.
   */
  private handleSummaryClick() {
    if (this.open) return;
    this.dispatchEvent(new Event("imdz-accordion-opening", { bubbles: true }));
  }

  /** Closes the section right away, without waiting for the next render. */
  close() {
    const details = this.shadowRoot?.querySelector("details");
    if (details) details.open = false;
    this.open = false;
  }

  private handleToggle(event: Event) {
    const open = (event.target as HTMLDetailsElement).open;
    if (open === this.open) return;
    this.open = open;
    this.dispatchEvent(new Event("toggle", { bubbles: true }));
  }

  render() {
    return html`
      <details
        class="item"
        ?open=${this.open}
        @toggle=${this.handleToggle}
      >
        <summary class="summary" @click=${this.handleSummaryClick}>${this.heading}</summary>
        <div class="content"><slot></slot></div>
      </details>
    `;
  }
}

/**
 * Group of <imdz-accordion-item>. With `name`, only one section can be open at
 * a time, like the React Accordion. The native <details name> can't do it here:
 * each item has its <details> in its own shadow DOM.
 */
export class ImdzAccordion extends LitElement {
  static properties = {
    name: { type: String },
  };

  static styles = [unsafeCSS(accordionCss), hostStyles];

  declare name: string | undefined;

  constructor() {
    super();
    const closeOthers = (event: Event) => {
      const opening = event.target;
      if (!this.name || !(opening instanceof ImdzAccordionItem)) return;
      for (const item of this.querySelectorAll("imdz-accordion-item")) {
        if (item !== opening && item.open) item.close();
      }
    };
    // On click, before the browser paints; on toggle, for sections opened
    // from code (item.open = true).
    this.addEventListener("imdz-accordion-opening", closeOthers);
    this.addEventListener("toggle", (event) => {
      if ((event.target as ImdzAccordionItem).open) closeOthers(event);
    });
  }

  render() {
    return html`<div class="accordion"><slot></slot></div>`;
  }
}

define("imdz-accordion-item", ImdzAccordionItem);
define("imdz-accordion", ImdzAccordion);

declare global {
  interface HTMLElementTagNameMap {
    "imdz-accordion-item": ImdzAccordionItem;
    "imdz-accordion": ImdzAccordion;
  }
}
