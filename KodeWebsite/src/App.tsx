import { type ReactNode, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Car,
  CheckCircle2,
  Hotel,
  Phone,
  Sparkles,
  Store,
} from 'lucide-react'
import automationLogo from './assets/carousel_logos/chromeautomation.png'
import dsFashionLogo from './assets/carousel_logos/dsfashion.png'
import karBgLogo from './assets/carousel_logos/karbglogowhite-ui.png'
import atlanticDriveLogo from './assets/clients_logos/IMG_8239.WEBP?url'
import car2uLogo from './assets/clients_logos/car2u.PNG?url'
import clientDsFashionLogo from './assets/clients_logos/dsfashion.png'
import clientKarBgLogo from './assets/clients_logos/karbglogowhite-ui.png'
import ironImportLogo from './assets/clients_logos/IMG_7293.PNG?url'
import './App.css'

const phoneHref = 'tel:+359XXXXXXXXX'
const phoneLabel = '+359 88 7286159'
const instagramUrl = 'https://www.instagram.com/kode.bg/'
const karBgUrl = 'https://www.kar.bg/'
const dsFashionUrl = 'https://dsfashion.shop/'

const navLinks = [
  { label: 'За нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Продукти', href: '#products' },
  { label: 'Контакти', href: '#contact' },
]

const services = [
  {
    icon: Hotel,
    title: 'Автоматизации за туризъм',
    text: 'Автоматизираме повтарящи се имейли, обработка на запитвания и извличане на оферти за хотели, транспорт и пакети.',
    points: ['Темплейтни имейли', 'Оферти за хотели и транспорт', 'Проследяване на запитвания'],
  },
  {
    icon: Car,
    title: 'Автомобилен внос и обяви',
    text: 'Помагаме на фирми за внос на автомобили да качват, обновяват и подреждат обяви без монотонна ръчна работа.',
    points: ['Качване на обяви', 'Данни за автомобили', 'Автоматизирани описания'],
  },
  {
    icon: Store,
    title: 'Изработка на сайтове',
    text: 'Изграждаме бизнес сайтове, онлайн магазини и custom платформи с ясна структура, лесно управление и дизайн, който работи.',
    points: ['Kar.bg', 'dsfashion.shop', 'Shopify и custom решения'],
  },
]

const faqs = [
  {
    question: 'Какво представлява бизнес автоматизацията?',
    answer:
      'Бизнес автоматизацията премахва повтарящи се ръчни задачи чрез системи, които обработват заявки, имейли, оферти, данни и вътрешни процеси по-бързо и с по-малко грешки.',
  },
  {
    question: 'За какви бизнеси Kode.bg изгражда автоматизации?',
    answer:
      'Работим с компании в туризма, автомобилния внос, онлайн търговията и услуги, където има монотонни процеси като темплейтни имейли, качване на обяви, обработка на оферти и синхронизация на данни.',
  },
  {
    question: 'Можете ли да автоматизирате имейли и оферти в туристическия сектор?',
    answer:
      'Да. Изграждаме автоматизации за повтарящи се имейли, обработка на запитвания и извличане на оферти за хотели, транспорт и туристически пакети.',
  },
  {
    question: 'Помагате ли на фирми за внос на автомобили?',
    answer:
      'Да. Можем да автоматизираме качване и обновяване на обяви, подготовка на описания, структуриране на данни за автомобили и други повтарящи се задачи.',
  },
  {
    question: 'Изработвате ли сайтове и онлайн магазини?',
    answer:
      'Да. Изграждаме бизнес сайтове, Shopify магазини и custom платформи с ясна структура, лесно управление и дизайн, съобразен с целите на бизнеса.',
  },
  {
    question: 'Как започва един проект с Kode.bg?',
    answer:
      'Започваме с кратък разговор за процесите, които губят време. След това описваме решение, приоритети и стъпки за внедряване, така че автоматизацията да носи реална полза още от началото.',
  },
]

const carouselItems = [
  {
    name: 'Kar.bg',
    image: karBgLogo,
    logoClassName: 'max-h-14 max-w-48',
    url: karBgUrl,
  },
  {
    name: 'DS Fashion',
    image: dsFashionLogo,
    logoClassName: 'max-h-24 max-w-64',
    url: dsFashionUrl,
  },
  {
    name: 'Chrome Automation',
    image: automationLogo,
    logoClassName: 'max-h-20 max-w-56',
  },
]

const clientLogos = [
  {
    name: 'Kar.bg',
    image: clientKarBgLogo,
    className: 'max-h-12 sm:max-h-14 lg:max-h-16',
    url: karBgUrl,
  },
  {
    name: 'Iron Import',
    image: ironImportLogo,
    className: 'max-h-32 sm:max-h-40 lg:max-h-44',
  },
  {
    name: 'DS Fashion',
    image: clientDsFashionLogo,
    className: 'max-h-32 sm:max-h-40 lg:max-h-44',
    url: dsFashionUrl,
  },
  {
    name: 'Atlantic Drive',
    image: atlanticDriveLogo,
    className: 'max-h-24 sm:max-h-28 lg:max-h-32',
  },
  {
    name: 'Car2U',
    image: car2uLogo,
    className: 'max-h-24 sm:max-h-28 lg:max-h-32',
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
    <header className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl md:bottom-auto md:top-0 md:border-b md:border-t-0">
      <div className="mx-auto max-w-7xl px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-6 md:pb-3 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <a href="#" className="flex items-center gap-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#0f766e]/50 bg-[#0f766e]/10 text-sm font-bold text-[#0f766e] shadow-[0_0_30px_rgba(15,118,110,0.2)]">
              K
            </span>
            <span className="text-lg font-semibold">Kode.bg</span>
          </a>

          <nav aria-label="Основна навигация" className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-300 transition hover:text-[#0f766e]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Kode.bg в Instagram"
              className="instagram-cta inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white shadow-[0_0_22px_rgba(193,53,132,0.2)] transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_0_30px_rgba(225,48,108,0.34)] focus:outline-none focus:ring-2 focus:ring-[#c13584] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>

            <a
              href={phoneHref}
              className="contact-pulse inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#0f766e]/60 bg-[#0f766e] px-3 text-xs font-semibold text-white transition hover:border-[#7cff6b] hover:bg-[#7cff6b] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] sm:gap-2 sm:px-4 sm:text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Свържете се</span>
            </a>
          </div>
        </div>

      </div>
    </header>
  )
}

function AutomationVisual() {
  const steps = [
    { label: 'CRM', value: 'sync', color: 'bg-[#0f766e]' },
    { label: 'Leads', value: '+38%', color: 'bg-[#7cff6b]' },
    { label: 'AI', value: 'live', color: 'bg-[#0f766e]' },
    { label: 'ERP', value: 'ok', color: 'bg-[#7cff6b]' },
  ]

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="automation-panel rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0f766e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#7cff6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
          <span className="rounded-md border border-[#0f766e]/30 px-2.5 py-1 text-xs text-[#0f766e]">
            automation live
          </span>
        </div>

        <div className="automation-grid rounded-lg border border-white/10 p-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.label}
                className="rounded-lg border border-white/10 bg-black/40 p-3 transition hover:border-[#0f766e]/60"
              >
                <div className={`mb-5 h-2 w-2 rounded-full ${step.color}`} />
                <p className="text-xs text-zinc-400">{step.label}</p>
                <p className="mt-1 text-lg font-semibold text-white">{step.value}</p>
              </div>
            ))}
          </div>

          <div className="relative my-7 h-2 overflow-hidden rounded-md bg-white/10">
            <div className="flow-line absolute inset-y-0 left-0 w-1/2 rounded-md bg-gradient-to-r from-[#0f766e] via-[#7cff6b] to-[#0f766e]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="rounded-lg border border-[#0f766e]/20 bg-[#0f766e]/10 p-4">
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
      <div className="mx-auto grid max-w-7xl items-center gap-12 xl:grid-cols-[1.02fr_0.98fr]">
        <FadeIn className="min-w-0">
          <div className="max-w-3xl min-w-0">
            <div className="mb-6 inline-flex max-w-full items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-300 backdrop-blur sm:items-center">
              <Sparkles className="h-4 w-4 text-[#0f766e]" />
              <span className="min-w-0">
                Автоматизация за бизнесите които не живеят в миналото.
              </span>
            </div>
            <h1 className="-mx-4 w-[calc(100%+2rem)] whitespace-nowrap text-center text-base font-semibold leading-[1.04] text-white min-[390px]:text-xl sm:mx-0 sm:w-auto sm:text-left sm:text-3xl sm:leading-[1.02] md:text-4xl lg:text-5xl xl:text-[2.1rem] 2xl:text-4xl">
              Автоматизацията е бъдещето!
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
Kode няма да позволи бизнесът ти да изостане. Свържи се с нас, за да автоматизираме повтарящите се процеси и да освободим време за по-важните неща.            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="instagram-cta inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-semibold text-white shadow-[0_0_28px_rgba(193,53,132,0.24)] transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_0_38px_rgba(225,48,108,0.38)] focus:outline-none focus:ring-2 focus:ring-[#c13584] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                <InstagramIcon className="h-5 w-5" />
                Instagram
              </a>
              <a
                href={phoneHref}
                className="contact-pulse inline-flex items-center justify-center gap-2 rounded-lg bg-[#0f766e] px-6 py-3 font-semibold text-white transition hover:bg-[#7cff6b] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
              >
                Свържете се с нас
                <ArrowRight className="h-5 w-5" />
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

        <FadeIn className="min-w-0 xl:pt-8">
          <AutomationVisual />
        </FadeIn>
      </div>
    </section>
  )
}

function LogoCarousel() {
  const repeatedItems = Array.from({ length: 12 }, (_, index) => carouselItems[index % carouselItems.length])

  return (
    <section className="border-y border-white/10 bg-black/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">Продукти и автоматизации</p>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent sm:block" />
        </div>

        <div className="logo-viewport overflow-hidden">
          <div className="logo-track flex w-max gap-4">
            {repeatedItems.map((item, index) => (
              item.url ? (
                <a
                  key={`${item.name}-${index}`}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-28 min-w-64 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 py-4 transition duration-300 hover:border-[#0f766e]/60 hover:bg-white/[0.08]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`${item.logoClassName} w-auto object-contain transition duration-300 group-hover:scale-105`}
                  />
                </a>
              ) : (
                <div
                  key={`${item.name}-${index}`}
                  className="group flex h-28 min-w-64 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-6 py-4 transition duration-300 hover:border-[#0f766e]/60 hover:bg-white/[0.08]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`${item.logoClassName} w-auto object-contain transition duration-300 group-hover:scale-105`}
                  />
                </div>
              )
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
          <p className="mb-3 text-sm font-semibold text-[#0f766e]">За нас</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Изграждаме автоматизирани процеси, които просто вършат работа — точно, надеждно и без излишен шум.
          </h2>
        </div>
        <p className="text-lg leading-8 text-zinc-300">
          Kode.bg помага на бизнеса да се освободи от повтарящата се ежедневна работа чрез интелигентна автоматизация. Вместо ръчни процеси и загубено време, работата протича по-гладко, по-бързо и с по-малко грешки — така екипът може да се фокусира върху растежа, а не върху рутината.
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
                <article className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#0f766e]/60 hover:bg-white/[0.065]">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-[#0f766e]/30 bg-[#0f766e]/10 text-[#0f766e] transition group-hover:border-[#7cff6b]/50 group-hover:text-[#7cff6b]">
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

function TrustSlider() {
  const targetCount = 50
  const ref = useRef<HTMLDivElement | null>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -90px', threshold: 0.35 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      const frameId = requestAnimationFrame(() => setCount(targetCount))
      return () => cancelAnimationFrame(frameId)
    }

    let frameId = 0
    const duration = 1600
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3

      setCount(Math.round(easedProgress * targetCount))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [hasStarted])

  const progress = (count / targetCount) * 100
  const displayCount = count >= targetCount ? `${targetCount}+` : count
  const thumbPosition = `calc(${progress}% + ${14 - progress * 0.28}px)`
  const repeatedClientLogos = [...clientLogos, ...clientLogos]

  return (
    <section className="border-y border-white/10 bg-black px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#0f766e]/60 hover:bg-white/[0.065] md:grid-cols-[0.78fr_1.22fr] md:items-center md:p-8"
        >
          <div>
            <p className="mb-3 text-sm font-semibold text-[#0f766e]">Доверие</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Хора и бизнеси които се довериха на Kode
            </h2>
          </div>

          <div className="min-w-0">
            <div className="mb-5 flex items-end justify-between gap-4">
              <span className="text-sm text-zinc-400">Клиенти и партньори</span>
              <span className="text-6xl font-semibold leading-none text-white sm:text-7xl">
                {displayCount}
              </span>
            </div>

            <div
              className="relative h-4 overflow-hidden rounded-lg bg-white/10"
              role="meter"
              aria-label="Хора, които се довериха на Kode.bg"
              aria-valuemin={0}
              aria-valuemax={targetCount}
              aria-valuenow={count}
              aria-valuetext={`${displayCount} души`}
            >
              <div
                className="trust-slider-fill h-full rounded-lg bg-gradient-to-r from-[#0f766e] to-[#7cff6b]"
                style={{ width: `${progress}%` }}
              />
              <div
                className="trust-slider-thumb absolute top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white shadow-[0_0_24px_rgba(15,118,110,0.5)]"
                style={{ left: thumbPosition }}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 text-sm text-zinc-500">
              <span>0</span>
              <span className="text-center">25</span>
              <span className="text-right">50+</span>
            </div>
          </div>
        </div>

        <div className="mb-5 mt-10 flex items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">Бизнеси, които ни се довериха</p>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent sm:block" />
        </div>

        <div className="logo-viewport overflow-hidden">
          <div className="logo-track flex w-max gap-8">
            {repeatedClientLogos.map((client, index) => (
              client.url ? (
                <a
                  key={`${client.name}-${index}`}
                  href={client.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-32 min-w-56 items-center justify-center px-4 sm:h-40 sm:min-w-64 lg:h-44 lg:min-w-72"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className={`${client.className} h-auto w-auto max-w-full object-contain transition duration-300 group-hover:scale-105`}
                  />
                </a>
              ) : (
                <div
                  key={`${client.name}-${index}`}
                  className="group flex h-32 min-w-56 items-center justify-center px-4 sm:h-40 sm:min-w-64 lg:h-44 lg:min-w-72"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className={`${client.className} h-auto w-auto max-w-full object-contain transition duration-300 group-hover:scale-105`}
                  />
                </div>
              )
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function FAQ() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-7xl">
        <FadeIn className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold text-[#0f766e]">FAQ</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Често задавани въпроси
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">
              Кратки отговори за автоматизации, сайтове и начина, по който
              започваме работа по нов проект.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition duration-300 open:border-[#0f766e]/60 open:bg-white/[0.065]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-white">
                  <span>{faq.question}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#0f766e] transition group-open:rotate-45 group-open:border-[#7cff6b]/50 group-open:text-[#7cff6b]">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-zinc-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// function Products() {
//   return (
//     <section id="products" className="px-4 py-20 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-7xl">
//         <FadeIn className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
//           <div className="max-w-2xl">
//             <p className="mb-3 text-sm font-semibold text-[#0f766e]">Продукти</p>
//             <h2 className="text-3xl font-semibold text-white sm:text-4xl">
//               Готови основи за по-бързо внедряване.
//             </h2>
//           </div>
//           <a
//             href={phoneHref}
//             className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#7cff6b]/50 px-5 py-3 font-semibold text-[#7cff6b] transition hover:border-[#0f766e]/60 hover:text-[#0f766e]"
//           >
//             Обсъдете проект
//             <ArrowRight className="h-5 w-5" />
//           </a>
//         </FadeIn>

//         <div className="grid gap-4 md:grid-cols-2">
//           {products.map((product) => (
//             <FadeIn key={product.title}>
//               <article className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] p-7 transition hover:border-[#7cff6b]/50">
//                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#0f766e] via-[#7cff6b] to-transparent" />
//                 <h3 className="text-2xl font-semibold text-white">{product.title}</h3>
//                 <p className="mt-4 leading-7 text-zinc-300">{product.text}</p>
//               </article>
//             </FadeIn>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

function Contact() {
  return (
    <footer id="contact" className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
      <FadeIn className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="mb-3 text-sm font-semibold text-[#7cff6b]">Контакти</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Нека бизнесът Ви продължава да работи — дори извън работно време.
          </h2>
          <div className="mt-6 flex flex-col items-start gap-3">
            <a
              href={phoneHref}
              className="inline-flex items-center gap-3 text-xl font-semibold text-[#0f766e] transition hover:text-[#7cff6b]"
            >
              <Phone className="h-6 w-6" />
              {phoneLabel}
            </a>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-3 text-xl font-semibold text-[#0f766e] transition hover:text-[#7cff6b]"
            >
              <Phone className="h-6 w-6" />
              {phoneLabel}
            </a>
          </div>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Kode.bg в Instagram"
          className="group flex h-24 w-24 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition hover:border-[#0f766e]/70 hover:bg-[#0f766e]/10 sm:h-28 sm:w-28"
        >
          <InstagramIcon className="h-12 w-12 transition group-hover:scale-110 group-hover:text-[#0f766e] sm:h-14 sm:w-14" />
        </a>
      </FadeIn>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row">
        <p>© 2026 Kode.bg</p>
        <p>Ние автоматизираме. Ти растеш.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.75),transparent_78%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[linear-gradient(180deg,rgba(15,118,110,0.12),rgba(124,255,107,0.04),transparent)]" />
      <Header />
      <main className="pb-24 md:pb-0 md:pt-16">
        <Hero />
        <LogoCarousel />
        <About />
        <Services />
        <TrustSlider />
        {/* <Products /> */}
        <FAQ />
      </main>
      <Contact />
    </div>
  )
}

export default App
