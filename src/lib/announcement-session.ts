export const ANNOUNCEMENT_DISMISSED_KEY = 'bluethroat:announcements:dismissed'

// Apply the saved state before the strip is painted or hydrated.
export const ANNOUNCEMENT_SESSION_SCRIPT = `try {
  if (sessionStorage.getItem(${JSON.stringify(ANNOUNCEMENT_DISMISSED_KEY)}) === 'true') {
    document.documentElement.setAttribute('data-announcements-dismissed', 'true');
  }
} catch {}`
