<template>
    <div class="access-denied-container">
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page. Please <router-link to="/login">login</router-link>.</p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .access-denied-container {
    text-align: center;
    padding: 50px;
  }
  </style>