import { defineComponent } from "vue";
import style from  './css/layout.module.scss'
import Sidebar from "./components/sidebar";
import ContentWrap from "./components/content-wrap";
export default defineComponent({
  setup(){
    return () => {
      return <div class={[style.layoutBox,'flex']}>
      <Sidebar/>
      <ContentWrap/>
      </div>
    }
  }
})