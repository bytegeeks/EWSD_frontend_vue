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
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("academic_year_id");
        sessionStorage.removeItem("academic_year_name");
        sessionStorage.removeItem("academic_year_active");
        sessionStorage.removeItem("academic_year_start_date");
        sessionStorage.removeItem("academic_year_closure_date");
        sessionStorage.removeItem("academic_year_final_closure_date");
        sessionStorage.removeItem("role");
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
