<template>
  <div class="list">
    <router-link v-for="(item,index) in list"  :to ="{name:'detail',params :{id:index}}">
      <div class="new-item">
  	    <img :src="item.mainimg"">
        <div class="new-content">
          <div class="title">{{item.title}}</div>
          <div class="new-info">
            <div id="adress">{{item.adress}}</div>
            <div style="float: right;color: red;font-size: 1.2rem;">￥{{item.price}}</div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
    name: 'list',
    data () {
      return {
    	  list:null
      }
    },
    mounted () {
      axios.get('../../static/show.json')
      .then(response => {this.list = response.data.show})
      .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    }
  }
</script>

<style>
  body{
    margin: 0;
    padding: 0;
  }
   .list{
    height: auto;
    display: table;
    clear: both;
    content: "";
    margin: 0 auto;
    }
   .new-item{
    width: 22rem;
    height: 8rem;
    margin: 0.5rem auto;
    border-bottom: 1px solid lightgray;
    }
   .new-item img{
    float: left;
    width: 7rem;
    height: 7rem;
    }
   .new-content{
    float: right;
    width: 14rem;
    height: 7rem;
    }
   .title{
      width: 14rem;
      margin: 0;
      padding: 0;
      height: 3.3rem;
      font-size: 1.2rem;
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
   .new-info{
    margin-top: 0.8rem;
    height: 2.2rem;
    font-size: 0.8rem;
    color: gray;
    }
   #adress{
    margin-right: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }
</style>
