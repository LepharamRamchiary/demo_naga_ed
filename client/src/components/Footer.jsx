import { Camera, Send, Globe, GraduationCap } from "lucide-react";

const columns = [
  {
    heading: "Courses",
    links: ["Web Development", "Programming", "UI/UX Design", "Data Science"],
  },
  {
    heading: "Platform",
    links: [
      "About DemoEdu",
      "Our Instructors",
      "Learning Resources",
      "Careers",
    ],
  },
  {
    heading: "Support",
    links: ["Help Centre", "Student Guide", "Privacy Policy", "Contact Us"],
  },
];

const socials = [
  { icon: Camera, label: "Follow DemoEdu on Instagram" },
  { icon: Send, label: "Follow DemoEdu on X (Twitter)" },
  { icon: Globe, label: "Follow DemoEdu on Facebook" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink pt-16">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 border-b border-paper/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2 text-paper">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-turmeric text-ink">
                <GraduationCap size={18} strokeWidth={2.5} />
              </span>

              <span className="font-display text-2xl font-700">DemoEdu</span>
            </a>

            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-paper/60">
              Empowering learners with quality education, practical skills, and
              interactive courses to help them succeed in today's digital world.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#top"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition hover:border-turmeric hover:text-turmeric"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-turmeric">
                {col.heading}
              </h3>

              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="font-body text-sm text-paper/65 transition hover:text-paper"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center font-body text-xs text-paper/45 md:flex-row md:text-left">
          <p>© {new Date().getFullYear()} DemoEdu. All rights reserved.</p>
          <p>Built for educational demonstration and learning purposes.</p>
        </div>
      </div>
    </footer>
  );
}
