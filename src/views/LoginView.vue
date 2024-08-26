<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="username" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      <div v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const username = ref('')
  const password = ref('')
  const errorMessage = ref(null)
  const router = useRouter()
  const route = useRoute()
  
  const handleLogin = () => {
    // Hardcoded credentials for demonstration purposes
    const validUsername = 'admin'
    const validPassword = 'password'
  
    if (username.value === validUsername && password.value === validPassword) {
      localStorage.setItem('isAuthenticated', 'true')
      router.push(route.query.redirect || '/about')
    } else {
      errorMessage.value = 'Invalid username or password'
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .login-container h1 {
    margin-bottom: 20px;
  }
  
  .mb-3 {
    margin-bottom: 15px;
  }
  </style>