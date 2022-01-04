<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试集</el-breadcrumb-item>
      <el-breadcrumb-item>接口详情</el-breadcrumb-item>
    </el-breadcrumb>
<!--    <el-card>-->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane label="预览" name="first">预览111</el-tab-pane>
          <el-tab-pane label="编辑" name="second">
            <h1 style="font-weight: lighter">基本设置</h1>
            <div class="base">
            <el-form>
              <el-form-item label="活动名称" label-width="80px">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="选择分类" label-width="80px">
                <el-select placeholder="请选择分类">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接口路径" label-width="80px">
                <el-input placeholder="请输入接口路径" class="input-with-select">
                  <el-select  v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="GET" value="1"></el-option>
                    <el-option label="POST" value="2"></el-option>
                    <el-option label="PUT" value="3"></el-option>
                    <el-option label="DELETE" value="4"></el-option>
                  </el-select>
                </el-input>
                </el-form-item>
            </el-form>
            </div>
            <h1 style="font-weight: lighter">请求参数设置</h1>
            <div class="base">
              <el-form>
                <el-form-item label="活动名称">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </div>
            <h1 style="font-weight: lighter">返回数据设置</h1>
            <div class="base">
              <el-form>
                <el-form-item label="活动名称">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </div>
            <h1 style="font-weight: lighter">其他</h1>
            <div class="base">
              <el-form>
                <el-form-item label="活动名称">
                  <el-input></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="运行" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </template>
<!--    </el-card>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      select: ''
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
