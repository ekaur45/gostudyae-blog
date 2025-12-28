export default function BlogLoading() {
    return (
        <div className="bg-[#0B1A2A] min-h-screen text-white font-sans animate-pulse">

            {/* HERO */}
            <div className="bg-[#0B1A2A]/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                    {/* Page Title */}
                    <section className="mb-24">
                        <div className="h-14 w-72 bg-white/10 rounded mb-6" />
                        <div className="h-5 w-[36rem] max-w-full bg-white/10 rounded" />
                    </section>

                    {/* Featured Post */}
                    <section className="mb-24">
                        <div className="mt-24 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-3 grid grid-cols-1 md:grid-cols-[1fr_45%] gap-6">

                            {/* Text */}
                            <div className="flex flex-col justify-between p-4">
                                <div className="space-y-4">
                                    <div className="h-4 w-24 bg-white/10 rounded" />
                                    <div className="h-7 w-4/5 bg-white/10 rounded" />
                                    <div className="space-y-2">
                                        <div className="h-4 w-full bg-white/10 rounded" />
                                        <div className="h-4 w-5/6 bg-white/10 rounded" />
                                    </div>
                                </div>
                                <div className="h-10 w-32 bg-white/10 rounded-full mt-6" />
                            </div>

                            {/* Image */}
                            <div className="h-64 md:h-full bg-white/10 rounded-xl" />
                        </div>
                    </section>
                </div>
            </div>

            <div className="w-full h-px bg-white/10" />

            {/* GRID */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="mb-12 flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="h-8 w-48 bg-white/10 rounded" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col h-full border border-white/10 rounded-2xl bg-white/5 overflow-hidden"
                        >
                            {/* Image */}
                            <div className="aspect-[4/2] bg-white/10" />

                            {/* Content */}
                            <div className="flex-1 flex flex-col px-5 py-5">
                                <div className="h-6 w-28 bg-white/10 rounded-full mb-4" />

                                <div className="space-y-2 mb-4">
                                    <div className="h-5 w-full bg-white/10 rounded" />
                                    <div className="h-5 w-5/6 bg-white/10 rounded" />
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="h-4 w-full bg-white/10 rounded" />
                                    <div className="h-4 w-5/6 bg-white/10 rounded" />
                                    <div className="h-4 w-4/6 bg-white/10 rounded" />
                                </div>

                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 bg-white/10 rounded-xl" />
                                        <div className="h-4 w-20 bg-white/10 rounded" />
                                    </div>
                                    <div className="h-9 w-24 bg-white/10 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="mt-24 bg-white/5 border border-white/10 rounded-3xl p-10 md:p-16 text-center">
                    <div className="h-8 w-64 bg-white/10 rounded mx-auto mb-4" />
                    <div className="h-5 w-[28rem] max-w-full bg-white/10 rounded mx-auto mb-8" />

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <div className="h-12 flex-1 bg-white/10 rounded-full" />
                        <div className="h-12 w-32 bg-white/10 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
