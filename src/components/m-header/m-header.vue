<template>
  <div class="m-header border-1px">
    <router-link tag="div" class="mine icon-arrow_lift" to="/home">
    </router-link>
    <h1 class="text">hello</h1>
  </div>
</template>
<script>
export default {
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/`
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-sup-theme
    font-size: 0
    border-1px(rgba(7, 17, 27, 0.1))
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      left: 10px
      top: 0
      display: block
      padding: 10px
      font-size: 20px
      color: $color-sup-theme
</style>