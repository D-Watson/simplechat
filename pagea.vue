<template>
  <view class="box">
    <view v-for="i in 20" :key="i" class="card">精选内容 {{i}}</view>
  </view>
</template>

<style lang="scss">
.box{ padding: 20rpx; }
.card{
  background: #f5f5f5;
  margin-bottom: 20rpx;
  padding: 30rpx;
  border-radius: 12rpx;
}
</style>