const dishes = [
  {
    name: "Full Stack Web Development",
    tag: "Most Popular",
    price: "12 Weeks",
  },
  {
    name: "React.js Fundamentals",
    tag: "Beginner",
    price: "8 Weeks",
  },
  {
    name: "Node.js & Express.js",
    tag: "Backend",
    price: "10 Weeks",
  },
  {
    name: "Database Management",
    tag: "Intermediate",
    price: "6 Weeks",
  },
  {
    name: "UI/UX Design Essentials",
    tag: "Creative",
    price: "5 Weeks",
  },
  {
    name: "Python Programming",
    tag: "Trending",
    price: "9 Weeks",
  },
];

export default function MenuPreview() {
  return (
    <section id="menu" className="bg-paper pb-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-smoke">
              Featured Courses
            </span>

            <h2 className="mt-3 font-display text-3xl font-700 text-ink md:text-4xl">
              Explore our most popular learning programs.
            </h2>
          </div>

          <a
            href="#courses"
            className="font-body text-sm font-semibold text-chili underline decoration-chili/30 underline-offset-4 hover:decoration-chili"
          >
            View all courses →
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="flex items-center justify-between rounded-2xl border border-ink/10 bg-white/70 px-5 py-4 transition hover:border-turmeric/50"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-leaf">
                  {dish.tag}
                </p>

                <p className="mt-1 font-display text-base font-700 text-ink">
                  {dish.name}
                </p>
              </div>

              <span className="font-mono text-sm font-semibold text-chili">
                {dish.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
