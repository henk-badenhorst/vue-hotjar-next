import { App } from 'vue';

export interface HotjarOptions {
  /**
   * Your Hotjar Site ID is a required parameter. You can find this ID at [insights.hotjar.com](https://insights.hotjar.com).
   */
  id: number | string;

  /**
   * If you would like to disable or enable tracking, pass in either `true` or `false`. Ideally you want to set this to prevent unintentional tracking during local development.
   * This is an optional parameter and will default to true if not specified.
   *
   * @Default true
   */
  isProduction?: boolean;

  /**
   * If you want to change the snippet version you can specify the specific version number.
   * @Default 6
   */
  snippetVersion?: number;
}

declare const HotjarPlugin: {
  install: (app: App, options: HotjarOptions) => void;
};

export { HotjarPlugin as default };
