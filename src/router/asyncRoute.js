let asyncRoute = [
    {
        path: '/layout',
        name: 'layout',
        redirect: '/layout/dashboard',
        component: () => import('../views/Layout/Layout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../views/Layout/Dashboard.vue'),
                meta: {
                    title: '管理首页',
                    icon: "el-icon-s-home"
                }
            }
        ]
    },
    {
        path: '/shop',
        name: 'Shop',
        component: () => import('../views/Layout/Layout.vue'),
        children: [
            {
                path: 'shop',
                meta: {
                    title: '店铺信息',
                    icon: 'el-icon-s-shop'
                },
                component: () => import('../views/shop/Shop.vue')
            }
        ]
    },
    {
        path: '/goods',
        name: 'allgoods',
        meta: {
            title: '商品管理',
            icon: 'el-icon-s-platform'
        },
        component: () => import('../views/Layout/Layout.vue'),
        children: [
            {
                path: 'all',
                name: 'all',
                meta: {
                    title: '所有商品',
                    icon: 'el-icon-s-opportunity'
                },
                component: () => import('../views/goods/all/allgoods.vue')
            },
            {
                path: 'add',
                name: 'add',
                meta: {
                    title: '添加商品',
                    icon: 'el-icon-circle-plus'
                },
                component: () => import('../views/goods/add/addgoods.vue')
            },
            {
                path: 'sell',
                name: 'sell',
                meta: {
                    title: '出售中',
                    icon: 'el-icon-s-opportunity'
                },
                component: () => import('../views/goods/sell/sell.vue')
            },
            {
                path: 'soldout',
                name: 'soldout',
                meta: {
                    title: '已下架',
                    icon: 'el-icon-s-management'
                },
                component: () => import('../views/goods/soldout/soldout.vue')
            },
            {
                path: 'warehouse',
                name: 'warehouse',
                meta: {
                    title: '仓库中',
                    icon: 'el-icon-s-ticket'
                },
                component: () => import('../views/goods/warehouse/warehouse.vue')
            }
        ]
    },
    {
        path: '/order',
        name: 'order',
        meta: {
            title: '订单管理',
            icon: 'el-icon-s-marketing'
        },
        component: () => import('../views/Layout/Layout.vue'),
        children: [
            {
                path: 'allorders',
                name: 'allorders',
                meta: {
                    title: '全部订单',
                    icon: 'el-icon-s-data'
                },
                component: () => import('../views/order/allorders/allorders.vue')
            },
            {
                path: 'willpay',
                name: 'willpay',
                meta: {
                    title: '待付款',
                    icon: 'el-icon-s-finance'
                },
                component: () => import('../views/order/willpay/willpay.vue')
            },
            {
                path: 'willdeliver',
                name: 'willdeliver',
                meta: {
                    title: '待发货',
                    icon: 'el-icon-s-tools'
                },
                component: () => import('../views/order/willdeliver/willdeliver.vue')
            },
            {
                path: 'willreceiv',
                name: 'willreceiv',
                meta: {
                    title: '待收货',
                    icon: 'el-icon-s-goods'
                },
                component: () => import('../views/order/willreceiv/willreceiv.vue')
            },
            {
                path: 'finish',
                name: 'finish',
                meta: {
                    title: '已完成',
                    icon: 'el-icon-success'
                },
                component: () => import('../views/order/finish/finish.vue')
            },
            {
                path: 'closed',
                name: 'closed',
                meta: {
                    title: '已关闭',
                    icon: 'el-icon-error'
                },
                component: () => import('../views/order/closed/closed.vue')
            }
        ]
    },
    {
        path: '/customer',
        name: 'customer',
        component: () => import('../views/Layout/Layout.vue'),
        children: [
            {
                path: 'customer',
                meta: {
                    title: '用户管理',
                    icon: 'el-icon-user-solid'
                },
                component: () => import('../views/customer/customer.vue')
            }
        ]
    }
]
export default asyncRoute