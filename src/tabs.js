import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define.js";
import { tabsCss } from "./styles.generated.js";

/** Panel of <imdz-tabs>. Its label attribute is the tab's text. */
export class ImdzTab extends LitElement {
  static properties = {
    label: { type: String },
    active: { type: Boolean, reflect: true },
  };

  static styles = css`
    :host {
      display: block;
    }
    :host(:not([active])) {
      display: none;
    }
  `;

  constructor() {
    super();
    this.label = "";
    this.active = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tabpanel");
  }

  updated(changed) {
    if (changed.has("label")) this.setAttribute("aria-label", this.label);
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * @fires change - When the tab changes. The index is in `selected`.
 */
export class ImdzTabs extends LitElement {
  static properties = {
    selected: { type: Number },
    labels: { state: true },
  };

  static styles = [
    unsafeCSS(tabsCss),
    css`
      :host {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.selected = 0;
    this.labels = [];
  }

  get panels() {
    return Array.from(this.querySelectorAll(":scope > imdz-tab"));
  }

  syncPanels() {
    const panels = this.panels;
    this.labels = panels.map((panel) => panel.label);
    panels.forEach((panel, index) => {
      panel.active = index === this.selected;
    });
  }

  willUpdate(changed) {
    if (changed.has("selected")) this.syncPanels();
  }

  select(index) {
    if (index === this.selected) return;
    this.selected = index;
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  async handleKeydown(event) {
    const last = this.labels.length - 1;
    const next = {
      ArrowRight: this.selected === last ? 0 : this.selected + 1,
      ArrowLeft: this.selected === 0 ? last : this.selected - 1,
      Home: 0,
      End: last,
    }[event.key];

    if (next === undefined) return;
    event.preventDefault();
    this.select(next);
    await this.updateComplete;
    this.renderRoot
      .querySelector('[aria-selected="true"]')
      ?.focus();
  }

  render() {
    return html`
      <div class="tabs">
        <div
          class="list"
          role="tablist"
          @keydown=${this.handleKeydown}
        >
          ${this.labels.map(
            (label, index) => html`
              <button
                class="tab"
                type="button"
                role="tab"
                aria-selected=${index === this.selected ? "true" : "false"}
                tabindex=${index === this.selected ? 0 : -1}
                @click=${() => this.select(index)}
              >
                ${label}
              </button>
            `,
          )}
        </div>
        <div class="panel">
          <slot @slotchange=${this.syncPanels}></slot>
        </div>
      </div>
    `;
  }
}

define("imdz-tab", ImdzTab);
define("imdz-tabs", ImdzTabs);

