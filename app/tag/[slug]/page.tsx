import PostCard from "@/app/components/post";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

async function getPublishedPosts(slug: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    try {
        const response = await fetch(`${apiUrl}/api/posts/tag/${slug}`, { cache: 'no-store' });
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
export default async function Tag(params: { params: Promise<{ slug: string }> }) {
    const { slug } = await params.params;

    const posts = await getPublishedPosts(slug);
    return (
        <>
            <div className="bg-[#0B1A2A] min-h-screen font-sans text-white">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div>
                        <Link href="/" className="flex items-center gap-2 cursor-pointer mb-3">
                            <FaArrowLeft className="w-6 h-6" />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                        {posts.map((post: any) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}