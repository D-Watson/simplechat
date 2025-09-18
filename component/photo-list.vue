<template>
  <view class="box">
	  <!-- 筛选项	 -->
	<view>
		
	</view>
     <view v-for="(item, i) in cardList" :key="i" class="card">
		 <UserInfoEnchanced
		   :avatarUrl="item.userInfo.portrait"
		   :name="item.userInfo.userName"
		   description="发布于2天前"
		   size="medium"
		   layout="horizontal"
		   :tags="item.userInfo.tags"
		 />
		 <view class="card-content">
			 <!-- 作品封面图 -->
			 <image class="cover"  :src="item.coverImages[0]" mode="aspectFill">
				 
			 </image>
			 <!-- 擅长风格 -->
			 <view class="styles">
				<text class="styles-title">擅长风格</text>
				<view v-for="(scard,idx) in item.photoStyles" :key="idx" class="styles-card">
					<!-- 头图 -->
					<image class="first-photo" :src="scard.firstPhoto" mode="aspectFill">
						
					</image>
					<view class="styles-summerize">
						<view class="styles-top">
							<!-- 风格 -->
							<view>
								{{scard.styleLocation}}
							</view>
							<!-- 价格 -->
							<view>
								{{'¥'+scard.price+'/h'}}
							</view>
						</view>
						<view>
							<!-- 预约按钮 -->
							<view>
								
							</view>
							<!-- 查看作品按钮 -->
							<view>
								
							</view>
						</view>
					</view>
				</view>
				<!-- 接单范围和时间 -->
				<view>
					
				</view>
				<!-- 推荐人数和查看详情 -->
				<view>
					
				</view>
				
			 </view>
		 </view>
       </view>
	   
  </view>
</template>

<script setup lang="ts">
import {ref, reactive } from 'vue';
import UserInfoEnchanced from '../component/user_info.vue';
import * as type from "../api/request";

// 字段定义
const cardList = reactive<type.PhotoListCard[]>([]);


//内部方法



// 请求接口

const getCardList = (page: Number, pageSize: Number)=>{
	// 请求服务端获取卡片列表
	for (let i = 0; i < 10; i++) {
		var tags = ["萌新","当日返图sdfsdfs"] as string[]
		var imgs = ["https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp"] as string[]
		var user: type.UserInfo = {
			"userId":"",
			"deviceId":"",
			"portrait":"https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp",
			"userName":"aka-cookie*",
			"tags": tags
		}
		var photoStyle1: type.PhotoStyle={
			styleLocation:"日系甜美",
			price: 100,
			firstPhoto: "https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp"
		}
		var photoStyle2: type.PhotoStyle={
			styleLocation:"日系甜美",
			price: 100,
			firstPhoto: "https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp"
		}
		var photoStyleList: type.PhotoStyle[]=[]
		photoStyleList.push(photoStyle1)
		photoStyleList.push(photoStyle2)
		var card : type.PhotoListCard = {
			userInfo: user as type.UserInfo,
			coverImages: imgs,
			photoStyles: photoStyleList
		}
		cardList.push(card)
	}
	
}
getCardList(0,10);
</script>

<style lang="scss">
.box{ padding: 20rpx; }
.card{
  background: #f5f5f5;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
  display: flex;
  flex-direction: column;
  &-content{
	  display: flex;
	  margin-top: 10px;
  }
}
.cover{
	width:50vw;
	height: 55vw;
	object-fit: cover;
	border-radius: 10px;
	border: 3px solid white;
	
}
.styles{
	width: 35vw;
	display: flex;
	padding: 0 20px;
	flex-direction: column;
	align-items: center;
	font-size: 0.8rem;
	&-card{
		width: 40vw;
		height: 15vw;
		display: flex;
		align-items: center;
		border: 1px solid black;
		margin-top: 10rpx;
	}
}
.first-photo{
	width: 10vw;
	height: 15vw;
}
</style>