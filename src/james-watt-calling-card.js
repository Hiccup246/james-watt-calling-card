class JamesWattCallingCard extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [
      "modal-bg-color",
      "modal-text-color",
      "modal-border-color"
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue) return;
    this.style.setProperty(`--${name}`, newValue);
  }

  disconnectedCallback() {
    if (!this.modal && !this.slotElement) return;

    this.modal.removeEventListener("click", this.openModalSignature);
    this.slotElement.removeEventListener(
      "click",
      this.closeModalSignature
    );
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const modalBackdrop = this.setupModalBackdrop();
    this.modal = this.setupModal();

    this.slotElement = document.createElement("slot");
    this.slotElement.setAttribute("class", "slot")

    const style = document.createElement("style");
    style.innerText = `
      @font-face {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/Oswald-Regular.woff') format('woff');
      }

      @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/SpaceMono-Regular.woff2') format('woff2');
      }
    
      :host {
        --modal-bg-color: ${this.getAttribute("modal-bg-color") || "#FAF1E3"};
        --modal-text-color: ${this.getAttribute("modal-text-color") || "#000000"};
        --modal-border-color: ${this.getAttribute("modal-border-color") || "#000000"};
      }

      .slot {
        cursor: pointer;
      }

      .modal-backdrop {
        display: block;
        z-index: 1050;
        background-color: black;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0.5;
        transition: opacity 3s linear;
      }

      .modal {
        z-index: 1055;
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        outline: 0;
        padding: 0;
        font-family: 'Space Mono', monospace;
      }

      .modal-dialog {
        position: relative;
        width: auto;
        margin: 50px 0.5rem 0.5rem 0.5rem;
        pointer-events: none;
        background-color: white;
        font-size: 1rem;
        z-index: 1060;
      }

      @media (min-width: 576px) {
         .modal-dialog {
            max-width: 500px;
            margin-right: auto;
            margin-left: auto;
        }
      }

      .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-clip: padding-box;
        outline: 0;
        border: 2px solid var(--modal-border-color);
        text-align: center;
        padding: 10px;
        color: var(--modal-text-color);
        background-color: var(--modal-bg-color);
      }

      .portfolio-cta {
        display: flex;
        justify-content: center;
      }

      .portfolio-cta .left-arrow {
        order: 1;
        transition: all 0.5s;
      }

      .portfolio-cta .right-arrow {
        order: 3;
        transition: all 0.5s;
      }

      .portfolio-cta .link {
        order: 2;
        width: fit-content;
        margin: auto 0;
        color: var(--modal-text-color);
        text-decoration-color: var(--modal-text-color);
        text-decoration: underline;
      }

      .portfolio-cta .link:hover + .left-arrow {
        transform: translateX(6px);
      }

      .portfolio-cta .link:hover ~ .right-arrow {
        transform: translateX(-6px);
      }

      * {
        box-sizing: border-box;
      } 
    `;

    this.openModalSignature = (event) =>
      this.closeModal(event, this.modal, modalBackdrop);

    this.closeModalSignature = (event) =>
      this.openModal(event, shadow, style, this.modal, modalBackdrop);

    this.modal.addEventListener("click", this.openModalSignature);
    this.slotElement.addEventListener("click", this.closeModalSignature);

    shadow.append(style, this.modal);
    shadow.append(style, this.slotElement);
  }

  setupModalBackdrop() {
    const modalBackdrop = document.createElement("div");
    modalBackdrop.setAttribute("class", "modal-backdrop");

    return modalBackdrop;
  }

  setupModal() {
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");

    const modalDialog = modal.appendChild(document.createElement("div"));
    modalDialog.setAttribute("class", "modal-dialog");

    const modalContent = modalDialog.appendChild(document.createElement("div"));
    modalContent.setAttribute("class", "modal-content");

    const contentLine1 = modalContent.appendChild(document.createElement("p"));
    contentLine1.innerText = "Curious one aren't you?";

    const contentLine2 = modalContent.appendChild(document.createElement("p"));
    contentLine2.innerText =
      "You have clicked on the calling card for the creator of this site...James Watt";

    const portfolioLink = modalContent.appendChild(document.createElement("div"));
    portfolioLink.setAttribute("class", "portfolio-cta");

    const link = portfolioLink.appendChild(document.createElement("a"));
    link.setAttribute("class", "link");
    link.setAttribute("href", "https://www.jameswatt.io/");
    link.innerText = "Go to his portfolio";

    const leftArrow = portfolioLink.appendChild(document.createElement("p"));
    leftArrow.setAttribute("class", "left-arrow");
    leftArrow.innerHTML = "→&nbsp;";

    const rightArrow = portfolioLink.appendChild(document.createElement("p"));
    rightArrow.setAttribute("class", "right-arrow");
    rightArrow.innerHTML = "&nbsp;←";

    return modal;
  }

  openModal(_event, shadow, style, modal, modalBackdrop) {
    shadow.append(style, modalBackdrop);
    document.body.style.overflow = "hidden";
    modal.style.display = "block";
  }

  closeModal(event, modal, modalBackdrop) {
    if (event.target.classList[0] != "modal") return;

    modalBackdrop.remove();
    document.body.style.overflow = null;
    modal.style.display = "none";
  }
}

customElements.define("james-watt-calling-card", JamesWattCallingCard);

export { JamesWattCallingCard };
