import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import PostCard from "./components/post";
import { REVALIDATE } from "./abc";
export const dynamic = 'force-dynamic';
// Helper to construct full image URLs
const getImageUrl = (path: string | null) => {
  if (!path) return null;
  return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${path}`;
};

async function getPublishedPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const response = await fetch(`${apiUrl}/api/posts`, { next: { revalidate: 60 } });
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
    <div className="bg-[#0B1A2A] min-h-screen font-sans text-white -mt-10">
      {/* Header / Nav Area Placeholder */}

      <main >
        <div style={{ background: "linear-gradient(180deg, rgba(5,16,26,.22), rgba(5,16,26,.86) 55%, rgba(5,16,26,1))", backgroundImage: 'url(' + getImageUrl(featuredPost.featured_image) + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: "overlay" }}>
          {/* className="w-full h-[calc(100vh-12rem)] backdrop-blur-md absolute top-0 left-0 z-[1] opacity-5 " style={{ backgroundImage: 'url(' + getImageUrl(featuredPost.featured_image) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }} */}
          <div className="bg-[#0B1A2A]/80 backdrop-blur-md" style={{ background: "linear-gradient(180deg, rgba(5,16,26,.22), rgba(5,16,26,.86) 20%, rgba(5,16,26,1))" }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 z-[100] " >
              <section className="mb-24">
                <h1 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-white leading-[1.1] mb-6 group-hover:text-gray-300 transition-colors">
                  GoStudy Blogs
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed mb-8 line-clamp-3">Premium Stories For UAE Students, Parents & Teachers — AI Tutoring, Study Hacks, Exam Strategy And Success Playbooks.</p>
              </section>
              {/* Hero Section: Featured Post (Split Layout) */}
              <section className="mb-24">
                {featuredPost && (<>
                  <div className="mt-24 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-3  grid grid-cols-1 md:grid-cols-[1fr_45%] shadow-lg">
                    <div className="flex flex-col gap-2 justify-between items-start p-4">
                      <div className="flex flex-col gap-5">
                        <span>{new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                        <h1 className="text-xl md:text-2xl font-bold text-white leading-[1.1] group-hover:text-gray-300 transition-colors text-start">                  {featuredPost.title}
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed mb-8">
                          {featuredPost.summary || featuredPost.excerpt || "Dive into this featured story and explore the details..."}
                        </p>
                      </div>
                      <Link href={`/${featuredPost.slug}`} className="border border-primary px-4 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white hover:shadow-xl transition-colors">Read More</Link>
                    </div>
                    {featuredPost.featured_image ? (
                      <img
                        src={getImageUrl(featuredPost.featured_image)!}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover rounded-xl rounded-l-none"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800/50"></div>
                    )}
                  </div>
                </>
                )}
              </section>
            </div>

          </div>
        </div>
        {/* <div className="w-full h-[calc(100vh-12rem)] backdrop-blur-md absolute top-0 left-0 z-[1] opacity-5 " style={{ backgroundImage: 'url(' + getImageUrl(featuredPost.featured_image) + ')', backgroundSize: 'cover', backgroundPosition: 'center' }}>

</div> */}
        <div className="w-full h-px bg-white/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Divider */}

          {/* Latest Stories Grid */}
          <div className="mb-12 flex items-end justify-between border-t border-white/10 pt-6">
            <h2 className="text-3xl  font-bold text-white">Latest Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {gridPosts.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-24 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 text-center">
            <h3 className="text-2xl md:text-3xl  font-bold text-white mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get the week's best stories delivered to your inbox. No spam, just high-quality content.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter email address" className="flex-1 px-5 py-3 rounded-full border border-gray-700 bg-[#0B1A2A] focus:outline-none focus:ring-2 text-gray-300 focus:ring-white/10 focus:border-transparent placeholder-gray-500" />
              <button type="button" className="px-8 py-3 rounded-full bg-gradient-to-br from-[#0B1A2A] to-gray-600 opacity-70 hover:opacity-100 transition-all duration-300 border border-white/10 text-gray-300 font-medium hover:scale-105 transition-all duration-300">Subscribe</button>
            </form>
          </div>
        </div>
      </main >
    </div >
  );
}