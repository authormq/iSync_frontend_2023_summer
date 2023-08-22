<template>
  <div class="container">
    <h1>测试一下我写的轮播图</h1>
    <div class="hint">图片比较大，切换时可能因为加载速度慢而不流畅</div>
    <StylishSlider
      :autoplay="3000"
      borderRadius="15px"
      showDots
    >
      <img 
        v-for="(img, index) in images" :key="index" :src="img.src" alt="飞机"
        @click="handleClick(img.hint)"
      >
    </StylishSlider>
  </div>
</template>

<script>
import StylishSlider from '../components/StylishSlider.vue'
export default {
  name: 'HomeView',
  components: {
    StylishSlider
  },
  data() {
    return {
      images: [
        { src: '/src/assets/1.jpg', hint: 'A350-900'},
        { src: '/src/assets/2.jpg', hint: 'A350-900'},
        { src: '/src/assets/3.jpg', hint: 'B787-8'},
        { src: '/src/assets/4.jpg', hint: 'B747-4F'},
      ]
    }
  },
  methods: {
    handleClick(hint) {
      alert(hint)
    }
  }

}
</script>

<style scoped>
h1 {
  font-size: 50px;
  font-weight: bold;
  margin: 15px;
  margin-left: 0;
}

img {
  cursor: pointer;
}

.container {
  width: 1000px;
  margin: 0 auto;
}

.hint {
  border-left: 5px solid lightgrey;
  padding-left: 5px;
  color: lightgrey;
  font-size: 20px;
}
</style>