const fs = require('fs');
const lines = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8').split('\n');

// Take lines 0 to 207 (up to Desktop CTAs comment)
const topPart = lines.slice(0, 208).join('\n');

const restPart = `            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/track"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md text-[#374151] hover:text-[#0052CC] hover:bg-[#F5F7FF] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                Track
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-[#0052CC] hover:bg-[#0047B3] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]"
              >
                Get Quote
              </Link>
            </div>

            {/* ---------------- Mobile hamburger ---------------- */}
            {/*
              IMPORTANT: This button must remain visible at all mobile viewport sizes.
              Touch target: 44x44px minimum.
            */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls={PANEL_ID}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={[
                'relative z-50', // Ensure it is above any siblings
                'flex md:hidden items-center justify-center',
                'w-11 h-11 -mr-1.5 rounded-lg',
                'text-[#374151] transition-colors duration-150',
                menuOpen ? 'bg-[#F3F4F6] text-[#0D1117]' : 'hover:bg-[#F3F4F6]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0052CC]',
                'touch-manipulation', // prevent 300ms tap delay on iOS
              ].join(' ')}
            >
              {/* Animated hamburger/close icon */}
              <svg
                className="w-5 h-5 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.75}
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Mobile backdrop ---------------- */}
      {/* Separate from header so it can use higher z-index */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={[
          'fixed inset-0 z-[55] bg-black/40 md:hidden',
          'transition-opacity duration-200 ease-out',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* ---------------- Mobile slide-over panel ---------------- */}
      <div
        id={PANEL_ID}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={[
          'fixed top-0 right-0 bottom-0 z-[60] w-[min(300px,90vw)]',
          'bg-white flex flex-col md:hidden',
          'shadow-2xl',
          'transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          menuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible pointer-events-none',
        ].join(' ')}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between p-4 border-b border-[#F3F4F6]">
          <span className="font-bold text-[#0D1117] tracking-tight">Menu</span>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
          <nav className="flex flex-col gap-6">
            <div>
              <div className="mb-3 px-2 text-xs font-bold tracking-wider text-[#6B7280] uppercase">
                Services
              </div>
              <div className="flex flex-col gap-1">
                {servicesData.map((s) => (
                  <Link
                    key={s.slug}
                    href={\`/services/\${s.slug}\`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.9375rem] font-medium text-[#374151] hover:bg-[#F9FAFB] hover:text-[#0052CC]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]/30 shrink-0" />
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 px-2 text-xs font-bold tracking-wider text-[#6B7280] uppercase">
                Industries
              </div>
              <div className="flex flex-col gap-1">
                {industriesData.map((i) => (
                  <Link
                    key={i.slug}
                    href={\`/industries/\${i.slug}\`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.9375rem] font-medium text-[#374151] hover:bg-[#F9FAFB] hover:text-[#0052CC]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]/30 shrink-0" />
                    {i.title}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 px-2 text-xs font-bold tracking-wider text-[#6B7280] uppercase">
                Company
              </div>
              <div className="flex flex-col gap-1">
                <Link
                  href="/locations"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.9375rem] font-medium text-[#374151] hover:bg-[#F9FAFB] hover:text-[#0052CC]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]/30 shrink-0" />
                  Locations
                </Link>
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.9375rem] font-medium text-[#374151] hover:bg-[#F9FAFB] hover:text-[#0052CC]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0052CC]/30 shrink-0" />
                  About
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Panel footer */}
        <div className="mt-auto p-4 border-t border-[#F3F4F6] bg-[#F9FAFB]">
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/track"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-sm font-medium text-[#374151] shadow-sm active:bg-[#F3F4F6]"
            >
              Track
            </Link>
            <Link
              href="/quote"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0052CC] text-white text-sm font-medium shadow-sm active:bg-[#0047B3]"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
`;

fs.writeFileSync('src/components/layout/Navbar.tsx', topPart + '\n' + restPart);
console.log('Successfully rebuilt Navbar.tsx');
