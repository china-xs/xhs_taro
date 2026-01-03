import Taro from '@tarojs/taro'

const BASE_URL = process.env.TARO_APP_API_BASE || ''

const buildUrl = (url: string) => {
  if (/^https?:\/\//i.test(url)) {
    return url
  }
  return `${BASE_URL}${url}`
}

export const request = async <T = any>(options: Taro.request.Option): Promise<T> => {
  const token = Taro.getStorageSync('token')
  const header = {
    ...(options.header || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }

  const response = await Taro.request<T>({
    ...options,
    url: buildUrl(options.url),
    header
  })

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new Error(response.errMsg || `Request failed: ${response.statusCode}`)
  }

  const data: any = response.data
  if (data && typeof data === 'object' && 'code' in data) {
    if (data.code !== 0) {
      throw new Error(data.message || 'Request error')
    }
    return (data.data ?? data) as T
  }

  return data as T
}
