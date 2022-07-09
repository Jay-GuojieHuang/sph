<template>
  <div id="app">
    <HeaderCom/>
    <router-view></router-view>
    <FooterCom v-show='$route.meta.showFooter'></FooterCom>
  </div>
</template>

<script>
import HeaderCom from '@/components/Header'
import FooterCom from '@/components/Footer'


export default {
  name: 'App',
  components: {
  HeaderCom,
  FooterCom
  },
  mounted(){
    //通知vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch('categoryList')
    // // 
    //  this.$store.dispatch('getUserInfo')
  }
}
</script>

<style>
#nprogress .bar {
background: #e1251b !important;
/* height: 5px !important; */

}
#nprogress .spinner .spinner-icon {
border-top-color: #e1251b;
border-left-color: #e1251b;
}
</style>
