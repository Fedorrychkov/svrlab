'use strict'
const Amplifier = use('App/Models/Amplifier');
const Image = use('App/Models/Image');

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
    } = request.only(['name', 'short', 'customFields', 'mainPhoto', 'images', 'cost', 'inventory', 'isAvailable']);
    try {
      const amplifier = new Amplifier();
      amplifier.name = name;
      amplifier.short = short;
      amplifier.customFields = customFields;
      amplifier.mainPhoto = mainPhoto;
      amplifier.images = images;
      amplifier.cost = cost;
      amplifier.inventory = inventory;
      amplifier.isAvailable = isAvailable;

      await amplifier.save();
      if (mainPhoto !== null) {
        const image = await Image.find(mainPhoto);
        image.amplifier_id = amplifier.id;
        image.save()
      }

      response.ok(amplifier);
    } catch(err) {
      response.badRequest(err);
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
      id
    } = request.only(['id', 'name', 'short', 'customFields', 'mainPhoto', 'images', 'cost', 'inventory', 'isAvailable']);
    try {
      const amplifier = await Amplifier.find(id);
      amplifier.name = name;
      amplifier.short = short;
      amplifier.customFields = customFields;
      amplifier.mainPhoto = mainPhoto;
      amplifier.images = images;
      amplifier.cost = cost;
      amplifier.inventory = inventory;
      amplifier.isAvailable = isAvailable;

      await amplifier.save();
      if (mainPhoto !== null) {
        const image = await Image.find(mainPhoto);
        image.amplifier_id = amplifier.id;
        image.save()
      }

      response.ok(amplifier);
    } catch(err) {
      response.badRequest(err);
    }
  }

  async all ({response}) {
    let amplifiers = await Amplifier.all();
    amplifiers = amplifiers.toJSON();

    let list = [];

    await Promise.all(amplifiers.map(async (item) => {

      let images = [];

      await Promise.all(JSON.parse(item.images).map(async imgId => {
        const image = await Image.find(imgId);
        images.push(image);
      }));
      item.images = images;
      list.push(item);
    }));
    return list;
  }

  async get ({response, params}) {
    const { id } = params;
    let amplifier = await Amplifier.find(id);
    amplifier = amplifier.toJSON();

    let images = [];

    await Promise.all(JSON.parse(amplifier.images).map(async imgId => {
      const image = await Image.find(imgId);
      images.push(image);
    }));
    amplifier.images = images;
    return amplifier;
  }
}

module.exports = AmplifierController
