import { Hotjar } from './libs/hotjar/hotjar';
import { App, Plugin } from '@vue/runtime-core';
import { hotjarOptions } from './types/typing';
import {
  validateHotjarOptions,
  validateVueVersion
} from './libs/validation/validation';

 const VueHotjar: Plugin = {
  install: (app: App, options: hotjarOptions) => {
    const { id, snippetVersion = 6, isProduction = true } = options;
    if (validateHotjarOptions({ id, snippetVersion, isProduction }) && validateVueVersion(app.version)) {
      new Hotjar(id, snippetVersion, isProduction);
    }
  }
};

export default VueHotjar