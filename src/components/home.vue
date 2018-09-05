<template>
  <div class="home">
    <!-- site header -->
    <header class="header">
      <div class="sidebar-toggle-box">
        <div class="fa fa-bars tooltips" @click="Hideaside"><i class="iconfont icon-caidan1"></i></div>
      </div>
      <div class="logo">
        <router-link to="/" class="logoName">Olive</router-link>
      </div>
    </header>
    <!-- site aside -->
    <aside class="aside" v-show="isShow">
      <div class="sideBar">
        <ul class="sideMenu">
          <li v-for="(item, index) in tabs" v-bind:key="index" v-on:click="currentTab = item.name" :class="['tab-button', { active: currentTab === item.name }]"><i class="iconfont icon-yibiaopan"></i>{{ item.value }}</li>
        </ul>
      </div>
    </aside>
    <!-- site section -->
    <section class="main-content" :class="[this.isShow == true ? 'ml' : '']">
      <div class="wrapper">
        <component
          v-bind:is="currentTabComponent"
        >
        </component>
      </div>
    </section>
    <!-- site footer -->
    <footer class="site-footer">
      <div class="text-content">2018 © Olive Admin by <span class="autor">liting</span></div>
    </footer>
  </div>
</template>

<script>
import page1 from '@/components/page1';
import page2 from '@/components/page2';
import page3 from '@/components/page3';
import page4 from '@/components/page4';
export default {
  name: 'home',
  data () {
    return {
      isShow: true,
      currentTab: 'one',
      tabs: [
        { name: 'one', value: '菜单一' },
        { name: 'two', value: '菜单二' },
        { name: 'three', value: '菜单三' },
        { name: 'four', value: '菜单四' }
      ]
    };
  },
  methods: {
    Hideaside: function () {
      this.isShow = !this.isShow;
    }
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-' + this.currentTab.toLowerCase();
    }
  },
  components: {
    'tab-one': page1,
    'tab-two': page2,
    'tab-three': page3,
    'tab-four': page4
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.home
  width 100%
  .ml
    margin-left 210px
  .tab-button.active
    background #35404d
  .header
    width 100%
    background $color-h
    min-height 60px
    padding 0 15px
    position fixed
    left 0
    right 0
    z-index 1002
    .sidebar-toggle-box
      padding-right 15px
      float left
      .tooltips
        margin-top 15px
        background-color #FFF
        padding 6px
        border-radius 9px
        color #1b809d
      .fa-bars
        cursor pointer
        display inline-block
        font-size 20px
        .icon-caidan1
          font-size 20px
    .logo
      float left
      margin-top 20px
      .logoName
        float left
        font-size 21px
        color #2e2e2e
        text-transform uppercase
  .aside
    .sideBar
      width 210px
      height 100%
      position fixed
      background #2a3542
      .sideMenu
        margin-top 75px
        padding 0 15px
        li
          margin-bottom 5px
          padding 15px 0 15px 10px
          font-size 12px
          color $color-text-d
          .icon-yibiaopan
            color #72d0eb
            font-size 16px
            padding-right 6px
  .main-content
    .wrapper
      display inline-block
      margin-top 60px
      height 100%
      padding 15px
      width 100%
      min-height 500px
      background #fff
  .site-footer
    background #5b6e84
    color #fff
    padding 10px 0
    width 100%
    .text-content
      text-align center
      color #fff
      font-size 13px
      .autor
        color #72d0eb
        font-size 16px
</style>
