<template>
  <div :id="'group-cluster-'+source.id">
    <!-- replace this with collection group -->
    <div class="hr">
      <div class="hr--title">{{ source.title }}</div>
      <div class="hr--line"></div>
      <div class="hr--details">
        {{ displayDetails(source.clusters, 'Session') }}
      </div>
    </div>
    <div v-for="cluster in source.clusters">
      <ClusterComponent
        :id="'saved_cluster-' + cluster._uid"
        :key="cluster._uid"
        :item-index="index"
        group-name="grouped-cluster"
        :ref="'saved_cluster-' + cluster._uid"
        :cluster="cluster"
        clusterType="saved"
        :findScreenshot="findScreenshot"
        :getClusterTitleFromClusterUid="getClusterTitleFromClusterUid"
        :is-picker-trigger-active="
        cluster._uid === emojiPickerClusterUid
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

<!--    <virtual-list-->
<!--      ref="group-cluster-list"-->
<!--      style="overflow-y: auto;"-->
<!--      :data-key="'_uid'"-->
<!--      :data-sources="source.clusters"-->
<!--      :data-component="ClusterComponentList"-->
<!--      :estimate-size="source.clusters.length"-->
<!--      :extra-props="{-->
<!--        emojiPickerClusterUid,-->
<!--        findScreenshot,-->
<!--        getClusterTitleFromClusterUid,-->
<!--        clusterDelete,-->
<!--        clusterUndelete,-->
<!--        clusterUndeleteUndo,-->
<!--        clusterReopen,-->
<!--        clusterUpdateTitle,-->
<!--        clusterAddFavourite,-->
<!--        clusterRemoveFavourite,-->
<!--        clusterUpdateTags,-->
<!--        clusterShare,-->
<!--        highlightClusterComponent,-->
<!--        toggleEmojiPicker,-->
<!--        unsuspendAndFocusTab-->
<!--      }"-->
<!--      :page-mode="true"-->
<!--    />-->

  </div>
</template>

<script>
import ClusterComponentList from './ClusterComponentList.vue'
import ClusterComponent from '@/tab/components/ClusterComponent.vue'

export default {
  name: 'GroupClusterComponentList',
  computed: {
    ClusterComponentList() {
      return ClusterComponentList
    }
  },
  components: { ClusterComponent,  ClusterComponentList },
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
    displayDetails: {
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
    },
    registerGroupCluster: {
      type: Function
    }
  },
  mounted() {
    this.registerGroupCluster(this.source.id, this.$refs['group-cluster-list'])
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