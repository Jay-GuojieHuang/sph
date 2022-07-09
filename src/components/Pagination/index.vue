<template>
  <div class="pagination">
    <button :disabled="currPageNo==1" @click="$emit('getCurrPage',currPageNo-1)">上一页</button>
    <button v-if="startAndEndNum.start>1" @click="$emit('getCurrPage',1)" :class="{active:currPageNo==1}">1</button>
    <button v-if="startAndEndNum.start>2" disabled>···</button>

    <!-- 中间部分 -->
    <span v-for="(page,index) in startAndEndNum.end" :key="index" @click="$emit('getCurrPage',page)">
      <button v-if="page>=startAndEndNum.start" :class="{active:currPageNo==page}">{{page}}</button>
    </span>

    <button v-if="startAndEndNum.end<totalPage-1" disabled>···</button>
    <button v-if="startAndEndNum.end<totalPage"  @click="$emit('getCurrPage',totalPage)" :class="{active:currPageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="currPageNo == totalPage"  @click="$emit('getCurrPage',currPageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'PaginationCom',
  props: ['currPageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    //计算出连续页码数与结束数字
    startAndEndNum() {
      const { currPageNo, continues } = this
      let start = 0,
        end = 0
      //连续页面数大于总数（不正常现象）
      if (continues > this.totalPage) {
        start = 1;
        end =this.totalPage
      } else {
        //正常现象
        start = currPageNo - parseInt(continues / 2)
        end = currPageNo + parseInt(continues / 2)
        //把出现不正常现象start 出现0或负数 纠正
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > this.totalPage) {
          //超出最大页码
          end = this.totalPage
          start = end - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>


<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
  button:hover{
   background-color: red;
       &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
</style>