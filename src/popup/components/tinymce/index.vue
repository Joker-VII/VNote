<template>
  <div class="container">
    <tinymce-editor v-model="value" :init="initOption"></tinymce-editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme';

import 'tinymce/plugins/lists'
import 'tinymce/plugins/hr'

export default {
  name: "tinymce",
  components: {
    'tinymce-editor': Editor
  },
  data() {
    return {
      value: this.content,
      initOption: {
        height: '100%',
        skin_url: '/skins/ui/oxide',
        branding: false,
        statusbar: false,
        menubar: false,
        plugins: ['lists', 'hr'],
        toolbar: 'bold italic underline strikethrough backcolor forecolor bullist numlist hr'
       }
    };
  },
  props: {
    content: String
  },
  methods: {
  },
  watch: {
    content(newValue) {
      this.value = newValue;
    },
    value(newValue) {
      if(newValue !== this.content) {
        this.$emit('setData', newValue);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  /deep/ .tox-tinymce {
    border: 0;
    .tox-editor-container {
      .tox-editor-header {
        .tox-toolbar__primary {
          // background: none;
          background-color: #ccc;
        }
      }
    }
  }
}
</style>