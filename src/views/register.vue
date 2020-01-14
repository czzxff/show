 <template>
	  <div>
      <div class="login-wrap" v-show="showLogin">
        <h3>登录</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入用户名/手机号" v-model="username">
        <input type="password" placeholder="请输入密码" v-model="password">
        <button v-on:click="login">登录</button>
        <span v-on:click="ToRegister">没有账号？马上注册</span>
      </div>
      <div class="register-wrap" v-show="showRegister">
        <h3>注册</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入手机号" v-model="newUserPhone">
        <input type="password" placeholder="请输入验证码" v-model="code" >
        <input type="button" v-on:click="sendcode" v-show="is_code">获取验证码</input>
        <input type="button" v-show="!is_code">请在{{time}}后重新获取验证码</button>
        <input type="password" placeholder="请设置密码" v-model="newPassword">
        <button v-on:click="register">注册</button>
        <span v-on:click="ToLogin">已有账号？马上登录</span>
      </div>
    </div>
</template>

<script>
	import axios from 'axios'
	import {setCookie,getCookie} from '@/assets/js/cookie.js'
	export default{
    data(){
      return{
        showLogin: true,
        showRegister: false,
        showTishi: false,
        tishi: '',
        userid:'',
        username: '',
        password: '',
        newUserPhone: '',
        code:'',
        newPassword: '',
        is_code:true
      }
    },
    mounted(){
      /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
      if(getCookie('username')){
        this.$router.push('/')
      }            
      let data = {'username':this.username,'password':this.password}
      axios.get('/user', data)
      .then(({data}) => {
        if (data.message === "success") {
          this.$cookies.set("status", "logined", 30 * 60); // 设置cookie中存放的生命周期
          let redirect = decodeURIComponent(this.$route.query.redirect || "/");
          this.$router.push({path: redirect});
          this.$message({
            title: '提示',
            type: 'success',
            message: '登录成功！'
          });
        } else {
          this.$message({
            title: '提示',
            type: 'info',
            message: '用户名或密码错误！请重新登录！'
          });
        }
      }).catch(error => {
        console.log(error)
      })
      .finally(() => this.loading = false)
    },
    methods:{
      ToRegister(){
        this.showRegister = true
        this.showLogin = false
      },
      ToLogin(){
        this.showRegister = false
        this.showLogin = true
      },
      login(){
        if(this.username == "" || this.password == ""){
          alert("请输入用户名或密码")
        }else{
          /*接口请求*/
          let data = {'username':this.username,'password':this.password}
          this.$http.post('http://localhost/vueapi/index.php/Home/user/login',data).then((res)=>{
            console.log(res)
            /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
            if(res.data == -1){
              this.tishi = "该用户不存在"
              this.showTishi = true
            }else if(res.data == 0){
              this.tishi = "账号/密码输入错误"
              this.showTishi = true
            }else{
              this.tishi = "登录成功"
              this.showTishi = true
              setCookie('username',this.username,1000*60)
              setCookie('userid',this.userid,1000*60)
              setTimeout(function(){
                this.$router.push('/')
               }.bind(this),1000)
            }
          })
        }
      },
      sendcode(){
        if(this.newUserPhone == ""){
          alert("手机号不能为空")
        }else if(!(/^1[3456789]\d{9}$/.test(this.newUserPhone))){
          alert("请输入正确的手机号")
        }else{
          let data = {'username':this.newUserPhone}
          this.$http.post('http://localhost/vueapi/index.php/Home/user/register',data).then((res)=>{
            console.log(res)
            if(res.data == "ok"){
              this.is_code=false
              let dx_djs=setInterval(()=>{
                if((this.time--) <= 0) {
                  this.time = 60;
                  this.is_code = true;
                  clearInterval(dx_djs);
                }
              },1000)
            }else{
              alert("错误代码"+res.data)
            }    
          })
        }
      },
      register(){
        if(this.newUserPhone == "" || this.newPassword == ""){
          alert("请输入手机号或密码")
        }else if(this.code == ""){
          alert("请输入验证码")
        }else{
          let data = {'username':this.newUserPhone,'password':this.newPassword,'code':this.code}
          this.$http.post('http://localhost/vueapi/index.php/Home/user/register',data).then((res)=>{
            console.log(res)
            if(res.data == "ok"){
              this.tishi = "注册成功"
              this.showTishi = true
              setCookie('username',this.username,1000*60)
              setCookie('userid',this.userid,1000*60)
              /*注册成功之后再跳回登录页*/
              setTimeout(function(){
                this.showRegister = false
                this.showLogin = true
                this.showTishi = false
              }.bind(this),1000)
            }
          })
        }
      }    
    }
  }  
</script>

<style>
	.login-wrap{text-align:center;}
    input{display:block; width:250px; height:40px; line-height:40px; margin:0 auto; margin-bottom: 10px; outline:none; border:1px solid #888; padding:10px; box-sizing:border-box;}
    p{color:red;}
    button{display:block; width:250px; height:40px; line-height: 40px; margin:0 auto; border:none; background-color:#41b883; color:#fff; font-size:16px; margin-bottom:5px;}
    span{cursor:pointer;}
    span:hover{color:#41b883;}
</style>