<template>
  <div class="container">
    <ckeditor :editor="editor" :value="content" :config="editorConfig" @input="onEditorInput"></ckeditor>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue/dist/ckeditor";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Font from "@ckeditor/ckeditor5-font/src/font";
import List from "@ckeditor/ckeditor5-list/src/list";
import Horizontalline from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";

import "@ckeditor/ckeditor5-theme-lark/theme/theme.css";

export default {
  name: "ckeditor5",
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    content: String
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        plugins: [
          Essentials,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          BlockQuote,
          Font,
          List,
          Horizontalline
        ],
        toolbar: {
          items: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            'blockQuote',
            "fontbackgroundcolor",
            "fontcolor",
            "bulletedList",
            "numberedList",
            "horizontalline"
          ]
        }
      }
    };
  },
  methods: {
    onEditorInput(data, event, editor) {
      if(data !== this.content) {
        this.$emit('setData', data);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  /deep/ .ck-editor {
    height: 100%;
    display: flex;
    flex-direction: column;

    .ck.ck-toolbar {
      border: 0;
    }

    .ck-editor__main {
      flex: 1;
      overflow-y: auto;
      .ck.ck-editor__editable_inline {
        height: 100%;
        border: 0;
      }
    }
  }
}
</style>