<template>
<div>
	<div class="main">
		<div class="top-col">
				<img :src="detail.mainimg">
				<div class="top-right">
					<div class="show-title">{{detail.title}}</div>
					<div class="show-price">{{detail.price}}元</div>
				</div>
			</div>
		<div class="center-col">
				<div class="center-left">
					<div class="center-item">{{detail.time}}</div>
					<div class="center-item">{{detail.adress}}</div>
				</div>
				<img src="@/assets/icon/locate.png" />
			</div>
		<div class="down-col">
				<div class="mani-btn fl"><img src="@/assets/icon/like.png"><span>收藏</span></div>
				<div class="mani-btn fr"><img src="@/assets/icon/share.png"><span>分享</span></div>
			</div>
	</div>
	<div class="list">
		<div class="introduce">
		  	<h2>演出详情</h2>
		  	<img v-for="item in detail.img" :src="item.url" />
		</div>
		<div class="gray-box"></div>
		<div class="note">
		  <h2>购票须知</h2>
		  <ul>
		  	  <li v-for="item in detail.note">
		  		<h4>{{item.no_title}}</h4>
		  		<p>{{item.no_info}}</p>
		  	  </li>
		   </ul>
        </div>
	</div>	
	<div class="shopping">
			<div class="shopping-btn">立即购票</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'detail',
  data () {
    return {
    	detail:null
    }
  },
  computed: {
    id: function () {
      return this.$route.params.id
    }
  },
  mounted () {
    axios
        .get('../../static/show.json')
            .then(response => {this.detail = response.data.show[this.id]
        }).catch(error => {
        console.log(error)
        this.errored = true
    })
    .finally(() => this.loading = false)
  }
}
</script>

<style>
	body{
			padding: 0;
			margin: 0;
		}
		.fl{
			float: left;
		}
		.fr{
			float: right;
		}
		.gray-box{
			width: 100%;
			height: 1rem;
			background-color: lightgray;
		}
		.main{
			width: 100%;
			height: 20rem;
			background: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3637244425,756564877&fm=15&gp=0.jpg");
			color: white;
		}
		.main .top-col{
			position: relative;
			width: 90%;
			height: 8rem;
			margin: 0 auto;
			padding-top: 2rem;
			/*border: 1px solid white;*/
		}
		.top-col img{
			width: 5rem;
			height: 8rem;
			float: left;
		}
		.top-right{
			float:left;
			margin-left: 1rem;
		}
		.show-title{
			height: 3rem;
			font-size: 1.3rem;
		}
		.show-price{
			margin-top: 3rem;
		}
		.center-col{
			margin: 1rem auto;
			width: 90%;
			height: 4rem;
			background-color: rgba(211,211,211,0.1);
		}
		.center-left{
			width: 80%;
			float: left;
			font-size: 0.8rem;
			overflow: hidden;
		}
		.center-item{
			width: 100%;
			overflow: hidden;
		    margin: 0.5rem 0 0 1rem;
		}
		.center-col img{
			float: right;
			width: 2rem;
			height: 2rem;
			margin: 1rem;
		}
		.down-col{
			width: 90%;
			height: 3rem;
			margin: 0.5rem auto;
		}
		.mani-btn{
			width: 45%;
			height: 2.5rem;
			background-color: rgba(211,211,211,0.1);
		}
		.mani-btn img{
			width: 1.5rem;
			height: 1.5rem;
			float: left;
			margin: 0.5rem 10% 0 25%;
		}
		.mani-btn span{
			line-height: 2.5rem;
			margin-left: 0;
		}
		.list{
			width: 100%;
			height: auto;
			display: table;
			content: "";
			clear: both;
			margin-bottom: 2rem;
		}
		.introduce,.note{
			width: 90%;
			height: auto;
			display: table;
			content: "";
			clear: both;
			padding: 1rem 5%;
		}
		.introduce img{
			width: 100%;
		}
		.note ul{
			list-style: none;
			padding: 0;	
		}
		.note li{
			border-bottom: 1px solid lavender;
		}
		.shopping{
			width: 100%;
			height: 2rem;
			position: fixed;
			bottom: 0;
		}
		.shopping-btn{
			margin: 0 auto;
			width: 90%;
		    height: 2rem;
		    border-radius: 10px;
		    background-color: red;
		    color:white;
		    text-align: center;
		    font-size: 1.3rem;
		    line-height: 2rem;
		}
</style>