<template>
    <div>
        <Navigation />
      
        <div class="container">
            <section id="hero" class="barcodeapp_select">
                <div class="row align-items-center justify-content-between scanscreen">
                    <div class="col-6 me-auto">
                        <h1>Hi, Peeps!</h1>
                        <h2>Today is a beautiful day</h2>
                    </div>
                    <div class="col-6 ms-auto text-end">
                        <img src="/assets/images/icon-login.svg" width="400px" height="400px" alt="" class="src">
                    </div>
                </div>
            </section>
        </div>
    </div>
  
</template>
  
<script>

import Navigation from "../components/Navigation.vue";
export default {
    name: "ScanScreen",
    components: {
      Navigation,
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
  