<template>
  <view class="index">
<!--    <text>{{ msg }}</text>-->
    <button class="index__login" @tap="goLogin">去登录</button>
  </view>
</template>

<script>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'

export default {
  setup () {
    //const msg = ref('Hello world')
    const goLogin = () => {
      Taro.navigateTo({ url: '/pages/login/index' })
    }
    return {
      // msg,
      goLogin
    }
  }
}
</script>
