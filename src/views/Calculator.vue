<template>
  <div class="container">
    <div class="container__card card">
      <div @click="$router.push({ name: 'Home' })" class="card-close"></div>
      <h3 class="card-title">Налоговый вычет</h3>
      <p class="card-text">
        Используйте налоговый вычет чтобы погасить ипотеку досрочно.
        <br class="breakpoints-one" />
        Размер налогового вычета составляет не более 13% от своего официального
        годового дохода.
      </p>
      <the-input v-model="inputText"></the-input>
      <p @click="makeCalc" class="card-red-text">Рассчитать</p>
      <div class="card-popup">
        <transition name="checkboxes">
          <div v-if="mounthlySalary" class="card-popup__overlay">
            <p class="overlay-title">
              Итого можете внести в качестве досрочных:
            </p>
            <the-checkbox :mounthlySalary="mounthlySalary"></the-checkbox>
          </div>
        </transition>
      </div>
      <div class="card-group">
        <p class="card-group__text">Что уменьшаем?</p>
        <div class="card-group__button-group">
          <button class="button payment-button">Платёж</button>
          <button class="button time-button">Срок</button>
        </div>
      </div>
      <button @click="clear" class="button card-add-button">Добавить</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import TheInput from "../components/TheInput.vue";
import TheCheckbox from "../components/TheCheckbox.vue";
import { getNumber } from "../assets/js/regexp";

export default {
  components: { TheInput, TheCheckbox },
  name: "Calculator",
  setup() {
    const store = useStore();
    const inputText = ref("");
    const payments = ref([]);
    const mounthlySalary = ref(0);

    if (store.state.storageInputText) {
      inputText.value = store.state.storageInputText;
    }

    function makeCalc() {
      if (inputText.value) {
        store.state.inputDisabled = true;
        mounthlySalary.value = getNumber(inputText.value);
        store.state.storageInputText = inputText.value;
      } else {
        store.state.inputDanger = true;
      }
    }
    function clear() {
      inputText.value = "";
      mounthlySalary.value = 0;
      store.state.inputDisabled = false;
      store.state.storageInputText = "";
    }

    return { inputText, makeCalc, payments, mounthlySalary, clear };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/config.scss";

.container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding-top: 120px;
  padding-bottom: 60px;
  background: $grey-background;

  @media (max-width: 576px) {
   padding: 0;
  }

}
.card-close {
  position: absolute;
  width: 18px;
  height: 18px;
  top: 27px;
  right: 27px;
  background-image: url("../assets/images/close_big.svg");
  cursor: pointer;

  @media (max-width: 576px) {
    width: 12px;
    height: 12px;
    top: 22px;
    right: 22px;
    background-image: url("../assets/images/close_small.svg");
  }
}
.container__card {
  margin: 0px auto;
  padding: 2em;
  background: #ffffff;
  border-radius: 30px;
  width: 552px;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    max-width: 453px;
  }
  @media (max-width: 576px) {
    max-width: 100%;
    border-radius: 0px;
    padding: 32px 16px;
    min-height: 100vh;
  }

  .card-title {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 28px;
    line-height: 40px;
    @media (max-width: 576px) {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
    }
  }
  .card-text {
    color: $text-grey;
    font-size: 14px;
    line-height: 24px;
    margin: 16px 0px 24px;

    @media (max-width: 576px) {
      font-size: 12px;
      line-height: 16px;
    }

    .breakpoints-one {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
  .card-red-text {
    display: inline-block;
    margin-top: 0.5em;
    margin-bottom: 0px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    color: $red-text-color;
    user-select: none;
    &:hover {
      color: $red-text-hover-color;
    }
    &:active {
      color: $red-text-click-color;
    }
  }
  .card-popup {
    overflow: hidden;
  }
  .overlay-title {
    margin: 0;
    margin-top: 16px;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #000000;
  }
  .button {
    display: inline-block;
    border: none;
    outline: none;
    user-select: none;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    transition: background 0.35s ease-out;
  }
  .card-group {
    display: flex;
    align-items: center;
    margin-top: 24px;
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
    }

    &__text {
      margin: 0;
      margin-right: 2em;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: $text-color;

      @media (max-width: 768px) {
        margin-right: 76px;
      }
      @media (max-width: 576px) {
        margin-bottom: 30px;
      }
    }
  }
  .card-group__button-group {
    .payment-button {
      padding: 6px 12px;
      font-size: 14px;
      line-height: 24px;
      border-radius: 50px;
      margin-right: 16px;
      background: $red-background;
      color: #ffffff;
      @media (max-width: 576px) {
        margin-right: 8px;
        margin-bottom: 112px;
      }
      &:hover {
        background: $red-button-hover-click;
      }
    }
    .time-button {
      padding: 6px 12px;
      font-size: 14px;
      line-height: 24px;
      border-radius: 50px;
      background: #eef0f2;
      color: #000000;

      &:hover {
        background: $tags-hover-background;
      }
    }
  }
  .card-add-button {
    width: 100%;
    padding: 1em;
    margin-top: 40px;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    background: $red-background;
    box-shadow: 0px 0px 24px rgba(234, 0, 41, 0.33);
    border-radius: 6px;

    @media (max-width: 576px) {
      position: absolute;
      display: block;
      width: calc(100% - 32px);
      left: 16px;
      right: 16px;
      bottom: 32px;
    }
    &:hover {
      background: $red-button-hover-click;
    }
    &:active {
      background: $red-button-hover-click;
    }
  }

  .checkboxes-enter-active {
    transition: margin-top 0.6s ease-out;
  }
  .checkboxes-leave-active {
    transition: margin-top 0.5s ease-in;
  }

  .checkboxes-enter-from,
  .checkboxes-leave-to {
    margin-top: -100%;
  }
}
</style>