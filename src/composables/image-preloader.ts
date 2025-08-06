export interface ImageInfo {
  url: string
  width: number
  height: number
}

export const useImagePreloader = async (imageUrls: string[]): Promise<ImageInfo[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<ImageInfo>((resolve, reject) => {
      const img = new Image()
      img.src = url
      img.onload = () =>
        resolve({
          url: url,
          width: img.naturalWidth,
          height: img.naturalHeight,
        })
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    })
  })

  return Promise.all(promises)
}
