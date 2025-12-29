import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BiArrowBack } from "react-icons/bi";
export async function generateStaticParams() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    const res = await fetch(`${apiUrl}/api/posts`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const json = await res.json();

    return (json.data || []).map((post: any) => ({
        slug: post.slug,
    }));
}
// Dynamic SEO metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const siteUrl = "https://www.gostudy.ae";

    const res = await fetch(`${apiUrl}/api/posts/${slug}`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        return {
            alternates: {
                canonical: `${siteUrl}/${slug}`,
            },
        };
    }

    const { data: post } = await res.json();

    const canonicalUrl = `${siteUrl}/${slug}`;
    const ogImage =
        post?.featured_image
            ? post.featured_image.startsWith("http")
                ? post.featured_image
                : `${apiUrl}${post.featured_image}`
            : "https://lylassets.s3.eu-north-1.amazonaws.com/uploads/og-gostudy.ae.jpeg";

    return {
        title: post.meta?.title || post.title,
        description:
            post.meta?.description ||
            post.excerpt ||
            "Read the latest insights from GoStudy.ae",

        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            title: post.meta?.og_title || post.title,
            description:
                post.meta?.og_description ||
                post.excerpt ||
                "Read the latest insights from GoStudy.ae",
            url: canonicalUrl,
            siteName: "GoStudy",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            type: "article",
        },

        robots: {
            index: true,
            follow: true,
        },
    };
}
// Data Fetching Helper
const fetchAPI = async (endpoint: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    try {
        const res = await fetch(`${apiUrl}/api/${endpoint}`, { next: { revalidate: 3600 } });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data;
    } catch (e) {
        console.error(`Error fetching ${endpoint}:`, e);
        return null;
    }
};

const getImageUrl = (path: string | null) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${path}`;
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await fetchAPI(`posts/${slug}`);
    // Fetch recent posts for sidebar (exclude current one)
    const allPosts = await fetchAPI('posts') || [];
    const recentPosts = allPosts.filter((p: any) => p.id !== post?.id).slice(0, 5);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-[#0B1A2A] min-h-screen font-sans text-white pb-20">
            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

                    {/* LEFT COLUMN: Main Post Content */}
                    <article className="lg:col-span-2 bg-[#112233] rounded-2xl shadow-sm p-6 sm:p-10 border border-white/5">

                        {/* Header: Title, topic, meta */}
                        <header className="mb-8 border-b border-white/10 pb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Link href={'/'}>
                                    <BiArrowBack size={24} title="Back to Home" />
                                </Link>
                                {post.topic && post.topic.length > 0 && post.topic[0].name && (
                                    <span className="inline-block bg-blue-900/50 text-blue-300 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full border border-blue-500/20">
                                        {post.topic[0].name}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-3xl font-extrabold text-white mb-6 leading-tight tracking-tight flex gap-2">

                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 sm:gap-6">
                                {/* Author */}
                                <div className="flex items-center">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-700">
                                        {post.user?.avatar && (
                                            <img
                                                src={post.user.avatar}
                                                alt={post.user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white hover:text-blue-400 transition-colors">
                                            {post.user?.name || "Unknown Author"}
                                        </p>
                                        <p className="text-xs text-gray-500">Author</p>
                                    </div>
                                </div>

                                {/* Date and Read Time */}
                                <div className="flex items-center gap-4 border-l border-gray-700 pl-4 h-8">
                                    <div>
                                        <p className="font-medium text-white">
                                            {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <p className="text-xs py-0.5 text-gray-500">Published</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">
                                            {post.read_time || Math.ceil(post.body?.length / 800) || 5} min
                                        </p>
                                        <p className="text-xs py-0.5 text-gray-500">Read Time</p>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        {post.featured_image && (
                            <figure className="mb-10 -mx-6 sm:-mx-10 lg:mx-0 lg:rounded-xl overflow-hidden shadow-sm border border-white/5">
                                <img
                                    src={getImageUrl(post.featured_image)!}
                                    alt={post.title}
                                    className="w-full h-auto object-cover max-h-[500px]"
                                />
                                {post.meta?.caption && (
                                    <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
                                        {post.meta.caption}
                                    </figcaption>
                                )}
                            </figure>
                        )}

                        {/* Content Body (Rich Text) */}
                        <div
                            className="prose prose-lg prose-invert max-w-none text-gray-300
                            [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-gray-300
                            [&>h1]:text-gray-300 [&>h2]:text-gray-300 [&>h3]:text-gray-300 [&>h4]:text-gray-300
                            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4
                            [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-3
                            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:text-gray-300
                            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:text-gray-300
                            [&>strong]:text-gray-300 [&>b]:text-gray-300
                            [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400 [&>blockquote]:mb-6
                            [&>img]:rounded-lg [&>img]:shadow-md [&>img]:my-8 [&>img]:w-full"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                        />

                        {/* Tags Footer */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: any) => (
                                        <Link href={`/tag/${tag.slug}`} key={tag.id}
                                            className="bg-white/5 border border-white/10 hover:bg-blue-900/30 hover:text-blue-300 text-gray-400 px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
                                        >
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>

                    {/* RIGHT COLUMN: Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="sticky top-20 space-y-8">
                            {/* Search Widget */}
                            {/* <div className="bg-[#112233] p-6 rounded-2xl shadow-sm border border-white/5">
                            <h3 className="font-bold text-lg text-white mb-4">Search</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full border border-gray-700 rounded-lg py-2.5 px-4 bg-[#0B1A2A] text-white focus:bg-[#152a3f] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                                />
                                <svg className="w-5 h-5 absolute right-3 top-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                        </div> */}

                            {/* Recent Posts Widget */}
                            <div className="bg-[#112233] p-6 rounded-2xl shadow-sm border border-white/5">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-bold text-lg text-white">Recent Posts</h3>
                                    <Link href="/" className="text-sm text-blue-400 hover:underline font-medium">View All</Link>
                                </div>

                                <div className="space-y-6">
                                    {recentPosts.length === 0 ? (
                                        <p className="text-gray-500 text-sm">No other posts found.</p>
                                    ) : (
                                        recentPosts.slice(0, 5).map((recent: any) => (
                                            <a key={recent.id} href={`/${recent.slug}`} className="flex group items-start gap-4">
                                                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden relative bg-gray-800 border border-white/5">
                                                    {recent.featured_image ? (
                                                        <img
                                                            src={getImageUrl(recent.featured_image)!}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-bold text-gray-200 group-hover:text-blue-400 line-clamp-2 leading-snug mb-1.5 transition-colors">
                                                        {recent.title}
                                                    </h4>
                                                    <time className="text-xs text-gray-500 font-medium">
                                                        {new Date(recent.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </time>
                                                </div>
                                            </a>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Newsletter / Promo Widget (Optional matching design vibe) */}
                            <div className="bg-[#112233] border border-white/5 p-6 rounded-2xl shadow-lg text-center">
                                <h3 className="font-bold text-lg mb-2 text-white">Subscribe to our newsletter</h3>
                                <p className="text-blue-100/70 text-sm mb-4">Get the latest posts delivered right to your inbox.</p>
                                <input type="email" placeholder="Enter your email" className="w-full p-2.5 rounded-lg text-white bg-[#0B1A2A] border border-[#112233] focus:ring-2 focus:ring-[#112233] mb-3" />
                                <button className="w-full bg-gradient-to-br from-[#0B1A2A] to-[#0B1A2A]/20 border border-white/10 hover:border-white/20 hover:scale-101 cursor-pointer transition-all duration-300 text-gray-300 font-bold py-2.5 rounded-lg transition-colors">Subscribe</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "description": post.excerpt || post.meta?.description,
                        "image": post.featured_image
                            ? getImageUrl(post.featured_image)
                            : "https://lylassets.s3.eu-north-1.amazonaws.com/uploads/og-gostudy.ae.jpeg",
                        "author": {
                            "@type": "Person",
                            "name": post.user?.name || "GoStudy Team",
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "GoStudy",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.gostudy.ae/logo.png",
                            },
                        },
                        "datePublished": post.published_at,
                        "dateModified": post.updated_at || post.published_at,
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://www.gostudy.ae/${post.slug}`,
                        },
                    }),
                }}
            />
        </div>
    );
}