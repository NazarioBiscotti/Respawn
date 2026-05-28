const trendingTags = [
    "Elden Ring",
    "Helldivers 2",
    "Hades II",
    "Cozy Games",
    "Indie RPG",
];

const activeDiscussions = [
    "Best co-op games in 2026",
    "Are live service games dying?",
    "Most relaxing games this month",
];

export default function TrendingSidebar() {
    return (<> <aside className="space-y-6">
        {/* TRENDING TAGS */} <div className="rounded-2xl border border-border bg-surface p-5"> <h3 className="mb-4 text-lg font-semibold">
            Trending Tags </h3>

            ```
            <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-surface-light px-3 py-1 text-sm text-text-muted transition hover:bg-primary hover:text-white"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>

        {/* DISCUSSIONS */}
        <div className="rounded-2xl border border-border bg-surface p-5">
            <h3 className="mb-4 text-lg font-semibold">
                Active Discussions
            </h3>

            <div className="space-y-3">
                {activeDiscussions.map((discussion) => (
                    <div
                        key={discussion}
                        className="cursor-pointer rounded-xl bg-surface-light p-3 transition hover:bg-primary"
                    >
                        <p className="text-sm font-medium">
                            {discussion}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </aside>
    </>

    );
}
