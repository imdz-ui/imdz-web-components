import { LitElement, css, html, unsafeCSS } from "lit";
import type { PropertyValues } from "lit";
import { define } from "./define";
import { tabsCss } from "./styles.generated";

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

  declare label: string;
  declare active: boolean;

  constructor() {
    super();
    this.label = "";
    this.active = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tabpanel");
  }

  protected updated(changed: PropertyValues<this>) {
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

  declare selected: number;
  declare labels: string[];

  constructor() {
    super();
    this.selected = 0;
    this.labels = [];
  }

  private get panels() {
    return Array.from(this.querySelectorAll<ImdzTab>(":scope > imdz-tab"));
  }

  private syncPanels() {
    const panels = this.panels;
    this.labels = panels.map((panel) => panel.label);
    panels.forEach((panel, index) => {
      panel.active = index === this.selected;
    });
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("selected")) this.syncPanels();
  }

  private select(index: number) {
    if (index === this.selected) return;
    this.selected = index;
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  private async handleKeydown(event: KeyboardEvent) {
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
      .querySelector<HTMLElement>('[aria-selected="true"]')
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

declare global {
  interface HTMLElementTagNameMap {
    "imdz-tab": ImdzTab;
    "imdz-tabs": ImdzTabs;
  }
}
