<script>
import Card from "@/pages/Card3.vue";
import axios from "axios";
import {ref} from "vue";

export default {
  name: "Home",
  components: {Card},
  setup() {

    const state = ref({
      item : [
        {
          id : Number
          ,name : String
          ,imgPath : String
          ,price : Number
          ,discountPer : Number
        }
      ]
    });

    axios.get("/api/items").then(({data}) => {
       state.value.item = data;
    })

    const getItems = () =>{
    }

    //getItems();

    return {
      getItems
      ,state
    }
  }
}
</script>

<template>
  <div class="home">
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(item, idx) in state.item" :key="idx">
            <Card :item="item" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>