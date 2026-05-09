import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service – RouletteChat',
  description: 'Read the RouletteChat Terms of Service to understand the rules and conditions for using our platform.',
  alternates: { canonical: 'https://roulettechatsites.com/terms' },
};

export default function TermsPage() {
  return (
    <div className="px-5 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <p className="text-[0.75rem] font-bold uppercase tracking-[3px] text-purple-light mb-3">Legal</p>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight mb-3">Terms of Service</h1>
          <p className="text-muted text-sm">Last updated: January 1, 2026</p>
        </div>

        <div className="flex flex-col gap-8 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="font-bold text-white text-base mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using roulettechatsites.com (&quot;the Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the Site. These Terms apply to all visitors, users, and others who access the Site.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use RouletteChat. By using the Site, you represent and warrant that you are 18 or older. If we discover that a user is under 18, we will terminate their access immediately.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">3. Prohibited Conduct</h2>
            <p className="mb-3">You agree not to use the Site to:</p>
            <ul className="flex flex-col gap-2 pl-4">
              <li>Transmit, display, or distribute any nudity, sexual content, or pornographic material.</li>
              <li>Harass, threaten, bully, or intimidate other users.</li>
              <li>Transmit hate speech, discriminatory content, or content that promotes violence.</li>
              <li>Impersonate any person or entity.</li>
              <li>Distribute malware, spam, or any harmful software.</li>
              <li>Engage in any activity that violates applicable local, national, or international laws.</li>
              <li>Scrape, crawl, or otherwise extract data from the Site without prior written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">4. User Content</h2>
            <p>
              You are solely responsible for the content you transmit through the Site. RouletteChat does not claim ownership of your content, but by using the Site, you grant us a limited licence to process and moderate your transmissions for safety purposes. We do not store chat content after sessions end.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">5. Moderation & Enforcement</h2>
            <p>
              We reserve the right to suspend or terminate access to the Site for any user who violates these Terms, at our sole discretion and without prior notice. We may cooperate with law enforcement authorities in investigating violations of applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">6. Disclaimer of Warranties</h2>
            <p>
              The Site is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, RouletteChat shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">8. Third-Party Links & Services</h2>
            <p>
              The Site may contain links to third-party websites or embed third-party services. We are not responsible for the content, policies, or practices of any third-party site. Your use of third-party services is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a revised &quot;Last updated&quot; date. Your continued use of the Site after changes are posted constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-white text-base mb-3">10. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
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
