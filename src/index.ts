import { Hotjar } from './libs/hotjar/hotjar';
import { App } from '@vue/runtime-core';
import { HotjarOptions } from './types/typing';
import {
  isHotjarOptionsValid,
  isVueVersionValid
} from './libs/validation/validation';

export default {
  install: (app: App, options: HotjarOptions) => {

    // set default option for the sippetVersion if it is not provided
    if (options.snippetVersion === undefined) {
      options.snippetVersion = 6;
    }

    // set default option for the isProduction if it is not provided
    if (options.isProduction === undefined) {
      options.isProduction = true;
    }

    if (isHotjarOptionsValid(options) && isVueVersionValid(app)) {
      new Hotjar(options.id, options.snippetVersion, options.isProduction);
    }
  }
};
