import Link from "next/link";

// Helper to construct full image URLs
const getImageUrl = (path: string | null) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${path}`;
};

async function getPublishedPosts() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${apiUrl}/api/posts`, { cache: 'no-store' });
        if (!response.ok) {
            console.error('Failed to fetch posts:', response.statusText);
            return [];
        }
        const json = await response.json();
        return json.data || [];
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export default async function Blog() {
    const posts = await getPublishedPosts();

    // Featured post could be the first one
    const featuredPost = posts[0];
    const gridPosts = posts.slice(1);

    if (!Array.isArray(posts) || posts.length === 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#0B1A2A] text-white">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">No stories yet</h1>
                    <p className="text-gray-400 mb-8">We haven't published any posts yet. Check back soon!</p>
                    <Link href="/" className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0B1A2A] min-h-screen font-sans text-white">
            {/* Header / Nav Area Placeholder */}
            <div className="border-b border-white/10 sticky top-0 bg-[#0B1A2A]/80 backdrop-blur-md z-10 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-white">The Journal.</Link>
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
                        <Link href="#" className="hover:text-white transition-colors">Culture</Link>
                        <Link href="#" className="hover:text-white transition-colors">Tech</Link>
                        <Link href="#" className="hover:text-white transition-colors">Design</Link>
                        <Link href="#" className="hover:text-white transition-colors">Business</Link>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

                {/* Hero Section: Featured Post (Split Layout) */}
                {featuredPost && (
                    <section className="mb-24">
                        <Link href={`/blog/${featuredPost.slug}`} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 relative overflow-hidden rounded-3xl aspect-[4/3] lg:aspect-[16/10] bg-gray-800">
                                {featuredPost.featured_image ? (
                                    <img
                                        src={getImageUrl(featuredPost.featured_image)!}
                                        alt={featuredPost.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800/50"></div>
                                )}
                            </div>
                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="flex items-center space-x-2 text-sm font-medium text-gray-400 mb-6">
                                    {featuredPost.topic?.name && (
                                        <span className="text-blue-400 uppercase tracking-wider text-xs font-bold">
                                            {featuredPost.topic.name}
                                        </span>
                                    )}
                                    <span className="text-gray-600">&bull;</span>
                                    <span>{new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6 group-hover:text-gray-300 transition-colors">
                                    {featuredPost.title}
                                </h1>
                                <p className="text-lg text-gray-400 leading-relaxed mb-8 line-clamp-3">
                                    {featuredPost.summary || featuredPost.excerpt || "Dive into this featured story and explore the details..."}
                                </p>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden mr-3">
                                        {featuredPost.user?.avatar && <img src={featuredPost.user.avatar} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white">{featuredPost.user?.name}</p>
                                        <p className="text-gray-500">{Math.ceil((featuredPost.body?.length || 1000) / 800)} min read</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-16"></div>

                {/* Latest Stories Grid */}
                <div className="mb-12 flex items-end justify-between">
                    <h2 className="text-3xl font-serif font-bold text-white">Latest Stories</h2>
                    <Link href="#" className="hidden sm:inline-block text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                        View Archive &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                    {gridPosts.map((post: any) => (
                        <article key={post.id} className="group flex flex-col h-full">
                            <Link href={`/blog/${post.slug}`} className="block mb-6 overflow-hidden rounded-2xl bg-gray-800 aspect-[3/2]">
                                {post.featured_image ? (
                                    <img
                                        src={getImageUrl(post.featured_image)!}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    </div>
                                )}
                            </Link>

                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                                    <span>{post.topic?.name || 'Article'}</span>
                                </div>
                                <h3 className="text-2xl font-bold font-serif text-white mb-3 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-white transition-all">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed flex-1">
                                    {post.summary || post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                    <div className="flex items-center">
                                        <div className="text-xs font-semibold text-gray-300">
                                            {post.user?.name}
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="mt-24 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">Subscribe to our newsletter</h3>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get the week's best stories delivered to your inbox. No spam, just high-quality content.</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input type="email" placeholder="Enter email address" className="flex-1 px-5 py-3 rounded-full border border-gray-700 bg-[#0B1A2A] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500" />
                        <button type="button" className="px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors">Subscribe</button>
                    </form>
                </div>

            </main>
        </div>
    );
}