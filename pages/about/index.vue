<template>
  <div class="about-page small-container">
    <h1 class="about-page__title page-title">
      iMAGINE YOUR DATA is a R&D initiative wondered by empathy.co
    </h1>
    <div class="about-page__body">
      <div class="about-page__slogan">{{ content.attributes.slogan }}</div>
      <div class="about-page__content">
        <!-- eslint-disable-next-line -->
        <div v-html="content.html" />
        <a href="mailto:info@imagineyourdata.com">contact us <LinkArrow /></a>
      </div>
    </div>
  </div>
</template>

<script>
import LinkArrow from '~/static/_media/link-arrow.svg?inline'
export default {
  layout: 'page',
  components: { LinkArrow },
  async asyncData() {
    const content = await import(`~/content/pages/about.md`)
    return {
      content: { ...content }
    }
  },
  head() {
    return {
      title: 'ImagineYourData - About'
    }
  }
}
</script>

<style scoped lang="scss">
.about-page {
  &__body {
    display: flex;
    padding: rem(120px) 0 rem(180px);
  }
  &__slogan {
    font-family: Lora;
    font-size: $font-size--big;
    line-height: 1.2;
    color: #747474;
    width: 50%;
    padding-right: rem(70px);
  }
  &__content {
    display: flex;
    flex-direction: column;
    font-family: Lora;
    font-size: $font-size--regular;
    line-height: 1.83;
    width: 50%;
    color: #747474;
    a {
      margin-top: rem(50px);
      font-size: $font-size--extra-small;
      font-weight: $font-weight--semibold;
      letter-spacing: 0.37px;
      color: #2e2e2e;
      display: flex;
      align-items: center;
      svg {
        height: 2.8rem;
        transition: padding $transitions-duration ease;
      }
      &:hover svg {
        padding-left: 0.5rem;
      }
    }
  }
  @media screen and (max-width: $breakpoint__tablet--max) {
    &__body {
      flex-direction: column;
      padding-bottom: rem(50px);
    }
    &__slogan {
      padding-bottom: 3rem;
    }
    &__slogan,
    &__content {
      width: 100%;
      padding-right: 0;
    }
  }
  @media screen and (max-width: $breakpoint__mobile--max) {
    &.small-container {
      width: 100%;
      .about-page__title,
      .about-page__content {
        width: 80%;
        margin: auto;
      }
      .about-page__slogan {
        padding: 3rem 10%;
        margin-bottom: 3rem;
        background: $grey-background;
      }
    }
    &__body {
      padding-top: rem(30px);
    }
    &__slogan {
      font-size: $font-size--regular-big;
    }
  }
}
</style>
