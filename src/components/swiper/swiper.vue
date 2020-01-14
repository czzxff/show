<template>
  <!-- 轮播组件应用示范 -->
   <div class="index-wrap">
      <slide-show :slides="slides"></slide-show>
    </div>
</template>

<script>
  import axios from 'axios'
  import slideShow from "@/components/swiper/slide.vue"
  export default {
    components: {
      slideShow
    },
    data () {
      return {
        slides: null
      }
    },
    mounted () {
      axios.get('./static/slide.json')
      .then(response => {this.slides = response.data.swiperList})
      .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    }
  }
</script>

<style>
  .index-wrap {
      overflow: hidden;
  }
</style>
