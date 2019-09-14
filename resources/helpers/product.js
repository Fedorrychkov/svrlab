export const getMainPhoto = (product) => {
  if (product.mainPhoto) {
    const mainPhoto = product.images.find(item => item.id === product.mainPhoto)
    return `/${mainPhoto.path}/${mainPhoto.large}`
  }
  return `/${product.images[0].path}/${product.images[0].large}`
}
