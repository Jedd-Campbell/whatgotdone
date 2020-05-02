<template>
  <div class="editor rich-text-editor form-control">
    <editor-menu-bar :editor="editor" v-slot="{commands, isActive}">
      <div class="menubar">
        <EditorMenuButton
          :isActive="isActive.bold()"
          tooltip="Bold"
          @click="commands.bold"
        >
          <b-icon-type-bold></b-icon-type-bold>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.italic()"
          tooltip="Italic"
          @click="commands.italic"
        >
          <b-icon-type-italic></b-icon-type-italic>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.strike()"
          tooltip="Strikethrough"
          @click="commands.strike"
        >
          <b-icon-type-strikethrough></b-icon-type-strikethrough>
        </EditorMenuButton>

        <EditorMenuButton
          :class="{'is-active': isActive.link()}"
          tooltip="Link"
          @click="onClickLink"
        >
          <b-icon-link></b-icon-link>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.code()"
          tooltip="Inline code"
          @click="commands.code"
        >
          <b-icon-code></b-icon-code>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.code_block()"
          tooltip="Code block"
          @click="commands.code_block"
        >
          <b-icon-file-code></b-icon-file-code>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.heading({level: 1})"
          tooltip="Main heading"
          @click="commands.heading({level: 1})"
        >
          H1
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.heading({level: 2})"
          tooltip="Subheading"
          @click="commands.heading({level: 2})"
        >
          H2
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.heading({level: 3})"
          tooltip="Subsection heading"
          @click="commands.heading({level: 3})"
        >
          H3
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.bullet_list()"
          tooltip="Bulleted list"
          @click="commands.bullet_list"
        >
          <b-icon-list-ul></b-icon-list-ul>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.ordered_list()"
          tooltip="Numbered list"
          @click="commands.ordered_list"
        >
          <b-icon-list-ol></b-icon-list-ol>
        </EditorMenuButton>

        <EditorMenuButton
          :isActive="isActive.blockquote()"
          tooltip="Quote"
          @click="commands.blockquote"
        >
          <b-icon-blockquote-left></b-icon-blockquote-left>
        </EditorMenuButton>

        <EditorMenuButton
          tooltip="For markdown enthusiasts"
          @click="$emit('changeMode')"
        >
          Plaintext Editor
        </EditorMenuButton>
      </div>
    </editor-menu-bar>

    <hr />

    <editor-content class="editor-content" :editor="editor" />
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
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
} from 'tiptap-extensions';
import showdown from 'showdown';

import EditorMenuButton from '@/components/EditorMenuButton';

const MARKDOWN_CONVERTER = new showdown.Converter({
  omitExtraWLInCodeBlocks: true,
  noHeaderId: true,
  simplifiedAutoLink: true,
  excludeTrailingPunctuationFromURLs: true,
  strikethrough: true,
  tables: true,
  openLinksInNewWindow: true,
  emoji: true,
});

export default {
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
          new Heading({levels: [1, 2, 3]}),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
        ],
        content: MARKDOWN_CONVERTER.makeHtml(this.value),
        onUpdate: ({getHTML}) => {
          this.$emit('input', MARKDOWN_CONVERTER.makeMarkdown(getHTML()));
        },
      }),
    };
  },
  methods: {
    onClickLink() {
      console.log('onClickLink');
      // TODO
    },
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.menubar {
  margin: 0.5em 0em;
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
