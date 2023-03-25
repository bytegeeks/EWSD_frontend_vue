<template>
  <div>
    <NavBar />

    <main class="container mt-5">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import NavBar from "./components/NavBar.vue";

export default defineComponent({
  components: {
    NavBar,
  },

  setup() {
    const store = useStore();

    onMounted(() => {
      const accessToken = sessionStorage.getItem("acsTkn");
      if (accessToken) {
        store.dispatch("updateLoggedIn", true);
      }
    });
  },
});
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
