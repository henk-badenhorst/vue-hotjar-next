<p align="center">
  <img width="600" src="https://i.imgur.com/p1nLXFN.png">
  <br>
  <br>
  <span>
    <span>
      <a href="https://github.com/henk-badenhorst/vue-hotjar-next/actions/workflows/ci.yml/badge.svg?branch=main">
        <img alt="test" src="https://github.com/henk-badenhorst/vue-hotjar-next/actions/workflows/ci.yml/badge.svg?branch=main">
      </a>
    </span>
    &nbsp;
    <span>
      <a href="https://codecov.io/gh/henk-badenhorst/vue-hotjar-next">
        <img src="https://codecov.io/gh/henk-badenhorst/vue-hotjar-next/branch/main/graph/badge.svg?token=7DMN7ERZS6"/>
      </a>
    </span>
    &nbsp;
    <span>
      <a href="https://v3.vuejs.org">
        <img src="https://badgen.net/badge/vue.js/3.x.x/41b883"/>
      </a>
    </span>
  </span>
  <br>
  <br>
</p>

# Vue Hotjar Next

This is a Vue 3.x.x plugin that will allow you to easily add Hotjar to any Vue project. 

## Install

```bash
npm install vue-hotjar-next
```

Start using it in your Vue application.

```js
import { createApp } from 'vue'
import App from './App.vue'
import VueHotjar from 'vue-hotjar-next'

const app = createApp(App);

app.use(VueHotjar, {
  id: 12345678,
  isProduction: true,
  snippetVersion: 6
});

app.mount("#app");
```

## Parameters

### id:

Your Hotjar Site ID is a required parameter with a type of number. You can find this ID at insights.hotjar.com under tracking.

```js 
id: 12345678
```

### isProduction:

If you would like to disable or enable tracking this parameter is of type boolean. It is advised to bind your Node ENV variable. This is an optional parameter and will default to `true` if not defined.

```js 
isProduction: true 
```

### snippetVersion:

This optional parameter that will default to the latest Hotjar Snippet version. Currently, it will default to version `6`. This parameter is of type number.

```js 
snippetVersion: 6 
```

## Accessing The Hotjar API

Instead of accessing Hotjar API's through the window object like `window.hj` you can simply interact with the Hotjar API via Vue global properties. 

### Identify API

Hotjar’s Identify API allows you to pass data about your users to Hotjar using Javascript. Instead of using the `window.hj` method to access the API this plugin binds the window.hj API to a global property that can be accessed as follow: `app.config.globalProperties.$hj`

### Settings

Hotjar also binds the settings such as the Hotjar ID and snippet version to `window._hjSettings` property. You can also access this through a global with `app.config.globalProperties.$hjSettings`.

## Vue Compatibility

This plugin is specifically intended for use with Vue version 3. If you are using Vue version 2 please see [vue-hotjar](https://www.npmjs.com/package/vue-hotjar).
