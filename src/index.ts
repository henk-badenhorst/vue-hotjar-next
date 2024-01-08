import { Hotjar } from './libs/hotjar/hotjar';
import { App, Plugin } from '@vue/runtime-core';
import { hotjarOptions } from './types/typing';
import {
  isHotjarOptionsValid,
  isVueVersionValid
} from './libs/validation/validation';

 const VueHotjar: Plugin = {
  install: async (app: App, options: hotjarOptions) => {

    // set default option for the sippetVersion if it is not provided
    if (options.snippetVersion === undefined) {
      options.snippetVersion = 6;
    }

    // set default option for the isProduction if it is not provided
    if (options.isProduction === undefined) {
      options.isProduction = true;
    }

    if(isHotjarOptionsValid(options) && isVueVersionValid(app)) {
      app.config.globalProperties.$hj = new Hotjar(options.id, options.snippetVersion, options.isProduction);
    }

  }
};

export default VueHotjar