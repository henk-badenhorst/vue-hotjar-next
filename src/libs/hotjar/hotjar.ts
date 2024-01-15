// @ts-nocheck
export class Hotjar {
  constructor(id: number, snippetVersion: number, isProduction: boolean) {
    if (isProduction) {
      // Default hotjar.com snippet
      (function (h, o, t, j, a, r) {
        h.hj =
          h.hj ||
          function () {
            (h.hj.q = h.hj.q || []).push(arguments);
          };
        h._hjSettings = {
          hjid: id, // Hotjar ID
          hjsv: snippetVersion // Hotjar Snippet Version
        };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    } else {
      console.log(
        '%c 🔥 HotJar Tracking Disabled 🔥',
        'color: #fff; background: #35495d; font-size: 14px; border-radius: 5px; padding: 10px 5px; margin: 20px 0;'
      );
    }
  }
}
