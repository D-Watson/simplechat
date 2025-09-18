<template>

<view class="user-chat-list">
	<UserInfoEnhanced
	    avatarUrl="https://gitee.com/Anxiaozhuang/pic-storage/raw/master/%E5%9C%A3%E6%9D%AF%E4%B8%83%E9%80%86%E4%BD%8D.webp"
	    name="Tom"
	    description="全栈工程师"
	    size="medium"
	    layout="horizontal"
	    show-badge
	    badge-content="5"
	    status="online"
	/>
	<UserInfoEnhanced
	    avatarUrl="https://gitee.com/Anxiaozhuang/pic-storage/raw/master/%E5%9C%A3%E6%9D%AF%E4%B8%83%E9%80%86%E4%BD%8D.webp"
	    name="Tom"
	    description="全栈工程师"
	    size="medium"
	    layout="horizontal"
	    show-badge
	    badge-content="5"
	    status="online"
	/>
</view>

</template>
<script setup>
import {reactive } from 'vue'
import UserInfoEnhanced from '@/component/user_info.vue'
const chatList = reactive([])
const getChatList=()=>{
	
}
</script>
<style scoped>
.user-chat-list{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	
}
</style>