<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="updateChecked(item.skuId,$event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeHandler('minus',-1,item)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="item.skuNum" @change="changeHandler('num',$event.target.value,item)">
            <a href="javascript:void(0)" class="plus" @click="changeHandler('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.skuPrice * item.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCartById(item)" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="updateAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalAmount}}</i>
        </div>
        <div class="sumbtn">
          <a @click="$router.push('/trade')" class="sum-btn">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCartCom',
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      //获取个人购物车数据
      this.$store.dispatch('getCartList')
      // console.log(Vue.prototype.$bus === this.$bus);
    },
    changeHandler: throttle(async function (type, disNum, item) {
      //type:区分三个元素
      //disNum 变化量
      //item哪一个产品
      //向服务器发请求
      switch (type) {
        case 'add':
          //带给服务器变化的量
          disNum = 1
          break
        case 'minus':
          if (item.skuNum > 1) {
            disNum = -1
          } else {
            disNum = 0
          }
          break
        case 'num':
          if (isNaN(disNum) || disNum <= 0) {
            //如果输入非法则 数据不变
            disNum = 0
          } else {
            //合法 需要算出差值

            disNum = parseInt(disNum) - item.skuNum
          }
          break
      }

      //派发action
      try {
        await this.$store.dispatch('addOrUpdateCart', { skuId: item.skuId, skuNum: disNum })
        //在获取新的数据
        this.getData()
      } catch (err) {
        alert.log(err.message)
      }
    }, 1000),

    async deleteCartById(item) {
      try {
        await this.$store.dispatch('deteleCartListBySkuId', item.skuId)
        //如果删除成功则发请求更新数据
        this.getData()
      } catch (err) {
        alert(err.message)
      }
    },
    async updateChecked(skuId, checked) {
      try {
        checked === true ? (checked = '1') : (checked = '0')
        await this.$store.dispatch('reqUpdateCheckedById', { skuId: skuId, isChecked: checked })
        this.getData()
      } catch (err) {
        alert(err.message)
      }
    },
    async deleteAllChecked() {
      //派发一个action
      try {
        await this.$store.dispatch('deleteaAllChecked')
        this.getData()
      } catch (err) {
        alert(err.message)
      }
    },
    async updateAllChecked(e) {
      //更新所以选中状态
      try {
        let checked = e.target.checked ? '1' : '0'
        console.log(checked)
        await this.$store.dispatch('updateAllChecked', checked)
        this.getData()
      } catch (err) {
        alert(err.message)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },

    //计算总价
    totalAmount() {
      let total = 0
      this.cartInfoList.forEach(item => {
        total += item.skuNum * item.skuPrice
      })
      return total
    },

    //判断底部复选框是否勾选 --全部商品都选择则勾选
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>