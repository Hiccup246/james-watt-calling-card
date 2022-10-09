# 🃏 James Watt Calling Card
![](https://img.shields.io/github/license/Hiccup246/james-watt-calling-card)
![](https://img.shields.io/github/languages/code-size/Hiccup246/james-watt-calling-card)
![](https://img.shields.io/npm/v/james-watt-calling-card)
![](https://img.shields.io/snyk/vulnerabilities/npm/james-watt-calling-card)
![](https://img.shields.io/librariesio/release/npm/james-watt-calling-card)

This project represents a digital "calling card" for the owner of this repository James Watt.

![](https://i.imgur.com/pdzQlyL.gif)

<br>

# Description
This project is a small framework-agnostic web component that when clicked on activates a modal with a blurb about James Watt and a link to his portfolio. 

The web component is designed to "wrap" any element after which it adds a click handler to activate the modal. The modal itself can be styled and when activated dims the background and disables scrolling by modifying the documents `<body>`. An example is shown below:
```html
<james-watt-calling-card>
  <p>Made By James Watt</p>
</james-watt-calling-card>
```

This allows any project in an accessible, flexible and convenient manner to direct curious users back to the James Watt portfolio site. The goals of this functionality are:
- Improve SEO for the James Watt portfolio site by increasing the number of backlinks to it
- To help establish a consistent brand for James Watt
- To develop my understanding of web components and npm

# Component Attributes
The component itself has a variety of color attributes which should be set in HEX format and allow for cosmetic modification.
- `modal-bg-color`
- `modal-text-color`
- `modal-border-color`

Applying all these attributes would result in a component instantiation of:
```html
<james-watt-calling-card
  modal-bg-color="#000"
  modal-text-color="#000"
  modal-border-color="#000">
</james-watt-calling-card>
```

<br>

# Usage
There are two methods of adding this web component to a project.
- Using a `script` tag
- Client-side import

I highly recommend the first method as it is less complex and easier to understand/maintain.

## Using a script tag
This method works for all types of frontend frameworks and involves adding a script tag to load the web component.
```html
<head>
  <script 
    type="module" 
    src="https://unpkg.com/james-watt-calling-card@1.0.0/index.js">
</head>

<body>
  <james-watt-calling-card>
    <p>Hello World</p>
  </james-watt-calling-card>
</body>
```

## Client-side import
The second method is specific to frontend frameworks which can execute imports on the client side. In other words, if you are purely using server-side rendering (SSR) this method will not work due to the web component relying upon client-only functionality and will result in errors such as `ReferenceError: HTMLElement is not defined`.

First, you install the web components npm package using the command:
```
npm install james-watt-calling-card
```

You must then dynamically import the web component once the code is run on the client side. An example of this is shown below using the [svelte](https://svelte.dev) framework.

```javascript
  onMount(() => {
    import("james-watt-calling-card");
  })
```

This code utilises sveltes `onMount` function which is run once the component is rendered to the DOM i.e. once the code has been delivered to the client.


<br>

# Development
To run this project for development purposes you need to install a development server and serve an HTML file with the web component. I would recommend [live-server](https://github.com/tapio/live-server). A small server with live reload capability.

Once you have installed a development server you can create an HTML file and add the web component via a `script` tag. I would recommend creating this HTML file in the root of the project and naming it ```index.html```. An example is shown below which re-creates the site from the gif at the start of this README.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="module" src="./index.js"></script>
</head>
<body style="height: 100vh; width: 100vw;">
  <h1 class="calling-card-wrapper">
    Custom James.Watt calling card
  </h1>

  <james-watt-calling-card class="calling-card-wrapper">
    Made by James. Watt
  </james-watt-calling-card>

  <james-watt-calling-card class="calling-card-wrapper">
    <img src="https://via.placeholder.com/150">
  </james-watt-calling-card>
</body>
<style>
  .calling-card-wrapper {
    margin: 30px auto;
    width: fit-content;
    display: block;
  }

  james-watt-calling-card:hover {
    text-decoration: underline;
  }
</style>
</html>
```
Finally, you can serve this file. If you are using live-server and have created an ```index.html``` file in the root of the project this can be done by:
- Navigating to the root of the project
- Executing the command ```live-server``` (This will automatically serve any ```index.html``` files in the root)