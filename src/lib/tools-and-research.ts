export const projectIds = [
  'tee-handbook',
  'blueskills',
  'bluemask',
  'bluepaper',
  'blueexif',
  'bluegate',
] as const

export type ProjectId = (typeof projectIds)[number]
export type ProjectState = 'live' | 'pending' | 'soon'

export type ResearchProject = {
  id: ProjectId
  name: string
  status: string
  descriptor: string
  body: string
  limit: string
  signature: string
  button: string
  href: string
  menuDescription: string
  state: ProjectState
  showDetails?: boolean
  rationale?: string
  showPersonalUseFaq?: boolean
}

export const projects: Record<ProjectId, ResearchProject> = {
  'tee-handbook': {
    id: 'tee-handbook',
    name: 'TEE Security Handbook',
    status: 'PUBLIC RESEARCH PROJECT',
    descriptor:
      'A free, public security handbook for teams building with trusted execution environments.',
    body: 'Explore how TEEs fail in practice, the assumptions behind attestation, and the engineering choices that shape the security of TEE-based Web3 systems. The handbook brings together practical research, failure modes, and guidance for developers and security researchers.',
    limit: '',
    signature: 'A public research project by Bluethroat Labs.',
    button: 'Open book',
    href: 'https://tee-security-handbook.bluethroatlabs.com',
    menuDescription: 'Understand how trusted execution environments fail.',
    state: 'live',
    showDetails: true,
  },
  blueskills: {
    id: 'blueskills',
    name: 'BlueSkills',
    status: '',
    descriptor:
      'Assess an AI agent skill before giving it access to your environment.',
    body: 'Inspect a skill for suspicious instructions and risky behavior before installing it. Use the assessment to understand identified risks and what remains uncertain.',
    limit:
      'An assessment does not guarantee that a skill is safe in every environment.',
    signature: 'A public project by Bluethroat Labs.',
    button: 'Open BlueSkills',
    href: 'https://blueskills.bluethroatlabs.com',
    menuDescription: 'Inspect an agent skill before granting access.',
    rationale:
      "A viral post on X recommending SKILL.md caught your eye. There's so much text and scripts you're not sure how it works. What if it hides a prompt injection or a drainer?",
    showPersonalUseFaq: true,
    state: 'live',
  },
  bluemask: {
    id: 'bluemask',
    name: 'BlueMask',
    status: '',
    descriptor: 'Redact sensitive parts of an image before sharing it.',
    body: 'Use secure masking to replace covered pixels in the exported image. Cosmetic blur is available for appearance. An offline workflow lets you disconnect before importing a sensitive image.',
    limit:
      'Cosmetic blur is not secure redaction. Uncovered content and mask geometry remain visible.',
    signature: 'A public project by Bluethroat Labs.',
    button: 'Open BlueMask',
    href: 'https://bluemask.bluethroatlabs.com',
    menuDescription: 'Redact sensitive image content before sharing.',
    rationale:
      "How do you hide something from a photo in a unrecoverable way? Are you sure that a service or an app you're using doesn't save the original content to its servers?",
    state: 'live',
  },
  bluepaper: {
    id: 'bluepaper',
    name: 'BluePaper',
    status: '',
    descriptor:
      'A project for viewing untrusted PDFs through isolated rendering.',
    body: 'BluePaper is being developed to help people inspect documents from unfamiliar senders through an isolated rendering workflow.',
    limit:
      "Rendering isolation does not establish that a document's content, links, or sender can be trusted.",
    signature: 'A public project by Bluethroat Labs.',
    button: 'Open BluePaper',
    href: 'https://bluepaper.bluethroatlabs.com',
    menuDescription: 'View untrusted PDFs through isolated rendering.',
    rationale:
      'Documents you open is a huge attack vector. You must not trust anything coming from strangers. We found a way to securely open such files.',
    showPersonalUseFaq: true,
    state: 'live',
  },
  blueexif: {
    id: 'blueexif',
    name: 'BlueExif',
    status: '',
    descriptor: 'View and edit metadata locally in supported file formats.',
    body: 'BlueExif is a local metadata viewer and editor for supported photos, audio, video, and documents. Inspect, edit, or remove metadata without uploading your files.',
    limit:
      'Metadata viewing, editing, and removal vary by file format. Camera RAW files are read-only.',
    signature: 'A public project by Bluethroat Labs.',
    button: 'Open BlueExif',
    href: 'https://blueexif.bluethroatlabs.com/',
    menuDescription: 'View and edit metadata locally in supported files.',
    rationale:
      "Posting images or sending files? Hidden metadata can reveal a lot about you. That's why we built an offline metadata eraser.",
    state: 'live',
  },
  bluegate: {
    id: 'bluegate',
    name: 'BlueGate',
    status: 'COMING SOON',
    descriptor:
      'Assess an unfamiliar GitHub repository before running its code.',
    body: 'BlueGate is being developed to help people inspect unfamiliar repositories for suspicious behavior and understand the risks of running them.',
    limit: 'An assessment is not a guarantee that code is safe.',
    signature: 'A public project by Bluethroat Labs.',
    button: '', // 'Open BlueGate'
    href: '',
    menuDescription: 'Assess unfamiliar code before running it.',
    rationale:
      'Fake interviews became common. What if the interviewer asks you to clone the repo? Are you safe?',
    state: 'soon',
  },
}

export function isProjectId(value: string | null): value is ProjectId {
  return value !== null && projectIds.includes(value as ProjectId)
}
