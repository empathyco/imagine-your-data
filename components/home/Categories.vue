<template>
  <div class="categories">
    <div
      :class="{
        'categories--open': open
      }"
    >
      <div class="categories__list container">
        <div
          id="all"
          class="categories__list-item categories__list-item--active"
          @click="activateCategoryFilter('')"
        >
          All
        </div>
        <div
          v-for="(category, index) in categories"
          :id="category"
          :key="index"
          class="categories__list-item"
          @click="activateCategoryFilter(category)"
        >
          {{ category }}
        </div>
        <div class="categories__selected-chevron">
          <Chevron />
        </div>
      </div>
      <div class="categories__open-chevron">
        <Chevron />
      </div>
    </div>
  </div>
</template>

<script>
import { isDesktop } from '~/assets/js/utils'
import Chevron from '~/static/_media/chevron.svg?inline'

export default {
  name: 'Categories',
  components: { Chevron },
  props: {
    categories: {
      type: Array,
      default() {}
    },
    currentCategory: {
      type: String,
      default() {}
    },
    filterByCategory: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    activateCategoryFilter(category) {
      const { currentCategory } = this.$props
      if (!isDesktop()) {
        this.open = !this.open
      }
      if (
        (!category && currentCategory) ||
        (isDesktop() && currentCategory === category)
      ) {
        this.filter('all', '')
      } else if (currentCategory !== category) {
        this.filter(category, category)
      }
    },
    filter(id, category) {
      const { filterByCategory } = this.$props
      const categories = Array.from(
        document.querySelectorAll('.categories__list-item')
      )
      categories.forEach((category) => {
        category.classList.remove('categories__list-item--active')
      })
      const targetCategory = document.getElementById(id)
      targetCategory.classList.toggle('categories__list-item--active')
      filterByCategory(category)
    }
  }
}
</script>

<style scoped lang="scss">
.categories {
  position: relative;
  z-index: 1;
  &__list {
    transition: all 0.2s ease;
    display: flex;
    flex-wrap: wrap;
    padding-top: rem(30px);
    justify-content: center;
    &-item {
      display: flex;
      text-transform: uppercase;
      text-align: center;
      opacity: 0.3;
      color: $corporative-light-blue;
      padding: rem(15px) 1rem;
      cursor: pointer;
      transition: opacity $transitions-duration ease;
      &:before {
        content: 'showing\00a0';
        display: none;
        transition: opacity $transitions-duration ease;
      }
      &:hover {
        opacity: 1;
      }
      &--active {
        opacity: 1;
        &:before {
          display: block;
        }
      }
    }
  }
  &__selected-chevron {
    display: none;
    position: absolute;
    bottom: 0;
    transition: all $transitions-duration ease;
    width: 20px;
    height: 20px;
  }
  &__open-chevron {
    display: none;
    width: 100%;
    text-align: center;
    position: relative;
    svg {
      transition: all $transitions-duration ease;
    }
  }
  &__selected-chevron,
  &__open-chevron {
    svg {
      transform: rotate(90deg);
      g {
        use {
          fill: $corporative-light-blue;
        }
        rect {
          display: none;
        }
      }
    }
  }
  &--open {
    .categories__open-chevron svg {
      display: none;
    }
  }
  &--fixed {
    background: #deeef0;
    border-bottom: 2px solid $grey-background;
    position: fixed;
    top: 4.3rem;
    margin-top: 0;
    width: 100%;
    left: 0;
    .categories__list {
      padding-top: 0;
      .categories__list-item {
        color: #292929;
      }
    }
    svg g use {
      fill: #292929;
    }
  }
  @media screen and (max-width: $breakpoint__small-desktop--max) {
    margin-top: 0;
  }
  @media screen and (max-width: $breakpoint__tablet--max) {
    z-index: auto;
    transition: all $transitions-duration ease;
    &__open-chevron {
      display: block;
    }
    &--fixed {
      transition: all $transitions-duration--short ease;
      z-index: 1;
      top: rem(80px);
      padding: 0.5rem 0 0.3rem;
    }
    &--open {
      .categories__list {
        padding: 0.5rem 0;
        .categories__list-item {
          display: inline-block;
          padding: 0.5rem 0;
        }
      }
    }
    &__list {
      flex-direction: column;
      align-items: center;
      padding-top: 0;
      .categories__list-item {
        display: none;
        width: 100%;
        text-align: center;
        font-size: $font-size--caption;
        padding: 0.5rem 0 0;
        &--active {
          display: inline-block;
        }
        &:before {
          display: inline-block;
        }
        &.categories__list-item--active {
          &:before {
            display: inline-block;
          }
        }
        &:before {
          content: 'showing ';
          display: none;
        }
      }
    }
  }
}
</style>
