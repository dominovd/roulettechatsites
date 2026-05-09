import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – RouletteChat',
  description: 'Read the RouletteChat Privacy Policy to understand how we collect, use, and protect your data.',
  alternates: { canonical: 'https://roulettechatsites.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Legal</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-muted text-sm">Last updated: January 1, 2025</p>
        </div>

        <div className="flex flex-col gap-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="font-bold text-white text-base mb-3">1. Introduction</h2>
            <p>
              RouletteChat (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website roulettechatsites.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read it carefully. If you disagree with its terms, please discontinue use of the site.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="flex flex-col gap-2 pl-4">
              <li><strong className="text-white">Usage data:</strong> Pages visited, time spent on pages, browser type, device type, and IP address. Collected automatically via server logs and analytics tools.</li>
              <li><strong className="text-white">Account data:</strong> If you register, we collect your email address and a hashed password. No payment information is stored by us.</li>
              <li><strong className="text-white">Cookies:</strong> Small files placed on your device to remember preferences and analyse usage. See our Cookie Policy for details.</li>
            </ul>
            <p className="mt-3">
              <strong className="text-white">We do not record, store, or review video or text chat content.</strong> All chat sessions are ephemeral and discarded immediately after they end.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">3. How We Use Your Information</h2>
            <ul className="flex flex-col gap-2 pl-4">
              <li>To operate and improve the platform.</li>
              <li>To monitor for abuse and enforce our community guidelines.</li>
              <li>To send service-related communications (if you have an account).</li>
              <li>To analyse aggregate usage trends (anonymised).</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">4. Third-Party Services</h2>
            <p>
              We may use third-party services such as analytics providers (e.g. Google Analytics) and content delivery networks. These services may collect information sent by your browser as part of a web page request. Their use of your data is governed by their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">5. Data Retention</h2>
            <p>
              We retain account data for as long as your account is active. Anonymised usage data may be retained indefinitely for analytical purposes. You can request deletion of your account data at any time by emailing us.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">6. Your Rights</h2>
            <p className="mb-3">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="flex flex-col gap-2 pl-4">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Object to or restrict processing of your data.</li>
              <li>Request a portable copy of your data.</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:support@roulettechatsites.com" className="text-purple-light hover:text-white transition-colors">support@roulettechatsites.com</a>.</p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">7. Children&apos;s Privacy</h2>
            <p>
              RouletteChat is intended for users aged 18 and over. We do not knowingly collect personal information from anyone under 18. If we become aware that a minor has provided us with personal data, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">8. Security</h2>
            <p>
              We use industry-standard security measures including HTTPS encryption and hashed password storage. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the &quot;Last updated&quot; date at the top of this page. Continued use of the site after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">10. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us at{' '}
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
