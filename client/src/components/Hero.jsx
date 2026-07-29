import { Star, Clock3 } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="scallop-bottom bg-ink pb-16 pt-14 md:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-turmeric/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-turmeric">
            Smart Learning Platform
          </span>

          <h1 className="mt-6 font-display text-5xl font-700 leading-[1.05] text-paper md:text-6xl">
            Learn <span className="text-turmeric">anytime</span>, achieve your
            goals
            <span className="text-chili">.</span>
          </h1>

          <p className="mt-5 max-w-md font-body text-base text-paper/70 md:text-lg">
            Explore interactive courses, engaging lessons, and practical
            learning resources designed to help students build knowledge and
            succeed at every step.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#courses"
              className="rounded-full bg-turmeric px-7 py-3.5 font-body text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-turmeric/20"
            >
              Explore Courses
            </a>

            <a
              href="#features"
              className="rounded-full border border-paper/25 px-7 py-3.5 font-body text-sm font-semibold text-paper transition hover:border-turmeric hover:text-turmeric"
            >
              Learn More
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            <div className="flex items-center gap-2 text-paper/80">
              <Star size={18} className="text-turmeric" fill="currentColor" />
              <span className="font-body text-sm">
                10,000+ Students Learning
              </span>
            </div>

            <div className="flex items-center gap-2 text-paper/80">
              <Clock3 size={18} className="text-turmeric" />
              <span className="font-body text-sm">Learn Anytime, Anywhere</span>
            </div>
          </div>
        </div>

        {/* Signature: featured course card */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-3 rounded-4xl border-2 border-dashed border-turmeric/30" />
          <div className="relative overflow-hidden rounded-3xl bg-paper p-6 shadow-2xl">
            <p className="font-mono text-[11px] uppercase tracking-widest text-smoke">
              Featured Course · #014
            </p>

            <h2 className="mt-1 font-display text-2xl font-700 text-ink">
              Full Stack Web Development
            </h2>

            <ul className="mt-4 divide-y divide-ink/10 font-body text-sm text-ink/80">
              {[
                ["HTML, CSS & JavaScript", "Beginner"],
                ["React.js Fundamentals", "Intermediate"],
                ["Node.js & Express.js", "Advanced"],
                ["Project & Certificate", "Included"],
              ].map(([item, level]) => (
                <li
                  key={item}
                  className="flex items-center justify-between py-2.5"
                >
                  <span>{item}</span>
                  <span className="font-mono text-xs text-smoke">{level}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4">
              <span className="font-display text-lg font-700 text-chili">
                12 Weeks
              </span>

              <span className="rounded-full bg-leaf/10 px-3 py-1 font-mono text-[11px] font-semibold text-leaf">
                Enroll Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
