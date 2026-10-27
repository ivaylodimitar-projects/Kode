import { useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Car, Check, ChevronDown,
  FileCheck2, Hotel, Inbox, Mail, Menu, Phone, Settings2, Store, X,
} from 'lucide-react'
import automationLogo from './assets/carousel_logos/chromeautomation.png'
import kodeLogo from './assets/company_images/kode_logo.png'
import { CONTACT_EMAIL } from './config'
import { Clients } from './components/Clients'
import { useScrollMotion } from './hooks/useScrollMotion'
import './App.css'
import './motion.css'

const phoneNumbers = ['+359 88 728 6159', '+359 89 728 8330']
const emailHref = `mailto:${CONTACT_EMAIL}`
const karBgUrl = 'https://www.kar.bg/'
const dsFashionUrl = 'https://dsfashion.shop/'

const navLinks = [
  { label: 'За нас', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Клиенти', href: '#clients' },
  { label: 'Въпроси', href: '#faq' },
  { label: 'Контакти', href: '#contact' },
]

const services = [
  {
    icon: Hotel,
    title: 'Автоматизации за туризъм',
    text: 'Автоматизираме повтарящи се имейли, обработка на запитвания и извличане на оферти за хотели, транспорт и туристически пакети.',
    points: ['Шаблони за имейли', 'Оферти за хотели и транспорт', 'Проследяване на запитвания'],
  },
  {
    icon: Car,
    title: 'Автомобилен внос и обяви',
    text: 'Помагаме на фирми за внос на автомобили да качват, обновяват и подреждат обяви без монотонна ръчна работа.',
    points: ['Качване и обновяване на обяви', 'Структуриране на данни', 'Автоматизирани описания'],
  },
  {
    icon: Store,
    title: 'Сайтове и онлайн магазини',
    text: 'Изграждаме бизнес сайтове, онлайн магазини и платформи по поръчка с ясна структура, лесно управление и обмислен дизайн.',
    points: ['Бизнес сайтове', 'Shopify магазини', 'Индивидуални уеб решения'],
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
      'Работим с компании в туризма, автомобилния внос, онлайн търговията и услугите, където има повтарящи се процеси като имейли по шаблон, качване на обяви, обработка на оферти и синхронизация на данни.',
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
      'Да. Изграждаме бизнес сайтове, Shopify магазини и платформи по поръчка с ясна структура, лесно управление и дизайн, съобразен с целите на бизнеса.',
  },
  {
    question: 'Как започва един проект с Kode.bg?',
    answer:
      'Започваме с кратък разговор за процесите, които отнемат време. След това описваме решение, приоритети и стъпки за внедряване, съобразени с нуждите на бизнеса.',
  },
]

const workflows = [
  {
    label: 'Туризъм', title: 'От запитване до готова оферта.',
    steps: [
      { icon: Inbox, title: 'Ново запитване', text: 'Дати, дестинация и брой гости' },
      { icon: Settings2, title: 'Обработка на информацията', text: 'Подбор на хотели и транспорт' },
      { icon: FileCheck2, title: 'Оферта, готова за преглед', text: 'Вашият екип поема оттук' },
    ],
  },
  {
    label: 'Автомобили', title: 'От данни до подредена обява.',
    steps: [
      { icon: Car, title: 'Данни за автомобила', text: 'Характеристики, цена и снимки' },
      { icon: Settings2, title: 'Подготовка на обявата', text: 'Структура и описание по шаблон' },
      { icon: FileCheck2, title: 'Обява, готова за преглед', text: 'Проверка преди публикуване' },
    ],
  },
  {
    label: 'Онлайн магазини', title: 'От продуктов списък до каталог.',
    steps: [
      { icon: Store, title: 'Продуктова информация', text: 'Артикули, цени и наличности' },
      { icon: Settings2, title: 'Подреждане на каталога', text: 'Категории и продуктови описания' },
      { icon: FileCheck2, title: 'Каталог, готов за преглед', text: 'Информацията на едно място' },
    ],
  },
]

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Kode.bg — начало">
      <img src={kodeLogo} alt="Kode.bg" width="2141" height="734" />
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}
    >
      <div className="container header-inner">
        <Brand />
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Затвори' : 'Меню'}
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="main-navigation" className={`main-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Основна навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setMenuOpen(false)
                document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true })
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="button button-small header-contact">
          Да поговорим <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="reading-progress" aria-hidden="true" />
    </header>
  )
}

function AutomationVisual() {
  const [activeWorkflow, setActiveWorkflow] = useState(0)
  const workflow = workflows[activeWorkflow]

  return (
    <figure className="automation-visual" aria-labelledby="automation-caption">
      <div className="visual-toolbar"><span className="visual-mark" aria-hidden="true">k.</span><span>KODE / AUTOMATION</span><span className="demo-label">Примерен процес</span></div>
      <figcaption id="automation-caption">
        <span className="visual-title">Рутината има по-добър маршрут.</span>
        <span className="visual-description">Изберете сфера и вижте как работи.</span>
      </figcaption>
      <div className="workflow-options" role="group" aria-label="Изберете сфера на автоматизация">
        {workflows.map((item, index) => (
          <button type="button" key={item.label} aria-pressed={activeWorkflow === index} onClick={() => setActiveWorkflow(index)}>{item.label}</button>
        ))}
      </div>
      <div className="workflow-canvas" aria-live="polite" aria-atomic="true">
        <ol className="workflow" key={workflow.label}>
          {workflow.steps.map((step, index) => {
            const Icon = step.icon
            return (
              <li className="workflow-step" key={step.title}>
                <span className="workflow-icon"><Icon aria-hidden="true" /></span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
                <span className="step-number" aria-hidden="true">0{index + 1}</span>
              </li>
            )
          })}
        </ol>
        <p className="workflow-result"><Check aria-hidden="true" />{workflow.title}</p>
      </div>
      <p className="visual-note"><span aria-hidden="true" />Създадено около вашия начин на работа.</p>
    </figure>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" data-scroll-scene>
      <div className="container hero-grid">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" />Автоматизации и уеб решения</p>
          <h1 id="hero-title">По-малко<br />рутина.<br /><span>Повече бизнес.</span></h1>
          <p className="hero-description">
            Свързваме процесите. Автоматизираме задачите.
            Създаваме сайтове, които представят бизнеса ви както трябва.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button">Да обсъдим проекта ви <ArrowUpRight aria-hidden="true" /></a>
            <a href="#services" className="text-link">Нашите решения <ArrowDown aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-depth-stage">
          <div className="depth-outline depth-outline-back" aria-hidden="true" />
          <div className="depth-outline depth-outline-front" aria-hidden="true" />
          <div className="hero-depth-panel"><AutomationVisual /></div>
          <div className="depth-caption" aria-hidden="true"><span />От идея до работещ процес.</div>
        </div>
      </div>
      <div className="container hero-bottom">
        <a className="scroll-cue" href="#about"><span className="scroll-cue-icon" aria-hidden="true"><ArrowDown /></span>Запознайте се с Kode</a>
        <span className="hero-sectors">Туризъм <span aria-hidden="true">/</span> Автомобили <span aria-hidden="true">/</span> Онлайн търговия</span>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about-section" tabIndex={-1} aria-labelledby="about-title" data-scroll-scene>
      <div className="container about-grid">
        <div className="about-heading">
          <div data-reveal>
            <p className="eyebrow">01 / Нашият подход</p>
            <h2 id="about-title">Първо разбираме<br />бизнеса.<br /><span className="muted">После пишем код.</span></h2>
          </div>
          <div className="approach-signature" aria-hidden="true">
            <span className="signature-bracket">&lt;</span><span>бизнес <span className="signature-plus">+</span> код</span><span className="signature-bracket">/&gt;</span>
          </div>
        </div>
        <div className="about-copy">
          <div data-reveal>
            <p className="lead">Добрият софтуер започва с правилните въпроси.</p>
            <p>Къде губите време? Какво правите на ръка? Кои системи не си говорят? В Kode.bg започваме от ежедневната ви работа и изграждаме решение около нея.</p>
          </div>
          <ol className="approach-steps">
            <li data-reveal><span aria-hidden="true">01</span><div><h3>Разговор и анализ</h3><p>Изясняваме процесите, нуждите и приоритетите.</p></div></li>
            <li data-reveal><span aria-hidden="true">02</span><div><h3>Решение с ясен обхват</h3><p>Описваме какво изграждаме и как ще работи.</p></div></li>
            <li data-reveal><span aria-hidden="true">03</span><div><h3>Разработка и внедряване</h3><p>Изграждаме, тестваме и въвеждаме решението.</p></div></li>
          </ol>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section services-section" tabIndex={-1} aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div><p className="eyebrow">02 / Какво правим</p><h2 id="services-title">Сложните процеси.<br /><span className="muted">Работещите решения.</span></h2></div>
          <p>От първото клиентско запитване до онлайн магазина. Изграждаме софтуер за конкретните задачи на вашия бизнес.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <article className="service-row" key={service.title} data-reveal>
                <div className="service-marker"><span aria-hidden="true">0{index + 1}</span><Icon aria-hidden="true" /></div>
                <div className="service-copy"><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" className="text-link service-link">Обсъдете решение <ArrowUpRight aria-hidden="true" /><span className="sr-only">: {service.title}</span></a></div>
                <ul className="service-points">
                  {service.points.map((point) => <li key={point}><Check aria-hidden="true" />{point}</li>)}
                </ul>
              </article>
            )
          })}
        </div>
        <div className="products-strip">
          <p>Продукти и автоматизации</p>
          <div className="product-links">
            <a className="text-link" href={karBgUrl} target="_blank" rel="noreferrer">Kar.bg <ArrowUpRight aria-hidden="true" /><span className="sr-only">(отваря се в нов раздел)</span></a>
            <a className="text-link" href={dsFashionUrl} target="_blank" rel="noreferrer">dsfashion.shop <ArrowUpRight aria-hidden="true" /><span className="sr-only">(отваря се в нов раздел)</span></a>
            <span className="automation-product"><img src={automationLogo} alt="" width="40" height="40" loading="lazy" />Chrome Automation</span>
          </div>
        </div>
      </div>
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
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
  return (
    <section id="faq" className="section faq-section" tabIndex={-1} aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="container faq-grid">
        <div className="faq-heading" data-reveal>
          <p className="eyebrow">04 / Въпроси и отговори</p>
          <h2 id="faq-title">Често задавани въпроси.</h2>
          <p>За услугите и първите стъпки в работата ни заедно.</p>
          <a href="#contact" className="text-link accent-link">Имате друг въпрос? <ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact-section" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-intro" data-reveal>
          <p className="eyebrow">Да започнем от вашата идея</p>
          <h2 id="contact-title">Следващата стъпка?<br /><span>Един разговор.</span></h2>
          <p>Разкажете ни за бизнеса си и задачите, които искате да улесните. Ще обсъдим откъде да започнем.</p>
          <a href={emailHref} className="button"><Mail aria-hidden="true" />Пишете ни за проекта</a>
          <p className="contact-hint">Отваря вашето приложение за електронна поща.</p>
        </div>
        <address className="contact-details">
          <div className="contact-item contact-email">
            <span className="contact-label">Пишете ни</span>
            <a href={emailHref}>{CONTACT_EMAIL}<ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Обадете се</span>
            {phoneNumbers.map(phone => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`}><Phone aria-hidden="true" />{phone}</a>
            ))}
          </div>
        </address>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Brand />
        <p>Ние автоматизираме. Вие растете.</p>
        <span>© {new Date().getFullYear()} Kode.bg</span>
      </div>
    </footer>
  )
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollMotion(pageRef)

  return (
    <div id="top" ref={pageRef}>
      <a href="#main" className="skip-link">Към съдържанието</a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero /><About /><Services /><Clients /><FAQ /><Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
