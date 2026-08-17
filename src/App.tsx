import { useState, useEffect, Fragment } from 'react'

// ── Decorative SVGs ─────────────────────────────────────────────

function Rings({ size = 240, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 240 240" className={className} aria-hidden="true">
      {[24, 48, 72, 96, 120, 144, 168, 192].map((r) => (
        <circle key={r} cx="120" cy="120" r={r} fill="none" stroke="#c4b5a4" strokeWidth="0.8" />
      ))}
    </svg>
  )
}

function Dots({ className = '' }: { className?: string }) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className={className} aria-hidden="true">
      {Array.from({ length: 4 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={7 + c * 14} cy={7 + r * 14} r="1.8" fill="#b5a08a" />
        ))
      )}
    </svg>
  )
}

// ── Icons ───────────────────────────────────────────────────────

const IcHome = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a8917a" strokeWidth="1.6">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const IcLeaf = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a8917a" strokeWidth="1.6">
    <path d="M11 20A7 7 0 014 13c0-5 7-13 9-13s9 8 9 13a7 7 0 01-7 7z" />
    <line x1="12" y1="20" x2="12" y2="13" />
  </svg>
)

const IcStar = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a8917a" strokeWidth="1.6">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const IcDrop = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a8917a" strokeWidth="1.6">
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
)

const IcTag = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a8917a" strokeWidth="1.6">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

const IcBag = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a8917a" strokeWidth="1.6">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
)

const IcClose = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IcMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
)

const IcPulseHeart = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8,40 20,40 28,18 40,62 52,34 60,40 72,40" />
    <path d="M40 68l-18-18a12 12 0 010-17 12 12 0 0118 6 12 12 0 0118-6 12 12 0 010 17z" fill="none" />
  </svg>
)

const IcInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

const IcCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3c7a52" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ── Shared component ────────────────────────────────────────────

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start group">
      <div className="w-10 h-10 rounded-full bg-taupe/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-taupe/35">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-ink text-sm leading-snug mb-0.5">{title}</p>
        <p className="text-ink/55 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

// ── Data ────────────────────────────────────────────────────────

const NAV_LINKS = ['Home', 'Our Yogurt', 'Why YGRT', 'Sustainability']
const NAV_HREFS = ['#hero', '#yogurt', '#why', '#sustainability']

const FLOW_STEPS = ['Orders', 'Production', 'Inventory', 'Customers']

// ── App ─────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-cream text-ink font-body min-h-screen overflow-x-hidden">

      {/* ──────────────────── NAVBAR ──────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream/96 backdrop-blur-md border-b border-sand/70 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-display font-black text-[26px] text-ink tracking-tight leading-none">
            YGRT.
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a key={link} href={NAV_HREFS[i]} className="text-sm text-ink/65 hover:text-ink transition-colors font-medium">
                {link}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-ink/70 hover:text-ink transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IcClose /> : <IcMenu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-cream/98 border-t border-sand/60 px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href={NAV_HREFS[i]}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-ink/75 hover:text-ink transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ──────────────────── HERO ──────────────────── */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <Rings size={520} className="absolute -left-52 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
        <Rings size={360} className="absolute -bottom-28 -right-24 opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-6 items-center py-20">
          {/* Left */}
          <div className="relative z-10">
            <Dots className="absolute -top-6 -left-2 opacity-55" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-taupe uppercase block mb-5">
              YGRT.
            </span>
            <h1 className="font-display font-black leading-[0.88] text-ink uppercase mb-6" style={{ fontSize: 'clamp(64px, 8vw, 104px)' }}>
              Less<br />processing.<br />More<br />tasting.
            </h1>
            <p className="text-ink/55 text-[17px] leading-relaxed max-w-sm mb-8">
              Rich, creamy yogurt made with quality ingredients and without unnecessary additives.
            </p>
            <a href="#why" className="px-7 py-3 border border-ink/25 text-ink font-semibold rounded-full text-sm hover:border-ink/50 transition-colors inline-block">
              Discover YGRT
            </a>
          </div>

          {/* Right: photo composition */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <Rings size={500} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />
            <Dots className="absolute top-2 left-2 sm:left-8 opacity-45" />

            <div className="relative" style={{ width: 'min(420px, 85vw)' }}>
              <img
                src="https://images.unsplash.com/photo-1612182062572-e29c5dfb5eb4?w=840&h=840&fit=crop&auto=format"
                alt="Creamy natural yogurt with a spoon"
                className="w-full aspect-square object-cover rounded-2xl"
              />

              <div className="absolute -right-[88px] top-0 bottom-0 hidden sm:flex flex-col justify-between gap-2" style={{ width: '80px' }}>
                {[
                  { src: 'https://images.unsplash.com/photo-1596370175676-bfc19ba489f8?w=200&h=200&fit=crop&auto=format', alt: 'Plain yogurt' },
                  { src: 'https://images.unsplash.com/photo-1497888329096-51c27beff665?w=200&h=200&fit=crop&auto=format', alt: 'Yogurt with fresh fruit' },
                  { src: 'https://images.unsplash.com/photo-1692071106919-01bc0b9b0919?w=200&h=200&fit=crop&auto=format', alt: 'Yogurt with granola' },
                ].map((photo) => (
                  <div key={photo.alt} className="flex-1 border border-taupe/30 rounded-xl overflow-hidden bg-sand">
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── INTRODUCTION ──────────────────── */}
      <section id="yogurt" className="relative py-28 overflow-hidden">
        <Rings size={340} className="absolute -left-36 top-4 opacity-35 pointer-events-none" />
        <Dots className="absolute bottom-10 right-10 opacity-45" />
        <Dots className="absolute top-10 right-1/3 opacity-35" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-black leading-[0.9] text-ink uppercase mb-5" style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}>
              Good Health,<br />Great Taste.
            </h2>
            <div className="w-14 h-px bg-taupe mb-8" />
            <p className="text-ink/60 text-[17px] leading-relaxed max-w-md mb-5">
              {"We're tired of overpriced yoghurt with sub-par quality. We want to give customers a richer experience without having to pay ridiculous premiums."}
            </p>
            <p className="font-semibold text-ink text-base">You get what you pay for.</p>
          </div>

          <div className="relative">
            <Rings size={380} className="absolute top-1/2 -translate-y-1/2 -right-20 opacity-20 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1599318363277-b3ad8f606b5d?w=760&h=880&fit=crop&auto=format"
              alt="Person enjoying a bowl of yogurt"
              className="w-full max-w-md ml-auto rounded-2xl object-cover aspect-[4/5] bg-sand"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────── WHY CHOOSE ──────────────────── */}
      <section id="why" className="relative py-28 overflow-hidden">
        <Dots className="absolute top-12 right-14 opacity-45" />
        <Rings size={340} className="absolute -bottom-24 left-4 opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-black leading-[0.9] text-ink uppercase mb-5" style={{ fontSize: 'clamp(48px, 6vw, 76px)' }}>
              Why choose<br />our yogurt?
            </h2>
            <div className="w-14 h-px bg-taupe mb-10" />

            <div className="flex flex-col gap-7">
              <FeatureRow icon={<IcHome />} title="Homemade Yogurt" desc="Fresh and naturally creamy, made in small careful batches." />
              <FeatureRow icon={<IcLeaf />} title="No Artificial Additives" desc="Completely free from thickeners like gelatin, pectin, or modified starch." />
              <FeatureRow icon={<IcStar />} title="Nutritional Benefits" desc="High-quality protein, calcium, and live probiotics in every serving." />
              <FeatureRow icon={<IcDrop />} title="More Active Probiotics" desc="A higher count of live, gut-friendly bacteria for real digestive support." />
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1694643823577-4c86280e290c?w=760&h=920&fit=crop&auto=format"
              alt="Person holding a bowl of fresh yogurt"
              className="w-full max-w-md ml-auto rounded-2xl object-cover aspect-[5/6] bg-sand"
            />
          </div>
        </div>
      </section>

      {/* ──────────────────── WHAT MAKES IT DIFFERENT ──────────────────── */}
      <section className="relative py-28 bg-sand/25 overflow-hidden">
        <Rings size={380} className="absolute -right-28 top-4 opacity-30 pointer-events-none" />
        <Dots className="absolute bottom-14 left-14 opacity-40" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display font-black leading-[0.9] text-ink uppercase mb-5" style={{ fontSize: 'clamp(48px, 6vw, 76px)' }}>
              What makes<br />it different?
            </h2>
            <div className="w-14 h-px bg-taupe mb-8" />
            <img
              src="https://images.unsplash.com/photo-1636485230968-2604796e237a?w=760&h=480&fit=crop&auto=format"
              alt="Man eating yogurt from a small container"
              className="w-full rounded-2xl object-cover aspect-video bg-sand"
            />
          </div>

          <div className="flex flex-col gap-7 lg:pt-28">
            <FeatureRow icon={<IcDrop />} title="Taste" desc="Rich and creamy. Sweet goodness without additives. Unflavoured to cater entirely to your choices." />
            <div className="h-px bg-sand" />
            <FeatureRow icon={<IcTag />} title="Pricing" desc="Restaurant-grade yogurt for a fraction of the price. Quality that genuinely fits your budget." />
            <div className="h-px bg-sand" />
            <FeatureRow icon={<IcBag />} title="Ease of Portability" desc="Small packaging makes it easy to carry — whether in a lunchbox or held in your hand." />
          </div>
        </div>
      </section>

      {/* ──────────────────── PRODUCT SHOWCASE ──────────────────── */}
      <section id="shop" className="relative py-28 overflow-hidden">
        <Dots className="absolute top-10 right-10 opacity-45" />
        <Rings size={300} className="absolute -left-20 bottom-8 opacity-28 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-black leading-[0.9] text-ink uppercase mb-4" style={{ fontSize: 'clamp(48px, 6vw, 72px)' }}>
            Our yogurt.
          </h2>
          <div className="w-14 h-px bg-taupe mb-12" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-sand group">
              <img
                src="https://images.unsplash.com/photo-1612182062572-e29c5dfb5eb4?w=800&h=600&fit=crop&auto=format"
                alt="YGRT plain yogurt"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div>
              <span className="text-[11px] font-semibold tracking-[0.18em] text-taupe uppercase block mb-4">
                The product
              </span>
              <h3 className="font-display font-black text-[48px] text-ink uppercase leading-tight mb-3">
                YGRT
              </h3>
              <p className="text-ink/55 text-[17px] leading-relaxed mb-8 max-w-sm">
                Pure, unflavoured homemade yogurt. Naturally creamy, rich in live probiotics, and completely free from artificial additives.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { label: 'Ingredients', value: 'Milk, live cultures. Nothing else.' },
                  { label: 'Probiotics', value: 'Higher active count than supermarket brands.' },
                  { label: 'Additives', value: 'None. No gelatin, pectin, or modified starch.' },
                  { label: 'Flavour', value: 'Unflavoured — pair it with anything you like.' },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4 py-3 border-b border-sand/70 last:border-0">
                    <span className="text-sm font-semibold text-ink w-28 flex-shrink-0">{row.label}</span>
                    <span className="text-sm text-ink/55">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── SUSTAINABILITY ──────────────────── */}
      <section id="sustainability" className="relative py-28 bg-sand/25 overflow-hidden">
        <Rings size={380} className="absolute -left-32 -top-24 opacity-28 pointer-events-none" />
        <Dots className="absolute bottom-16 right-14 opacity-40" />

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-black leading-[0.9] text-ink uppercase mb-4" style={{ fontSize: 'clamp(44px, 5.5vw, 68px)' }}>
            Better for you.<br />Better by design.
          </h2>
          <div className="w-14 h-px bg-taupe mb-12" />

          <div className="flex flex-wrap items-center gap-3 mb-14">
            {FLOW_STEPS.map((step, i) => (
              <Fragment key={step}>
                <div className="px-5 py-2.5 bg-sand/60 border border-sand rounded-xl text-sm font-semibold text-ink">
                  {step}
                </div>
                {i < FLOW_STEPS.length - 1 && (
                  <span className="text-taupe text-lg font-light">→</span>
                )}
              </Fragment>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Home-based', desc: 'Low-cost, low-risk operation with easier quality control and flexible hours.' },
              { title: 'On-demand', desc: 'Production triggered only by pre-orders — reducing spoilage risk significantly.' },
              { title: 'Controlled stock', desc: 'Max 50 containers per physical run. No overproduction beyond what can sell fresh.' },
              { title: 'Flexible', desc: 'Adaptable scheduling to maintain consistent freshness across every batch.' },
            ].map((item) => (
              <div key={item.title} className="bg-cream border border-sand rounded-xl p-5">
                <h4 className="font-display font-bold text-[17px] text-ink uppercase mb-2">{item.title}</h4>
                <p className="text-ink/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── SDG / HEALTH ──────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <Rings size={320} className="absolute -right-24 top-8 opacity-28 pointer-events-none" />
        <Dots className="absolute top-14 left-14 opacity-38" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <Rings size={380} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-22 pointer-events-none" />
              <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-herbal flex items-center justify-center relative z-10">
                <IcPulseHeart />
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-herbal uppercase block mb-4">
              SDG 3
            </span>
            <h2 className="font-display font-black leading-[0.9] text-ink uppercase mb-5" style={{ fontSize: 'clamp(44px, 5.5vw, 68px)' }}>
              Good Health<br />and Well-being
            </h2>
            <div className="w-14 h-px bg-herbal/50 mb-10" />

            <div className="flex flex-col gap-6">
              {[
                'Live probiotics in YGRT support digestive health and a balanced gut flora.',
                'Low in sugar and free from excessive preservatives — a genuinely healthier daily choice.',
                'Supporting healthy lifestyle habits for the younger generation.',
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-herbal/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <IcCheck />
                  </div>
                  <p className="text-ink/60 text-[15px] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── AUDIENCE ──────────────────── */}
      <section className="relative py-28 bg-sand/25 overflow-hidden">
        <Dots className="absolute top-10 right-10 opacity-45" />
        <Rings size={300} className="absolute -left-18 -bottom-14 opacity-28 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-black leading-[0.9] text-ink uppercase mb-4" style={{ fontSize: 'clamp(44px, 5.5vw, 68px)' }}>
            Made for real<br />life.
          </h2>
          <div className="w-14 h-px bg-taupe mb-12" />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Health-Conscious Consumers',
                desc: 'Actively seeking probiotics and fermented foods to support immunity and gut health.',
                imgId: '1688547978790-474af8a08f1e',
                alt: 'Health-conscious person with a wellness drink',
              },
              {
                title: 'Fitness Enthusiasts',
                desc: 'High-protein options to keep you full longer and support muscle recovery after training.',
                imgId: '1694643823577-4c86280e290c',
                alt: 'Fitness enthusiast holding a bowl of healthy food',
              },
              {
                title: 'Children',
                desc: 'Convenient snacks suitable for school, after sports, or before bed.',
                imgId: '1477413114673-6708cad13418',
                alt: 'Child eating a healthy breakfast',
              },
            ].map((card) => (
              <div key={card.title} className="bg-cream rounded-2xl overflow-hidden border border-sand/80 group">
                <div className="aspect-[4/3] overflow-hidden bg-sand">
                  <img
                    src={`https://images.unsplash.com/photo-${card.imgId}?w=600&h=450&fit=crop&auto=format`}
                    alt={card.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-[19px] text-ink uppercase mb-2">{card.title}</h3>
                  <p className="text-ink/50 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── BRAND PHILOSOPHY ──────────────────── */}
      <section className="relative py-36 bg-ink overflow-hidden">
        <Rings size={480} className="absolute -right-36 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none" />
        <Rings size={380} className="absolute -left-28 -bottom-24 opacity-10 pointer-events-none" />
        <Dots className="absolute top-12 left-12 opacity-20" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display font-black text-cream uppercase leading-[0.85] mb-8" style={{ fontSize: 'clamp(56px, 9vw, 120px)' }}>
            Less processing.<br />More tasting.
          </h2>
          <p className="text-cream/50 text-lg font-medium tracking-wide">
            Simple yogurt. Quality ingredients. Great taste.
          </p>
        </div>
      </section>

      {/* ──────────────────── FOOTER ──────────────────── */}
      <footer className="relative bg-cream border-t border-sand/60 pt-16 pb-8 overflow-hidden">
        <Dots className="absolute top-8 right-10 opacity-38" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-10 mb-14 max-w-xl">
            {/* Brand */}
            <div>
              <div className="font-display font-black text-[30px] text-ink leading-none mb-2">YGRT.</div>
              <p className="text-ink/45 text-sm leading-relaxed mb-5">
                less processing<br />more tasting
              </p>
              <a
                href="https://www.instagram.com/ygrt._healthy?igsh=MWo3dHUyNXhtdHEyeA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-ink/45 hover:text-ink transition-colors inline-block"
              >
                <IcInstagram />
              </a>
            </div>

            {/* Navigate */}
            <div>
              <h5 className="text-[10px] font-semibold tracking-[0.2em] text-ink/35 uppercase mb-4">Navigate</h5>
              <div className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link, i) => (
                  <a key={link} href={NAV_HREFS[i]} className="text-sm text-ink/55 hover:text-ink transition-colors">
                    {link}
                  </a>
                ))}
                <a href="#" className="text-sm text-ink/55 hover:text-ink transition-colors">Contact</a>
              </div>
            </div>
          </div>

          <div className="border-t border-sand/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-ink/30 text-xs">© 2026 YGRT. All rights reserved.</p>
            <p className="text-ink/30 text-xs">Homemade with care.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
