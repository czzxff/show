<template>
  <div id="wrap">
    <div class="nav-box">
      <div class="wrap">
        <div class="top-col">
          <ul>
            <li style="width: 20%;">{{username}}&nbsp;30°</li>
            <li style="width: 50%;">
              <input type="text">
              <img src="@/assets/logo.png" class="icon-img" id="search-img">
            </li>
            <li style="width: 10%;">
              <img src="@/assets/logo.png" class="icon-img" id="info-img">
            </li>
          </ul>
        </div>
        <div class="down-col">
          <router-link to=''>
            <div class="item">精选</div>
          </router-link>
          <router-link to=''>
            <div class="item">展览</div>
          </router-link>
          <router-link to=''>
            <div class="item">演出&赛事</div>
          </router-link>
          <router-link to=''>
            <div class="item">景点门票</div>
          </router-link>
        </div>
      </div>
    </div>
    <!--轮播图-->
    <slide-show :slides="slides"></slide-show>

    <!--推荐列表-->
    <!-- <recommend></recommend> -->
  </div>
</template>

<script>
  import axios from 'axios'
  import slideShow from "@/components/swiper/slide.vue"
  export default {
    name: 'home',
    components: {
       slideShow
    },
    data () {
      return {
        username: '',
        slides: null
      }
    },
    mounted () {
       let cityname = localStorage.getItem('cityname')
       let cityid = localStorage.getItem('cityid')
       console.log(cityname)
       console.log(cityid)
       this.username = cityname
      // this.username = this.$cookies.get('un')
      axios
        .get('../../static/slide.json')
        .then(response => {
          this.slides = response.data.swiperList
        }).catch(error => {
          console.log(error)
          this.errored = true
        })
      .finally(() => this.loading = false)
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
  #wrap{
    width: 100%;
    height: auto;
    display: table;
    content: '';
    clear: both;
  }
  .icon-img {
    width: 2rem;
    height: 2rem;
  }

  .nav-box {
    width: 100%;
    height: 7rem;
    position: relative;
  }

  .wrap {
    position: fixed;
    width: 100%;
    height: 6rem;
  }

  .top-col {
    height: 4rem;
    /*line-height: 4rem;*/
    background-color: dodgerblue;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .top-col li {
    width: auto;
    line-height: 4rem;
    float: left;
    margin: 0 0.7rem;
  }

  input {
    width: 100%;
    height: 2rem;
    border-radius: 1rem;
  }

  #search-img {
    position: absolute;
    top: 1.1rem;
    left: 70%;
  }

  #info-img {
    margin-top: 1rem;
  }

  .down-col {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    width: 100%;
    height: 2rem;
    margin-top: 0;
    background-color: #FFFFFF;
    border-bottom: 1px solid gainsboro;
  }

  .item {
    /*width: 2rem;*/
    height: 2rem;
    line-height: 2rem;
  }

  .item:hover {
    border-bottom: 2px solid orangered;
  }

</style>
</style>
