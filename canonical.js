(() => {
  // 1. Fix up canonical URL if it's a relative path
  const link = document.querySelector("link[rel='canonical']");
  if (link) {
    const current = link.getAttribute("href") || "";
    if (current.startsWith("/")) {
      link.setAttribute("href", "https://www.thundercompute.com" + current);
    }
  }

  // 2. Inject Organization schema JSON-LD
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Thunder Compute",
    "url": "https://www.thundercompute.com",
    "logo": "https://framerusercontent.com/images/CXKLnN81r2hTkom6MFekpYr7qs.png",
    "description": "Thunder Compute is the most affordable GPU cloud platform for researchers and indie devs.",
    "foundingDate": "2024-02-23",
    "founder": [
      { "@type": "Person", "name": "Carl Peterson" },
      { "@type": "Person", "name": "Brian Model" }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "email": "support@thundercompute.com"
      }
    ],
    "sameAs": [
      "https://x.com/ThunderCompute",
      "https://www.linkedin.com/company/102863366",
      "https://www.crunchbase.com/organization/thunder-9b4c",
      "https://www.producthunt.com/products/thunder-compute",
      "https://www.ycombinator.com/companies/thunder-compute"
    ]
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.text = JSON.stringify(orgSchema, null, 2);
  document.head.appendChild(script);
})();
