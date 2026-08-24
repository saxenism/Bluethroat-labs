export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low'

export interface ProofOfWorkStats {
  totalFindings: number
  criticalFindings: number
  highFindings: number
  mediumFindings: number
  lowFindings: number
}

export interface FeaturedFinding {
  _key: string
  logo: string | null
  lightLogo: string | null
  name: string
  title: string
  severity: FindingSeverity
  description: string
  link: string
}

export interface ProofOfWorkFinding {
  _key: string
  severity: FindingSeverity
  severityLabel: string | null
  organization: string | null
  logo: string | null
  lightLogo: string | null
  title: string
  description: string
  tags: string[]
  url: string | null
}

export interface ProofOfWorkData {
  title: string
  description: string
  severityNote: string
  confidentialityNote: string
  stats: ProofOfWorkStats
  featuredFindings: FeaturedFinding[]
  findings: ProofOfWorkFinding[]
}

export const PROOF_OF_WORK_QUERY = `*[_type == "proofOfWork"][0] {
  title,
  description,
  severityNote,
  confidentialityNote,
  stats {
    totalFindings,
    criticalFindings,
    highFindings,
    mediumFindings,
    lowFindings
  },
  "featuredFindings": coalesce(featuredFindings[] {
    _key,
    name,
    title,
    severity,
    description,
    link,
    "logo": logo.asset->url,
    "lightLogo": lightLogo.asset->url
  }, []),
  "findings": coalesce(findings[] {
    _key,
    severity,
    severityLabel,
    organization,
    "logo": logo.asset->url,
    "lightLogo": lightLogo.asset->url,
    title,
    description,
    "tags": coalesce(tags, []),
    url
  }, [])
}`
