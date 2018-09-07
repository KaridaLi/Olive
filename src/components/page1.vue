<template>
  <div class="page1">
    <i-table
            :list='list'
            :columns="columns"
            :operates="operates"
            :total="total"
            :options="options"
    >

    </i-table>
  </div>
</template>
<script>
import iTable from '@/components/common/iTable';
export default {
  data () {
    return {
      total: 2, // table数据总条数
      list: [
        { number: 1, name: '123', py: 'asd', wb: 'asd', order: '1' },
        { number: 2, name: '123', py: 'asd', wb: 'asd', order: '1' }
      ],
      columns: [
        {
          prop: 'number',
          label: '序号',
          align: 'left'
        },
        {
          prop: 'name',
          label: '部位名称',
          align: 'left'
        },
        {
          prop: 'py',
          label: '拼音助记词',
          align: 'left'
        },
        {
          prop: 'wb',
          label: '五笔助记词',
          align: 'left'
        },
        {
          prop: 'order',
          label: '显示顺序',
          align: 'left'
        }
      ],
      operates: {
        isShow: true,
        width: 200,
        fixed: 'right',
        list: [
          {
            label: '停用',
            type: 'danger',
            show: true,
            icon: 'el-icon-delete',
            plain: false,
            disabled: false,
            method: (index, row) => {
              // this.handleEnable(index, row);
              // row.status = 1;
              console.log(row);
              console.log('停用');
            }
          },
          {
            label: '启用',
            type: 'primary',
            show: true,
            icon: 'el-icon-edit',
            // 判断 按钮是否显示 返回true 为显示 false 不显示
            exist: function (index, row) {
              if (row.status === 0) {
                return false;
              } else {
                return true;
              }
            },
            plain: false,
            disabled: false,
            method: (index, row) => {
              // this.handleEdit(index, row);
              // row.status = 0;
              console.log('启用');
            }
          }
        ]
      },
      options: {
        mutiSelect: true
      }
    };
  },
  components: {
    iTable: iTable
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
