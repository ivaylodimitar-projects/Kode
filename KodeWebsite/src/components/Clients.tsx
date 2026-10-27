import { useRef } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Settings2 } from 'lucide-react'
import { projects } from '../data/projects'
import { useHorizontalShowcase } from '../hooks/useHorizontalShowcase'
import './Clients.css'

export function Clients() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLOListElement>(null)
  const { activeIndex, goTo, onKeyDown } = useHorizontalShowcase(sectionRef, viewportRef, trackRef, projects.length)

  return (
    <section ref={sectionRef} id="clients" className="work-section" tabIndex={-1} aria-labelledby="clients-title">
      <div className="work-sticky">
        <div className="container work-heading">
          <div>
            <p className="eyebrow">03 / Избрани партньорства</p>
            <h2 id="clients-title">Добрият код.<span className="muted"> В реалния бизнес.</span></h2>
          </div>
          <p className="work-intro">Компаниите, с които работим.<br />Уебсайтове и автоматизации за техния бизнес.</p>
        </div>

        <div ref={viewportRef} className="work-viewport" tabIndex={0} role="region" aria-label="Галерия с клиентски проекти и автоматизации" aria-describedby="work-instructions" onKeyDown={onKeyDown}>
          <ol ref={trackRef} className="work-track">
            {projects.map((project, index) => (
              <li className="work-slide" key={project.id}>
                <article className={`work-project work-project-${project.id}`} aria-labelledby={`work-title-${project.id}`}>
                  <div className="work-artwork">
                    <div className="work-artwork-label"><span>{project.category}</span><span aria-hidden="true">KODE / {project.kind === 'automation' ? 'AUTOMATION' : 'SELECTED WORK'}</span></div>
                    <div className="work-screen-scene">
                      {project.screenshot ? (
                        <div className="work-browser">
                          <div className="work-browser-bar" aria-hidden="true"><span className="work-browser-dots"><i /><i /><i /></span><span>{project.domain}</span><ArrowUpRight /></div>
                          <img className="work-screenshot" src={project.screenshot} alt={`${project.name} — изглед от сайта`} width="1440" height="1000" loading="lazy" decoding="async" />
                        </div>
                      ) : project.clients ? (
                        <div className="work-automation-clients">
                          <p className="work-automation-label"><Settings2 aria-hidden="true" /><span>Използват автоматизацията на Kode</span></p>
                          <ul className="work-dealer-grid" aria-label="Дилъри, които използват автоматизацията">
                            {project.clients.map(client => (
                              <li className={`work-dealer work-dealer-${client.id}`} key={client.id}>
                                <span className="work-dealer-logo"><img src={client.logo} alt="" width="160" height="160" loading="lazy" decoding="async" /></span>
                                <span className="work-dealer-name">{client.name}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="work-brand-display">
                          {project.logo && <img src={project.logo} alt={project.name} width="260" height="140" loading="lazy" />}
                        </div>
                      )}
                      {project.mobileScreenshot && <div className="work-phone" aria-hidden="true"><span className="work-phone-speaker" /><img src={project.mobileScreenshot} alt="" width="390" height="844" loading="lazy" decoding="async" /></div>}
                    </div>
                    <div className="work-artwork-footer"><span>{project.kind === 'website' ? 'Уебсайт / Реален изглед' : 'Автоматизация / Нашите клиенти'}</span><span aria-hidden="true">0{index + 1} — 0{projects.length}</span></div>
                  </div>

                  <div className="work-copy">
                    <div className="work-project-meta"><span className="work-project-type">{project.category}</span><span className="work-number" aria-hidden="true">/ 0{index + 1}</span></div>
                    <h3 id={`work-title-${project.id}`}>{project.name}</h3>
                    <p className="work-headline">{project.headline}</p>
                    <p className="work-description">{project.description}</p>
                    <ul className="work-features" aria-label={project.kind === 'website' ? 'В сайта' : 'За партньорството'}>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
                    {project.kind === 'website' && project.url && <a className="work-visit" href={project.url} target="_blank" rel="noreferrer"><span>Разгледайте сайта<span className="sr-only"> на {project.name} (отваря се в нов раздел)</span></span><span className="work-visit-arrow"><ArrowUpRight aria-hidden="true" /></span></a>}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div className="container work-navigation">
          <p id="work-instructions" className="work-instructions"><span className="work-scroll-label">Скролирайте, за да разгледате</span><span className="work-swipe-label">Плъзнете, за да разгледате</span><ArrowRight aria-hidden="true" /><span className="sr-only">Използвайте и бутоните или стрелките наляво и надясно, когато галерията е на фокус.</span></p>
          <nav className="work-tabs" aria-label="Изберете проект">{projects.map((project, index) => <button className="work-tab" key={project.id} type="button" aria-label={`Покажи ${project.name}`} aria-current={activeIndex === index ? 'true' : undefined} onClick={() => goTo(index)}><span className="work-tab-number" aria-hidden="true">0{index + 1}</span><span className="work-tab-name">{project.name}</span></button>)}</nav>
          <div className="work-controls"><span className="work-counter" aria-live="polite" aria-atomic="true"><span className="sr-only">Проект </span>0{activeIndex + 1}<span className="work-counter-total"> / 0{projects.length}</span></span><button className="work-prev" type="button" aria-label="Предишен проект" disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)}><ArrowLeft aria-hidden="true" /></button><button className="work-next" type="button" aria-label="Следващ проект" disabled={activeIndex === projects.length - 1} onClick={() => goTo(activeIndex + 1)}><ArrowRight aria-hidden="true" /></button></div>
        </div>
      </div>
    </section>
  )
}
