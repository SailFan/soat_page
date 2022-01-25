<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试集</el-breadcrumb-item>
      <el-breadcrumb-item>接口详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template>
            <h1 style="font-weight: lighter">请求</h1>
            <div class="base">
            <el-form :rules="editBaseSettingFormRules">
              <el-form-item label="接口名称" label-width="80px" prop="interfaceName">
                <el-input placeholder="请输入接口名称"></el-input>
              </el-form-item>
              <el-form-item label="选择分类" label-width="80px" prop="interfaceType">
                <el-select placeholder="请选择分类">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接口路径" label-width="80px" prop="interfacePath">
                <el-input placeholder="请输入接口路径" class="input-with-select">
                  <el-select  v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="GET" value="1"></el-option>
                    <el-option label="POST" value="2"></el-option>
                    <el-option label="PUT" value="3"></el-option>
                    <el-option label="DELETE" value="4"></el-option>
                  </el-select>
                </el-input>
              </el-form-item>
                <el-tabs style="padding-top: 20px">
                  <el-tab-pane label="参数" name="first">
                      <el-form-item>
                      </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane label="头信息" name="second">头信息</el-tab-pane>
                  <el-tab-pane label="请求体" name="third">请求体</el-tab-pane>
                  <el-tab-pane label="测试" name="fourth">测试</el-tab-pane>
                </el-tabs>

            </el-form>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      select: '',
      editBaseSettingFormRules: {
        interfaceName: [
          {
            required: true,
            message: '请输入接口名称',
            trigger: 'blur'
          }
        ],
        interfaceType: [
          {
            required: true,
            message: '请选择接口分类',
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
  }
}
</script>

<style lang="less" scoped>
.base {
  background-color: #dddddd;
  border-radius: 15px;
  background: rgba(40%,40%,40%,0.09);
  padding: 15px;

}
</style>
