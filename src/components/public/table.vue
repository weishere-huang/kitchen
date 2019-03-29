<template>
	<div>
		<el-table
			:data="data"
			style="width: 100%"
			@row-dblclick="rowDblclick"
			stripe
			size="mini"
			tooltip-effect="light"
			@selection-change="handleSelectionChange"
			:header-cell-style="{'background-color':'#f1f1f1','color':'#333333', 'font-weight': 'normal'}"
			:cell-style="cellStyle"
		>
			<el-table-column type="selection" width="30" v-if="selectShow"></el-table-column>
			<el-table-column
				v-for="(item, index) in column"
				:key="index"
				:label="item.label"
				:min-width="item.width"
				:prop="item.prop"
				show-overflow-tooltip
				:formatter="item.formatter"
			></el-table-column>
			<el-table-column label="操作" :width="handle" v-if="handleShow">
				<template slot-scope="scope" @click.stop>
					<permission-button
						:permCode="permissionDetails"
						banType="disable"
						v-if="detalisShow"
						size="small"
						type="text"
						@click.stop.prevent="handleDetails(scope.$index, scope.row)"
					>查看</permission-button>
					<permission-button
						:permCode="permissionuUpdate"
						banType="disable"
						v-if="editShow"
						size="small"
						type="text"
						@click.stop.prevent="handleEdit(scope.$index, scope.row)"
					>修改</permission-button>
					<el-popover placement="top" width="180" v-model="scope.row.visible">
						<p style="line-height:40px;text-align:center;">
							<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
						</p>
						<div style="text-align: center; margin: 0">
							<el-button size="mini" plain @click="scope.row.visible = false">取消</el-button>
							<el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
						</div>
						<permission-button
							:permCode="permissionDetele"
							banType="disable"
							slot="reference"
							type="text"
							v-if="deleteShow"
						>删除</permission-button>
					</el-popover>
					<!-- <el-button
            v-if="deleteShow"
            size="small"
            type="text"
            @click.stop.prevent="handleDelete(scope.$index, scope.row)"
					>删除</el-button>-->
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			visible2: false
		};
	},
	props: {
		permissionDetails: {},
		permissionuUpdate: {},
		permissionDetele: {},
		handleShow: {},
		detalisShow: {},
		editShow: {},
		deleteShow: {},
		handleSelectionChange: {
			type: Function
		},
		column: {
			type: Array
		},
		data: {
			type: Array
		},
		rowDblclick: {
			type: Function
		},
		selectShow: {
			type: Boolean
		},
		handle: {
			type: Number
		},
		cellStyle: {
			type: Function
		}
	},
	methods: {
		handleDetails(index, rowData) {
			let params = { type: "detalis", index: index, rowData: rowData };
			this.$emit("handlechange", params);
		},
		handleEdit(index, rowData) {
			let params = { type: "edit", index: index, rowData: rowData };
			this.$emit("handlechange", params);
		},
		handleDelete(index, rowData) {
			rowData.visible = false;
			let params = { type: "delete", index: index, rowData: rowData };
			this.$emit("handlechange", params);
		}
	}
};
</script>
<style lang="less">
.table_title_bgcolor {
	background-color: red;
	font-weight: normal;
}
</style>

