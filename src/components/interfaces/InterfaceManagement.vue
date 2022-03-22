<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工程</el-breadcrumb-item>
      <el-breadcrumb-item>接口列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-button type="primary" @click="showAddInterfaceDialog">添加接口</el-button>
      </el-row>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="接口名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="接口路径"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="接口分类">
          </el-table-column>
          <el-table-column
            prop="address"
            label="上一次运行状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="标签">
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template  slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑"  placement="top">
                <el-button type="primary" icon="el-icon-edit" size="small" @click="openInterface(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
<!--      添加接口dialog开始-->
      <el-dialog
        title="添加接口"
        :visible.sync="addInterfacedialogVisible"
        width="30%">
        <el-form label-width="80px" :rules="addInterfaceFormRules">
          <el-form-item label="接口分类" prop="interfaceType">
            <el-input  placeholder="请输入接口分类"></el-input>
          </el-form-item>
          <el-form-item label="接口名称" prop="interfaceName">
            <el-input  placeholder="请输入接口名称"></el-input>
          </el-form-item>
          <el-form-item label="接口路劲" prop="interfacePath">
            <el-input placeholder="请输入接口路径" class="input-with-select">
              <el-select slot="prepend" placeholder="请选择协议">
                <el-option label="GET" value="1"></el-option>
                <el-option label="POST" value="2"></el-option>
                <el-option label="DELETE" value="3"></el-option>
                <el-option label="PUT" value="4"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addInterfaceDialogClosed">取 消</el-button>
          <el-button>确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      addInterfacedialogVisible: false,
      addInterfaceFormRules: {
        interfaceType: [
          {
            required: true,
            message: '请输入接口分类',
            trigger: 'blur'
          }
        ],
        interfaceName: [
          {
            required: true,
            message: '请输入接口名称',
            trigger: 'blur'
          }
        ],
        interfacePath: [
          {
            required: true,
            message: '请输入接口路径',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    openInterface (row) {
      this.$router.push({ path: '/interfaceDetail', query: { id: row.id } })
    },
    showAddInterfaceDialog () {
      this.addInterfacedialogVisible = true
    },
    addInterfaceDialogClosed () {
      this.addInterfacedialogVisible = false
      // this.$refs.addFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
