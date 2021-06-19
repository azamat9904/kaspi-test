<template>
  <div class="cards">
    <div class="cards__item">
      <div class="cards__left">
        <img :src="card.image" alt="img" />
      </div>
      <div class="cards__right">
        <h3 class="cards__title">{{ card.name }}</h3>
        <div class="cards__info">
          <div class="cards__label">Company:</div>
          <div class="cards__text">{{ card.company }}</div>
        </div>
        <div class="cards__info">
          <div class="cards__label">Location:</div>
          <div class="cards__text">
            {{ card.location.city }}, {{ card.location.country }}
          </div>
        </div>
        <div class="cards__wrapper">
          <div class="cards__additions">
            <img src="../assets/watch.svg" alt="watch" />
            <span>Posted {{ card.postedDaysAgo }} days ago</span>
          </div>
          <div class="cards__additions">
            <img src="../assets/eye.svg" alt="eye" />
            <span>{{ card.views }} Views</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({
        name: "",
        company: "",
        location: {
          country: "",
          city: "",
        },
        postedDaysAgo: null,
        views: null,
      }),
    },
  },
};
</script>
<style lang="scss" scoped>
.cards {
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(33, 33, 33, 0.16);
  border-radius: 8px;
  padding: 16px;

  &__item {
    display: flex;
  }

  &__left {
    margin-right: 16px;
  }

  &__right {
    flex: 1;
  }

  &__title {
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: #636363;
    margin-bottom: 8px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 4px;
    }
  }

  &__label {
    font-size: 12px;
    line-height: 14px;
    color: #636363;
  }

  &__text {
    font-size: 12px;
    line-height: 14px;
    text-align: right;
    text-decoration-line: underline;
    color: #e06d06;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
  }

  &__additions {
    display: flex;
    align-items: center;
    margin-top: 24px;

    img {
      margin-right: 8px;
      width: 14px;
      height: 14px;
    }

    span {
      font-size: 12px;
      line-height: 14px;
      color: #636363;
    }
  }
}
</style>