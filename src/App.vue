<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div class="main-container">
    <header v-if="showHeader">
      <BHeader />
    </header>
    <main class="main-box">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import BHeader from './components/BHeader.vue';
import CountBookAPI from './views/CountBookAPI.vue';

export default {
  name: 'App',
  components: {
    BHeader,
    CountBookAPI
  },
  computed: {
    showHeader(){
      return this.$route.name !== 'CountBookAPI';
    }
  }
};
</script>

<style scoped>
.main-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 10px;
}

.main-box {
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>