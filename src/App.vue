<template>
  <div id="app">
    <div class="main-page">
      <div class="main-page__container">
        <div class="main-page__header">
          <h1 class="main-page__title"><span>job</span>Agent</h1>
          <div class="main-page__avatar">
            <a href="#">
              <img src="./assets/avatar.svg" alt="Avatar" />
            </a>
          </div>
        </div>
        <div class="main-page__content main-content">
          <h1 class="main-content__title">Job search</h1>
          <div class="main-content__search">
            <div class="main-content__input">
              <input type="text" placeholder="Search" v-model="inputValue" />
            </div>
            <div class="main-content__filter">
              <button />
            </div>
          </div>
          <div class="main-content__sort sort-content">
            <div class="sort-content__left">Sort by:</div>
            <div class="sort-content__right" @click="assending = !assending">
              Views
              <img
                src="./assets/arrow.svg"
                alt="arrow"
                :class="{ transform: assending }"
              />
            </div>
          </div>
          <template v-if="!isLoading && filteredCards.length > 0">
            <Card
              class="main-content__cards"
              v-for="(card, index) in filteredCards"
              :key="index"
              :card="card"
            />
          </template>
          <div v-else-if="isLoading" class="loader">
            <Loader />
          </div>
          <div class="main-content__empty" v-else>Данные не найдены</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Loader from "@/components/Loader";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Card,
    Loader,
  },
  data: () => ({
    isLoading: false,
    inputValue: "",
    assending: false,
  }),
  computed: {
    ...mapGetters({
      cards: "cards",
    }),
    filteredCards() {
      let filteredCards = this.cards;
      if (this.inputValue) {
        filteredCards = this.cards.filter((card) => {
          const cardName = card.name.toUpperCase();
          const searchValue = this.inputValue.toUpperCase();
          return cardName.includes(searchValue);
        });
      }

      const sortedCards = filteredCards.sort(
        (item1, item2) => item1.views - item2.views
      );
      return this.assending ? sortedCards : sortedCards.reverse();
    },
  },
  methods: {
    ...mapActions({
      fetchCards: "fetchCards",
    }),
  },
  created() {
    this.isLoading = true;
    this.fetchCards().then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main-page {
  padding-top: 20px;

  &__container {
    padding: 0 24px;
    max-width: 1140px;
    margin: 0 auto;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 11px;
  }

  &__title {
    font-style: italic;
    font-weight: 300;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.24px;
    color: #000000;
    flex: 1;

    span {
      font-style: normal;
      color: #eeab02;
      font-weight: 800;
    }
  }

  &__avatar {
    width: 30px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}

.main-content {
  &__title {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    text-transform: uppercase;
    color: #636363;
    margin-bottom: 16px;
  }

  &__search {
    display: flex;
    align-items: center;
    margin-bottom: 11px;
  }

  &__input {
    flex: 1;
    margin-right: 8px;
    height: 40px;
    background: #eaeaea;
    border-radius: 8px;

    input {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      padding-left: 36px;
      background: url(./assets/search.svg) 13px center no-repeat;

      &::placeholder {
        font-size: 14px;
        line-height: 17px;
        color: #636363;
      }
    }
  }

  &__filter {
    width: 40px;
    height: 40px;

    button {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      background: url(./assets/filter.svg) center no-repeat, #ffc803;
      border-radius: 8px;
      transition: 0.3s all;
      cursor: pointer;
    }
  }

  &__cards {
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &__empty {
    text-align: center;
    font-size: 16px;
    line-height: 19px;
    color: #c4c4c4;
  }
}

.sort-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 31px;

  &__left {
    font-weight: bold;
    font-size: 14px;
    line-height: 17px;
    color: #636363;
  }

  &__right {
    font-size: 14px;
    line-height: 16px;
    color: #636363;
    cursor: pointer;

    img {
      margin-left: 3px;
      transition: transform 0.2s;

      &.transform {
        transform: rotate(-180deg);
      }
    }
  }
}

.loader {
  display: flex;
  justify-content: center;
}
</style>
