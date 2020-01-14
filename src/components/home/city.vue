<template>
  <div class="city">
    <div class="city-header">
      <img src="@/assets/icon/back.png" class="icon-img" @click="backmovie()"/>
      <input type="text" placeholder="城市/拼音" class="search-box">
      <img src="@/assets/icon/search.png" class="icon-img search-btn">
      <img src="@/assets/icon/delete.png" @click="cancel()" class="icon-img delete-btn">
    </div>
    <div class="hot-city">
      <div class="locate-city">
        <p class="fl">{{title}}</p>&nbsp;&nbsp;&nbsp;
        <div class="item-box">
          <img src="@/assets/icon/locate.png" class="icon-img">
          <span>{{locateCity}}</span>
         </div>
      </div>
      <p style="padding:1rem 0 0 0;">热门城市</p>
      <div class="hot-list">
        <div class="item-box fl" @click="citytext($event)" v-for="item in isHot" >{{item.name}}</div>
      </div>
    </div>
    <div class="city-main">
      <div class="city-list">
        <ul>
        	<li v-for="(item,index) in citylist" :key="index" class="cityli" :id="item.lettertop">
        		<p class="cityle">{{item.lettertop}}</p>
        		<ul>
        			<!-- <li v-for="(itemx,index) in item.city" ke ="itemx.id" @click="citytext($event)" class="cityte">{{itemx.name}}</li> -->
              <li v-for="(itemx,index) in item.city" ke ="itemx.id" @click="citytext(itemx.name,itemx.id)" class="cityte">{{itemx.name}}</li>
        		</ul>
        	</li>
        </ul>
      </div>
      <div class="city-letter">
      	<ul>
      		<li v-for="(item,index) in letter" :key="index" @click="lettercity($event)">{{item}}</li>
      	</ul>
      </div>
      <div class="showletter" v-if='showx' :class="{addshow:showx}">{{showletterx}}</div>
    </div>
  </div>
</template>

<script>
	import axios from 'axios'
	export default {
    name:'city',
		data() {
			return {
				title: "当前城市",
				letter: [],
				isHot: [],
        locateCity:"",
				citylist: [],
				citylistc: [],
				showletterx: "",
				showx: false,
				qu: false,
				searchcity: "",
				showy: true,
				searchm: [],
				searchn: true
			}
		},
		created: function() {
			axios.get('./static/city.json').then(response => {
				const citylist = response.data.cities;
				this.citylistc = response.data.cities;
				let cityhead = [],
					newcityhead = [],
					isHotx = [],
					citymain = [];

				for (let i = 0; i < citylist.length; i++) {
					let ishotlist = citylist[i];
					let letterx = citylist[i].pinyin.charAt(0).toUpperCase(); //toUpperCase() 方法用于把字符串转换为大写
					if (citylist[i].isHot) {
						isHotx.push(ishotlist); //把数据中标记为热门城市的，遍历添加至数组热门城市
					}
					cityhead.push(letterx);//城市拼音首给字母大写集合数组
				}
				for (let i = 0; i < cityhead.length; i++) {
					if (newcityhead.indexOf(cityhead[i]) == -1) { //用indexof特性给'城市拼音首给字母大写集合数组'去重
						newcityhead.push(cityhead[i]);  //newcityhead为城市首拼数组，用于右侧快速选择城市，及城市顺序排列
					}
				}
				newcityhead = newcityhead.sort(function compareFunction(item1, item2) {
					return item1.localeCompare(item2); //localeCompare方法用于给字母按中文排序
				});
				this.isHot = isHotx; //热门城市数组
				this.letter = newcityhead;  //城市首拼数组
				console.log(newcityhead)
				for (let i = 0; i < newcityhead.length; i++) {
					let obj = new Object();  //创建城市列表对象
					obj.lettertop = newcityhead[i];  //动态创建对象，lettertop为obj子对象的首拼对象
					obj.city = [];

					for (let j = 0; j < citylist.length; j++) {
						if (newcityhead[i].toLowerCase() === citylist[j].pinyin.charAt(0)) {
              let citya = new Object();
              citya.id = citylist[j].cityId;
              citya.name = citylist[j].name;
              // 在城市列表，具体城市中添加ID属性是为了跳转传值，用ID提供城市信息，
              // 进而页面获取城市具体数据.若不用次方法,可把上面3行去掉,下面那行改成push(citylist[j].name)
              // 如此,citymain中city数组变为一维数组,类似:"city":["鞍山","安庆","安阳"]

							obj.city.push(citya);
						}
					}
					citymain.push(obj)
          // 城市列表citymain结构简述:
          // citymain:[
          //   {//obj
          //     "lettertop":"A",
          //     "city":[citya
          //       {
          //         "id":"230300",
          //         "name":"安庆"
          //       },
          //       ......
          //     ]
          //   },
          //   ......
          // ]
				}
				this.citylist = citymain;
				console.log(citymain)
			})
		},
    mounted () {
      const cityname = localStorage.getItem('cityname')
      this.locateCity = cityname
    },
		methods: {
			backmovie() {
				this.$router.push('/');
			},
			lettercity($event) {
				let text = $event.currentTarget.innerText;
				let _this = this;
				let letter = document.getElementById(text);
				var citym = document.getElementsByClassName("city_main")[0];
				//console.log(document.getElementsByClassName("city_main")[0])
				this.showletterx = text;
				this.showx = true;
				setTimeout(function() {
					_this.showx = false;
				}, 1600);
				citym.scrollTo(0, letter.offsetTop - 144)
			},
			cancel() {
				this.qu = true;
			},
			quback() {
				this.qu = false;
				this.searchcity = "";
				this.showy = true;
			},
			// citytext($event) {
			// 	const actioncity = $event.currentTarget.innerText;
   //      const actionid = $event.currentTarget.ke;
			// 	// this.$store.dispatch('actioncity', text) //暂时不用，学了vuex再使用此方法
   //      localStorage.setItem('cityname', actioncity);
   //      localStorage.setItem('cityid', actionid);
   //      this.$router.push('/');
			// }
      citytext:function(name,id) {

      	const actioncity = name;
        const actionid = id;
      	// this.$store.dispatch('actioncity', text) //暂时不用，学了vuex再使用此方法
        localStorage.setItem('cityname', actioncity);
        localStorage.setItem('cityid', actionid);
        this.$router.push('/');
      }
		},
		/* computed:{
		    getcity(){
		       return this.$store.getters.getcity;
		    }
		}, */
		watch: {
			searchcity: function() {
				var citysearchs = [];
				//this.searchcity.split(" ").join("").length = 0
				//判断input输入内容全是空格
				if (this.searchcity != "") {
					this.showy = false;
					for (let i = 0; i < this.citylistc.length; i++) {
						let str = this.citylistc[i].pinyin;
						if (str.indexOf(this.searchcity) != -1) {
							citysearchs.push(this.citylistc[i].name)
						}
					}
				}
				this.searchm = citysearchs;
				if (this.searchm.length == 0) {
					this.searchn = true
				} else {
					this.searchn = false
				}
			}
		}
	}
</script>

<style>
  .icon-img{
    width: 2rem;
    height: 2rem;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  body{
    margin: 0;
    padding: 0;
  }
	ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .city-header{
    width: 100%;
    height: 3rem;
    background-color: yellow;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
  }
  .search-box{
     margin-left: 1rem;
     width: 70%;
     height: 1.5rem;
     text-align: center;
  }
  .search-btn{
    margin-left: -70%;
  }
  .delete-btn{
   margin-left: 50%;
  }
  .hot-city{
    width: 96%;
    padding: 2%;
    min-height: 10rem;
    display: table;
    content: '';
    clear: both;
    background-color: #dbdbdb;
    border-bottom: 1px solid gray;
  }
  .locate-city{
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    width: 100%;
    height: 2rem;
  }
  p{
    margin: 0;
  }
  .item-box{
    width: 6rem;
    height: 2rem;
    background-color: white;
    border-radius: 3px;
    line-height: 2rem;
  }
  .item-box img{
    width: 1rem;
    height: 1rem;
  }
  .hot-list{
    margin-top: 0.5rem;
    width: 100%;
    height: 8rem;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  .hot-list div{
     margin-right: 1.5rem;
  }
  .cityle{
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
     background-color: #dbdbdb;
  }
  .cityte{
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid gray;
  }
  .city-letter{
    position: absolute;
    top: 25rem;
    right: .5rem;
  }
</style>
