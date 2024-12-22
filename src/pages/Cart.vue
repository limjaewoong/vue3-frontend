<template>
  <div class="cart">
    <div class="container">
      <ul>
        <li v-for="(obj, idx) in state.items" :key="idx">
          <img :src="obj.imgPath" alt=""/>
          <span class="name">{{obj.name}}</span>
          <span class="price">{{libs.commaNum(obj.price - (obj.discountPer * 100))}}원</span>
          <i class="fa fa-trash" @click="remove(`${obj.id}`)"></i>
        </li>
      </ul>
      <router-link to="/order" class="btn btn-primary">구입하기</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/scripts/store";
//import {reactive} from "vue";
import libs from "@/scripts/lib";
import {ref} from "vue";

export default {
  name: "Cart",
  setup(){

    const state = ref({
      items : []
    })

    const load = () =>{
      if (store.state.account.id === 0) {
        alert('로그인 후 이용가능합니다.');
      }else{
        axios.get("/api/cart/items/cartItemList").then((response) => {
          state.value.items = response.data;
        })
      }
    }

    const remove = (id) =>{
      axios.delete(`/api/cart/delete/${id}`).then((response) => {
        console.log(response.data);
        load();
      })
    }


    load();

    return{
      state,
      libs,
      remove,
      load
    }
  }
}

</script>

<style scoped>
.cart ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart ul li{
  border: 1px solid #eee;
  margin-top: 25px;
  margin-bottom: 25px;
}

.cart ul li img {
  width: 200px;
  height: 150px;
}
.cart ul li .name {
  margin-left: 25px;
}
.cart ul li .price {
  margin-left: 25px;
}
.cart ul li i {
  float: right;
  font-size: 20px;
  margin-top: 65px;
  margin-right: 50px;
}

.cart .btn{
  width: 300px;
  display: block;
  margin: 0 auto;
  padding: 30px 50px;
  font-size: 20px;
}
</style>