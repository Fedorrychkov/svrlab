'use strict'
const Product = use('App/Models/Product')
const Image = use('App/Models/Image')
const Database = use('Database')

class MusicController {
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
      const music = new Product()
      music.name = name
      music.short = short
      music.type = type
      music.customFields = customFields
      music.mainPhoto = mainPhoto
      music.images = images
      music.cost = cost
      music.inventory = inventory
      music.isAvailable = isAvailable

      await music.save()
      if (mainPhoto !== null) {
        const image = await Image.find(mainPhoto)
        image.product_id = music.id
        image.save()
      }

      if (imageIDs.length) {
        await Promise.all(imageIDs.map(async imgId => {
          const image = await Image.find(imgId)
          image.product_id = music.id
          image.save()
        }))
      }

      response.ok(music)
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
      const music = await Product.find(id)
      music.name = name
      music.short = short
      music.type = type
      music.customFields = customFields
      music.mainPhoto = mainPhoto
      music.images = images
      music.cost = cost
      music.inventory = inventory
      music.isAvailable = isAvailable

      await music.save()
      if (mainPhoto !== null) {
        const image = await Image.find(mainPhoto)
        image.product_id = music.id
        image.save()
      }

      response.ok(music)
    } catch (err) {
      response.badRequest(err)
    }
  }

  async all ({response}) {
    let musics = await Database
        .from('products')
        .where({type: 'MUSIC'})
        .orderBy('updated_at', 'desc')

    let list = []

    await Promise.all(musics.map(async (item) => {

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
    let music = await Product.find(id)
    music = music.toJSON()

    let images = []

    await Promise.all(JSON.parse(music.images).map(async imgId => {
      const image = await Image.find(imgId)
      image && images.push(image)
    }))
    music.images = images
    return music
  }
}

module.exports = MusicController
