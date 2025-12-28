export default function BlogPostLoader() {
    return (
        <div className="bg-[#0B1A2A] min-h-screen font-sans text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 animate-pulse">

                    {/* LEFT COLUMN */}
                    <article className="lg:col-span-2 bg-[#112233] rounded-2xl p-6 sm:p-10 border border-white/5">

                        {/* Header */}
                        <header className="mb-8 border-b border-white/10 pb-8">
                            <div className="h-6 w-32 rounded-full bg-blue-900/40 mb-4" />

                            <div className="space-y-3 mb-6">
                                <div className="h-10 w-5/6 bg-white/10 rounded-lg" />
                                <div className="h-10 w-3/4 bg-white/10 rounded-lg" />
                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-white/10 rounded" />
                                        <div className="h-3 w-16 bg-white/5 rounded" />
                                    </div>
                                </div>

                                {/* Meta */}
                                <div className="flex gap-6 border-l border-white/10 pl-6">
                                    <div className="space-y-2">
                                        <div className="h-4 w-20 bg-white/10 rounded" />
                                        <div className="h-3 w-16 bg-white/5 rounded" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-16 bg-white/10 rounded" />
                                        <div className="h-3 w-14 bg-white/5 rounded" />
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="mb-10 h-[320px] sm:h-[420px] bg-white/10 rounded-xl" />

                        {/* Content Skeleton */}
                        <div className="space-y-5">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="h-4 w-full bg-white/10 rounded" />
                            ))}
                            <div className="h-4 w-5/6 bg-white/10 rounded" />
                            <div className="h-4 w-4/6 bg-white/10 rounded" />
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <div className="h-4 w-24 bg-white/10 rounded mb-4" />
                            <div className="flex gap-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-8 w-20 bg-white/10 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-8">

                        {/* Search */}
                        {/* <div className="bg-[#112233] p-6 rounded-2xl border border-white/5">
                            <div className="h-5 w-20 bg-white/10 rounded mb-4" />
                            <div className="h-10 w-full bg-white/10 rounded-lg" />
                        </div> */}

                        {/* Recent Posts */}
                        <div className="bg-[#112233] p-6 rounded-2xl border border-white/5">
                            <div className="flex justify-between mb-6">
                                <div className="h-5 w-32 bg-white/10 rounded" />
                                <div className="h-4 w-16 bg-white/10 rounded" />
                            </div>

                            <div className="space-y-6">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-20 h-20 bg-white/10 rounded-lg" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 w-full bg-white/10 rounded" />
                                            <div className="h-4 w-5/6 bg-white/10 rounded" />
                                            <div className="h-3 w-20 bg-white/5 rounded" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-[#112233] border border-white/5 p-6 rounded-2xl text-center">
                            <div className="h-5 w-48 bg-white/10 rounded mx-auto mb-3" />
                            <div className="h-4 w-64 bg-white/10 rounded mx-auto mb-6" />
                            <div className="h-10 w-full bg-white/10 rounded-lg mb-3" />
                            <div className="h-10 w-full bg-white/10 rounded-lg" />
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
