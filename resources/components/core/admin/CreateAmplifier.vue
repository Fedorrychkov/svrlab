<template>
  <section class="product-page amplifier">
    <div class="product-page__container amplifier__container">
      <v-form v-model="valid">
        <v-layout>
          <v-flex xs12>
            <v-text-field
              v-model="product.title.value"
              :rules="product.title.rules"
              :counter="90"
              label="Название"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-textarea
              v-model="product.short.value"
              :rules="product.short.rules"
              :counter="300"
              auto-grow
              required
              label="Короткое описание"
              rows="1"
            ></v-textarea>
          </v-flex>
        </v-layout>

        <div class="amplifier__layout-wrap">
          <div class="amplifier__props">
            <h5 class="title">Характеристики</h5>
            <p class="no-content" v-if="customFields.length === 0">У товара  пока нет характеристик</p>
          </div>
          <v-flex xs12 md6 v-for="item in customFields" :key="item.id" class="item">
            <v-text-field
              v-model="item.fieldValue"
              :rules="requiredRule"
              :counter="300"
              :label="item.fieldName"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 class="justify-center d-flex">
            <button class="button v-btn" @click.prevent="addProperty = true" v-show="!addProperty">Добавить</button>
          </v-flex>
        </div>

        <v-layout>
          <v-flex xs12>
            <v-autocomplete
              v-model="customFieldNameModel"
              v-if="addProperty"
              hint="Выберите из существующих характеристик или создайте новую"
              :items="items"
              :loading="isLoading"
              label="Добавьте новую характеристику товара"
              :search-input.sync="search"
              @change="addField"
              persistent-hint
              :return-object="true"
            />
          </v-flex>
        </v-layout>
      </v-form>
    </div>
  </section>
</template>
<script>
import * as uuid4 from 'uuid/v4';

export default {
  data() {
    return {
      valid: false,
      search: null,
      isLoading: false,
      addProperty: false,
      // Images
      // Categories
      // Custom Fields
      customFieldNameModel: null,
      customFieldName: null,
      customFields: [
        // {id: 1, fieldName: 'haha', fieldValue: ''}
      ],
      images: [],
      categories: [],
      updatetProps: [],
      properties: [
        {text: 'Частота123', value: 'Частота'},
        {text: 'Габариты123', value: 'Габариты'},
      ],
      product: {
        title: {
          value: '',
          rules: [
            v => !!v || 'Название продукта является обязательным',
            v => v.length <= 90 || 'Название должно быть меньше 90 символов'
          ],
        },
        short: {
          value: '',
          rules: [
            v => !!v || 'Описание продукта является обязательным',
            v => v.length <= 300 || 'Описание должно быть меньше 300 символов'
          ],
        }
      },
      requiredRule: [
        v => !!v || 'Поле является обязательным',
        v => v.length <= 120 || 'Значение не должно превышать 300 символов'
      ],
    }
  },
  computed: {
    items () {
      this.updatetProps = [];
      if (this.customFieldName) {
        this.updatetProps.unshift({text: `Создать "${this.customFieldName}"`, value: this.customFieldName});
      }

      this.updatetProps = this.updatetProps.concat(this.properties);
      return this.updatetProps.map(item => {
        return item;
      });
    }
  },
  mounted() {
    console.log(this);
  },
  watch: {
      search (val) {
        this.customFieldName = val;

        // if (this.properties.length > 0) return;

        // if (this.isLoading) return

        // this.isLoading = true;
      }
  },
  methods: {
    addField(value) {
      value.text = value.value
      const id = uuid4();
      const items = this.customFields.filter(item => value.value === item.fieldName);
      if (items.length > 0) {
        return;
      }
      const field = {id: id, fieldName: value.value, fieldValue: ''};
      this.customFields.push(field);
    }
  }
}
</script>
<style lang="scss" scoped>
.amplifier {
  padding: 30px 0;

  &__layout-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-left: -15px;
    margin-right: -15px;
    background-color: rgba(158, 158, 158, .2);
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 0 20px;

    .item {
      padding: 0 15px;
    }

    .no-content {

      margin: 20px 0;
      text-align: center;
    }

    .button {
      max-width: 120px;
    }
  }

  &__props {
    width: 100%;
    padding: 0 15px;
    text-align: left;
    font-size: 16px;

    .title {
      margin: 20px 0 0;
      font-weight: normal;
    }
  }
}
</style>

