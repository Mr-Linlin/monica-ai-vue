import { defineComponent, reactive } from "vue";
import expandPng from '@/assets/imgs/expand.png'
import foldPng from '@/assets/imgs/fold.png'
import { useSystem } from "@/store/system";
import style from '../css/layout.module.scss'
export default defineComponent({
  setup() {
    const state = reactive({
      expandPng,
      foldPng
    })
    const store = useSystem()
    return () => {
      return <div class={[style.content, 'flex-1']}>
        <div class="main">
          <header class={['flex', 'items-center', 'justify-between', 'h-12', style.header]}>
            <div class={['expand']} onClick={() => store.isCollapse = !store.isCollapse}>
              <img src={store.isCollapse ? state.expandPng : state.foldPng} class={['w-6', 'h-6', 'ml-2', 'cursor-pointer']} />
            </div>
            {/* <div class={['mr-2']}>
              登录
            </div> */}
          </header>
          <div class={['px-4', 'py-4']}>
            <router-view></router-view>
          </div>
        </div>
      </div>
    }
  }
})