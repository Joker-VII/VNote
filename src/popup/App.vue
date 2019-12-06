<template>
  <div id="app">
    <div class="aside">
      <div class="btn-wrap">
        <el-button type="primary" icon="el-icon-document" size="small" @click="bindCreate">新建</el-button>
      </div>
      <div class="tabs-wrap">
        <el-tooltip
          v-for="(doc, index) in docs"
          :key="index"
          effect="dark"
          :content="doc.title"
          placement="right"
        >
          <span
            :class="['el-tag', 'el-tag--' + doc.effect]"
            @click="bindClick(index)"
            @mouseenter="bindEnter(index)"
            @mouseleave="bindLeave(index)"
          >
            <span>{{doc.title}}</span>
            <i v-show="doc.hover" class="el-icon-close" @click.stop="bindRemove(index)"></i>
          </span>
        </el-tooltip>
      </div>
    </div>
    <div v-show="selectedDoc.selected" class="main">
      <div class="msg-wrap">
        <div class="title-wrap">
          <el-input v-model="selectedDoc.title" size="small" @input="setTitle"></el-input>
        </div>
        <div class="time-wrap">
          <span>创建时间：{{selectedDoc.createTime}}</span>
          <span>修改时间：{{selectedDoc.updateTime}}</span>
        </div>
      </div>
      <div class="content-wrap">
        <editor :content="selectedDoc.content" @setData="setContent"></editor>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import editor from './components';
import '../util';

export default {
  name: "App",
  components: {
    editor: editor.ckeditor5
  },
  data() {
    return {
      selectedIndex: -1,
      selectedDoc: {},
      docs: []
    };
  },
  methods: {
    bindCreate() {
      let doc = {
        selected: true,
        hover: false,
        effect: "dark",
        title: '新建文本文档（' + (this.docs.length + 1) + '）',
        content: '',
        createTime: new Date().getFormatTime(),
        updateTime: new Date().getFormatTime()
      };
      this.docs.push(doc);
      let selectedIndex = this.selectedIndex;
      if (selectedIndex > -1) {
        this.docs[selectedIndex].selected = false;
        this.docs[selectedIndex].effect = "light";
      }
      this.selectedIndex = this.docs.length - 1;
      this.selectedDoc = doc;
      chrome.runtime.sendMessage({command: 'setData', data: this.docs}, function(response) {});
    },
    bindClick(index) {
      if (index !== this.selectedIndex) {
        let selectedIndex = this.selectedIndex;
        if (selectedIndex > -1) {
          this.docs[selectedIndex].selected = false;
          this.docs[selectedIndex].effect = "light";
        }
        this.docs[index].selected = true;
        this.docs[index].effect = "dark";
        this.selectedIndex = index;
        this.selectedDoc = this.docs[index];
      }
    },
    bindEnter(index) {
      this.docs[index].hover = true;
      this.docs[index].effect = "dark";
    },
    bindLeave(index) {
      this.docs[index].hover = false;
      this.docs[index].effect = this.docs[index].selected ? "dark" : "light";
    },
    bindRemove(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false,
        lockScroll: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        center: true,
        confirmButtonClass: 'el-button--danger'
      }).then(() => {
        this.docs.splice(index, 1);
        if(this.selectedIndex === index) {
          this.selectedIndex = -1;
          this.selectedDoc = {};
        } else if(this.selectedIndex > index) {
          this.selectedIndex--;
        }
        chrome.runtime.sendMessage({command: 'setData', data: this.docs}, function(response) {});
      }).catch(() => {
        // 取消删除
      });
    },
    setTitle(event) {
      this.docs[this.selectedIndex].updateTime = new Date().getFormatTime();
      debounce(() => {
        chrome.runtime.sendMessage({command: 'setData', data: this.docs}, function(response) {})
      }, 100)();
    },
    setContent(data) {
      if(this.selectedIndex > -1) {
        this.docs[this.selectedIndex].content = data;
        this.docs[this.selectedIndex].updateTime = new Date().getFormatTime();
        debounce(() => {
          chrome.runtime.sendMessage({command: 'setData', data: this.docs}, function(response) {})
        }, 100)();
      }
    }
  },
  mounted() {
    chrome.runtime.sendMessage({command: 'getData', key: 'docs'}, (response) => {
      this.docs = response.value;
    });
  }
};
</script>

<style lang='less' scoped>
@import "./style/app.less";
</style>