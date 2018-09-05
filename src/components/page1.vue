<template>
  <div class="page1">菜单一
    <div class="table">
      <!--region 表格-->
      <el-table id="iTable" :data="list" @selection-change="handleSelectionChange">
        <!--region 选择框-->
        <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;">
        </el-table-column>
        <!--end 选择框-->
        <!--region 数据列-->
        <template v-for="(column, index) in columns" v-bind="index">
          <el-table-column :prop="column.prop"
                          :label="column.label"
                          :align="column.align"
                          :width="column.width"
                          :key="column.id">
            <!-- <template slot-scope="scope">
              <template v-if="!column.render">
                <template v-if="column.formatter">
                  <span v-html="column.formatter(scope.row, column)"></span>
                </template>
                <template v-else>
                  <span>{{scope.row[column.prop]}}</span>
                </template>
              </template>
              <template v-else>
                <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
              </template>
            </template> -->
          </el-table-column>
        </template>
        <!--end 数据列-->
        <!--region 按钮操作组-->
        <template  v-if="operates.isShow">
          <el-table-column ref="fixedColumn" label="操作" :align="operates.align || 'center'" :width="operates.width" :fixed="operates.fixed">
            <template slot-scope="scope">
              <div class="operate-group">
                <template v-for="(btn, key) in operates.list">
                  <template>
                    <div class="item" v-if="btn.show" :key="key">
                      <el-button :type="btn.type" size="mini" :icon="btn.icon" :disabled="btn.disabled"
                                :plain="btn.plain" @click.native.prevent="btn.method(scope.$index,scope.row,key)">{{ btn.label }}
                      </el-button>
                    </div>
                  </template>
                </template>
              </div>
            </template>
          </el-table-column>
        </template>
      <!--end 操作按钮-->
      </el-table>
      <!--end 表格-->
      <div style="height:20px"></div>
      <!--region 分页-->
      <el-pagination v-if="pagination" @size-change="handleSizeChange"
                   @current-change="handleIndexChange"
                   :page-size="tableCurrentPagination.pageSize"
                   :page-sizes="tableCurrentPagination.pageArray"
                   :current-page="tableCurrentPagination.pageIndex"
                   layout="total,sizes, prev, pager, next"
                   :total="total">
    </el-pagination>
      <!--endregion-->
    </div>
  </div>
</template>
<script>
const _pageArray = [10, 20, 30]; // 每页展示条数的控制集合
export default {
  props: {
    list: {
      type: Array,
      default: () => [
        { number: 1, name: '123', py: 'asd', wb: 'asd', order: '1' }
      ] // es6的箭头函数  prop:表头绑定的地段，label：表头名称，align：每列数据展示形式（left, center, right），width:列宽
    }, // 数据列表
    columns: {
      type: Array,
      default: () => [
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
      ] // es6的箭头函数  需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    },
    operates: {
      type: Object,
      default: function () {
        return {
          isShow: true,
          width: 200,
          fixed: 'right',
          list: [
            {
              label: '停用',
              type: 'danger',
              show: true,
              icon: 'el-icon-delete',
              // 判断 按钮是否显示 返回true 为显示 false 不显示
              exist: function (index, row) {
                console.log('exit', row);
                if (row.status === 0) {
                  return true;
                } else {
                  return false;
                }
              },
              plain: false,
              disabled: false,
              method: (index, row) => {
                // this.handleEnable(index, row);
                row.status = 1;
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
                row.status = 0;
              }
            }
          ]
        };
      } // width:按钮列宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
    },
    total: {
      type: Number,
      default: 0
    }, // 总数
    pagination: {
      type: Object,
      default: function () {
        return {
          pageIndex: 1,
          pageSize: 20
        };
      } // 分页参数 === pageSize:每页展示的条数，pageIndex:当前页，pageArray: 每页展示条数的控制集合，默认 _page_array
    },
    options: {
      type: Object,
      default: function () {
        return {
          mutiSelect: true // 是否支持列表项选中功能
        };
      }
    } // table 表格的控制参数
  },
  data () {
    return {
      pageIndex: 1,
      tableCurrentPagination: {},
      multipleSelection: [] // 多行选中
    };
  },
  mounted () {
    if (this.pagination && !this.pagination.pageSizes) {
      this.pagination.pageArray = _pageArray; // 每页展示条数控制
    }
    this.tableCurrentPagination = this.pagination || {
      pageSize: this.total,
      pageIndex: 1
    }; // 判断是否需要分页
  },
  methods: {
    // 切换每页显示的数量
    handleSizeChange (size) {
      if (this.pagination) {
        this.tableCurrentPagination.pageIndex = 1;
        this.tableCurrentPagination.pageSize = size;
        this.$emit('handleSizeChange', this.tableCurrentPagination);
      }
    },
    // 切换页码
    handleIndexChange (currnet) {
      if (this.pagination) {
        this.tableCurrentPagination.pageIndex = currnet;
        this.$emit('handleIndexChange', this.tableCurrentPagination);
      }
    },
    // 多行选中
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('handleSelectionChange', val);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.table .item
  display inline-block
  padding-right 10px
</style>
