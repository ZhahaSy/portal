import { useParams, Link } from 'react-router-dom'
import type { SiteConfig } from './App'
import './ProjectDetail.css'

function ProjectDetail({ config }: { config: SiteConfig }) {
  const { id } = useParams<{ id: string }>()
  const project = config.projects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="detail-page">
        <div className="detail-container">
          <Link to="/" className="back-btn">← 返回首页</Link>
          <p style={{ marginTop: 40, color: 'var(--text-muted)' }}>项目不存在</p>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <Link to="/" className="back-btn">← 返回首页</Link>

        <div className="detail-header">
          <span className="detail-icon">{project.icon}</span>
          <div className="detail-title-area">
            <h1 className="detail-name">{project.name}</h1>
            {project.version && <span className="detail-version">v{project.version}</span>}
          </div>
        </div>

        <div className="detail-tags">
          {project.tags.map(tag => (
            <span key={tag.label} className={`tag tag-${tag.type}`}>
              {tag.label}
            </span>
          ))}
        </div>

        <p className="detail-desc">{project.detail || project.desc}</p>

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="detail-screenshots">
            <h2 className="section-title">截图预览</h2>
            <div className="screenshots-grid">
              {project.screenshots.map((src, i) => (
                <div key={i} className="screenshot-item">
                  <img
                    src={src}
                    alt={`${project.name} 截图 ${i + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.classList.add('screenshot-placeholder')
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="detail-actions">
          {project.downloadUrl && (
            <a href={project.downloadUrl} download className="download-btn">
              📥 下载 APK
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="visit-btn">
              🔗 访问项目
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
