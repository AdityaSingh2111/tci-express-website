# Premium Logistics Platform Scaffold

## 1. Folder Tree

```text
public/
├── logos/
├── images/
├── videos/
├── documents/
└── icons/
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── admin/
│   │   ├── branches/
│   │   │   └── page.tsx
│   │   ├── customers/
│   │   │   └── page.tsx
│   │   ├── documents/
│   │   │   └── page.tsx
│   │   ├── employees/
│   │   │   └── page.tsx
│   │   ├── quotations/
│   │   │   └── page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── shipments/
│   │   │   └── page.tsx
│   │   ├── tracking/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── documents/
│   │   │   └── route.ts
│   │   ├── locations/
│   │   │   └── route.ts
│   │   ├── quote/
│   │   │   └── route.ts
│   │   └── tracking/
│   │       └── route.ts
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── branches/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── careers/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── faq/
│   │   └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── industries/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── locations/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── quote/
│   │   └── page.tsx
│   ├── services/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── track/
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── data/
│   ├── blog.ts
│   ├── branches.ts
│   ├── careers.ts
│   ├── cities.ts
│   ├── company.ts
│   ├── faq.ts
│   ├── index.ts
│   ├── industries.ts
│   ├── locations.ts
│   ├── navigation.ts
│   ├── partners.ts
│   ├── seo.ts
│   ├── services.ts
│   ├── stats.ts
│   ├── testimonials.ts
│   └── theme.ts
├── lib/
│   ├── documents/
│   │   ├── advice.ts
│   │   ├── bilty.ts
│   │   ├── contract.ts
│   │   ├── inventory.ts
│   │   ├── invoice.ts
│   │   └── receipt.ts
│   ├── crm.ts
│   ├── google-maps.ts
│   ├── google-places.ts
│   ├── seo.ts
│   └── tracking.ts
└── types/
    ├── data.types.ts
    ├── documents.types.ts
    └── integration.types.ts
```

## 2. File Contents

### Types

**`src/types/data.types.ts`**
```typescript
export interface CompanyInfo {
  brandName: string;
  legalName: string;
  tagline: string;
}
export interface GlobalSeoConfig {
  siteUrl: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
}
export interface NavigationConfig {
  headerLinks: { label: string; href: string }[];
  footerLinks: { title: string; items: { label: string; href: string }[] }[];
}
export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
}
export interface IndustryItem {
  slug: string;
  title: string;
}
export interface LocationSEOItem {
  slug: string;
  city: string;
}
export interface BranchItem {
  slug: string;
  name: string;
}
export interface BlogPost {
  slug: string;
  title: string;
}
export interface FaqItem {
  category: string;
}
export interface TestimonialItem {
  clientName: string;
}
export interface JobOpening {
  slug: string;
  title: string;
}
export interface CityConfig {
  code: string;
  name: string;
}
export interface Partner {
  name: string;
  logoUrl: string;
}
export interface StatItem {
  label: string;
  value: string;
}
```

**`src/types/integration.types.ts`**
```typescript
export interface CRMLead {
  name: string;
  email: string;
  phone: string;
}
export interface TrackingData {
  trackingId: string;
  status: string;
}
export interface PlaceSuggestion {
  description: string;
  placeId: string;
}
```

**`src/types/documents.types.ts`**
```typescript
export interface DocumentItem {
  id: string;
  createdAt: string;
  status: "Draft" | "Issued" | "Cancelled";
}
export interface QuotationDocument extends DocumentItem {}
export interface MoneyReceiptDocument extends DocumentItem {}
export interface BiltyDocument extends DocumentItem {}
export interface CollectionAdviceDocument extends DocumentItem {}
export interface InventoryListDocument extends DocumentItem {}
export interface ContractFormDocument extends DocumentItem {}
```

### Data Files

**`src/data/company.ts`**
```typescript
import { CompanyInfo } from "../types/data.types";
export const companyInfo: CompanyInfo = {
  brandName: "TCI Express Elite",
  legalName: "TCI Express Limited",
  tagline: "Premium Global Logistics",
};
```

**`src/data/seo.ts`**
```typescript
import { GlobalSeoConfig } from "../types/data.types";
export const seoConfig: GlobalSeoConfig = {
  siteUrl: "https://elite.tciexpress.com",
  defaultTitle: "TCI Express Elite | Premium Logistics",
  titleTemplate: "%s | TCI Express Elite",
  defaultDescription: "Premium supply chain management.",
};
```

**`src/data/theme.ts`**
```typescript
export const themeConfig = {
  colors: { primary: "#0a192f" },
};
```

**`src/data/navigation.ts`**
```typescript
import { NavigationConfig } from "../types/data.types";
export const navigationConfig: NavigationConfig = {
  headerLinks: [],
  footerLinks: [],
};
```

**`src/data/services.ts`**
```typescript
import { ServiceItem } from "../types/data.types";
export const servicesData: ServiceItem[] = [];
```

**`src/data/industries.ts`**
```typescript
import { IndustryItem } from "../types/data.types";
export const industriesData: IndustryItem[] = [];
```

**`src/data/locations.ts`**
```typescript
import { LocationSEOItem } from "../types/data.types";
export const locationsData: LocationSEOItem[] = [];
```

**`src/data/branches.ts`**
```typescript
import { BranchItem } from "../types/data.types";
export const branchesData: BranchItem[] = [];
```

**`src/data/blog.ts`**
```typescript
import { BlogPost } from "../types/data.types";
export const blogData: BlogPost[] = [];
```

**`src/data/faq.ts`**
```typescript
import { FaqItem } from "../types/data.types";
export const faqData: FaqItem[] = [];
```

**`src/data/testimonials.ts`**
```typescript
import { TestimonialItem } from "../types/data.types";
export const testimonialsData: TestimonialItem[] = [];
```

**`src/data/careers.ts`**
```typescript
import { JobOpening } from "../types/data.types";
export const careersData: JobOpening[] = [];
```

**`src/data/cities.ts`**
```typescript
import { CityConfig } from "../types/data.types";
export const citiesData: CityConfig[] = [];
```

**`src/data/stats.ts`**
```typescript
import { StatItem } from "../types/data.types";
export const statsData: StatItem[] = [];
```

**`src/data/partners.ts`**
```typescript
import { Partner } from "../types/data.types";
export const partnersData: Partner[] = [];
```

**`src/data/index.ts`**
```typescript
export * from "./company";
export * from "./seo";
export * from "./theme";
export * from "./navigation";
export * from "./services";
export * from "./industries";
export * from "./locations";
export * from "./branches";
export * from "./blog";
export * from "./faq";
export * from "./testimonials";
export * from "./careers";
export * from "./cities";
export * from "./stats";
export * from "./partners";
```

### Lib Files

**`src/lib/seo.ts`**
```typescript
// TODO: Implement generatePageMetadata, getOrganizationSchema, etc.
export function generateMetadata() {
  return {};
}
```

**`src/lib/crm.ts`**
```typescript
import { CRMLead } from "../types/integration.types";
// TODO: Implement CRM integration class
export class CrmService {
  async submitLead(lead: CRMLead): Promise<void> {}
}
```

**`src/lib/tracking.ts`**
```typescript
import { TrackingData } from "../types/integration.types";
// TODO: Implement shipment tracking integration
export class TrackingService {
  async getStatus(id: string): Promise<TrackingData | null> {
    return null;
  }
}
```

**`src/lib/google-maps.ts`**
```typescript
// TODO: Implement Google Maps client preparation
export class GoogleMapsService {
  loadMapScript(): void {}
}
```

**`src/lib/google-places.ts`**
```typescript
import { PlaceSuggestion } from "../types/integration.types";
// TODO: Implement Google Places autocomplete preparation
export class GooglePlacesService {
  async searchPredictions(input: string): Promise<PlaceSuggestion[]> {
    return [];
  }
}
```

**`src/lib/documents/advice.ts`**
```typescript
// TODO: Implement Collection Advice document generation
export function generateCollectionAdvice() {}
```

**`src/lib/documents/bilty.ts`**
```typescript
// TODO: Implement Bilty generation
export function generateBilty() {}
```

**`src/lib/documents/contract.ts`**
```typescript
// TODO: Implement Contract Form generation
export function generateContract() {}
```

**`src/lib/documents/inventory.ts`**
```typescript
// TODO: Implement Inventory List generation
export function generateInventoryList() {}
```

**`src/lib/documents/invoice.ts`**
```typescript
// TODO: Implement Quotation/Invoice generation
export function generateInvoice() {}
```

**`src/lib/documents/receipt.ts`**
```typescript
// TODO: Implement Money Receipt generation
export function generateReceipt() {}
```

### App Routes (Public)

**`src/app/layout.tsx`**
```typescript
import React from "react";
// TODO: Add global fonts, styles, and providers
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

**`src/app/page.tsx`**
```typescript
import React from "react";
// TODO: Render homepage layout sections
export default function HomePage() {
  return <div />;
}
```

**`src/app/robots.ts`**
```typescript
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
```

**`src/app/sitemap.ts`**
```typescript
import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
```

*(For brevity, similar basic placeholders for all static routes)*

**`src/app/about/page.tsx`**
```typescript
import React from "react";
// TODO: Implement About page shell
export default function AboutPage() { return <div />; }
```

**`src/app/gallery/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Gallery page shell
export default function GalleryPage() { return <div />; }
```

**`src/app/faq/page.tsx`**
```typescript
import React from "react";
// TODO: Implement FAQ page shell
export default function FAQPage() { return <div />; }
```

**`src/app/contact/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Contact form page shell
export default function ContactPage() { return <div />; }
```

**`src/app/quote/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Quote wizard page shell
export default function QuotePage() { return <div />; }
```

**`src/app/services/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Services catalog page shell
export default function ServicesPage() { return <div />; }
```

**`src/app/services/[slug]/page.tsx`**
```typescript
import React from "react";
// TODO: Implement dynamic Service detail page shell
export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) { return <div />; }
```

**`src/app/industries/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Industries catalog page shell
export default function IndustriesPage() { return <div />; }
```

**`src/app/industries/[slug]/page.tsx`**
```typescript
import React from "react";
// TODO: Implement dynamic Industry detail page shell
export default function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) { return <div />; }
```

**`src/app/locations/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Locations index page shell
export default function LocationsPage() { return <div />; }
```

**`src/app/locations/[slug]/page.tsx`**
```typescript
import React from "react";
// TODO: Implement dynamic Location SEO page shell
export default function LocationDetailPage({ params }: { params: Promise<{ slug: string }> }) { return <div />; }
```

**`src/app/branches/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Branches locator page shell
export default function BranchesPage() { return <div />; }
```

**`src/app/branches/[slug]/page.tsx`**
```typescript
import React from "react";
// TODO: Implement dynamic Branch detail page shell
export default function BranchDetailPage({ params }: { params: Promise<{ slug: string }> }) { return <div />; }
```

**`src/app/blog/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Blog index page shell
export default function BlogPage() { return <div />; }
```

**`src/app/blog/[slug]/page.tsx`**
```typescript
import React from "react";
// TODO: Implement dynamic Blog post page shell
export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) { return <div />; }
```

**`src/app/careers/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Careers index page shell
export default function CareersPage() { return <div />; }
```

**`src/app/careers/[slug]/page.tsx`**
```typescript
import React from "react";
// TODO: Implement dynamic Career detail page shell
export default function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) { return <div />; }
```

**`src/app/track/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Tracking form page shell
export default function TrackPage() { return <div />; }
```

**`src/app/track/[id]/page.tsx`**
```typescript
import React from "react";
// TODO: Implement dynamic Tracking detail page shell
export default function TrackDetailPage({ params }: { params: Promise<{ id: string }> }) { return <div />; }
```

### App Routes (Admin)

**`src/app/admin/layout.tsx`**
```typescript
import React from "react";
// TODO: Implement Admin layout (Sidebar, auth boundaries)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

**`src/app/admin/page.tsx`**
```typescript
import React from "react";
// TODO: Implement Admin Dashboard page shell
export default function AdminDashboardPage() { return <div />; }
```

*(Remaining Admin Pages)*
**`src/app/admin/customers/page.tsx`**
```typescript
import React from "react";
export default function AdminCustomersPage() { return <div />; }
```
**`src/app/admin/quotations/page.tsx`**
```typescript
import React from "react";
export default function AdminQuotationsPage() { return <div />; }
```
**`src/app/admin/shipments/page.tsx`**
```typescript
import React from "react";
export default function AdminShipmentsPage() { return <div />; }
```
**`src/app/admin/tracking/page.tsx`**
```typescript
import React from "react";
export default function AdminTrackingPage() { return <div />; }
```
**`src/app/admin/documents/page.tsx`**
```typescript
import React from "react";
export default function AdminDocumentsPage() { return <div />; }
```
**`src/app/admin/branches/page.tsx`**
```typescript
import React from "react";
export default function AdminBranchesPage() { return <div />; }
```
**`src/app/admin/employees/page.tsx`**
```typescript
import React from "react";
export default function AdminEmployeesPage() { return <div />; }
```
**`src/app/admin/reports/page.tsx`**
```typescript
import React from "react";
export default function AdminReportsPage() { return <div />; }
```
**`src/app/admin/settings/page.tsx`**
```typescript
import React from "react";
export default function AdminSettingsPage() { return <div />; }
```

### API Routes

**`src/app/api/contact/route.ts`**
```typescript
import { NextResponse } from "next";
// TODO: Implement CRM Contact API route handler
export async function POST(req: Request) {
  return NextResponse.json({ success: true });
}
```

**`src/app/api/quote/route.ts`**
```typescript
import { NextResponse } from "next";
// TODO: Implement Quote Calculator API route handler
export async function POST(req: Request) {
  return NextResponse.json({ success: true });
}
```

**`src/app/api/tracking/route.ts`**
```typescript
import { NextResponse } from "next";
// TODO: Implement Tracking Proxy API route handler
export async function GET(req: Request) {
  return NextResponse.json({ success: true });
}
```

**`src/app/api/locations/route.ts`**
```typescript
import { NextResponse } from "next";
// TODO: Implement Location Search API route handler
export async function GET(req: Request) {
  return NextResponse.json({ success: true });
}
```

**`src/app/api/documents/route.ts`**
```typescript
import { NextResponse } from "next";
// TODO: Implement Document Generation API route handler
export async function POST(req: Request) {
  return NextResponse.json({ success: true });
}
```

## 3. Setup Notes

1. **Routing Strategy**: The architecture utilizes Next.js App Router entirely. `page.tsx` files are server components by default. Client components should be designated with `"use client";` at the top of the file when interactivity (like forms or maps) is added later.
2. **Data Mocking Strategy**: Populate the constants in `src/data/` with your real data. Ensure that the shape strictly conforms to the interfaces defined in `src/types/data.types.ts`.
3. **Dynamic Route Types**: Notice that `params` is accessed as a `Promise` in Next.js 15+ App Router dynamic segments (e.g., `params: Promise<{ slug: string }>`).
4. **Tailwind Config**: The global CSS variables for themes will eventually be bound to the variables inside `src/data/theme.ts`. No tailwind configuration has been written in this scaffold, per instructions.

## 4. Verification Checklist

- [ ] Folder structure matches final architecture (Public, Admin, API).
- [ ] Data layer exists with all 13 core files and properly defined exports.
- [ ] Type definitions for Data, Integrations, and Documents are in place.
- [ ] Library abstractions for CRM, Tracking, Maps, Places, and Documents are stubbed.
- [ ] All public static and dynamic `page.tsx` endpoints are scaffolded.
- [ ] All admin protected `page.tsx` endpoints are scaffolded.
- [ ] All API `route.ts` files return valid NextResponse.
- [ ] No UI code, React components, styling, or business logic has been implemented.
