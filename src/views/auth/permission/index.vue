<template >
  <div>
    <el-card class="card" shadow="never"> </el-card>
    <!-- 角色列表 -->
    <el-card class="card">
      <div slot="header">
        <el-button type="primary" size="small">初始化菜单</el-button>
        <el-button type="warning" size="small">新增菜单</el-button>
      </div>
      <el-table border :data="permissionRoleList" style="width: 100%"  row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column
          prop="title"
          label="菜单名称"
          align="left"
          width="200"
            fixed
        >
        </el-table-column>
        <el-table-column label="图标" prop="" width="100" align="center">
          <template slot-scope="scope">
            <div>    
              <i :class="scope.row.icon"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="等级"
          prop="level"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          label="排序"
          prop="sort"
          align="center"
          width="100"       
        ></el-table-column>
        <el-table-column
          label="权限标识"
          prop="permissionValue"
          align="center"
          width="150"
        ></el-table-column>
        <el-table-column label="路由" prop="path" width="200" align="center">
        </el-table-column>
        <el-table-column label="组件路径" prop="component" width="250" align="center">
        </el-table-column>
        <el-table-column
          label="是否可用"
          prop="status"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="center">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import {
  findAllPermissions,
  remove,
  save,
  update,
  saveRolePermission,
  selectAllMenu,
  saveInitMenus
} from '@/api/auth/permission'
import mixin from '@/mixins/index'
export default {
  mixins: [mixin],
  data() {
    return {
      permissionRoleList: []
    }
  },
  created() {
    this.findAllPermissions()
  },
  methods: {
    // 获取用户信息
    findAllPermissions() {
      findAllPermissions().then((res) => {
        console.log(res)
        this.permissionRoleList = res.data.menus
      })
    },
    edit(row) {
      //编辑
      console.log(row)
    },
    del(row) {
      //删除
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/myScss.scss';
.avatar-img {
  width: 100px;
  height: 100px;
}
</style>