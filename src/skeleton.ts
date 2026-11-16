import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define";
import { skeletonCss } from "./styles.generated";

/** Loading placeholder. Size it with width and height on the element. */
export class ImdzSkeleton extends LitElement {
  static styles = [
    unsafeCSS(skeletonCss),
    css`
      :host {
        display: block;
        height: 1rem;
      }
      .skeleton {
        height: 100%;
      }
    `,
  ];

  render() {
    return html`<span class="skeleton" aria-hidden="true"></span>`;
  }
}

define("imdz-skeleton", ImdzSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    "imdz-skeleton": ImdzSkeleton;
  }
}
