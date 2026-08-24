import { cn } from '@/lib/utils'

type FindingsBackgroundProps = {
  className?: string
  findingsCount?: number
  severityCount?: {
    critical: number
    high: number
    medium: number
    low: number
  }
}

type FindingsSvgProps = FindingsBackgroundProps & { compact: boolean }

type SeverityItemProps = {
  color: string
  count?: number
  label: string
  compact?: boolean
}

const SeverityItem = ({ color, count, label, compact }: SeverityItemProps) => (
  <div
    className={cn(
      'flex shrink-0 items-center gap-1.5 whitespace-nowrap',
      compact && 'text-lg'
    )}
  >
    <span
      aria-hidden="true"
      className="size-4 shrink-0"
      style={{ backgroundColor: color }}
    />
    <span>
      {count} {label}
    </span>
  </div>
)

const FindingsSvg = ({
  className,
  findingsCount,
  severityCount,
  compact,
}: FindingsSvgProps) => {
  const height = compact ? 457 : 403
  const legendBottom = compact ? 430.5 : 376.5
  const lowerGridStart = compact ? 431 : 377

  return (
    <svg
      width="562"
      height={height}
      viewBox={`0 0 562 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="217.5" y1="210" x2="217.5" y2="323" stroke="var(--border)" />
      <line
        x1="217.5"
        y1={lowerGridStart}
        x2="217.5"
        y2={height}
        stroke="var(--border)"
      />
      <line x1="343.5" y1="210" x2="343.5" y2="323" stroke="var(--border)" />
      <line
        x1="343.5"
        y1={lowerGridStart}
        x2="343.5"
        y2={height}
        stroke="var(--border)"
      />
      <line
        x1="217.5"
        y1="2.18557e-08"
        x2="217.5"
        y2="141"
        stroke="var(--border)"
      />
      <line
        x1="343.5"
        y1="2.18557e-08"
        x2="343.5"
        y2="141"
        stroke="var(--border)"
      />
      <path
        d="M255.723 251.676V199.567C255.723 194.957 249.379 193.702 247.624 197.965L199.887 307.322C198.053 311.775 203.926 315.318 207.01 311.619L254.747 254.371C255.378 253.615 255.723 252.661 255.723 251.676Z"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <path
        d="M355.61 150.863L268.231 242.257C265.608 245 260.98 243.144 260.98 239.349V78.8448C260.98 76.1104 263.37 74.399 265.679 74.6528C267.701 74.8751 269.129 76.675 270.725 77.9371L353.308 143.254C354.904 144.516 356.771 145.908 356.777 147.943C356.78 148.996 356.389 150.048 355.61 150.863Z"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <path
        d="M148.237 47.9426C149.732 45.5642 153.167 46.3343 155.897 46.9959L247.406 69.1709C250.136 69.8325 253.56 69.7485 255.068 72.1181C255.484 72.7703 255.724 73.5447 255.724 74.3752V185.633C255.724 187.778 254.224 189.332 252.436 189.743C249.884 190.328 247.975 187.749 246.423 185.641L151.365 56.5593C149.813 54.4513 147.362 52.4897 147.586 49.8815C147.645 49.1943 147.87 48.5258 148.237 47.9426Z"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <path
        d="M371.844 67.5816L365.884 138.553C365.483 140.888 363.386 142.217 361.342 142.037C359.258 141.853 357.773 140.002 356.124 138.715L300.822 95.5483C299.173 94.2607 297.226 92.8289 297.266 90.7368C297.301 88.9619 298.454 87.2552 300.391 86.7381L366.611 62.8031C369.576 62.0118 372.363 64.5574 371.844 67.5816Z"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <path
        d="M374.476 101.438L377.113 67.3407C377.478 65.2633 379.213 63.9562 381.061 63.8619C383.207 63.7524 384.961 65.459 386.806 66.5601L410.185 80.5144C412.03 81.6154 414.209 82.8378 414.38 84.9794C414.439 85.7111 414.305 86.4499 413.998 87.1145C413.007 89.261 410.335 89.9267 408.248 91.0394L382.961 104.526C380.874 105.639 378.411 106.996 376.404 105.745C375.026 104.886 374.158 103.25 374.476 101.438Z"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <rect x="91" y="141" width="379" height="121" fill="var(--popover)" />
      <text
        x="280"
        y="204"
        fill="var(--foreground)"
        className="font-instrumental text-7xl"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {findingsCount} findings
      </text>
      <line
        x1="32.5"
        y1="2.18557e-08"
        x2="32.5"
        y2={height}
        stroke="var(--border)"
      />
      <line
        x1="91.5"
        y1="2.18557e-08"
        x2="91.5"
        y2="323"
        stroke="var(--border)"
      />
      <line
        x1="91.5"
        y1={lowerGridStart}
        x2="91.5"
        y2={height}
        stroke="var(--border)"
      />
      <line
        x1="470.5"
        y1="2.18557e-08"
        x2="470.5"
        y2="323"
        stroke="var(--border)"
      />
      <line
        x1="470.5"
        y1={lowerGridStart}
        x2="470.5"
        y2={height}
        stroke="var(--border)"
      />
      <line
        x1="4.37114e-08"
        y1="31.5"
        x2="562"
        y2="31.5"
        stroke="var(--border)"
      />
      <line
        x1="4.37114e-08"
        y1="322.5"
        x2="562"
        y2="322.5"
        stroke="var(--border)"
      />
      <line
        x1="4.37114e-08"
        y1="140.5"
        x2="562"
        y2="140.5"
        stroke="var(--border)"
      />
      <line
        x1="4.37114e-08"
        y1="261.5"
        x2="562"
        y2="261.5"
        stroke="var(--border)"
      />
      <line
        x1="4.37114e-08"
        y1={legendBottom}
        x2="562"
        y2={legendBottom}
        stroke="var(--border)"
      />
      <line
        x1="530.5"
        y1="2.18557e-08"
        x2="530.5"
        y2={height}
        stroke="var(--border)"
      />

      {compact ? (
        <foreignObject x="48" y="322.5" width="466" height="108">
          <div className="text-foreground flex h-full flex-col items-center justify-center gap-4 font-mono text-base font-medium tabular-nums">
            <div className="flex items-center justify-center gap-3">
              <SeverityItem
                color="#650000"
                count={severityCount?.critical}
                label="Critical"
                compact
              />
              <SeverityItem
                color="#C00000"
                count={severityCount?.high}
                label="High"
                compact
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              <SeverityItem
                color="#FF9D00"
                count={severityCount?.medium}
                label="Medium"
                compact
              />
              <SeverityItem
                color="#FFDE21"
                count={severityCount?.low}
                label="Low"
                compact
              />
            </div>
          </div>
        </foreignObject>
      ) : (
        <foreignObject x="48" y="322.5" width="466" height="54">
          <div className="text-foreground flex h-full items-center justify-between font-mono text-base font-medium tabular-nums">
            <SeverityItem
              color="#650000"
              count={severityCount?.critical}
              label="Critical"
            />
            <SeverityItem
              color="#C00000"
              count={severityCount?.high}
              label="High"
            />
            <SeverityItem
              color="#FF9D00"
              count={severityCount?.medium}
              label="Medium"
            />
            <SeverityItem
              color="#FFDE21"
              count={severityCount?.low}
              label="Low"
            />
          </div>
        </foreignObject>
      )}
    </svg>
  )
}

export const FindingsBackground = (props: FindingsBackgroundProps) => (
  <>
    <FindingsSvg
      {...props}
      compact={false}
      className={`hidden ${props.className ?? ''} sm:block`}
    />
    <FindingsSvg
      {...props}
      compact
      className={`block ${props.className ?? ''} sm:hidden`}
    />
  </>
)
