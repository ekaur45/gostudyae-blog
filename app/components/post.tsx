import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const getImageUrl = (path: string | null) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}${path}`;
};
export default function PostCard({ post }: { post: any }) {
    return (
        <article key={post.id} className="group flex flex-col h-full border border-white/10 rounded-2xl shadow-lg hover:shadow-xl transition-colors hover:bg-gradient-to-br from-[#0B1A2A] to-[#183758]/50">
            <Link href={`/${post.slug}`} className="relative block overflow-hidden rounded-2xl rounded-b-none bg-gray-800 aspect-[4/2]">
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
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 absolute bottom-0 left-3 rounded-full bg-gray-800 px-3 py-2">
                    <span>{post.topic[0]?.name || 'Article'}</span>
                </div>
            </Link>

            <div className="flex-1 flex flex-col px-5 py-5">
                <span className="text-xs rounded-full bg-gray-800 opacity-70 border border-gray-900 px-3 py-2 w-fit mb-3">

                    {new Date(post.published_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>

                <h3 className="text-xl font-bold  text-white mb-3 leading-tight group-hover:underline decoration-2 underline-offset-4 decoration-white transition-all">
                    <Link href={`/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>
                <p className="text-gray-400 line-clamp-3 mb-6 leading-relaxed flex-1">
                    {post.summary || post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center">
                        {
                            post.user?.avatar && getImageUrl(post.user?.avatar) ? (
                                <img src={getImageUrl(post.user?.avatar)!} alt={post.user?.name} className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1A2A] to-gray-600 mr-2 border border-white/10 flex items-center justify-center text-2xl font-bold uppercase text-gray-300 hover:scale-110 transition-all" />
                            ) : (
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1A2A] to-gray-600 mr-2 border border-white/10 flex items-center justify-center text-2xl font-bold uppercase text-gray-300">
                                    {post.user?.name?.slice(0, 1)}
                                </div>
                            )
                        }
                        <div className="text-xs font-semibold text-gray-300">
                            {post.user?.name}
                        </div>
                    </div>
                    <Link href={`/${post.slug}`} className="rounded-xl bg-gradient-to-br from-[#0B1A2A] to-gray-600 opacity-70 hover:opacity-100 transition-all duration-300 border border-white/10 mr-2 flex items-center justify-center px-4 py-2 text-gray-300">Read
                        <FaArrowRight className="ml-2" />
                    </Link>

                </div>
            </div>
        </article>
    );
}