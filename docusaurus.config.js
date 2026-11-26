// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Suite Docs',
  tagline: 'Mail, calendar, chat, meetings, files and documents in one app on one server',
  favicon: 'img/logo.svg',

  future: {v4: true},

  url: 'https://docs.opensuite.online',
  baseUrl: '/',

  organizationName: 'open-suite',
  projectName: 'opensuite-saas',

  onBrokenLinks: 'throw',

  i18n: {defaultLocale: 'en', locales: ['en']},

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // The "users" guide is the default docs instance, served at /users.
        docs: {
          id: 'users',
          path: 'users',
          routeBasePath: 'users',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'admins',
        path: 'admins',
        routeBasePath: 'admins',
        sidebarPath: './sidebars.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'it',
        path: 'it',
        routeBasePath: 'it',
        sidebarPath: './sidebars.js',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/opensuite-social-card.png',
      metadata: [{name: 'theme-color', content: '#0b1f33'}],
      colorMode: {respectPrefersColorScheme: true},
      navbar: {
        title: 'Open Suite',
        logo: {
          alt: 'Open Suite',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            docsPluginId: 'users',
            sidebarId: 'defaultSidebar',
            position: 'left',
            label: 'For users',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'admins',
            sidebarId: 'defaultSidebar',
            position: 'left',
            label: 'For admins',
          },
          {
            type: 'docSidebar',
            docsPluginId: 'it',
            sidebarId: 'defaultSidebar',
            position: 'left',
            label: 'For IT',
          },
          {
            href: 'https://docs.opensuite.online/classic/',
            label: 'Classic (k3s) docs',
            position: 'right',
          },
          {
            href: 'https://github.com/open-suite/opensuite-saas',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {label: 'For users', to: '/users'},
              {label: 'For admins', to: '/admins'},
              {label: 'For IT', to: '/it'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Live demo', href: 'https://office.demo.opensuite.online'},
              {label: 'Source on GitHub', href: 'https://github.com/open-suite/opensuite-saas'},
              {label: 'Classic (k3s) docs', href: 'https://docs.opensuite.online/classic/'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Open Suite.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
