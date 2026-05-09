import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy – RouletteChat',
  description: 'Learn how RouletteChat uses cookies and how you can control them.',
  alternates: { canonical: 'https://roulettechatsites.com/cookies' },
};

const COOKIE_TYPES = [
  {
    name: 'Strictly Necessary',
    required: true,
    desc: 'These cookies are essential for the website to function. They enable core features such as security, session management, and accessibility. They cannot be disabled.',
    examples: 'Session token, CSRF token, load balancer affinity.',
  },
  {
    name: 'Analytics',
    required: false,
    desc: 'These cookies help us understand how visitors interact with the Site by collecting anonymised information. This helps us improve content and performance.',
    examples: 'Google Analytics (_ga, _gid), page view counters.',
  },
  {
    name: 'Preferences',
    required: false,
    desc: 'These cookies remember your settings and preferences to provide a more personalised experience on return visits.',
    examples: 'Language preference, theme setting.',
  },
];

export default function CookiesPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Legal</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-3">Cookie Policy</h1>
          <p className="text-muted text-sm">Last updated: January 1, 2025</p>
        </div>

        <div className="flex flex-col gap-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="font-bold text-white text-base mb-3">What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, to remember your preferences, and to provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">How We Use Cookies</h2>
            <p>
              RouletteChat uses cookies to keep the platform running smoothly, to understand how users interact with our site, and to remember your preferences. We do not use cookies to serve personalised advertising.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">Types of Cookies We Use</h2>
            <div className="flex flex-col gap-5 mt-4">
              {COOKIE_TYPES.map(({ name, required, desc, examples }) => (
                <div key={name} className="card-glass rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-bold text-white text-sm">{name}</h3>
                    {required
                      ? <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/20 text-green-400">Required</span>
                      : <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-muted">Optional</span>
                    }
                  </div>
                  <p className="mb-2">{desc}</p>
                  <p><strong className="text-white">Examples:</strong> {examples}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">Third-Party Cookies</h2>
            <p>
              Some third-party services we use (such as Google Analytics) may also set cookies on your device. These cookies are governed by the respective third party&apos;s privacy and cookie policies. We recommend reviewing those policies for more information.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">How to Control Cookies</h2>
            <p className="mb-3">
              You can control and delete cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="flex flex-col gap-2 pl-4">
              <li>View the cookies stored on your device.</li>
              <li>Block cookies from specific sites or all sites.</li>
              <li>Delete all cookies when you close your browser.</li>
            </ul>
            <p className="mt-3">
              Please note that disabling cookies may affect the functionality of RouletteChat. Instructions for managing cookies can be found in your browser&apos;s help section.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Any changes will be reflected by the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">Contact</h2>
            <p>
              Questions about our use of cookies? Email us at{' '}
              <a href="mailto:support@roulettechatsites.com" className="text-purple-light hover:text-white transition-colors">
                support@roulettechatsites.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
