<template>
	<view class="page-login">
	  <view class="login-banner">
	    Live
	  </view>
	  <form class="login-forms">
	    <view class="account-inputs">
	      <view class="place-icon">
	        <image class="icon" src="/static/login/email.svg" mode="scaleToFill" />
	      </view>
	      <input v-model="data.email" class="account-input" placeholder="邮箱账号" type="email" />
	    </view>
	    <view class="account-inputs">
	      <view class="place-icon">
	        <image class="icon" src="/static/login/password.svg" mode="scaleToFill" />
	      </view>
	      <input class="account-input" v-model="data.code" placeholder="验证码" />
			<view v-if="sentCode"> {{sentTime}} </view>
			<view v-else class="send-code" @click="sendCode">发送</view>
	    </view>
	    <view class="btn-login" @click="login">
	      登录
	    </view>
	  </form>
	  
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import {sendEmailCode, loginByCode} from '../../api/api'

const sentCode = ref(false)
const sentTime = ref(60)
const timer = ref(null) // 声明为响应式变量
const data=reactive({
	email: '',
	code: ''
})

const sendCode = async () => {
  if (timer.value) return // 防止重复点击
  sentCode.value = true;
  const res = await sendEmailCode({
	  email: data.email
  })
  console.log(res)
  countDown()
}

const login=async()=>{
	const res = await loginByCode({
		email: data.email,
		userName:"",
		deviceId: "111",
		passwordEncrypted:"",
		passwdVerify: false,
		code: data.code
	})
	var resp = res.data;
	console.log(resp)
	if(resp.errCode === 5005){
		console.log('验证码错误')
	}
	if(resp.errCode === 200){
		console.log('success')
		localStorage.setItem('userId', resp.data.userId);
		localStorage.setItem('token', resp.data.token);
		console.log(localStorage.getItem('userId'))
		clearInterval(timer.value)
		timer.value = null
		sentTime.value = 60
		sentCode.value = false
		uni.switchTab({
			url: '/pages/index/index'
		})
	}
}

const countDown = () => {
  timer.value = setInterval(() => {
    sentTime.value--
    
    if (sentTime.value <= 0) {
      clearInterval(timer.value)
      timer.value = null
      sentTime.value = 60
      sentCode.value = false
    }
  }, 1000)
}



</script>

<style scoped>
.send-code{
	width: 75px;
	font-size: 0.9rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #4facfe;
	height: 50px;
	color: white;
	border-radius: 25px;
}

</style>
