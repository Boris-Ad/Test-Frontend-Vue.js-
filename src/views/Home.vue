<template>
  <div class="container">
    <button @click="toCalculator" class="button">Налоговый вычет</button>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
  name: "Home",
  setup() {
    const router = useRouter()
    function toCalculator(){
      router.push({name:'Calculator'})
    }
    return {toCalculator};
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/config.scss";

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $red-background;
  display: flex;
 justify-content: center;
  align-items: center;
}
.button{
    display: inline-block;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 16px;
    font-style: normal;
    line-height: 24px;
    background: $red-background;
    text-align: center;
    border: 1px solid #FFFFFF;
    border-radius: 6px;
    padding: 16px 32px;
    cursor: pointer;
    transition: background 0.35s ease-out;
    &:hover{
       background: $red-button-hover-click;
    }
      &:active{
       background: $red-button-hover-click;
    }
}
</style>
