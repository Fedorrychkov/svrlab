'use strict'

const Helpers = use('Helpers')
const Image = use('App/Models/Image')

class ImageController {
  async all ({request, response}) {
    return await Image.all();
  }

  async upload ({request, response}) {

    const validationOptions = {
      types: ['image'],
      size: '2mb',
      extnames: ['png', 'jpg', 'jpeg']
    };

    const file = request.file('file', validationOptions);
    const files = request.file('files', validationOptions);

    if (files) {
      try {
        let filesPath = [];

        await files.moveAll(Helpers.resourcesPath('static/uploads'), (file) => {
          const name = `image-${new Date().getTime()}-${Math.random()}.${file._subtype}`;
          filesPath.push(name);
          return {
            name: name
          }
        });

        if (!files.movedAll()) {
          return files.errors()
        }

        // await filesPath.forEach(async (name) => {
        //   const image = new Image();
        //   image.path = 'uploads';
        //   image.large = image.preview = name;
        //   await image.save();
        // });

        response.ok({files: filesPath});
      } catch(err) {
        console.log(err);
        response.badRequest(err);
      }
    } else {
      try {
        let filePath = `image-${new Date().getTime()}-${Math.random()}.${file._subtype}`;
        await file.move(Helpers.resourcesPath('static/uploads'), {
          name: filePath
        });
        if (!file.moved()) {
          return file.error()
        }

        // const image = new Image();
        // image.path = 'uploads';
        // image.large = image.preview = filePath;
        // image.save();
        // const img2 = await Image.findBy('large', filePath);

        // TODO: Create images in BD when we create Product

        response.ok({files: [filePath]});
      } catch (err) {
        console.log(err);
        response.badRequest(err);
      }
    }
    // if (!file.moved()) {
      // response.badRequest({error: file.errors()});
      // return;
    // }
    // response.ok({success: 'Files upload'});
  }
}

module.exports = ImageController
