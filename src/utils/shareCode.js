import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

/**
 * The app has no backend, so a shared link can't rely on the receiver's
 * device having the same localStorage as the creator's. Instead, we pack
 * the surprise's data into the link itself (compressed + URL-safe), so
 * any device that opens the link can render it directly.
 *
 * Music is deliberately excluded here — audio files are too large to fit
 * in a URL, so a song stays local to the device that created the surprise.
 *
 * Photos CAN make the link very long. Extremely long links risk being
 * silently cut short by clipboard managers, messaging apps, or browsers,
 * which then fails to decode for the recipient. To guarantee the link
 * always works, we cap the encoded size and drop the last photo(s) if
 * needed until it fits.
 */
const SAFE_LINK_CHARS = 55000

export function encodeSurpriseForLink(surprise) {
  const { musicSrc, musicName, ...shareable } = surprise
  let photos = shareable.photos || []
  let trimmed = false

  while (true) {
    const json = JSON.stringify({ ...shareable, photos })
    const code = compressToEncodedURIComponent(json)
    if (code.length <= SAFE_LINK_CHARS || photos.length === 0) {
      return { code, trimmed, includedPhotos: photos.length, totalPhotos: (shareable.photos || []).length }
    }
    photos = photos.slice(0, -1)
    trimmed = true
  }
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
