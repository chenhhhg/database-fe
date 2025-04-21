<template>
  <div class="login-container">
    <div v-if="isLogin" class="login">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="formData.username" required />
        </div>

        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="formData.password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
    <div v-else class="register">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="formData.username" required />
        </div>

        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="formData.password" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
    <div class="toggle-wrapper">
      <span class="toggle-text">
        {{ isLogin ? '新用户？' : '已有账号？' }}
        <a href="javascript:;" class="toggle-link" @click="isLogin = !isLogin">
          {{ isLogin ? '立即注册' : '立即登录' }}
        </a>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'


import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const formData = ref({
  username: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')
const isLogin = ref(true)

const handleSubmit = async () => {
  if (!formData.value.username || !formData.value.password) {
    errorMessage.value = '请输入用户名和密码'
    return
  }

  if (isLogin.value) {
    try {
      loading.value = true
      errorMessage.value = ''
        if (formData.value.password == 'null'){
            formData.value.password = ''
        }
      // 替换为你的实际API端口和路径
      const response = await axios.post(proxy.$apiBaseUrl+'/api/login', formData.value)

      // 处理成功响应
      console.log('登录成功:', response.data)
      // 这里可以添加跳转逻辑，例如：
      // router.push('/dashboard');
    } catch (error) {
      errorMessage.value = '登录失败: '
      if (error.response) {
        // 服务器返回的错误
        errorMessage.value += error.response.data.message || '未知错误'
      } else {
        errorMessage.value += '网络错误'
      }
    } finally {
      loading.value = false
    }
  } else {
    try {
      loading.value = true
      errorMessage.value = ''

      // 替换为你的实际API端口和路径
      const response = await axios.post(proxy.$apiBaseUrl+'/api/register', formData.value)

      // 处理成功响应
      console.log('注册成功:', response.data)
      // 这里可以添加跳转逻辑，例如：
      // router.push('/dashboard');
    } catch (error) {
      errorMessage.value = '注册失败: '
      if (error.response) {
        // 服务器返回的错误
        errorMessage.value += error.response.data.message || '未知错误'
      } else {
        errorMessage.value += '网络错误'
      }
    } finally {
      loading.value = false
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 100%;
  margin: 2rem auto;
  padding: 3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.toggle-wrapper {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #666;
}

.toggle-link {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  padding: 0 2px;
}

.toggle-link:hover {
  color: #0056b3;
}

.toggle-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #007bff;
  transition: width 0.2s ease;
}

.toggle-link:hover::after {
  width: 100%;
}
</style>
