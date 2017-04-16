<template>
  <div class="tab-content">
      <h2 class="title">礼品兑换记录</h2>
        <table class="table is-striped">
            <thead>
            <tr>
                <th width="100">项目编号</th>
                <th>项目名称</th>
                <th width="80">参与状态</th>
                <th width="160">参与时间</th>
                <th width="80">所获积分</th>
            </tr>
            </thead>
            <tbody>
              <tr>
                  <td>1454545</td>
                  <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                  <td><span class="tag is-success">已完成</span></td>
                  <td>14.07.2014 10:16:36</td>
                  <td>200</td>
              </tr>
              <tr>
                  <td>1454545</td>
                  <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                  <td><span class="tag is-success">已完成</span></td>
                  <td>14.07.2014 10:16:36</td>
                  <td>200</td>
              </tr>
              <tr>
                  <td>1454545</td>
                  <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                  <td><span class="tag is-success">已完成</span></td>
                  <td>14.07.2014 10:16:36</td>
                  <td>200</td>
              </tr>
              <tr>
                  <td>1454545</td>
                  <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                  <td><span class="tag is-success">已完成</span></td>
                  <td>14.07.2014 10:16:36</td>
                  <td>200</td>
              </tr>
              <tr>
                  <td>1454545</td>
                  <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                  <td><span class="tag is-success">已完成</span></td>
                  <td>14.07.2014 10:16:36</td>
                  <td>200</td>
              </tr>

            </tbody>
        </table>
        <div class="box">
          <pagination :total="800" layout="pager"></pagination>
        </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">

</style>
