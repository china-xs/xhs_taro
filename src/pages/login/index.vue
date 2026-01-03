<template>
  <view class="login">
    <view class="login__header">
      <text class="login__title">手机号登录</text>
      <text class="login__subtitle">请授权获取手机号用于登录</text>
    </view>

    <view class="login__card">
      <text class="login__label">授权说明</text>
      <text class="login__desc">我们仅用于账号登录与安全验证</text>
      <button
        class="login__button"
        open-type="getPhoneNumber"
        @getphonenumber="onGetPhoneNumber"
      >
        一键授权手机号
      </button>
      <text class="login__status">{{ status }}</text>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'
import Taro from '@tarojs/taro'
import { loginByPhone } from '../../services/auth'
import './index.scss'

export default {
  setup () {
    const status = ref('等待授权')

    const onGetPhoneNumber = async (event) => {
      const { errMsg, encryptedData, iv, code } = event.detail || {}
      if (errMsg && errMsg.includes('ok')) {
        status.value = '授权成功，正在登录...'
        Taro.showLoading({ title: '登录中' })
        try {
          const result = await loginByPhone({ encryptedData, iv, code })
          if (result && result.token) {
            Taro.setStorageSync('token', result.token)
          }
          status.value = '登录成功'
          Taro.showToast({ title: '登录成功', icon: 'success' })
          setTimeout(() => {
            Taro.navigateBack({ delta: 1 })
          }, 500)
        } catch (error) {
          status.value = '登录失败，请稍后重试'
          Taro.showToast({ title: '登录失败', icon: 'none' })
        } finally {
          Taro.hideLoading()
        }
        return
      }
      status.value = '授权未完成，请重试'
      Taro.showToast({ title: '授权失败', icon: 'none' })
    }

    return {
      status,
      onGetPhoneNumber
    }
  }
}
</script>
