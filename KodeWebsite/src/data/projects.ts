import karLogo from '../assets/clients_logos/karbglogowhite-ui.png'
import fashionLogo from '../assets/clients_logos/dsfashion.png'
import atlanticLogo from '../assets/clients_logos/IMG_8239.WEBP?url'
import car2uLogo from '../assets/clients_logos/car2u.PNG?url'
import wincarsLogo from '../assets/clients_logos/wincars.svg'
import karScreenshot from '../assets/projects/kar-bg-listings.jpg'
import karMobileScreenshot from '../assets/projects/kar-bg-mobile.jpg'
import fashionScreenshot from '../assets/projects/ds-fashion.jpg'
import bullScreenshot from '../assets/projects/bull-import.jpg'

type Project = {
  id: string
  name: string
  kind: 'website' | 'automation'
  category: string
  headline: string
  description: string
  features: string[]
  logo?: string
  clients?: { id: string; name: string; logo: string }[]
  screenshot?: string
  mobileScreenshot?: string
  domain?: string
  url?: string
}

// Distinguish website projects from customers who only use Kode's automation.
export const projects: Project[] = [
  {
    id: 'kar', name: 'Kar.bg', kind: 'website', category: 'Автомобилна платформа',
    headline: 'От търсенето до точната обява.',
    description: 'Автомобили, авточасти и дилъри на едно място. Подробни филтри, запазени предложения и лесно откриване на следващия автомобил.',
    features: ['Търсене и филтри', 'Автообяви', 'Дилърски профили'],
    logo: karLogo, screenshot: karScreenshot, mobileScreenshot: karMobileScreenshot, domain: 'kar.bg', url: 'https://www.kar.bg/',
  },
  {
    id: 'fashion', name: 'DS Fashion', kind: 'website', category: 'Онлайн магазин',
    headline: 'Стилът започва от първия поглед.',
    description: 'Онлайн пространство за дамска мода. Колекции, продуктови страници и пазаруване, което започва с вдъхновение и завършва с поръчка.',
    features: ['Продуктов каталог', 'Колекции', 'Онлайн поръчки'],
    logo: fashionLogo, screenshot: fashionScreenshot, domain: 'dsfashion.shop', url: 'https://dsfashion.shop/',
  },
  {
    id: 'bull', name: 'BullImport', kind: 'website', category: 'Автомобилен внос',
    headline: 'От избора до доставката.',
    description: 'Сайт за внос на автомобили от САЩ, Канада и Южна Корея. Автомобилни предложения, доставени автомобили и директно запитване към екипа.',
    features: ['Автомобилни предложения', 'Доставени автомобили', 'Запитвания'],
    screenshot: bullScreenshot, domain: 'bullimport.bg', url: 'https://bullimport.bg/',
  },
  {
    id: 'automation', name: 'Автоматизация', kind: 'automation', category: 'За автомобилни дилъри',
    headline: 'Едно решение. Различни екипи.',
    description: 'Car2U, Wincars и Atlantic Drive използват автоматизацията на Kode в ежедневната си работа.',
    features: ['Автоматизация', 'Автомобилни дилъри'],
    clients: [
      { id: 'car2u', name: 'Car2U', logo: car2uLogo },
      { id: 'wincars', name: 'Wincars', logo: wincarsLogo },
      { id: 'atlantic', name: 'Atlantic Drive', logo: atlanticLogo },
    ],
  },
]
