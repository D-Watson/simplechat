<template>
	<!-- 摄影师发布作品页面 -->
	<view class="back-btn" @click="backToIndex">
		返回
	</view>
	<view>
		hhhh
	</view>
</template>

<script setup>
	
const backToIndex=()=>{
	uni.switchTab({
		url: '/pages/index/index'
	})
}
</script>

<style scoped>
.back-btn{

}

</style>
