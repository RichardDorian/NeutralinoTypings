# NeutralinoTypings

A type definition file for [NeutralinoJS' native API](https://neutralino.js.org/docs/api/overview).

The type definition file includes JSDoc which means every functions are documented. The document has been extracted from the online one, which means if there's a mistake there it'll be here too.

# How to make it work with VSCode?

1. Place the type definition file (`neutralino.d.ts`) in the root directory of your Neutralino project
2. Add a reference to the type definition file using a reference comment (example in the `main.js` file situated in `/resources/js/main.js`)

```javascript
/// <reference path="../../neutralino.d.ts" />

// Rest of the main.js file
```

# Contributing

I will probably not update this type definition file unless I find an issue myself with it due to my main framework orientation (Electron). If you want to update it feel free to open a pull request, I'll still check them.

If you have found a better way of _importing_ the type definition
file please tell me!
