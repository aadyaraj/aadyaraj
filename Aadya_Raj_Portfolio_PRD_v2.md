# Product Requirements Document
## Aadya Raj — Data Analyst Portfolio Website (Multi-Page, v2)

**Prepared for:** Aadya Raj
**Document Version:** 2.0 (supersedes v1 — single-page reference)
**Date:** August 2026

---

## 1. Overview

### 1.1 Purpose
This document defines requirements for a **multi-page** portfolio website for Aadya Raj, Data Analyst, based on the updated reference theme (clean light UI, navy/blue accent, dashboard-style hero with live-looking charts).

### 1.2 What's New vs. v1
- **Architecture change:** Previously scoped as a single scrolling page. This version splits each section into its **own dedicated page/route** with top navigation linking between them.
- **New theme reference:** Light background, navy-blue (#1E3A5F / #0F2A47) and steel-blue accents, card-based dashboard widgets (line chart, donut chart), rounded stat cards, and a **dark/light mode toggle** shown top-right of the nav bar.
- **New requirement:** Functional dark/light mode toggle.

### 1.3 Goals
- Present a fast, professional, data-dashboard-flavored personal site that itself demonstrates data-visualization sense (the hero's own charts are a subtle proof-of-skill).
- Let visitors jump directly to the page they care about (e.g., a hiring manager skipping straight to Experience or Projects) via clear navigation, without scrolling through unrelated sections.
- Support both light and dark reading preferences.

### 1.4 Target Audience
- Recruiters and hiring managers screening Data Analyst candidates.
- Hiring managers/team leads assessing SQL, Excel, Power BI, and Python depth.
- Potential freelance/consulting clients seeking analytics/reporting help.

---

## 2. Design Direction (Reference Theme)

| Element | Direction |
|---|---|
| **Layout style** | Clean, light, "analytics dashboard" aesthetic — white background, soft rounded cards with light borders/shadows, generous padding, professional (not experimental) feel |
| **Color palette** | Primary: Navy Blue (#1E3A5F) — Secondary/Accent: Steel Blue (#4A7FB5) and light blue tints (#D6E4F0) for chart fills and highlight badges — Background: White/off-white (#FFFFFF / #F8FAFC) — Text: Dark slate (#1A1A2E) |
| **Typography** | Modern clean sans-serif (e.g., "Inter" or "Söhne") — bold large headline on hero ("Turning Data into Meaningful Decisions"), regular-weight body copy |
| **Signature visual** | Hero dashboard panel containing: 4 stat tiles (Records Processed, KPI Reports Created, Data Sources Integrated, Reporting Time Reduced), a line chart ("Performance Trend" Jan–Dec), and a donut chart ("Volume by Region") — these should use **real resume-derived numbers**, not placeholder data |
| **Cards** | Rounded white cards with colored icon badges (SQL/Excel/Power BI/Python/Analytics/Tools), light shadow on hover |
| **Navigation** | Top nav: Home / About / Skills / Experience / Projects / Education / Contact — each a **separate page**, with active-page underline indicator (as shown under "Home" in the reference) |
| **Toggle** | Dark/light mode pill toggle (sun/moon icons) fixed at top-right of nav bar, visible on every page |
| **Footer** | Recurring cross-page footer: process-flow icon strip (Collect → Process → Explore → Report → Understand → Act) plus a closing tagline and copyright — present identically on all pages |

### 2.1 Multi-Page Architecture (New)
Each nav item routes to its own page rather than an anchor-scroll section:

| Page | Route (suggested) | Content |
|---|---|---|
| Home | `/` | Hero (headline, intro, CTA buttons, dashboard stat/chart panel), quick stat strip, footer |
| About | `/about` | Extended bio/summary, career narrative (Cognizant roles), personal framing |
| Skills | `/skills` | Full technical skills grid (SQL, Excel, Power BI, Python, Analytics, Tools) |
| Experience | `/experience` | Detailed timeline: Cognizant – Process Executive/Analyst (Client: Google) and Customer Operations & Performance Analytics roles, full bullet detail |
| Projects | `/projects` | Featured project cards (KPI Performance Dashboard, Operational Analytics Report, Data Reconciliation Tracker) with tags and "View All Projects" |
| Education | `/education` | International School of Management (BBA) + IIT Madras Certified Data Analyst Training (ExcelR) |
| Contact | `/contact` | Contact details (phone, email, LinkedIn, location), simple contact form |

- Shared persistent elements across all pages: top nav (with dark/light toggle), footer.
- Home page retains a condensed preview of Skills/Experience/Projects with "View more" links into their full dedicated pages, matching how the reference screenshot compresses everything onto one view — but here those previews link out instead of just being the full content.
- Client-side routing (single-page-app style routing, e.g. React Router) recommended so the nav still feels instant despite being separate "pages."

### 2.2 Dark / Light Mode Toggle
- Pill-style toggle with sun/moon icons, fixed top-right of nav, present on all pages.
- **Light mode (default):** palette as described in section 2 above.
- **Dark mode:** navy background (#0F172A), lighter card panels (#1E293B), text inverted to near-white (#F1F5F9), chart colors adjusted for dark-background contrast (brighter blue/cyan lines), stat-tile icon badges recolored for visibility.
- Preference saved (e.g., localStorage) and persists across page navigation and reloads.
- Instant switch, no flash-of-wrong-theme on page load.

---

## 3. Page-by-Page Requirements

### 3.1 Home (`/`)
- Headline: "Turning Data into Meaningful Decisions"
- Sub-text: adapted from resume summary (2+ years Data Analyst experience, SQL/Excel/Power BI/Python)
- CTAs: "View My Work" (→ Projects page), "Download Resume" (PDF)
- Social icons: LinkedIn, Email, Phone
- **Dashboard stat panel:**
  - Records Processed: 100K+
  - KPI Reports Created: 10+
  - Data Sources Integrated: 5+
  - Reporting Time Reduced: 40%
  - Line chart: "Performance Trend" (illustrative monthly trend — label clearly as illustrative unless real report data is provided)
  - Donut chart: "Volume by Region" (APAC/EMEA/AMER/Other — **placeholder unless Aadya supplies real regional data**; flag clearly if kept)
- Secondary stat strip: 2+ Years Experience · 100K+ Records Processed · 10+ KPI Reports · 40% Faster Reporting · 95%+ Accuracy & SLA Adherence

### 3.2 About (`/about`)
- Full narrative bio combining both Cognizant roles (Process Executive/Analyst under Client: Google, and Customer Operations & Performance Analytics)
- Emphasis on: large dataset handling, KPI development, data cleaning/reconciliation, stakeholder communication, 95%+ accuracy/SLA adherence

### 3.3 Skills (`/skills`)
Six category cards, each with icon + bullet list:
1. **SQL** — Joins, GROUP BY, Subqueries, CTEs, Window Functions, CASE Statements, Aggregate Functions
2. **Excel** — Pivot Tables, XLOOKUP/VLOOKUP, INDEX-MATCH, Advanced Formulas, Charts & Dashboards
3. **Power BI** — Power Query, Data Modeling, DAX, KPI Dashboards, Interactive Reports
4. **Python** — Pandas, NumPy, Data Cleaning, Data Transformation, Exploratory Data Analysis
5. **Analytics** — Trend Analysis, Variance Analysis, Root Cause Analysis, Data Reconciliation, KPI Reporting
6. **Tools** — Jira, Google Workspace, PowerPoint, Advanced Excel, SQL, Power BI, Python

### 3.4 Experience (`/experience`)
Full timeline detail (both roles under Cognizant), each with complete bullet lists from the resume:
- **Cognizant — Process Executive/Analyst** (Nov 2022–Present), Client: Google — all 6 bullets (record standardization, reporting templates/40% time reduction, 10+ KPI/Power BI dashboards, SQL analysis, root-cause analysis on 20+ issues, cross-functional collaboration)
- **Client: Google — Customer Operations & Performance Analytics** — all 5 bullets (500+ items/day review, 10,000+ cases/month, 95%+ accuracy/SLA, quality/root-cause analysis, daily/weekly performance reporting)

### 3.5 Projects (`/projects`)
Card grid (expandable via "View All Projects"):
- **KPI Performance Dashboard** — monitors productivity, quality, volume, TAT, revenue trends across teams (Power BI, SQL)
- **Operational Analytics Report** — analyzes operational data to identify trends, anomalies, performance gaps (Excel, SQL)
- **Data Reconciliation Tracker** — reconciliation templates to track/resolve data discrepancies (Excel, SQL)

*(These three map to real resume achievements; recommend Aadya confirm/expand with dashboard screenshots or links once available.)*

### 3.6 Education (`/education`)
- **International School of Management** — Bachelor of Business Administration (Jul 2019–Aug 2022)
- **Certification:** IIT Madras Certified Data Analyst Training – ExcelR

### 3.7 Contact (`/contact`)
- Phone: +91-7763049922
- Email: aadyaraj81@gmail.com
- LinkedIn: linkedin.com/in/aadya-raj
- Location: Bangalore, India
- Simple contact form (Name, Email, Message)

### 3.8 Footer (all pages)
- Process-flow icon strip: Data (Collect) → Clean (Process) → Analyze (Explore) → Visualize (Report) → Insight (Understand) → Decision (Act)
- Tagline: "Good data tells you what happened. Great analysis tells you why it matters."
- Copyright line

---

## 4. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Multi-page architecture — each nav item routes to its own page (client-side routing) | Must-have |
| FR-2 | **Dark/light mode toggle**, persistent across pages and reloads, instant switch | Must-have |
| FR-3 | Responsive design across desktop, tablet, mobile | Must-have |
| FR-4 | Downloadable PDF resume link | Must-have |
| FR-5 | Working contact form with email delivery | Must-have |
| FR-6 | Hero charts (line + donut) built as real chart components, not static images, so data can be updated later | Should-have |
| FR-7 | Consistent nav + footer shared across all pages via a layout component | Must-have |
| FR-8 | SEO metadata per page (title, description, Open Graph tags) | Should-have |
| FR-9 | Fast page-to-page transitions (no full reload) | Should-have |

## 5. Non-Functional Requirements
- **Performance:** Sub-3-second initial load; instant client-side navigation between pages.
- **Accessibility:** WCAG-AA contrast in both light and dark themes; charts have accessible text alternatives/summaries.
- **Hosting:** Static/SPA-friendly hosting (Vercel/Netlify) with routing fallback configured for direct page links (e.g., `/projects` loading correctly on refresh).
- **Maintainability:** Skills/experience/project content structured as data (JSON/config) so page content updates don't require touching layout/routing code.

## 6. Content Gaps / Open Questions
1. The hero's line chart ("Performance Trend") and donut chart ("Volume by Region") are illustrative in the reference theme — confirm whether real report data is available, or whether these should be labeled/replaced with different resume-backed metrics.
2. Only three project names are visible/implied — confirm descriptions, and whether links, screenshots, or case-study detail pages should be added.
3. Confirm preferred dark-mode palette (default proposal above vs. custom).
4. Confirm whether "View All Projects" implies more than the three shown, or is just a UI affordance for now.

## 7. Success Metrics
- Recruiter/hiring manager contact form submissions or direct outreach generated via the site.
- Resume download count.
- Page-level engagement (time on Skills/Experience/Projects pages) to see which content resonates most.

---

*This PRD (v2) supersedes the single-page structure in v1 and reflects the updated theme reference, multi-page architecture, and dark/light mode toggle requested.*
