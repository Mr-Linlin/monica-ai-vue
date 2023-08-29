import { defineComponent } from "vue";
export default defineComponent({
  name: "Table",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    return () => {
      return <div class={['l-table']}>
        <el-table data={props.data} border empty-text="暂无数据">
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Date" />
          <el-table-column prop="address" label="Date" />
        </el-table>
      </div>
    }
  }
})