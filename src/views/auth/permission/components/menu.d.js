
// 初始化菜单权限数据提交model
export const initMenusModel = [
    {
        // 路由是否展开:跟前端路由一致,alwaysShow: 0 false; 1 true
        'alwaysShow': false,
        // 下级对象,routeConfig对象
        'children': [
            {}
        ],
        // 组件路径: 由于对象无法传输,这里只是传递了组件路径,方便在使用的时候还原
        //  顶级菜单不需要传component,因为默认都是Layout组件
        //  次级菜单 需要传递component组件的路径字符串
        'component': 'string',
        // 创建时间(后台生成,前台无需传递)
        // 'createTime': '2021-01-19T06:45:33.684Z',
        // 路由是否隐藏:跟前端路由一致,hidden: 0 false, 1 true
        'hidden': false,
        // 图标 meta.icon
        'icon': 'string',
        // id(后台生成,前台无需传递)
        // 'id': 'string',
        // 数据库逻辑删除标识(后台判断与生成,前台无需传递): 1（true）已删除， 0（false）未删除
        // 'isDeleted': false,
        // 是否选中  后台逻辑需要 前台不需要
        // 'isSelect': false,
        // 层级 initMenus 会后台实现层级判断
        // 'level': 0,
        // 前端meta字符串对象
        'meta': 'string',
        // 更新时间(后台生成,前台无需传递)
        // 'modifyTime': '2021-01-19T06:45:33.684Z',
        // 路由名称,不能重复
        'name': 'string',
        // 路由路径
        'path': 'string',
        // 权限标识,仅在按钮单独添加时用  这里不需要
        // 'permissionValue': 'string',
        // 上级id,后台生成
        // 'pid': 'string',
        // 重定向,跟前端路由配置一致
        'redirect': 'string',
        // 排序,倒序,值越大越靠前  后台生成
        // 'sort': 0,
        // 使用状态(0:禁止,1:正常) , 默认后台生成 预留
        // 'status': 0,
        // 路由meta.title
        'title': 'string'
        // 类型(1:菜单,2:按钮)   后台判断
        // 'type': 1
    }
]

// 新增顶级菜单 数据对象
export const TopMenuModel = {
    'id': 'string', // 编辑需要
    'pid': '0', // 默认是0
    'alwaysShow': false,
    'component': 'string',
    'hidden': false,
    'icon': 'string',
    'meta': 'string',
    'name': 'string', // 普通路由name必传,而且不能重复
    'path': 'string', // 为当前路由path,不包含上级路由
    'redirect': 'string',
    'type': 1, // 类型,必传.  普通路由菜单: type=1, 按钮菜单: type=2
    'level': 0, // 层级,必穿. 顶级菜单level=0,下级level+1
    'sort': 'number', // 必传
    'title': 'string'
}
// 普通菜单 数据对象
export const NormalMenuModel = {
    ...TopMenuModel,
    'pid': 'string', // 父id
    'level': 'number'// 层级,必穿. 顶级菜单level=0,下级level+1
}

// 按钮级别
export const BtnMenuModel = {
    'id': 'string',
    'pid': 'string', // 所在页面的id
    'level': 'number',
    'sort': 'number', // 排序
    'type': 2, // 按钮type=2
    'title': 'string', // 按钮名称
    // 增删改查建议使用add remove edit list
    // 命名空间建议使用 当前页面的路由name  ,比如 productList.add
    'permissionValue': 'string' // 按钮权限标识,用于区分页面按钮
}

