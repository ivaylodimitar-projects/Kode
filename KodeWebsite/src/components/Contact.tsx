import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Check, Copy } from 'lucide-react'
import { CONTACT_EMAIL } from '../config'
import './Contact.css'

const interests = [
  { label: 'Уебсайт', subject: 'Идея за нов уебсайт' },
  { label: 'Онлайн магазин', subject: 'Идея за онлайн магазин' },
  { label: 'Автоматизация', subject: 'Идея за автоматизация' },
]

const phoneNumbers = ['+359 88 728 6159', '+359 89 728 8330']

export function Contact() {
  const [interest, setInterest] = useState<number | null>(null)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const selected = interest === null ? null : interests[interest]
  const subject = selected?.subject ?? 'Да обсъдим една идея'
  const body = `Здравейте, Kode!\n\n${selected ? `Интересувам се от ${selected.label.toLocaleLowerCase('bg')}.` : 'Имам идея, която искам да обсъдим.'}\n\nМалко повече за проекта:\n\n`
  const projectEmailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <section id="contact" className="contact-stage" tabIndex={-1} aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-kicker">
          <span>От добра идея до първи разговор</span>
          <ArrowDown aria-hidden="true" />
        </div>

        <div className="contact-main">
          <div className="contact-message" data-reveal>
            <h2 id="contact-title">Имате идея?<br /><span>Да ѝ дадем<br />живот.</span></h2>
            <div className="contact-interests">
              <p id="contact-interest-label">За какво си мислите?</p>
              <div className="contact-choices" role="group" aria-labelledby="contact-interest-label">
                {interests.map((item, index) => (
                  <button
                    type="button"
                    key={item.label}
                    aria-pressed={interest === index}
                    onClick={() => setInterest(interest === index ? null : index)}
                  >
                    {interest === index && <Check aria-hidden="true" />}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-invitation" data-reveal data-reveal-order="1">
            <span className="contact-orbit-note">Всяко начало е един разговор.</span>
            <a className="contact-circle" href={projectEmailHref} aria-label={`Да поговорим. Напишете ни имейл: ${subject}`}>
              <ArrowUpRight aria-hidden="true" />
              <span>Да<br />поговорим.</span>
              <span className="contact-circle-small">Напишете ни имейл</span>
            </a>
            <p className="contact-invitation-note">Разкажете ни какво искате да промените.<br />Ние ще помислим как да го създадем.</p>
          </div>
        </div>

        <address className="contact-direct">
          <div className="contact-email-block" data-reveal>
            <span className="contact-detail-label">Един имейл разстояние</span>
            <div className="contact-email-row">
              <a className="contact-email-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <button className="contact-copy" type="button" onClick={copyEmail} aria-label={copyState === 'copied' ? 'Имейлът е копиран' : 'Копирайте имейл адреса'}>
                {copyState === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
              </button>
            </div>
            <span className="contact-copy-feedback" role="status">
              {copyState === 'copied' && 'Имейлът е копиран.'}
              {copyState === 'failed' && 'Изберете адреса, за да го копирате, или натиснете, за да ни пишете.'}
            </span>
          </div>
          <div className="contact-phone-block" data-reveal data-reveal-order="1">
            <span className="contact-detail-label">Ако предпочитате да се чуем</span>
            {phoneNumbers.map(phone => (
              <a className="contact-phone-link" key={phone} href={`tel:${phone.replace(/\s/g, '')}`}>
                {phone}<ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </address>
      </div>
    </section>
  )
}
