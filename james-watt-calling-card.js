class JamesWattCallingCard extends HTMLElement {
  constructor() {
    super();
  }

  disconnectedCallback() {}

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    this.setupGoogleFonts(shadow);
    this.setupModal(shadow);
    this.setupCard(shadow);
    // this.setupOldModal(shadow);
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

  setupModal(shadow) {
    //bootstrap approach
    const modalBackdrop = document.createElement("div");
    modalBackdrop.setAttribute("class", "modal-backdrop");

    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");

    const modalDialog = modal.appendChild(document.createElement("div"));
    modalDialog.setAttribute("class", "modal-dialog");

    const modalText = modalDialog.appendChild(document.createElement("p"));
    modalText.innerText = "Testing the internal text";

    // Bootstrap work todo
    // Add an event listener to our button to open the modal
    // Opening the modal
    // - Adds the modal backdrop from the drop (Opposite is removing it from the DOM)
    // - Adds overflow: hidden to the document body (Opposite is that it is removed)
    // - Adds display: block to the modal (opposite is display: none)
    // Center align the modal

    const style = document.createElement("style");
    style.textContent = `
      .modal-backdrop {
        opacity: 0.5;
        z-index: 1000;
        background-color: black;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        transition: opacity, .15s, linear;
      }

      .modal {
        z-index: 1001;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        outline: 0;
        padding: 1rem;
        margin: 0.5rem;
      }

      .modal-dialog {
        position: relative;
        width: auto;
        margin: 0.5rem;
        pointer-events: none;
        background-color: white;
        font-size: 1rem;
      }

      * {
        box-sizing: border-box;
      }
    `;

    shadow.append(style, modalBackdrop);
    shadow.append(style, modal);
  }

  setupCard(shadow) {
    // Work ToDo
    // Update calling card width and height to be account for box-sizing: border-box

    // Create card element
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    // Setting the card anchor text
    const cardAnchor = card.appendChild(document.createElement("a"));
    cardAnchor.innerText = "watt?";
    cardAnchor.setAttribute("href", "https://www.jameswatt.io/");
    cardAnchor.setAttribute("class", "card-anchor");

    // We want to read in three different attributes
    // Height - Height of the card (Pixels)
    // Text color - Color of the card text (Hex format)
    // Background color - Background color of the card (Hex format)
    const cardHeight = this.getAttribute("height") || "30";
    const textColor = this.getAttribute("text-color") || "#000000";
    const cardColor = this.getAttribute("card-color") || "#FAF1E3";

    const cardAspectRatio = "2 / 1";
    const fontApectRatio = `calc(${cardHeight}px + 20px) / 2.5`;

    // Create some CSS to apply to the shadow DOM
    const style = document.createElement("style");
    style.textContent = `
      .card {
        background-color: ${cardColor};
        height: ${cardHeight}px;
        padding: 10px 15px;
        border: 2px solid ${textColor};
        aspect-ratio: ${cardAspectRatio};
        display: flex;
      }

      .card-anchor {
        color: ${textColor};
        text-decoration: none;
        font-family: 'Space Mono', monospace;
        font-size: calc(${fontApectRatio});
        margin: auto auto;
      }

      .card-anchor:hover {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: ${textColor};
      }

      * {
        box-sizing: border-box;
      }
    `;

    shadow.append(style, card);
  }

  setupOldModal(shadow) {
    // Create modal
    const modal = document.createElement("div");
    modal.setAttribute("class", "card-modal");
    const modalContent = modal.appendChild(document.createElement("div"));
    modalContent.setAttribute("class", "card-modal-content");
    const modalTextOne = modalContent.appendChild(document.createElement("p"));
    modalTextOne.innerText = "Curious one aren't you?";
    const modalTextTwo = modalContent.appendChild(document.createElement("p"));
    modalTextTwo.innerText =
      "You have clicked on the calling card for the creator of this site...James. Watt";
    const modalAnchor = modalContent.appendChild(document.createElement("a"));
    modalAnchor.setAttribute("class", "modal-anchor");
    modalAnchor.innerText = "Continue to his portfolio";

    const style = document.createElement("style");
    style.textContent = `
      .card-modal {
        width: 100%;
        height: 100%;
        background-color: white;
        background-color: hsla(0,0%,4%,.86);
        opacity: 0.7;
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
      }

      .card-modal-content {
        background-color: white;
        padding: 20px;
        width: fit-content;
        margin: auto auto;
        text-align: center;
        font-family: 'Space Mono', monospace;
        font-size: 1em;
        line-height: 1em;
        border: 2px solid black;
      }

      .modal-anchor {
        cursor: pointer;
        text-decoration: underline;
        text-decoration-color: black;
      }

      * {
        box-sizing: border-box;
      }
    `;

    shadow.appendChild(style, modal);
  }
}

customElements.define("james-watt-calling-card", JamesWattCallingCard);
