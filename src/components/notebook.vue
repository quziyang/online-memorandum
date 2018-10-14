<template>
  <div class="nodebook">
    <h1>{{title}}</h1>
    标题：<input type="text" v-model="v_name">
    <br>
    内容：<input type="text" v-model="v_content">
    <br>
    <input type="button" value="提交" @click="insertMsg">
    <!-- 留言列表 -->
    <div>
    	<ul>
    		<li v-for="(item, inx) in msg">
    			<msgItem 
    			:inx=inx
    			:itemObj=item
    			:itemId=item._id
    			@findDataFn="find"
    			/>	
    		</li>
    	</ul>
    </div>   
  </div>
</template>

<script>
import axios from 'axios';
import msgItem from './msgItem'

export default {
  name: 'notebook',
  data(){
    return {
      title: 'MongoDB Node.js Vue.js 在线备忘录 crud',
      v_name: "",
      v_content: "",
      msg: {}
    }
  },
  components: {msgItem},
  created(){
  	this.find();
  },
  methods: {
  	// 插入数据
  	insertMsg(){
  		let _msg={};
  		_msg['name']=this.v_name;
  		_msg['content']=this.v_content;
  		axios.get("http://localhost:3367/insert-data", {
  			params: {
  				insertMsg: _msg
  			}
  		})
  			.then(_d=>{
  				this.find();
  				this.v_name = '';
  				this.v_content = '';
  			})
  	},
  	// 显示数据
  	find(){
  		axios.get("http://localhost:3367/node-list")
  			 .then(_d=>{
  			 	console.log(_d);
  			 	this.msg = _d.data;
  			 })
  	},
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{margin:0;padding:0;border:0;}
  ul,ol,li{list-style: none;}
  
        #app{
        position: relative;
      }
      .modifySty{
            border:2px solid #f00;
            position: absolute;left: 10px;top: 10px;
            background: #eee;z-index: 5;width: 80%;
            height: 300px;
            font-size: 33px;
      }
      .modifySty i{
            display: block;width: 20px;height: 20px;font-size: 20px;
            position: absolute;top: 10px;right: 10px;background: #ddd;
            font-style: normal;cursor: pointer;overflow: hidden;
      }
      .modifySty i:hover{
          background: #666;
      }
      .modifySty input{
        margin-top: 10px;
      }
      /**/
      .nodebook li{
        padding:10px;display: block;clear: both;background: #999;
        overflow: hidden;margin: 10px;
      }
      .nodebook li i{
        float: left;width:20px;height:20px;border-radius: 100%;
        margin:0 5px;line-height: 20px;font-size: 12px;text-align: center;
        background: #fff;font-style: normal;
      }
      .nodebook li label{
        float: left;background: #ddd;margin-right: 10px;
      }
      .nodebook li span{
        float: left;background: #eee;margin-right: 10px;
      }

      h1, h2 {
        font-weight: normal;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        display: inline-block;
        margin: 0 10px;
      }
      a {
        color: #42b983;
      }
</style>
