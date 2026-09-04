import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

const MAX_INLINE_MUSIC_CHARS = 2000 // short hosted URLs pass; base64 data URLs don't
const SAFE_LINK_CHARS = 55000

export function encodeSurpriseForLink(surprise) {
  const { musicSrc, musicName, ...rest } = surprise
  const shareable =
    musicSrc && musicSrc.length <= MAX_INLINE_MUSIC_CHARS ? { ...rest, musicSrc, musicName } : rest

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
