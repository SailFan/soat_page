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
            <el-form :rules="editBaseSettingFormRules" ref="baseInterfaceFormRef" :model="baseInterfaceFormModel">
              <el-form-item label="接口名称" label-width="80px" prop="interfaceName">
                <el-input placeholder="请输入接口名称" v-model="baseInterfaceFormModel.interfaceName"></el-input>
              </el-form-item>
              <el-form-item label="选择分类" label-width="80px" prop="interfaceType">
                <el-select placeholder="请选择分类" v-model="baseInterfaceFormModel.region">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接口路径" label-width="80px" prop="interfacePath">
                <el-input placeholder="请输入请求地址" v-model="baseInterfaceFormModel.path" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 200px" id="c">
                  <el-option label="GET" value="1"></el-option>
                  <el-option label="POST" value="2"></el-option>
                  <el-option label="PUT" value="3"></el-option>
                  <el-option label="DELETE" value="4"></el-option>
                </el-select>
                  <el-button slot="append" @click="savaInterfaceData">保存</el-button>
              </el-input>
              </el-form-item>
            </el-form>
                <el-tabs style="padding-top: 20px">
                  <el-tab-pane label="参数" name="first">
                    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
                      <el-form-item
                        v-for="(domain, index) in dynamicValidateForm.domains"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                        :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
                      >
                        <el-input v-model="domain.value" style="width: 95%" placeholder="请输入value" >
                            <el-input  placeholder="请输入key" style="width: 400px" slot="prepend"></el-input>
                        </el-input>
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                      </el-form-item>
                      <el-form-item>
                        <el-button @click="addDomain">新增域名</el-button>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                  <el-tab-pane label="头信息" name="second">头信息</el-tab-pane>
                  <el-tab-pane label="请求体" name="third">请求体</el-tab-pane>
                  <el-tab-pane label="测试" name="fourth">测试</el-tab-pane>
                </el-tabs>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dynamicValidateForm: {
        domains: [{
          value: ''
        }]
      },
      baseInterfaceFormModel: {
        interfaceName: '',
        region: '',
        path: ''
      },
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
    savaInterfaceData () {
      this.$refs.baseInterfaceFormRef.validate(async (valid) => {
      })
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
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

<style>
.el-input-group__prepend {
  padding: inherit;
}
</style>
