# 🃏 James Watt Calling Card
![](https://img.shields.io/github/license/Hiccup246/james-watt-calling-card)
![](https://img.shields.io/github/languages/code-size/Hiccup246/james-watt-calling-card)

This project represents a digital "calling card" for the owner of this repository James Watt.

![](https://i.imgur.com/N4Fkm0t.gif)

<br>

# Description
This project is a small framework agnostic web component with the following features:
- A small styled card which when clicked opens a modal
- A modal which dims the background and disables scrolling
- A modal which provides a link to the personal portfolio of James Watt.


This allows any project to conveniently, consistently and in an accessible manner direct curious users back to the James Watt portfolio site. The goal/purpose being to:
- Improve SEO for the James Watt portfolio site by increasing the number of backlinks to it
- To help establish a consistent brand for James Watt
- To aid in my own understanding of web components and npm

<br>

# Usage
To add this web component to a project you can install it using `npm` with the command:
```
npm install james-watt-calling-card
```
You can then use the web component in a html template in the same way you would create a regular html tag.
```html
<james-watt-calling-card>
</james-watt-calling-card>
```

<br>

# Development
To run this project for development purposes you need to install a development server and serve a html file with the web component. I would reccomend [live-server](https://github.com/tapio/live-server). A small server with live reload capability.

Once you have installed a development server you can create a html file with the web component. I would reccomend creating this html file in the root of the project and naming it ```index.html```. An example is shown below which re-creates the site from the gif at the start of this README.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="module" src="./index.js" defer></script>
</head>
<body>
  <h1 class="center-align">
    Custom James.Watt calling card
  </h1>
  <div class="center-align">
    <james-watt-calling-card></james-watt-calling-card>
  </div>
</body>
<style>
  .center-align {
    margin: auto auto;
    width: fit-content;
    margin-bottom: 20px;
  }
</style>
</html>
```
Finally, you can serve this file. If you are using live-server and have created an ```index.html``` file in the root of the project this can be done by:
- Navigating to the root of the project
- Executing the command ```live-server``` (This will automatically serve any ```index.html``` files in the root)

<br>

# TODO
- Think about what should and should not be attributes
  - Namely the height attribute. This should perhaps be inherited from its parent component. This way the hieght is controlled dynamically via css and not attributes. Perhaps take a look at other components with height attributes and draw comparisons. For example, the img tag has a height attribute.
- Turn git repo into a shareable npm package
  - Publish NPM module

- Update this readme with commands for local development
- Maybe turn entire project to typescript
