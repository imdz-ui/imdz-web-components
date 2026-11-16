import { fontsCss } from "./fonts.generated";
import { tokensCss } from "./styles.generated";

export function define(name: string, element: CustomElementConstructor) {
  if (!customElements.get(name)) customElements.define(name, element);
}

/**
 * Injects the fonts and the tokens into the page if they aren't there yet
 * (@font-face only works in the document, not inside a shadow root). They go
 * at the start of <head> with zero specificity, so any :root in the project
 * overrides them.
 */
export function injectTokens() {
  if (document.querySelector("style[data-imdz-tokens]")) return;
  const style = document.createElement("style");
  style.dataset.imdzTokens = "";
  style.textContent = `${fontsCss}\n${tokensCss}`;
  document.head.prepend(style);
}
