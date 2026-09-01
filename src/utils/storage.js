const INDEX_KEY = 'dearmine:index'
const SURPRISE_PREFIX = 'dearmine:surprise:'
const DRAFT_KEY = 'dearmine:draft'

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

/** Returns the list of slugs created on this device, most recent first. */
export function listSurpriseSlugs() {
  return safeParse(localStorage.getItem(INDEX_KEY), [])
}

export function getSurprise(slug) {
  return safeParse(localStorage.getItem(SURPRISE_PREFIX + slug), null)
}

export function saveSurprise(slug, data) {
  const payload = { ...data, slug, createdAt: data.createdAt || Date.now() }
  localStorage.setItem(SURPRISE_PREFIX + slug, JSON.stringify(payload))
  const index = listSurpriseSlugs().filter((s) => s !== slug)
  index.unshift(slug)
  localStorage.setItem(INDEX_KEY, JSON.stringify(index))
  return payload
}

export function deleteSurprise(slug) {
  localStorage.removeItem(SURPRISE_PREFIX + slug)
  const index = listSurpriseSlugs().filter((s) => s !== slug)
  localStorage.setItem(INDEX_KEY, JSON.stringify(index))
}

/** Draft = the in-progress form, kept separately so a refresh doesn't lose it. */
export function saveDraft(data) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(data))
}

export function getDraft() {
  return safeParse(localStorage.getItem(DRAFT_KEY), null)
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY)
}
