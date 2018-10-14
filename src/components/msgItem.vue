<template>
	<div class="itemWrap">
		<i>{{inx}}</i>
		<label>new 作者：{{itemObj.name}}</label>
        <span>内容：{{itemObj.content}}</span>
        <span @click="delMsg(itemObj._id)">删除</span>
        <div class="isx">
        	<div @click="modifyFn">修改</div>
        	<div v-show="isshow" class="editWrap">
            	<i @click="closeModifyFn">X</i>
            	<input type="text"  v-model="resultContent" />
            	<input @click="saveData" type="button" value="提交" />
            </div>
        </div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: "msgItem",
	data(){
		return {
			resultContent: "",
			resultAuthor: "",
			isshow: false,
		}
	},
	props: ["inx", "itemObj", "itemId"],
	methods: {
		// 根据id删除一条数据并触发另一事件
		delMsg(_itemId){
			axios.get("http://localhost:3367/node-del", {
  				params: {
  					delMsg: {_id:_itemId}
  				}
  			})
  				.then(_d=>{
					this.$emit("findDataFn");
  				})
		},
		// 显示修改输入框，并将现有数据的content填入修改输入框
		modifyFn(){
			this.isshow = true;
			axios.get("http://localhost:3367/node-find-id", {
  				params: {
  					findIdMsg: {_id:this.itemId}
  				}
  			})
  				.then(_d=>{
					this.resultContent=_d.data.content;
  				})
		},
		closeModifyFn(){
			this.isshow = false;
		},
		// 将修改后的数据传到Node.js中并触发另一事件
		// （根据修改后的数据的id更新该条数据，更新后姓名为空，内容为修改后内容）
		saveData(){
					axios.get("http://localhost:3367/node-save-id", {
  						params: {
  							saveIdMsg: {
  								  			"_id":this.itemId,
  								 			"_author":this.resultAuthor,
  								  			"_msg":this.resultContent
  							   			}
  						}
  					})
  						.then(_d=>{
  								this.isshow = false;
								this.getIdFindData();
								console.log(_d);
  						})
		},
		// 将修改了的数据的姓名和内容在页面中进行修改
		getIdFindData(){
			axios.get("http://localhost:3367/node-find-id", {
  				params: {
  					findIdMsg: {
  								  "_id":this.itemId,
  							   }
  				}
  			})
  				.then(_d=>{
					this.itemObj.content=_d.data.content;
					this.itemObj.name=_d.data.name;
  				})
		},
	},
}
</script>

<style scoped>
	.itemWrap{}
	.itemWrap i{
		width:20px;height: 20px;border-radius: 100%;
		background: #000;color: #fff;text-align: center;line-height: 20px;
		font-size: 14px;display: block;float: left;font-style: normal;
	}

	.isx{width: 200px;height: auto;float: left;}
	.isxInfo{
		background: #ddd;
	}
	.editWrap{}
	.editWrap i{
		float: right;clear: both;
	}
</style>