"use client";

import React, { useState } from "react";
import Link from "next/link";
import { companyConfig } from '@/config/company';
import { contactConfig } from '@/config/contact';

const DEMO_SHIPMENT = {
  consignmentNo: "TCI-2026-9823",
  customerName: "Rahul Sharma",
  from: "Mumbai, Maharashtra",
  to: "New Delhi, Delhi",
  serviceType: "Household Shifting",
  bookedOn: "Oct 21, 2026",
  estimatedDelivery: "Oct 25–26, 2026",
  currentStatus: "In Transit",
  timeline: [
    {
      id: 1,
      status: "Booking Confirmed",
      detail: "Your booking has been confirmed and assigned to our operations team.",
      timestamp: "Oct 21, 2026",
      done: true,
      active: false,
    },
    {
      id: 2,
      status: "Pickup Scheduled",
      detail: "Our crew has been dispatched. Pickup scheduled at your doorstep.",
      timestamp: "Oct 21, 2026",
      done: true,
      active: false,
    },
    {
      id: 3,
      status: "Picked Up",
      detail: "Goods picked up and packed. Shipment loaded and sealed.",
      timestamp: "Oct 22, 2026",
      done: true,
      active: false,
    },
    {
      id: 4,
      status: "In Transit",
      detail: "Shipment is on the way to the destination city.",
      timestamp: "Oct 23, 2026",
      done: true,
      active: true,
    },
    {
      id: 5,
      status: "Reached Destination Hub",
      detail: "Goods have arrived at the destination city hub for final processing.",
      timestamp: "Pending",
      done: false,
      active: false,
    },
    {
      id: 6,
      status: "Out for Delivery",
      detail: "Our delivery crew is on the way to your new address.",
      timestamp: "Pending",
      done: false,
      active: false,
    },
    {
      id: 7,
      status: "Delivered",
      detail: "Shipment delivered and handover complete.",
      timestamp: "Pending",
      done: false,
      active: false,
    },
  ],
};

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "In Transit":       { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", dot: "bg-[#D97706]" },
  "Delivered":        { bg: "bg-[#DCFCE7]", text: "text-[#15803D]", dot: "bg-[#16A34A]" },
  "Booking Confirmed":{ bg: "bg-[#EEF4FF]", text: "text-brand-blue", dot: "bg-brand-blue" },
  "Picked Up":        { bg: "bg-[#F5F3FF]", text: "text-[#7C3AED]", dot: "bg-[#7C3AED]" },
};

function getStatusStyle(status: string) {
  return STATUS_COLORS[status] ?? { bg: "bg-[#F3F4F6]", text: "text-[#4B5563]", dot: "bg-[#6B7280]" };
}

export function TrackClient() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    const val = query.trim();
    if (!val) {
      setError("Please enter your tracking ID.");
      const el = document.getElementById("trackInput");
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }
    if (val.length < 5) {
      setError("Tracking IDs usually contain letters and numbers.");
      const el = document.getElementById("trackInput");
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
      return;
    }
    setError("");
    setSearched(true);
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toUpperCase());
    if (error) setError("");
  };

  const style = getStatusStyle(DEMO_SHIPMENT.currentStatus);

  return (
    <main>
      {/* ── Hero / Input ─────────────────────────────────────────────────── */}
      <section className="relative w-full bg-brand-navy overflow-hidden pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: "radial-gradient(circle, #0052CC 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-[#60A5FA] mb-3">
              Shipment Status
            </p>
            <h1 className="text-[1.875rem] sm:text-[2.25rem] font-bold text-white leading-[1.1] tracking-[-0.025em] mb-3">
              Track Your Shipment
            </h1>
            <p className="text-sm text-white/55 mb-6 leading-relaxed">
              Enter your Consignment Number or LR Number to check the current status of your shipment.
            </p>

            {/* Search form */}
            <form onSubmit={handleTrack} className="flex flex-col gap-2 max-w-xl">
              <label htmlFor="trackInput" className="sr-only">Consignment or LR Number</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="trackInput"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="e.g. TCI-2026-9823"
                    className={[
                      "w-full h-[52px] pl-11 md:pl-12 pr-4 text-[15px] rounded-xl font-medium",
                      "bg-white/10 border text-white placeholder:text-white/40",
                      error ? "border-[#EF4444] focus:border-[#EF4444] focus:ring-4 focus:ring-[#EF4444]/20" : "border-white/15 focus:border-white/40 focus:ring-4 focus:ring-white/5",
                      "focus:outline-none transition-all duration-200",
                    ].join(" ")}
                    autoComplete="off"
                    spellCheck={false}
                    aria-invalid={!!error}
                    aria-describedby={error ? "trackInput-error" : undefined}
                  />
                  <svg className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <button
                  type="submit"
                  className={[
                    "h-[52px] px-8 text-[15px] font-bold text-white rounded-xl shadow-lg",
                    "bg-brand-blue hover:bg-[#0047B3] active:bg-[#003B99]",
                    "transition-all duration-200 hover:-translate-y-0.5",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                    "touch-manipulation shrink-0",
                  ].join(" ")}
                >
                  Track Status
                </button>
              </div>
              {error && <p id="trackInput-error" className="text-[13px] text-[#EF4444] font-medium px-1">{error}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* ── Demo Shipment Result ──────────────────────────────────────────── */}
      <section className="w-full py-10 md:py-14 bg-[#F8FAFC]">
        <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-1">
                {searched ? `Results for: ${query}` : "Sample Tracking View"}
              </p>
              <h2 className="text-xl font-bold text-background-dark tracking-[-0.02em]">
                Consignment #{DEMO_SHIPMENT.consignmentNo}
              </h2>
            </div>
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 ${style.bg} ${style.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
              {DEMO_SHIPMENT.currentStatus}
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6">

            {/* ── Timeline ─────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#F3F4F6] bg-gray-50/50">
                <h3 className="text-[15px] font-bold text-background-dark">Shipment Timeline</h3>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-black/5 whitespace-nowrap shrink-0 ${style.bg} ${style.text}`}>
                  <span className={`w-2 h-2 rounded-full shadow-inner shrink-0 ${style.dot}`} />
                  {DEMO_SHIPMENT.currentStatus}
                </span>
              </div>

              {/* Steps */}
              <div className="p-5">
                <ol className="relative border-l border-[#E5E7EB] ml-3 space-y-0" aria-label="Shipment timeline">
                  {DEMO_SHIPMENT.timeline.map((step, idx) => (
                    <li
                      key={step.id}
                      className={`pl-6 pb-6 relative ${idx === DEMO_SHIPMENT.timeline.length - 1 ? 'pb-0' : ''}`}
                    >
                      {/* Dot */}
                      <span
                        className={[
                          "absolute -left-[9px] top-0.5 flex w-[18px] h-[18px] rounded-full items-center justify-center",
                          step.active
                            ? "bg-brand-blue ring-4 ring-brand-blue/20"
                            : step.done
                            ? "bg-[#16A34A]"
                            : "bg-[#E5E7EB]",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        {step.done && !step.active && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {step.active && (
                          <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true" />
                        )}
                      </span>

                      {/* Content */}
                      <div>
                        {/* Status + badge on same row */}
                        <div className="flex items-start gap-2 flex-wrap">
                          <p className={`text-[15px] font-bold leading-tight ${step.done || step.active ? 'text-background-dark' : 'text-[#9CA3AF]'}`}>
                            {step.status}
                            {step.active && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-blue text-white align-middle shadow-sm whitespace-nowrap shrink-0">
                                Current
                              </span>
                            )}
                          </p>
                        </div>
                        {/* Date on its own line — no clipping on mobile */}
                        <time className="block text-[12px] text-[#6B7280] mt-1 font-medium">
                          {step.timestamp}
                        </time>
                        <p className={`text-[13px] mt-1.5 leading-relaxed max-w-[90%] ${step.done || step.active ? 'text-[#4B5563]' : 'text-[#D1D5DB]'}`}>
                          {step.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* ── Sidebar: Shipment Details + Help ─────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Shipment Details card */}
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-[#F3F4F6] bg-gray-50/50">
                  <h3 className="text-[15px] font-bold text-background-dark">Shipment Details</h3>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: "Consignment No.", value: DEMO_SHIPMENT.consignmentNo },
                    { label: "Customer", value: DEMO_SHIPMENT.customerName },
                    { label: "Service", value: DEMO_SHIPMENT.serviceType },
                    { label: "From", value: DEMO_SHIPMENT.from },
                    { label: "To", value: DEMO_SHIPMENT.to },
                    { label: "Booked On", value: DEMO_SHIPMENT.bookedOn },
                    { label: "Est. Delivery", value: DEMO_SHIPMENT.estimatedDelivery },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 border-b border-dashed border-[#E5E7EB] pb-3 last:border-0 last:pb-0">
                      <span className="text-[13px] font-medium text-[#6B7280]">{item.label}</span>
                      <span className="text-[14px] font-bold text-background-dark sm:text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help card */}
              <div className="bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-5">
                <h3 className="text-sm font-bold text-background-dark mb-2">Need Help?</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                  Can&apos;t find your shipment or have questions about your delivery? Our team is ready to help.
                </p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href={`tel:${contactConfig.phone}`}
                    className="flex items-center justify-center gap-2 h-10 text-xs font-semibold text-background-dark rounded-lg border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] transition-colors duration-150 touch-manipulation"
                  >
                    <svg className="w-3.5 h-3.5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Call Support
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center h-10 text-xs font-semibold text-brand-blue rounded-lg border border-brand-blue/20 bg-[#EEF4FF] hover:bg-[#DBEAFE] transition-colors duration-150 touch-manipulation"
                  >
                    Submit a Query
                  </Link>
                </div>
              </div>

            </div>
          </div>

          <p className="mt-6 text-center text-xs text-[#9CA3AF]">
            * Displaying a sample shipment. Enter your real Consignment Number above to track your shipment.
          </p>
        </div>
      </section>

      {/* ── How Tracking Works ────────────────────────────────────────────── */}
      <section className="w-full py-10 md:py-14 bg-white border-t border-[#E5E7EB]">
        <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-blue mb-2">
              How it works
            </p>
            <h2 className="text-xl font-bold text-background-dark tracking-[-0.02em]">
              How Our Tracking Works
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
              Once your shipment is booked, you receive a unique Consignment Number or LR (Lorry Receipt) number. Enter it above to see the current status of your goods.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                n: "01",
                title: "Get Your Number",
                desc: "After booking, you receive a Consignment No. or LR No. by SMS or WhatsApp.",
              },
              {
                n: "02",
                title: "Enter & Track",
                desc: "Enter the number in the search field above and check the current status.",
              },
              {
                n: "03",
                title: "Stay Updated",
                desc: "Our team updates the status at each key stage — from pickup through to delivery.",
              },
            ].map((item) => (
              <div key={item.n} className="p-5 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC]">
                <span className="font-mono text-xl font-bold text-brand-blue/20 block mb-2">
                  {item.n}
                </span>
                <h3 className="text-sm font-semibold text-background-dark mb-1">{item.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="w-full py-12 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="w-full max-w-[1216px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-background-dark mb-2 tracking-[-0.02em]">
            Ready to Book Your Next Move?
          </h2>
          <p className="text-sm text-[#6B7280] mb-5 max-w-md mx-auto">
            Get a free quote and experience premium logistics firsthand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-brand-red rounded-lg hover:bg-[#CC2A2A] transition-colors touch-manipulation"
            >
              Request a Free Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-[#374151] rounded-lg border border-[#D1D5DB] hover:bg-white transition-colors touch-manipulation"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
