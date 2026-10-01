import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy | By The Handful" },
      { name: "description", content: "Shipping & Delivery Policy for By The Handful." },
    ],
  }),
  component: ShippingPolicy,
});

function ShippingPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-6 md:px-12 py-32 w-full">
        <h1 className="font-serif text-4xl md:text-5xl italic text-primary mb-6">
          Shipping & Delivery Policy
        </h1>
        <div className="prose prose-sm md:prose-base prose-stone max-w-none text-foreground/80 leading-relaxed">
          <p className="text-sm text-foreground/60 mb-8">Last Updated: 30 September 2026</p>

          <p>
            At By The Handful, we carefully pack every order to ensure that our luxury hampers and premium food products reach you in excellent condition.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Processing Time</h2>
          <p>
            Standard orders are generally processed within the timeframe communicated at the time of purchase.
          </p>
          <p>
            Customised, wedding, corporate and bulk orders may require additional processing time depending on quantity, design, branding and production requirements.
          </p>
          <p>
            During festive periods, processing and delivery timelines may be longer due to increased order volumes.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Delivery</h2>
          <p>
            Delivery timelines depend on the destination, courier availability and the nature of the order.
          </p>
          <p>
            The estimated delivery date provided at checkout or during order confirmation is an estimate and not an absolute guarantee.
          </p>
          <p>
            For large or customised orders, the delivery timeline will be communicated separately.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Delivery Address</h2>
          <p>
            Customers are responsible for providing a complete and accurate delivery address and contact number.
          </p>
          <p>
            By The Handful will not be responsible for delays or additional charges resulting from incorrect or incomplete address information.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Delayed Delivery</h2>
          <p>
            Once an order has been handed over to the courier/logistics partner, delivery is subject to the courier's operational timelines.
          </p>
          <p>
            Delays caused by traffic, weather, strikes, public holidays, logistics disruptions, natural events or other circumstances beyond our control may occur.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Damaged Packages</h2>
          <p>
            If your package arrives visibly damaged, please photograph the package before opening it and contact us within 24 hours of delivery.
          </p>
          <p>
            For the fastest resolution, please provide photographs and, where possible, an unboxing video.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Bulk & Event Orders</h2>
          <p>
            For wedding, corporate, festive and large-volume orders, customers should place orders sufficiently in advance.
          </p>
          <p>
            The production and delivery schedule for such orders will be mutually agreed upon at the time of confirmation.
          </p>

          <h2 className="text-2xl font-serif text-primary mt-8 mb-4">Contact</h2>
          <p>
            For delivery-related assistance:
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
