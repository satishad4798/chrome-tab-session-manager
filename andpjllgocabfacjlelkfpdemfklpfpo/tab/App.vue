<template>
  <div
    id="main-app"
    :class="{
      'blurred-except-modals--extreme': blurredContainerExtreme,
      'blurred-except-modals': blurredContainer
    }"
    style="display: flex"
  >
    <react-vue-wrapper
      :class="{
        collapsed: sidebarCollapsed
      }"
      id="sidebar"
      :selectedNavMenu="selectedNavMenu"
      :selectedTag="selectedTag"
      :windowId="currentWindowId"
      :favorites="favouriteClusters"
      :tags="orderedTags"
      :archivesCount="archivedClustersCount"
      :openSession="clusterReopen"
      :closeSession="clusterSaveAndCloseWindow"
      :onHomeSelect="onHomeSelect"
      :onTagSelect="onTagSelect"
      :onArchiveSelect="openArchive"
      :onHelpSelect="openHelpcenter"
      :onFavoritesDragEnd="favouritesOrderChange"
      :onTagsDragEnd="onTagsOrderChange"
      :onScrollToSession="onJumpToSession"
      :onSidebarToggle="onSidebarToggle"
    />
    <div
      id="app-container"
      :class="{
        'blurred-except-modals--extreme': blurredContainerExtreme,
        'blurred-except-modals': blurredContainer,
        'first-start': firstStart,
        'sidebar-collapsed': sidebarCollapsed
      }"
    >
      <div
        :style="'left: ' + emojiPickerX + 'px; top: ' + emojiPickerY + 'px; height: ' + emojiPickerHeight + 'px'"
        style="
          position: fixed;
          z-index: 100111;
          overflow: hidden;
          top: 10rem;
          overscroll-behavior: none;
          border-radius: 8px;
          width: 400px;
          box-shadow: var(--color-picker-shadow);
        "
        v-show="shouldShowIconPicker"
        v-on-clickaway="closeEmojiPicker"
      >
        <iframe ref="emojiPickerIframe" width="400px" :height="emojiPickerHeight + 'px'" style="border: none"></iframe>
      </div>
      <div id="button-settings" class="button--main" @click="buttonSettingsClicked()">
        <span class="button--main--tooltip button--main--tooltip__to_left">Settings</span>
        <!--<img src="/icons/ui/settings.svg">-->
        <svg width="23" height="23" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#000014" stroke-linecap="square" fill="none" fill-rule="evenodd">
            <path
              d="M22.5 11.5a2 2 0 00-2-2h-1.262a7.968 7.968 0 00-.852-2.058l.892-.892a2 2 0 10-2.828-2.828l-.892.892a7.968 7.968 0 00-2.058-.852V2.5a2 2 0 00-4 0v1.262a7.968 7.968 0 00-2.058.852l-.892-.892A2 2 0 103.722 6.55l.892.892A7.968 7.968 0 003.762 9.5H2.5a2 2 0 000 4h1.262c.189.732.477 1.422.852 2.058l-.892.892a2 2 0 102.828 2.828l.892-.892a7.953 7.953 0 002.058.852V20.5a2 2 0 004 0v-1.262a7.968 7.968 0 002.058-.852l.892.892a2 2 0 102.828-2.828l-.892-.892a7.953 7.953 0 00.852-2.058H20.5a2 2 0 002-2z"
            />
            <circle cx="11.5" cy="11.5" r="3" />
          </g>
        </svg>
        <div class="notification-bubble" v-show="isBubbleDisplayed"></div>
      </div>
      <!--    <div-->
      <!--      id="button-support"-->
      <!--      class="button&#45;&#45;main"-->
      <!--      @click="buttonSupportClicked()"-->
      <!--    >-->
      <!--      &lt;!&ndash;<img src="/icons/ui/support.svg">&ndash;&gt;-->
      <!--      &lt;!&ndash;<img src="/icons/ui/icon-help-questionmark.svg">&ndash;&gt;-->
      <!--      <svg width="23" height="23" xmlns="http://www.w3.org/2000/svg">-->
      <!--        <g fill="none" fill-rule="evenodd">-->
      <!--          <circle-->
      <!--            stroke="#000"-->
      <!--            stroke-linecap="round"-->
      <!--            stroke-linejoin="round"-->
      <!--            cx="11.5"-->
      <!--            cy="11.5"-->
      <!--            r="11"-->
      <!--          />-->
      <!--          <circle fill="#000" fill-rule="nonzero" cx="11.5" cy="17.5" r="1" />-->
      <!--          <path-->
      <!--            d="M9.353 6.06c1.98-.875 4.542-.771 5.417.645s.271 3.063-1.229 4.334C12.041 12.31 11.5 13 11.5 14"-->
      <!--            stroke="#000"-->
      <!--            stroke-linecap="round"-->
      <!--            stroke-linejoin="round"-->
      <!--          />-->
      <!--        </g>-->
      <!--      </svg>-->
      <!--      <span class="button&#45;&#45;main&#45;&#45;tooltip button&#45;&#45;main&#45;&#45;tooltip__to_right"-->
      <!--        >Visit support</span-->
      <!--      >-->
      <!--    </div>-->
      <div id="button-export" class="button--main" @click.once="buttonNukeClicked()">
        <!--<img src="/icons/ui/btn-nuke.svg">-->
        <span class="button--main--tooltip button--main--tooltip__to_left">Save & close all</span>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#000" stroke-linecap="round" stroke-linejoin="round" fill="none" fill-rule="evenodd">
            <path opacity=".66" d="M5.5 9.5v-4h13v13h-4" />
            <path opacity=".33" d="M.5 8.5v-8h23v23h-8" />
            <path d="M14.5 15.5h-6v-6h6zM.5 17.5v6h6M.5 23.5l6-6" />
          </g>
        </svg>
      </div>
      <!--</div>-->

      <!-- notifications for first start / start -->
      <!-- notifications for first start / end -->

      <div id="modal_window" v-if="modalWindowDisplay">
        <share-modal
          v-if="modalWindowDisplayShare"
          @closeModalWindow="closeModalWindow($event)"
          @notifyAboutShare="notifyAboutShare($event)"
          :title="shareModalTitle"
          :clusterUid="shareModalClusterUid"
        >
        </share-modal>
        <edit-notes-modal v-if="modalWindowDisplayEditNotes" @closeModalWindow="closeModalWindow($event)">
        </edit-notes-modal>
      </div>

      <div id="settings" v-show="settingsDisplay" style="">
        <settings
          :donationVoteAndSuggestUrl="TABLERONE_URL_DONATION_VOTE_AND_SUGGEST"
          :privacyPolicyUrl="TABLERONE_URL_PRIVACY_POLICY"
          :termsOfServiceUrl="TABLERONE_URL_TERMS_OF_SERVICE"
          :setAsHomePageUrl="TABLERONE_URL_SET_AS_HOME_PAGE"
          :releaseNotesUrl="TABLERONE_URL_RELEASE_NOTES"
          :settings="settings"
          :getSetting="getSetting"
          :settingsOpenHighlightCloseTabsAfterSaving="settingsOpenHighlightCloseTabsAfterSaving"
          :settingsOpenHighlightSuspend="settingsOpenHighlightSuspend"
          :settingsOpenHighlightSetTableroneAs="settingsOpenHighlightSetTableroneAs"
          @closeSettings="closeSettings($event)"
          @resetImportModeOnStartup="resetImportModeOnSettingsStartup"
          :importModeOnStartup="importModeOnSettingsStartup"
        ></settings>
      </div>

      <div id="helpcenter" v-show="helpcenterDisplay" style="">
        <help-center
          :donationVoteAndSuggestUrl="TABLERONE_URL_DONATION_VOTE_AND_SUGGEST"
          :privacyPolicyUrl="TABLERONE_URL_PRIVACY_POLICY"
          :termsOfServiceUrl="TABLERONE_URL_TERMS_OF_SERVICE"
          :setAsHomePageUrl="TABLERONE_URL_SET_AS_HOME_PAGE"
          :releaseNotesUrl="TABLERONE_URL_RELEASE_NOTES"
          @closeHelpcenter="closeHelpcenter($event)"
        ></help-center>
      </div>

      <div id="tab_and_menu_pusher-container">
        <!--      <div id="left_menu_pusher" :class="leftMenuOpened ? 'opened' : ''"></div>-->

        <div id="tab" style="position: relative">
          <search-container
            ref="searchContainer"
            :isSearchMode="isSearchMode"
            :showNavbar="showNavbar"
            :searchBackToTimeline="resetSearch"
            @openNewWindow="openNewWindow($event)"
          ></search-container>
          <!-- get bookmarks -->
          <!--
                <button @click="testBookmarks">bookmarks</button>
                <div>
                  <div v-for="bookmark in bookmarks" style="border: 1px solid blue">
                    {{bookmark.title}}
                    <br>
                    <span v-for="tag in bookmark.tags">{{tag}} ></span>
                    <br>
                    <ul>
                      <li v-for="tab in bookmark.tabs">
                        {{tab.title}} {{tab.url}}
                      </li>
                    </ul>
                  </div>
                </div>
                -->
          <!--
                <span>BETA VERSION: debug info below</span><br>
                <span>searchInput is [{{searchInput}}]</span>
                <span>searchQuery is [{{searchQuery}}]</span>
                <span>isSearchMode is [{{isSearchMode}}]</span>
                <span>isQueryMode is [{{isQueryMode}}]</span>
                <span v-if="isKeyPressedMeta">isKeyPressedMeta</span>
                <span v-if="isKeyPressedAlt">isKeyPressedAlt</span>
                <span v-if="isKeyPressedControl">isKeyPressedControl</span>
                <span v-if="isKeyPressedShift">isKeyPressedShift</span>
                <br>
                <br>
                -->
          <!--              <button @click="testC">alert</button>-->
          <!--<button @click="testShowAlert();">alert</button>-->
          <!-- <button @click="sendCommand('test.checkIfOptIn')">Optin check</button> -->
          <!--
                  <img :src="testSrc" style="height: 100px; width: auto;">
                  -->
          <!--
                  <div v-if="testMode">
                      <button @click="testSleepAtNight();">Test sleep at night</button>
                      <button @click="syncClustersWithBookmarks();">Bookmarks sync</button>
                      <button @click="testConsoleDisplayState();">state</button>
                      <button @click="testShowAlert();">alert</button>
                      <button @click="testViaMessageCommand('test-favourites-maintenance');">favourites maintenance</button>
                      <button @click="triggerOnStateChange();">triggerOnStateChange</button>
                      <button @click="ClusterComponentRefreshCounter++">Update windows</button>
                      <button @click="sendCommand('display.settings')">Display settings</button>
                      <button @click="sendCommand('alarms.check')">Alarms check</button>
                  </div>
                  <small>Window id: {{thisWindowId}}</small>
                  <small>Tab id: {{thisTabId}}</small>
                  <div style="position: absolute; right: 0; top: 0; font-size: 20px; background: black; color: white; width: 40px;">
                      {{ClusterComponentRefreshCounter}}
                  </div>

                  <span>filteredOpenedClusters: {{filteredOpenedClusters.length}}</span><br>
                  <span>filteredSavedClusters: {{filteredSavedClusters.length}}</span><br>
                  <span>groupedFilteredSavedClusters: {{groupedFilteredSavedClusters.length}}</span><br>
                  <span>filteredOrphanedClusters: {{groupedFilteredSavedClusters.length}}</span><br>

                  <button @click="sendCommand('settings.debug')">Alarms check</button>
                  <button @click="sendCommand('display.settings')">Display settings</button>
                  -->
          <div v-if="isNoSearchResults && isQueryMode">Sorry, no results were found for "{{ searchQuery }}"</div>
          <div class="hr" v-if="filteredOpenedClustersThisWindow.length > 0 && archiveMode === false">
            <div class="hr--title">This session</div>
            <div class="hr--line"></div>
            <div class="hr--details">
              {{ displayDetailsOnlyTabs(filteredOpenedClustersThisWindow, 'Session') }}
            </div>
          </div>

          <!-- code duplicate for both filteredOpenedClustersThisWindow and filteredOpenedClustersAllButThisWindow -->
          <div
            v-if="filteredOpenedClustersThisWindow.length > 0 && archiveMode === false"
            id="opened_clusters_this"
            :class="{ 'show-only-titles': loadingMode }"
          >
            <!-- @mouseover="resetShowOnlyTitles()" -->
            <!-- TODO: id was active_cluster-... - test if everything works -->
            <div
              v-for="(cluster, index) in filteredOpenedClustersThisWindow"
              :key="cluster._uid"
              :id="'opened_cluster-' + cluster._uid"
              class="cluster--container opened_clusters--cluster"
              style="width: 100%"
            >
              <cluster-component
                :key="cluster._uid"
                :item-index="index"
                group-name="opened"
                :ref="'saved_cluster-' + cluster._uid"
                :cluster="cluster"
                clusterType="opened"
                :showOnlyOnObserveSettingProp="false"
                :findScreenshot="findScreenshot"
                :getClusterTitleFromClusterUid="getClusterTitleFromClusterUid"
                :is-picker-trigger-active="cluster._uid === emojiPickerClusterUid"
                @clusterDelete="clusterDelete($event)"
                @clusterUndelete="clusterUndelete($event)"
                @clusterUndeleteUndo="clusterUndeleteUndo($event)"
                @clusterReopen="clusterReopen($event)"
                @clusterUpdateTitle="clusterUpdateTitle($event)"
                @clusterAddFavourite="clusterAddFavourite($event)"
                @clusterRemoveFavourite="clusterRemoveFavourite($event)"
                @clusterUpdateTags="clusterUpdateTags($event)"
                @clusterShare="clusterShare($event)"
                @clusterSave="clusterSave($event)"
                @clusterSaveAndCloseWindow="clusterSaveAndCloseWindow($event)"
                @highlightAction="highlightClusterComponent($event)"
                @unsuspendAndFocusTab="unsuspendAndFocusTab($event)"
                @emojiPickerToggle="toggleEmojiPicker($event)"
              ></cluster-component>
            </div>
          </div>

          <div class="hr" v-if="filteredOpenedClustersAllButThisWindow.length > 0 && archiveMode === false">
            <div class="hr--title" v-if="filteredOpenedClustersThisWindow.length > 0">Other sessions</div>
            <div class="hr--title" v-else>Current sessions</div>
            <div class="hr--line"></div>
            <div class="hr--details">
              {{ displayDetails(filteredOpenedClustersAllButThisWindow, 'Session') }}
            </div>
          </div>

          <!-- code duplicate for both filteredOpenedClustersThisWindow and filteredOpenedClustersAllButThisWindow -->
          <div
            v-if="filteredOpenedClustersAllButThisWindow.length > 0 && archiveMode === false"
            id="opened_clusters_other"
            :class="{ 'show-only-titles': loadingMode }"
          >
            <!-- @mouseover="resetShowOnlyTitles()" -->
            <!-- TODO: id was active_cluster-... - test if everything works -->
            <div
              v-for="(cluster, index) in filteredOpenedClustersAllButThisWindow"
              :key="cluster._uid"
              :id="'opened_cluster-' + cluster._uid"
              class="cluster--container opened_clusters--cluster"
              style="width: 100%"
            >
              <cluster-component
                :key="cluster._uid"
                :item-index="index"
                group-name="opened-other-window"
                :ref="'saved_cluster-' + cluster._uid"
                :cluster="cluster"
                clusterType="opened"
                :showOnlyOnObserveSettingProp="false"
                :findScreenshot="findScreenshot"
                :getClusterTitleFromClusterUid="getClusterTitleFromClusterUid"
                :is-picker-trigger-active="cluster._uid === emojiPickerClusterUid"
                @clusterDelete="clusterDelete($event)"
                @clusterUndelete="clusterUndelete($event)"
                @clusterUndeleteUndo="clusterUndeleteUndo($event)"
                @clusterReopen="clusterReopen($event)"
                @clusterUpdateTitle="clusterUpdateTitle($event)"
                @clusterAddFavourite="clusterAddFavourite($event)"
                @clusterRemoveFavourite="clusterRemoveFavourite($event)"
                @clusterUpdateTags="clusterUpdateTags($event)"
                @clusterShare="clusterShare($event)"
                @clusterSave="clusterSave($event)"
                @clusterSaveAndCloseWindow="clusterSaveAndCloseWindow($event)"
                @highlightAction="highlightClusterComponent($event)"
                @unsuspendAndFocusTab="unsuspendAndFocusTab($event)"
                @emojiPickerToggle="toggleEmojiPicker($event)"
              ></cluster-component>
            </div>
          </div>

          <div v-if="groupedFilteredSavedClusters.length > 0 && archiveMode === false" id="saved_clusters">
            <virtual-list
              ref="savedClustersVirtualList"
              class="list"
              style="overflow-y: auto"
              :data-key="'id'"
              :data-sources="groupedFilteredSavedClusters"
              :data-component="GroupClusterComponentList"
              :estimate-size="groupedFilteredSavedClusters.length"
              :extra-props="{
                emojiPickerClusterUid,
                findScreenshot,
                displayDetails,
                getClusterTitleFromClusterUid,
                clusterDelete,
                clusterUndelete,
                clusterUndeleteUndo,
                clusterReopen,
                clusterUpdateTitle,
                clusterAddFavourite,
                clusterRemoveFavourite,
                clusterUpdateTags,
                clusterShare,
                highlightClusterComponent,
                toggleEmojiPicker,
                unsuspendAndFocusTab,
                registerGroupCluster
              }"
              :page-mode="true"
            />
          </div>

          <div id="initial-cluster-loader" v-show="initialClusterLoaderShow">
            <div class="spinner">
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
              <div class="spinner-blade"></div>
            </div>
          </div>

          <div
            v-show="
              gettingStarted &&
              firstStart === false &&
              archiveMode === false &&
              searchQuery === '' &&
              searchTags.length === 0
            "
            id="getting_started_clusters"
          >
            <div class="saved_clusters--day">
              <div class="cluster_component">
                <div class="cluster_component--content">
                  <div class="saved_clusters--day--cluster" id="saved_cluster-onetab">
                    <cluster-dummy-component
                      dummyBrand="import"
                      @buttonClicked="openSettingsAndImport($event)"
                      @buttonClicked2="importBookmarks($event)"
                    ></cluster-dummy-component>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- do not show this when searching -->
          <template v-if="archiveMode === true">
            <div id="archive-header-buttons">
              <button @click="onResetTimeline" id="back-to-time--button" class="button--normal" style="margin-left: 0">
                <!--<img src="/icons/ui/blue-e-add.svg">-->
                <svg width="11" height="21" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5.5l-10 10 10 10"
                    stroke="#0F62FE"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    fill-rule="evenodd"
                  />
                </svg>
                <span>Back to timeline</span>
              </button>
              <button
                @click="emptyArchiveClicked"
                id="empty-archive--button"
                class="button--normal button--normal__red_hover"
              >
                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" fill-rule="evenodd" stroke="#0F62FE" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2.5 8.5v5a2 2 0 002 2h7a2 2 0 002-2v-5M5.5 3.5v-3h5v3M.5 3.5h15v3H.5z"></path>
                  </g>
                </svg>
                <span>Empty archive</span>
              </button>
            </div>

            <div id="archived_clusters">
              <div
                v-for="(cluster, index) in archivedClustersToDisplay"
                :key="'archived_cluster-' + cluster.archiveType + '-' + cluster._uid"
                :id="'archived_cluster-' + cluster.archiveType + '-' + cluster._uid"
                style="margin-bottom: 50px; width: 100%"
                class="opened_clusters--cluster"
              >
                <cluster-component
                  :key="'archived_cluster-' + cluster.archiveType + '-' + cluster._uid"
                  :item-index="index"
                  group-name="archived"
                  :ref="'saved_cluster-' + cluster._uid"
                  :cluster="cluster"
                  clusterType="archived"
                  :getClusterTitleFromClusterUid="getClusterTitleFromClusterUid"
                  :findScreenshot="findScreenshot"
                  :is-picker-trigger-active="cluster._uid === emojiPickerClusterUid"
                  @clusterDelete="clusterDeleteFromArchive($event)"
                  @clusterRestoreFromArchive="clusterRestoreFromArchive($event)"
                  @clusterReopen="clusterReopen($event)"
                  @clusterUpdateTitle="clusterUpdateTitle($event)"
                  @clusterAddFavourite="clusterAddFavourite($event)"
                  @clusterRemoveFavourite="clusterRemoveFavourite($event)"
                  @clusterUpdateTags="clusterUpdateTags($event)"
                  @highlightAction="highlightClusterComponent($event)"
                ></cluster-component>
              </div>
            </div>
          </template>

          <div style="width: 100%; height: 128px" id="articifical-bottom-padding"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClusterComponent from './components/ClusterComponent.vue'
import Settings from './components/Settings/Settings.vue'
import HelpCenter from './components/HelpCenter/HelpCenter.vue'
import SearchContainer from './components/SearchContainer.vue'
import ReactVueWrapper from './components/ReactVueWrapper.vue'

import Library from '../library/library'
import Keys from '../library/keys'

import draggable from 'vuedraggable'

import { mixin as clickaway } from 'vue-clickaway'

import VueTagsInput from '@johmun/vue-tags-input'
import KNOTDB, { checkDBQuota } from '../library/knotidb'
import ClusterDummyComponent from './components/ClusterDummyComponent.vue'
import ShareModal from './components/ShareModal/ShareModal.vue'
import EditNotesModal from './components/EditNotesModal/EditNotesModal.vue'

import { mapActions, mapGetters } from 'vuex'
import {
  APP_ENV,
  DB_TBL_CLUSTERS,
  DB_TBL_DELETED_CLUSTERS,
  DB_TBL_NOTIFICATIONS,
  DB_TBL_ORPHANED_CLUSTERS,
  DB_TBL_SCREENSHOTS,
  DB_TBL_SETTINGS,
  NEW_TAB_DEFAULT_CLOSE_DELAY_MS,
  TABLERONE_URL_DONATION_VOTE_AND_SUGGEST,
  TABLERONE_URL_PRIVACY_POLICY,
  TABLERONE_URL_RELEASE_NOTES,
  TABLERONE_URL_SET_AS_HOME_PAGE,
  TABLERONE_URL_TERMS_OF_SERVICE,
  TABLERONE_URL_UPDATE
} from '../config'

import BehaviorMode from '../background/managers/BehaviorMode'
import { log } from '../utils/loggerone'
import openSession from '@/background/managers/SessionOpener'
import GroupClusterComponentList from './components/GroupClusterComponentList.vue'
import Tab from '@/background/managers/Tab'
import Backup, {
  BACKUP_REQUEST_NOTIFICATION_TYPE,
  BACKUP_LOW_SPACE_WARNING_NOTIFICATION_TYPE,
  BACKUP_LOW_GDRIVE_SPACE_WARNING_NOTIFICATION_TYPE
} from '@/background/managers/Backup'

const SAVED_CLUSTERS_ORDER = '_updatedDate' // ["_addedDate", "_updatedDate"]
const FAKE_LOADING_TIME = 2170 // arbitrary number, but faster than 2400ms
const FIRST_CLUSTER_LOAD_SAVED_CLUSTERS_LIMIT = 15 // how many saved clusters to show first (after opened ones)
// const SEARCH_CONTAINER_HEIGHT = 128

// const LAST_LAZY_LOADED_DATE_ALL = 10001015 // year 1000, 15.10.1000 :)

if (APP_ENV === 'production') {
  console.log = function () {}
}

export default {
  mixins: [clickaway],

  data: () => {
    return {
      TABLERONE_URL_DONATION_VOTE_AND_SUGGEST: '',
      TABLERONE_URL_TERMS_OF_SERVICE: '',
      TABLERONE_URL_PRIVACY_POLICY: '',
      TABLERONE_URL_SET_AS_HOME_PAGE: '',
      TABLERONE_URL_UPDATE: '',
      TABLERONE_URL_RELEASE_NOTES: '', // proper init via GlobalSetings in mounted
      FIRST_CLUSTER_LOAD_SAVED_CLUSTERS_LIMIT,

      BehaviorMode,

      firstStart: false, // is this first start or not (happens after install - parameter is added to url)
      gettingStarted: false, // is getting started displayed or not

      shouldShowIconPicker: false,
      triggerElement: null,
      emojiPickerX: 0,
      emojiPickerY: 0,
      emojiPickerHeight: 352, // * default for the picker, changes to 288 for the custom uploader
      emojiPickerClusterUid: null,
      emojiPickerToLoad: false, // only load emoji picker, when it's needed

      isNumberOneTab: false,

      showNavbar: true,
      lastScrollPosition: 0,

      settingsDisplay: false,
      settingsOpenHighlightCloseTabsAfterSaving: false, // if we highlight one setting (if we click cancel on first use of the button)
      settingsOpenHighlightSuspend: false, // if we highlight suspend setting
      settingsOpenHighlightSetTableroneAs: false,

      helpcenterDisplay: false,

      modalWindowDisplay: false, // for modal window

      modalWindowDisplayShare: false,
      modalWindowDisplayEditNotes: false,

      testMode: true,

      archiveMode: false,

      // we get this values from Query
      tableroneAsPortalMode: false, // when opening new window (if we are new window) start in portal mode

      initialClusterLoaderShow: false, // whether to show #initial-cluster-loader or not

      // searchQuery: '', //what is in search input field //now via VUEX
      // searchTags: [], //which tags are in search input fields //now via VUEX

      leftMenuOpened: false,

      // highlightedClusterComponentClusterUid: null, //which ClusterComponent _id is highlightened //now via VUEX

      thisWindowId: null, // id of this window / TODO: update when detached etc.
      thisTabId: null, // id of this window / TODO: update when detached etc.
      currentWindowId: null,
      selectedNavMenu: 'home',
      selectedTag: null,
      tagOrder: null,

      newClusters: [],
      archivedClusters: [], // this only get's filled when we click archived clusters
      archivedClustersCount: 0, // we only count with this one

      settings: {}, // this will be the new settings

      loadingClusterUid: -1, // we use it when we want to "load" the cluster when we click the extension button
      loadingMode: false,

      // ClusterComponentRefreshCounter: 0, //we use this to force reload when screenshots are loaded

      ignoreBodyClick: false, // should body click (to unmute and deselect cluster) be ignored

      importModeOnSettingsStartup: '', // used if we want to run Settings with import (it is reset right after settings are mounted)

      // what key is pressed
      isKeyPressedModifier: false,

      /*
        anyModifierKeyList: [
          'Meta',
          'Shift',
          'Control',
          'Alt',
          'Tab',
        ],
        */
      numberOfModifierKeysPressed: 0, // we need this to ignore shortcuts (like CMD+R) for instant search
      isKeyPressedControl: false,
      isKeyPressedAlt: false,
      isKeyPressedShift: false,
      isKeyPressedMeta: false,

      shareModalTitle: '',
      shareModalClusterUid: 0,
      savedClusterRefs: new Map(),
      sidebarCollapsed: true,

      isBubbleDisplayed: false // tracks if Google Drive is connected

      /* example of reactive variable
        xxx: {
          value: 'Initial',
        },
        */
    }
  },
  /* we make it reactive like this
    provide() {
      return {
        testValue: this.xxx
      }
    }, */
  reactiveProvide: {
    name: 'clusterProvide',
    include: [
      'isKeyPressedModifier',
      'thisWindowId',
      'thisTabId',
      'clustersForSelect',
      'searchQuery', // this weirdly works (although it is vuex)
      'searchTags',
      // 'highlightedClusterComponentClusterUid', //now via vuex
      'loadingClusterUid',
      'settings',
      'filteredSavedClustersToSelect',
      'tagsForSelect'
    ]
  },
  mounted() {
    const self = this

    setTimeout(() => {
      // lazy load the emoji picker iframe after 2 second, if it hasn't been loaded before.
      // if it isn't lazy loaded before, there is a small FOUC due to css loading inside the iframe.
      this.emojiPickerToLoad = true
    }, 2000)

    // a radical approach to discourage duplicated tablerone tabs (especially when browser crashes)
    Library.removeDuplicatedPinnedTableroneTabs()

    // also do it 5 seconds later
    setTimeout(function () {
      Library.removeDuplicatedPinnedTableroneTabs()
    }, 5 * 1000)

    // also do it 10 seconds later
    setTimeout(function () {
      Library.removeDuplicatedPinnedTableroneTabs()
    }, 10 * 1000)

    /// init of settings
    this.TABLERONE_URL_DONATION_VOTE_AND_SUGGEST = TABLERONE_URL_DONATION_VOTE_AND_SUGGEST
    this.TABLERONE_URL_TERMS_OF_SERVICE = TABLERONE_URL_TERMS_OF_SERVICE
    this.TABLERONE_URL_PRIVACY_POLICY = TABLERONE_URL_PRIVACY_POLICY
    this.TABLERONE_URL_SET_AS_HOME_PAGE = TABLERONE_URL_SET_AS_HOME_PAGE
    this.TABLERONE_URL_UPDATE = TABLERONE_URL_UPDATE
    this.TABLERONE_URL_RELEASE_NOTES = TABLERONE_URL_RELEASE_NOTES
    chrome.windows.getCurrent().then((currentWindow) => {
      this.currentWindowId = currentWindow.id
    })
    this.tagOrder = JSON.parse(localStorage.getItem('tagOrder') ?? 'null')

    const params = Library.getParamsFromUrl(window.location.href)

    // add shift listeners
    window.addEventListener('keydown', function (e) {
      if (!e) e = window.event

      if (e.key === 'Shift') {
        self.isKeyPressedModifier = true // the key that is modified
        self.isKeyPressedShift = true

        self.setShift(true)
      } else if (e.key === 'Control') {
        self.isKeyPressedControl = true
      } else if (e.key === 'Alt') {
        self.isKeyPressedAlt = true
      } else if (e.key === 'Meta') {
        self.isKeyPressedMeta = true
      }
      /*
        if (!e.metaKey) {
          if (e.keyCode >= 65 && event.keyCode <= 90 || e.keyCode >= 48 && event.keyCode <= 57) {
            self.$refs['searchContainer'].focusMainSearchInput()
          }
        }
        */
      // this is only used when we are in search mode only (no modals / settings)
      if (self.modalWindowDisplay === false && self.settingsDisplay === false && self.helpcenterDisplay === false) {
        // here we go from search if we press ESC in search mode (actually, query mode, but OK)
        if (self.isQueryMode === true) {
          // if we are not searching yet (is the query empty?)
          if (self.isActiveCluster === false) {
            // if we are not editing the cluster
            if (e.key === 'Escape') {
              // it is escape so we go out of search mode
              self.$store.dispatch('updateFocused', false)
              self.$store.dispatch('updateSearchInput', '')
              self.$store.dispatch('updateQuery', '')
            }
          }
        }

        // INSTANT SEARCH
        // Problem: if we Cmd+1 the 1 button is still pressed and it immediately triggers
        // make this better => CMD+1 problem
        // this is in nextTick because changes to self.isKeyPressed* are not instant (weird, really weird)
        // self.$nextTick(function() {
        if (self.isQueryMode === false) {
          // if we are not searching YET (is the query empty?)
          if (self.isActiveCluster === false) {
            // if we are not editing the cluster
            // we go to test further
            if (e.key !== '1') {
              // sometimes when people use #1T they use Cmd+1 and if they release Cmd before 1, 1 stays => with this we ignore it
              if (!e.metaKey) {
                // we ignore press any other buttons (like Tab etc. it should not init Instant Type)
                if (!Keys.allKeys().includes(e.key)) {
                  // if (String.fromCharCode(e.keyCode).match(/(\p{L}\p{N}\p{M}\p{S})*/gu)) { //unicode (L)etter, (N)umber, (M)ark, (S)ymbol
                  if (
                    !self.isKeyPressedMeta &&
                    !self.isKeyPressedShift &&
                    !self.isKeyPressedAlt &&
                    !self.isKeyPressedControl
                  ) {
                    // ignore currently active presses of these modifier keys
                    // V1 - sucky solution because we have to focus somewhere else then
                    // this.$store.dispatch('updateQuery', e.key) //we just push this key to search and that is it (isSearchMode will be true)

                    console.log('MANAGED TO TRIGGER WITH THIS', e.key)

                    // V2 - we just focus the input and keyup action will fill this input
                    self.$refs.searchContainer.focusMainSearchInput(true)

                    // do not bubble (to prevent using this key anywhere else)
                    // e.preventDefault()
                  } else {
                    // pressed key is a non-char
                    // e.g. 'Esc', 'Backspace', 'UpArrow'
                    console.log('modifier is was pressed before')
                  }
                } else {
                  console.log('key is other key (Escape, Up, Down etc.)', e.key)
                }
              } else {
                console.log('key is meta')
              }
            } else {
              console.log('key is 1')
            }
          } else {
            console.log('some cluster is active')
          }
        } else {
          console.log('isQueryMode is true')
        }
      }
      // })
    })

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        self.isKeyPressedModifier = false // the key that is modified
      }
      switch (e.key) {
        case 'Control':
          self.isKeyPressedControl = false
          break
        case 'Alt':
          self.isKeyPressedAlt = false
          break
        case 'Shift':
          self.isKeyPressedShift = false
          self.setShift(false)
          break
        case 'Meta':
          self.isKeyPressedMeta = false
          break
        default:
      }
    })

    // if we change focuses on the window -> reset everything
    window.addEventListener('focus', (e) => {
      // without timeout, we seem to get focus on the search somehow with CMD+1
      setTimeout(() => {
        this.sendMessage({
          command: 'notifications'
        })
        self.isKeyPressedModifier = false // force reset of the key if out focus
        self.isKeyPressedControl = false
        self.isKeyPressedAlt = false
        self.isKeyPressedShift = false
        self.setShift(false)
        self.isKeyPressedMeta = false
        // self.displayUnseenNotificationsOnFocus()
        this.checkGoogleDriveConnection()
      }, 100)
    })

    this.checkGoogleDriveConnection()

    // this.descriptionText = chrome.i18n.getMessage("extDesc")
    /*
      //
      //IMPORTANT: this is now moved into tab.tsx
      //
      if (Object.prototype.hasOwnProperty.call(params, 'forceOpen')) {
        //continue
        //console.log("beforeCreate: yes, we have forceOpen in params", params)
      } else {

        this.getSetting('newWindowMode').then((result) => {
          if (result === 'home') {
            window.location.replace('about:blank')
          }
        })
      }
      */

    if (Object.prototype.hasOwnProperty.call(params, 'tableroneAsPortal')) {
      this.tableroneAsPortalMode = true
    }

    // is it first start or not
    if (Object.prototype.hasOwnProperty.call(params, 'settingsOpen')) {
      this.openSettings()
    }

    if (Object.prototype.hasOwnProperty.call(params, 'settingsOpenHighlightCloseTabsAfterSaving')) {
      this.settingsOpenHighlightCloseTabsAfterSaving = true
    }
    if (Object.prototype.hasOwnProperty.call(params, 'settingsOpenHighlightSuspend')) {
      this.settingsOpenHighlightSuspend = true
    }

    if (params.focusSetAs) {
      this.settingsOpenHighlightSetTableroneAs = true
    }

    // is it first start or not
    if (Object.prototype.hasOwnProperty.call(params, 'firstStart')) {
      this.firstStart = true
      // document.getElementsByTagName('body')[0].classList.add('first-start')
    }

    /* (async () => {
          await self.loadDataFromIDB()
      })() */

    // on first load this is not ready for some weird reason since 1.5
    this.loadSettingsFromIDB()
    // this is an ugly solution for this
    setTimeout(() => {
      self.loadSettingsFromIDB()
    }, 2 * 1000)
    setTimeout(() => {
      self.loadSettingsFromIDB()
    }, 5 * 1000)

    this.firstClusterLoadFromIDB()
    this.countArchivedClustersFromIDB()

    // with this we capture all clicks
    document.getElementsByTagName('body')[0].onclick = function (e) {
      const sidebarFavorites = document.querySelector('#timeline-sidebar-favorites')
      if (!sidebarFavorites.contains(e.target)) {
        self.bodyClickEvent(e)
      }
    }

    // we can assign vue functions to global actions, so we can use them from toasts (not a pretty solution)
    // window.highlightClusterAction = this.highlightClusterAction

    document.addEventListener(
      'click',
      function (event) {
        // If the clicked element doesn't have the right selector, bail
        if (!event.target.matches('.highlight_cluster_action')) return

        // Don't follow the link
        event.preventDefault()

        const clusterUid = parseInt(event.target.getAttribute('data-clusterUid'))
        self.highlightClusterAction(clusterUid)
      },
      false
    )

    // preload images
    /* const image1 = new Image()
      const image2 = new Image()
      const image3 = new Image()
      const image4 = new Image()
      const image5 = new Image()
      const image6 = new Image()
      const image7 = new Image()
      image1.src = '/icons/ui/blue-tags-stack.svg'
      image2.src = '/icons/ui/blue-tags-stack-full.svg'
      image3.src = '/icons/ui/blue-heart.svg'
      image4.src = '/icons/ui/blue-copy.svg'
      image5.src = '/icons/ui/blue-export.svg'
      image6.src = '/icons/ui/blue-download.svg'
      image7.src = '/icons/ui/blue-close.svg' */

    // fake loading
    // a) enable fake loading
    if (Object.prototype.hasOwnProperty.call(params, 'clusterUid')) {
      // && Object.prototype.hasOwnProperty.call(params, 'mode') === false
      this.clusterLoadingModeOn(parseInt(params.clusterUid))
    }

    // set tab and window ids
    this.getAndSetTabAndWindowIds()

    // let t0 = performance.now()
    // let timeEventsArray = []

    // this.ClusterComponentRefreshCounter++ //reload all ClusterComponent via key change

    // we only listen to changes in storage and changes with state and act accordingly
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      switch (request.command) {
        case 'close-icon-picker': {
          self.closeEmojiPicker()
          return false
        }
        case 'sharedStateChangeSidebarOpen':
          const sidebarOpen = request.sidebarOpen
          self.toggleLeftMenu(sidebarOpen)
          return false // fake onmessage response
        case 'statechange':
          // TODO: possible performance issue
          self.getAndSetTabAndWindowIds() // a little bit of overkill (any change on tabs also refreshes this)
          return false // fake onmessage response
        case 'search.query':
          // const messageSearchTabId = request.details.tabId
          const messageSearchWindowId = request.details.windowId
          const messageSearchQuery = request.details.query
          // are we in the same window and only then run it
          if (self.thisWindowId === messageSearchWindowId && self.isNumberOneTab) {
            chrome.tabs.update(
              self.thisTabId,
              {
                active: true // and also focus it
              },
              function () {
                self.$store.dispatch('updateQuery', messageSearchQuery)
                self.$store.dispatch('updateSearchInput', messageSearchQuery)
              }
            )
          }
          return false // fake onmessage response
        case 'cluster.loading':
          const loadingClusterUid = request.clusterUid
          self.clusterLoadingModeOn(loadingClusterUid)
          // alert('We should be loading ' + loadingClusterUid)
          return false // fake onmessage response
        case 'clusters.db.updated':
          self.loadClustersFromIDB()

          // TODO: only count archived clusters
          // V1
          // self.loadArchivedClustersFromIDB()

          // V2 - you should only load archive clusters when you click archive
          self.countArchivedClustersFromIDB()

          // if we are viewing archive => we update it
          if (self.archiveMode) {
            self.loadArchivedClustersFromIDB()
          }
          return false // fake onmessage response
        // only displays them for a duration (different than being read from database + must close)
        case 'notifications.show-autoclose-notification':
          // this displays temporary notifications (you do not need to close them)
          self.$toasted.show('<div>' + request.message + '</div>', {
            duration: 7000,
            onComplete: function () {
              // oncomplete is not called if undo is clicked
            },
            containerClass: 'toasted-type-' + request.type,
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  // chrome.tabs.create({ url: TABLERONE_URL_UPDATE })
                  // self.$emit('clusterDelete', clusterDetails)
                  toastObject.goAway(0)
                }
              }
            ]
          })
          return false // fake onmessage response
        case 'notifications.updated':
          self.displayUnseenNotifications()
          return false // fake onmessage response
        case 'notifications.updated.focus':
          self.displayUnseenNotificationsOnFocus()
          return false // fake onmessage response
        case 'settings.db.updated':
          self.loadSettingsFromIDB()
          return false // fake onmessage response
        case 'extension.update-done':
          // what happens after we update extension
          const details = request.details
          const currentVersion = chrome.runtime.getManifest().version
          self.$toasted.show(
            `<div>Thank you for updating Tablerone to latest version v${currentVersion} (from v${details.previousVersion}).</div>`,
            {
              duration: 10000,
              onComplete: function () {
                // oncomplete is not called if undo is clicked
              },
              className: 'toasted-color-white toasted-type-info',
              action: [
                {
                  text: '',
                  onClick: (e, toastObject) => {
                    // chrome.tabs.create({ url: this.TABLERONE_URL_UPDATE })
                    // self.$emit('clusterDelete', clusterDetails)
                    toastObject.goAway(0)
                  }
                }
              ]
            }
          )
          return false // fake onmessage response
        case 'open-settings':
          log.timelineTab.trace('onMessage', request.command)
          self.openSettings()
          return false
        case 'backup.created':
          self.checkGoogleDriveConnection(true)
          return false
      }
    })

    window.addEventListener('scroll', this.onScroll)

    // notify that we have loaded tablerone
    this.sendMessage({ command: 'tablerone.tab.loaded' })

    // trigger getting sidebarOpen state sync (not sending sidebarOpen param)
    this.sendMessage({ command: 'sharedState.sidebarOpen' })

    this.$nextTick(function () {
      self.displayUnseenNotifications()
      // Scroll after mount
      const clusterUid = new URLSearchParams(location.search).get('clusterUid')
      if (clusterUid) {
        setTimeout(() => {
          const opened = document.getElementById(`opened_cluster-${clusterUid}`)
          if (opened) {
            return opened.scrollIntoView()
          }
          const saved = document.getElementById(`saved_cluster-${clusterUid}`)
          if (saved) {
            saved.scrollIntoView()
          }
        }, 500)
      }
    })

    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = (event) => {
      Library.setTheme(this.settings.theme)
    }
    darkModeQuery.addEventListener('change', handleThemeChange)

    this.checkLowSpaceWarning()
  },
  beforeDestroy() {
    // this.sendMessage({ command: 'tablerone.tab.destroyed'})
    window.removeEventListener('scroll', this.onScroll)
  },
  created: function () {
    document.addEventListener('keyup', this.escapeKeyListener)
  },
  destroyed: function () {
    document.removeEventListener('keyup', this.escapeKeyListener)
  },
  methods: {
    registerGroupCluster(id, ref) {
      this.savedClusterRefs.set(id, ref)
    },
    openSession,
    ...mapActions({
      updateQuery: 'updateQuery',
      updateTags: 'updateTags',
      updateTagsPush: 'updateTagsPush'
    }),
    ...mapActions(['setAlt', 'setControl', 'setShift', 'setMeta']),

    updateEmojiPickerUrl(clusterUid) {
      this.$refs.emojiPickerIframe.src = this.getBasePickerUrl + `#clusterUid=${clusterUid}`
    },

    unsuspendImageSource(url) {
      return Library.unsuspendURL(url)
    },

    toggleEmojiPicker({ clusterUid, event }) {
      this.emojiPickerToLoad = true // signal to load emoji iframe on demand

      this.flipPickerDisplayState()

      this.triggerElement = event.currentTarget
      this.positionPicker(event.currentTarget)

      this.markTriggerButtonAsActive(clusterUid)
    },

    flipPickerDisplayState() {
      this.shouldShowIconPicker = !this.shouldShowIconPicker
    },

    positionPicker(element) {
      const rect = element.getBoundingClientRect()
      const x = rect.x
      const y = rect.y
      const height = rect.height

      this.emojiPickerX = x
      this.emojiPickerY = y + height + 5
    },

    markTriggerButtonAsActive(clusterUid) {
      this.emojiPickerClusterUid = clusterUid
    },

    closeEmojiPicker() {
      this.shouldShowIconPicker = false
      this.emojiPickerClusterUid = null
      this.emojiPickerX = 0
      this.emojiPickerY = 0
    },

    triggerMailto() {
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'reportABug',
        eventProps: {
          source: 'feedback'
        }
      })

      // window.open(this.mailtoString());
      const newlink = document.createElement('a')
      newlink.setAttribute('href', this.mailtoString())
      newlink.setAttribute('target', '_new') // if you have gmail as default, this should be done like this
      newlink.click()
      try {
        document.removeChild(newlink)
      } catch (e) {}

      return true
    },

    mailtoString() {
      const subject = 'Tablerone feedback'

      const body =
        'We are sorry to hear Tablerone is not quite up to your standard. Please tell us what we can do to improve?\n\n'

      const mailtoString =
        'mailto:' +
        'feedback@tabler.one' +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body)
      return mailtoString
    },
    testC() {
      const url =
        'chrome-extension://klbibkeccnjlkjkiokjodocebajanakg/suspended.html#ttl=%C5%A1est%20-%20Google%20Search&pos=0&uri=https://www.google.com/search?q=%C5%A1est&oq=%C5%A1est&aqs=chrome.0.69i59j69i57j69i59j69i61l2.431j0j4&sourceid=chrome&ie=UTF-8'
      console.log('isUrlSuspendedByTheGreatSuspender', Library.isUrlSuspendedByTheGreatSuspender(url))
      console.log('getParamsFromUrl', Library.getParamsFromUrl(url))
      console.log('unsuspendTheGreatSuspenderUrl', Library.unsuspendTheGreatSuspenderUrl(url))
    },
    isClusterInSearchResults(cluster) {
      return Library.isClusterInSearchResults(this.searchQuery, cluster)
    },
    getShowInResults(showInResultsVal) {
      if (showInResultsVal !== undefined) {
        return showInResultsVal
      } else {
        return true
      }
    },
    escapeKeyListener: function (evt) {
      if (evt.keyCode === 27) {
        if (this.modalWindowDisplay) {
          this.closeModalWindow()
        }
        if (this.settingsDisplay) {
          // TODO: if in import, go to main settings page
          this.closeSettings()
        }
        if (this.helpcenterDisplay) {
          this.closeHelpcenter()
        }
      }
    },
    clusterFocus(data) {
      const cluster = data.cluster
      const source = data.source

      let selectedTabId

      for (let i = 0; i < cluster.tabs.length; i++) {
        const tab = cluster.tabs[i]

        if (i === 0) {
          selectedTabId = tab.id
        }

        if (tab.active === true) {
          selectedTabId = tab.id
          break
        }
      }

      const eventProps = {
        source
      }
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'clusterFocus',
        eventProps
      })
      this.sendMessage({ command: 'tab.focus', tabId: selectedTabId })
    },
    clusterLoadingModeOn(clusterUid) {
      // candidate cluster validation
      const candidateClusterUid = parseInt(clusterUid)
      if (isNaN(candidateClusterUid)) {
        this.loadingClusterUid = -1
      } else {
        this.loadingClusterUid = candidateClusterUid
        this.loadingMode = true
      }

      // this is reset via endFakeLoadingAfterAWhile()
      this.endFakeLoadingAfterAWhile()

      // TODO: add fake loading when saving to a cluster down below (if we move/copy tabs to it) : see mode in Library.getExtensionTabUrl
      // PLUS: add also toast for it
    },
    endFakeLoadingAfterAWhile() {
      // b) fake loading should disappear after FAKE_LOADING_TIME
      const self = this
      if (this.loadingClusterUid !== -1) {
        setTimeout(() => {
          self.loadingClusterUid = -1
          self.resetShowOnlyTitles()
        }, FAKE_LOADING_TIME)
      }
    },
    async displayUnseenNotifications() {
      const self = this
      const db = await KNOTDB

      let allUnseenNotifications = []
      const allNotifications = await db.getAll(DB_TBL_NOTIFICATIONS)

      allUnseenNotifications = allNotifications.filter((notification) => !notification.seen)

      for (let i = 0; i < allUnseenNotifications.length; i++) {
        const notification = allUnseenNotifications[i]

        self.sendMessage({
          command: 'notification.mark-as-shown',
          notificationUid: notification._uid
        })
        if (
          notification.type !== 'feedback' &&
          notification.type !== 'donation' &&
          notification.type !== BACKUP_REQUEST_NOTIFICATION_TYPE &&
          notification.type !== BACKUP_LOW_SPACE_WARNING_NOTIFICATION_TYPE &&
          notification.type !== BACKUP_LOW_GDRIVE_SPACE_WARNING_NOTIFICATION_TYPE
        ) {
          // self.sendMessage({ command: 'notification.mark-as-shown', notificationUid: notification._uid}, function(){})
          this.$toasted.show(notification.content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-info',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )
                  self.sendMessage({ command: 'check.notifications' }, function () {})
                }
              }
            ]
          })
        } else if (notification.type === 'feedback') {
          // self.sendMessage({ command: 'notification.mark-as-shown', notificationUid: notification._uid}, function(){})
          this.$toasted.show(notification.content, {
            duration: 1000000,
            noCloseButton: true,
            onComplete: function () {},
            className: 'toasted-color-white-notification',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )
                  self.sendMessage({ command: 'redirect' })
                }
              },
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )
                  this.triggerMailto()
                  self.sendMessage({ command: 'negativeReview' })
                }
              }
            ]
          })
        } else if (notification.type === 'donation') {
          // self.sendMessage({ command: 'notification.mark-as-shown', notificationUid: notification._uid}, function(){})
          const toast = this.$toasted.show(notification.content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-info',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )
                  self.sendMessage({ command: 'donation' })
                }
              }
            ]
          })
          toast.el.getElementsByTagName('a')[0].addEventListener('click', (e) => {
            self.sendMessage(
              {
                command: 'notification.mark-as-read',
                notificationUid: notification._uid
              },
              function () {
                toast.goAway(0)
              }
            )
            self.sendMessage({ command: 'donation.clicked' })
          })
        } else if (notification.type === BACKUP_REQUEST_NOTIFICATION_TYPE) {
          const isConnected = await Backup.hasPermissions(true)
          if (isConnected) {
            continue
          }

          const content = `
            <div>
              <strong>Data backup is disabled.</strong> Don’t lose your data!
              <a href="${Library.getExtensionSettingsUrl('scrollToBackup')}">Enable back-up</a>
            </div>
          `

          this.$toasted.show(content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-warning',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)

                      self.sendMessage({
                        command: 'backup.request-warning-closed',
                        notificationUid: notification._uid
                      })
                    }
                  )
                }
              }
            ]
          })
        } else if (notification.type === BACKUP_LOW_SPACE_WARNING_NOTIFICATION_TYPE) {
          const content = `
            <div>
              <strong>Low hard drive space.</strong>
              <u>Your data is at risk!</u>
              <a href="${Library.getExtensionSettingsUrl('scrollToBackup')}">Enable back-up</a>
            </div>
          `

          this.$toasted.show(content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-warning',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)

                      self.sendMessage({
                        command: 'backup.low-space-warning-closed',
                        notificationUid: notification._uid
                      })
                    }
                  )
                }
              }
            ]
          })
        } else if (notification.type === BACKUP_LOW_GDRIVE_SPACE_WARNING_NOTIFICATION_TYPE) {
          const content = `
            <div>
              <strong>Low Google Drive space.</strong>
              <span>Please clear some space on your Google Drive to ensure your backups are up to date.</span>
            </div>
          `

          this.$toasted.show(content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-warning',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)

                      self.sendMessage({
                        command: 'backup.low-space-warning-closed',
                        notificationUid: notification._uid
                      })
                    }
                  )
                }
              }
            ]
          })
        }
      }
    },

    async displayUnseenNotificationsOnFocus() {
      const self = this
      const db = await KNOTDB

      let allUnseenNotifications = []
      const allNotifications = await db.getAll(DB_TBL_NOTIFICATIONS)

      allUnseenNotifications = allNotifications.filter((notification) => !notification.shown)

      for (let i = 0; i < allUnseenNotifications.length; i++) {
        const notification = allUnseenNotifications[i]
        self.sendMessage({
          command: 'notification.mark-as-shown',
          notificationUid: notification._uid
        })
        if (
          notification.type !== 'feedback' &&
          notification.type !== 'donation' &&
          notification.type !== BACKUP_REQUEST_NOTIFICATION_TYPE &&
          notification.type !== BACKUP_LOW_SPACE_WARNING_NOTIFICATION_TYPE &&
          notification.type !== BACKUP_LOW_GDRIVE_SPACE_WARNING_NOTIFICATION_TYPE
        ) {
          // self.sendMessage({ command: 'notification.mark-as-shown', notificationUid: notification._uid})
          this.$toasted.show(notification.content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-info',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )
                }
              }
            ]
          })
        } else if (notification.type === 'feedback') {
          // self.sendMessage({ command: 'notification.mark-as-shown', notificationUid: notification._uid}, function(){})
          this.$toasted.show(notification.content, {
            duration: 1000000,
            noCloseButton: true,
            onComplete: function () {},
            className: 'toasted-color-white-notification',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )

                  self.sendMessage({ command: 'redirect' })
                }
              },
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )
                  this.triggerMailto()
                  self.sendMessage({ command: 'negativeReview' })
                }
              }
            ]
          })
        } else if (notification.type === 'donation') {
          // self.sendMessage({ command: 'notification.mark-as-shown', notificationUid: notification._uid}, function(){})
          const toast = this.$toasted.show(notification.content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-info',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)
                    }
                  )
                  self.sendMessage({ command: 'donation' })
                }
              }
            ]
          })
          toast.el.getElementsByTagName('a')[0].addEventListener('click', (e) => {
            self.sendMessage(
              {
                command: 'notification.mark-as-read',
                notificationUid: notification._uid
              },
              function () {
                toast.goAway(0)
              }
            )
            self.sendMessage({ command: 'donation.clicked' })
          })
        } else if (notification.type === BACKUP_LOW_GDRIVE_SPACE_WARNING_NOTIFICATION_TYPE) {
          const content = `
            <div>
              <strong>Low Google Drive space.</strong>
              <span>Please clear some space on your Google Drive to ensure your backups are up to date.</span>
            </div>
          `

          this.$toasted.show(content, {
            duration: 1000000,
            onComplete: function () {},
            className: 'toasted-color-white toasted-type-warning',
            action: [
              {
                text: '',
                onClick: (e, toastObject) => {
                  self.sendMessage(
                    {
                      command: 'notification.mark-as-read',
                      notificationUid: notification._uid
                    },
                    function () {
                      toastObject.goAway(0)

                      self.sendMessage({
                        command: 'backup.low-space-warning-closed',
                        notificationUid: notification._uid
                      })
                    }
                  )
                }
              }
            ]
          })
        }
      }
    },

    async checkLowSpaceWarning() {
      const quota = await checkDBQuota()
      const notifications = await Backup.findAllBackupLowSpaceWarnings()

      if (quota.isLow && notifications.length === 0) {
        await Backup.createBackupLowSpaceWarning()
      }
    },

    async countArchivedClustersFromIDB() {
      const db = await KNOTDB
      const deleted = await db.count(DB_TBL_DELETED_CLUSTERS)
      const orphaned = await db.count(DB_TBL_ORPHANED_CLUSTERS)
      this.archivedClustersCount = deleted + orphaned
    },

    async checkGoogleDriveConnection(forceCheck = false) {
      this.isBubbleDisplayed = (await Backup.hasPermissions(forceCheck)) === false
    },

    async loadArchivedClustersFromIDB() {
      const db = await KNOTDB

      // this will save all clusters
      let allArchiveClusters = []

      let allOrphanedClusters = await db.getAll(DB_TBL_ORPHANED_CLUSTERS)
      allOrphanedClusters = allOrphanedClusters.map(function (cluster) {
        cluster.archiveDateOrder = cluster.orphanedDate
        cluster.archiveType = 'orphaned'
        return cluster
      })

      /*
        let allSnapshotClusters = await db.getAll(DB_TBL_SNAPSHOT_CLUSTERS)
        allSnapshotClusters = allSnapshotClusters.map(function (cluster) {
            cluster.archiveDateOrder = cluster._snapshotDate
            cluster.archiveType = 'snapshot'
            return cluster
        })
        */

      let allDeletedClusters = await db.getAll(DB_TBL_DELETED_CLUSTERS)
      allDeletedClusters = allDeletedClusters.map(function (cluster) {
        cluster.archiveDateOrder = cluster._deletedDate
        cluster.archiveType = 'deleted'

        return cluster
      })

      allArchiveClusters = [...allOrphanedClusters, ...allDeletedClusters]

      // sorting
      allArchiveClusters.sort((b, a) => {
        return new Date(a.archiveDateOrder).getTime() - new Date(b.archiveDateOrder).getTime()
      })

      this.archivedClustersCount = allArchiveClusters.length // also do it here
      this.archivedClusters = Object.freeze(allArchiveClusters)
    },
    async getSetting(name) {
      const db = await KNOTDB
      const document = await db.getFromIndex(DB_TBL_SETTINGS, 'name', name)
      return document.value
    },
    /* load first 10 immediately and other ones 5 seconds later if less than 10 clusters */
    async firstClusterLoadFromIDB() {
      const self = this

      const db = await KNOTDB
      let clusters = await db.getAll(DB_TBL_CLUSTERS) // IDBKeyRange.only(url)

      clusters = Object.freeze(clusters)

      // filter only opened and save ones
      const openedClusters = clusters.filter((cluster) => Library.isOpenedCluster(cluster))
      // const savedClusters = clusters.filter(cluster => Library.isSavedCluster(cluster))

      // clusters = clusters.map(cluster => Object.freeze(cluster))

      this.$nextTick(() => {
        const savedMinusGettingStarted = self.filteredSavedNonGettingStartedClusters // saved minus getting started clusters (they are type "saved" but not counted)
        const savedClusterTabsLength = Library.getNumberOfValidTabs(savedMinusGettingStarted)
        const shownClusters = Library.prepareClustersForTabPage(openedClusters)
        const shownClustersLength = shownClusters.length
        const shownClustersTabsLength = Library.getNumberOfValidTabs(shownClusters)
        const openedLength = openedClusters.length
        const openedHiddenLength = openedLength - shownClustersLength
        const eventProps = {
          saved: savedMinusGettingStarted.length,
          savedTabs: savedClusterTabsLength,
          openedVisible: shownClustersLength,
          openedVisibleTabs: shownClustersTabsLength,
          openedHidden: openedHiddenLength,
          opened: openedLength,
          favourite: self.favouriteClusters.length,
          tags: self.tags.length,
          savedTagged: savedMinusGettingStarted.filter((x) => {
            return x.tags?.length > 0
          }).length
        }
        self.sendMessage({
          command: 'tracking.add.event',
          eventName: 'tableroneTabLoaded',
          eventProps
        })
      })

      self.initialClusterLoaderShow = false
      self.newClusters = Object.freeze(clusters) // performance improvement: added freeze on clusters
      self.endFakeLoadingAfterAWhile()

      return true
    },
    async loadClustersFromIDB() {
      const db = await KNOTDB

      // V1
      // this.newClusters = await db.getAll(DB_TBL_CLUSTERS) //IDBKeyRange.only(url)

      // V2
      const newClusters = await db.getAll(DB_TBL_CLUSTERS) // IDBKeyRange.only(url)
      this.newClusters = Object.freeze(newClusters) // possible performance improvement
    },
    async loadSettingsFromIDB() {
      const db = await KNOTDB
      const settings = await db.getAll(DB_TBL_SETTINGS) // IDBKeyRange.only(url)
      const settingsObject = {}

      // create object from array (easier access)
      settings.forEach((setting) => {
        settingsObject[setting.name] = setting.value
      })

      settingsObject.tableroneMode = await this.BehaviorMode.getMode()

      // V1
      // this.settings = settingsObject
      // V2
      this.settings = Object.freeze(settingsObject)
      // check what kind of appearance is set (dark, light, automatic)
      Library.setTheme(this.settings.theme)
    },
    // when we click anywhere in the body
    bodyClickEvent(e) {
      // TODO: resolve how this would work properly (problem is probably that sometimes this is faster than changes of "expanded" classes on .cluster_component)
      // we check if the click was on expanded ClusterComponent
      const ClusterComponent = e.target.closest('.cluster_component')
      if (this.ignoreBodyClick === true) {
        // we are ignoring this
      } else if (ClusterComponent !== null && ClusterComponent.classList.contains('expanded')) {
        // these clicks are ok, because they are inside .cluster_component.expanded or are ignored
      } else {
        // any click outside it resets it
        // this.highlightedClusterComponentClusterUid = null
        this.highlightClusterComponent(null)
      }
      this.ignoreBodyClick = false
    },
    resetSearch() {
      this.selectedNavMenu = 'home'
      this.updateQuery('')
      this.updateTags([])
      this.selectedTag = null

      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'searchEmptyInput'
      })
    },
    toggleLeftMenu(finalOption = 'not defined') {
      // this is manual (via button)
      if (finalOption === 'not defined') {
        this.leftMenuOpened = !this.leftMenuOpened

        if (this.leftMenuOpened) {
          this.sendMessage({
            command: 'tracking.add.event',
            eventName: 'sidebarOpen'
          })
        } else {
          this.sendMessage({
            command: 'tracking.add.event',
            eventName: 'sidebarClose'
          })
        }

        // trigger shared state change
        this.sendMessage({
          command: 'sharedState.sidebarOpen',
          sidebarOpen: this.leftMenuOpened
        })
      } else {
        // this is used if we opened it via message (shared state for sidebarOpen in background.js)
        if (finalOption !== this.leftMenuOpened) {
          // if it is different => change (should be different only on non-source tablerone tabs)
          this.leftMenuOpened = finalOption
        }
      }

      // click on the menu resets highlightened window (to avoid the line going there)
      if (this.leftMenuOpened === true) {
        this.$store.dispatch('updateHighlightedClusterUid', null)
        // this.highlightedClusterComponentClusterUid = null
      }

      this.archiveMode = false
    },
    resetShowOnlyTitles() {
      const self = this

      // V1 - simple
      // self.loadingMode = false
      // self.$refs['opened_clusters'].classList.remove('animated')

      // V2 - animated
      const EFFECT_TIME = 150

      // we must disable loading mode (does not matter if opened_clusters exists already or not)
      setTimeout(() => {
        self.loadingMode = false
      }, EFFECT_TIME)

      // dropdown simulation with adding and removing a css
      if (self.$refs.opened_clusters) {
        if (
          self.$refs.opened_clusters.classList.contains('animated') === false &&
          self.loadingMode === true &&
          self.loadingClusterUid === -1
        ) {
          self.$refs.opened_clusters.classList.add('animated')
          setTimeout(() => {
            self.$refs.opened_clusters.classList.remove('animated')
          }, EFFECT_TIME)
        }
      }
    },

    openSettings() {
      this.settingsDisplay = true
      document.getElementsByTagName('body')[0].classList.add('noscroller')
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'settingsOpen',
        eventProps: {}
      })
    },
    closeSettings() {
      this.settingsDisplay = false
      this.loadClustersFromIDB() // if we made import
      document.getElementsByTagName('body')[0].classList.remove('noscroller')
      this.checkGoogleDriveConnection() // Check if Google Drive connection status changed after closing settings

      // Remove settingsOpen from URL if present
      const url = new URL(window.location.href)
      if (url.searchParams.has('settingsOpen')) {
        url.searchParams.delete('settingsOpen')
        window.history.replaceState({}, '', url.toString())
      }
    },
    openHelpcenter() {
      this.helpcenterDisplay = true
      document.getElementsByTagName('body')[0].classList.add('noscroller') // we will only scroll modal, not body
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'helpCenterOpen',
        eventProps: {}
      })
    },
    closeHelpcenter() {
      this.helpcenterDisplay = false
      document.getElementsByTagName('body')[0].classList.remove('noscroller')
    },

    openModalWindow(name) {
      this.modalWindowDisplay = true
      if (name === 'share') {
        this.modalWindowDisplayShare = true
      } else if (name === 'editNotes') {
        // we are actually not using this but could
        this.modalWindowDisplayEditNotes = true
      }
      document.getElementsByTagName('body')[0].classList.add('noscroller')
      // this.sendMessage({ command: 'tracking.add.event', eventName: 'settingsOpen', eventProps: {} })
    },
    closeModalWindow() {
      this.modalWindowDisplay = false

      this.modalWindowDisplayShare = false
      this.modalWindowDisplayEditNotes = false

      // this.loadClustersFromIDB() //if we made import
      document.getElementsByTagName('body')[0].classList.remove('noscroller')
    },
    notifyAboutShare(params) {
      // alert(JSON.stringify(params))
      const shareUrl = Library.getShareUrl(params.shareUid)
      const title = Library.trunc(params.title, 30)
      this.$toasted.show(
        `<div><strong>Successfully published</strong> '${title}'. <a href="${shareUrl}" target="_blank" class="toasted-link-right">See it!</a></div>`,
        {
          duration: 100000,
          onComplete: function () {
            // oncomplete is not called if undo is clicked
          },
          className: 'toasted-type-success',
          action: [
            {
              text: '',
              onClick: (e, toastObject) => {
                // self.$emit('clusterDelete', clusterDetails)
                toastObject.goAway(0)
              }
            }
          ]
        }
      )
    },
    resetImportModeOnSettingsStartup() {
      this.importModeOnSettingsStartup = ''
    },
    onScroll() {
      if (this.triggerElement) {
        this.positionPicker(this.triggerElement)
      }

      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    },
    // easider and faster to do it here, since we already have favourite clusters here
    favouritesOrderChange(moved) {
      const favourites = this.favouriteClusters
      const reducedFavorites = favourites.map((favourite) => {
        return {
          _uid: favourite._uid,
          favouriteOrder: favourite.favouriteOrder
        }
      })
      const orderedFavourites = Library.arrayMove(reducedFavorites, moved.moved.oldIndex, moved.moved.newIndex)
      for (let i = 0; i < orderedFavourites.length; i++) {
        orderedFavourites[i].favouriteOrder = i
      }
      this.sendMessage({
        command: 'favourites.reorder',
        orderedFavourites
      })
    },
    onTagsOrderChange(moved) {
      const orderedTags = Library.arrayMove(this.tags, moved.moved.oldIndex, moved.moved.newIndex)
      this.saveTagOrder(orderedTags)
    },
    async waitForScrollToIndexComplete(delay = 100) {
      return new Promise((resolve) => {
        let timeout
        // The target element where scrolling happens (usually the container of the virtual scroll list)

        // Define the scroll event handler
        const onScroll = () => {
          // Clear any existing timeout
          clearTimeout(timeout)
          // Set a timeout to detect when scrolling has stopped
          timeout = setTimeout(() => {
            // Remove the event listener after completion
            window.removeEventListener('scroll', onScroll)
            resolve() // Resolve the promise
          }, delay)
        }

        // Attach the scroll event listener
        window.addEventListener('scroll', onScroll)
      })
    },
    async scrollToGroupClusters(clusterId, parentIndex) {
      if (document.getElementById(`saved_cluster-${clusterId}`)) {
        return true
      }
      const parentList = this.$refs.savedClustersVirtualList
      if (!parentList) {
        return false
      }
      parentList.scrollToIndex(parentIndex)
      await this.waitForScrollToIndexComplete()
      return true
    },

    scrollToElementWithOffset(element, offset) {
      if (!element) return
      // Get the element's position relative to the document
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      // Subtract the fixed offset
      const offsetPosition = elementPosition - offset
      // Scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' // Use 'auto' for instant scrolling
      })
    },
    onJumpToSession(id) {
      if (this.selectedNavMenu !== 'home') {
        this.onHomeSelect()
        setTimeout(() => {
          this.onScrollToSession(id)
        }, 500)
        return
      }
      this.onScrollToSession(id)
    },
    async onScrollToSession(id) {
      // session not in view
      const groupClusterIndex = this.groupedFilteredSavedClusters.findIndex(
        (groupCluster) => groupCluster.clusters.findIndex((cluster) => cluster._uid === id) !== -1
      )
      if (groupClusterIndex !== -1) {
        const scrollCompleted = await this.scrollToGroupClusters(id, groupClusterIndex)
        if (scrollCompleted) {
          const clusterElement = document.getElementById(`saved_cluster-${id}`)
          if (clusterElement) {
            log.serviceWorker.log('scrollToElement', clusterElement, id)
            this.scrollToElementWithOffset(clusterElement, 100)
          }
          setTimeout(() => {
            this.highlightClusterComponent(id)
          }, 0)
        }
      }
    },
    onSidebarToggle(open) {
      if (open) {
        this.sidebarCollapsed = false
      } else {
        this.sidebarCollapsed = true
      }
    },
    saveTagOrder(orderedTags) {
      this.tagOrder = orderedTags.reduce((accum, tag, order) => {
        accum[tag.title] = order
        return accum
      }, {})
      localStorage.setItem('tagOrder', JSON.stringify(this.tagOrder))
    },
    clickedSavedClusterLink(clusterUid) {
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'sidebarFavouritesCollectionClick',
        eventProps: {}
      })

      this.scrollToCluster(clusterUid)

      // highlight the element (scroll is done on the clicked element itself)
      this.highlightClusterComponent(clusterUid)

      // remove search filters if they exist
      this.$store.dispatch('updateQuery', '')
      this.$store.dispatch('updateTags', [])

      // close window
      this.leftMenuOpened = false
    },
    findScreenshot: async function (url, inVersion = 'visit') {
      // we are not going through background.js for performance / code optimizations
      let screenshotDataUrl
      // default image
      // if (inVersion === 'visit') {
      //   screenshotDataUrl = IMG_DEFAULT_VISIT_DATA_URL // for non-opened clusters
      // } else {
      //   screenshotDataUrl = IMG_DEFAULT_FOCUS_DATA_URL // for opened clusters
      // }

      if (url) {
        const db = await KNOTDB
        const screenshot = await db.getFromIndex(DB_TBL_SCREENSHOTS, 'url', url) // IDBKeyRange.only(url)

        screenshotDataUrl = screenshot.dataUrl
      }
      return screenshotDataUrl
    },
    sendCommand(command) {
      this.sendMessage({ command })
    },
    sendMessage(message, callback) {
      // for sending message to background.js
      message.sourceWindowId = this.thisWindowId // always add windowId for identification (this is probably not used anywhere - test)
      message.messageSenderSource = 'tab'
      try {
        chrome.runtime.sendMessage(
          null,
          message,
          callback !== undefined && callback !== null
            ? callback
            : function (x) {
                // console.log('sendMessage called, message and response are: ', message, x)
                void chrome.runtime.lastError
              }
        ) // for external messages params look like (extId, message, callback)
      } catch (e) {
        console.log('wtf?', e.toString())
      }
    },
    getAndSetTabAndWindowIds() {
      this.getAndSetWindowId()
      this.getAndSetTabId()
    },
    getAndSetWindowId() {
      const self = this
      // getting window id //TODO: update when detached, moved etc.
      chrome.windows.getCurrent(function (w) {
        self.thisWindowId = parseInt(w.id)
      })
    },
    getAndSetTabId() {
      const self = this

      // getting tab id
      chrome.tabs.getCurrent((thisTab) => {
        self.thisTabId = parseInt(thisTab.id)

        if (Library.isNumberOneTab(thisTab)) {
          self.isNumberOneTab = true // is this number one tab
          self.tableroneAsPortalMode = true // portal mode on
        }

        /* chrome.tabs.executeScript(tabs[0].id,{   //tabs[0].id will give the tab id where extension is opened.
              code: 'document'  // any javascript statement
          }); */
      })
    },

    clusterDelete(clusterDetails) {
      // delete via height (does not work?!)
      // alert('I want ref: ' + 'saved_cluster-' + clusterDetails.clusterUid)
      // this.$refs['saved_cluster-' + clusterDetails.clusterUid].classList.add('cluster_component__deleted')

      const self = this

      // delete from newClusters (instead of self.loadClustersFromIDB())
      this.newClusters = this.newClusters.filter((cluster) => {
        return cluster._uid !== clusterDetails.clusterUid
      })

      this.sendMessage({ command: 'cluster.delete', clusterUid: clusterDetails.clusterUid }, function () {
        self.countArchivedClustersFromIDB() // refresh number of archived clusters
      })
    },
    clusterDeleteFromArchive(clusterDetails) {
      const self = this
      this.sendMessage(
        {
          command: 'cluster.delete-from-archive',
          clusterUid: clusterDetails.clusterUid,
          archiveType: clusterDetails.archiveType
        },
        function () {
          self.loadArchivedClustersFromIDB()
        }
      )
    },
    clusterRestoreFromArchive(clusterDetails) {
      const self = this
      this.sendMessage(
        {
          command: 'cluster.restore-from-archive',
          clusterUid: clusterDetails.clusterUid,
          archiveType: clusterDetails.archiveType
        },
        function (result) {
          self.loadClustersFromIDB()
          // self.loadArchivedClustersFromIDB()
          self.countArchivedClustersFromIDB()

          // go from archive mode and highlight that cluster and trigger toasted
          self.archiveMode = false
          self.selectedNavMenu = 'home'
          setTimeout(() => {
            // QUICKFIX for onStateMmanager to catch-up with new saved collection //TODO: do it better (onNextOnStateChange finish)
            self.highlightClusterAction(result.savedClusterUid)
            // TODO: scroll to this one
            self.$toasted.show(`<div>Session '${result.title}' successfully restored.</div>`, {
              duration: 5000,
              onComplete: function () {
                // oncomplete is not called if undo is clicked
              },
              containerClass: 'toasted-type-info',
              action: [
                {
                  text: '',
                  onClick: (e, toastObject) => {
                    // self.$emit('clusterDelete', clusterDetails)
                    toastObject.goAway(0)
                  }
                }
              ]
            })
          }, 400)
        }
      )
    },
    clusterUndelete(clusterDetails) {
      const self = this
      this.sendMessage({ command: 'cluster.undelete', clusterUid: clusterDetails.clusterUid }, function () {
        self.loadClustersFromIDB()
        self.countArchivedClustersFromIDB() // refresh the archived clusters (at least the number)
      })
    },
    clusterUndeleteUndo(clusterDetails) {
      const self = this
      this.sendMessage(
        {
          command: 'cluster.undelete-undo',
          clusterUid: clusterDetails.clusterUid
        },
        function () {
          self.loadClustersFromIDB()
          self.countArchivedClustersFromIDB() // refresh the archived clusters (at least the number)
        }
      )
    },
    async clusterReopen(data) {
      const [isNewTabOnly, isToolbarOnly] = await Promise.all([
        BehaviorMode.checkIfIsNewTabOnly(),
        BehaviorMode.checkIfIsPopUpOnly()
      ])

      if (isNewTabOnly || isToolbarOnly) {
        const currentTab = await Tab.getTheCurrentTab()
        if (currentTab) {
          document.title = 'Closing...'
          setTimeout(() => Tab.closeTimelineById(currentTab.id), NEW_TAB_DEFAULT_CLOSE_DELAY_MS)
        }
      }
      const clusterUid = data.clusterUid
      const source = data.source

      let tabIdToClose = -1
      if (this.isNumberOneTab === false) {
        // never close #1 tab
        tabIdToClose = this.thisTabId
      }

      // if key is pressed, we should inverse it
      let inverseOpenCollectionSuspendedSetting = false
      if (this.isKeyPressedModifier) {
        inverseOpenCollectionSuspendedSetting = true
      }

      // reset key modifier => scenario: open new cluster => instantly focuses new window => the isKeyPressedModifier not captured
      this.isKeyPressedModifier = false

      this.sendMessage({
        command: 'cluster.reopen',
        clusterUid,
        tabIdToClose,
        source,
        inverseOpenCollectionSuspendedSetting
      })
    },
    clusterUpdateTitle(clusterDetails) {
      this.sendMessage({
        command: 'cluster.update-title',
        clusterUid: clusterDetails.clusterUid,
        title: clusterDetails.title
      })
    },
    clusterAddFavourite(clusterUid) {
      this.sendMessage({
        command: 'cluster.add-favourite',
        clusterUid
      })
    },
    clusterRemoveFavourite(clusterUid) {
      this.sendMessage({
        command: 'cluster.remove-favourite',
        clusterUid
      })
    },
    clusterUpdateTags(clusterDetails) {
      // tags[], clusterId
      this.sendMessage({
        command: 'cluster.update-tags',
        clusterUid: clusterDetails.clusterUid,
        tags: clusterDetails.tags
      })
    },
    clusterSave(clusterUid) {
      this.sendMessage({ command: 'cluster.save', clusterUid }, function () {
        // we do not go to load mode, because we display "Saving..." and it is better
        // self.clusterLoadingModeOn(clusterUid)
      })
    },
    clusterSaveAndCloseWindow(clusterUid) {
      this.sendMessage(
        {
          command: 'cluster.save-and-close-window',
          clusterUid,
          sourceWindowId: this.thisWindowId
        },
        function (savedClusterUid) {
          // V1: go to load mode
          // self.clusterLoadingModeOn(savedClusterUid)
          // V2: instead of this, we receive a message 'cluster.loading' when saved with savedClusterUid in all Tablerone tabs for animation
        }
      )
    },
    clusterShare(clusterDetails) {
      this.shareModalTitle = clusterDetails.title
      this.shareModalClusterUid = clusterDetails.clusterUid
      this.openModalWindow('share')
    },
    triggerOnStateChange() {
      this.sendMessage({ command: 'trigger-on-state-change' })
    },
    buttonSettingsClicked() {
      this.openSettings()
    },
    openSettingsAndImport(importSetting) {
      this.importModeOnSettingsStartup = 'tablerone-backup' // importSetting

      const self = this
      this.$nextTick(() => {
        self.openSettings()
      })
    },
    importBookmarks() {
      // IMPORTANT - appears twice
      const importBookmarksConfirmText =
        'Import Bookmarks Bar to Tablerone?\n' +
        '\n' +
        '(Folders become sessions and parent folders are set as tags. Consider organising them before to get a clean result.)'

      const decisionAboutImporting = confirm(importBookmarksConfirmText)
      if (decisionAboutImporting === true) {
        this.sendMessage({
          command: 'bookmarks-import-all',
          source: 'onboarding-session-import-bookmarks'
        })
      }
    },
    emptyArchiveClicked() {
      const decisionAboutSaving = confirm('This action will permanently delete all items in archive. Are you sure?')
      if (decisionAboutSaving === true) {
        this.sendMessage({ command: 'empty-archive' })
        const archivedClustersLength = this.archivedClustersCount // we count only those that are cloned

        this.$toasted.show(`<div>Archive (${archivedClustersLength} sessions) has been successfully emptied.</div>`, {
          duration: 7000,
          onComplete: function () {
            // oncomplete is not called if undo is clicked
          },
          containerClass: 'toasted-type-info',
          action: [
            {
              text: '',
              onClick: (e, toastObject) => {
                // chrome.tabs.create({ url: TABLERONE_URL_UPDATE })
                // self.$emit('clusterDelete', clusterDetails)
                toastObject.goAway(0)
              }
            }
          ]
        })
      } else {
        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'emptyArchiveCanceled',
          eventProps: {}
        })
      }
    },
    buttonSupportClicked() {
      // this.sendMessage({ command: 'support' })
      this.openHelpcenter()
    },
    buttonNukeClicked() {
      if (this.settingsDisplay === false) {
        // because it interferes with import mode (same position and stop bubbling does not work)
        this.sendMessage({ command: 'nuke' })

        const shownClusters = Library.prepareClustersForTabPage(this.allOpenedClusters)
        const shownClustersLength = shownClusters.length
        const shownClustersTabsLength = Library.getNumberOfValidTabs(shownClusters)
        const eventProps = {
          windows: shownClustersLength,
          tabs: shownClustersTabsLength
        }
        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'buttonNukeClick',
          eventProps
        })
      }
    },
    syncClustersWithBookmarks() {
      this.sendMessage({ command: 'bookmarks.sync' })
    },
    testViaMessageCommand(command) {
      this.sendMessage({ command })
    },
    async unsuspendAndFocusTab(tabDetails) {
      if (tabDetails.isSuspended) {
        this.sendMessage({
          command: 'tab.unsuspend-and-focus',
          tabId: tabDetails.tabId
        })
      } else {
        this.focusTab(tabDetails)
      }

      // * The fix for the new tab seems to work now mainly due to the delay
      // * caused by `await BehaviorMode.checkIfIsNewTabOnly()`. There are:
      // * + multiple promise resolutions
      // * + multiple DB calls
      // * The closure code is essentially the same as the one for the Index Tab mode.

      const [isNewTabOnly, isToolbarOnly] = await Promise.all([
        BehaviorMode.checkIfIsNewTabOnly(),
        BehaviorMode.checkIfIsPopUpOnly()
      ])

      if (isNewTabOnly || isToolbarOnly) {
        document.title = 'Closing...'
        chrome.tabs.remove(this.thisTabId)
      } else {
        this.closeIfNotNumberOneTab()
      }
    },
    closeIfNotNumberOneTab() {
      if (this.isNumberOneTab === false) {
        chrome.tabs.remove(this.thisTabId)
      }
    },
    focusTab(tabDetails) {
      this.sendMessage({ command: 'tab.focus', tabId: tabDetails.tabId })
    },
    highlightClusterComponent(ClusterComponentClusterUid) {
      this.$store.dispatch('updateHighlightedClusterUid', ClusterComponentClusterUid)
      const body = document.querySelector('body')
      // this.highlightedClusterComponentClusterUid = ClusterComponentClusterUid //save the highlightened one
      if (ClusterComponentClusterUid === null) {
        body.classList.remove('muted')
        // console.log('remove muted')
      } else {
        // TODO: what did we try to achieve with this below
        // this.ignoreBodyClick = true //hack so that when we click an active link (the one that highlights a cluster), but causes we have to click double

        this.leftMenuOpened = false // close left menu
        body.classList.add('muted')
        // console.log('add muted')
      }
    },
    highlightClusterAction(ClusterComponentClusterUid) {
      // highlight and also smooth scroll to
      // 1. highlight
      this.highlightClusterComponent(ClusterComponentClusterUid)

      // 2. scroll to (vanilla scroll to)
      // TODO - maybe test if it is already in window content
      this.scrollToCluster(ClusterComponentClusterUid)
    },
    scrollToCluster(savedClusterUid) {
      const targetAnchor = document.getElementById('saved_cluster-' + savedClusterUid)
      if (targetAnchor) {
        targetAnchor.scrollIntoView({
          behavior: 'smooth',
          block: 'start' // scroll to top of target element
        })
      } else {
        console.warn('No element with id #saved_cluster-' + savedClusterUid + ' for scrollToCluster()')
      }
    },
    /*
      scrollToClusterOld (savedClusterUid) {
        //alert('scrolling to...' + savedClusterUid)
        const targetAnchor = document.getElementById('saved_cluster-' + savedClusterUid)

        const distanceToTop = el => Math.floor(el.getBoundingClientRect().top)
        //var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
        if (!targetAnchor) {
          console.log('You are trying to highligh non-saved cluster... add also opened_cluster etc.')
          return
        }
        const originalTop = distanceToTop(targetAnchor) // + SEARCH_CONTAINER_HEIGHT
        window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })

        const checkIfDone = setInterval(function () {
          const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
          if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1'
            targetAnchor.focus()
            //window.history.pushState('', '', targetID);
            clearInterval(checkIfDone)
          }
        }, 100)
      },
      */
    getClusterTitleFromClusterUid(clusterUid) {
      // console.log('we are searching for title in ' + clusterUid)
      for (let j = 0; j < this.newClusters.length; j++) {
        const cluster = this.newClusters[j]
        if (cluster._uid === clusterUid) {
          return Library.getClusterTitle(cluster)
        }
      }
      return '(no title yet)'
    },
    selectSearchTag(tagTitle) {
      if (this.searchTags.length === 1 && this.searchTags[0].text === tagTitle) {
        this.updateTags([])
        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'sidebarTagClick',
          eventProps: { type: 'removeLast' }
        })
      } else {
        this.updateTags([{ text: tagTitle }])
        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'sidebarTagClick',
          eventProps: { type: 'addFirst' }
        })
      }
      window.scrollTo(0, 0)
    },
    addSelectSearchTag(tagTitle) {
      if (
        Library.arrayIncludes(
          this.searchTags.map((x) => x.text),
          tagTitle
        )
      ) {
        const tags = this.searchTags.filter((x) => {
          return x.text != tagTitle
        })
        this.updateTags(tags)
        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'sidebarTagClickModified',
          eventProps: { type: 'remove' }
        })
      } else {
        this.updateTagsPush({ text: tagTitle })
        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'sidebarTagClickModified',
          eventProps: { type: 'add' }
        })
      }

      window.scrollTo(0, 0)
    },
    openArchive() {
      this.selectedNavMenu = 'archive'
      this.selectedTag = null
      this.loadArchivedClustersFromIDB()

      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'sidebarOpenArchive',
        eventProps: {}
      })

      // reset all search related params in vuex
      this.$store.dispatch('updateSearchInput', '')
      this.$store.dispatch('updateQuery', '')
      this.$store.dispatch('updateTags', [])

      this.leftMenuOpened = false
      this.archiveMode = true
    },
    testConsoleDisplayState() {
      Library.chromeTabsQuery(
        {
          // active: true,
          // currentWindow: false //we want all windows
          // lastFocusedWindow: false
        },
        function (tabs) {
          const tabsGroupedByWindowId = Library.groupBy(tabs, 'windowId') // warning: this is not array but an object
          console.log(tabsGroupedByWindowId)
        }
      )
    },
    testShowAlert() {
      // Use sweetalert2
      // this.$swal('Hello Vue world!!!')
    },
    checkAlarm() {
      chrome.alarms.getAll(function (alarms) {
        for (let i = 0; i < alarms.length; i++) {
          console.log('We have an alarm present', alarms[i])
        }
      })
    },
    displayDetails(arrayOfClusters, typeName) {
      const tabsNumber = Library.getNumberOfTabs(arrayOfClusters)
      const clusterNumber = arrayOfClusters.length

      return `${clusterNumber} ${typeName}${clusterNumber > 1 ? 's' : ''}, ${tabsNumber} Tab${
        tabsNumber > 1 ? 's' : ''
      }`
    },
    displayDetailsOnlyTabs(arrayOfClusters, typeName) {
      const tabsNumber = Library.getNumberOfTabs(arrayOfClusters)
      // const clusterNumber = arrayOfClusters.length

      return `${tabsNumber} Tab${tabsNumber > 1 ? 's' : ''}`
    },
    searchQueryChange(params) {
      this.updateQuery(params.query)
    },
    openNewWindow(params) {
      this.sendMessage({ command: 'open-new-window' })
    },
    onHomeSelect() {
      this.onResetTimeline()
    },
    onTagSelect(tags) {
      this.archiveMode = false
      this.selectedNavMenu = 'tags'
      this.updateTags([])
      if (tags.length === 1) {
        this.selectedTag = tags[0].title
      } else {
        this.selectedTag = null
      }
      tags.map((t) => this.addSelectSearchTag(t.title))
    },
    onResetTimeline() {
      this.archiveMode = false
      this.selectedTag = null
      this.selectedNavMenu = 'home'
      this.updateTags([])
    }
  },
  computed: {
    GroupClusterComponentList() {
      return GroupClusterComponentList
    },
    /* V1 - this weirdly does not work (change is not detected)
      ...mapState({
        tabNoteEdit: 'tabNoteEdit', //this is the possible way to watch for changes in vuex
      }),
      */
    // V2 - this weirdly works (change is detected)
    tabNoteEdit() {
      return this.$store.getters.getTabNoteEdit
    },

    ...mapGetters({
      // find out why we have these as getters (maybe they should be in methods)
      searchQuery: 'getQuery', // we remap searchQuery to Vuex
      searchInput: 'getSearchInput',
      searchTags: 'getTags',
      isSearchMode: 'isSearchMode',
      isQueryMode: 'isSearchInputMode'
    }),
    ...mapGetters({
      isActiveCluster: 'isActiveCluster'
    }),
    isReadyToInstantTypeSearch() {
      return true
    },
    isNoSearchResults() {
      let clustersToDisplay = 0
      // clustersToDisplay += this.filteredGettingStartedClusters.length
      clustersToDisplay += this.groupedFilteredSavedClusters.length
      clustersToDisplay += this.filteredOpenedClustersAllButThisWindow.length
      clustersToDisplay += this.filteredOpenedClustersThisWindow.length
      return clustersToDisplay === 0
    },
    value: {
      get() {
        return this.$store.getters.value
      },
      set(value) {
        this.$store.dispatch('asyncUpdateValue', value)
      }
    },
    archivedClustersToDisplay() {
      return this.archivedClusters // they are filtered out when transfered from orphaned
      // return this.archivedClusters.filter(cluster => Library.isHealthyCluster(cluster))
    },
    allSavedAndOpenedClusters() {
      return [...this.allOpenedClusters, ...this.allSavedClusters]
    },
    clusterUidsToIgnore() {
      // they are duplicates
      // uids to ignore are saved clusters that have opened counterpart (see "Opened clusters - B" in README.md)
      const uidToIgnore = []
      // if it is opened, we show only the opened one (and hide saved one)
      this.allSavedAndOpenedClusters.forEach((cluster) => {
        if (
          Object.prototype.hasOwnProperty.call(cluster, 'windowId') &&
          Object.prototype.hasOwnProperty.call(cluster, 'savedClusterUid')
        ) {
          uidToIgnore.push(cluster.savedClusterUid) // uid to ignore
        }
      })
      return uidToIgnore
    },
    allSavedAndOpenedClustersWithoutDuplicates() {
      const self = this
      return this.allSavedAndOpenedClusters.filter((cluster) => !self.clusterUidsToIgnore.includes(cluster._uid)) // remove the ones that have opened counterpart
    },
    tags() {
      return Library.extractTags(this.allSavedAndOpenedClustersWithoutDuplicates)
    },
    tagsForSelect() {
      return this.tags.map((x) => {
        return { text: x.title }
      })
    },
    /* we filter getting started & search by query and tag */
    prefilteredClusters() {
      if (Array.isArray(this.newClusters)) {
        // remove getting started clusters
        let filteredClusters = this.newClusters

        // V1: via filtering
        // filter it by query
        filteredClusters = Library.filterClustersBySearchQuery(this.searchQuery, filteredClusters)
        // filter it by tags
        filteredClusters = Library.filterClustersByTags(this.searchTags, filteredClusters)

        // V2: via adding .showInResults param
        // filter it by query
        // filteredClusters = Library.updateClustersBySearchQuery(this.searchQuery, filteredClusters)
        // filter it by tags
        // filteredClusters = Library.updateClustersByTags(this.searchTags, filteredClusters)

        // filter for view (only not tablerone pages)
        return Library.prepareClustersForTabPage(filteredClusters)
      } else {
        return []
      }
    },
    allOpenedClusters() {
      return this.newClusters.filter((cluster) => {
        return Library.isOpenedCluster(cluster)
      })
    },
    allSavedClusters() {
      return this.newClusters.filter((cluster) => {
        return Library.isSavedCluster(cluster)
      })
    },
    filteredOrphanedClusters() {
      const orphanedClusters = this.prefilteredClusters.filter((cluster) => {
        return Library.isOrphanedCluster(cluster)
      })
      return orphanedClusters
    },
    filteredGettingStartedClusters() {
      return this.newClusters.filter((cluster) => Object.prototype.hasOwnProperty.call(cluster, 'gettingStarted'))
    },
    filteredSavedNonGettingStartedClusters() {
      return this.allSavedClusters.filter((cluster) => !Object.prototype.hasOwnProperty.call(cluster, 'gettingStarted'))
    },
    filteredOpenedClusters() {
      let openedClusters = this.prefilteredClusters.filter((cluster) => {
        return Library.isOpenedCluster(cluster)
      })

      // put the cluster in current window on top
      if (this.thisWindowId === null) {
        // TODO: where does this occur?
      } else {
        const openedOrderedClusters = []

        // move the current window to the top
        for (let i = 0; i < openedClusters.length; i++) {
          const item = openedClusters[i]
          if (item.windowId === this.thisWindowId) {
            openedOrderedClusters.unshift(item)
          } else {
            openedOrderedClusters.push(item)
          }
        }
        openedClusters = openedOrderedClusters
      }

      return openedClusters
    },
    filteredOpenedClustersThisWindow() {
      // we know there can be only one or zero, but via array we display it better
      if (this.thisWindowId === null) {
        // TODO: where does this occur?
        return []
      } else {
        const filteredClusters = []

        // move the current window to the top
        for (let i = 0; i < this.filteredOpenedClusters.length; i++) {
          const item = this.filteredOpenedClusters[i]
          if (item.windowId === this.thisWindowId) {
            filteredClusters.push(item)
            break
          }
        }

        // Object.freeze : this is used in display
        return Object.freeze(filteredClusters)
      }
    },
    filteredOpenedClustersAllButThisWindow() {
      if (this.thisWindowId === null) {
        // TODO: where does this occur?
        return []
      } else {
        const filteredClusters = []

        // move the current window to the top
        for (let i = 0; i < this.filteredOpenedClusters.length; i++) {
          const item = this.filteredOpenedClusters[i]
          if (item.windowId !== this.thisWindowId) {
            filteredClusters.push(item)
          }
        }

        // Object.freeze : this is used in display
        return Object.freeze(filteredClusters)
      }
    },
    filteredSavedClusters() {
      return Library.filterNonOpenedSavedClusters(this.prefilteredClusters)
    },
    filteredSavedClustersToSelect() {
      // filter only neccessary data (otherwise too much data inside every window element saved)
      const filteredSavedClusters = this.filteredSavedClusters.map((x) => {
        return {
          title: x.title,
          _uid: x._uid,
          orderDate: x[SAVED_CLUSTERS_ORDER]
        }
      })

      return filteredSavedClusters
        .sort((b, a) => {
          return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
        })
        .map((x) => {
          return {
            title: x.title,
            _uid: x._uid
          }
        })
    },
    groupedFilteredSavedClusters() {
      // grouping clusters into "Today", "Yesterday", 6.1.2020, 5.1.2020 ...
      // only filter saved clusters
      // return this.filteredSavedClusters
      const savedClusters = this.filteredSavedClusters
      // Object.freeze : this is used in display
      const groupedClusters = Object.freeze(
        Library.orderAndGroupClustersIntoDays(
          savedClusters,
          SAVED_CLUSTERS_ORDER,
          this.settings.tableroneDateFormat,
          this.settings.tableroneTimestampFormat
        )
      )

      return groupedClusters
    },
    filteredTags() {
      if (this.tagsForSelect.length > 0) {
        const filteredTagsArray = []
        for (let i = 0; i < this.tagsForSelect.length; i++) {
          const tagsForSelectElement = this.tagsForSelect[i]
          if (Library.isFound(this.searchQuery, tagsForSelectElement.text)) {
            filteredTagsArray.push(tagsForSelectElement)
          }
        }

        return filteredTagsArray
      } else {
        return []
      }
    },
    favouriteClusters() {
      let favouriteClusters = []
      favouriteClusters = this.allSavedAndOpenedClustersWithoutDuplicates.filter((cluster) => cluster.favourite)
      // favouriteClusters = favouriteClusters.filter(cluster => !(Library.isOpenedCluster(cluster) && !Object.prototype.hasOwnProperty.call(cluster, 'savedClusterUid'))) //to avoid the bug "New window"
      favouriteClusters = Library.sortFavouriteClusters(favouriteClusters)

      return favouriteClusters
    },
    orderedTags() {
      if (this.tagOrder) {
        this.tags.sort((a, b) => {
          const orderA = this.tagOrder[a.title] ?? Infinity
          const orderB = this.tagOrder[b.title] ?? Infinity
          return orderA - orderB
        })
      }
      return this.tags
    },
    blurredContainer() {
      return this.settingsDisplay || this.modalWindowDisplay
    },
    blurredContainerExtreme() {
      return this.helpcenterDisplay
    },
    // archivedClusters is merged "orphaned" clusters from db.clusters, all clusters in "clustersSnapshots" and all clusters from "clustersDeleted"
    getBasePickerUrl() {
      if (this.emojiPickerToLoad) {
        return Library.getExtensionUrl() + `/popup/popup.html?icon-picker-iframe`
      } else {
        return 'about:blank'
      }
    }
  },
  watch: {
    shouldShowIconPicker(show) {
      if (!show) {
        this.closeEmojiPicker()
        return
      }

      this.updateEmojiPickerUrl(this.emojiPickerClusterUid)
    },

    tabNoteEdit: {
      // deep: true,
      // immediate: true,
      handler: function (newValue) {
        // alert("tabNoteEdit change")
        if (newValue !== null) {
          this.modalWindowDisplayEditNotes = true
          this.modalWindowDisplay = true
        }
      }
    },
    searchQuery: {
      handler: function (newValue) {
        const self = this
        if (newValue.length >= 3) {
          this.$nextTick(() => {
            this.sendMessage({
              command: 'tracking.add.event',
              eventName: 'timelineSearchQuery',
              eventProps: {
                query: self.searchQuery.length,
                tags: self.searchTags.length,
                resultsOpened: self.filteredOpenedClusters.length,
                resultsSaved: self.filteredSavedClusters.length,
                results: self.filteredOpenedClusters.length + self.filteredSavedClusters.length
              }
            })
          })
        }
      }
    },
    searchTags: {
      handler: function (newValue) {
        const self = this
        if (newValue.length > 0) {
          this.$nextTick(() => {
            this.sendMessage({
              command: 'tracking.add.event',
              eventName: 'timelineSearchTag',
              eventProps: {
                query: self.searchQuery.length,
                tags: self.searchTags.length,
                resultsOpened: self.filteredOpenedClusters.length,
                resultsSaved: self.filteredSavedClusters.length,
                results: self.filteredOpenedClusters.length + self.filteredSavedClusters.length
              }
            })
          })
        }
      }
    },
    newClusters: {
      deep: true,
      handler: function (newValue) {
        // it has to be like this (no arrow functions) for this to work
        const self = this
        // on every change check if we need to remove highlightedClusterComponentClusterUid (if it does not exist as opened anymore)
        const getHighlightedClusterUid = self.$store.getters.getHighlightedClusterUid
        if (getHighlightedClusterUid !== null) {
          let foundCluster = false
          console.log('newCluster watch #2', getHighlightedClusterUid)
          // V2 - testing actual displayed clusters (opened + saved)
          this.$nextTick(() => {
            const clustersToTest = [...self.filteredOpenedClusters, ...self.filteredSavedClusters]
            for (let i = 0; i < clustersToTest.length; i++) {
              const cluster = clustersToTest[i]
              if (cluster._uid === getHighlightedClusterUid) {
                foundCluster = true
                console.log('newCluster watch #3', cluster._uid)
                break
              }
            }
            if (foundCluster === false) {
              console.log('newCluster watch #4', getHighlightedClusterUid)
              self.highlightClusterComponent(null)
            }
          })
          // V1
          // for (let i = 0; i < newValue.length; i++) {
          //   let cluster = newValue[i]
          //   if (cluster._uid === self.highlightedClusterComponentClusterUid) {
          //     foundCluster = true
          //     console.log('newCluster watch #3', cluster._uid)
          //     break
          //   }
          // }
          //
          // if (foundCluster === false) {
          //   console.log('newCluster watch #4', self.highlightedClusterComponentClusterUid)
          //   self.highlightClusterComponent(null)
          // }
        }
        // should I display "getting started" or not
        if (self.filteredSavedClusters.length < 5) {
          this.$nextTick(() => {
            self.gettingStarted = true
          })
        } else {
          this.$nextTick(() => {
            self.gettingStarted = false
          })
        }
        // testing if the active window
        // scenario
        // 1. we open a new collection (#1 tab has highlightened this cluster)
        // 2. we close all valid tabs
        // 3. #1 tab is still highlightened, but this active collection does not appear => looks like a bug
      }
    },
    archiveMode: {
      handler: function (newValue, oldValue) {
        // we entered archive mode
        if (newValue === true && oldValue === false) {
          this.loadArchivedClustersFromIDB()
        }
      }
    },
    emojiPickerToLoad: {
      handler: function (newValue, oldValue) {
        if (newValue === true && oldValue !== true) {
          if (this.$refs.emojiPickerIframe) {
            this.$refs.emojiPickerIframe.src = this.getBasePickerUrl
          } else {
            alert('Could not INITIALLY find emoji picker iframe. Will retry!')
          }
        }
      }
    }
  },
  components: {
    'share-modal': ShareModal,
    'edit-notes-modal': EditNotesModal,
    settings: Settings,
    'help-center': HelpCenter,
    'cluster-component': ClusterComponent,
    draggable,
    VueTagsInput,
    'cluster-dummy-component': ClusterDummyComponent,
    'search-container': SearchContainer,
    'react-vue-wrapper': ReactVueWrapper
  }
}
</script>

<style lang="scss">
@import 'colors';
@import 'cluster_dummy';
//@import "tooltip";

@import 'settings';
@import 'toggle_button';
@import '../theme/theme';

@import 'modal'; //shared styles in modal

@import 'tab';
</style>
