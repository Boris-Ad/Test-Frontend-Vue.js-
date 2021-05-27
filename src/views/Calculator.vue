<template>
  <div class="container">
    <div class="container__card card">
      <div @click="$router.push({ name: 'Home' })" class="card-close"></div>
      <h3 class="card-title">Налоговый вычет</h3>
      <p class="card-text">
        Используйте налоговый вычет чтобы погасить ипотеку досрочно. <br />
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
      <div class="card-group-item">
        <p class="card-group-item__text">Что уменьшаем?</p>
        <button class="button card-group-item__red-button">Платёж</button>
        <button class="button card-group-item__grey-button">Срок</button>
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
}
.card-close {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 16px;
  right: 16px;
  background-image: url("../assets/images/jam_close.svg");
  cursor: pointer;
}
.container__card {
  margin: 0px auto;
  padding: 2em;
  background: #ffffff;
  border-radius: 30px;
  width: 552px;
  box-sizing: border-box;
  position: relative;

  .card-title {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 28px;
    line-height: 40px;
  }
  .card-text {
    color: #808080;
    font-size: 14px;
    line-height: 24px;
    margin: 1.4em 0px;
  }
  .card-red-text {
    display: inline-block;
    margin-top: 0.5em;
    margin-bottom: 1em;
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
    margin-top: 0;
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
  .card-group-item {
    display: flex;
    align-items: center;

    &__red-button {
      padding: 6px 12px;
      font-size: 14px;
      line-height: 24px;
      border-radius: 50px;
      margin-right: 1em;
      background: $red-background;
      color: #ffffff;

      &:hover {
        background: $red-button-hover-click;
      }
    }
    &__grey-button {
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
    &__text {
      margin: 0;
      margin-right: 2em;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: $text-color;
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
    transition: margin-top 1s ease-in;
  }

  .checkboxes-enter-from,
  .checkboxes-leave-to {
    margin-top: -50%;
  }
}
</style>