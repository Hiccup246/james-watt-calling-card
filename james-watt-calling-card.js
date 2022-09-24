class JamesWattCallingCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

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

    // Apply external styles to the shadow DOM
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
    `;

    this.shadowRoot.append(style, card);
    this.shadowRoot.append(style, modal);
  }
}

customElements.define("james-watt-calling-card", JamesWattCallingCard);
