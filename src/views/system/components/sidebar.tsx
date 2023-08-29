import { DefineComponent, defineComponent, onMounted, reactive } from "vue";
import '../css/element.css'
import style from '../css/layout.module.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useRouter, useRoute } from "vue-router";
import logoPng from '@/assets/imgs/home/logo.png'
import { useSystem } from "@/store/system";

export default defineComponent({
  setup() {
    interface Menu {
      path: string,
      icon: string,
      title: string,
      children: Menu[]
    }
    const state = reactive({
      menuList: [
        {
          path: 'right-manage',
          icon: 'HelpFilled',
          title: "权限管理",
          children: [
            {
              title: "用户列表",
              path: 'user-list',
              icon: '',
              children: []
            },
            {
              title: "角色列表",
              path: 'role-list',
              icon: '',
              children: []
            }
          ]
        },
        {
          path: 'model-manage',
          icon: 'ElemeFilled',
          title: "模型管理",
          children: [
            {
              title: "Prompt列表",
              path: 'prompt-list',
              icon: '',
              children: []
            }
          ]
        }
      ],
      activeRouter: '/',
      logoPng
    })
    const router = useRouter()
    const route = useRoute()
    const store = useSystem()

    onMounted(() => {
      state.activeRouter = route.name as string
    })
    // 渲染图标
    const renderIcon = (icon?: string) => {
      if (!icon) {
        return null
      }

      const IconComp = (ElementPlusIconsVue as { [key: string]: DefineComponent })[icon]
      return (
        <el-icon>
          <IconComp />
        </el-icon>
      )
    }
    // 渲染菜单
    const renderMenu = (list: Menu[]) => {
      return list.map((menu) => {
        if (!menu.children || menu.children.length == 0) {
          return (
            <el-menu-item index={menu.path} onClick={() => storageRouter(menu)}>
              {renderIcon(menu.icon)}
              <span>{menu.title}</span>
            </el-menu-item>
          )
        }
        // 插槽
        const slots = {
          title: () => (
            <>
              {renderIcon(menu.icon)}
              <span>{menu.title}</span>
            </>
          ),
          default: () => renderMenu(menu.children)
        }

        return <el-sub-menu index={menu.path} v-slots={slots} />
      })
    }
    // 切换路由
    const storageRouter = (menu: Menu) => {
      state.activeRouter = menu.path
      router.push({
        path: menu.path
      })

    }
    return () => {
      return <div class={[style.sidebar, !store.isCollapse ? 'w-56' : '']}>
        <div class={[style.logo, 'flex', 'items-center']}>
          <img src={state.logoPng} class={['w-10', 'h-10', 'mr-2']} />
          {!store.isCollapse ? <div class={['font-mono', 'font-bold', 'text-xl']}>AI后台管理系统</div> : ''}
        </div>
        <el-menu
          active-text-color="#ffff"
          background-color="#001529"
          class={[!store.isCollapse ? 'w-56' : '']}
          default-active={state.activeRouter}
          text-color="#ffffffb3"
          unique-opened={true}
          collapse={store.isCollapse}
        >
          {renderMenu(state.menuList)}
        </el-menu>
      </div>
    }
  }
})