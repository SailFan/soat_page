/*
 * @Author: sail
 * @Date: 2022-02-28 14:55:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-28 15:00:18
 */
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文档</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="main">
      <mavon-editor
        v-model="value"
        :ishljs="true"
        ref=md
        @save="save"
        ></mavon-editor>
    </div>
  </div>
</template>

<script>

export default {
  data: function () {
    return {
      value: '',
      defaultData: 'preview'
    }
  },
  created () {
  },
  methods: {
    imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      this.img_file[pos] = $file
      this.$http({
        url: '/api/edit/uploadimg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        const _res = res.data
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url)
      })
    },
    imgDel (pos) {
      delete this.img_file[pos]
    },
    async save () {
      var params = {}
      params.name = this.name
      params.typeId = this.id
      params.content = this.editForm.content
      console.log(params)
      const { data: res } = await this.$http.post('/document/saveMd', params)
      if (res.code !== 20000) {
        return this.$message.error('保存文档失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
