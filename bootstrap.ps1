$pageContent = @"
export default function Page() {
  return null;
}
"@

$rootLayoutContent = @"
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
"@

$adminLayoutContent = @"
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
"@

$routeContent = @"
import { NextResponse } from "next";

export async function GET() {
  return NextResponse.json({});
}
"@

$moduleContent = @"
export const placeholder = {};
"@

$typesContent = @"
export interface Placeholder {}
"@

$robotsContent = @"
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" } };
}
"@

$sitemapContent = @"
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [];
}
"@

function Write-File {
    param([string]$Path, [string]$Content)
    $dir = Split-Path $Path
    if ($dir -ne "" -and -not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    Set-Content -Path $Path -Value $Content -Encoding UTF8
}

function Make-Dir {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        New-Item -ItemType Directory -Force -Path $Path | Out-Null
    }
}

# Create public asset directories
Make-Dir "public/logos"
Make-Dir "public/images/hero"
Make-Dir "public/images/services"
Make-Dir "public/images/industries"
Make-Dir "public/images/gallery"
Make-Dir "public/images/tracking"
Make-Dir "public/images/blog"
Make-Dir "public/images/branches"
Make-Dir "public/videos"
Make-Dir "public/icons"
Make-Dir "public/documents"

# Create components directories
Make-Dir "src/components/forms"
Make-Dir "src/components/gallery"
Make-Dir "src/components/home"
Make-Dir "src/components/layout"
Make-Dir "src/components/maps"
Make-Dir "src/components/seo"
Make-Dir "src/components/services"
Make-Dir "src/components/shared"
Make-Dir "src/components/tracking"

# Create hooks and utils directories
Make-Dir "src/hooks"
Make-Dir "src/utils"

# Pages
$pages = @(
    "src/app/page.tsx",
    "src/app/about/page.tsx",
    "src/app/admin/page.tsx",
    "src/app/admin/branches/page.tsx",
    "src/app/admin/customers/page.tsx",
    "src/app/admin/documents/page.tsx",
    "src/app/admin/employees/page.tsx",
    "src/app/admin/quotations/page.tsx",
    "src/app/admin/reports/page.tsx",
    "src/app/admin/settings/page.tsx",
    "src/app/admin/shipments/page.tsx",
    "src/app/admin/tracking/page.tsx",
    "src/app/blog/page.tsx",
    "src/app/blog/[slug]/page.tsx",
    "src/app/branches/page.tsx",
    "src/app/branches/[slug]/page.tsx",
    "src/app/careers/page.tsx",
    "src/app/careers/[slug]/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/faq/page.tsx",
    "src/app/gallery/page.tsx",
    "src/app/industries/page.tsx",
    "src/app/industries/[slug]/page.tsx",
    "src/app/locations/page.tsx",
    "src/app/locations/[slug]/page.tsx",
    "src/app/quote/page.tsx",
    "src/app/services/page.tsx",
    "src/app/services/[slug]/page.tsx",
    "src/app/track/page.tsx",
    "src/app/track/[id]/page.tsx"
)

foreach ($page in $pages) {
    Write-File -Path $page -Content $pageContent
}

# Layouts
Write-File -Path "src/app/layout.tsx" -Content $rootLayoutContent
Write-File -Path "src/app/admin/layout.tsx" -Content $adminLayoutContent

# Robots & Sitemap
Write-File -Path "src/app/robots.ts" -Content $robotsContent
Write-File -Path "src/app/sitemap.ts" -Content $sitemapContent

# API Routes
$apiRoutes = @(
    "src/app/api/contact/route.ts",
    "src/app/api/documents/route.ts",
    "src/app/api/locations/route.ts",
    "src/app/api/quote/route.ts",
    "src/app/api/tracking/route.ts"
)

foreach ($route in $apiRoutes) {
    Write-File -Path $route -Content $routeContent
}

# Data & Lib files
$moduleFiles = @(
    "src/data/blog.ts",
    "src/data/branches.ts",
    "src/data/careers.ts",
    "src/data/cities.ts",
    "src/data/company.ts",
    "src/data/faq.ts",
    "src/data/index.ts",
    "src/data/industries.ts",
    "src/data/locations.ts",
    "src/data/navigation.ts",
    "src/data/seo.ts",
    "src/data/services.ts",
    "src/data/testimonials.ts",
    "src/data/theme.ts",
    "src/lib/documents/advice.ts",
    "src/lib/documents/bilty.ts",
    "src/lib/documents/contract.ts",
    "src/lib/documents/inventory.ts",
    "src/lib/documents/invoice.ts",
    "src/lib/documents/receipt.ts",
    "src/lib/crm.ts",
    "src/lib/google-maps.ts",
    "src/lib/google-places.ts",
    "src/lib/seo.ts",
    "src/lib/tracking.ts"
)

foreach ($mod in $moduleFiles) {
    Write-File -Path $mod -Content $moduleContent
}

# Types files
$typeFiles = @(
    "src/types/data.types.ts",
    "src/types/documents.types.ts",
    "src/types/integration.types.ts"
)

foreach ($tf in $typeFiles) {
    Write-File -Path $tf -Content $typesContent
}

Write-Host "Project bootstrap completed successfully."