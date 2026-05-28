export default function HeroCard() {
    return (<>

        <section className="mb-10">

            <div className="relative overflow-hidden rounded-3xl border border-border">
                {/* BACKGROUND IMAGE */}
                
                 <img
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1600&auto=format&fit=crop"
                    alt="Featured game"
                    className="h-105 w-full object-cover"
                />

                ```
                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 p-8">
                    <p className="mb-3 text-sm text-primary">
                        Trending right now
                    </p>

                    <h1 className="mb-4 max-w-3xl text-5xl font-bold tracking-tight text-white">
                        Elden Ring: Nightreign
                    </h1>

                    <p className="max-w-2xl text-gray-300">
                        Players are rediscovering co-op builds and sharing insane boss
                        clips after the latest expansion drop.
                    </p>

                    <button className="mt-6 rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary-hover">
                        Join the discussion
                    </button>
                </div>
            </div>
        </section>
        ```
    </>
    );
}
