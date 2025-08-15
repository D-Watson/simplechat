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
        <input class="account-input" placeholder="邮箱账号/昵称" type="email" />
      </view>
      <view class="account-inputs">
        <view class="place-icon">
          <image class="icon" src="/static/login/password.svg" mode="scaleToFill" />
        </view>
        <input class="account-input" placeholder="密码" type="password" />
      </view>
      <view class="btn-login" @click="Login">
        登录
      </view>
    </form>
	<view class="rtag">
	  <view class="text-wrapped">
		  <text class="rtext" @click="redirectToRegister">注册</text>
	  </view>
	  <view class="text-wrapped">
		  <text class="rtext" @click="redirectToSendCode">邮箱验证码登录</text>
		  <image class="icon-wrapper-small" src="/static/login/right.svg"></image>
	  </view>	  
	</view>
    <view class="external">
      <text class="external-text">跳转外部登录</text>
      <view class="external-icons">
        <view class="icon-wrapper">
          <image class="social-icon" src="/static/login/weixin.svg" mode="scaleToFill"></image>
        </view>
        <view class="icon-wrapper">
          <image class="social-icon" src="/static/login/qq.svg" mode="scaleToFill"></image>
        </view>
        <view class="icon-wrapper">
          <image class="social-icon" src="/static/login/twitter.svg" mode="scaleToFill"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
	const redirectToRegister = ()=>{
		uni.navigateTo({
			url: "/pages/register/register"
		})
	}
	const redirectToSendCode=()=>{
		uni.navigateTo({
			url: "/pages/login_by_send_code/login_by_send_code"
		})
	}
</script>

<style>
.rtag{
	width: 100vw;
	height: 50px;
	grid-row: 3;
	display: flex;
	justify-content: space-around;
	margin-top: 10px;
}
.text-wrapped{
	display: flex;
	justify-content: center;
	align-items: center;
}
.icon-wrapper-small{
	width: 20px;
	height: 20px;
	margin-left: 5px;
}

.external {
  grid-row: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
}

.external-text {
  color: #999;
  margin-bottom: 20px;
  font-size: 0.9rem;
}
.rtext{
	color: #4D4D4D;
	font-size: 0.9rem;
}

.external-icons {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
}

.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-icon {
  width: 30px;
  height: 30px;
}
</style>