const getImageUrl = (path) => {
    if (!path) return '';
    const trimmedPath = path.trim();
    if (trimmedPath.startsWith('http')) return trimmedPath;
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://gostudy.ae'}${trimmedPath}`;
};
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BLOG_URL || 'http://localhost:3000/blog',
    generateRobotsTxt: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gostudy.ae',
                port: '',
                pathname: '/blog-admin/public/storage/**',
            },
        ],
    },
    changefreq: 'daily',
    priority: 0.7,
    additionalPaths: async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
        const posts = await res.json();

        return posts.data.map((post) => ({
            loc: `/${post.slug}`, // ✅ correct path
            lastmod: post.updated_at,
            images: post.featured_image
                ? [
                    {
                        loc: String(getImageUrl(post.featured_image)), // ✅ guaranteed string
                        title: post.title || 'Image',
                    },
                ]
                : [],
        }));
    },
    sitemapSize: 5000,
    exclude: [],
}
