<template>
  <div class="order">
    <div class="container">
      <main>
        <div class="py-5 text-center"><h2>주문하기</h2>
          <p class="lead">Below is an example form built entirely with Bootstrap’s form controls. Each required form
            group has a validation state that can be triggered by attempting to submit the form without completing
            it.
          </p>
        </div>
        <div class="row g-5">
          <div class="col-md-5 col-lg-4 order-md-last"><h4
              class="d-flex justify-content-between align-items-center mb-3"><span
              class="text-primary">구입 목록</span><span
              class="badge bg-primary rounded-pill">{{ state.items.length }}</span></h4>
            <ul class="list-group mb-3">
              <li class="list-group-item d-flex justify-content-between lh-sm" v-for="(obj, idx) in state.items"
                  :key="idx">
                <div><h6 class="my-0"></h6><small class="text-body-secondary">{{ obj.name }}</small>
                </div>
                <span class="text-body-secondary">{{ libs.commaNum(obj.price - (obj.discountPer * 100)) }}원</span>
              </li>

            </ul>
            <div class="text-center total-price">
              {{ libs.commaNum(computedPrice) }}원
            </div>
          </div>
          <div class="col-md-7 col-lg-8"><h4 class="mb-3">주문자 정보</h4>
            <div class="needs-validation" novalidate="">
              <div class="row g-3">
                <div class="col-12"><label for="username" class="form-label">이름</label>
                  <input type="text"
                         class="form-control"
                         id="username"
                         v-model="state.form.name">
                  <div class="invalid-feedback"> Your username is required.</div>

                </div>
                <div class="col-12"><label for="address" class="form-label">주소</label><input type="text"
                                                                                             class="form-control"
                                                                                             id="address"
                                                                                             v-model="state.form.address">
                  <div class="invalid-feedback"> Please enter your shipping address.</div>
                </div>
              </div>
              <hr class="my-4">
              <hr class="my-4">
              <h4 class="mb-3">결제 수단</h4>
              <div class="my-3">
                <div class="form-check"><input id="card" name="payment" type="radio" class="form-check-input"
                                               value="card" v-model="state.form.payment"><label class="form-check-label"
                                                                                                for="card">신용카드
                </label></div>
                <div class="form-check"><input id="bank" name="payment" type="radio" class="form-check-input"
                                               value="bank" v-model="state.form.payment"><label class="form-check-label"
                                                                                                for="bank">무통장입금</label>
                </div>
                <br/>
                <label for="cc-number" class="form-label">카드 번호</label>
                <input type="text" class="form-control" id="cc-number" v-model="state.form.cardNumber">
                <div class="invalid-feedback"> Credit card number is required</div>
              </div>

              <hr class="my-4">
              <button type="button" class="w-100 btn btn-primary btn-lg" @click="submit">결제하기</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import axios from "axios";
import store from "@/scripts/store";
import libs from "@/scripts/lib"
import router from "@/router";

export default {
  name: "Order"
  , setup() {

    const state = ref({
      items: []
      , form: {
        name: ''
        , address: ''
        , payment: ''
        , cardNumber: ''
        , items: ''
      }
    })

    const load = () => {
      if (store.state.account.id === 0) {
        alert('로그인 후 이용가능합니다.');
      } else {
        axios.get("/api/cart/items/cartItemList").then((response) => {
          state.value.items = response.data;
        })
      }
    }

    load();

    const computedPrice = computed(() => {
      let result = 0;
      state.value.items.forEach((item) => {
        result += item.price - (item.discountPer * 100);
      })
      return result;
    })

    const submit = () => {

      //state.value.items.forEach((item) => {
      //  state.value.form.items += state.value.form.items === '' ? item.id : ','+item.id;
      //})
      const args = JSON.parse(JSON.stringify(state.value.form));
      args.items = JSON.stringify(state.value.items);
      axios.post("/api/orders", args).then(() => {
        console.log('주문성공');
        window.alert('주문이 완료되었습니다.');
        router.push({params : {aa:1,bb:2} , path:"/orders"});
      }).catch(() => {
        console.log('주문오류');
      })
    }

    return {
      state
      , load
      , libs
      , computedPrice
      , submit
    }
  }
}
</script>

<style scoped>
.total-price {
  font-weight: bold;
}
</style>