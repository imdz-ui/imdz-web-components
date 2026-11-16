import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { define } from "./define.js";
import { progressCss } from "./styles.generated.js";

export class ImdzProgress extends LitElement {
  static properties = {
    value: { type: Number },
    max: { type: Number },
    label: { type: String },
  };

  static styles = [
    unsafeCSS(progressCss),
    css`
      :host {
        display: block;
      }
    `,
  ];

  constructor() {
    super();
    this.value = 0;
    this.max = 100;
    this.label = "";
  }

  render() {
    const ratio = this.max > 0 ? this.value / this.max : 0;
    const percent = Math.round(Math.min(Math.max(ratio, 0), 1) * 100);

    return html`
      <div class="progress">
        ${this.label
          ? html`<div class="header">
              <span>${this.label}</span>
              <span>${percent}%</span>
            </div>`
          : nothing}
        <div
          class="track"
          role="progressbar"
          aria-label=${ifDefined(this.label || undefined)}
          aria-valuemin="0"
          aria-valuemax=${this.max}
          aria-valuenow=${this.value}
        >
          <div
            class="bar"
            style="--imdz-progress-value: ${percent}%"
          ></div>
        </div>
      </div>
    `;
  }
}

define("imdz-progress", ImdzProgress);

