import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return () => {
      return <div class={['prompt-list']}>
        提示词列表
        <el-button>测试</el-button>
        <el-table data={[]} border empty-text="暂无数据">
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Date" />
          <el-table-column prop="address" label="Date" />
        </el-table>
      </div>
    }
  }
})