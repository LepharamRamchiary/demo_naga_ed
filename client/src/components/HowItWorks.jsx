const steps = [
  {
    n: "01",
    title: "Create Your Account",
    copy: "Sign up in just a few clicks to access courses, learning resources, and your personal dashboard.",
  },
  {
    n: "02",
    title: "Choose a Course",
    copy: "Browse a wide range of subjects and enroll in the course that matches your learning goals.",
  },
  {
    n: "03",
    title: "Start Learning",
    copy: "Watch video lessons, complete interactive activities, and practice with real-world examples at your own pace.",
  },
  {
    n: "04",
    title: "Track Your Progress",
    copy: "Monitor your achievements, complete assessments, and earn certificates as you finish each course.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-ink py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="max-w-xl">
          <span className="font-mono text-xs uppercase tracking-widest text-turmeric">
            Learning Journey
          </span>

          <h2 className="mt-3 font-display text-3xl font-700 text-paper md:text-4xl">
            Four simple steps to start learning.
          </h2>
        </div>

        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.n} className="relative pl-1">
              <span className="font-display text-4xl font-700 text-turmeric/40">
                {step.n}
              </span>

              <h3 className="mt-3 font-display text-lg font-700 text-paper">
                {step.title}
              </h3>

              <p className="mt-2 font-body text-sm leading-relaxed text-paper/60">
                {step.copy}
              </p>

              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-4 top-3 hidden h-px w-8 bg-paper/15 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
