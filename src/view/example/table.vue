<template>
  <div class="user-container">
    <div class="nav-btns">
      <el-button
        type="primary"
        size="small"
        @click="add"
      >
        增加
      </el-button>
    </div>
    <div class="list">
      <el-table
        ref="table"
        :data="tableData"
        border
        style="overflow: auto"
        height="calc(100vh - 280px)"
      >
        <el-table-column
          prop="name"
          label="名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagebottom">
      <div style="margin-left: 20px">
        <span style="font-size: 14px; margin-right: 5px">每页显示条数：</span>
        <el-select v-model.number="pageSize" size="small" style="width: 85px" @change="pageSizeChange">
          <el-option v-for="item in perPage" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <span style="font-size: 14px; margin-left: 15px">总共{{ total }}条</span>
      </div>
      <el-pagination
        class="paginate"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="page"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isAdd ? '增加' : '修改'"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item
          label="测试"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="测试"
          prop="name"
        >
          <Editor :richData="form.name" @getEditor="getEditor" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import info from '@/mixins/infoList'
import Editor from '@/components/editor'
export default {
  name: 'InfoList',
  mixins: [info],
  components: {
    Editor
  },
  data() {
    return {
      dialog: false,
      isAdd: false,
      form: {
        name: ''
      },
      rules: {}
    }
  },
  computed: {},
  mounted: function() {
    this.getList()
  },
  methods: {
    select() {
      this.$forceUpdate()
    },
    getList() {
      this.tableData = [
        {
          name: '11111'
        },
        {
          name: '2222'
        }
      ]
    },
    add() {
      this.dialog = true
      this.isAdd = true
      this.form = {
        name: ''
      }
    },
    edit(row) {
      this.dialog = true
      this.isAdd = false
      this.form = JSON.parse(JSON.stringify(row))
    },
    getEditor(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
$white: #fff;

.user-container {
  width: 100%;
  background-color: $white;
  overflow: auto;
  display: flex;
  flex-direction: column;
  .nav-btns{
    display: flex;
    justify-content: flex-start;
    padding: 0 0 10px 10px;
    .el-form-item{
      margin-bottom: 10px;
    }
    /deep/ .el-form-item__content{
      line-height: 32px;
    }
    /deep/ .el-form-item__label{
      line-height: 32px;
    }
  }
  .list{
    // height: calc(100vh - 100px);
    overflow: auto;
    // border-bottom: 1px solid #eee;
  }
  .pagebottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .paginate{
      text-align: center;
      margin: 10px 50px;
    }
  }
  
  .add-button{
    display: block;
    margin: 20px auto;
  }
}
</style>