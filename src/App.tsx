import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import ProjectDetail from './ProjectDetail'

export interface Project {
  id?: string
  name: string
  desc: string
  detail?: string
  icon: string
  platform: string[]
  tags: { label: string; type: string }[]
  screenshots?: string[]
  downloadUrl?: string
  version?: string
  link?: string
}

export interface SiteConfig {
  site: {
    title: string
    subtitle: string
    links: { label: string; url: string }[]
  }
  filters: { label: string; value: string }[]
  projects: Project[]
}

function Home({ config }: { config: SiteConfig }) {
  const [active, setActive] = useState('all')

  const { site, filters, projects } = config
  const filtered = active === 'all'
    ? projects
    : projects.filter(p => p.platform.includes(active))

  return (
    <div className="portal">
      <header className="header">
        <h1>{site.title}</h1>
        <p className="subtitle">{site.subtitle}</p>
        <div className="social-links">
          {site.links.map(link => (
            <a key={link.label} href={link.url}>{link.label}</a>
          ))}
        </div>
      </header>

      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f.value}
            className={`filter-btn ${active === f.value ? 'active' : ''}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filtered.map(project => {
          const cardContent = (
            <>
              <div className="card-top">
                <span className="card-icon">{project.icon}</span>
                <h3>{project.name}</h3>
              </div>
              <p className="card-desc">{project.desc}</p>
              <div className="card-tags">
                {project.tags.map(tag => (
                  <span key={tag.label} className={`tag tag-${tag.type}`}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </>
          )

          return project.id ? (
            <Link
              key={project.name}
              className="project-card"
              to={`/project/${project.id}`}
            >
              {cardContent}
            </Link>
          ) : project.link ? (
            <a
              key={project.name}
              className="project-card"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cardContent}
            </a>
          ) : (
            <div key={project.name} className="project-card">
              {cardContent}
            </div>
          )
        })}
      </div>

      <footer className="footer">
        <p>Built with React + Vite</p>
      </footer>
    </div>
  )
}

function App() {
  const [config, setConfig] = useState<SiteConfig | null>(null)

  useEffect(() => {
    fetch('/config.json')
      .then(r => r.json())
      .then(setConfig)
  }, [])

  if (!config) return null

  return (
    <Routes>
      <Route path="/" element={<Home config={config} />} />
      <Route path="/project/:id" element={<ProjectDetail config={config} />} />
    </Routes>
  )
}

export default App
