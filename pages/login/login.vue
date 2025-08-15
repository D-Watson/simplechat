<template>
  <view class="page-login">
    <view class="login-banner">
      Live
    </view>
    <form class="forms">
      <view class="account-inputs">
        <view class="place-icon">
          <image class="icon" src="/static/login/email.svg" mode="scaleToFill" />
        </view>
        <input class="account-input" placeholder="邮箱账号" type="email" />
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
    <view class="external">
      <text class="external-text">跳转外部登录</text>
      <view class="external-icons">
        <view class="icon-wrapper">
          <image class="social-icon" src="/static/login/weixin.svg" mode="scaleToFill"></image>
        </view>
        <view class="icon-wrapper">
          <image class="social-icon" src="/static/login/weixin.svg" mode="scaleToFill"></image>
        </view>
        <view class="icon-wrapper">
          <image class="social-icon" src="/static/login/weixin.svg" mode="scaleToFill"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style>
.page-login {
  width: 100vw;
  height: 100vh;
  display: grid;
  /***
  第一行：固定高度 30vh（视口高度的30%）
  第二行：auto（由内容决定高度）
  第三行：1fr → 占用剩余的全部空间
  ***/
  grid-template-rows: 30vh auto 1fr;
  background-color: #ffffff;
}

.login-banner {
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FF5853;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
}

.forms {
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10vw;
  margin-top: 20px;
}

.account-inputs {
  display: flex;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  align-items: center;
  background-color: #f9f9f9;
}

.place-icon {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 24px;
  height: 24px;
}

.account-input {
  flex: 1;
  height: 100%;
  padding: 0 10px;
  border: none;
  background: transparent;
  outline: none;
}

.btn-login {
  width: 100%;
  height: 50px;
  background-color: #FF5853;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
  border: none;
}

.external {
  grid-row: 3;
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