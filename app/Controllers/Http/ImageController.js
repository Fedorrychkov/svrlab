'use strict'

const Helpers = use('Helpers')
const Image = use('App/Models/Image')
const Drive = use('Drive')

class ImageController {
  async all ({request, response}) {
    return await Image.all()
  }

  async delete ({request, response, params}) {
    const { id } = params
    try {
      const image = await Image.find(id)
      image.delete()
      await Drive.delete(`${Helpers.resourcesPath('static/uploads/img')}/${image.large}`)
      response.ok('success')
    } catch(err) {
      response.badRequest(err)
    }
  }

  async upload ({request, response}) {

    const validationOptions = {
      types: ['image'],
      size: '2mb',
      extnames: ['png', 'jpg', 'jpeg']
    }

    const file = request.file('file', validationOptions)
    const files = request.file('files', validationOptions)

    if (files) {
      try {
        let filesPath = []

        await files.moveAll(Helpers.resourcesPath('static/uploads/img'), (file) => {
          const name = `image-${new Date().getTime()}-${Math.random()}.${file._subtype}`
          filesPath.push(name)
          return {
            name: name
          }
        })

        if (!files.movedAll()) {
          return files.errors()
        }

        let images = []
        await Promise.all(filesPath.map(async (name) => {
          const image = new Image()
          image.path = 'uploads/img'
          image.large = image.preview = name
          await image.save()
          images.push(image)
        }))

        response.ok({files: images})
      } catch(err) {
        response.badRequest(err)
      }
    } else {
      try {
        let filePath = `image-${new Date().getTime()}-${Math.random()}.${file._subtype}`
        await file.move(Helpers.resourcesPath('static/uploads/img'), {
          name: filePath
        })
        if (!file.moved()) {
          return file.error()
        }

        const image = new Image()
        image.path = 'uploads/img'
        image.large = image.preview = filePath
        await image.save()

        response.ok({files: [image]})
      } catch (err) {
        response.badRequest(err)
      }
    }
  }
}

module.exports = ImageController
