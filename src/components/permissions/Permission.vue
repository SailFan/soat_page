<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-button type="primary">添加角色</el-button>
      </el-row>
      <el-table :data="permissions" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.permissionsList.length==0">暂无权限</el-tag>
<!--            <el-row style="display: flex;align-items: center" v-else :class="['bdbottom', i1 === 0 ? 'bdtop' : '']"  v-for="(item1, i1) in scope.row.permissionsList" :key="item1.pid">-->
            <el-row v-else>
              <el-col :span="24">
                <el-tag closable  type="success" v-for="(item1) in scope.row.permissionsList" :key="item1.pid" @close="removePermission(scope.row,item1.pid)">{{item1.name}}</el-tag>
              </el-col>
<!--              <el-col :span="14">-->
<!--                <el-row>-->
<!--                  <el-col>-->
<!--                    <el-tag closable @close="removePermission(scope.row,item2.pcid)" v-for="(item2) in item1.queryChildrePermission" :key="item2.pcId" type="success">{{item2.name}}</el-tag>-->
<!--                  </el-col>-->
<!--                </el-row>-->
<!--              </el-col>-->
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleTag"></el-table-column>
        <el-table-column label="角色标签" prop="roleName"></el-table-column>

        <el-table-column label="操作" width="300px">
          <template>
<!--            slot-scope="scope"-->
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRoleDialog()">编辑</el-button>
            <el-button  size="mini" type="danger" icon="el-icon-delete" @click="removeRole">删除</el-button>
            <el-button  size="mini" type="warn" icon="el-icon-setting" @click="showPermissionDialog()">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="setPermissionDialogVisible" width="51%" center>
      <template>
        <el-transfer  style="text-align: left; display: inline-block" :titles="['未分配的权限', '已获得的权限']" :button-texts="['减权限', '加权限']" v-model="value" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="data">
        </el-transfer>
      </template>
      <span slot="footer" class="dialog-footer">
    <el-button @click="setPermissionDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="setPermissionDialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
<!--    编辑角色-->
    <el-dialog
      title="编辑角色"
      :visible.sync="RoledialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="70px">
        <el-form-item label="用户名" >
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="RoledialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="RoledialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      permissions: [],
      setPermissionDialogVisible: false,
      RoledialogVisible: false
    }
  },
  created () {
    this.permissionslist()
  },
  methods: {
    async permissionslist () {
      const { data: res } = await this.$http.get('/role/getRoleList')
      if (res.code !== 20000) {
        return this.$message.error('获取角色列表失败')
      }
      this.permissions = res.data
    },
    async removePermission (role, pid) {
      const result = await this.$confirm('确认删除权限', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result !== 'confirm') {
        return this.$message.info('用户取消删除')
      }
      const { data: res } = await this.$http.get('/rp/removeRolePermission', { params: { rid: role.rid, pid: pid } })
      if (res.code !== 20000) {
        return this.$message.error('删除权限失败')
      }
      this.permissionslist()
      this.$message.success('权限删除成功')
    },
    showPermissionDialog () {
      this.setPermissionDialogVisible = true
    },
    editRoleDialog () {
      this.RoledialogVisible = true
    },
    async removeRole () {
      const result = await this.$confirm('确认删除角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result !== 'confirm') {
        return this.$message.info('用户取消删除')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eeeeee;
}
.bdbottom {
  border-bottom: 1px solid #eeeeee;
}
.el-empty {
  height: 10px;
  image {
    size: 5px;
  }
}
</style>
