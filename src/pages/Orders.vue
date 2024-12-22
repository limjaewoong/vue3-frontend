<template>
  <div class="order">
    <div class="container">
      <table class="table table-borderless">
        <thead>
          <tr>
            <td>번호</td>
            <td>주문자</td>
            <td>주소</td>
            <td>결제수단</td>
            <td colspan="4" style="text-align: center">구입항목</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(obj, idx) in state.orders" :key="idx">
            <td>{{state.orders.length - idx}}</td>
            <td>{{obj.name}}</td>
            <td>{{obj.address}}</td>
            <td>{{obj.payment}}</td>
            <td>
              <div v-for="(obj2, idx2) in obj.items" :key="idx2">
                <table>
                  <colgroup>
                    <col width="20%"/>
                    <col width="20%"/>
                    <col width="20%"/>
                  </colgroup>
                  <tbody>
                    <tr>
                      <td class="product_img"><img :src="obj2.imgPath" alt="이미지"/></td>
                      <td>{{obj2.name}}</td>
                      <td>{{ libs.commaNum(obj2.price - (obj2.discountPer * 100)) }}원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import axios from "axios";
import libs from "@/scripts/lib";
export default {
  name: "Order"
  , setup() {

    const state = reactive({
      orders : []
    })

    const load = () =>{
      axios.get("/api/orders").then(res => {
        console.log(res);

        res.data.forEach(item => {
          item.items = JSON.parse(item.items);
          state.orders.push(item);
        })
      })
    }

    load();

    return{
      state
      ,load
      ,libs
    }
  }
}
</script>

<style scoped>
.total-price {
  font-weight: bold;
}

.product_img img{
  display: inline-block;
  width: 100px;
  height: 50px;
}
.table tbody{
  border-top: 1px solid #eee;
}
</style>