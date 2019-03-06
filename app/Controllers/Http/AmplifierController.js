'use strict'
const Amplifier = use('App/Models/Amplifier');

class AmplifierController {
  async create ({request, response}) {
    const data = request.only(['name', 'short', 'customFields', 'mainPhoto', 'images']);
    try {
      const amplifier = new Amplifier();
      amplifier.name = data.name;
      amplifier.short = data.short;
      amplifier.customFields = data.customFields;
      amplifier.mainPhoto = data.mainPhoto;
      amplifier.images = data.images;

      await amplifier.save();
      response.ok(amplifier);
    } catch(err) {
      response.badRequest(err);
    }
  }

  async all ({response}) {
    return await Amplifier.all();
  }
}

module.exports = AmplifierController
