import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

/**
 * The app has no traditional backend, so a shared link can't rely on the
 * receiver's device having the same localStorage as the creator's.
 * Instead, we pack the surprise's data into the link itself (compressed +
 * URL-safe), so any device that opens the link can render it directly.
 *
 * Photos and music are stored as Cloudinary URLs rather than raw files,
 * so the whole payload stays small (a few hundred characters) regardless
 * of how many photos or how long the song is — and music now plays for
 * the recipient too, since it's a real hosted URL rather than a local
 * file that only existed on the creator's device.
 */
export function encodeSurpriseForLink(surprise) {
  const json = JSON.stringify(surprise)
  const code = compressToEncodedURIComponent(json)
  const totalPhotos = (surprise.photos || []).length
  return { code, trimmed: false, includedPhotos: totalPhotos, totalPhotos }
}

export function decodeSurpriseFromLink(code) {
  try {
    const json = decompressFromEncodedURIComponent(code)
    if (!json) return null
    return JSON.parse(json)
  } catch {
    return null
  }
}
