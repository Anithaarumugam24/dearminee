import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '@/config/cloudinary'

/**
 * Uploads a file (image or audio) to Cloudinary using an unsigned upload
 * preset, and returns its public URL. Storing a short URL instead of the
 * raw file means:
 *  - the share link stays small and reliable regardless of photo/music size
 *  - music actually plays for the recipient too, not just the creator
 */
export async function uploadToCloudinary(file) {
  if (CLOUDINARY_CLOUD_NAME === 'uaijeekd') {
    throw new Error('Cloudinary is not configured yet.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
    { method: 'POST', body: formData }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.error?.message || 'Upload failed')
  }

  const data = await res.json()
  return data.secure_url
}
