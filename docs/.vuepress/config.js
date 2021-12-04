module.exports = (_ctx) => ({
  sourceDir: 'docs',
  dest: 'docs/dist',
  port: 9090,

  locales: {
    '/en/': {
      lang: 'en-US',
      title: 'Coinhub Docs',
      description: 'Developer documentation for the Coinhub wallet',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Coinhub 文档',
      description: 'Coinhub 钱包开发者文档',
    },
  },

  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#22a079' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#22a079',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],

  theme: '@vuepress/theme-default',

  themeConfig: {
    repo: 'CoolBank/CoolBank.github.io',
    docsDir: 'packages/docs/dist',
    editLinks: true,
    logo: '/favicon.ico',
    smoothScroll: true,
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
    },
    locales: {
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
        editLinkText: '在 GitHub 上编辑此页',
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用.',
            buttonText: '刷新',
          },
        },
      },
    },
    sidebar: {
      '/en/': getGuideSidebar('Guide', 'Connect to wallet'),
      '/zh/': getGuideSidebar('介绍', '链接钱包'),
    },
  },

  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ['@vuepress/medium-zoom', true],
    [
      'container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
      },
    ],
    [
      'container',
      {
        type: 'upgrade',
        before: (info) => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
      },
    ],
    [
      'vuepress-plugin-redirect',
      {
        redirectors: [
          {
            base: '/',
            alternative: '/zh/',
          },
        ],
      },
    ],
  ],

  // extraWatchFiles: ['.vuepress/nav/en.js', '.vuepress/nav/zh.js'],
});

function getGuideSidebar(guide, connect) {
  return [
    {
      title: guide,
      collapsable: false,
      children: [''],
    },
    {
      title: connect,
      collapsable: false,
      children: ['base', 'rpc-api', 'signing-data'],
    },
  ];
}

// function getGuideSidebar(guide, api, bestPractices, mobile, resources) {
//   return [
//     {
//       title: guide,
//       collapsable: false,
//       children: [
//         '',
//         'getting-started',
//         'common-terms',
//         'initializing-dapps',
//         'accessing-accounts',
//         'sending-transactions',
//       ],
//     },
//     {
//       title: api,
//       collapsable: false,
//       children: [
//         'ethereum-provider',
//         'provider-migration',
//         'rpc-api',
//         'signing-data',
//       ],
//     },
//     {
//       title: bestPractices,
//       collapsable: false,
//       children: [
//         'registering-function-names',
//         'registering-your-token',
//         'defining-your-icon',
//         'onboarding-library',
//         'metamask-extension-provider',
//       ],
//     },
//     {
//       title: mobile,
//       collapsable: false,
//       children: [
//         'mobile-getting-started',
//         'site-compatibility-checklist',
//         'mobile-best-practices',
//       ],
//     },
//     {
//       title: resources,
//       collapsable: false,
//       children: ['create-dapp', 'contributors'],
//     },
//   ];
// }
