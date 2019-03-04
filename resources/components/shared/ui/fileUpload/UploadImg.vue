<template>
  <div class="img-loader">
    <button
      class="img-loader__container"
      @click.prevent="onFocus"
      ref="fileTextField">
      <no-ssr>
        <font-awesome-icon :icon="['fa', 'camera']" />
      </no-ssr>
    </button>
    <input type="file"
      :multiple="true"
      accept="image/x-png,image/jpeg"
      ref="fileInput"
      @change="onFileChange" />
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Ладно
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data(){
    return {
      filename: "",
      maxSize: 2048,
      maxFiles: 10,
      snackbar: false,
      y: 'bottom',
      x: 'left',
      mode: 'multi-line',
      timeout: 6000,
      text: 'Hello, I\'m a snackbar'
    };
  },
  watch: {
    value(v){
      console.log(v);
      this.filename = v;
    }
  },
  mounted() {
    this.filename = this.value;
  },
  methods: {
    getFormData(files){
      const data = new FormData();
      [...files].forEach(file => {
        data.append('file', file, file.name); // currently only one file at a time
      });
      return data;
    },
    onFocus(){
      this.$refs.fileInput.click();
    },
    loadImages(files) {
      [...files].forEach(item => {
      });
      const form = this.getFormData(files);
      console.log(form);
      axios.post('/api/upload', form).then(res => {
        console.log(res);
      });
    },
    onFileChange($event){
      const files = $event.target.files || $event.dataTransfer.files;
      if (files.length > this.maxFiles) {
        this.text = 'Максимум 10 файлов';
        this.snackbar = true;
        return;
      }
      this.checkSize(files).then(res => {
        console.log(res);
        this.loadImages(res);
      }).catch(err => {
        this.text = err.message;
        this.snackbar = true;
      });

      // const reader = new FileReader();
      // reader.onload = e => this.selectedFile = e.target.result;
      // reader.readAsDataURL(file);
      // const form = this.getFormData(files);
    },
    checkSize(files) {
      return new Promise((resolve, reject) => {
        [...files].forEach(file => {
          console.log(file);
          if (file.size/1024 > this.maxSize) {
            reject({message: 'Изображение не должно превышать 2 Мб'});
          }
        });
        resolve(files);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  input[type=file] {
    position: absolute;
    left: -99999px;
  }

  .img-loader {
    width: 80px;
    height: 80px;
    border: 1px solid rgba(158, 158, 158, .7);
    color: rgba(158, 158, 158, .7);
    border-radius: 4px;
    transition: all .15s ease;

    &:hover {
      border-color: #0171BF;
      color: #0171BF;
    }

    &__container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
