const FOOTER_LINKS = {
  Services: [
    "Digital Growth",
    "AI Integration",
    "Automation",
    "Custom ERP & Web",
    "AI Avatar Clone",
  ],
  Company: ["About Us", "Case Studies", "Blog", "Careers", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const SOCIAL = [
  { name: "Twitter / X", href: "#", icon: <TwitterIcon /> },
  { name: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
  { name: "GitHub", href: "#", icon: <GitHubIcon /> },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        zIndex: 1,
        borderTop: "1px solid rgba(0,242,208,0.06)",
      }}
    >
      {/* Top wave divider */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden leading-none pointer-events-none"
        style={{ height: "60px", transform: "translateY(-100%)" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
            fill="rgba(7,12,36,0.5)"
          />
        </svg>
      </div>

      <div className="glass" style={{ background: "rgba(5, 8, 22, 0.8)" }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Top row: brand + links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #00F2D0, #6C2FE8)",
                    boxShadow: "0 0 16px rgba(0,242,208,0.3)",
                  }}
                >
                  <span
                    className="font-display font-black text-sm"
                    style={{ color: "#03061A", letterSpacing: "-0.05em" }}
                  >
                    M
                  </span>
                </div>
                <span
                  className="font-display font-bold text-base"
                  style={{ letterSpacing: "-0.03em", color: "var(--c-text)" }}
                >
                  meggma
                </span>
              </div>

              <p
                className="text-sm mb-6"
                style={{
                  color: "var(--c-muted)",
                  lineHeight: 1.65,
                  maxWidth: "200px",
                }}
              >
                Grow your business with intelligent technology solutions.
              </p>

              <div className="flex gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "rgba(180,200,255,0.5)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--c-cyan)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(0,242,208,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(180,200,255,0.5)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.07)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4
                  className="font-display font-semibold text-sm mb-4"
                  style={{ color: "var(--c-text)", letterSpacing: "-0.01em" }}
                >
                  {heading}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-200 hover:text-(--c-cyan)"
                        style={{ color: "var(--c-muted)" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <p
              className="font-mono text-xs"
              style={{ color: "rgba(180,200,255,0.25)" }}
            >
              © {new Date().getFullYear()} Meggma Technologies. All rights
              reserved.
            </p>

            <div
              className="flex items-center gap-2 font-mono text-xs"
              style={{ color: "rgba(180,200,255,0.25)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "var(--c-cyan)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TwitterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
