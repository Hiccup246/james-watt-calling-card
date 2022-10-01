class JamesWattCallingCard extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [
      "height",
      "text-color",
      "bg-color",
      "modal-bg-color",
      "modal-text-color",
      "border-color",
      "font-aspect-ratio",
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue == newValue) return;

    if (name == "height") {
      this.style.setProperty(`--${name}`, `${newValue}px`);

      this.style.setProperty(
        "--font-aspect-ratio",
        `calc(var(--height) / 2.5)`
      );
    } else {
      this.style.setProperty(`--${name}`, newValue);
    }
  }

  disconnectedCallback() {
    if (!this.modal && !this.callingCardButton) return;

    this.modal.removeEventListener("click", this.openModalSignature);
    this.callingCardButton.removeEventListener(
      "click",
      this.closeModalSignature
    );
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const modalBackdrop = this.setupModalBackdrop();
    this.modal = this.setupModal();

    this.setupCssVariables();
    this.setupGoogleFonts(shadow);

    const callingCard = document.createElement("div");
    callingCard.setAttribute("class", "calling-card");

    this.callingCardButton = callingCard.appendChild(
      document.createElement("button")
    );
    this.callingCardButton.innerText = "watt?";
    this.callingCardButton.setAttribute("class", "calling-card__button");

    const cardAspectRatio = "2 / 1";

    const style = document.createElement("style");
    style.innerHTML = `
      .calling-card {
        background-color: var(--bg-color);
        height: var(--height);
        border: 2px solid var(--border-color);
        aspect-ratio: ${cardAspectRatio};
        display: flex;
      }

      .calling-card__button {
        color: var(--text-color);
        text-decoration: none;
        font-size: var(--font-aspect-ratio);
        margin: auto auto;
        background-color: unset;
        border: none;
      }

      .calling-card__button:hover {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: var(--text-color);
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
        margin: 0;
      }

      .modal__modal-dialog {
        position: relative;
        width: auto;
        margin: 0.5rem;
        pointer-events: none;
        background-color: white;
        font-size: 1rem;
        z-index: 1060;
        margin: 0.5rem;
      }

      @media (min-width: 576px) {
         .modal__modal-dialog {
            max-width: 500px;
            margin-right: auto;
            margin-left: auto;
        }
      }

      .modal__modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        pointer-events: auto;
        background-clip: padding-box;
        outline: 0;
        border: 2px solid var(--border-color);
        text-align: center;
        padding: 10px;
        color: var(--modal-text-color);
        background-color: var(--modal-bg-color);
      }

      .portfolio-link {
        margin-top: 16px;
        color: var(--modal-text-color);
        text-decoration-color: var(--modal-text-color);
        text-underline-offset: 0.2em;
        transition: text-decoration-thickness 1s linear, text-underline-offset 1s linear;
      }

      .portfolio-link:hover {
        text-decoration-thickness: 2px;
        text-underline-offset: 1px;
      }

      * {
        box-sizing: border-box;
        font-family: 'Space Mono', monospace;
      }
    `;

    this.openModalSignature = (event) =>
      this.closeModal(event, this.modal, modalBackdrop);

    this.closeModalSignature = (event) =>
      this.openModal(event, shadow, style, this.modal, modalBackdrop);

    this.modal.addEventListener("click", this.openModalSignature);
    this.callingCardButton.addEventListener("click", this.closeModalSignature);

    shadow.append(style, this.modal);
    shadow.append(style, callingCard);
  }

  setupCssVariables() {
    this.style.setProperty(
      "--height",
      `${this.getAttribute("height") || "60"}px`
    );
    this.style.setProperty(
      "--text-color",
      this.getAttribute("text-color") || "#000000"
    );
    this.style.setProperty(
      "--bg-color",
      this.getAttribute("bg-color") || "#FAF1E3"
    );
    this.style.setProperty(
      "--modal-bg-color",
      this.getAttribute("modal-bg-color") || "#FAF1E3"
    );
    this.style.setProperty(
      "--modal-text-color",
      this.getAttribute("modal-text-color") || "#000000"
    );
    this.style.setProperty(
      "--border-color",
      this.getAttribute("border-color") || "#000000"
    );
    this.style.setProperty("--font-aspect-ratio", `calc(var(--height) / 2.5)`);
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
    modalDialog.setAttribute("class", "modal__modal-dialog");

    const modalContent = modalDialog.appendChild(document.createElement("div"));
    modalContent.setAttribute("class", "modal__modal-content");

    const contentLine1 = modalContent.appendChild(document.createElement("p"));
    contentLine1.innerText = "Curious one aren't you?";

    const contentLine2 = modalContent.appendChild(document.createElement("p"));
    contentLine2.innerText =
      "You have clicked on the calling card for the creator of this site...James.Watt";

    const portfolioLink = modalContent.appendChild(document.createElement("a"));
    portfolioLink.setAttribute("class", "portfolio-link");
    portfolioLink.setAttribute("href", "https://www.jameswatt.io/");
    portfolioLink.innerText = "-> Continue to his portfolio <-";

    return modal;
  }

  setupGoogleFonts(shadow) {
    const googleFontApi = document.createElement("link");
    googleFontApi.setAttribute("rel", "preconnect");
    googleFontApi.setAttribute("href", "https://fonts.googleapis.com");

    const googleFontGstatic = document.createElement("link");
    googleFontGstatic.setAttribute("rel", "preconnect");
    googleFontGstatic.setAttribute("href", "https://fonts.gstatic.com");
    googleFontGstatic.setAttribute("crossorigin", "");

    const googleFont = document.createElement("link");
    googleFont.setAttribute(
      "href",
      "https://fonts.googleapis.com/css2?family=Oswald&family=Space+Mono&display=swap"
    );
    googleFont.setAttribute("rel", "stylesheet");

    shadow.appendChild(googleFontApi);
    shadow.appendChild(googleFontGstatic);
    shadow.appendChild(googleFont);
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
