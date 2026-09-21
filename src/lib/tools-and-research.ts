export const projectIds = [
  'tee-handbook',
  'blueskills',
  'bluemask',
  'bluepaper',
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
    state: 'live',
  },
  bluemask: {
    id: 'bluemask',
    name: 'BlueMask',
    status: 'COMING SOON', // 'PROTOTYPE',
    descriptor: 'Redact sensitive parts of an image before sharing it.',
    body: 'Use secure masking to replace covered pixels in the exported image. Cosmetic blur is available for appearance. An offline workflow lets you disconnect before importing a sensitive image.',
    limit:
      'Cosmetic blur is not secure redaction. Uncovered content and mask geometry remain visible.',
    signature: 'A public project by Bluethroat Labs.',
    button: '', // 'Open BlueMask',
    href: '',
    menuDescription: 'Redact sensitive image content before sharing.',
    state: 'soon', // 'pending',
  },
  bluepaper: {
    id: 'bluepaper',
    name: 'BluePaper',
    status: 'COMING SOON',
    descriptor:
      'A project for viewing untrusted PDFs through isolated rendering.',
    body: 'BluePaper is being developed to help people inspect documents from unfamiliar senders through an isolated rendering workflow.',
    limit:
      "Rendering isolation does not establish that a document's content, links, or sender can be trusted.",
    signature: 'A public project by Bluethroat Labs.',
    button: '', // 'Open BluePaper'
    href: '',
    menuDescription: 'View untrusted PDFs through isolated rendering.',
    state: 'soon',
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
    state: 'soon',
  },
}

export function isProjectId(value: string | null): value is ProjectId {
  return value !== null && projectIds.includes(value as ProjectId)
}
