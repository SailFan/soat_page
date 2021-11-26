<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-button type="primary" @click="showAddRoleDialog">添加角色</el-button>
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
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
<!--        <el-table-column label="角色名称" prop="roleTag"></el-table-column>-->

        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRoleDialog(scope.row)">编辑</el-button>
            <el-button  size="mini" type="danger" icon="el-icon-delete" @click="removeRole(scope.row.rid)">删除</el-button>
            <el-button  size="mini" type="warn" icon="el-icon-setting" @click="showPermissionDialog()">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="setPermissionDialogVisible" width="51%" center >
      <template>
        <el-transfer  style="text-align: center; display: inline-block" :titles="['未分配的权限', '已获得的权限']" :button-texts="['减权限', '加权限']" v-model="value" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" :data="permissionTransferdata">
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
      width="30%">
      <el-form label-width="80px" :model="editRoleForm" :rules="editRoleFormRules" ref="editFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="RoledialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="Rolededit">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog
      title="添加角色"
      :visible.sync="addRoledialogVisible"
      width="30%">
      <el-form label-width="80px" :model="addRoleForm" :rules="addRoleFormRules" ref="addFormRef">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addRoleDialogClosed">取 消</el-button>
          <el-button type="primary" @click="addConfirm()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      permissions: [],
      addRoledialogVisible: false,
      setPermissionDialogVisible: false,
      RoledialogVisible: false,
      permissionTransferdata: [],
      value: [1, 4],
      editRoleForm: {
      },
      addRoleForm: {
        roleName: ''
      },
      addRoleFormRules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '角色名名称1到10位'
          }
        ]
      },
      editRoleFormRules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 10,
            message: '角色名名称1到10位'
          }
        ]
      }
    }
  },
  created () {
    this.permissionslist()
    this.generateData()
  },
  methods: {
    addRoleDialogClosed () {
      this.$refs.addFormRef.resetFields()
      this.addRoledialogVisible = false
    },
    Rolededit (role) {
      this.$refs.editFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('/role/editRole', this.editRoleForm)
        if (res.code !== 20000) return this.$message.error('角色名称修改失败')
        this.RoledialogVisible = false
        this.permissionslist()
        this.$message.success('更新角色信息成功')
      })
    },
    addConfirm () {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('/role/addRole', this.addRoleForm)
        if (res.code !== 20000) return this.$message.error('新增角色失败')
        this.addRoledialogVisible = false
        this.permissionslist()
      })
    },
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
    async  editRoleDialog (row) {
      const { data: res } = await this.$http.get('/role/getRole', { params: { rid: row.rid } })
      if (res.code !== 20000) return this.$message.error('获取指定角色失败')
      this.editRoleForm = res.data
      this.RoledialogVisible = true
    },
    async removeRole (rid) {
      const result = await this.$confirm('确认删除角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (result !== 'confirm') {
        return this.$message.info('用户取消删除')
      }
      const { data: res } = await this.$http.get('/role/delRole/', { params: { rid: rid } })
      if (res.code !== 20000) {
        return this.$message.error('角色删除失败')
      }
      this.permissionslist()
      this.$message.success('角色删除成功')
    },
    async generateData () {
      const { data: res } = await this.$http.get('/permission/getPermissionList')
      if (res.code !== 20000) {
        return this.$message.error('获取权限列表失败')
      }
      const list = res.data.map((item, index) => {
        return {
          key: index,
          name: item.name
        }
      })
      this.permissionTransferdata = list
      console.log(list)
    },
    showAddRoleDialog () {
      this.addRoledialogVisible = true
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
