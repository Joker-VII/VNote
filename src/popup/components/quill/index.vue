<template>
  <div class="container">
    <quill-editor
      :content="content"
      :options="editorOption"
      @change="onEditorChange($event)"
    ></quill-editor>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  name: "quill",
  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: ['bold', 'italic', 'underline', 'strike', 'blockquote', {'list': 'ordered'}, {'list': 'bullet'}, { 'color': [] }, { 'background': [] }]
        }
      }
    };
  },
  props: {
    content: String
  },
  methods: {
    onEditorChange({ quill, html, text }) {
      if(html !== this.content) {
        this.$emit('setData', html);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  /deep/ .quill-editor {
    height: 100%;
    display: flex;
    flex-direction: column;

    .ql-toolbar.ql-snow {
      border: 0;
      background-color: #CCC;
    }

    .ql-container.ql-snow {
      flex: 1;
      border: 0;
      overflow: auto;
    }
  }
}
</style>