import { type ReactNode, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  Network,
  Phone,
  Sparkles,
} from 'lucide-react'
import './App.css'

const phoneHref = 'tel:+359XXXXXXXXX'
const phoneLabel = '+359 XX XXX XXXX'
const instagramUrl = 'https://www.instagram.com/kode.bg/'

const navLinks = [
  { label: 'За нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Продукти', href: '#products' },
  { label: 'Контакти', href: '#contact' },
]

const services = [
  {
    icon: Database,
    title: 'CRM интеграции',
    text: 'Свързваме продажби, заявки, клиенти и екипи в един ясен работен поток.',
    points: ['Автоматични записи', 'Синхрон на данни', 'По-малко ръчна работа'],
  },
  {
    icon: Network,
    title: 'Lead Gen системи',
    text: 'Изграждаме машини за входящи запитвания, последващи действия и отчетност.',
    points: ['Форми и кампании', 'Квалификация на лийдове', 'Известия към екипа'],
  },
  {
    icon: Bot,
    title: 'AI работни потоци',
    text: 'Вкарваме AI там, където пести реално време: текстове, анализи и операции.',
    points: ['AI асистенти', 'Документни процеси', 'Автоматични резюмета'],
  },
]

const carouselItems = [
  {
    name: 'Kar.bg',
    mark: 'K',
    description: 'B2B продуктова екосистема',
    accent: 'from-[#20f5ff] to-[#7cff6b]',
  },
  {
    name: 'Автоматизация',
    mark: 'A',
    description: 'Процесни системи и AI потоци',
    accent: 'from-[#7cff6b] to-[#20f5ff]',
  },
]

const products = [
  {
    title: 'Kar.bg',
    text: 'Дигитална основа за автомобилни процеси, заявки и автоматизирана комуникация.',
  },
  {
    title: 'Automation Hub',
    text: 'Модулен център за CRM, AI, lead routing и вътрешни бизнес операции.',
  },
]

type FadeInProps = {
  children: ReactNode
  className?: string
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.4" cy="6.6" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FadeIn({ children, className = '' }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -80px', threshold: 0.16 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#20f5ff]/50 bg-[#20f5ff]/10 text-sm font-bold text-[#20f5ff] shadow-[0_0_30px_rgba(32,245,255,0.2)]">
              K
            </span>
            <span className="text-lg font-semibold">Kode.bg</span>
          </a>

          <nav aria-label="Основна навигация" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-300 transition hover:text-[#20f5ff]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 rounded-lg border border-[#20f5ff]/60 bg-[#20f5ff] px-4 py-2 text-sm font-semibold text-black transition hover:border-[#7cff6b] hover:bg-[#7cff6b] focus:outline-none focus:ring-2 focus:ring-[#20f5ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Свържете се</span>
          </a>
        </div>

        <nav aria-label="Мобилна навигация" className="mt-3 grid grid-cols-2 gap-1 sm:grid-cols-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md border border-white/10 px-2 py-2 text-center text-xs text-zinc-300 transition hover:border-[#20f5ff]/50 hover:text-[#20f5ff]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function AutomationVisual() {
  const steps = [
    { label: 'CRM', value: 'sync', color: 'bg-[#20f5ff]' },
    { label: 'Leads', value: '+38%', color: 'bg-[#7cff6b]' },
    { label: 'AI', value: 'live', color: 'bg-[#20f5ff]' },
    { label: 'ERP', value: 'ok', color: 'bg-[#7cff6b]' },
  ]

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="automation-panel rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#20f5ff]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#7cff6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
          <span className="rounded-md border border-[#20f5ff]/30 px-2.5 py-1 text-xs text-[#20f5ff]">
            automation live
          </span>
        </div>

        <div className="automation-grid rounded-lg border border-white/10 p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.label}
                className="rounded-lg border border-white/10 bg-black/40 p-3 transition hover:border-[#20f5ff]/60"
              >
                <div className={`mb-5 h-2 w-2 rounded-full ${step.color}`} />
                <p className="text-xs text-zinc-400">{step.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{step.value}</p>
              </div>
            ))}
          </div>

          <div className="relative my-7 h-2 overflow-hidden rounded-md bg-white/10">
            <div className="flow-line absolute inset-y-0 left-0 w-1/2 rounded-md bg-gradient-to-r from-[#20f5ff] via-[#7cff6b] to-[#20f5ff]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="rounded-lg border border-[#20f5ff]/20 bg-[#20f5ff]/10 p-4">
              <p className="text-xs text-zinc-400">Входящи заявки</p>
              <p className="mt-2 text-2xl font-semibold text-white">1 248</p>
            </div>
            <ArrowRight className="hidden h-6 w-6 text-[#7cff6b] sm:block" />
            <div className="rounded-lg border border-[#7cff6b]/20 bg-[#7cff6b]/10 p-4">
              <p className="text-xs text-zinc-400">Автоматично обработени</p>
              <p className="mt-2 text-2xl font-semibold text-white">96%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <FadeIn className="min-w-0">
          <div className="max-w-3xl min-w-0">
            <div className="mb-6 inline-flex max-w-full items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 backdrop-blur sm:items-center">
              <Sparkles className="h-4 w-4 text-[#20f5ff]" />
              <span className="min-w-0">
                B2B автоматизация за екипи, които искат повече скорост
              </span>
            </div>
            <h1 className="break-words text-4xl font-semibold leading-[1.04] text-white sm:text-6xl sm:leading-[1.02] lg:text-7xl">
              Автоматизираме бъдещето на вашия бизнес
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Kode.bg изгражда B2B системи за по-ефективни продажби, по-бърза
              обработка на заявки и по-малко ръчна работа в ежедневните процеси.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#20f5ff] px-6 py-3 font-semibold text-black transition hover:bg-[#7cff6b] focus:outline-none focus:ring-2 focus:ring-[#20f5ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                Свържете се с нас
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 font-semibold text-white transition hover:border-[#20f5ff]/70 hover:text-[#20f5ff] focus:outline-none focus:ring-2 focus:ring-[#20f5ff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                <InstagramIcon className="h-5 w-5" />
                Instagram
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ['3x', 'по-бързи операции'],
                ['24/7', 'дигитални процеси'],
                ['0', 'излишни таблици'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-sm text-zinc-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn className="min-w-0 lg:pt-8">
          <AutomationVisual />
        </FadeIn>
      </div>
    </section>
  )
}

function LogoCarousel() {
  const repeatedItems = Array.from({ length: 8 }, (_, index) => carouselItems[index % carouselItems.length])

  return (
    <section className="border-y border-white/10 bg-black/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">Продукти и автоматизационни направления</p>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent sm:block" />
        </div>

        <div className="logo-viewport overflow-hidden">
          <div className="logo-track flex w-max gap-4">
            {repeatedItems.map((item, index) => (
              <a
                key={`${item.name}-${index}`}
                href={index % 2 === 0 ? instagramUrl : phoneHref}
                target={index % 2 === 0 ? '_blank' : undefined}
                rel={index % 2 === 0 ? 'noreferrer' : undefined}
                className="group flex min-w-64 items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] px-5 py-4 grayscale transition duration-300 hover:border-[#20f5ff]/60 hover:bg-white/[0.08] hover:grayscale-0"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${item.accent} text-lg font-bold text-black`}
                >
                  {item.mark}
                </span>
                <span>
                  <span className="block text-lg font-semibold text-white">{item.name}</span>
                  <span className="mt-1 block text-sm text-zinc-400 group-hover:text-zinc-200">
                    {item.description}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold text-[#20f5ff]">За нас</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Строим процеси, които работят тихо, точно и постоянно.
          </h2>
        </div>
        <p className="text-lg leading-8 text-zinc-300">
          Kode.bg помага на B2B компании да подредят данните, задачите и
          комуникацията си в автоматизирани системи. Фокусът е практичен:
          по-малко хаос между инструментите, повече видимост и по-бързи решения.
        </p>
      </FadeIn>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold text-[#7cff6b]">Услуги</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Автоматизация на задачите, които забавят растежа.
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <FadeIn key={service.title} className="h-full">
                <article className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#20f5ff]/60 hover:bg-white/[0.065]">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-[#20f5ff]/30 bg-[#20f5ff]/10 text-[#20f5ff] transition group-hover:border-[#7cff6b]/50 group-hover:text-[#7cff6b]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-300">{service.text}</p>
                  <ul className="mt-6 space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#7cff6b]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section id="products" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold text-[#20f5ff]">Продукти</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Готови основи за по-бързо внедряване.
            </h2>
          </div>
          <a
            href={phoneHref}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#7cff6b]/50 px-5 py-3 font-semibold text-[#7cff6b] transition hover:border-[#20f5ff]/60 hover:text-[#20f5ff]"
          >
            Обсъдете проект
            <ArrowRight className="h-5 w-5" />
          </a>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <FadeIn key={product.title}>
              <article className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] p-7 transition hover:border-[#7cff6b]/50">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#20f5ff] via-[#7cff6b] to-transparent" />
                <h3 className="text-2xl font-semibold text-white">{product.title}</h3>
                <p className="mt-4 leading-7 text-zinc-300">{product.text}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer id="contact" className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold text-[#7cff6b]">Контакти</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Готови ли сте да махнем ръчната работа от процеса?
          </h2>
          <a
            href={phoneHref}
            className="mt-6 inline-flex items-center gap-3 text-xl font-semibold text-[#20f5ff] transition hover:text-[#7cff6b]"
          >
            <Phone className="h-6 w-6" />
            {phoneLabel}
          </a>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Kode.bg в Instagram"
          className="group flex h-24 w-24 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition hover:border-[#20f5ff]/70 hover:bg-[#20f5ff]/10 sm:h-28 sm:w-28"
        >
          <InstagramIcon className="h-12 w-12 transition group-hover:scale-110 group-hover:text-[#20f5ff] sm:h-14 sm:w-14" />
        </a>
      </FadeIn>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row">
        <p>© 2026 Kode.bg</p>
        <p>Business process automation for modern B2B teams.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.75),transparent_78%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[linear-gradient(180deg,rgba(32,245,255,0.12),rgba(124,255,107,0.04),transparent)]" />
      <Header />
      <main>
        <Hero />
        <LogoCarousel />
        <About />
        <Services />
        <Products />
      </main>
      <Contact />
    </div>
  )
}

export default App
