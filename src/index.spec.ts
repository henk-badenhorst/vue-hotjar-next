import { createApp } from 'vue';
import Hotjar from './index';
import { hotjarOptions } from './types/typing';

declare global {
  interface Window {
    _hjSettings: any;
  }
}

function newVueApplication(options: hotjarOptions) {
  return createApp({}).use(Hotjar, options).mount;
}

describe('Hotjar initialization', () => {
  beforeEach(() => {
    spyOn(console, 'log');
    spyOn(console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete window._hjSettings;
  });

  describe('Hotjar Production Mode', () => {
    it('Hotjar should not be initialized', () => {
      newVueApplication({
        id: 12345678,
        snippetVersion: 6
      });
      expect(window._hjSettings.hjid).toBe(12345678);
      expect(window._hjSettings.hjsv).toBe(6);
    });
  });

  describe('Hotjar Development Mode', () => {
    afterEach(() => {
      jest.resetAllMocks();
      delete window._hjSettings;
    });

    it('Hotjar should not be initialized', () => {
      newVueApplication({
        id: 12345678,
        snippetVersion: 6,
        isProduction: false
      });
      expect(window._hjSettings).not.toBeDefined();
      expect(console.log).toHaveBeenCalledWith(
        '%c 🔥 HotJar Tracking Disabled 🔥',
        'color: #fff; background: #35495d; font-size: 14px; border-radius: 5px; padding: 10px 5px; margin: 20px 0;'
      );
    });
  });
});
