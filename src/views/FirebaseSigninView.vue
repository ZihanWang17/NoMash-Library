<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  const auth = getAuth();
  
  const signin = () => {
  if (!email.value || !password.value) {
    console.error("Email and password cannot be empty.");
    return;
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Signin Successful!");
      router.push("/");
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);  // Log the full error message
      console.error("Error code:", error.code);  // Log the error code (e.g., auth/invalid-credential)
    });
};
  </script>