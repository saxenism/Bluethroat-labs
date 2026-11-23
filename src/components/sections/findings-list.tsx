'use client'

import { useState } from 'react'
import { ArrowUpRightIcon, MinusIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LockIcon } from '@/assets/icons'
import { FindingLogo } from './finding-logo'
import type {
  FindingSeverity,
  ProofOfWorkFinding,
} from '@/lib/sanity/proof-of-work'

const PREVIEW_COUNT = 4

const SEVERITY_STYLES: Record<FindingSeverity, string> = {
  critical: 'bg-[#650000]',
  high: 'bg-[#C00000]',
  medium: 'bg-[#FF9D00]',
  low: 'bg-[#FFDE21]',
}

export const FindingsList = ({
  findings,
}: {
  findings: ProofOfWorkFinding[]
}) => {
  const [openFindingId, setOpenFindingId] = useState<string | null>(
    findings[0]?._key ?? null
  )
  const [showAll, setShowAll] = useState(false)

  const visibleFindings = showAll ? findings : findings.slice(0, PREVIEW_COUNT)

  const toggleFinding = (findingId: string) => {
    setOpenFindingId((currentId) =>
      currentId === findingId ? null : findingId
    )
  }

  const toggleAllFindings = () => {
    if (
      showAll &&
      !findings
        .slice(0, PREVIEW_COUNT)
        .some((finding) => finding._key === openFindingId)
    ) {
      setOpenFindingId(findings[0]?._key ?? null)
    }

    setShowAll(!showAll)
  }

  return (
    <>
      <div className="border-border mb-12 border-t" role="list">
        {visibleFindings.map((finding) => (
          <FindingRow
            key={finding._key}
            finding={finding}
            isOpen={openFindingId === finding._key}
            onToggle={() => toggleFinding(finding._key)}
          />
        ))}
      </div>

      {findings.length > PREVIEW_COUNT && (
        <div className="border-border mb-18 grid h-18 grid-cols-3 border-y">
          <div aria-hidden="true" />
          <button
            type="button"
            aria-expanded={showAll}
            onClick={toggleAllFindings}
            className="border-border hover:bg-foreground hover:text-background focus-visible:outline-ring grid place-items-center border-x px-4 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 md:px-8 md:text-xl"
          >
            {showAll ? 'View less' : 'View all'}
          </button>
          <div aria-hidden="true" />
        </div>
      )}
    </>
  )
}

const FindingRow = ({
  finding,
  isOpen,
  onToggle,
}: {
  finding: ProofOfWorkFinding
  isOpen: boolean
  onToggle: () => void
}) => {
  const detailsId = `finding-details-${finding._key.toLowerCase()}`
  const titleId = `${detailsId}-title`
  const identityId = `${detailsId}-identity`
  const severityLabel = finding.severityLabel ?? finding.severity
  const ToggleIcon = isOpen ? MinusIcon : PlusIcon

  return (
    <article
      role="listitem"
      className={cn(
        'border-border relative grid grid-cols-[0.5rem_minmax(0,1fr)_4.5rem] border-b md:grid-cols-[1rem_7.5rem_minmax(0,1fr)_4.5rem]',
        isOpen && 'bg-[#f6f6f6] dark:bg-[#121212]'
      )}
    >
      <span
        aria-label={`${severityLabel} severity`}
        className={cn(
          'pointer-events-none absolute inset-y-0 left-0 z-1 w-2 md:w-4',
          SEVERITY_STYLES[finding.severity]
        )}
        role="img"
      />

      <h3 className="col-span-full grid grid-cols-subgrid">
        <button
          type="button"
          aria-controls={detailsId}
          aria-expanded={isOpen}
          aria-labelledby={titleId}
          aria-describedby={identityId}
          onClick={onToggle}
          className="hover:bg-muted focus-visible:outline-ring col-span-full grid w-full cursor-pointer grid-cols-subgrid text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 dark:hover:bg-[#191919]"
        >
          <span
            id={identityId}
            className="border-border col-start-2 row-start-1 min-w-0 md:border-r"
          >
            <span className="grid h-18 items-center px-4 md:place-items-center">
              <FindingIdentity finding={finding} />
            </span>
          </span>
          <span
            id={titleId}
            className="border-border text-foreground col-start-2 col-end-4 row-start-2 flex min-h-18 min-w-0 items-center border-t px-4 py-4 text-base leading-snug font-semibold md:col-start-3 md:row-start-1 md:border-t-0 md:px-6 md:text-lg"
          >
            {finding.title}
          </span>
          <span className="border-border col-start-3 row-start-1 border-l md:col-start-4">
            <span
              className={cn(
                'grid h-18 place-items-center',
                isOpen && 'border-border border-b'
              )}
            >
              <ToggleIcon
                aria-hidden="true"
                strokeWidth={3}
                className="size-6 text-[#8F8F8F]"
              />
            </span>
          </span>
        </button>
      </h3>

      <div
        id={detailsId}
        role="region"
        aria-labelledby={titleId}
        hidden={!isOpen}
        className="md:before:border-border md:after:border-border col-start-2 -col-end-1 grid grid-cols-subgrid md:before:border-r md:after:border-l"
      >
        {isOpen && <FindingDetails finding={finding} />}
      </div>
    </article>
  )
}

const FindingDetails = ({ finding }: { finding: ProofOfWorkFinding }) => (
  <div className="col-span-full min-w-0 px-4 pb-6 md:col-span-1 md:px-6 md:pb-8">
    <p className="text-base font-medium text-[#454545] dark:text-[#a9a9a9]">
      {finding.description}
    </p>

    <div className="mt-6 flex flex-wrap gap-2">
      {finding.tags.map((tag) => (
        <span
          key={tag}
          className="border-border border px-4 py-2 text-xs font-medium text-[#2E2E2E] dark:bg-[#191919] dark:text-[#7D7D7D]"
        >
          {tag}
        </span>
      ))}
    </div>

    {!!finding.url && (
      <Link
        href={finding.url}
        className="hover:text-foreground dark:hover:text-foreground mt-12 inline-flex items-center gap-1 text-base font-medium text-[#2E2E2E] underline underline-offset-2 transition-colors dark:text-[#8F8F8F]"
        target="_blank"
      >
        Read the analysis
        <ArrowUpRightIcon aria-hidden="true" className="size-4" />
      </Link>
    )}
  </div>
)

const FindingIdentity = ({ finding }: { finding: ProofOfWorkFinding }) => {
  if (finding.logo || finding.lightLogo) {
    return (
      <FindingLogo
        logo={finding.logo}
        lightLogo={finding.lightLogo}
        alt={finding.organization ?? 'Organization logo'}
        width={96}
        height={40}
        className="max-h-10 w-auto max-w-full object-contain"
      />
    )
  }

  if (finding.organization) {
    return (
      <span className="block max-w-full truncate text-sm font-semibold">
        {finding.organization}
      </span>
    )
  }

  return (
    <span
      role="img"
      aria-label="Confidential finding"
      className="grid h-auto w-22 md:place-items-center"
    >
      <LockIcon
        aria-hidden="true"
        className="size-8 text-[#2E2E2E] dark:text-[#7D7D7D]"
      />
    </span>
  )
}
