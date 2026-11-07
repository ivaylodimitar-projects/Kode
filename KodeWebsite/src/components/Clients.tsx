import { ArrowDown, ArrowRight, ArrowUpRight, Workflow } from 'lucide-react'
import { projects } from '../data/projects'
import { FitnessProject } from './FitnessProject'
import './Clients.css'

type Project = (typeof projects)[number]

function WebsiteProject({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`work-project work-project-${project.id}`} aria-labelledby={`work-title-${project.id}`} data-reveal data-reveal-order={index}>
      <a className="work-artwork" href={project.url} target="_blank" rel="noreferrer" aria-label={`Вижте проекта ${project.name} (отваря се в нов раздел)`}>
        <div className="work-artwork-top" aria-hidden="true">
          <span>{project.category}</span>
          <span className="work-artwork-index">0{index + 1} / KODE</span>
        </div>
        <span className="work-stage-word" aria-hidden="true">{project.id === 'kar' ? 'kar.' : project.id === 'fashion' ? 'ds.' : 'bull.'}</span>
        <div className="work-screen-scene">
          <div className="work-browser">
            <div className="work-browser-bar" aria-hidden="true">
              <span className="work-browser-dots"><i /><i /><i /></span>
              <span>{project.domain}</span>
              <ArrowUpRight />
            </div>
            <img className="work-screenshot" src={project.screenshot} alt={`${project.name} — изглед от сайта`} width="1440" height="1000" loading="lazy" decoding="async" />
          </div>
          {project.mobileScreenshot && (
            <div className="work-phone" aria-hidden="true">
              <div className="work-phone-screen">
                <div className="work-phone-safe-area"><span className="work-phone-speaker" /></div>
                <img src={project.mobileScreenshot} alt="" width="390" height="844" loading="lazy" decoding="async" />
              </div>
            </div>
          )}
        </div>
        <span className="work-open-label" aria-hidden="true">Вижте проекта <ArrowUpRight /></span>
        <span className="work-artwork-footer" aria-hidden="true">{project.id === 'kar' ? 'Открийте. Изберете. Потеглете.' : project.id === 'fashion' ? 'Мода с дигитално присъствие.' : 'Следващата дестинация: вашият гараж.'}</span>
      </a>
      <div className="work-caption">
        <div className="work-caption-heading">
          <h3 id={`work-title-${project.id}`}><a href={project.url} target="_blank" rel="noreferrer">{project.name}<ArrowUpRight aria-hidden="true" /><span className="sr-only"> (отваря се в нов раздел)</span></a></h3>
          <p className="work-headline">{project.headline}</p>
        </div>
        <div className="work-caption-detail">
          <p className="work-description">{project.description}</p>
          <ul className="work-features" aria-label={`Функционалности на ${project.name}`}>
            {project.features.map(feature => <li key={feature}>{feature}</li>)}
          </ul>
        </div>
      </div>
    </article>
  )
}

function AutomationProject({ project }: { project: Project }) {
  return (
    <article className="work-automation" aria-labelledby="work-automation-title" data-reveal>
      <div className="work-automation-copy">
        <p className="work-kicker"><span aria-hidden="true" />Зад кулисите на бизнеса</p>
        <h3 id="work-automation-title">Рутината е за<br /><span>автоматизиране.</span></h3>
        <p className="work-automation-description">{project.description}</p>
        <a href="#contact" className="work-automation-link">Да улесним и вашата работа <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="work-network">
        <div className="work-network-source" aria-hidden="true"><Workflow /><span>kode<span className="work-source-dot">.</span></span><span className="work-source-label">AUTOMATION</span></div>
        <div className="work-network-lines" aria-hidden="true"><span /><span /><span /></div>
        <ul className="work-dealers" aria-label="Клиенти на автоматизацията на Kode">
          {project.clients?.map(client => (
            <li className={`work-dealer work-dealer-${client.id}`} key={client.id}>
              <div className="work-dealer-logo"><img src={client.logo} alt="" width="160" height="160" loading="lazy" decoding="async" /></div>
              <span>{client.name}</span>
            </li>
          ))}
        </ul>
        <p className="work-network-note">Едно решение. Различни екипи.</p>
      </div>
    </article>
  )
}

export function Clients() {
  const portfolioProjects = projects.filter(project => project.kind === 'website' || project.kind === 'software')
  const automationProject = projects.find(project => project.kind === 'automation')

  return (
    <section id="clients" className="work-section" tabIndex={-1} aria-labelledby="clients-title">
      <div className="container">
        <div className="work-heading" data-reveal>
          <div>
            <p className="eyebrow">01 / Избрани проекти</p>
            <h2 id="clients-title">Добрият код.<br /><span>В реалния свят.</span></h2>
          </div>
          <div className="work-heading-aside">
            <p>Различни бизнеси.<br />Един и същ подход —<br />добре обмислен, добре направен.</p>
            <ArrowDown aria-hidden="true" />
          </div>
        </div>
        <div className="work-grid">
          {portfolioProjects.map((project, index) => project.kind === 'software'
            ? <FitnessProject key={project.id} project={project} index={index} />
            : <WebsiteProject key={project.id} project={project} index={index} />)}
        </div>
        {automationProject && <AutomationProject project={automationProject} />}
        <a className="work-next-conversation" href="#contact" data-reveal><span>Вашият проект може да е следващият.</span><span>Нека го обсъдим <ArrowRight aria-hidden="true" /></span></a>
      </div>
    </section>
  )
}
