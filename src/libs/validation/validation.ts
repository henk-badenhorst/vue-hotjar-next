import { hotjarOptions } from '../../types/typing';
import { App } from '@vue/runtime-core';

/**
 * Validate if all the options are of the correct type and are valid. If not, they will print a console error and return false.
 *
 * @param {hotjarOptions} options - Hotjar options
 * @return {boolean} - Returns true if all options are valid
 *
 */
export function isHotjarOptionsValid(
  options: hotjarOptions
): boolean {

  // check if isProduction option is of type boolean
  if (options.isProduction && typeof options.isProduction !== 'boolean') {
    console.error(`vue-hotjar-next: Hotjar option isProduction is of type ${typeof options.isProduction} and should a boolean`)
    return false;
  }

  // check if snippetVersion option is of type number
  if (options.snippetVersion && typeof options.snippetVersion !== 'number') {
    console.error(`vue-hotjar-next: Hotjar option snippetVersion is of type ${typeof options.snippetVersion} and should a number`);
    return false;
  }

  // check if the id option is defined
  if (options.id === undefined) {
    console.error('Hotjar option ID is not defined');
    return false
  }

  // check if id option is of type number
  if (typeof options.id !== 'number') {
    console.error(
      `vue-hotjar-next: Hotjar option site id is of type ${typeof options.id} and should a number`
    );
    return false
  }

  return true;
}


/**
 * Validate if the Vue version is 3.x.x. If not, it will print a console error and return false.
 *
 * @param {App} options - Vue app instance
 * @return {boolean} - Returns true if the Vue version is 3
 *
 */
export function isVueVersionValid(app: App): boolean {
  
  if (app.version[0] !== '3') {
    console.error(
      `vue-hotjar-next: This plugin is intended to be used with Vue version 3. Version ${app.version} was detected.`
    );
    return false;
  }

  return true;
}
