<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="changeNotShowNav">
      <h2 class="all" @mouseenter="changeShowNav">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-if="showNav">
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" @mouseenter="changeIndex(index)" @mouseleave="changeIndex(-1)">
              <h3>
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex === index ? 'block': 'none'}">
                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

        </div>
      </transition>

    </div>
  </div>
</template>

<script>
//引入lodash来实现防抖截流
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'

export default {
  name: 'TypeNav',
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    // //通知vuex发请求，获取数据，存储于仓库中
    // this.$store.dispatch('categoryList')
    //当组件挂载完毕，让Nav显示
    this.$route.path == '/home' ? (this.showNav = true) : (this.showNav = false)
  },
  data() {
    return {
      currentIndex: -1,
      showNav: true
    }
  },
  methods: {
    changeShowNav() {
      if (this.$route.path != '/home') {
        this.showNav = true
      }
    },
    changeNotShowNav() {
      if (this.$route.path != '/home') {
        this.showNav = false
      }
    },

    changeIndex: throttle(function (index) {
      this.currentIndex = index
      // console.log('鼠标进入' + index)
    }, 1),

    goSearch(event) {
      //最好的解决方法：编程式导航+事件委派
      let element = event.target

      let { categoryname, category1id, category2id, category3id } = element.dataset

      if (categoryname) {
        //一级二级三级分类
        let location = { name: 'SearchCom' }
        let query = { categoryName: categoryname }

        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }

        //判断：如果路由带有params参数，要合并
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          // console.log(location)
          this.$router.push(location)
        }
      }
    }
  },
  computed: {
    ...mapState({
      categoryList: state => {
        return state.home.categoryList
      }
    })
    // ...mapState(['categoryList'])
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            a {
              color: #333;
              cursor: pointer;
            }
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .item:hover {
          background-color: #e1251b;
        }
      }
    }

    //过渡动画
    .sort-enter {
      //动画开始
      height: 0px;
    }
    .sort-enter-to {
      // 动画结束状态(进入)
      height: 461px;
    }
    .sort-enter-active {
      transition: all .5s linear;
      overflow: hidden;
    }
  }
}
</style>