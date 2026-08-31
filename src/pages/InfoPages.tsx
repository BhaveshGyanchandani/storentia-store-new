import { StaticPage } from "./StaticPage";

export function About() {
  return (
    <StaticPage eyebrow="Company" title="About Maison">
      <p>
        Maison began as a small studio dedicated to a simple idea: clothing and objects should be built to be lived
        in, not replaced every season. We work with a small group of mills, tanneries and workshops chosen for how
        their materials age, not just how they look on day one.
      </p>
      <h2>Our approach</h2>
      <p>
        Every piece is developed over months, not weeks. We'd rather release fewer things, made well, than chase a
        trend cycle that leaves closets — and landfills — full of clothes worn twice.
      </p>
    </StaticPage>
  );
}

export function Careers() {
  return (
    <StaticPage eyebrow="Company" title="Careers at Maison">
      <p>
        We're a small, product-obsessed team spread across design, sourcing and operations. We're not actively
        hiring right now, but we're always glad to hear from people who care about how things are made.
      </p>
      <p>Reach out via the contact page and tell us what you'd want to work on.</p>
    </StaticPage>
  );
}

export function Sustainability() {
  return (
    <StaticPage eyebrow="Company" title="Sustainability">
      <p>
        We measure our impact by longevity — a garment worn for ten years has a fraction of the footprint of one
        worn for ten washes. That shapes every material and construction decision we make.
      </p>
      <h2>Where we're headed</h2>
      <p>
        We're working toward full supply chain transparency across our mills and workshops, published progressively
        as each relationship matures.
      </p>
    </StaticPage>
  );
}

export function Contact() {
  return (
    <StaticPage eyebrow="Customer Service" title="Contact Us">
      <p>Our team typically responds within one business day.</p>
      <h2>Email</h2>
      <p>hello@maison.example</p>
      <h2>Studio Hours</h2>
      <p>Monday – Friday, 10am – 6pm IST</p>
    </StaticPage>
  );
}

export function Shipping() {
  return (
    <StaticPage eyebrow="Customer Service" title="Shipping & Returns">
      <h2>Shipping</h2>
      <p>
        Standard delivery takes 3–5 business days and is free on orders over ₹5,000. Express delivery (1–2 business
        days) is available at checkout for ₹349.
      </p>
      <h2>Returns</h2>
      <p>
        We accept returns within 30 days of delivery on unworn items with original tags attached. Refunds are
        issued to your original payment method within 5–7 business days of us receiving your return.
      </p>
    </StaticPage>
  );
}

export function FAQ() {
  const items = [
    { q: "How do I track my order?", a: "You can track any order from the Orders tab in your account." },
    { q: "Do you ship internationally?", a: "Currently we ship within India only, with international shipping planned for next year." },
    { q: "What payment methods do you accept?", a: "We accept UPI, all major credit and debit cards, and cash on delivery." },
    { q: "How do I know what size to order?", a: "Check the size guide linked on every product page for detailed measurements." },
  ];
  return (
    <StaticPage eyebrow="Customer Service" title="Frequently Asked Questions">
      {items.map((item) => (
        <div key={item.q}>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}
    </StaticPage>
  );
}

export function SizeGuide() {
  return (
    <StaticPage eyebrow="Customer Service" title="Size Guide">
      <p>Measurements are in centimeters. If you're between sizes, we recommend sizing up.</p>
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4">Size</th>
              <th className="py-2 pr-4">Chest</th>
              <th className="py-2 pr-4">Waist</th>
              <th className="py-2">Hip</th>
            </tr>
          </thead>
          <tbody className="text-ink-soft">
            {[
              ["XS", "84–88", "66–70", "90–94"],
              ["S", "89–93", "71–75", "95–99"],
              ["M", "94–98", "76–81", "100–104"],
              ["L", "99–104", "82–88", "105–110"],
              ["XL", "105–111", "89–96", "111–118"],
            ].map((row) => (
              <tr key={row[0]} className="border-b border-border/60">
                {row.map((cell, i) => (
                  <td key={i} className="py-2 pr-4">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StaticPage>
  );
}

export function Privacy() {
  return (
    <StaticPage eyebrow="Legal" title="Privacy Policy">
      <p>
        This is a demonstration storefront. In a production deployment, this page would describe what data is
        collected, how it's used, and how customers can request access or deletion in line with applicable law.
      </p>
    </StaticPage>
  );
}

export function Terms() {
  return (
    <StaticPage eyebrow="Legal" title="Terms of Service">
      <p>
        This is a demonstration storefront. In a production deployment, this page would set out the terms governing
        use of the site and any purchases made through it.
      </p>
    </StaticPage>
  );
}

export function Accessibility() {
  return (
    <StaticPage eyebrow="Legal" title="Accessibility">
      <p>
        We aim for our interface to be usable with a keyboard alone, with screen readers, and at high zoom levels.
        If you encounter a barrier anywhere on this site, please get in touch via the contact page.
      </p>
    </StaticPage>
  );
}
