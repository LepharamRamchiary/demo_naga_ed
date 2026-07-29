import { useState } from "react";
import { Menu, X, UtensilsCrossed, GraduationCap } from "lucide-react";

const links = [
  { label: "Courses", href: "#menu" },
  { label: "Why DemoEdu", href: "#why" },
  { label: "How it works", href: "#how" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur supports-backdrop-filter:bg-ink/85">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"
        aria-label="Primary"
      >
        <a href="#top" className="flex items-center gap-2 text-paper">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-turmeric text-ink">
            <GraduationCap size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl font-700 tracking-wide">
            DemoEdu
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-body text-sm font-medium text-paper/80 transition hover:text-turmeric"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/login"
          className="hidden rounded-full bg-turmeric px-5 py-2.5 font-body text-sm font-semibold text-ink transition hover:bg-paper md:inline-block"
        >
          Sign in
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-paper/10 md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 font-body text-base text-paper/85 transition hover:bg-paper/5 hover:text-turmeric"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#order"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-turmeric px-5 py-3 text-center font-body text-sm font-semibold text-ink"
              >
                Sign in
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
