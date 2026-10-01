import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | By The Handful" },
      { name: "description", content: "Privacy Policy for By The Handful." },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 md:px-12 py-32 w-full">
        <h1 className="font-serif text-4xl md:text-5xl italic text-primary mb-6">
          Privacy Policy
        </h1>
        <div className="prose prose-sm md:prose-base prose-stone max-w-none text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/60 mb-8">Last Updated: 30 September 2026</p>
          
          <p>
            By The Handful respects your privacy and is committed to protecting information provided by customers and visitors to our website.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Information We May Collect</h2>
          <p>Depending on how you use our website, we may collect information such as:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Billing and delivery address</li>
            <li>Order details</li>
            <li>Payment-related information processed through authorised payment providers</li>
            <li>Information submitted through enquiry or contact forms</li>
            <li>Website usage and technical information where applicable</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">How We Use Your Information</h2>
          <p>We may use information to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Process and deliver orders</li>
            <li>Communicate regarding orders</li>
            <li>Respond to enquiries</li>
            <li>Provide customer support</li>
            <li>Process payments through authorised payment providers</li>
            <li>Improve our products and website</li>
            <li>Prevent fraud or misuse</li>
            <li>Meet applicable legal and regulatory requirements</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Payment Information</h2>
          <p>
            Payment transactions may be processed through third-party payment gateways.
          </p>
          <p>
            By The Handful does not intentionally store complete payment card information such as full card numbers or CVV details on its own systems.
          </p>
          <p>
            Payment information is handled by the relevant payment service provider according to its policies and security procedures.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Sharing of Information</h2>
          <p>
            We may share necessary information with trusted service providers such as payment processors, courier partners, technology providers and other vendors where required to provide our services.
          </p>
          <p>
            We do not knowingly sell personal customer information to third parties.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Cookies</h2>
          <p>
            Our website may use cookies or similar technologies to improve website functionality, understand website usage and support relevant marketing or analytics activities.
          </p>
          <p>
            You may be able to manage cookie preferences through your browser or available website controls.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Data Security</h2>
          <p>
            We take reasonable measures to protect customer information against unauthorised access, misuse, alteration or disclosure.
          </p>
          <p>
            However, no method of internet transmission or electronic storage can be guaranteed to be completely secure.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party websites or services. By The Handful is not responsible for the privacy practices or content of those third parties.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically. Changes will be published on this page along with the updated date.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Contact</h2>
          <p>
            For privacy-related questions, contact:
          </p>
          <p className="mt-2 font-medium text-foreground">
            By The Handful<br />
            7/32, Roop Nagar, Delhi<br />
            Phone: +91 98100 20801 / +91 99100 20801
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
