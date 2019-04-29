'use strict'
const Product = use('App/Models/Product')
const Image = use('App/Models/Image')

class AmplifierController {
  async create ({request, response}) {
    const {
      isAvailable = true,
      inventory = 0,
      cost = 0,
      images,
      mainPhoto,
      customFields,
      short,
      name,
      type,
      imageIDs
    } = request.only(['name', 'short', 'customFields', 'mainPhoto', 'images', 'cost', 'inventory', 'isAvailable', 'imageIDs', 'type'])
    try {
      const amplifier = new Product()
      amplifier.name = name
      amplifier.short = short
      amplifier.type = type
      amplifier.customFields = customFields
      amplifier.mainPhoto = mainPhoto
      amplifier.images = images
      amplifier.cost = cost
      amplifier.inventory = inventory
      amplifier.isAvailable = isAvailable

      await amplifier.save()
      if (mainPhoto !== null) {
        const image = await Image.find(mainPhoto)
        image.product_id = amplifier.id
        image.save()
      }

      if (imageIDs.length) {
        await Promise.all(imageIDs.map(async imgId => {
          const image = await Image.find(imgId)
          image.product_id = amplifier.id
          image.save()
        }))
      }

      response.ok(amplifier)
    } catch (err) {
      response.badRequest(err)
    }
  }

  async update ({request, response}) {
    const {
      isAvailable = true,
      inventory = 0,
      cost = 0,
      images,
      mainPhoto,
      customFields,
      short,
      name,
      type,
      id
    } = request.only(['id', 'name', 'short', 'customFields', 'mainPhoto', 'images', 'cost', 'inventory', 'isAvailable', 'type'])
    try {
      const amplifier = await Product.find(id)
      amplifier.name = name
      amplifier.short = short
      amplifier.type = type
      amplifier.customFields = customFields
      amplifier.mainPhoto = mainPhoto
      amplifier.images = images
      amplifier.cost = cost
      amplifier.inventory = inventory
      amplifier.isAvailable = isAvailable

      await amplifier.save()
      if (mainPhoto !== null) {
        const image = await Image.find(mainPhoto)
        image.product_id = amplifier.id
        image.save()
      }

      response.ok(amplifier)
    } catch (err) {
      response.badRequest(err)
    }
  }

  async all ({response}) {
    let amplifiers = await Product.all()
    amplifiers = amplifiers.toJSON()

    let list = []

    await Promise.all(amplifiers.map(async (item) => {

      let images = []

      await Promise.all(JSON.parse(item.images).map(async imgId => {
        const image = await Image.find(imgId)
        image && images.push(image)
      }))
      item.images = images
      list.push(item)
    }))
    return list
  }

  async get ({response, params}) {
    const { id } = params
    let amplifier = await Product.find(id)
    amplifier = amplifier.toJSON()

    let images = []

    await Promise.all(JSON.parse(amplifier.images).map(async imgId => {
      const image = await Image.find(imgId)
      image && images.push(image)
    }))
    amplifier.images = images
    return amplifier
  }
}

module.exports = AmplifierController
