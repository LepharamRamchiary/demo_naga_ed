export default function CtaBanner() {
  return (
    <section id="order" className="bg-paper pb-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-chili px-8 py-10 md:flex-row md:items-center md:px-12">
          <div>
            <h2 className="font-display text-2xl font-700 text-paper md:text-3xl">
              Ready to start your learning journey?
            </h2>

            <p className="mt-2 font-body text-sm text-paper/75">
              Explore our courses, build practical skills, and begin learning at
              your own pace with expert-designed content.
            </p>
          </div>

          <a
            href="#top"
            className="whitespace-nowrap rounded-full bg-turmeric px-7 py-3.5 font-body text-sm font-semibold text-ink transition hover:bg-paper"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
