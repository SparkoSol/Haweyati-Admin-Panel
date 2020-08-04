<template>
  <div style="display: flex;justify-content: center">
    <div
      class="base-image-input"
      :style="{ 'background-image': `url(${imageData})` }"
      @click="chooseImage"
    >
      <span v-if="!imageData && !image.image" class="placeholder">
        Choose an Image
      </span>
      <input
        ref="fileInput"
        class="file-input"
        type="file"
        @input="onSelectFile"
      />
      <img
        v-if="!imageData && image.image"
        width="100%"
        height="100%"
        style="object-fit: contain"
        :src="$axios.defaults.baseURL + 'uploads/' + this.image.image.name"
        @input="onSelectFile"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSelector',
  props: {
    image: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      imageData: null,
      sendImage: null
    }
  },
  methods: {
    chooseImage() {
      this.$refs.fileInput.click()
    },
    onSelectFile() {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(files[0])
        this.$emit('input', files[0])
      }
    }
  }
}
</script>

<style scoped>
.base-image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family: Helvetica;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
</style>
