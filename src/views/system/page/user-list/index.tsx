import { defineComponent, reactive } from "vue";
// import Table from '@/views/system/components/table'
import Table1 from '@/views/system/components/table/index.vue'
export default defineComponent({
  setup() {
    const state = reactive({
      data: [],
      tableColumns: [
        { key: 'link', title: '链接', showOverflow: true },
        { key: 'status', title: '采集状态', width: 120 },
        { solt: 'operate', title: '操作', width: 120 },

      ]
    })
    return () => {
      return <div class={['user-list', 'h-screen', 'overflow-y-auto']}>
        {/* <Table data={state.data}></Table> */}
        <Table1 data={state.data} columns={state.tableColumns}>

        </Table1>
      </div>
    }
  }
})