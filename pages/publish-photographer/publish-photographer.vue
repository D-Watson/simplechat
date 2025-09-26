<template>
	<!-- 摄影师发布约拍页面 -->
	<view class="publish-box">
		<!-- 选择专辑 -->
		<view class="choose-album">
			<view class="album"  v-for="(item, i) in data.album">
				<image class="album-cover" :src="item" mode="aspectFit"></image>
			</view>
			<view v-show="data.album.length < 3" class="btn-cover">
				<image class="btn-cover-photo" src='/static/icons/take_photo.svg'></image>
				<view class="text-album" style="font-size: 0.7rem;margin-top: 10rpx;">选择专辑</view>
			</view>
		</view>
		<view class="text-album" :class="{active: data.album.length === 3}">
			选择的专辑 {{data.album.length}}/3
		</view>
		<view class="title-detail-area">
			<view class="top-area">
				<view>标题</view>
				<textarea
				placeholder="合适的标题可以吸引更多人哦～"
				class="title-input"
				v-model="data.title"
				auto-height="true"
				auto-focus
				/>
				
			</view>
			<view class="top-area">
				<view>简介</view>
				<textarea 
				placeholder="可填写简介" 
				class="title-input" 
				v-model="data.detail"
				auto-height="true"
				auto-focus
				/>
			</view>
		</view>
	
		<!-- 选择风格 -->
		<view>
			
		</view>
	</view>
	<view v-show="sendToAudit" class="send-to-audit">
		sssss
	</view>
</template>

<script setup>
import {ref, reactive} from 'vue'
// 发布成功之后先显示审核页面
const sendToAudit = ref(false)
const active = ref(false)
const data=reactive({
	"title":"",
	"album":['111','222'],
	"detail":""
})

</script>

<style scoped>
.publish-box{
	width: 100vw;
	height: 100vh;
	padding: 0 30rpx;
}
.title-detail-area{
	display: flex;
	flex-direction: column;
	height: 50vw;
	border-bottom: 1px solid black;
}
.choose-album{
	width: 100vw;
	display: flex;
	padding: 20rpx 0;
	align-items: center;
}
.album{
	width: 200rpx;
	height: 300rpx;
	border: 1px dotted #D9D9D9;
	margin-right: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.album-cover{
	width: 200rpx;
	height: 300rpx;
}
.btn-cover{
	width: 200rpx;
	height: 200rpx;
	display: flex;
	border: 1px dotted #D9D9D9;
	justify-content: center;
	align-items: center;
	flex-direction: column;	
}
.btn-cover-photo{
	width: 100rpx;
	height: 100rpx;
}
.text-album{
	color: #8a8a8a;
	font-size: 0.8rem;
	&.active{
		color: #FF5853;
	}
}

.top-area{
	width: 100vw;
	height: auto;
	margin-top: 20rpx;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
}
.title-input {
    width: 80vw;
    margin-left: 20rpx;
    padding: 10rpx;
    font-size: 0.9rem;
    min-height: 1.5rem;        /* 最小高度 */
    max-height: 10rem;       /* 最大高度限制 */
}


</style>
