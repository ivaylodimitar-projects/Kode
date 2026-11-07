import { ArrowUpRight, Dumbbell } from 'lucide-react'
import type { projects } from '../data/projects'
import './FitnessProject.css'

type Project = (typeof projects)[number]

export function FitnessProject({ project, index }: { project: Project; index: number }) {
  return (
    <article className="work-project work-project-fitness" aria-labelledby="work-title-fitness" data-reveal data-reveal-order={index}>
      <div className="fitness-artwork">
        <div className="fitness-artwork-top">
          <span>{project.category}</span>
          <span className="fitness-artwork-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} / KODE</span>
        </div>
        <div className="fitness-artwork-shapes" aria-hidden="true">
          <span className="fitness-orbit" />
          <span className="fitness-word">Gymflow</span>
          <span className="fitness-badge"><Dumbbell /></span>
        </div>
      </div>

      <div className="work-caption fitness-caption">
        <div className="work-caption-heading">
          <h3 id="work-title-fitness">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noreferrer">
                <span>{project.name}</span><ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> (отваря се в нов раздел)</span>
              </a>
            ) : project.name}
          </h3>
          <p className="work-headline">{project.headline}</p>
        </div>
        <div className="work-caption-detail">
          <p className="work-description">{project.description}</p>
          {project.features.length > 0 && (
            <ul className="work-features" aria-label={`Функционалности на ${project.name}`}>
              {project.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          )}
        </div>
        <a className="fitness-contact-link" href="#contact">Обсъдете подобен проект<ArrowUpRight aria-hidden="true" /></a>
      </div>
    </article>
  )
}
