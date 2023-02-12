
<template>
  <div class="inside_scanbar d-flex">
    <div class="leftside_v_menu">
      <LeftSideMenu></LeftSideMenu>
    </div>
    <div class="rightside_div">
      <Navigation />
      <div class="main_content">
        <div class="container text-start">
          <a href="/home" class="btn_back">Back</a>
          <div class="purchase_order">
            <h2>Master Part
              <div class="d-flex">
                <a href="printlabel" class="print_btn" data-bs-toggle="modal" data-bs-target="#printlabel">
                  Print Label
                </a>
              </div>
              <div class="d-flex">
                <input type="text" class="form-control" v-model="searchTerm" placeholder="Search"/>
              </div>
            </h2>
            <div class="table-responsive">
              <table class="table table-borderless purchase_table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>No</th>
                    <th class="text-center">Product Name</th>
                    <th class="text-center">Product Category</th>
                    <th class="text-center">Product Number</th>
                    <th class="text-center">Product UoM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in currentPageItems" :key="index">
                    <td>
                      <input type="checkbox" v-model="selectedItems" :value="item" @change="onSelectionChange" />
                    </td>
                    <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.productCategory }}</td>
                    <td>{{ item.productNumber }}</td>
                    <td>{{ item.productUom }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="pagination">
                <button class="btn btn-secondary" @click="previousPage" :disabled="currentPage === 1">Previous</button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button class="btn btn-primary ms-4" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import Navigation from "../components/Navigation.vue";
// eslint-disable-next-line no-unused-vars
import LeftSideMenu from "../components/LeftSideMenu.vue";
export default {
  name: "MasterPartView",
  components: {
    Navigation,
    LeftSideMenu,
  },
  data() {
    return {
      masterparts: [],
      currentPage: 1,
      itemsPerPage: 10,
      searchTerm: ''
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.masterparts.length / this.itemsPerPage);
    },
    currentPageItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.masterparts.slice(start, start + this.itemsPerPage);
    }
  },
  mounted() {
    this.getMasterPart()
  },
  methods: {
    async getMasterPart() {
      this.$store.commit('setIsLoading', true)

      axios.
        get('/v1/product-product/')
        .then(response => {
          console.log(response.data.data)
          this.masterparts = response.data.data
        })
        .catch(error => {
          console.log(error, 'asasa')
          this.$router.replace({ name: "login" });
        })
      this.$store.commit('setIsLoading', false)
    },
    previousPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    }
  },

};
</script>
