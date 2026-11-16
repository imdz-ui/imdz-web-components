import { css, unsafeCSS } from "lit";
import { ImdzCheckbox } from "./checkbox";
import { define } from "./define";
import { switchCss } from "./styles.generated";

/** Switch: a checkbox with a different look and the "switch" role. */
export class ImdzSwitch extends ImdzCheckbox {
  static styles = [
    unsafeCSS(switchCss),
    css`
      :host {
        display: inline-block;
      }
    `,
  ];

  protected get block() {
    return "switch";
  }

  protected get inputRole() {
    return "switch";
  }
}

define("imdz-switch", ImdzSwitch);

declare global {
  interface HTMLElementTagNameMap {
    "imdz-switch": ImdzSwitch;
  }
}
