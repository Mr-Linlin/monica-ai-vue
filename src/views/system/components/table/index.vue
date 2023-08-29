<template>
  <div class="custom-table">
    <table>
      <thead>
        <tr>
          <th class="w-6">序号</th>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ width: 'width' in column ? column.width + 'px' : '' }"
            :class="{ 'flex-1': !column.width }"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td class="w-6">{{ index + 1 }}</td>
          <td
            v-for="column in columns"
            :key="column.key"
            :style="{ width: 'width' in column ? column.width + 'px' : '' }"
            :class="{
              'flex-1': !column.width,
              'show-overflow': column.showOverflow,
            }"
          >
            <div v-if="column.solt">
              <slot :name="column.slot" :scope="item" />
            </div>
            <div v-else>
              {{ item[column.key] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CustomTable",
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.custom-table {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  position: sticky;
  top: 0;
  background-color: #fff;
}
tr {
  width: 100%;
  display: flex;
  background-color: #fff;
}
tbody {
  tr:hover {
    background-color: #f5f7fa;
  }
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}
.flex-1 {
  flex: 1;
}
.w-6 {
  width: 60px;
  text-align: center;
}
.show-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// th {
//   /* background-color: #f2f2f2; */
// }
</style>
