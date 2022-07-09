<template>
  <div class="spec-preview">
    <img :src="skuImage.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImage.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'ZoomCom',
  props: ['skuImageList'],
  methods: {
    handler(e) {
      //获取蒙版的dom元素
      let mask = this.$refs.mask
      let big =this.$refs.big


      let left = e.offsetX - mask.offsetWidth / 2
      let top = e.offsetY - mask.offsetHeight / 2
      // 约束范围
      if (left <= 0) left = 0
      if (left >= mask.offsetWidth) left = mask.offsetWidth

      if (top <= 0) top = 0
      if (top >= mask.offsetHeight) top = mask.offsetHeight
      //修改mask的left｜top属性
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'

      big.style.left = - 2* left +'px'
      big.style.top =  - 2* top +'px'
    }
  },
  data() {
    return {
      currIndex: 0
    }
  },
  computed: {
    skuImage() {
      return this.skuImageList[this.currIndex] || {}
    }
  },
  mounted() {
    this.$bus.$on('getIndex', index => {
      this.currIndex = index
    })
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(182, 182, 182, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>