<template>
  <div>Logging out...</div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Logout-View",
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();

    onMounted(() => {
      if (store.state.loggedIn) {
        sessionStorage.removeItem("acsTkn");
        store.dispatch("updateLoggedIn", false);

        router.replace({ path: "/login" });
      } else {
        router.replace({ path: "/login" });
      }
    });

    return {};
  },
});
</script>
