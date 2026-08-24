'use client'

import { useState } from 'react'
import { ArrowUpRightIcon, MinusIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LockIcon } from '@/assets/icons'
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
  const severityLabel = finding.severityLabel ?? finding.severity

  return (
    <article
      role="listitem"
      className={cn(
        'border-border grid grid-cols-[0.5rem_minmax(0,1fr)_4.5rem] border-b md:grid-cols-[1rem_7.5rem_minmax(0,1fr)_4.5rem]',
        isOpen && 'bg-[#f6f6f6] dark:bg-[#121212]'
      )}
    >
      <span
        aria-label={`${severityLabel} severity`}
        className={cn(
          'col-start-1 row-span-2 row-start-1 md:row-span-1',
          SEVERITY_STYLES[finding.severity]
        )}
        role="img"
      />

      <div className="h-18 min-w-0 md:col-start-2 md:row-start-1 md:h-full md:border-r">
        <div className="flex h-18 items-center px-4">
          <FindingIdentity finding={finding} />
        </div>
      </div>

      <div className="border-border col-start-2 col-end-4 row-start-2 min-w-0 border-t px-4 md:col-start-3 md:col-end-4 md:row-start-1 md:border-t-0 md:px-6">
        <h3
          id={`${detailsId}-title`}
          className="text-foreground flex min-h-18 items-center py-4 text-base leading-snug font-semibold md:text-lg"
        >
          {finding.title}
        </h3>

        {isOpen && <FindingDetails finding={finding} detailsId={detailsId} />}
      </div>

      <div className="border-border col-start-3 row-start-1 border-l md:col-start-4 md:h-full">
        <button
          type="button"
          aria-controls={detailsId}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${finding.title}`}
          onClick={onToggle}
          className={cn(
            'hover:bg-muted focus-visible:outline-ring grid size-full h-18 place-items-center transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2',
            isOpen && 'border-border border-b'
          )}
        >
          {isOpen ? (
            <MinusIcon
              aria-hidden="true"
              strokeWidth={3}
              className="size-6 text-[#8F8F8F]"
            />
          ) : (
            <PlusIcon
              aria-hidden="true"
              strokeWidth={3}
              className="size-6 text-[#8F8F8F]"
            />
          )}
        </button>
      </div>
    </article>
  )
}

const FindingDetails = ({
  finding,
  detailsId,
}: {
  finding: ProofOfWorkFinding
  detailsId: string
}) => (
  <div
    id={detailsId}
    role="region"
    aria-labelledby={`${detailsId}-title`}
    className="pb-6 md:pb-8"
  >
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
      >
        Read the analysis
        <ArrowUpRightIcon aria-hidden="true" className="size-4" />
      </Link>
    )}
  </div>
)

const FindingIdentity = ({ finding }: { finding: ProofOfWorkFinding }) => {
  if (finding.logo) {
    return (
      <Image
        src={finding.logo}
        alt={finding.organization ?? 'Organization logo'}
        width={96}
        height={40}
        unoptimized
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
