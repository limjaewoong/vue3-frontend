<template>

  <div class="card shadow-sm">
    <span class="img" :style="{backgroundImage: `url(${props.item.imgPath})`}"></span>
    <div class="card-body">
      <p class="card-text">
        <span>{{ props.item.name }}</span>
        <span :style="{marginLeft:3 +'px'}" class="discount badge bg-danger">{{ props.item.discountPer }}%</span>
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary" @click="addToCart(`${props.item.id}`)">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </button>
        <small class="price text-muted">{{ libs.commaNum(props.item.price) }}원</small>

        <small class="real text-danger">{{ libs.commaNum(props.item.price - (props.item.discountPer * 100)) }}%</small>
      </div>
    </div>
  </div>

</template>

<script setup>
import {defineProps, reactive} from 'vue';
import libs from '@/scripts/lib';
import axios from "axios";
import store from "@/scripts/store";

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const addToCart = (id) => {
  if (store.state.account.id === 0) {
    alert('로그인 후 이용가능합니다.');
    return;
  }

  formData.form.memberId = store.state.account.id;
  formData.form.itemId = id;

  axios.post(`/api/cart/items/${id}`,formData.form).then(({data}) => {
    console.log(data);
    window.alert('장바구니 담겼습니다.');
  }).catch(() => {
    window.alert('장바구니 담기에 실패했습니다.');
  })
}

const formData = reactive({
  form :{
    memberId : ''
    ,itemId : ''
  }
})
</script>

<style scoped>
.card .img {
  display: inline-block;
  width: 100%;
  height: 280px;
  background-size: cover;
  background-position: center center;
}

.card .card-body .price {
  text-decoration: line-through;
}
</style>