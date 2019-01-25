<template>
  <div id="app">
    <el-container class="mainWrapper">
      <el-aside class="siderWrapper">
        <div class="logoWrap">
          <!-- <img src="./assets/image/logo.png"> -->
          <h3>长虹智慧厨房</h3>
          <div style="width:50px;float:left;padding-left:10px">
            <i class="iconfont" v-show="isCollapse === true" v-on:click="TroggleHandle">&#xe62b;</i>
            <i class="iconfont" v-show="isCollapse === false" v-on:click="TroggleHandle">&#xe62c;</i>
          </div>
          
        </div>
        <el-menu
          :router="true"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
        >
          <el-submenu :index="item.permissionCode"  :key="item.route" v-for="item in menuSource">
            <template slot="title" >
              <i class="iconfont" v-html="item.icon"></i>
              <span slot="title">{{item.menu}}</span>
            </template>
            <el-menu-item
              :index="subItem.route"
              :key="subItem.route"
              v-for="subItem in item.subMenu"
            >{{subItem.menu}}</el-menu-item>
          </el-submenu>
        </el-menu>
        <!-- <div
          v-on:click="TroggleHandle"
          class="isCollapse-group"
        >
          <i
            v-show="isCollapse === true"
            class="el-icon-arrow-right"
          ></i>
          <i
            v-show="isCollapse === false"
            class="el-icon-arrow-left"
          ></i>
        </div> -->
      </el-aside>
      <el-container>
        
          <el-header style="background-color:#1CC09F;">
            <div class="breadcrumbWrap">
              <breadCrumb></breadCrumb>
              <a href="login.html"></a>
            </div>
            <div class="stateList">
              <ul>
                <li>&nbsp;欢迎您：{{user}}</li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="设备状态"
                    placement="bottom-end"
                  >
                    <i
                      class="iconfont"
                      @click="pathto(0)"
                    >&#xe609;</i>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="我的消息"
                    placement="bottom-end"
                  >
                    <el-badge
                      :value="msgcount===0?'':msgcount"
                      :max="99"
                      class="item"
                    >
                      <i
                        class="iconfont"
                        @click="pathto(1)"
                      >&#xe601;</i>
                    </el-badge>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="我的工单"
                    placement="bottom-end"
                  >
                    <i
                      class="iconfont"
                      @click="pathto(2)"
                    >&#xe61d;</i>
                  </el-tooltip>
                </li>
                <li>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="退出"
                    placement="bottom-end"
                  >
                    <i
                      class="iconfont"
                      @click="out"
                    >&#xe6af;</i>
                  </el-tooltip>
                </li>
              </ul>
            </div>
          </el-header>
       
        <el-main
          class="mainContentWrapper"
          style="padding:8px;font-size:14px;"
        >
          <transition>
            <router-view v-if="isRouterAlive" />
          </transition>
        </el-main>
        <el-footer>长虹智慧厨房({{version?(new Date(version).format("yyyy/MM/dd hh:mm:ss")):'no version'}})</el-footer>
      </el-container>
    </el-container>
    <!-- <el-container >
      <transition>
        <router-view v-if="isRouterAlive"/>
      </transition>
    </el-container> -->
  </div>
</template>

<script>
import breadCrumb from "./BreadCrumb.vue";
import menuSourceMap from "./router/routeMap";
import clone from "clone";

export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  name: "App",
  data() {
    return {
      token: undefined,
      user: "",
      show: true,
      isCollapse: false,
      pictLoading: true,
      isRouterAlive: true,
      msgcount: 0,
      version: versionInfo,
      menuSource: [],
      permissionUrl: ""
    };
  },
  computed:{
      
    },
  methods: {
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    TroggleHandle(key, keyPath) {
      // console.log(key, keyPath);
      this.isCollapse = !this.isCollapse;
      EventBus.$emit("sideBarTroggleHandle", this.isCollapse);
    },
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // }

    out() {
      // this.Axios(
      //   {
      //     url: "/user/logout",
      //     type:"post",
      //     option:{enableMsg:false}
      //   },
      // ).then(response=>{
      self = this;
      this.$confirm("您确定要退出登录吗？", "确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          message: "您已退出登录",
          type: "success"
        });
        self.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("permissionUrl");

        this.$router.push({
          path: "/Login",
          redirect: "/Login"
        });
      });
      // },({type,info})=>{})
    },
    //未读消息数
    // MsgCount() {
    //   this.Axios(
    //     {
    //       url: "/message/NotReadMsgCount/",
    //       type: "get",
    //       option: {
    //         requestTarget: "m",
    //         enableMsg: false,
    //         enableLoad: false
    //       }
    //     },
    //     this
    //   )
    //     .then(result => {
    //       this.msgcount = result.data.data;
    //     })
    //     .catch(err => {});
    // },
    //路径跳转
    pathto(a) {
      //0跳转设备状态,1跳转消息,2跳转工单
      // if (a === 0) {
      //   this.$router.push({ path: "/Monit" });
      // } else if (a === 1) {
      //   this.$router.push({ path: "/Message" });
      // } else if (a === 2) {
      //   this.$router.push({ path: "/WorkOrder" });
      // }
    },
    initPermission() {
      this.user =
        JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user")).name;
      this.token = localStorage.getItem("token");
      this.permissionUrl = JSON.parse(
        localStorage.getItem("permissionUrl") || "[]"
      );
      const permissionUrl = this.permissionUrl;
      // this.user=this.$store.state.token.userMsg.name
      // this.token=this.$store.state.token.tokenNub
      // this.MsgCount();
      let _menuSource = [];
      clone(menuSourceMap).forEach(per => {
        if (per.defaultDock) {
          _menuSource.push(per);
        } else {
          const willShowMenu = per.subMenu.filter(m => {
            if (m.visible) {
              return false;
            }
            return permissionUrl.find(p => p.module === m.permissionCode)
              ? true
              : false;
          });
          if (willShowMenu.length !== 0) {
            per.subMenu = willShowMenu;
            _menuSource.push(per);
          }
        }
      });
      this.menuSource = _menuSource;
    }
  },
  // watch: {
  //   $route() {
  //     this.token = localStorage.getItem("token");
  //     this.user = JSON.parse(localStorage.getItem("user"))&&JSON.parse(localStorage.getItem("user")).name;
  //     this.permissionUrl = JSON.parse(
  //       localStorage.getItem("permissionUrl") || "[]"
  //     );
  //     this.MsgCount()
  //   },
  //   permissionUrl(){

  //   },
  //   token(val) {
  //     if (val) {
  //       this.initPermission();
  //     } else {
  //       this.$router.replace("/Login");
  //     }
  //   }
  // },
  computed: {},
  created() {
    // if(localStorage.getItem("token")){
      this.initPermission();
    // }
    //setInterval(this.MsgCount,1000)
  },
  components: {
    breadCrumb
  },
  mounted() {
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    // window.onbeforeunload = function(e) {
    //   var storage = window.localStorage;
    //   storage.clear();
    // };
  }
};
</script>

 <style lang="less" >
 @import url("./assets/less/layout.less");
.el-menu-vertical-demo {
  margin-top: 60px !important;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    // max-width: 90vh;
    overflow: scroll;
  }
}

@main-color: #1CC09F;
@bgColor:#f0f2f5;
@font-normal:#333333;
@font-subsidiary:#999999;
@font-special:#1CC09F;
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
}
.el-header {
  overflow: hidden;
  position: relative;
  font-size: 14px;
  padding: 0;
}
.breadcrumbWrap {
  position: absolute;
  left: 20px;
  bottom: 0;
  top: 0;
  margin: auto;
  height: 25px;
}
.menuItem {
  i {
    vertical-align: top;
  }
}
.stateList {
  position: absolute;
  right: 20px;
  bottom: 0;
  top: 0;
  margin: auto;
  height: 25px;
  color: white;
  i {
    font-size: 14px;
    margin: 0 2px;
    &:hover {
      color: #830404;
      font-weight: bold;
    }
  }
  // border: 1px solid @Info;
  ul {
    li {
      list-style-type: none;
      float: left;
      height: 24px;
      line-height: 24px;
      padding: 0 7px;
      //border-right: 1px solid rgb(182, 179, 179);
      cursor: pointer;
      .el-button--mini {
        padding: 5px 5px;
      }
    }
    li:last-child {
      border-right: none;
    }
  }
}
.logoWrap{
line-height: 60px;
h3{
  color: @main-color;
  width:  130px;
  float: left;
}
i{
  cursor: pointer;
}
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  width: 100%;
  margin: auto;
  min-width: 1200px;
  overflow: hidden;
}

.box {
  float: left;
  // width: 90%;
  height: 100%;
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    min-width: 170px;
  }
}
.el-menu--popup {
  background: #333 !important;
}
 .el-menu-item li:hover,.el-menu-item:hover{
   background: #666 !important;
 }
/*chrome滚动条颜色设置*/
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  //background-color: #eeeeee;
} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar-track {
  background-color: transparent;
  // border-radius: 5px;
  //-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
} /*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  background-color: #999999;
  border-radius: 3px;
  //-webkit-box-shadow: inset 0 0 6px rgba(7, 7, 7, 0.3);
} /*定义滑块 内阴影+圆角*/
</style>
