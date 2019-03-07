<template>
  <section class="product-page amplifier">
    <div class="product-page__container amplifier__container">
      <v-form v-model="valid" @submit="create" ref="form" lazy-validation>
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
        <div class="amplifier__images">
          <image-list @uploaded="imageUpload" :callback="imageListCallback" />
        </div>
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
        <v-layout>
          <v-flex>
            <v-switch
              v-model="product.isAvailable.value"
              :label="`${product.isAvailable.value ? product.isAvailable.true : product.isAvailable.false}`"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout justify-space-between flex-wrap>
          <v-flex xs12 md5>
            <v-text-field
              type="number"
              v-model="product.inventory.value"
              :rules="required"
              label="Количество"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field
              type="number"
              v-model="product.cost.value"
              :rules="required"
              label="Цена"
              required
            ></v-text-field>
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
        <div class="amplifier__create">
          <button class="button v-btn" type="submit" @click.prevent="create" :disabled="!valid">Создать товар</button>
        </div>
      </v-form>
    </div>
  </section>
</template>
<script>
import * as uuid4 from 'uuid/v4';
import ImageList from '@/components/shared/ui/fileUpload/ImageList';
import { ADD_AMPLIFIER } from '../../../store/actions/amplifier.js';

export default {
  data() {
    return {
      valid: true,
      search: null,
      isLoading: false,
      addProperty: false,
      // Images
      // Categories
      // Custom Fields
      customFieldNameModel: null,
      customFieldName: null,
      customFields: [],
      images: [],
      mainPhoto: null,
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
        },
        isAvailable: {
          value: true,
          true: 'Доступен для заказа',
          false: 'Снят с продажи'
        },
        inventory: {
          value: 0,
        },
        cost: {
          value: 0,
        }
      },
      required: [
        v => !!v || 'Поле является обязательным',
      ],
      requiredRule: [
        v => !!v || 'Поле является обязательным',
        v => v.length <= 300 || 'Значение не должно превышать 300 символов'
      ],
    }
  },
  components: {
    ImageList
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
  },
  watch: {
    search (val) {
      this.customFieldName = val;
    }
  },
  methods: {
    imageUpload(files) {
      this.images = this.images.concat(files);
    },
    imageListCallback(data) {
      this.mainPhoto = data.mainPhoto;
    },
    addField(value) {
      const id = uuid4();
      const items = this.customFields.filter(item => value.value === item.fieldName);
      if (items.length > 0) {
        return;
      }
      const field = {id: id, fieldName: value.value, fieldValue: ''};
      this.customFields.push(field);
      value.text = '';
      value.value = '';
    },
    create() {
      const valid = this.$refs.form.validate();
      if (!valid) return;
      const product = {
        name: this.product.title.value,
        short: this.product.short.value,
        customFields: this.customFields.length > 0 ? JSON.stringify(this.customFields) : [],
        mainPhoto: this.mainPhoto,
        images: this.images
      };
      this.valid = false;
      this.$store.dispatch(`modules/amplifier/${ADD_AMPLIFIER}`, product)
        .then(res => {
          if (res.status === 200) {
            this.$router.push(`/admin/amplifiers`);
          }
        }).finally(() => {
          this.valid = true;
        });
    },
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

  &__create {
    margin: 20px 0 0;
  }
}
</style>

