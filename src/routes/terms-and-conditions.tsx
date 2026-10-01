import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | By The Handful" },
      { name: "description", content: "Terms and Conditions for By The Handful." },
    ],
  }),
  component: TermsAndConditions,
});

function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 md:px-12 py-32 w-full">
        <h1 className="font-serif text-4xl md:text-5xl italic text-primary mb-6">
          Terms & Conditions
        </h1>
        <div className="prose prose-sm md:prose-base prose-stone max-w-none text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/60 mb-8">Last Updated: 30 September 2026</p>

          <p>
            Welcome to By The Handful. These Terms & Conditions govern your use of our website and your purchase of our products and services.
          </p>
          <p>
            By accessing our website or placing an order, you agree to these Terms & Conditions.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">1. About Our Products</h2>
          <p>By The Handful offers premium dry fruits, nuts, seeds, gourmet products, luxury hampers, wedding gifting, corporate gifting and customised gifting solutions.</p>
          <p>As many of our products contain natural ingredients and/or are customised, minor variations in colour, size, texture, arrangement and appearance may occur.</p>
          <p>Product images are for illustrative purposes and the final product may vary slightly from photographs displayed on the website.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">2. Orders</h2>
          <p>An order is considered confirmed only after payment has been successfully received and the order has been accepted by By The Handful.</p>
          <p>We reserve the right to cancel or decline an order where:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>A product is unavailable.</li>
            <li>There is an obvious pricing or listing error.</li>
            <li>Required information is incomplete or incorrect.</li>
            <li>We are unable to fulfil the order for reasons beyond our reasonable control.</li>
          </ul>
          <p>For bulk, corporate, wedding and customised orders, separate quotations and payment terms may apply.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">3. Customised Orders</h2>
          <p>Customised products may include personalised packaging, names, logos, labels, ribbons, engraving, printing, hamper arrangements and other bespoke elements.</p>
          <p>Once a customer approves the final design, artwork, spelling, quantity and specifications, production may begin.</p>
          <p>Changes requested after production has commenced may incur additional charges and may affect delivery timelines.</p>
          <p>Customers are responsible for checking all names, spellings, dates, logos and other personalised information before providing final approval.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">4. Pricing & Payment</h2>
          <p>All prices displayed on the website are subject to change without prior notice.</p>
          <p>The final price applicable to an order will be the price displayed or quoted at the time the order is confirmed.</p>
          <p>Additional charges may apply for:</p>
          <ul className="list-disc pl-6 mb-6 space-y-1">
            <li>Customisation</li>
            <li>Corporate branding</li>
            <li>Special packaging</li>
            <li>Delivery</li>
            <li>Urgent orders</li>
            <li>Special sourcing requirements</li>
            <li>Applicable taxes</li>
          </ul>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">5. Dry Fruits & Food Products</h2>
          <p>Our food products are packed using appropriate food-grade packaging.</p>
          <p>Natural products may vary slightly in colour, size, shape, texture and appearance between batches.</p>
          <p>Customers should review product descriptions and ingredient information before purchasing and should inform us of any known allergies or dietary requirements where relevant.</p>
          <p>Products should be stored according to the instructions provided on the packaging.</p>
          <p>By The Handful is not responsible for deterioration caused by improper storage, exposure to heat or moisture, mishandling or consumption beyond the recommended period.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">6. Delivery</h2>
          <p>Delivery timelines are estimates and may vary depending on product availability, order quantity, customisation, location, seasonal demand and logistics conditions.</p>
          <p>For wedding, corporate and festive orders, customers are advised to place orders well in advance.</p>
          <p>Delivery delays caused by courier partners, traffic, weather, strikes, government restrictions, natural events or circumstances beyond our reasonable control may occur.</p>
          <p>Customers are responsible for providing accurate delivery information.</p>
          <p>Additional charges may apply for re-delivery resulting from an incorrect address or recipient unavailability.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">7. Inspection of Orders</h2>
          <p>Customers are requested to inspect their order immediately upon delivery.</p>
          <p>Any issue relating to damage, missing items or an incorrect product should be reported to us within 24 hours of delivery, along with clear photographs and, where available, an unboxing video.</p>
          <p>Claims reported after this period may not be accepted.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">8. Intellectual Property</h2>
          <p>All photographs, product designs, graphics, logos, text, catalogue designs, creative concepts and other content appearing on the By The Handful website are owned by or licensed to By The Handful unless otherwise stated.</p>
          <p>Such content may not be copied, reproduced, modified or commercially used without prior written permission.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">9. Promotional Content</h2>
          <p>Unless specifically requested otherwise in writing before production, By The Handful may photograph completed products and use such photographs for its portfolio, website, social media and promotional activities.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">10. Limitation of Liability</h2>
          <p>By The Handful will take reasonable care in processing and fulfilling orders. However, we shall not be responsible for losses or delays arising from circumstances beyond our reasonable control.</p>
          <p>Our liability, where legally applicable, shall be limited to the value of the relevant order.</p>
          <p>Nothing in these Terms & Conditions is intended to exclude or limit any consumer rights that cannot legally be excluded under applicable Indian law.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">11. Force Majeure</h2>
          <p>We shall not be liable for delays or failure to fulfil an order caused by circumstances beyond our reasonable control, including natural disasters, extreme weather, transportation disruptions, strikes, government restrictions, supply-chain disruptions, accidents, epidemics or other unforeseen circumstances.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">12. Governing Law</h2>
          <p>These Terms & Conditions shall be governed by the laws applicable in India.</p>
          <p>Any dispute shall first be attempted to be resolved amicably. Where resolution cannot be reached, the matter shall be subject to the jurisdiction of the appropriate courts in Delhi, subject to applicable law.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">13. Changes to These Terms</h2>
          <p>By The Handful reserves the right to update these Terms & Conditions from time to time.</p>
          <p>The updated version will be published on this website with the relevant revision date.</p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">14. Contact</h2>
          <p>For questions regarding these Terms & Conditions or your order:</p>
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
