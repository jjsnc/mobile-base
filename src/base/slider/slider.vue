<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :key='index' :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
    <div class="current-book">
      <span class="book-name"> {{ bookInfo[currentPageIndex].bookName }}</span>
      <span class="user-name">{{ bookInfo[currentPageIndex].userName }}</span>
    </div>
    <div class="book-type">
      <span class="ele-book item" :class="{ active: selectType==0 }" @click='selectType=0'>电子书</span>
      <span class="har-book item" :class="{ active: selectType==1 }" @click='selectType=1'>精装书籍</span>
    </div>
    <div class="price">
      $23.40
    </div>
  </div>
</template>
<script>
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0,
      bookInfo: [{
          bookName: '时代变迁1',
          userName: '浪恩1'
        },
        {
          bookName: '时代变迁2',
          userName: '浪恩2'
        },
        {
          bookName: '时代变迁3',
          userName: '浪恩3'
        },
        {
          bookName: '时代变迁4',
          userName: '浪恩4'
        }
      ],
      selectType: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider || !this.slider.enabled) {
        return
      }
      clearTimeout(this.resizeTimer)
      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }
        this.refresh()
      }, 60)
    })
  },
  activated() {
    if (this.slider) {
      this.slider.enable()
      let pageIndex = this.slider.getCurrentPage().pageX
      this.slider.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    }
  },
  deactivated() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  methods: {
    refresh() {
      if (this.slider) {
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    },
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', this._onScrollEnd)

      this.slider.on('touchend', () => {
        if (this.autoPlay) {
          this._play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _onScrollEnd() {
      let pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
          height: 224px
    .dots
      position: absolute
      right: 0
      left: 0
      top: 250px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: #bdbdbd
        &.active
          width: 20px
          border-radius: 5px
          background: #D2AF83
    .current-book
      padding-top: 65px
      color: $color-sup-theme
      text-align: center
      .book-name
        display: block
        font-size: $font-size-up-large
       .user-name
         padding-top: 20px
         display: block
         color: #AEABAA
         font-size: $font-size-medium  
    .book-type
      color: $color-sup-theme
      font-size: $font-size-large
      padding-top: 20px
      text-align: center
      color: #AEABAA
      .item
        display:inline-block
        border: 1px solid rgba(174,171,170,0.50)
        border-radius: 6px
        padding: 6px
        margin: 0 10px 
        cursor: pointer    
      .item.active
        border-color: #FF6600
    .price
      text-align:center
      color: #D2AF83
      font-size: $font-size-large-up
      padding-top: 16px 



</style>