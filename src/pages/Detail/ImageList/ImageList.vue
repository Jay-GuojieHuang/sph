<template>
  <!-- <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div> -->
            <div>
            <swiperCom class="swiper" :options="swiperOption">
            <swiper-slide v-for="(carousel,index) in skuImageList" :key="carousel.id">
            <img :src="carousel.imgUrl" :class="{active:currIndex == index}" @mouseenter="changeIndex(index)">
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
          </swiperCom>
          </div>
</template>

<script>


  export default {
    name: "ImageList",
    props:['skuImageList'],
      data() {
    return {
      currIndex:-1,
      swiperOption: {
        slidesPerView: 5,
        slidesPerGroup:1,
        spaceBetween: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods:{
    changeIndex(index){
      this.currIndex = index
      //用¥bus通知兄弟组件更换zoom图片
      this.$bus.$emit("getIndex",index)
    }
  }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>