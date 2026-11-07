import { useRef, useState } from 'react'
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown,
  Code2, Layers3, Menu, MoveUpRight, Workflow, X,
} from 'lucide-react'
import kodeLogoLight from './assets/company_images/kode-logo-light.png'
import karScreenshot from './assets/projects/kar-bg-listings.jpg'
import fashionScreenshot from './assets/projects/ds-fashion.jpg'
import bullScreenshot from './assets/projects/bull-import.jpg'
import { Clients } from './components/Clients'
import { Contact } from './components/Contact'
import { useScrollMotion } from './hooks/useScrollMotion'
import './App.css'
import './motion.css'

const navLinks = [
  { label: 'Проекти', href: '#clients' },
  { label: 'За нас', href: '#about' },
  { label: 'Какво правим', href: '#services' },
]

const services = [
  {
    icon: Code2, title: 'Уебсайтове с характер.', number: '01',
    text: 'Вашият бизнес заслужава собствено място в интернет. Създаваме сайтове и платформи с обмислен дизайн, ясна структура и лесно управление.',
    points: ['Бизнес сайтове', 'Уеб платформи', 'Индивидуални решения'],
  },
  {
    icon: Layers3, title: 'Магазини, които вдъхновяват.', number: '02',
    text: 'От първия поглед към колекцията до завършената поръчка. Изграждаме онлайн магазини, в които продуктите ви са на преден план.',
    points: ['Shopify магазини', 'Продуктови каталози', 'Онлайн търговия'],
  },
  {
    icon: Workflow, title: 'Рутината на автопилот.', number: '03',
    text: 'Имейли, оферти, обяви и данни. Свързваме повтарящите се задачи в работещ процес за туризма, автомобилния бизнес и онлайн търговията.',
    points: ['Бизнес автоматизации', 'Свързване на системи', 'Обработка на данни'],
  },
]

const faqs = [
  {
    question: 'Как започва един проект?',
    answer: 'С разговор за вашия бизнес. Изясняваме какво искате да постигнете, как работите сега и къде има място за подобрение. След това подготвяме решение с конкретен обхват и стъпки за реализация.',
  },
  {
    question: 'Можете ли да подобрите съществуващ сайт?',
    answer: 'Да. Разглеждаме настоящия сайт, структурата и начина му на работа. Обсъждаме какво да запазим и какво да преработим — от дизайна до функционалностите и управлението на съдържанието.',
  },
  {
    question: 'Какво може да бъде автоматизирано?',
    answer: 'Повтарящи се задачи като обработка на запитвания, имейли по шаблон, подготовка на оферти, качване на автомобилни обяви и синхронизация на данни. Започваме с процесите, които отнемат най-много време на вашия екип.',
  },
  {
    question: 'За какви бизнеси работите?',
    answer: 'Изграждаме решения за автомобилния сектор, туризма, онлайн търговията и услугите. Важното е да разберем вашата конкретна задача и да намерим подходящото решение за нея.',
  },
]

function Brand({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  return (
    <a className={`brand${variant === 'dark' ? ' brand-dark' : ''}`} href="#top" aria-label="Kode.bg — начало">
      <span className="brand-art">
        <img src={kodeLogoLight} alt="Kode.bg" width="2141" height="734" />
        {variant === 'dark' && <img className="brand-light-suffix" src={kodeLogoLight} alt="" aria-hidden="true" width="2141" height="734" />}
      </span>
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  return (
    <header className="site-header" onKeyDown={event => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() }
    }}>
      <div className="container header-inner">
        <Brand />
        <span className="header-descriptor">Идея. Дизайн. Код.</span>
        <button ref={menuButton} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'Затвори' : 'Меню'}{menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="main-navigation" className={`main-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Основна навигация">
          {navLinks.map(link => <a key={link.href} href={link.href} onClick={() => {
            setMenuOpen(false)
            document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true })
          }}>{link.label}</a>)}
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Да поговорим <ArrowUpRight aria-hidden="true" /></a>
        </nav>
      </div>
      <div className="reading-progress" aria-hidden="true" />
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" data-scroll-scene>
      <div className="container">
        <div className="hero-kicker"><p className="eyebrow"><span className="status-dot" aria-hidden="true" />Дигитално студио / Kode.bg</p><span>От първата идея до последния детайл.</span></div>
        <div className="hero-heading">
          <h1 id="hero-title">Идеи, които<br /><span>работят.</span><span className="hero-spark" aria-hidden="true">✳</span></h1>
          <div className="hero-aside"><p>Създаваме сайтове, онлайн магазини и автоматизации.<br /><span>С характер. И с мисъл за бизнеса.</span></p><a className="text-link" href="#clients">Вижте какво правим <span className="link-circle"><ArrowDown aria-hidden="true" /></span></a></div>
        </div>
        <div className="hero-reel" aria-label="Някои от нашите проекти">
          <a href="#work-title-fashion" className="reel-project reel-fashion" aria-label="Разгледайте проекта DS Fashion"><div className="reel-caption"><span>DS Fashion</span><span>Онлайн магазин <ArrowUpRight aria-hidden="true" /></span></div><div className="reel-fashion-word" aria-hidden="true">Wear<br /><em>your story.</em></div><img src={fashionScreenshot} alt="Начална страница на онлайн магазина DS Fashion" width="1440" height="1000" fetchPriority="high" /></a>
          <a href="#work-title-kar" className="reel-project reel-kar" aria-label="Разгледайте проекта Kar.bg"><div className="reel-caption"><span>Kar.bg</span><span>Уеб платформа <ArrowUpRight aria-hidden="true" /></span></div><div className="reel-kar-word" aria-hidden="true">На точното<br />място.</div><div className="reel-browser"><div className="reel-browser-bar" aria-hidden="true"><span>•••</span><span>kar.bg</span><ArrowUpRight /></div><img src={karScreenshot} alt="Автомобилните предложения в Kar.bg" width="1440" height="1000" fetchPriority="high" /></div></a>
          <a href="#work-title-bull" className="reel-project reel-bull" aria-label="Разгледайте проекта BullImport"><div className="reel-caption"><span>BullImport</span><span>Уебсайт <ArrowUpRight aria-hidden="true" /></span></div><img src={bullScreenshot} alt="Сайтът за автомобилен внос BullImport" width="1440" height="1000" /><span className="reel-bull-tag" aria-hidden="true">Следващата<br />дестинация. <MoveUpRight /></span></a>
        </div>
        <div className="hero-footnote"><span>Дизайнът привлича. Добрият код движи.</span><a href="#contact">Вашият проект може да е следващият <ArrowUpRight aria-hidden="true" /></a></div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about-section" tabIndex={-1} aria-labelledby="about-title">
      <div className="container">
        <p className="eyebrow">02 / Хората зад кода</p>
        <div className="about-statement" data-reveal><h2 id="about-title">Мислим като партньори.<br /><span>Създаваме като екип.</span></h2><span className="about-symbol" aria-hidden="true">↗</span></div>
        <div className="about-bottom"><p className="about-intro">Ние сме Kode. Превръщаме сложните задачи в ясни дигитални решения — от първата скица до софтуера, с който работите всеки ден.</p><div className="about-details"><p>Първо разбираме бизнеса ви. Какво искате да промените? Къде губите време? Какво още може да прави сайтът ви? После намираме отговорите с дизайн и код.</p><a href="#contact" className="text-link">Да се запознаем <span className="link-circle"><ArrowUpRight aria-hidden="true" /></span></a></div></div>
      </div>
    </section>
  )
}

function Services() {
  const [activeService, setActiveService] = useState(0)
  return (
    <section id="services" className="section services-section" tabIndex={-1} aria-labelledby="services-title">
      <div className="container services-layout">
        <div className="services-intro" data-reveal><p className="eyebrow">03 / От какво имате нужда?</p><h2 id="services-title">Красиво отвън.<br /><span className="muted">Умно отвътре.</span></h2><p>Дизайнът и технологията работят най-добре заедно. Ние се грижим и за двете.</p><a className="text-link" href="#contact">Да намерим вашето решение <ArrowUpRight aria-hidden="true" /></a><div className="service-glyph" aria-hidden="true"><span>&lt;</span><span>/</span><span>&gt;</span></div></div>
        <div className="service-list">
          {services.map((service, index) => {
            const Icon = service.icon
            const open = activeService === index
            return <article className={`service-item${open ? ' is-active' : ''}`} key={service.number}>
              <h3><button type="button" id={`service-trigger-${index}`} aria-expanded={open} aria-controls={`service-panel-${index}`} onClick={() => setActiveService(open ? -1 : index)}><span className="service-number">{service.number}</span><span>{service.title}</span><span className="service-toggle" aria-hidden="true">{open ? '−' : '+'}</span></button></h3>
              <div id={`service-panel-${index}`} role="region" aria-labelledby={`service-trigger-${index}`} hidden={!open} className="service-panel"><Icon className="service-icon" aria-hidden="true" /><p>{service.text}</p><ul>{service.points.map(point => <li key={point}><Check aria-hidden="true" />{point}</li>)}</ul><a href="#contact" className="text-link">Имам такъв проект <ArrowUpRight aria-hidden="true" /><span className="sr-only">: {service.title}</span></a></div>
            </article>
          })}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return <section className="process-section" aria-labelledby="process-title"><div className="container"><div className="process-heading"><p className="eyebrow">От „Ами ако…“ до „Готово.“</p><h2 id="process-title">Заедно, на всяка стъпка.</h2></div><ol className="process-list">{[
    ['Говорим.', 'За вашата идея, бизнеса и хората, които ще използват решението.'],
    ['Измисляме.', 'Правилния подход, дизайна и ясен план за реализация.'],
    ['Създаваме.', 'Разработваме, тестваме и превръщаме плана в работещ продукт.'],
  ].map(([title, text], index) => <li key={title} data-reveal><span className="process-number">0{index + 1}<ArrowRight aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
}

function FAQ() {
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }
  return <section id="faq" className="section faq-section" tabIndex={-1} aria-labelledby="faq-title"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><div className="container faq-grid"><div className="faq-heading"><p className="eyebrow">04 / Добри въпроси</p><h2 id="faq-title">Преди да<br />започнем.</h2><a href="#contact" className="text-link">Попитайте ни още <ArrowUpRight aria-hidden="true" /></a></div><div className="faq-list">{faqs.map(faq => <details key={faq.question}><summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></div></section>
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><Brand variant="dark" /><p>Идея. Дизайн. Код. <span>Нещата се получават.</span></p><span>© {new Date().getFullYear()} Kode.bg</span><a href="#top" className="footer-top">Към началото <ArrowUpRight aria-hidden="true" /></a></div></footer>
}

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollMotion(pageRef)
  return <div id="top" ref={pageRef}><a href="#main" className="skip-link">Към съдържанието</a><Header /><main id="main" tabIndex={-1}><Hero /><Clients /><About /><Services /><Process /><FAQ /><Contact /></main><Footer /></div>
}

export default App
