<template>
  <div>
    <Navigation />
    <SectionHero/>
  </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import Navigation from "../components/Navigation.vue";
import SectionHero from "../components/Section.vue";
export default {
  name: "HomeView",
  components: {
    Navigation,
    // eslint-disable-next-line vue/no-unused-components
    SectionHero,
  },
  data() {
    return {
      user: {
        user_id: this.$store.state.user_id
      }
    }
  },
  mounted() {
    console.log(this.$store.state.isAuthenticated);
    if (this.$store.state.isAuthenticated == false) {
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
