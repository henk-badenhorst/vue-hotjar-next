import { createApp } from 'vue';
import Hotjar from './index';

declare global {
  interface Window {
    hj: any;
    _hjSettings: any;
  }
}

describe('Hotjar Plugin', () => {

  beforeEach(() => {
    spyOn(console, 'log');
    spyOn(console, 'error');
  });

  afterEach(() => {
    delete window.hj;
    delete window._hjSettings;
    jest.resetAllMocks();
    jest.clearAllMocks()
  });

  it('Hotjar should be initialized', () => {
    const app = createApp({});
    app.use(Hotjar, {
      id: 12345678,
      snippetVersion: 6
    });
    expect(window._hjSettings.hjid).toEqual(12345678);
    expect(window._hjSettings.hjsv).toEqual(6);
    expect(app.config.globalProperties.$hj).toBeDefined();
    expect(app.config.globalProperties.$hjSettings).toEqual({ hjid: 12345678, hjsv: 6 });
  });
  it('Hotjar should not be initialized and print a console message', () => {
    const app = createApp({});
    app.use(Hotjar, {
      id: 12345678,
      snippetVersion: 6,
      isProduction: false
    });
    expect(window._hjSettings).not.toBeDefined();
    expect(app.config.globalProperties.$hj).not.toBeDefined();
    expect(app.config.globalProperties.$hjSettings).not.toBeDefined();
    expect(console.log).toHaveBeenCalledWith(
      '%c 🔥 HotJar Tracking Disabled 🔥',
      'color: #fff; background: #35495d; font-size: 14px; border-radius: 5px; padding: 10px 5px; margin: 20px 0;'
    );
  });
});

