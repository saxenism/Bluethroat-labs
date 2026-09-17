'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { ArrowUpRight, X } from 'lucide-react'
import { IconLogo } from '@/assets/logos'
import {
  isProjectId,
  projects,
  type ProjectId,
  type ResearchProject,
} from '@/lib/tools-and-research'
import styles from './tools-research-hub.module.css'

const supportingProjectIds: ProjectId[] = [
  'blueskills',
  'bluemask',
  'bluepaper',
  'bluegate',
]

export const ToolsResearchHub = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const requestedProject = searchParams.get('project')
  const selectedId = isProjectId(requestedProject) ? requestedProject : null
  const selectedProject = selectedId ? projects[selectedId] : null
  const locallyOpenedProject = useRef<ProjectId | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const lastDialogProject = useRef<ProjectId | null>(null)

  useEffect(() => {
    if (selectedId) lastDialogProject.current = selectedId
  }, [selectedId])

  const buildUrl = useCallback(
    (projectId: ProjectId | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (projectId) params.set('project', projectId)
      else params.delete('project')

      const query = params.toString()
      const hash = typeof window === 'undefined' ? '' : window.location.hash
      return `${pathname}${query ? `?${query}` : ''}${hash}`
    },
    [pathname, searchParams]
  )

  const selectProject = useCallback(
    (projectId: ProjectId) => (event: React.MouseEvent<HTMLButtonElement>) => {
      locallyOpenedProject.current = projectId
      lastTrigger.current = event.currentTarget
      router.push(buildUrl(projectId), { scroll: false })
    },
    [buildUrl, router]
  )

  const closeProject = useCallback(() => {
    if (!selectedId) return

    if (locallyOpenedProject.current === selectedId) {
      locallyOpenedProject.current = null
      router.back()
      return
    }

    router.replace(buildUrl(null), { scroll: false })
  }, [buildUrl, router, selectedId])

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) closeProject()
    },
    [closeProject]
  )

  const restoreFocus = useCallback((event: Event) => {
    event.preventDefault()
    const fallbackId = lastDialogProject.current
      ? `project-card-${lastDialogProject.current}`
      : null
    const fallback = fallbackId
      ? document.getElementById(fallbackId)
      : document.querySelector<HTMLElement>('[data-project-grid] button')
    const target = lastTrigger.current?.isConnected
      ? lastTrigger.current
      : fallback

    requestAnimationFrame(() => target?.focus())
  }, [])

  return (
    <section className={styles.hub} aria-labelledby="tools-research-title">
      <div className={styles.shell}>
        <div className={styles.ribbon}>
          <p>PUBLIC PROJECTS BY BLUETHROAT LABS</p>
          <span aria-hidden="true" />
        </div>

        <header className={styles.intro}>
          <h1 id="tools-research-title">Tools &amp; Research</h1>
          <p>Free tools and practical research for safer work in Web3.</p>
          <div className={styles.mobileAttribution}>
            <IconLogo aria-hidden="true" />
            <span>Public projects by Bluethroat Labs</span>
          </div>
        </header>

        <div className={styles.projectStage} data-project-grid>
          <div className={styles.projectScrim} aria-hidden="true" />
          <div className={styles.projectsLayout}>
            <FeaturedProjectCard
              project={projects['tee-handbook']}
              onSelect={selectProject('tee-handbook')}
            />
            <div className={styles.supportingGrid}>
              {supportingProjectIds.map((projectId) => (
                <SupportingProjectCard
                  key={projectId}
                  project={projects[projectId]}
                  onSelect={selectProject(projectId)}
                />
              ))}
            </div>
          </div>
          <i className={`${styles.corner} ${styles.topLeft}`} />
          <i className={`${styles.corner} ${styles.topRight}`} />
          <i className={`${styles.corner} ${styles.bottomLeft}`} />
          <i className={`${styles.corner} ${styles.bottomRight}`} />
        </div>
      </div>

      <ProjectScroll
        project={selectedProject}
        onOpenChange={handleOpenChange}
        onCloseAutoFocus={restoreFocus}
      />
    </section>
  )
}

const Emblem = ({
  projectId,
  className,
}: {
  projectId: ProjectId
  className?: string
}) => {
  return (
    // These supplied monochrome SVGs render in their own document context.
    // The theme-specific filter in the CSS supplies their current ink color.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/tools-and-research/emblems/${projectId}-full.svg`}
      alt=""
      className={className}
      aria-hidden="true"
    />
  )
}

const FeaturedProjectCard = ({
  project,
  onSelect,
}: {
  project: ResearchProject
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <button
      id={`project-card-${project.id}`}
      type="button"
      className={styles.featuredCard}
      onClick={onSelect}
      aria-haspopup="dialog"
    >
      <div className={styles.featuredBody}>
        <p className={styles.projectStatus}>{project.status}</p>
        <Emblem projectId={project.id} className={styles.featuredEmblem} />
        <div className={styles.featuredCopy}>
          <h2>{project.name}</h2>
          <p>{project.menuDescription}</p>
        </div>
      </div>
      <span className={styles.featuredAction}>Explore project</span>
    </button>
  )
}

const SupportingProjectCard = ({
  project,
  onSelect,
}: {
  project: ResearchProject
  onSelect: (event: React.MouseEvent<HTMLButtonElement>) => void
}) => {
  return (
    <button
      id={`project-card-${project.id}`}
      type="button"
      className={styles.supportingCard}
      onClick={onSelect}
      aria-haspopup="dialog"
    >
      <p className={styles.projectStatus}>{project.status}</p>
      <Emblem
        projectId={project.id}
        className={`${styles.supportingEmblem} ${
          project.state === 'soon' ? styles.soonEmblem : ''
        }`}
      />
      <div className={styles.supportingCopy}>
        <h2>{project.name}</h2>
        <p>{project.menuDescription}</p>
      </div>
      <span className={styles.supportingAction}>
        Explore project <span aria-hidden="true">→</span>
      </span>
    </button>
  )
}

const ProjectDestination = ({ project }: { project: ResearchProject }) => {
  if (project.state === 'live') {
    return (
      <a href={project.href} className={styles.woodAction} target="_blank">
        <span>{project.button}</span>
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
      </a>
    )
  }

  if (project.state === 'pending') {
    return (
      <div className={styles.pendingAction} aria-disabled="true">
        <span>{project.button}</span>
      </div>
    )
  }

  return (
    <div className={styles.soonAction} aria-disabled="true">
      <span>Coming soon</span>
    </div>
  )
}

const ProjectScroll = ({
  project,
  onOpenChange,
  onCloseAutoFocus,
}: {
  project: ResearchProject | null
  onOpenChange: (open: boolean) => void
  onCloseAutoFocus: (event: Event) => void
}) => {
  return (
    <DialogPrimitive.Root open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.dialogOverlay} />
        {project ? (
          <DialogPrimitive.Content
            className={styles.dialogContent}
            onCloseAutoFocus={onCloseAutoFocus}
          >
            <div className={styles.scrollTop} aria-hidden="true" />
            <div className={styles.parchment}>
              <div className={styles.scrollToolbar}>
                <span className={styles.dialogStatus}>{project.status}</span>
                <div className={styles.closeGroup}>
                  <span aria-hidden="true">ESC</span>
                  <DialogPrimitive.Close
                    className={styles.closeButton}
                    aria-label={`Close ${project.name}`}
                  >
                    <X aria-hidden="true" size={21} strokeWidth={1.6} />
                  </DialogPrimitive.Close>
                </div>
              </div>

              <div className={styles.scrollBody}>
                <div className={styles.dialogHeading}>
                  <Emblem
                    projectId={project.id}
                    className={styles.dialogEmblem}
                  />
                  <DialogPrimitive.Title>{project.name}</DialogPrimitive.Title>
                </div>

                <div className={styles.dashedRule} aria-hidden="true" />

                <DialogPrimitive.Description className={styles.descriptor}>
                  {project.descriptor}
                </DialogPrimitive.Description>
                <p className={styles.dialogBody}>{project.body}</p>

                {project.limit ? (
                  <div className={styles.limitBlock}>
                    <p className={styles.limitLabel}>LIMIT</p>
                    <p>{project.limit}</p>
                  </div>
                ) : null}

                <div className={styles.signature}>
                  <IconLogo
                    aria-hidden="true"
                    className={styles.signatureLogo}
                  />
                  <span>{project.signature}</span>
                </div>

                <div className={styles.destination}>
                  <ProjectDestination project={project} />
                </div>
              </div>
            </div>
            <div className={styles.scrollBottom} aria-hidden="true" />
          </DialogPrimitive.Content>
        ) : null}
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
