import { LitElement, css, html, unsafeCSS } from "lit";
import { define } from "./define";
import { buttonCss } from "./styles.generated";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export class ImdzButton extends LitElement {
  static properties = {
    variant: { type: String },
    size: { type: String },
    type: { type: String },
    href: { type: String },
    disabled: { type: Boolean, reflect: true },
  };

  static styles = [
    unsafeCSS(buttonCss),
    css`
      :host {
        display: inline-block;
      }
      :host([disabled]) {
        pointer-events: none;
      }
    `,
  ];

  declare variant: ButtonVariant;
  declare size: ButtonSize;
  declare type: "button" | "submit" | "reset";
  declare href: string | undefined;
  declare disabled: boolean;

  constructor() {
    super();
    this.variant = "primary";
    this.size = "md";
    this.type = "button";
    this.disabled = false;
  }

  private get classes() {
    return [
      "button",
      this.variant !== "primary" && `${this.variant}`,
      this.size !== "md" && `${this.size}`,
    ]
      .filter(Boolean)
      .join(" ");
  }

  // A button inside the shadow DOM doesn't submit or reset the form that contains it.
  private handleClick() {
    const form = this.closest("form");
    if (!form) return;
    if (this.type === "submit") form.requestSubmit();
    if (this.type === "reset") form.reset();
  }

  render() {
    if (this.href && !this.disabled) {
      return html`<a class=${this.classes} href=${this.href}><slot></slot></a>`;
    }

    return html`
      <button
        class=${this.classes}
        type="button"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

define("imdz-button", ImdzButton);

declare global {
  interface HTMLElementTagNameMap {
    "imdz-button": ImdzButton;
  }
}
