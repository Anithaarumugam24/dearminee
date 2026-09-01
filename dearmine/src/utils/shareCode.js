import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

/**
 * The app has no backend, so a shared link can't rely on the receiver's
 * device having the same localStorage as the creator's. Instead, we pack
 * the surprise's data into the link itself (compressed + URL-safe), so
 * any device that opens the link can render it directly.
 *
 * Music is deliberately excluded here — audio files are too large to fit
 * in a URL, so a song stays local to the device that created the surprise.
 */
export function encodeSurpriseForLink(surprise) {
  const { musicSrc, musicName, ...shareable } = surprise
  const json = JSON.stringify(shareable)
  return compressToEncodedURIComponent(json)
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
