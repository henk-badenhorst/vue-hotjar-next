<p align="center">
  <img width="350" src="https://i.imgur.com/wLrKYPj.png">
  <br>
  <br>
  <span>
    <img src="https://img.shields.io/npm/dt/vue-hotjar-next.svg"> 
  </span>
  &nbsp;
</p>

# Vue Hotjar Next

This is a Vue 3.x.x plugin that will allow you to easily add Hotjar to any Vue project. 

## Install

```bash
npm install vue-hotjar-next
```

Start using it in your Vue application.

```js
// Code Here
```

## Parameters

### Id:

Your Hotjar Site ID is a required parameter. You can find this ID at insights.hotjar.com under tracking.

```js 
id: 'XXXXXXX' 
```

### isProduction:

If you would like to disable or enable tracking, pass in either `true` or `false`. It is advised to bind your Node ENV variable. This is an optional parameter and will default to true if not specified.

```js 
isProduction: true 
```

### snippetVersion:

This optional parameter does not need to be specified as it will default to the latest Hotjar Snippet version. Currently, it will default to `version 6`.

```js 
snippetVersion: 6 
```

## Vue Version Compatibility

This plugin is specifically intended for use with Vue version 3. If you are using Vue version 2 please see [vue-hotjar](https://www.npmjs.com/package/vue-hotjar).

