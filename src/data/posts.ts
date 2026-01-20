export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    date: string;
    readTime: string;
}

export const posts: BlogPost[] = [
    {
        slug: "pest-control-vs-repair-costs",
        title: "Why Regular Pest Control is Cheaper Than Repairing Damage",
        excerpt: "Termites alone cause $5 billion in damage annually. See why a $39/mo subscription saves you thousands in creating 'Fortress' protection.",
        category: "Service Value",
        date: "Oct 12, 2025",
        readTime: "4 min read",
        content: `
      <h2>The Silent Destroyer of Equity</h2>
      <p>Most homeowners in Raleigh don't realize their biggest financial threat isn't the market—it's nature. Termites, carpenter ants, and moisture pests work silently behind your walls.</p>
      
      <h3>The Cost Breakdown</h3>
      <ul>
        <li><strong>Average Termite Repair:</strong> $3,000 - $8,000</li>
        <li><strong>ApexGuard Shield Plan:</strong> $39/month</li>
      </ul>
      
      <p>It takes 10 years of subscription payments to equal the cost of ONE minor termite repair job. This is why we call our service "Equity Protection" rather than just pest control.</p>
      
      <h3>Our Fortress Guarantee</h3>
      <p>When you are on the Fortress Shield plan, we don't just kill bugs. We monitor key infrastructure points in your crawlspace and foundation to catch threats before they become bills.</p>
    `
    },
    {
        slug: "identify-nc-pests",
        title: "Identify Your Enemy: The Top 5 NC Pests",
        excerpt: "From the American Roach to the Subterranean Termite. Know what is trying to breach your home's defenses.",
        category: "Educational",
        date: "Oct 15, 2025",
        readTime: "6 min read",
        content: `
      <h2>1. The American Cockroach ("Palmetto Bug")</h2>
      <p>They are big, they fly, and they love humidity. If you see one, there are likely 50 more nearby.</p>
      
      <h2>2. Subterranean Termites</h2>
      <p>Raleigh is a hot zone for these. They build mud tubes up your foundation. If you see "mud straw" on your brick, call us immediately.</p>
      
      <h2>3. Mosquitoes</h2>
      <p>Tiger mosquitoes are aggressive day-biters common in NC. They breed in standing water as small as a bottle cap.</p>
    `
    },
    {
        slug: "post-treatment-care",
        title: "Post-Treatment Care: Keeping Your Fortress Secure",
        excerpt: "You just got defended by ApexGuard. Here is what to do in the next 48 hours to ensure maximum potency.",
        category: "After-Service",
        date: "Oct 20, 2025",
        readTime: "3 min read",
        content: `
      <h2>1. Let it Dry</h2>
      <p>Our eco-friendly barrier needs about 30 minutes to bond with your home's perimeter. Keep pets inside during this window.</p>
      
      <h2>2. Don't Mop the Edges</h2>
      <p>For interior treatments, we apply a microscopic barrier to baseboards. Avoid mopping these areas for 48 hours to let the crystals set.</p>
      
      <h2>3. Expect "The Flush"</h2>
      <p>It is normal to see MORE bug activity for 24 hours. This means they are running from their hiding spots. They will be gone shortly.</p>
    `
    }
];
