const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

/** Generates a short, human-shareable code like "7K2P". */
export function generateCode(length = 4) {
  let out = ''
  for (let i = 0; i < length; i++) {
    out += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return out
}

/** Builds the public slug, e.g. "dearmine-7K2P". */
export function generateSlug() {
  return `dearmine-${generateCode(4)}`
}
