<template>
  <div ref="reactContainer"></div>
</template>
<script>
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Timeline }  from '@v2/tbl-ui/pages/Timeline/Timeline'

export default {
  props: {
    favorites: {
      type: Array,
      default: []
    },
    tags: {
      type: Array,
      default: []
    },
    windowId: {
      type: Number,
      default: null
    },
    archivesCount: {
      type: Number,
      default: 0
    },
    selectedNavMenu: {
      type: String,
      default: 'home'
    },
    selectedTag: {
      type: String,
      default: null
    },
    openSession: Function,
    closeSession: Function,
    onFavoritesDragEnd: Function,
    onTagsDragEnd: Function,
    onHomeSelect: Function,
    onTagSelect: Function,
    onArchiveSelect: Function,
    onHelpSelect: Function,
    onScrollToSession: Function,
    onSidebarToggle: Function
  },
  data() {
    return {
      root: null
    }
  },
  mounted() {
    this.root = createRoot(this.$refs.reactContainer)
    this.renderReactComponent()
  },
  methods: {
    handleSelect(type, data = {}, event) {
      switch (type) {
        case 'home': {
          window.scrollTo({ top: 0, behavior:'smooth' })
          return this.onHomeSelect()
        }
        case 'help': {
          return this.onHelpSelect()
        }
        case 'archive': {
          return this.onArchiveSelect()
        }
        case 'tags': {
          return this.onTagSelect(data)
        }
        case 'favorite': {
          switch (data.state) {
            case 'favorited': {
              this.openSession({
                clusterUid: data.id,
                source: 'collection'
              })
              return
            }
            case 'active':
              const sessionData = this.favorites.find((item) => item._uid === data.id)

              if (sessionData && sessionData.windowId) {
                chrome.windows.update(sessionData.windowId, { focused: true })
              }
              return
            case 'selected': {
              this.closeSession(data.id)
            }
          }
          return
        }
      }

    },
    handleShiftSelect(type, data) {
      switch (type) {
        case 'favorite': {
          const sessionData = this.favorites.find((item) => item._uid === data.id)
          switch (data.state) {
            case 'favorited':
              this.onScrollToSession(sessionData._uid)
              return
            case 'active':
              this.closeSession(data.id)
          }
        }
      }
    },
    handleFavoriteDragEnd(data) {
      const moved = {
        oldIndex: data.source.index,
        newIndex: data.destination.index,
      }
      this.onFavoritesDragEnd({ moved })
    },
    handleTagsDragEnd(data) {
      const moved = {
        oldIndex: data.source.index,
        newIndex: data.destination.index,
      }
      this.onTagsDragEnd({ moved })
    },
    getEmojiIcon(icon) {
      if (!icon) {
        return '📁'
      }
      if (icon.isCustom) {
        return icon.imageUrl;
      }
      return icon.emoji
    },
    transformFavorites(sessions) {
      return sessions.map((session) => {
        let state = 'favorited'
        if (session?.windowId !== undefined) {
          state = 'active'
        }
        if ( session?.windowId === this.windowId) {
          state = 'selected'
        }
        return {
          id: session._uid,
          emoji: this.getEmojiIcon(session?.icon),
          label: session?.title ?? session?.tabs?.[0]?.title ?? '',
          state
        }
      })
    },
    transformTags(tags) {
      return tags.map((tag) => ({
        ...tag,
        selected: this.selectedTag === tag.title
      }))
    },
    renderReactComponent() {
      const favorites = this.transformFavorites(this.favorites)
      const tags = this.transformTags(this.tags)
      this.root.render(
        React.createElement(Timeline, {
          selectedNavMenu: this.selectedNavMenu,
          favorites,
          tags,
          archivesCount: this.archivesCount,
          onSelect: this.handleSelect,
          onShiftSelect: this.handleShiftSelect,
          onFavoritesDragEnd: this.handleFavoriteDragEnd,
          onTagsDragEnd: this.handleTagsDragEnd,
          onSidebarToggle: this.onSidebarToggle
        })
      )
    }
  },
  watch: {
    favorites(newValue) {
      this.renderReactComponent()
    },
    tags(updatedTags) {
      const isTagClustersEmpty = updatedTags.filter((t) => t.title === this.selectedTag)
      if (updatedTags.length === 0 || isTagClustersEmpty.length === 0) {
        this.onHomeSelect()
      }
      this.renderReactComponent()
    },
    windowId(newValue) {
      this.renderReactComponent()
    },
    selectedNavMenu(newValue) {
      this.renderReactComponent()
    },
    selectedTag(newValue) {
      this.renderReactComponent()
    },
    archivesCount(updatedArchiveCount) {
      if (updatedArchiveCount === 0) {
        this.onHomeSelect()
      }
      this.renderReactComponent()
    }

  }
}
</script>