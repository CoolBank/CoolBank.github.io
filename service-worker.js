/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "46fc02e75e2649e9c5d1e29669f07977"
  },
  {
    "url": "assets/css/0.styles.6e8d0c80.css",
    "revision": "aca39a83a650a3511c8f64df6fd05034"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.7c370795.js",
    "revision": "cc73c6cf15d7d3540b664ae32aec2b71"
  },
  {
    "url": "assets/js/11.5ba472e9.js",
    "revision": "dda40628235f4de62cabeb5cc14c3362"
  },
  {
    "url": "assets/js/12.dd873085.js",
    "revision": "82e3e3574c3d5cc06d0cfdd0923e532c"
  },
  {
    "url": "assets/js/13.7a4778fd.js",
    "revision": "0a276aef9832b1f7aeefff76918a9ad6"
  },
  {
    "url": "assets/js/14.5eea41a6.js",
    "revision": "304d66270cb5ab92ffd597c15a66759f"
  },
  {
    "url": "assets/js/15.c9f48ac1.js",
    "revision": "646654df17f559088bc34d4561a9f049"
  },
  {
    "url": "assets/js/16.cb06a49f.js",
    "revision": "226bae1224eab4f4a150dadb57d90bfd"
  },
  {
    "url": "assets/js/17.efd30d2f.js",
    "revision": "49b43662f23eed33799b94811ffc45a7"
  },
  {
    "url": "assets/js/3.53cdf4ac.js",
    "revision": "4b8321dbd72e64ea3272e5561f36eb07"
  },
  {
    "url": "assets/js/4.b32304d3.js",
    "revision": "6d94a250d89c59574202b37db2f121d9"
  },
  {
    "url": "assets/js/5.2e6de3e7.js",
    "revision": "c85f67f7ed100cf6b8073b8303492a60"
  },
  {
    "url": "assets/js/6.0ef70ff6.js",
    "revision": "24a8bae169906502d5ef4b94e3e64b3f"
  },
  {
    "url": "assets/js/7.69eefd97.js",
    "revision": "71dc6b5f0768a8872e79b217e1c9ba3a"
  },
  {
    "url": "assets/js/8.9376cdbb.js",
    "revision": "80c08e749a075cc509e74f2f27bc0261"
  },
  {
    "url": "assets/js/9.0fd89356.js",
    "revision": "91ea027d965ee720615d5521cb839ac1"
  },
  {
    "url": "assets/js/app.fe6758e3.js",
    "revision": "7b02022cbc70867bc7d3bf1404dc35dc"
  },
  {
    "url": "assets/js/vendors~docsearch.46848a98.js",
    "revision": "50fe2564a30a7f7a3857bc9acf2d69b2"
  },
  {
    "url": "en/base.html",
    "revision": "ce81ebdba28db66541f6c57827745191"
  },
  {
    "url": "en/index.html",
    "revision": "b0116d4f13377534991cd0d0c0ce4791"
  },
  {
    "url": "en/rpc-api.html",
    "revision": "94fc85fb0616903617109881bd3335ea"
  },
  {
    "url": "en/signing-data.html",
    "revision": "0673a428dcfb02783ba50653eb404831"
  },
  {
    "url": "zh/base.html",
    "revision": "02db057ec3376095ef4642cb822879dd"
  },
  {
    "url": "zh/index.html",
    "revision": "c4ab13409f8daf747a096d65330db026"
  },
  {
    "url": "zh/rpc-api.html",
    "revision": "1336daadd0b3bac2e7c7da3186fa2d27"
  },
  {
    "url": "zh/signing-data.html",
    "revision": "718d791f979ea0e881e1a1eb34f7ef86"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
