// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const config = {
    plugins: ['docusaurus-plugin-sass',
        function () {
            return {
                name: 'docusaurus-plugin',
                async postBuild({outDir, siteConfig}) {
                    console.log(outDir)
                    const fs = require('fs');
                    const path = require('path');
                    const glob = require('glob');
                    const matter = require('gray-matter');

                    const blogPosts = glob.sync('blog/**/*.md')
                        .map(file => {
                            console.log(file)
                            const content = fs.readFileSync(file, 'utf-8');
                            const {data} = matter(content);
                            return data;
                        })
                        // @ts-ignore
                        .sort((a, b) => new Date(b.date) - new Date(a.date));

                    const dataPath = path.join(__dirname, 'static', 'blogPosts.json');
                    fs.writeFileSync(dataPath, JSON.stringify(blogPosts));
                },
            };
        },],
    title: '飞行器的执行周期',
    tagline: 'Dinosaurs are cool',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://your-docusaurus-test-site.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: '',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: '教程',
                    },
                    {to: '/blog', label: '文章', position: 'left'},
                    {to: '/project', label: '项目', position: 'left'},
                    {to: '/cooperation', label: '合作', position: 'left'},
                    {
                        href: 'https://github.com/ZHNanj',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: '教程',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Telegram',
                                href: 'https://telegram.org/dl',
                            }
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: '博客',
                                to: '/blog',
                            },
                            {
                                label: 'GitHub',
                                href: 'https://github.com/ZHNanj',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} 绕地球一周, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
