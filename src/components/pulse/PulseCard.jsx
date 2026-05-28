import { useNavigate } from "react-router-dom";

export default function PulseCard({
    category,
    title,
    description,
    image,
    id,
    variant = "default",
}) {
    const navigate = useNavigate();

    if (variant === "compact") {
        return (
            <article
                onClick={() => navigate(`/pulse/${id}`)}
                className="flex gap-4 rounded-2xl border border-border bg-surface p-4 transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md cursor-pointer"
            >
                <img
                    src={image}
                    alt={title}
                    className="h-20 w-20 rounded-xl object-cover"
                />

                <div>
                    <p className="text-xs text-primary">{category}</p>

                    <h3 className="text-base font-semibold leading-snug">
                        {title}
                    </h3>

                    <p className="text-sm text-text-muted line-clamp-2">
                        {description}
                    </p>
                </div>
            </article>
        );
    }

    return (
        <article
            onClick={() => navigate(`/pulse/${id}`)}
            className="group overflow-hidden rounded-3xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg cursor-pointer"
        >
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4">
                    <p className="mb-2 text-sm text-primary">
                        {category}
                    </p>

                    <h3 className="max-w-md text-2xl font-bold text-white">
                        {title}
                    </h3>
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-5">
                <p className="text-text-muted">
                    {description}
                </p>
            </div>
        </article>
    );
}