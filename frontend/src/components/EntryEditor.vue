<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{commands, isActive}">
      <div class="menubar">
        <EditorMenuButton :isActive="isActive.bold()" @click="commands.bold">
          <b-icon-type-bold></b-icon-type-bold>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.italic()"
          @click="commands.italic"
        >
          <b-icon-type-italic></b-icon-type-italic>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.strike()"
          @click="commands.strike"
        >
          <b-icon-type-strikethrough></b-icon-type-strikethrough>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.underline()"
          @click="commands.underline"
        >
          <b-icon-type-underline></b-icon-type-underline>
        </EditorMenuButton>

        <EditorMenuButton :isActive="isActive.code()" @click="commands.code">
          <b-icon-code></b-icon-code>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.code_block()"
          @click="commands.code_block"
        >
          <b-icon-file-code></b-icon-file-code>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.heading({level: 1})"
          @click="commands.heading({level: 1})"
        >
          H1
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.heading({level: 2})"
          @click="commands.heading({level: 2})"
        >
          H2
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.heading({level: 3})"
          @click="commands.heading({level: 3})"
        >
          H3
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.bullet_list()"
          @click="commands.bullet_list"
        >
          <b-icon-list-ul></b-icon-list-ul>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.ordered_list()"
          @click="commands.ordered_list"
        >
          <b-icon-list-ol></b-icon-list-ol>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.blockquote()"
          @click="commands.blockquote"
        >
          <b-icon-blockquote-left></b-icon-blockquote-left>
        </EditorMenuButton>
      </div>
    </editor-menu-bar>

    <editor-content class="editor-content" :editor="editor" />
    <p>value={{ value }}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMarkdown from 'vue-markdown';

Vue.use(VueMarkdown);

import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';
import showdown from 'showdown';

import EditorMenuButton from '@/components/EditorMenuButton';

const MARKDOWN_CONVERTER = new showdown.Converter();

export default {
  name: 'EntryEditor',
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuButton,
  },
  props: {
    value: String,
  },
  data() {
    return {
      inRichTextMode: true,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({levels: [1, 2, 3]}),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: MARKDOWN_CONVERTER.makeHtml(this.value),
        onUpdate: ({getHTML}) => {
          this.$emit('input', MARKDOWN_CONVERTER.makeMarkdown(getHTML()));
        },
      }),
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.editor {
  min-height: 500px;
}

.menubar >>> .btn {
  margin-right: 0.5rem;
}

.editor-content >>> blockquote {
  font-style: italic;
  margin-left: 1rem;
  background: rgb(224, 224, 224);
}
</style>
