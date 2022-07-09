<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommand />
    <RankCom />
    <LikeCom />

    <FloorCom v-for="floor in floorList" :key="floor.id" :list="floor"></FloorCom>

    <BrandCom />

  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav/index.vue'
import ListContainer from './ListContainer/index.vue'
import TodayRecommand from './Recommand'
import RankCom from './Rank'
import LikeCom from './Like'
import FloorCom from './Floor'
import BrandCom from './Brand'

import {mapState} from 'vuex'
export default {
  name: 'HomeCom',
  components: {
    TypeNav,
    ListContainer,
    TodayRecommand,
    RankCom,
    LikeCom,
    FloorCom,
    BrandCom
  },
  computed:{
    ...mapState({
      floorList: state => {
        return state.home.floorList
      }
    })
  }
  ,
  mounted() {
    //派发action 获取floor数据
    this.$store.dispatch('getFloorList');
    // this.$store.dispatch('getUserInfo')
  }
}
</script>

<style>
</style>