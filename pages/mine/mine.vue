<template>
	<view @click="redirectLogin">
		登录/注册
	</view>
</template>

<script setup>
const redirectLogin = ()=>{
	uni.navigateTo({
		url: '/pages/login/login'
	})
}
</script>

<style>

</style>
