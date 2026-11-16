import { css, unsafeCSS } from "lit";
import { ImdzCheckbox } from "./checkbox.js";
import { define } from "./define.js";
import { switchCss } from "./styles.generated.js";

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

  get block() {
    return "switch";
  }

  get inputRole() {
    return "switch";
  }
}

define("imdz-switch", ImdzSwitch);

