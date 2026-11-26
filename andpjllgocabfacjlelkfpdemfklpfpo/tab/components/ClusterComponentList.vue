<template>
  <div class="cluster-component-list">
    <ClusterComponent
      :id="'saved_cluster-' + source._uid"
      :key="source._uid"
      :item-index="index"
      group-name="grouped-cluster"
      :ref="'saved_cluster-' + source._uid"
      :cluster="source"
      clusterType="saved"
      :findScreenshot="findScreenshot"
      :getClusterTitleFromClusterUid="getClusterTitleFromClusterUid"
      :is-picker-trigger-active="
        source._uid === emojiPickerClusterUid
      "
      @clusterDelete="clusterDelete($event)"
      @clusterUndelete="clusterUndelete($event)"
      @clusterUndeleteUndo="clusterUndeleteUndo($event)"
      @clusterReopen="clusterReopen($event)"
      @clusterUpdateTitle="clusterUpdateTitle($event)"
      @clusterAddFavourite="clusterAddFavourite($event)"
      @clusterRemoveFavourite="clusterRemoveFavourite($event)"
      @clusterUpdateTags="clusterUpdateTags($event)"
      @clusterShare="clusterShare($event)"
      @highlightAction="highlightClusterComponent($event)"
      @unsuspendAndFocusTab="unsuspendAndFocusTab($event)"
      @emojiPickerToggle="toggleEmojiPicker($event)"
    />
  </div>
</template>

<script>
import ClusterComponent from './ClusterComponent.vue'
import props from 'vue-tippy/src/props'

export default {
  name: 'ClusterComponentList',
  components: { ClusterComponent },
  props: {
    source: {
      type: Object,
      required: true
    },
    index: { // index of current item
      type: Number
    },
    emojiPickerClusterUid: {
      type: Number,
    },
    findScreenshot: {
      type: Function
    },
    getClusterTitleFromClusterUid: {
      type: Function
    },
    clusterDelete: {
      type: Function
    },
    clusterUndelete: {
      type: Function
    },
    clusterUndeleteUndo: {
      type: Function
    },
    clusterReopen: {
      type: Function
    },
    clusterUpdateTitle: {
      type: Function
    },
    clusterAddFavourite: {
      type: Function
    },
    clusterRemoveFavourite: {
      type: Function
    },
    clusterUpdateTags: {
      type: Function
    },
    clusterShare: {
      type: Function
    },
    highlightClusterComponent: {
      type: Function
    },
    toggleEmojiPicker: {
      type: Function
    },
    unsuspendAndFocusTab: {
      type: Function
    }
  }
}
</script>

<style scoped>
  .item {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgrey;
    padding: 1em;
  }
</style>