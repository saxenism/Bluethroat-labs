'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { IconLogo } from '@/assets/logos'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ScrollDialog } from '@/components/ui/ScrollDialog'
import {
  isProjectId,
  projects,
  type ProjectId,
  type ResearchProject,
} from '@/lib/tools-and-research'

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
    <section
      className="w-full bg-(--hub-bg) font-mono text-(--hub-ink) [--hub-action-ink:#fafafa] [--hub-action:#141414] [--hub-bg:#fafafa] [--hub-cell-hover:rgba(255,255,255,0.92)] [--hub-cell:rgba(255,255,255,0.66)] [--hub-emblem-soft:#55554f] [--hub-emblem:#1f1f1d] [--hub-feature-hover:rgba(255,255,255,0.86)] [--hub-feature:rgba(255,255,255,0.58)] [--hub-focus:#141414] [--hub-frame:#4a4a47] [--hub-ink-2:#4a4a47] [--hub-ink-3:#6b6b66] [--hub-ink:#141414] [--hub-line-2:#cfcec9] [--hub-line-3:#b9b8b3] [--hub-line:#dcdbd6] [--hub-relief:0.1] [--hub-ribbon:0.16] [--hub-scrim:linear-gradient(176deg,rgba(250,250,250,0.5)_0%,rgba(250,250,250,0.8)_48%,rgba(250,250,250,0.93)_100%)] [--hub-veil:rgba(34,32,28,0.76)] dark:[--hub-action-ink:#0a0a0a] dark:[--hub-action:#fafafa] dark:[--hub-bg:#0a0a0a] dark:[--hub-cell-hover:rgba(28,28,28,0.78)] dark:[--hub-cell:rgba(10,10,10,0.5)] dark:[--hub-emblem-soft:#c4c4c4] dark:[--hub-emblem:#ededed] dark:[--hub-feature-hover:rgba(26,26,26,0.72)] dark:[--hub-feature:rgba(14,14,14,0.52)] dark:[--hub-focus:#fafafa] dark:[--hub-frame:#c4c4c4] dark:[--hub-ink-2:#a9a9a9] dark:[--hub-ink-3:#969696] dark:[--hub-ink:#f2f2f2] dark:[--hub-line-2:#3a3a3a] dark:[--hub-line-3:#505050] dark:[--hub-line:#2e2e2e] dark:[--hub-relief:0.24] dark:[--hub-ribbon:0.3] dark:[--hub-scrim:linear-gradient(176deg,rgba(10,10,10,0.42)_0%,rgba(10,10,10,0.74)_48%,rgba(10,10,10,0.9)_100%)] dark:[--hub-veil:rgba(8,8,8,0.9)]"
      aria-labelledby="tools-research-title"
    >
      <div className="mx-auto w-full [box-shadow:inset_0_0_0_0.5px_var(--hub-line)]">
        <div className="flex h-10 border-y border-(--hub-line) max-[1023px]:hidden">
          <p className="flex items-center border-r border-(--hub-line) bg-(--hub-panel) px-6 text-[13px] font-semibold tracking-[0.13em] whitespace-nowrap [--hub-panel:#f1f0ed] dark:[--hub-panel:#161616]">
            PUBLIC PROJECTS BY BLUETHROAT LABS
          </p>
          <span
            aria-hidden="true"
            className="flex-1 bg-[url('/tools-and-research/textures/engraved-plate.jpg')] bg-cover bg-position-[center_44%] opacity-(--hub-ribbon)"
          />
        </div>

        <header className="relative px-7 pt-7 pb-7.5 [box-shadow:inset_0_0_0_0.5px_var(--hub-line)] max-[699px]:px-4 max-[699px]:py-6.5">
          <h1
            id="tools-research-title"
            className="font-instrumental m-0 text-[clamp(42px,4vw,58px)] leading-[1.02] font-normal tracking-[-0.01em] text-pretty text-(--hub-ink) max-[699px]:text-[clamp(32px,9vw,44px)]"
          >
            Tools &amp; Research
          </h1>
          <p className="mt-3 max-w-160 text-base leading-[1.55] font-medium text-pretty text-(--hub-ink-2)">
            Free tools and practical research for safer work in Web3.
          </p>
          <div className="mt-4 hidden items-center gap-2.25 border-t border-(--hub-line) pt-3.5 text-sm font-semibold text-(--hub-ink-2) max-[1023px]:flex [&_svg]:size-4.5 [&_svg]:shrink-0">
            <IconLogo aria-hidden="true" />
            <span>Public projects by Bluethroat Labs</span>
          </div>
        </header>

        <div
          className="relative bg-[url('/tools-and-research/textures/engraved-plate.jpg')] bg-cover bg-center [box-shadow:inset_0_0_0_1px_var(--hub-line-3)] before:absolute before:inset-0 before:bg-(--hub-bg) before:opacity-[calc(1-var(--hub-relief))] before:content-['']"
          data-project-grid
        >
          <div
            className="absolute inset-0 bg-(image:--hub-scrim)"
            aria-hidden="true"
          />
          <div className="relative flex flex-wrap">
            <FeaturedProjectCard
              project={projects['tee-handbook']}
              onSelect={selectProject('tee-handbook')}
            />
            <div className="grid min-w-70 flex-[1_1_600px] grid-cols-2 grid-rows-[repeat(2,minmax(272px,1fr))] max-[1179px]:basis-full max-[699px]:flex max-[699px]:flex-col">
              {supportingProjectIds.map((projectId) => (
                <SupportingProjectCard
                  key={projectId}
                  project={projects[projectId]}
                  onSelect={selectProject(projectId)}
                />
              ))}
            </div>
          </div>
          <i className="pointer-events-none absolute top-0 left-0 z-3 size-10 border-t border-l border-(--hub-frame)" />
          <i className="pointer-events-none absolute top-0 right-0 z-3 size-10 border-t border-r border-(--hub-frame)" />
          <i className="pointer-events-none absolute bottom-0 left-0 z-3 size-10 border-b border-l border-(--hub-frame)" />
          <i className="pointer-events-none absolute right-0 bottom-0 z-3 size-10 border-r border-b border-(--hub-frame)" />
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
      className="relative flex min-h-151 min-w-80 flex-[0_1_468px] cursor-pointer appearance-none flex-col rounded-none border-0 bg-(--hub-feature) text-left text-(--hub-ink) [box-shadow:inset_0_0_0_1px_var(--hub-line-3)] transition-colors duration-160 ease-out [font:inherit] hover:bg-(--hub-feature-hover) focus-visible:z-2 focus-visible:outline-2 focus-visible:-outline-offset-5 focus-visible:outline-(--hub-focus) motion-reduce:transition-none max-[1179px]:min-h-0 max-[1179px]:min-w-0 max-[1179px]:flex-[1_1_100%]"
      onClick={onSelect}
      aria-haspopup="dialog"
    >
      <div className="flex min-h-0 flex-1 flex-col max-[1179px]:grid max-[1179px]:grid-cols-[96px_minmax(0,1fr)] max-[1179px]:grid-rows-[auto] max-[1179px]:items-start max-[1179px]:gap-6.5 max-[1179px]:px-6.5 max-[1179px]:pt-5.5 max-[1179px]:pb-6 max-[699px]:flex max-[699px]:p-0">
        <p className="px-7 pt-5.5 text-[13px] font-semibold tracking-[0.13em] text-(--hub-ink-2) max-[1179px]:z-1 max-[1179px]:col-start-2 max-[1179px]:row-start-1 max-[1179px]:p-0 max-[699px]:px-4 max-[699px]:pt-5">
          {project.status}
        </p>
        <Emblem
          projectId={project.id}
          className="mx-7 mt-7.5 mb-6.5 size-35 text-(--hub-emblem) filter-none max-[1179px]:row-start-1 max-[1179px]:m-0 max-[1179px]:size-24 max-[699px]:mx-4 max-[699px]:mt-4 max-[699px]:mb-3.5 max-[699px]:size-22 dark:invert"
        />
        <div className="px-7 max-[1179px]:col-start-2 max-[1179px]:row-start-1 max-[1179px]:px-0 max-[1179px]:pt-6.25 max-[699px]:px-4 max-[699px]:pt-0">
          <h2 className="font-instrumental m-0 text-[42px] leading-[1.04] font-normal text-(--hub-ink) max-[1179px]:text-4xl max-[1179px]:leading-[1.05] max-[699px]:text-3xl max-[699px]:leading-[1.08]">
            {project.name}
          </h2>
          <p className="max-w-100 py-3.5 pt-3.5 pb-6 text-[15px] leading-[1.6] text-(--hub-ink-2) max-[1179px]:max-w-130 max-[1179px]:p-0 max-[1179px]:pt-2.5 max-[699px]:pt-3 max-[699px]:pb-5.5 max-[699px]:leading-[1.55]">
            {project.menuDescription}
          </p>
        </div>
      </div>
      <span className="mt-auto flex min-h-16 items-center justify-center bg-(--hub-action) text-lg font-semibold tracking-[-0.01em] text-(--hub-action-ink) max-[1179px]:min-h-15 max-[1179px]:text-[17px]">
        Explore project
      </span>
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
      className="relative flex min-h-68 min-w-0 cursor-pointer appearance-none flex-col items-center rounded-none border-0 bg-(--hub-cell) text-center text-(--hub-ink) [box-shadow:inset_0_0_0_0.5px_var(--hub-line-2)] transition-colors duration-160 ease-out [font:inherit] hover:bg-(--hub-cell-hover) focus-visible:z-2 focus-visible:outline-2 focus-visible:-outline-offset-5 focus-visible:outline-(--hub-focus) motion-reduce:transition-none max-[699px]:grid max-[699px]:min-h-0 max-[699px]:grid-cols-[52px_minmax(0,1fr)] max-[699px]:grid-rows-[auto_auto_auto] max-[699px]:items-stretch max-[699px]:gap-x-3.5 max-[699px]:p-4 max-[699px]:text-left"
      onClick={onSelect}
      aria-haspopup="dialog"
    >
      <p className="w-full px-5 pt-4.5 text-right text-[13px] font-semibold tracking-[0.13em] text-(--hub-ink-3) max-[699px]:col-start-2 max-[699px]:row-start-1 max-[699px]:p-0 max-[699px]:text-left max-[699px]:text-xs">
        {project.status}
      </p>
      <Emblem
        projectId={project.id}
        className={`mt-3.5 size-21 text-(--hub-emblem) max-[1179px]:size-18 max-[699px]:col-start-1 max-[699px]:row-span-3 max-[699px]:row-start-1 max-[699px]:m-0 max-[699px]:size-13 dark:invert ${project.state === 'soon' ? 'opacity-[0.78]' : ''}`}
      />
      <div className="px-5 pt-4 pb-5 max-[699px]:col-start-2 max-[699px]:row-start-2 max-[699px]:p-0 max-[699px]:pt-1.25">
        <h2 className="m-0 text-[19px] font-semibold tracking-[-0.02em] max-[699px]:text-[17px]">
          {project.name}
        </h2>
        <p className="mt-2 max-w-65 text-sm leading-normal text-(--hub-ink-3) max-[699px]:mt-1 max-[699px]:max-w-none">
          {project.menuDescription}
        </p>
      </div>
      <span className="mt-auto flex min-h-13 w-full items-center justify-center border-t border-(--hub-line-2) text-[15px] font-semibold max-[699px]:col-start-2 max-[699px]:row-start-3 max-[699px]:mt-2.25 max-[699px]:block max-[699px]:min-h-0 max-[699px]:border-0 max-[699px]:text-sm">
        Explore project{' '}
        <span className="hidden max-[699px]:inline" aria-hidden="true">
          →
        </span>
      </span>
    </button>
  )
}

const ProjectDestination = ({ project }: { project: ResearchProject }) => {
  if (project.state === 'live') {
    return (
      <a
        href={project.href}
        className="relative inline-flex h-15.5 items-center gap-3.5 overflow-hidden rounded-none border border-[#1b1b18] bg-[linear-gradient(180deg,#5c5c58_0%,#4a4a46_52%,#3e3e3b_100%)] px-7.5 text-lg font-semibold tracking-[-0.01em] whitespace-nowrap text-[#f5f4f0] no-underline [box-shadow:inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-3px_0_rgba(0,0,0,0.34)] *:relative before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/tools-and-research/textures/wood.jpg')] before:bg-cover before:bg-center before:opacity-50 before:mix-blend-overlay before:content-[''] hover:bg-[linear-gradient(180deg,#6a6a65_0%,#565651_52%,#464642_100%)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#141412] active:translate-y-px active:[box-shadow:inset_0_3px_0_rgba(0,0,0,0.34),inset_0_-1px_0_rgba(255,255,255,0.06)] max-[699px]:max-w-full max-[699px]:px-5.5 max-[699px]:text-base"
        target="_blank"
      >
        <span>{project.button}</span>
        <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
      </a>
    )
  }

  if (project.state === 'pending') {
    return (
      <div
        className="relative inline-flex h-15.5 cursor-not-allowed items-center overflow-hidden rounded-none border border-[#333330] bg-[linear-gradient(180deg,#4c4c48,#444440)] px-7.5 text-lg font-semibold whitespace-nowrap text-[#d6d5d1] *:relative before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/tools-and-research/textures/wood.jpg')] before:bg-cover before:bg-center before:opacity-[0.28] before:mix-blend-overlay before:content-[''] max-[699px]:max-w-full max-[699px]:px-5.5 max-[699px]:text-base"
        aria-disabled="true"
      >
        <span>{project.button}</span>
      </div>
    )
  }

  return (
    <div
      className="relative inline-flex h-15.5 cursor-not-allowed items-center overflow-hidden rounded-none border border-[#96958f] bg-[linear-gradient(180deg,#cbcac4,#b5b4ae)] px-7.5 text-base font-semibold tracking-widest whitespace-nowrap text-[#2a2a26] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_0_rgba(10,10,10,0.12)] *:relative before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/tools-and-research/textures/stone.jpg')] before:bg-cover before:bg-center before:opacity-[0.42] before:mix-blend-multiply before:content-[''] max-[699px]:max-w-full max-[699px]:px-5.5"
      aria-disabled="true"
    >
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
    <ScrollDialog
      open={Boolean(project)}
      onOpenChange={onOpenChange}
      onCloseAutoFocus={onCloseAutoFocus}
      closeLabel={project ? `Close ${project.name}` : 'Close project'}
    >
      {project ? (
        <div className="mx-auto mb-10 flex w-[min(55rem,calc(100%-2rem))] flex-col [border-width:6.25rem_4rem_5.75rem] border-solid border-transparent font-mono filter-[drop-shadow(0_20px_44px_rgba(0,0,0,0.55))] [border-image:url('/tools-and-research/textures/privacy-scroll.png')_230_125_215_125_fill/6.25rem_4rem_5.75rem/0_stretch] max-[699px]:mb-6 max-[699px]:w-[calc(100%-1rem)] max-[699px]:[border-width:6.25rem_2.5rem_5.9375rem] max-[699px]:[border-image-width:6.25rem_2.5rem_5.9375rem] max-[479px]:[border-width:4rem_1.375rem_3.75rem] max-[479px]:[border-image-width:4rem_1.375rem_3.75rem]">
          <div className="relative flex min-h-0 flex-1 flex-col">
            {project.status ? (
              <div className="relative z-1 flex flex-none items-center justify-between gap-3.5 border-b border-[#b7b6af] px-5.5 py-3.5 max-[699px]:px-3.5 max-[699px]:py-3">
                <span className="min-w-0 overflow-hidden px-2.5 py-1.25 text-[13px] font-semibold tracking-[0.12em] text-ellipsis whitespace-nowrap text-[#3a3a36] [box-shadow:inset_0_0_0_1px_#a3a29c]">
                  {project.status}
                </span>
              </div>
            ) : null}

            <div className="relative z-1 min-h-0 flex-1 overflow-y-auto px-14 pt-9 pb-11 [scrollbar-color:#77766f_#d2d1ca] [scrollbar-width:thin] selection:bg-[#26261f] selection:text-[#edece6] max-[699px]:px-5 max-[699px]:pt-6 max-[699px]:pb-7.5 [&_*::selection]:bg-[#26261f] [&_*::selection]:text-[#edece6] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#d2d1ca] [&::-webkit-scrollbar-thumb]:bg-[#77766f] [&::-webkit-scrollbar-track]:bg-[#d2d1ca]">
              <div className="flex flex-wrap items-center gap-6 max-[699px]:gap-4.5">
                <Emblem
                  projectId={project.id}
                  className="size-19 shrink-0 filter-none max-[699px]:size-14"
                />
                <DialogTitle className="font-instrumental m-0 min-w-0 flex-[1_1_260px] text-[clamp(30px,3.4vw,42px)] leading-[1.04] font-normal text-pretty text-[#131311] max-[699px]:flex-[1_1_210px] max-[699px]:text-[28px]">
                  {project.name}
                </DialogTitle>
              </div>

              <div
                className="my-6 mt-7 h-px bg-[repeating-linear-gradient(90deg,#8a8982_0_4px,transparent_4px_10px)]"
                aria-hidden="true"
              />

              <DialogDescription className="m-0 text-[17px] leading-[1.55] font-semibold text-pretty text-[#141412]">
                {project.descriptor}
              </DialogDescription>
              <p className="mt-4.5 max-w-[72ch] text-base leading-7 font-normal text-pretty text-[#2b2b27]">
                {project.body}
              </p>

              {project.limit ? (
                <div className="mt-6.5 border-t border-[#b7b6af] pt-4.5">
                  <p className="text-[13px] font-semibold tracking-[0.12em] text-[#4a4a45]">
                    LIMIT
                  </p>
                  <p className="mt-2.25 text-[15px] leading-[1.65] text-[#2b2b27]">
                    {project.limit}
                  </p>
                </div>
              ) : null}

              <div className="mt-6.5 flex items-center gap-2.5 border-t border-[#b7b6af] pt-4.5 text-[15px] leading-[1.6] text-[#3a3a36]">
                <IconLogo
                  aria-hidden="true"
                  className="size-4.5 shrink-0 fill-[#3a3a36]! opacity-80"
                />
                <span>{project.signature}</span>
              </div>

              <div className="mt-7">
                <ProjectDestination project={project} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </ScrollDialog>
  )
}
