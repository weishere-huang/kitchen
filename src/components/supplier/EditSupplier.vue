<template>
	<div class="edit_supplier">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>修改供应商</h4>
			</div>
			<div class="supplier_form">
				<el-form size="small" label-width="180px" :model="supplierMsg" :rules="supplierMsgRules" ref="supplierMsg">
					<el-form-item label="供应商名称：" prop="supplierName">
						<el-input type="text" v-model="supplierMsg.supplierName" size="small" style="width:350px;"></el-input>
					</el-form-item>
					<el-form-item label="联系人：" prop="contacts">
						<el-input type="text" v-model="supplierMsg.contacts" size="small" style="width:350px;"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：" prop="phone">
						<el-input type="text" v-model="supplierMsg.phone" size="small" style="width:350px;"></el-input>
					</el-form-item>
					<el-form-item label="详细地址：" prop="address">
						<el-input type="text" v-model="supplierMsg.address" size="small" style="width:350px;"></el-input>
					</el-form-item>
					<el-form-item label="供应商账号：" prop>
						<span>{{supplierMsg.account}}</span>
					</el-form-item>
				</el-form>
			</div>
			<div class="supplier_area">
				<h4>供应区域</h4>
			</div>
			<div class="table_list" style="padding:10px 20px 10px 180px">
				<el-col :span="8">
					<el-tree
						:data="data1"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree1"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data2"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree2"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data3"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree3"
					></el-tree>
				</el-col>
			</div>
			<div class="top_list" style="padding:10px 200px">
				<el-button size="small" type="primary" @click="beforesave('supplierMsg')">
					<i class="iconfont">&#xe62d;</i> 保存
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			province: [],
			city: [],
			block: [],
			country: [],
			ruleOptions: [],
			data: [],
			data1: [],
			data2: [],
			data3: [],
			defaultProps: {
				children: "children",
				label: "areaName",
				value: "adcode"
			},
			// selectarea:["110000","120000","350000","530000","820000"],
			selectarea: [],
			supplierMsg: {
				supplierName: "",
				contacts: "",
				phone: "",
				address: "",
				areaCode: [],
				supplierRoleId: "",
				supplierAccount: "",
			},
      supplierMsgRules: {
        supplierName: [
          { required: true, message: "请填写供应商名称", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请填写电话", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的电话号码"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
          ],
        address: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ],
      }
		};
	},
	methods: {
		getSaleArea(id){
			this.Axios(
				{
					params: {
						supplierId: id
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-mall/area/findBySupplierId"
				},
				this
			).then(
				result => {
					console.log(result.data);
          let that = this;
          let data = JSON.parse(JSON.stringify(result.data.data));
          for (var item in data) {
            if (data[item].adCode.match(/100000$/)) {
              that.country.push({
                adCode: data[item].adCode,
                areaName: data[item].areaName,
                children: []
              });
            } else if (data[item].adCode.match(/0000$/)) {
              //省
              that.province.push({
                adCode: data[item].adCode,
                areaName: data[item].areaName,
                children: []
              });
            } else if (data[item].adCode.match(/00$/)) {
              //市
              that.city.push({
                adCode: data[item].adCode,
                areaName: data[item].areaName,
                children: []
              });
            } else {
              //区
              that.block.push({
                adCode: data[item].adCode,
                areaName: data[item].areaName
              });
            }
          }
          // 分类市级
          for (var index in that.province) {
            for (var index1 in that.city) {
              if (
                that.province[index].adCode.slice(0, 2) ===
                that.city[index1].adCode.slice(0, 2)
              ) {
                that.province[index].children.push(that.city[index1]);
              }
            }
          }
          //  分类区级
          for (var item1 in that.city) {
            for (var item2 in that.block) {
              if (
                that.block[item2].adCode.slice(0, 4) ===
                that.city[item1].adCode.slice(0, 4)
              ) {
                that.city[item1].children.push(that.block[item2]);
              }
            }
          }
          that.country[0].children.push(that.province);
          // console.log(that.country);
          this.data = that.country[0].children[0];
          this.data1 = this.data.slice(0, 12);
          this.data2 = this.data.slice(12, 24);
          this.data3 = this.data.slice(24, 34);
          this.getOneSupplier(id);
				},
				({ type, info }) => {}
			);
		},
		getOneSupplier(id) {
			this.Axios(
				{
					params: {
						supplierId: id
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/supplier/findSupplier"
				},
        this
			).then(
				result => {
					console.log(result.data);
					console.log("getOneSupplier");
					this.supplierMsg = result.data.data.supplierDO;
          result.data.data.area.map(item => this.selectarea.push(item.areaCode))
          console.log(this.selectarea);
          this.selectarea=JSON.parse(JSON.stringify(this.selectarea));
				},
				({ type, info }) => {}
			);
		},
		handleNodeClick(data) {
			console.log(data);
		},
		beforesave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.savearea();
        } else {
          this.$message.warning("请填写完整信息！");
          return false;
        }
      });
    },
		savearea() {
			let arr = [];
			arr = arr
				.concat(this.$refs.tree1.getCheckedKeys())
				.concat(this.$refs.tree2.getCheckedKeys())
				.concat(this.$refs.tree3.getCheckedKeys());
			if(arr.length===0){
			  this.$message.warning("请选择销售区域");
			  return
      }
			let qs = require("qs");
			let data = qs.stringify({
        supplierName:this.supplierMsg.supplierName,
        contacts:this.supplierMsg.contacts,
        phone:this.supplierMsg.phone,
        address:this.supplierMsg.address,
        supplierRoleId:2,
        id:this.$route.params.id,
        areaCode: arr.toString()
			});
			this.Axios(
				{
					params: data,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-platform/supplier/updateSupplier"
				},
				this
			).then(
				result => {
          if (result.data.code === 200) {
            this.$router.back(-1);
            this.reload();
          }
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getSaleArea(this.$route.params.id);
	},
	components: {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.edit_supplier {
	font-size: 14px;
	color: @font-normal;

	.top_list {
		// line-height: 60px;
		background-color: white;
		padding: 10px;
	}
	.bottom_list {
		background-color: white;
		margin-top: 10px;
		padding-bottom: 10px;
		overflow: hidden;
		.top_title {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
			h4 {
				float: left;
			}
		}
		.table_list {
			overflow: hidden;
			padding: 10px 200px;
			.el-col {
				max-height: 600px;
				overflow: scroll;
			}
		}
		.supplier_form {
			padding: 20px 20px 0;
			.el-form {
				border-bottom: @border;
				padding-bottom: 20px;
			}
		}
		.supplier_area {
			padding: 0 44px;
			h4 {
				line-height: 40px;
			}
		}
	}
}
</style>

