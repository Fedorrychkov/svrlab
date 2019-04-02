'use strict'

/*
|--------------------------------------------------------------------------
| OrderStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/OrderStatus', async (faker, i, data) => {
  return {
    id: data.id,
    name: data.name,
    // type: data.type
  }
})

class OrderStatusSeeder {
  async run () {
    const statuses = [
      {
        id: 1,
        name: 'CREATED',
        title: 'Создан',
      },
      {
        id: 2,
        name: 'PAYED',
        title: 'Оплачен',
      },
      {
        id: 3,
        name: 'CANCELED',
        title: 'Закрыт',
      },
      {
        id: 4,
        name: 'RESOLVED',
        title: 'Завершён',
      },
      {
        id: 5,
        name: 'REJECTED',
        title: 'Отменён',
      },
      {
        id: 6,
        name: 'SENDED',
        title: 'Отправлен',
      },
      {
        id: 7,
        name: 'PROGRESS',
        title: 'Обрабатывается',
      },
    ];
    await Promise.all(statuses.map(async (item) => {
      const status = await Factory
        .model('App/Models/OrderStatus')
        .create({ ...item});
    }));

  }
}

module.exports = OrderStatusSeeder
