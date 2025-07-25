import { type Ref } from 'vue'

export const useImagePreloader = async (
  imageUrls: string[],
  isLoading: Ref<boolean, boolean>,
  isError: Ref<string | null, string | null>,
): Promise<Map<string, HTMLImageElement>> => {
  const loadedImages: Map<string, HTMLImageElement> = new Map()
  isLoading.value = true
  isError.value = null

  const promises = imageUrls.map((url) => {
    return new Promise<{ url: string; img: HTMLImageElement }>((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = () => resolve({ url: url, img: img })
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    })
  })

  try {
    const loaded = await Promise.all(promises)
    loaded.forEach((item) => {
      loadedImages.set(item.url, item.img)
    })
  } catch (error) {
    // console.error('An error occurred during image preloading:', error)
    isError.value = `An error occurred during image preloading: ${error}`
  } finally {
    isLoading.value = false
    return loadedImages
  }
}
