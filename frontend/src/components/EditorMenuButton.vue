<template>
  <b-button
    :variant="isActive ? 'dark' : 'outline-dark'"
    class="menubar__button"
    :class="{'is-active': isActive}"
    @click="onClick"
  >
    <slot></slot>
  </b-button>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
  },
  methods: {
    onClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>
