const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const cloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET)

export async function uploadToCloudinary(file) {
  if (!cloudinaryConfigured) {
    throw new Error('cloudinary-not-configured')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('resource_type', 'auto')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error?.message || 'upload-failed')
  }

  const data = await res.json()
  return data.secure_url
}
