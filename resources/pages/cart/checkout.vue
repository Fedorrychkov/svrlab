<template>
  <div class="checkout">
    <v-app dark>
      <v-alert type="error" style="width: 100%" v-model="nullInventory" dismissible>
        В вашей корзине есть товар(ы) доступные ТОЛЬКО под заказ
      </v-alert>
      <page-section>
        <template slot="title">
          <h4 class="title">{{products.length > 0 ? 'Оформление заказа' : 'Корзина пуста'}}</h4>
        </template>
        <template slot="content">
          <no-ssr>
            <amplifier-shopping-item v-for="item in products" :key="item.id" :item="item" @submit.prevent="create" />
          </no-ssr>
          <div class="checkout__content">
            <v-layout wrap justify-space-between>
              <v-flex xs12 md7>
                <div class="checkout__data">
                  <h5>Доставка</h5>
                  <v-form v-model="valid" @submit="create" ref="form" lazy-validation>
                    <v-layout wrap justify-space-between>
                      <v-flex xs12>
                        <v-text-field
                          v-model="checkout.name.value"
                          :rules="rules.required"
                          label="Ваше полное имя"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="checkout.country.value"
                          :rules="rules.required"
                          label="Страна"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md5>
                        <v-text-field
                          v-model="checkout.zip.value"
                          :rules="rules.required"
                          label="Почтовый индекс"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md5>
                        <v-text-field
                          v-model="checkout.city.value"
                          :rules="rules.required"
                          label="Город"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="checkout.address.value"
                          :rules="rules.required"
                          label="Улица, дом, корпус, квартира"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="checkout.phone.value"
                          :rules="rules.required"
                          label="Контактный телефон"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          v-model="checkout.email.value"
                          :rules="rules.required"
                          label="Адрес электронной почты"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          v-model="checkout.short.value"
                          :rules="checkout.short.rules"
                          :counter="1000"
                          auto-grow
                          required
                          label="Комментарий к заказу"
                          rows="1"
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    <div class="checkout__controlls">
                      <v-layout>
                        <v-flex xs12>
                          <button class="button v-btn" type="submit" @click.prevent="create" :disabled="!valid">
                            Оформить
                          </button>
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-form>
                </div>
              </v-flex>
              <v-flex xs12 md4>
                <div class="checkout__total">
                  <div class="checkout__row field">
                    <div class="key"><h6>Товары</h6></div>
                    <div class="value white-space-nowrap"><p>{{total | numFormat}} <i class="symbol rouble"> ₽</i></p></div>
                  </div>
                  <div class="checkout__row field">
                    <div class="key"><p>Скидка</p></div>
                    <div class="value white-space-nowrap"><p>0 <i class="symbol rouble"> ₽</i></p></div>
                  </div>
                  <div class="checkout__row field">
                    <div class="key"><p>Доставка</p></div>
                    <div class="value white-space-nowrap"><p>0 <i class="symbol rouble"> ₽</i></p></div>
                  </div>
                  <div class="checkout__row field end">
                    <div class="key"><h5>Итого</h5></div>
                    <div class="value white-space-nowrap"><p>0 <i class="symbol rouble"> ₽</i></p></div>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </div>
        </template>
      </page-section>
    </v-app>
  </div>
</template>
<script>
import PageSection from '@/components/shared/PageSection';
import AmplifierShoppingItem from '@/components/core/amplifiers/AmplifierShoppingItem';
import { GET_BASKET, SET_CHECKOUT } from '@/store/actions/cart.js';
export default {
  data() {
    return {
      nullInventory: false,
      valid: true,
      rules: {
        required:[
          v => !!v || 'Поле является обязательным',
        ],
      },
      checkout: {
        name: {
          value: '',
          rules: [
            v => v.length > 3 || 'Должно быть не меньше 2-х символов'
          ],
        },
        country: {
          value: '',
        },
        zip: {
          value: '',
        },
        city: {
          value: '',
        },
        address: {
          value: '',
        },
        phone: {
          value: '',
        },
        email: {
          value: '',
        },
        short: {
          value: '',
          rules: [
            v => v.length < 1000 || 'Количество символов не должно превышать 1000'
          ],
        },
      }
    }
  },
  components: {
    PageSection,
    AmplifierShoppingItem
  },
  computed: {
    basketCount() {
      return this.$store.getters[`modules/cart/basketCount`];
    },
    products() {
      const products = this.$store.getters[`modules/cart/cartProducts`];
      if (!products.length) {
        this.$router.push('/');
      }
      return products;
    },
    nullableInventory() {
      return this.$store.getters[`modules/cart/cartInventoryNull`];
    },
    total() {
      return this.$store.getters[`modules/cart/cartTotalPrice`];
    }
  },
  created() {
    this.nullInventory = this.nullableInventory;
    this.checkout.country.value = 'Россия';
    this.$store.dispatch(`modules/cart/${GET_BASKET}`);
  },
  methods: {
    create() {
      const valid = this.$refs.form.validate();
      if (!valid) return;
      this.valid = false;
      const payload = {
        name: this.checkout.name.value,
        country: this.checkout.country.value,
        zip: this.checkout.zip.value,
        city: this.checkout.city.value,
        address: this.checkout.address.value,
        phone: this.checkout.phone.value,
        email: this.checkout.email.value,
        short: this.checkout.short.value,
        deliver: 0,
        total: this.total,
        discount: 0,
        basket: this.products
      };
      console.log(payload);
      this.$store.dispatch(`modules/cart/${SET_CHECKOUT}`, payload).then(res => console.log(res));
      // const status = this.edit ? UPDATE_AMPLIFIER : ADD_AMPLIFIER;
      // this.$store.dispatch(`modules/amplifier/${status}`, product)
      //   .then(res => {
      //     if (res.status === 200) {
      //       this.$router.push(`/admin/amplifiers`);
      //     }
      //   }).finally(() => {
      //     this.valid = true;
      //   });
    }
  }
}
</script>
<style lang="scss">
i {
  font-style: normal;
}
.checkout {
  color: var(--second-color);

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;

  }

  &__controlls {
    margin: 20px 0 0;
  }

  &__data, &__total {
    background-color: var(--primary-color);
    padding: 25px;
    border-radius: 4px;
    margin: 40px 0 0;
  }

  .field {
    align-items: flex-start;
    margin: 6px 0;

    .value {
      padding-left: 15px;
    }
  }

  .end {
    border-top: 1px solid rgba(255, 255, 255, .1);
    padding: 12px 0 0;
    margin: 12px 0 6px;
  }
}
</style>

