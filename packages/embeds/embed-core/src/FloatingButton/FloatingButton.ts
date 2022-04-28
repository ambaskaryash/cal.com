import { CalWindow } from "@calcom/embed-snippet";

import getFloatingButtonHtml from "./FloatingButtonHtml";

export class FloatingButton extends HTMLElement {
  //@ts-ignore
  static get observedAttributes() {
    return ["data-button-text"];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name !== "data-button-text") {
      return;
    }
    const buttonEl = this.shadowRoot?.querySelector("#button");
    if (!buttonEl) {
      throw new Error("Button not found");
    }
    buttonEl.innerHTML = newValue;
  }
  constructor() {
    super();
    const buttonText = this.dataset["buttonText"] || "Book my Cal";
    const buttonHtml = `<style>${(window as CalWindow).Cal!.__css}</style> ${getFloatingButtonHtml({
      buttonText: buttonText,
    })}`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = buttonHtml;
  }
}
