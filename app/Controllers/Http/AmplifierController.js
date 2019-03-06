'use strict'
const Amplifier = use('App/Models/Amplifier');

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
      response.ok(amplifier);
    } catch(err) {
      response.badRequest(err);
    }
  }

  async all ({response}) {
    const amplifiers = await Amplifier.all();
    return amplifiers.toJSON().reverse();
  }
}

module.exports = AmplifierController
