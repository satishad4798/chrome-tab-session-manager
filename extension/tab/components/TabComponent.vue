<template>
  <tr
    class="tab"
    :class="{
      'tab--you-are-here': tabYouAreHere,
      'tab--highlighted': tabIsTabHighlighted,
      'tab--transparent': makeTransparent,
      'tab--selected': isChecked === true
    }"
    @mouseenter="updateScreenshot"
    :key="tab._uid"
  >
    <td
      class="tab-favicon center"
      @mouseenter="mouseEnterTitle"
      @mouseleave="mouseLeaveTitle"
    >
      <img
        src="/icons/ui/icon-alt-circles-background.svg"
        class="tab-favicon__background"
        v-if="isAudio && favIconMouseOver === false && editTabsMode === false"
      />
      <template
        v-if="editTabsMode || isChecked === true || favIconMouseOver === true"
      >
        <input
          :key="'tabCheckbox-' + tab._uid"
          ref="tabCheckbox"
          v-model="checkboxValueLocal"
          type="checkbox"
        />
      </template>
      <template v-else>
        <img
          :src="getFavIconLocal()"
          @click="tabIconClickEvent()"
          class="tab-favicon__icon"
        />
      </template>
      <div
        class="tab-favicon__pinned"
        v-if="isPinned && favIconMouseOver === false && editTabsMode === false"
      ></div>
    </td>
    <td
      class="tab-title left"
      @mouseenter="mouseEnterTitle"
      @mouseleave="mouseLeaveTitle"
    >
      <a
        class="tab-title__container"
        @click="tabTitleClickEvent"
        :href="
          clusterType === 'saved' || clusterType === 'archived'
            ? tab.url
            : false
        "
        :target="tabLinkTarget"
        rel="noopener"
      >
        <span v-if="searchQuery === ''">
          {{ tab.title || tab.url }}
        </span>
        <span data-search="true" v-else>
          <text-highlight :queries="[searchQuery]">{{
            tab.title || tab.url
          }}</text-highlight>
        </span>

        <div class="tab-title__arrow">
          <svg
            v-if="clusterType === 'opened'"
            width="12"
            height="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="currentColor"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M11.5 4H.5M7.5 0l4 4-4 4" />
            </g>
          </svg>
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <g
              stroke="#0F62FE"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              fill-rule="evenodd"
            >
              <path d="M6.5.5h5v5M.5 7.5h4v4h-4zM11.5.5l-5 5" />
            </g>
          </svg>
        </div>
      </a>
    </td>
    <td v-show="highlight" class="tab-note left">
      <div class="tab-note--container">
        <div class="tab-note--gradient">
          <!-- todo from jsfiddle -->
        </div>
        <div class="tab-note--text">
          <div
            class="tab-note--text--exists tab-note--text--exists--small"
            v-if="tab.note && tab.note.trim() !== ''"
            @click="triggerViewNote"
          >
            <button class="button--mini">
              <svg width="10" height="12" xmlns="http://www.w3.org/2000/svg">
                <g
                  stroke="#000"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9.5 11.5h-9V.5h9zM2.5 4.5h5M2.5 7.5h5" />
                </g>
              </svg>
              <span>View</span>
            </button>
          </div>
          <div
            class="tab-note--text--exists tab-note--text--exists--big"
            v-if="tab.note && tab.note.trim() !== ''"
            @click="triggerViewNote"
          >
            <button class="button--mini">
              <svg width="10" height="12" xmlns="http://www.w3.org/2000/svg">
                <g
                  stroke="#000"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9.5 11.5h-9V.5h9zM2.5 4.5h5M2.5 7.5h5" />
                </g>
              </svg>
              <span>View</span>
            </button>
            <label
              v-if="tab.note && searchQuery === ''"
              @click="triggerViewNote"
            >
              {{ tab.note }}
            </label>
            <label v-else @click="triggerViewNote">
              <text-highlight :queries="[searchQuery]" v-if="tab.note">{{
                tab.note
              }}</text-highlight>
            </label>
          </div>
          <div class="tab-note--text--doesnotexist" v-else>
            <button class="button--mini" @click="triggerEditNote">
              <svg width="10" height="12" xmlns="http://www.w3.org/2000/svg">
                <g
                  stroke="#000"
                  fill="none"
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9.5 11.5h-9V.5h9zM2.5 4.5h5M2.5 7.5h5" />
                </g>
              </svg>
              <span>Add +</span>
            </button>
          </div>
        </div>
      </div>
    </td>

    <!--
      <td v-show="highlight" class="tab-note center" >
        <label>
          <text-highlight :queries="[searchQuery]">{{tabNote}}</text-highlight>
        </label>
      </td>
      -->

    <td v-show="highlight" class="tab-date left">
      {{ tabShowDate }}
    </td>
    <td
      class="tab-url right"
      @mouseenter="showQrCode()"
      @mouseleave="hideQrCode()"
    >
      <span :title="tab.url" v-if="searchQuery === ''">
        {{ getHostnameText }}
      </span>
      <span :title="tab.url" v-else>
        <text-highlight :queries="[searchQuery]">{{
          getHostnameText
        }}</text-highlight>
      </span>
    </td>
    <td class="tab-buttons center">
      <button
        class="button--mini button--mini--red_on_hover"
        @click="tabXButtonClickEvent()"
      >
        <svg width="8" height="8" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.5.5l-7 7m0-7l7 7"
            stroke="#000"
            fill="none"
            fill-rule="evenodd"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </td>
  </tr>
</template>

<script>
// import { getHostnameForDisplay, getDateDisplay, getTimeDisplay, isToday, getFavIcon } from '../../library/library'
import Library from '../../library/library'

import VueTippy, { TippyComponent } from 'vue-tippy'
import { FeatureFlags, hasFeatureFlag } from '../../utils/featureFlags'
import BehaviorMode from '../../background/managers/BehaviorMode'

export default {
  name: 'TabComponent',
  components: {
    VueTippy,
    tippy: TippyComponent
  },
  props: {
    tab: {
      type: Object,
      required: true,
      validator: function (value) {
        const neededKeys = ['url', '_uid']

        neededKeys.forEach(function (key) {
          if (!value.hasOwnProperty(key)) {
            return false
          }
        })

        return true
      }
    },
    isChecked: Boolean, // is this one checked or not from outside

    clusterUid: Number,
    clusterType: String,
    highlight: Boolean,
    editTabsMode: Boolean,
    onTabCheckboxChangeFunction: Function,
    resetCheckbox: Boolean,
    // these two do not work as reactive if in object "tab"
    makeTransparent: Boolean,

    isSuspended: Boolean,

    searchQuery: String,
    thisTabId: Number,
    settingsTableroneTimestampFormat: String,
    settingsTableroneTimeFormat: String,
    settingsTableroneDateFormat: String,

    forceIcon: {
      type: String,
      required: false,
      default: ''
    }
  },
  data: () => {
    return {
      resetCheckboxTrue: false,
      favIconMouseOver: false,
      isNewTabMode: false
    }
  },
  async created() {
    if (await BehaviorMode.checkIfIsNewTabOnly()) {
      this.isNewTabMode = true
    }
  },
  methods: {
    triggerEditNote() {
      this.$emit('triggerEditNote', {
        tabTitle: this.tab.title,
        tabUrl: this.tab.url,
        tabUid: this.tab._uid,
        originalNote: this.tab.note,
        mode: 'edit'
      })
    },
    triggerViewNote() {
      this.$emit('triggerEditNote', {
        tabTitle: this.tab.title,
        tabUrl: this.tab.url,
        tabUid: this.tab._uid,
        originalNote: this.tab.note,
        mode: 'view'
      })
    },
    updateScreenshot() {
      if (this.tab.url) {
        this.$emit('updateScreenshot', {
          tabUrl: this.tab.url,
          tabUid: this.tab._uid
        })
      } else {
        // alert('tab url seems to be undefined')
      }
    },
    showQrCode() {
      if (this.tab.url) {
        this.$emit('showQrCode', this.tab.url)
      } else {
        // alert('tab url seems to be undefined')
      }
    },
    hideQrCode() {
      if (this.tab.url) {
        this.$emit('showQrCode', '')
      } else {
        // alert('tab url seems to be undefined')
      }
    },
    tabXButtonClickEvent() {
      this.$emit('tabXButtonClickEvent', {
        tabUid: this.tab._uid,
        tabId: this.tab.id,
        windowId: this.tab.windowId,
        isSuspended: this.isSuspended,
        url: this.tab.url
      }) // we have this only if it is saved
    },
    /*
      tabUrlClickEvent () {
        this.$emit('tabUrlClickEvent', { tabUid: this.tab._uid, tabId: this.tab.id, windowId: this.tab.windowId, isSuspended: this.isSuspended, url: this.tab.url }) // we have this only if it is saved
      },
       */
    tabTitleClickEvent(event) {
      this.$emit('tabTitleClickEvent', {
        tabUid: this.tab._uid,
        tabId: this.tab.id,
        windowId: this.tab.windowId,
        isSuspended: this.isSuspended,
        url: this.tab.url,
        clickEvent: event
      }) // we have this only if it is saved
    },

    tabIconClickEvent() {
      this.$emit('tabIconClickEvent', {
        tabUid: this.tab._uid,
        tabId: this.tab.id,
        windowId: this.tab.windowId,
        isSuspended: this.isSuspended,
        url: this.tab.url
      }) // we have this only if it is saved
    },
    getFavIconLocal() {
      if (this.forceIcon !== '') {
        return this.forceIcon
      } else {
        // If a random number is not used in the url string, the browser renders a cached version of the image, i.e., in this case, it renders the default icon.
        return `${Library.getFavIcon(this.tab)}&${Math.random()}`
      }
    },
    mouseEnterTitle() {
      this.favIconMouseOver = true
    },
    mouseLeaveTitle() {
      this.favIconMouseOver = false
    }
  },
  computed: {
    tabShowDate() {
      const dateStr = this.tab._addedDate || this.tab._openedDate || new Date().toISOString()
      const myDate = new Date(Date.parse(dateStr))
      if (isNaN(myDate.getTime())) return ''
      if (this.settingsTableroneTimestampFormat === 'relative') {
        return Library.timeSince(myDate, false)
      } else {
        if (Library.isToday(myDate)) {
          return Library.getTimeDisplay(
            myDate,
            this.settingsTableroneTimeFormat
          )
        } else {
          return Library.getDateDisplay(
            myDate,
            this.settingsTableroneDateFormat,
            false
          )
        }
      }
      // return (myDate.getDate()) + ' ' + myDate.toLocaleString('default', { month: 'short' }) + ' ' + myDate.getFullYear()
    },
    isAudio() {
      return this.tab.audible || false
    },
    isPinned() {
      return this.tab.pinned || false
    },

    /**
     * Computed property for determining the target attribute value of a hyperlink in Vue.js.
     * This property depends on the reactive data property `isNewTabMode`.
     *
     * When `isNewTabMode` is true, it signifies that the link should open in the same tab or frame,
     * returning '_self'. Otherwise, it returns '_blank', indicating that the link should open in
     * a new tab or window.
     *
     * @returns {string} The target attribute value ('_self' or '_blank') for the hyperlink.
     *
     * @generated by ChatGPT
     */
    tabLinkTarget() {
      if (this.isNewTabMode) {
        return '_self'
      }

      return '_blank'
    },

    tabYouAreHere() {
      if (this.clusterType === 'opened') {
        return this.tab.id === this.thisTabId // && this.tab.windowId === this.clusterProvide.thisWindowId
      } else {
        return false
      }
    },
    tabIsTabHighlighted() {
      // when testing, we had problems with highlighted not being updated in data ?!
      if (this.clusterType === 'opened') {
        return this.tab.active || false // && this.tab.highlighted
      } else {
        return false
      }
    },
    getHostnameText() {
      return Library.getHostnameForDisplay(this.tab.url)
    },
    checkboxValueLocal: {
      // getter
      get: function () {
        return this.isChecked // we get value from prop (calculated in ClusterComponent)
      },
      // setter
      set: function (newValue) {
        const args = { tabUid: this.tab._uid, value: newValue }
        // alert('args' + JSON.stringify(args))
        this.$emit('tabCheckedChange', args) // we send value to ClusterComponent
      }
    }
  }
}
</script>

<style></style>
