<template>
    <router-link to="/home"><button class="btn btn-primary">Back</button></router-link>
    <table id="example" class="table table-striped" style="width:100%">
      <thead>
        <tr>
          <th>Product name</th>
          <th>product Category</th>
          <th>Product Number</th>
          <th>Product Cost</th>
          <th>Product UoM</th>
        </tr>
      </thead>
      <tbody>
        <tr 
        v-for="mp in masterparts" v-bind:key="mp.productId">
          <td>{{ mp.productName }}</td>
          <td>{{ mp.productCategory }}</td>
          <td>{{ mp.productNumber }}</td>
          <td>{{ mp.productCost }}</td>
          <td>{{ mp.productUom }}</td>
        </tr>

      </tbody>
      
    </table>
</template>

<script>
import axios from 'axios'

export default {
  name: "MasterPartView",
  data(){
    return{
      masterparts:[]
    }
  },
  mounted() {
    this.getMasterPart()
  },
  methods: {
    async getMasterPart(){
      this.$store.commit('setIsLoading', true)

      axios.
      get('/v1/product-product?limit=2')
        .then(response=>{
          console.log(response.data.data)
            this.masterparts = response.data.data
        })
        .catch(error =>{
          console.log(error,'asasa')
          this.$router.replace({ name: "login" });
        })
      this.$store.commit('setIsLoading', false)
    }
  },

};
</script>
