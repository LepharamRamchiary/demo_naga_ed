import { Leaf, Flame, Timer } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Expert-Led Learning",
    copy: "Learn from experienced instructors through well-structured lessons, practical examples, and interactive learning materials.",
    accent: "leaf",
  },
  {
    icon: Flame,
    title: "Industry-Relevant Skills",
    copy: "Build practical skills with hands-on projects and real-world examples designed to prepare you for your future career.",
    accent: "chili",
  },
  {
    icon: Timer,
    title: "Learn at Your Own Pace",
    copy: "Access courses anytime, review lessons whenever you need, and continue learning on a schedule that works for you.",
    accent: "turmeric",
  },
];

export default function WhySwad() {
  return (
    <section id="why" className="bg-paper py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-smoke">
            Why Choose Our Platform
          </span>

          <h2 className="mt-3 font-display text-3xl font-700 text-ink md:text-4xl">
            Learn smarter with engaging courses and practical experience.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, copy, accent }) => (
            <div
              key={title}
              className="rounded-2xl border border-ink/10 bg-white/60 p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                  accent === "leaf"
                    ? "bg-leaf/10 text-leaf"
                    : accent === "chili"
                      ? "bg-chili/10 text-chili"
                      : "bg-turmeric/15 text-turmeric"
                }`}
              >
                <Icon size={20} strokeWidth={2.2} />
              </span>

              <h3 className="mt-4 font-display text-lg font-700 text-ink">
                {title}
              </h3>

              <p className="mt-2 font-body text-sm leading-relaxed text-smoke">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
