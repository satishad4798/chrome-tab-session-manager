<template>
  <div
    v-if="hideBeforeDelete === false"
    @mouseleave="setDefaultScreenshot"
    class="cluster_component"
    :class="[
      {
        expanded: highlightMode,
        collapsed: !highlightMode
      },
      'cluster_component__' + clusterType
    ]"
  >
    <div
      v-if="showDummy"
      class="cluster_component--content"
      :class="[
        {
          'cluster_component--content--loading': isLoadingCluster,
          'loading--placeholder': isLoadingCluster
        }
      ]"
    >
      <cluster-dummy-minimal-component
        :tabNumberProp="cluster.tabs.length"
      ></cluster-dummy-minimal-component>
    </div>
    <div
      v-else
      class="cluster_component--content"
      ref="ClusterComponentContent"
    >
      <div class="cluster_component--export_menu" ref="exportMenu">
        <export-menu
          @collectionExportTo="collectionExportToFinal($event)"
        ></export-menu>
      </div>
      <!--
            <div class="cluster_component--export_menu" ref="shareMenu">
              <ul>
                <li @click="collectionShareSave($event)">
                  <span class="normal">Public page</span>
                  <span class="loading">Creating to public page</span>
                  <span class="success">Created public page</span>
                </li>
                <li @click="shareEmail($event)">
                  <span class="normal">Email</span>
                  <span class="loading">Creating to public page</span>
                  <span class="success">Created public page</span>
                </li>
              </ul>
            </div>
            -->
      <div class="window--header--container">
        <div
          class="window--header"
          :class="{
            'full-button-mode': editTagMode,
            'edit-title-mode': editTitleMode
          }"
        >
          <div
            class="window--header--title"
            style="display: flex; align-items: center"
          >
            <template v-if="clusterType === 'archived'">
              <label class="window--header--title--label">
                <div v-if="clusterType === 'archived'">
                  {{ localClusterTitle
                  }}<span class="window--header--title--label__grayed"
                    ><template v-if="cluster.archiveType === 'orphaned'"
                      >closed unsaved</template
                    ><template v-else>{{ cluster.archiveType }}</template> on
                    {{ cluster.archiveDateOrder }}</span
                  >
                </div>
              </label>
            </template>
            <template v-else>
              <button
                @click.stop="emitToggleEmojiPicker($event, cluster._uid)"
                :class="{
                  'button-icon-picker__active': isPickerTriggerActive
                }"
                class="button-icon-picker"
                style="
                  margin-right: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 32px;
                  height: 32px;
                  cursor: pointer;
                "
              >
                <XCircleStrokeIcon
                  style="color: var(--color-blue)"
                  v-if="isPickerTriggerActive"
                />
                <figure
                  v-else-if="!cluster.icon?.isCustom"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transform: translateY(1px);
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 20px;
                  "
                >
                  {{ cluster.icon?.emoji ?? '📁' }}
                </figure>
                <img
                  v-else
                  :src="unsuspendImageSource(cluster.icon.imageUrl)"
                  :alt="cluster.icon?.names.join(',') ?? 'Session'"
                  style="display: block; width: 20px; height: 20px"
                />
              </button>

              <label
                @click.stop="clickOnTitle"
                @dblclick="editTitleModeOn"
                v-show="editTitleMode === false"
                class="window--header--title--label"
                style="
                  position: relative !important;
                  display: inline-flex;
                  align-items: center;
                "
              >
                <span
                  v-if="!searchMode"
                  :data-testid="'cluster-title-' + groupName + '-' + itemIndex"
                  style="display: flex; align-items: center; white-space: nowrap;"
                >
                  {{ localClusterTitle }}
                </span>

                <span v-else>
                  <text-highlight :queries="[clusterProvide.searchQuery]">{{
                    localClusterTitle
                  }}</text-highlight>
                </span>
                <div
                  class="window--header--title--label--icon"
                  @click.stop="editTitleModeOn"
                >
                  <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path d="M.5 11.5h11M8.5.5l2 2-6 6-3 1 1-3z" />
                    </g>
                  </svg>
                </div>
              </label>
              <div
                v-show="editTitleMode === true"
                class="window--header--title--edit"
                style="width: 100% !important"
              >
                <input
                  class="window--header--title--input"
                  ref="editTitleRef"
                  @keyup.enter="editTitleModeOff(true)"
                  @keyup.esc.stop.prevent="editTitleMode = false"
                  @blur="editTitleModeOffDelayed"
                />

                <div
                  @click.stop="editTitleModeOff(false)"
                  class="button--small button--small__cancel window--header--title--edit--icon__cancel"
                >
                  <!--<img src="/icons/ui/black-cancel.svg">-->
                  <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                      class="button--small__color"
                    >
                      <path d="M2.111 9.889l7.778-7.778" />
                      <circle cx="6" cy="6" r="5.5" />
                    </g>
                  </svg>
                </div>
                <div
                  @click.stop="editTitleModeOff(true)"
                  class="button--small button--small__confirm window--header--title--edit--icon__confirm"
                >
                  <svg
                    width="12"
                    height="10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.5 6.5l3 3 8-9"
                      stroke="#000"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="button--small__color"
                    />
                  </svg>
                  <!--<img src="/icons/ui/black-confirm.svg">-->
                </div>
              </div>
            </template>
          </div>

          <div
            class="window--header--buttons--container"
            v-show="editTitleMode === false"
          >
            <div class="window--header--buttons--gradient"></div>

            <!-- normal buttons for collection -->
            <div v-if="editTabsMode === false" class="window--header--buttons">
              <div
                class="window--header--buttons--show_on_hover"
                :class="{
                  'window--header--buttons--show_on_hover__force_open':
                    anyDropdownOpened || editTagMode
                }"
              >
                <!-- if export is opened, force stay opened -->
                <template v-if="clusterType !== 'opened'">
                  <button
                    @click="clusterDelete"
                    class="button--normal button--normal__show-on-hover icon--delete"
                  >
                    <svg
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#0F62FE"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M2.5 8.5v5a2 2 0 002 2h7a2 2 0 002-2v-5M5.5 3.5v-3h5v3M.5 3.5h15v3H.5z"
                        />
                      </g>
                    </svg>
                  </button>
                </template>

                <template v-if="clusterType !== 'archived'">
                  <button
                    :class="{ 'button--normal__active': editTagMode }"
                    @click="editTagModeOn"
                    class="button--normal button--normal__show-on-hover icon--tags"
                  >
                    <template
                      v-if="
                        Array.isArray(localClusterTags) &&
                        localClusterTags.length > 0
                      "
                    >
                      <!--                                            <img src="/icons/ui/blue-tags-stack-full.svg">-->
                      <svg
                        width="15"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon--tags--on"
                      >
                        <g fill="#0F62FE">
                          <path
                            d="M14.707 7.207L7.5 0H2v2h3.914l7.5 7.5c.068.071.13.147.187.227l1.106-1.106a1 1 0 000-1.414z"
                          />
                          <path
                            d="M12.707 10.207L5.5 3H0v5.5l7.207 7.207a1 1 0 001.414 0l4.086-4.086a1 1 0 000-1.414zM3 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </g>
                      </svg>
                      <div class="icon--element--bubble_number">
                        {{ localClusterTags.length }}
                      </div>
                    </template>
                    <template v-else>
                      <!--                                            <img src="/icons/ui/blue-tags-stack.svg">-->
                      <svg
                        width="15"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon--tags--off"
                      >
                        <g
                          stroke="#0F62FE"
                          fill="none"
                          fill-rule="evenodd"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M9.121 15.207l4.086-4.086a1 1 0 000-1.414L6 2.5H.5V8l7.207 7.207a1 1 0 001.414 0z"
                          />
                          <path d="M14.5 8L7 .5H1.5" />
                          <circle cx="4" cy="6" r="1.5" />
                        </g>
                      </svg>
                    </template>
                  </button>
                  <div
                    class="edit_tag_mode button--normal__show-on-hover"
                    v-if="editTagMode"
                    v-on-clickaway="clickOutsideVueTagsInput"
                  >
                    <vue-tags-input
                      :autocomplete-items="filteredTagItems"
                      :placeholder="
                        localClusterTags.length > 0
                          ? ''
                          : 'Use enter to add tags'
                      "
                      :tags="localTags"
                      @tags-changed="(newTags) => saveClusterTags(newTags)"
                      @input="copyInputToParentWithDelay($event)"
                      ref="vueInputTagsComponent"
                      v-model="tag"
                    />
                    <!-- :save-on-key="[',', ':', ';']" -->
                    <div
                      @click.stop.prevent="editTagModeOffWithoutSave"
                      class="button--small button--small__cancel edit_tag_mode--icon--cancel"
                    >
                      <!--<img src="/icons/ui/black-cancel.svg">-->
                      <svg
                        height="12"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g
                          class="button--small__color"
                          fill="none"
                          fill-rule="evenodd"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M2.111 9.889l7.778-7.778" />
                          <circle cx="6" cy="6" r="5.5" />
                        </g>
                      </svg>
                    </div>
                    <!-- prevent so we do not click on title that is below -->
                    <div
                      @click.stop.prevent="editTagModeOff"
                      class="button--small button--small__confirm edit_tag_mode--icon--confirm"
                    >
                      <svg
                        height="10"
                        width="12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          class="button--small__color"
                          d="M.5 6.5l3 3 8-9"
                          fill="none"
                          fill-rule="evenodd"
                          stroke="#000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <!--<img src="/icons/ui/black-confirm.svg">-->
                    </div>
                    <!--<button  class="button&#45;&#45;normal icon&#45;&#45;save-tags"><span>Save tags</span></button>-->
                  </div>
                  <button
                    @click="clusterAddFavourite"
                    class="button--normal button--normal__show-on-hover icon--favourites icon--favourites--off"
                    v-if="localClusterFavourite === false"
                  >
                    <!--<img src="/icons/ui/blue-heart.svg">-->
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5.5C9.982.5 8.678 1.355 8 2.601 7.322 1.355 6.018.5 4.5.5a4 4 0 00-4 4c0 4 7.5 11 7.5 11s7.5-7 7.5-11a4 4 0 00-4-4z"
                        stroke="#0F62FE"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    @click="clusterRemoveFavourite"
                    class="button--normal button--normal__show-on-hover icon--favourites icon--favourites--on"
                    v-if="localClusterFavourite === true"
                  >
                    <!--<img src="/icons/ui/blue-heart-full.svg">-->
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      style="overflow: visible"
                    >
                      <path
                        d="M11.6 0C10.1 0 8.8.8 8 2 7.2.8 5.9 0 4.4 0 2 0 0 2 0 4.4c0 4.4 8 10.9 8 10.9s8-6.5 8-10.9C16 2 14 0 11.6 0z"
                        fill="#0F62FE"
                      />
                    </svg>
                  </button>
                </template>

                <button
                  @click="clusterDropdownOpen('export')"
                  class="button--normal icon--export"
                  :class="{ 'button--normal__active': exportOpened }"
                  ref="exportButton"
                >
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path d="M11.5 4.5L8 .5l-3.5 4h2v6h3v-6z" />
                      <path
                        d="M12.5 6.5h2a1 1 0 011 1v7a1 1 0 01-1 1h-13a1 1 0 01-1-1v-7a1 1 0 011-1h2"
                      />
                    </g>
                  </svg>
                  <span>Copy as...</span>
                  <svg
                    width="10"
                    height="6"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon--export--down"
                    :class="{ 'icon--export--down__opened': exportOpened }"
                  >
                    <path
                      d="M0 0l5 6 5-6z"
                      fill="#0F62FE"
                      fill-rule="nonzero"
                    />
                  </svg>
                </button>

                <button
                  @click="collectionShareSave"
                  class="button--normal icon-share"
                  ref="shareButton"
                >
                  <svg
                    width="14"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path d="M5.12 6.675l3.761-2.35M5.12 9.325l3.761 2.35" />
                      <circle cx="11" cy="3" r="2.5" />
                      <circle cx="11" cy="13" r="2.5" />
                      <circle cx="3" cy="8" r="2.5" />
                    </g>
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              <div
                class="window--header--buttons--always_visible"
                :class="{
                  'window--header--buttons--always_visible__with_modifier':
                    clusterProvide.isKeyPressedModifier,
                  'window--header--buttons--always_visible__show_for_saved':
                    clusterType === 'saved' || clusterType === 'orphaned',
                  'window--header--buttons--always_visible__show_for_opened':
                    clusterType === 'opened',
                  'window--header--buttons--always_visible__show_for_archived':
                    clusterType === 'archived',
                  'window--header--buttons--always_visible__show_for_close_tabs_and_save_true':
                    clusterProvide.settings.hasOwnProperty(
                      'closeTabsAndSave'
                    ) && clusterProvide.settings.closeTabsAndSave === true,
                  'window--header--buttons--always_visible__show_for_close_tabs_and_save_false':
                    clusterProvide.settings.hasOwnProperty(
                      'closeTabsAndSave'
                    ) && clusterProvide.settings.closeTabsAndSave === false
                }"
              >
                <template v-if="clusterType === 'archived'">
                  <button
                    @click="clusterRestoreFromArchive"
                    class="button--normal button--normal__show-on-hover icon--undelete"
                  >
                    <!-- waste-recycling.svg -->
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        stroke="#0F62FE"
                        fill="none"
                        fill-rule="evenodd"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M5.5 3.5v-3h5v3M2.5 12.5h8a2 2 0 002-2v-7M3.5 3.5v4M.5 3.5h15"
                        />
                        <path d="M5.5 9.5l-3 3 3 3" />
                      </g>
                    </svg>
                    <span>Restore</span>
                  </button>
                </template>

                <button
                  @click.once="clusterReopen"
                  :data-testid="
                    'open-all-button-' + groupName + '-' + itemIndex
                  "
                  class="button--normal icon--reopen"
                  :class="{
                    'button--normal__with_modifier':
                      clusterProvide.isKeyPressedModifier
                  }"
                >
                  <!--                                        <img src="/icons/ui/blue-open.svg">-->
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.5 9.5h6v6h-6zm15-3v-6h-6m6 0l-6 6"
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    />
                  </svg>
                  <span class="button--normal--span__without_modifier"
                    >Open all</span
                  >
                  <span
                    class="button--normal--span__with_modifier"
                    v-if="
                      clusterProvide.settings?.openCollectionSuspended === false ||
                      clusterProvide.settings?.suspendedTabsTabLimit >= cluster.tabs.length
                    "
                    >Speed-load all</span
                  >
                  <span
                    class="button--normal--span__with_modifier"
                    v-if="
                      clusterProvide.settings?.openCollectionSuspended === true &&
                      clusterProvide.settings?.suspendedTabsTabLimit < cluster.tabs.length
                    "
                    >Open all awake</span
                  >
                </button>

                <button
                  @click="clusterSave($event)"
                  class="button--normal icon--save"
                >
                  <!--                                            <img src="/icons/ui/blue-save.svg">-->
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 6.5h-6v-6h6zm-15 3v6h6m-6 0l6-6"
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    />
                  </svg>
                  <span>Save</span>
                  <span class="success" style="margin-left: 8px">Saved!</span>
                </button>
                <button
                  @click.once="clusterClose"
                  class="button--normal icon--close"
                >
                  <!--                                            <img src="/icons/ui/blue-close-bigger.svg">-->
                  <svg
                    width="12"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path d="M11.5.5l-11 11M.5.5l11 11" />
                    </g>
                  </svg>
                  <span>Close</span>
                </button>
                <button
                  @click.once="clusterSaveAndCloseWindow"
                  class="button--normal icon--save_and_close"
                >
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5 6.5h-6v-6h6zm-15 3v6h6m-6 0l6-6"
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    />
                  </svg>
                  <span>Save & close</span>
                </button>
              </div>
            </div>

            <!-- if editTabsMode is on -->
            <div class="window--header--buttons" v-show="editTabsMode === true">
              <button
                v-if="clusterType === 'saved'"
                @click="openSelectedTabs"
                class="button--normal"
              >
                <svg
                  data-v-20ba871c=""
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    data-v-20ba871c=""
                    d="M.5 9.5h6v6h-6zm15-3v-6h-6m6 0l-6 6"
                    stroke="#0F62FE"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                <span>Open selected</span>
              </button>
              <!-- opened has add to, which is same as copy in 'saved' or 'archive' -->
              <template v-if="clusterType === 'opened'">
                <button
                  @click="toggleSelectedMode('copy')"
                  class="button--normal"
                  :class="{
                    'button--normal__active': moveOrCopySelectedMode === true
                  }"
                >
                  <svg
                    width="16"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path
                        d="M7.5.5v7M7.5 10.5v4M.5 7.5h15M11.5 3.5l4 4-4 4"
                      />
                    </g>
                  </svg>
                  <span>Add to...<!-- Save to / Copy to --></span>
                </button>
              </template>
              <template v-if="clusterType === 'archived'">
                <button
                  @click="toggleSelectedMode('copy')"
                  class="button--normal"
                  :class="{
                    'button--normal__active': moveOrCopySelectedMode === true
                  }"
                >
                  <svg
                    width="16"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path
                        d="M7.5.5v7M7.5 10.5v4M.5 7.5h15M11.5 3.5l4 4-4 4"
                      />
                    </g>
                  </svg>
                  <span>Copy to...<!-- Save to / Copy to --></span>
                </button>
              </template>
              <template v-if="clusterType === 'saved'">
                <button
                  @click="toggleSelectedMode('copy')"
                  class="button--normal"
                  :class="{
                    'button--normal__active':
                      moveOrCopySelectedMode === true &&
                      actionAfterSelectedCollection === 'copy'
                  }"
                >
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path d="M.5.5h11v11H.5z" />
                      <path d="M13.5 4.5h2v11h-11v-2" />
                    </g>
                  </svg>
                  <span>Copy to</span>
                </button>
                <button
                  @click="toggleSelectedMode('move')"
                  class="button--normal"
                  :class="{
                    'button--normal__active':
                      moveOrCopySelectedMode === true &&
                      actionAfterSelectedCollection === 'move'
                  }"
                >
                  <svg
                    width="16"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      stroke="#0F62FE"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <path
                        d="M7.5.5v7M7.5 10.5v4M.5 7.5h15M11.5 3.5l4 4-4 4"
                      />
                    </g>
                  </svg>
                  <span>Move to</span>
                </button>
              </template>
              <button
                v-if="clusterType === 'saved'"
                @click="deleteSelectedTabs"
                class="button--normal icon--edit_tabs_mode--delete_selected_tabs"
              >
                <!-- e.remove.svg -->
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <g
                    stroke="#0F62FE"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11.5.5l-11 11M.5.5l11 11" />
                  </g>
                </svg>
                <span>Delete selected</span>
              </button>
              <button
                v-if="clusterType === 'opened'"
                @click="closeSelectedTabs"
                class="button--normal icon--edit_tabs_mode--delete_selected_tabs"
              >
                <!-- e.remove.svg -->
                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                  <g
                    stroke="#0F62FE"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M11.5.5l-11 11M.5.5l11 11" />
                  </g>
                </svg>
                <span>Close selected</span>
              </button>

              <!-- we are adding this class to detect if it is empty to show or not show "Create +" button -->
              <!-- it does not work properly because v-model is not updated when you enter into input -->
              <div
                class="v-select_dropdown--container"
                :class="{
                  'v-select_dropdown--container__hide-create':
                    !vueSelectDisplayCreate
                }"
                ref="v-select--container"
                v-if="moveOrCopySelectedMode === true"
              >
                <v-select
                  :options="clustersForSelectWithoutThis"
                  :reduce="(cluster) => `${cluster._uid}`"
                  label="title"
                  placeholder="Search sessions ..."
                  :closeOnSelect="true"
                  :clearSearchOnSelect="false"
                  @input="onSelectedClusterUid($event)"
                  @search="vueSelectSearch"
                >
                  <span slot="no-options">No sessions found.</span> </v-select
                ><!--
                                    v-model="selectedClusterUid"
                                    :key="'selected' + selectedClusterUid"
                                    --><!-- can be used to reload on selectedClusterUid change -->
              </div>

              <button
                @click="disableEditTabsMode"
                class="button--normal icon--edit_tabs_mode--cancel"
              >
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="window--content">
        <div
          class="window--screenshot"
          :class="{ 'window--screenshot__dummy': dummyScreenshot }"
        >
          <div
            class="window--screenshot--container"
            @click.stop="clusterScreenshotClickEvent()"
          >
            <template v-if="qrCodeUrl === ''"
              ><!--  -->
              <transition-group name="fade" mode="out-in">
                <div
                  v-for="currentScreenshotUid in [screenshotUid]"
                  :key="currentScreenshotUid"
                  class="window--screenshot--image"
                  :style="{ backgroundImage: 'url(\'' + screenshotSrc + '\')' }"
                ></div>
              </transition-group>
            </template>
            <template v-else>
              <div class="window--screenshot--qr">
                <vue-qr
                  :text="qrCodeUrl"
                  :margin="0"
                  :size="270"
                  :whiteMargin="false"
                ></vue-qr>
              </div>
            </template>
          </div>
        </div>
        <div class="window--tabs">
          <table
            v-if="filteredTabs && filteredTabs.length > 0"
            class="tab-table"
          >
            <thead v-show="highlightMode">
              <tr>
                <th class="tab-favicon center">
                  <input
                    type="checkbox"
                    v-model="selectAllCheckboxLocal"
                    ref="selectAllCheckbox"
                    :indeterminate.prop="selectAllCheckboxIndeterminate"
                  />
                </th>
                <th class="tab-title">Page title</th>
                <th class="tab-note">Notes</th>
                <th class="tab-date">Time</th>
                <th class="tab-url right">Domain</th>
                <th class="tab-buttons"></th>
              </tr>
            </thead>
            <tbody>
              <!-- rendering with this takes around 2 seconds less when having demo data inside -->
              <tab-component
                v-for="(tab, index) in filteredTabs"
                :key="index"
                :tab="tab"
                :makeTransparent="isTabTransparent(tab)"
                :isSuspended="libraryIsTabSuspendedOrDiscarded(tab)"
                :clusterUid="cluster._uid"
                :clusterType="clusterType"
                :highlight="highlightMode"
                :forceIcon="forceIcon"
                :editTabsMode="editTabsMode"
                :isChecked="checkedTabs.includes(tab._uid)"
                @tabCheckedChange="onTabCheckboxChangeFunction($event)"
                @tabIconClickEvent="tabIconClickEvent($event)"
                @tabTitleClickEvent="tabTitleClickEvent($event)"
                @tabXButtonClickEvent="tabXButtonClickEvent($event)"
                @updateScreenshot="updateScreenshot($event)"
                @showQrCode="showQrCode($event)"
                @triggerEditNote="triggerEditNote($event)"
                :searchQuery="clusterProvide.searchQuery"
                :thisTabId="clusterProvide.thisTabId"
                :settingsTableroneTimestampFormat="
                  clusterProvide.settings.tableroneTimestampFormat
                "
                :settingsTableroneTimeFormat="
                  clusterProvide.settings.tableroneTimeFormat
                "
                :settingsTableroneDateFormat="
                  clusterProvide.settings.tableroneDateFormat
                "
              ></tab-component
              ><!-- @tabUrlClickEvent="tabUrlClickEvent($event)" -->
              <!-- :onTabCheckboxChangeFunction="onTabCheckboxChangeFunction" -->
              <!-- this is to add missing height if neccessary -->
              <template
                v-if="Array.isArray(filteredTabs) && filteredTabs.length < 5"
              >
                <tr
                  style="visibility: hidden"
                  class="dummy-row"
                  v-for="index in 5 - filteredTabs.length"
                >
                  <td></td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr
                v-if="
                  cluster.tabs.length > 5 &&
                  showingMoreThanMaxTabs === false &&
                  highlightMode === false
                "
                style="height: 40px"
              >
                <td></td>
                <td>
                  <a
                    @click.stop="showAllClick"
                    class="black-to-blue-link"
                    v-show="searchMode === false"
                  >
                    <span>Show all ({{ cluster.tabs.length }})</span>
                  </a>
                  <!--<button @click="toggleCollapse" v-if="filteredTabs.length >= 5"><span v-if="collapsed == true">Expand</span><span v-else>Collapse</span></button>-->
                </td>
              </tr>
              <!-- we are adding this height in case we do not display Show all button -->
              <tr
                v-else-if="
                  (showingMoreThanMaxTabs === false &&
                    highlightMode === false) ||
                  isThisWindowCluster === true
                "
                style="visibility: hidden; height: 40px"
              >
                <td colspan="3"></td>
              </tr>
              <!--                        <transition name="collapse&#45;&#45;button_below_tabs" mode="out-in">-->
              <tr v-if="highlightMode === true">
                <td colspan="3" class="left">
                  <a
                    @click.stop="collapseAndReturnToTimelineClick"
                    class="blue-link collapse-and-return-to-timeline"
                  >
                    <span>Collapse and return to timeline</span>
                  </a>
                </td>
              </tr>
              <!--                        </transition>-->
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TabComponent from './TabComponent.vue'
import XCircleStrokeIcon from './XCircleStrokeIcon.vue'
import ClusterDummyMinimalComponent from './ClusterDummyMinimalComponent.vue'
import ExportMenu from './ExportMenu.vue'
import VueTagsInput from '@johmun/vue-tags-input'

/*
import {
  isValidTab,
  getClusterTitle,
  copyToClipboard,
  guessTitle,
  getFavouriteValueFromCluster,
  getTagsArrayFromCluster
} from '../../library/library'
const Library = {isValidTab, getClusterTitle, copyToClipboard, guessTitle, getFavouriteValueFromCluster, getTagsArrayFromCluster};
*/
// import Tags from '../../library/tags'
import Library from '../../library/library'
import KNOTDB from '../../library/knotidb'
// import QrcodeVue from 'qrcode.vue'
import VueQr from 'vue-qr'
import { mixin as clickaway } from 'vue-clickaway'

import { mapState } from 'vuex'
import {
  DB_TBL_SCREENSHOTS,
  NEW_TAB_CTRL_CLICK_DELAY_MS,
  NEW_TAB_DEFAULT_CLOSE_DELAY_MS,
  NEW_TAB_IMMEDIATE_CLOSE_DELAY_MS
} from '../../config'
import { FeatureFlags, hasFeatureFlag } from '../../utils/featureFlags'
import BehaviorMode from '../../background/managers/BehaviorMode'
import Tab from '../../background/managers/Tab'
import { isDesiredCombo, ModifiersCombos } from '../../library/key-modifiers'
import { log } from '../../utils/loggerone'

const TOAST_UNDO_DURATION = 7000

// const IMG_DEFAULT_FOCUS_DATA_URL = '/icons/ui/empty-thumbnail__focus.svg' // png version is no better for effect
// const IMG_DEFAULT_VISIT_DATA_URL = '/icons/ui/empty-thumbnail__visit.svg' // png version is no better for effect
const IMG_DEFAULT_BACKGROUND_URL = '/icons/ui/transparent_16_9.png'

export default {
  name: 'ClusterComponent',
  mixins: [clickaway],
  props: {
    itemIndex: { type: Number },
    groupName: { type: String },
    cluster: {
      type: Object,
      required: true
      /*
        validator: function (value) {
          let neededKeys = [
            'tabs',
            '_uid',
          ]

          neededKeys.forEach(function (key) {
            if (!value.hasOwnProperty(key)) {
              return false
            }
          })

          //does cluster have tabs with url
          //value.tabs.forEach(function(tab) {
          //    if (!Object.prototype.hasOwnProperty.call(tab, url)) {
          //        return false
          //    }
          //})

          return true
        }
        */
    },
    isPickerTriggerActive: {
      type: Boolean
    },
    /* //these values also appear in cluster, but reactivity (change detection) does not work properly there
      clusterTitle: String,
      clusterFavourite: Boolean,
      clusterTags: Array, */

    clusterType: {
      type: String,
      required: true
      /*
        validator: function (value) {
          return [
            'saved',
            'orphaned',
            'opened',
            'archived',
          ].indexOf(value) !== -1
        }
        */
    },
    findScreenshot: Function,

    getClusterTitleFromClusterUid: Function,

    unsuspendAndFocusTab: Function,

    showOnlyOnObserveSettingProp: {
      type: Boolean,
      default: false
    },

    forceIcon: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    'tab-component': TabComponent,
    'vue-tags-input': VueTagsInput,
    XCircleStrokeIcon,
    'cluster-dummy-minimal-component': ClusterDummyMinimalComponent,
    'export-menu': ExportMenu,
    // QrcodeVue,
    'vue-qr': VueQr
  },
  data: () => {
    return {
      screenshotSrc: '',
      screenshotUid: '',

      moveOrCopySelectedMode: false, // if we are in mode when we are selecting in which collection to move or copy tabs
      actionAfterSelectedCollection: '', // after we select the collection, what action will we take ['copy', 'move']

      editTitleMode: false,
      editTagMode: false,

      // for dropdowns
      dropdownTypes: ['export'], // ['export', 'share'],
      exportOpened: false,
      // shareOpened: false,
      exportDropdownHeight: '359px', // 9*40 -1
      shareDropdownHeight: '79px', // 2*40 -1

      localClusterTitle: '',
      localClusterFavourite: null,
      localClusterTags: [],
      localBeforeEditingClusterTags: [], // for saving backup before editing

      emojiPickerIframe: null,
      shouldShowIconPicker: false,
      emojiPickerX: 0,
      emojiPickerY: 0,
      emojiPickerHeight: 352, // * default for the picker, changes to 288 for the custom uploader
      emojiPickerClusterUid: null,

      tag: '', // some temporary tag for adding tags
      localTags: [], // some temporary tags for adding tags
      localBeforeEditingTags: [], // for saving backup before editing

      checkedTabs: [], // array of selected tab._uid strings
      // selectedClusterUid: null,

      hideBeforeDelete: false, // should we delete it or not

      qrCodeUrl: '', // if empty, show screenshot, otherwise, show qr code

      dummyScreenshot: true, // do we have dummy screenshot or not

      vueSelectDisplayCreate: false, // if false, we display

      tagsInputCurrent: '', // what is currently written in tags input (applied with a 100ms delay)

      generateScreenshotTabsLoaded: [], // list of tabs that have loaded

      observer: null,
      observed: 'not',
      isObserved: false
    }
  },
  inject: ['clusterProvide'],
  created() {},
  beforeDestroy() {
    if (this.showOnlyOnObserveSettingProp) {
      this.observer.disconnect()
    }
  },
  mounted() {
    // const self = this
    this.initListeners()
    this.setDefaultScreenshot()

    // we set this through props, so we can exclude the top ones
    if (this.showOnlyOnObserveSettingProp) {
      this.observer = new IntersectionObserver(this.onElementObserved, {
        root: null, // this.$root,
        // rootMargin: 'px',
        threshold: 0.1
      })

      // console.log("element", this.$el)
      // let boxElement = document.querySelector("#box");
      // this.observer.observe([this.$refs.ClusterComponentContent])

      this.observer.observe(this.$el)
    }
  },

  methods: {
    getBasePickerUrl() {
      return Library.getExtensionUrl() + `/popup/popup.html?icon-picker-iframe`
    },

    updateEmojiPickerUrl(clusterUid) {
      this.$refs.emojiPickerIframe.src =
        this.getBasePickerUrl() + `#clusterUid=${clusterUid}`
    },

    unsuspendImageSource(url) {
      return Library.unsuspendURL(url)
    },
    emitToggleEmojiPicker(event, clusterUid) {
      this.$emit('emojiPickerToggle', {
        clusterUid,
        event
      })
    },

    onElementObserved(entries) {
      if (entries[0].isIntersecting) {
        this.observed = 'yep'
        this.isObserved = true
      } else {
        this.observed = 'nope'
        this.isObserved = false
      }
      // console.log("onElementObserved", entries)
    },
    clusterGenerateScreenshots() {
      const message = {
        command: 'screenshotgenerator.generate-screenshots',
        clusterUid: this.cluster._uid
      }
      this.sendMessage(message)
      // alert(JSON.stringify(message))
    },
    setDefaultScreenshot() {
      const firstTab = this.cluster.tabs[0]

      if (firstTab) {
        // is not undefined
        this.updateScreenshot({ tabUrl: firstTab.url, tabUid: firstTab._uid }) // display the first one by default
      } else {
        this.dummyScreenshot = true
        /*
          if (this.clusterType === 'opened') {
            this.screenshotSrc = IMG_DEFAULT_FOCUS_DATA_URL //for opened clusters
          } else {
            this.screenshotSrc = IMG_DEFAULT_VISIT_DATA_URL //for non-opened clusters
          }
          */
        this.screenshotSrc = IMG_DEFAULT_BACKGROUND_URL
      }
      // console.log('what is first tab', firstTab)
    },
    async updateScreenshot(data) {
      this.qrCodeUrl = ''

      // console.log('update default screenshot from data', data)

      this.screenshotSrc = await this.findScreenshotFromIndexDB(data.tabUrl)
      // this.screenshotUrl = data.tabUrl
      // this.screenshotUid = data.tabUid
    },
    async findScreenshotFromIndexDB(url) {
      const self = this
      try {
        const db = await KNOTDB
        const screenshot = await db.getFromIndex(DB_TBL_SCREENSHOTS, 'url', url) // IDBKeyRange.only(url)

        if (screenshot) {
          self.dummyScreenshot = false
          return screenshot.dataUrl
        } else {
          self.dummyScreenshot = true
          throw Error(400)
        }
      } catch (e) {
        self.dummyScreenshot = true
        return IMG_DEFAULT_BACKGROUND_URL
      }
    },
    showQrCode(url) {
      this.qrCodeUrl = url
    },
    triggerEditNote(data) {
      data.clusterTitle = this.localClusterTitle
      data.clusterUid = this.cluster._uid
      this.$store.dispatch('updateTabNoteEdit', data)
    },
    clickOnTitle() {
      /*
        this.oldClickOnTitle()
        */
      // we now use only edit title when we click on the title
      this.editTitleModeOn()
    },
    /*      oldClickOnTitle() { //same as App.TabFocus        //if it is opened, we focus on the active tab        if (this.clusterType === 'opened') {          let selectedTabId          for (let i = 0; i < this.cluster.tabs.length; i++) {            let tab = this.cluster.tabs[i]
            if (i === 0) {
              selectedTabId = tab.id
            }

            if (tab.active === true) {
              selectedTabId = tab.id
              break
            }
          }

          this.sendMessage({ command: 'tab.focus', tabId: selectedTabId })
        } else {
          this.toggleCollapse()
        }
      }, */
    editTitleModeOn() {
      const self = this
      this.editTitleMode = true
      this.$nextTick(() => {
        // this is something weird found here : https://stackoverflow.com/questions/52088691/vue-js-put-focus-on-input
        const input = this.$refs.editTitleRef
        input.value = self.localClusterTitle // put it there non reactively
        input.focus()
        input.setSelectionRange(0, input.value.length)
      })
    },
    editTitleModeOff(save) {
      if (save === true) {
        const input = this.$refs.editTitleRef
        this.localClusterTitle = input.value
        this.$emit('clusterUpdateTitle', {
          clusterUid: this.cluster._uid,
          title: input.value
        })
      }

      this.editTitleMode = false
    },
    editTitleModeOffDelayed() {
      // this must be done so that we can capture a later click on the buttons cancel and confirm (small icons over input)
      // problem is that this (via blur) fires first and click on those icons second...

      setTimeout(() => {
        this.editTitleMode = false
      }, 250) /* 250 ms seems to be the norm for this, 100ms is too little */

      /*
        this.$nextTick(() => {
            this.editTitleMode = false
        })
        */
    },
    editTagModeOn() {
      const self = this

      this.editTagMode = true

      // save original local tags
      this.localBeforeEditingTags = this.localTags
      this.localBeforeEditingClusterTags = this.localClusterTags

      // focus inside
      this.$nextTick(() => {
        const vueInputTagsComponent = self.$refs.vueInputTagsComponent
        const vueInputTagsComponentInput =
          vueInputTagsComponent.$refs.newTagInput
        vueInputTagsComponentInput.focus()

        // hack to use input for new tag and capturing escape or enter
        vueInputTagsComponentInput.addEventListener(
          'keydown',
          self.onKeyDownInTagInput
        )
      })
    },
    copyInputToParentWithDelay(obj) {
      // delay, so change happens later, so we can detect it later
      const self = this
      setTimeout(function () {
        self.tagsInputCurrent = obj
      }, 100)
    },
    onKeyDownInTagInput(e) {
      e = e || window.event
      // if it is empty and we press enter, we should save and close (we are done)
      if (e.keyCode === 13) {
        // 13 = enter
        console.log('DETECT - 13')
        if (this.tagsInputCurrent === '') {
          // if the input is null
          const selectedItem = this.$refs.vueInputTagsComponent.selectedItem // we check for
          console.log('DETECT - empty', selectedItem)
          if (selectedItem === null) {
            // if there is no selected item
            this.editTagModeOff()
            console.log('DETECT - null')
          }
        }
      } else if (e.keyCode === 27) {
        // 27 = esc
        this.editTagModeOff(false)
      }
    },
    editTagModeOff(tryToAddRemainingTag = true) {
      this.$refs.vueInputTagsComponent.$refs.newTagInput.removeEventListener(
        'keydown',
        this.onKeyDownInTagInput
      ) // remove event from newTagInput field

      this.editTagMode = false

      if (tryToAddRemainingTag) {
        // if we also have this.tag that is not empty (v-model of vue-tags-input is linked to it), we should save it (UI quirk)
        const newPotentialTag = this.tag
        if (newPotentialTag.trim() !== '') {
          // if it is not yet included, include it!
          if (this.localClusterTags.includes(newPotentialTag) === false) {
            this.localClusterTags.push(newPotentialTag)
            this.localTags.push({ text: newPotentialTag })
          }
        }
      }

      this.tag = '' // reset whatever was written inside

      // save trigger only on save
      const textTagsOnly = this.localTags.map((x) => x.text) // get only text from array
      this.$emit('clusterUpdateTags', {
        clusterUid: this.cluster._uid,
        tags: textTagsOnly
      })
    },
    clickOutsideVueTagsInput: function (event) {
      this.editTagModeOff(true)
    },
    editTagModeOffWithoutSave() {
      this.editTagMode = false

      this.tag = '' // reset whatever was written inside

      // put back local tags if we are not saving
      this.localTags = this.localBeforeEditingTags
      this.localClusterTags = this.localBeforeEditingClusterTags
    },
    saveClusterTags(tags) {
      // we call this inside vue-tags-input
      this.localTags = tags
      this.localClusterTags = tags.map((x) => x.text)
      // we only save to localTags, and after exit we save to global tags
    },
    clusterSave(event) {
      const button = event.target.closest('button')
      button.setAttribute('data-success', 'true')
      setTimeout(function () {
        button.removeAttribute('data-success')
      }, 500)
      this.$emit('clusterSave', this.cluster._uid)
    },
    clusterSaveAndCloseWindow() {
      this.localClusterTitle = ''
      this.hideBeforeDelete = true
      this.$emit('clusterSaveAndCloseWindow', this.cluster._uid)
    },
    clusterClose() {
      // this.$emit('windowClose', this.thisWindowId)
      if (this.highlightMode) {
        this.$emit('highlightAction', null) // if it it highlighted and we are closing it => unhighlight it
      }
      this.sendMessage({
        command: 'cluster.close',
        cluster: this.cluster,
        tabId: this.clusterProvide.thisTabId,
        windowId: this.clusterProvide.thisWindowId
      })
    },
    testIfOpenedUnsuspendAndFocusTab(tabDetails) {
      if (this.clusterType === 'opened') {
        this.$emit('unsuspendAndFocusTab', tabDetails)
      } else {
        // we do nothing because we clicked on a saved url
      }
    },
    // events from tab - start
    tabIconClickEvent(tabDetails) {
      /*
        this.testIfOpenedUnsuspendAndFocusTab(tabDetails)
        this.sendMessage({ command: 'tracking.add.event', eventName: 'collectionTabIconClicked', eventProps: {} })
        */
    },
    async tabTitleClickEvent(tabDetails) {
      if (this.clusterType === 'opened') {
        this.testIfOpenedUnsuspendAndFocusTab(tabDetails)
      } else if (this.clusterType === 'saved') {
        // in saved these are link so they have functionality by default

        // * Added for the New Tab Mode
        const [isNewTabOnly, isToolbarOnly] = await Promise.all([
          BehaviorMode.checkIfIsNewTabOnly(),
          BehaviorMode.checkIfIsPopUpOnly()
        ])

        if (isNewTabOnly || isToolbarOnly) {
          // * Experimenting with existing code
          if (this.clusterProvide.thisTabId) {
            const { clickEvent } = tabDetails

            log.timelineTab.debug('Clicked on a tab title.', {
              clickEvent,
              tabDetails
            })

            if (isDesiredCombo(clickEvent, ModifiersCombos.ctrlOnly)) {
              this.handleControlClick(this.clusterProvide.thisTabId)
            }

            if (isDesiredCombo(clickEvent, ModifiersCombos.shiftOnly)) {
              this.handleShiftClick(this.clusterProvide.thisTabId)
            }

            if (
              isDesiredCombo(clickEvent, ModifiersCombos.ctrlShift) ||
              isDesiredCombo(clickEvent, ModifiersCombos.ctrlAltShift)
            ) {
              this.handleControlAndShiftClick(this.clusterProvide.thisTabId)
            }

            if (isDesiredCombo(clickEvent, ModifiersCombos.altShift)) {
              this.handlShiftAndAltClick(this.clusterProvide.thisTabId)
            }
          } else {
            console.warn(
              "No timeline found in the current window. Let's look for one in the next window."
            )
          }
        }
      }

      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionTabTitleClicked',
        eventProps: { clusterType: this.clusterType }
      })
    },

    async handleControlClick(timelineTabId) {
      /**
       * Callback function for the chrome.tabs.onActivated event.
       *
       * @param {Object} activeInfo - Information about the activated tab.
       * @param {number} activeInfo.tabId - The ID of the tab that has become active.
       * @param {number} [activeInfo.windowId] - The ID of the window the active tab is in. Optional, may not be present in all use cases.
       * @generated ChatGPT
       */
      // * Using an arrow function for simplicity:
      // *
      const onTabActivated = ({ tabId }) => {
        const hasLostFocus = tabId !== timelineTabId
        if (hasLostFocus) {
          // * Keeping this for future reference: internals redesign.
          // ! calling the code immediately inside the `onActivated.addListener` callback this leads to:
          // ! `Uncaught (in promise) Error: Tabs cannot be edited right now (user may be dragging a tab).`
          // ! BUT ONLY when you switch tabs with your mouse click!
          // ! Mouse wheel scroll works. Keyboad shortcuts work.
          // ! 🤦🤦🤦
          // chrome.tabs.remove(timelineTabId)

          // ! try/catch did NOT catch anything. 😐
          // try {
          //   chrome.tabs.remove(timelineTabId)
          // } catch (error) {
          //   console.error('Failed to close the tab.', error)
          // }

          // * Closing might take a little while, so let's change the title to indicate that.
          document.title = 'Closing...'
          // ! Calling it after a delay works.
          setTimeout(() => {
            chrome.tabs.remove(timelineTabId)
            // ! currently at 1 ms (0 ms does not work)
            // ! let's test it on various machines.
          }, NEW_TAB_CTRL_CLICK_DELAY_MS)
        }
      }

      chrome.tabs.onActivated.addListener(onTabActivated)
    },

    handleShiftClick(timelineTabId) {
      // * Closing might take a little while, so let's change the title to indicate that.
      document.title = 'Closing...'

      setTimeout(
        //* here we need to close via the API
        // * using `this.closeTabById` silently fails.
        () => chrome.tabs.remove(timelineTabId),
        NEW_TAB_IMMEDIATE_CLOSE_DELAY_MS
      )
    },

    handlShiftAndAltClick(timelineTabId) {
      // * Closing might take a little while, so let's change the title to indicate that.
      document.title = 'Closing...'

      setTimeout(
        //* here we need to close via the API
        // * using `this.closeTabById` silently fails.
        () => chrome.tabs.remove(timelineTabId),
        NEW_TAB_IMMEDIATE_CLOSE_DELAY_MS
      )
    },

    handleControlAndShiftClick(timelineTabId) {
      // * Closing might take a little while, so let's change the title to indicate that.
      document.title = 'Closing...'

      setTimeout(
        () => chrome.tabs.remove(timelineTabId),
        // ! closes immediately (once called from the event loop)
        NEW_TAB_IMMEDIATE_CLOSE_DELAY_MS
      )
    },

    /*
      tabUrlClickEvent (tabDetails) {
        this.testIfOpenedUnsuspendAndFocusTab(tabDetails)
        this.sendMessage({ command: 'tracking.add.event', eventName: 'collectionTabUrlClicked', eventProps: { clusterType: this.clusterType } })
      },
      */
    tabXButtonClickEvent(tabDetails) {
      console.log('tabXButtonClickEvent', tabDetails)

      if (this.clusterType === 'opened') {
        this.closeTab(tabDetails)
      } else {
        // if we are clicking on last valid tab
        if (
          this.cluster.tabs.filter((tab) => Library.isValidTab(tab)).length ===
          1
        ) {
          const decisionAboutDeletingLast = confirm(
            'Removing the last tab will also delete this session.'
          )

          if (decisionAboutDeletingLast === true) {
            this.clusterDelete()
          } else {
            // we just close the confirm button
          }
        } else {
          this.deleteTab(tabDetails)
        }
      }
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionTabXClicked',
        eventProps: {
          clusterType: this.clusterType
        }
      })
    },
    clusterScreenshotClickEvent() {
      this.toggleCollapse()
      const self = this
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionScreenshotClick',
        eventProps: {
          highlight: self.highlightMode
        }
      })
    },
    showAllClick() {
      this.toggleCollapse()
      const self = this
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionShowAllClick',
        eventProps: {
          highlight: self.highlightMode
        }
      })
    },
    collapseAndReturnToTimelineClick() {
      this.toggleCollapse()
      const self = this
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionCollapseAndReturnToTimelineClick',
        eventProps: {
          toggled: self.highlightMode
        }
      })
    },

    // events from tab - end

    // tab functions - start
    closeTab(tabDetails) {
      this.sendMessage({ command: 'tab.close', tabId: tabDetails.tabId })
    },

    /**
     * Variation on the `closeTab` method which allows closing any tab
     * by providing its ID.
     * @param {chrome.tabs.Tab} tabId
     */
    closeTabById(tabId) {
      this.sendMessage({ command: 'tab.close', tabId })
    },

    deleteTab(tabDetails) {
      // we are communicating directly with background.js (for simplicity reasons)
      const message = {
        command: 'tabs.delete',
        clusterUid: this.cluster._uid,
        tabUidArray: [tabDetails.tabUid]
      }
      this.sendMessage(message)
    },
    // tab functions - end

    // unsuspendTab (tabDetails) {
    //   return new Promise((resolve, reject) => {
    //     chrome.tabs.update(tabDetails.tabId,
    //       {
    //         url: tabDetails.url
    //       }, function (x) {
    //         resolve()
    //       }
    //     )
    //   })
    // },

    // cluster functions - start
    // export - start
    clusterDropdownOpen(type = 'export') {
      this.clusterDropdownMenuReposition(0, [type])
      if (this[type + 'Opened'] === false) {
        // open exportMenu
        this.$refs[type + 'Menu'].style.height = this[type + 'DropdownHeight'] // change this if you change elements in "cluster_component--export_menu"
        this[type + 'Opened'] = true

        // close all others
        const others = this.dropdownTypes.filter((x) => x !== type)
        others.forEach((x) => {
          this.clusterExportClose(x)
        })
      } else {
        this.clusterExportClose(type)
      }
    },
    clusterDropdownMenuReposition(addHeight = 0, typeArray = []) {
      if (typeArray.length === 0) {
        typeArray = this.dropdownTypes // all dropdown types
      }

      const self = this
      typeArray.forEach((theType) => {
        const typeButtonPosition = self.getPosition(theType + 'Button')
        const typeMenu = self.$refs[theType + 'Menu']
        console.log('typeMenu 1', typeMenu)
        if (typeMenu !== undefined) {
          typeMenu.style.top =
            typeButtonPosition.top +
            typeButtonPosition.height +
            addHeight +
            'px'
          typeMenu.style.right =
            typeButtonPosition.right -
            Math.abs(
              typeMenu.getBoundingClientRect().width - typeButtonPosition.width
            ) +
            'px'
        } else {
          console.warn(
            'Cannot get exportMenu in clusterDropdownMenuReposition()'
          )
        }
      })
    },
    clusterExportClose(type = 'export') {
      this[type + 'Opened'] = false
      this.$refs[type + 'Menu'].style.height = '0px'
    },
    // export - end
    getPosition(refName) {
      // get position of the refname to the "ClusterComponentContent"
      const parentPos =
        this.$refs.ClusterComponentContent.getBoundingClientRect() // this is the parent
      console.log('typeMenu 2', refName, parentPos)

      const childPos = this.$refs[refName].getBoundingClientRect()
      console.log('typeMenu 3', refName, childPos)

      const relativePos = {}

      relativePos.top = childPos.top - parentPos.top
      relativePos.right = parentPos.right - childPos.right
      relativePos.bottom = childPos.bottom - parentPos.bottom
      relativePos.left = childPos.left - parentPos.left
      relativePos.width = childPos.width
      relativePos.height = childPos.height

      return relativePos
    },
    async clusterReopen() {
      this.$emit('clusterReopen', {
        clusterUid: this.cluster._uid,
        source: 'collection'
      })
    },
    clusterDelete() {
      const self = this

      const clusterDetails = { clusterUid: this.cluster._uid } // type is only used to delete from archive

      if (Object.prototype.hasOwnProperty.call(this.cluster, 'archiveType')) {
        clusterDetails.archiveType = this.cluster.archiveType
      }

      let title = Library.getClusterTitle(this.cluster)
      if (title.length > 23) {
        title = title.substr(0, 20) + '...'
      }

      self.$emit('clusterDelete', clusterDetails)

      // only undo for saved clusters!
      if (this.clusterType == 'saved') {
        this.$toasted.show(`<div>${title} session deleted</div>`, {
          duration: TOAST_UNDO_DURATION,
          onComplete: function () {
            // oncomplete is not called if undo is clicked
          },
          className: 'toasted-type-warning',
          action: [
            {
              text: 'UNDO',
              onClick: (e, toastObject) => {
                // V1
                // self.$emit('clusterUndeleteUndo', clusterDetails)

                // V2
                self.sendMessage({
                  command: 'cluster.undelete-undo',
                  clusterUid: clusterDetails.clusterUid
                })

                toastObject.goAway(0)
              }
            },
            {
              text: '',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }
          ]
        })
      }
    },
    clusterUndelete() {
      const clusterDetails = { clusterUid: this.cluster._uid }
      this.$emit('clusterUndelete', clusterDetails)
    },
    clusterRestoreFromArchive() {
      const clusterDetails = { clusterUid: this.cluster._uid }
      if (Object.prototype.hasOwnProperty.call(this.cluster, 'archiveType')) {
        clusterDetails.archiveType = this.cluster.archiveType
      }
      this.$emit('clusterRestoreFromArchive', clusterDetails)
    },
    clusterAddFavourite() {
      this.localClusterFavourite = true
      this.$emit('clusterAddFavourite', this.cluster._uid) // sending to parent
    },
    clusterRemoveFavourite() {
      this.localClusterFavourite = false
      this.$emit('clusterRemoveFavourite', this.cluster._uid) // sending to parent
    },
    // duplicated code - start
    linksAsText() {
      let body = ''

      const allTabs = this.allFilteredValidTabs

      // longest text
      let longestText = 0
      allTabs.forEach(function (tab) {
        if (
          Object.prototype.hasOwnProperty.call(tab, 'title') &&
          tab.title.length > longestText
        ) {
          longestText = tab.title.length
        }
        /*
          if (Object.prototype.hasOwnProperty.call(tab, 'note') && tab.note.length > longestText) {
            longestText = tab.note.length
          }
          */
      })

      allTabs.forEach(function (tab) {
        body += tab.title
        // mising spaces to the longest text
        for (let i = 0; i < longestText - tab.title.length; i++) {
          body += ' '
        }
        body += '\t\t\t' // three tabs
        body += tab.url
        body += '\t\t\t' // three tabs
        body += Object.prototype.hasOwnProperty.call(tab, 'note')
          ? tab.note
          : ''
        body += '\r\n' // new line
      })

      return body
    },
    linksAsTextMail() {
      let body = ''

      const allTabs = this.allFilteredValidTabs

      allTabs.forEach(function (tab) {
        body += tab.title + '\r\n' // new line
        body += tab.url + '\r\n' // new line
        if (
          Object.prototype.hasOwnProperty.call(tab, 'note') &&
          tab.note.trim() !== ''
        ) {
          body += 'Notes: ' + tab.note + '\r\n' // new line
        }
        body += '\r\n'
      })

      body += '\r\n\r\nGenerated with Tablerone.app'

      return body
    },
    mailtoString() {
      const subject = 'Tablerone - sharing ' + this.cluster.title
      const body = this.linksAsTextMail()
      const mailtoString =
        'mailto:?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body)
      return mailtoString
    },
    shareEmail() {
      const self = this
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionEmail',
        eventProps: {
          tabs: self.allFilteredValidTabs.length
        }
      })

      // window.open(this.mailtoString());
      const newlink = document.createElement('a')
      newlink.setAttribute('href', this.mailtoString())
      newlink.setAttribute('target', '_new') // if you have gmail as default, this should be done like this
      newlink.click()
      document.removeChild(newlink)

      return true
    },
    async collectionShareSave(event) {
      const self = this
      self.$emit('clusterShare', {
        title: self.localClusterTitle,
        clusterUid: self.cluster._uid
      }) // sending to parent
      return true
    },
    collectionExportToFinal(params) {
      /*
         source = tablerone => all collections
        source = collection => only one collection

        targetFormat = "text", "excel", "csv", "json", "tablerone"
        targetType = "file", "clipboard"
       */

      // problem - you could trigger the event by clicking "button span", not "button" ... so event.target could be "button span"
      /*
        if (targetType === 'clipboard') {
          let button = event.target.closest('button')
          button.setAttribute('data-success', 'true')
          setTimeout(function () {
            button.removeAttribute('data-success')
          }, 500)
        }
        */

      const event = params.event
      const targetFormat = params.targetFormat
      const targetType = params.targetType
      const targetSubFormat = params.targetSubFormat || ''
      const includeScreenshots = params.includeScreenshots || false

      const message = {
        command: 'export.collection',
        clusterUid: this.cluster._uid,
        targetFormat,
        targetSubFormat,
        targetType,
        includeScreenshots
      }

      const self = this

      const selectedLiElement = event.target.closest('li')
      selectedLiElement.classList.add(
        'cluster_component--export_menu-export_loading'
      )

      this.sendMessage(message, function (responseObject) {
        // if (responseObject.targetType === 'clipboard') {
        Library.copyToClipboard(responseObject.result)
        selectedLiElement.classList.remove(
          'cluster_component--export_menu-export_loading'
        )
        selectedLiElement.classList.add(
          'cluster_component--export_menu-export_successful'
        )
        setTimeout(function () {
          self.clusterExportClose()
          selectedLiElement.classList.remove(
            'cluster_component--export_menu-export_successful'
          )
        }, 1600)
        // }
      })

      return true
    },
    // duplicated code - end
    toggleCollapse() {
      const self = this
      // send proper action to app
      if (this.highlightMode) {
        self.$emit('highlightAction', null) // sending to parent

        // TODO: check if you can disable editTabsMode here
        self.uncheckAllTabs()
      } else {
        self.$emit('highlightAction', self.cluster._uid) // sending to parent
      }
    },
    checkAllTabs() {
      this.checkedTabs = this.cluster.tabs.map((tab) => tab._uid)
    },
    uncheckAllTabs() {
      this.checkedTabs = []
    },
    onTabCheckboxChangeFunction(data) {
      const tabUid = data.tabUid
      const value = data.value

      console.log(
        'onTabCheckboxChangeFunction',
        tabUid,
        value,
        this.highlightMode
      )

      // if it is not highlighted, it should be
      if (this.highlightMode !== true) {
        console.log('onTabCheckboxChangeFunction - false')

        // TODO: fix this
        // if I uncomment this, click on checkbox, and click outside of cluster => we get into somekind of loop
        // this.toggleCollapse()
      }

      // if we have shift pressed, we have to check
      const lastItemChange = this.checkedTabs[this.checkedTabs.length - 1]
      if (this.isShift && value === true) {
        // we get current and last items indexes
        // if shift is pressed, select also other
        let currentItemIndex = -1
        let lastItemIndex = -1
        for (let i = 0; i < this.cluster.tabs.length; i++) {
          const tab = this.cluster.tabs[i]

          if (tab._uid === lastItemChange) {
            lastItemIndex = i
          }
          if (tab._uid === tabUid) {
            currentItemIndex = i
          }
        }

        // what if this is not the case
        if (currentItemIndex >= 0 && lastItemIndex >= 0) {
          const start = Math.min(currentItemIndex, lastItemIndex)
          const end = Math.max(currentItemIndex, lastItemIndex)

          const newCheckedTabs = this.cluster.tabs
            .map((tab) => tab._uid)
            .slice(start, end + 1) // extract only _uids and slice from start to end
          const unionOfUniqueCheckedTabs = Library.unionOfArrays(
            this.checkedTabs,
            newCheckedTabs
          ) // union them
          this.checkedTabs = unionOfUniqueCheckedTabs
        } else {
          // we push it normally
          this.processCheckboxChangeFunction(tabUid, value)
        }
        // } else if (this.isShift && value === false) { ////TODO: for unchecking
      } else {
        // we push it normally
        this.processCheckboxChangeFunction(tabUid, value)
      }
    },
    processCheckboxChangeFunction(tabUid, value) {
      if (value === true) {
        this.checkedTabs.push(tabUid)
      } else {
        this.checkedTabs = this.checkedTabs.filter(
          (arrayItem) => arrayItem !== tabUid
        )
      }
    },
    openSelectedTabs() {
      // we are communicating directly with background.js (for simplicity reasons)
      const message = {
        command: 'tabs.open',
        clusterUid: this.cluster._uid,
        tabUidArray: this.checkedTabs
      }
      this.sendMessage(message)

      this.uncheckAllTabs()
      this.moveOrCopySelectedMode = false
      this.disableEditTabsMode()
    },

    deleteSelectedTabs() {
      // we are communicating directly with background.js (for simplicity reasons)
      const message = {
        command: 'tabs.delete',
        clusterUid: this.cluster._uid,
        tabUidArray: this.checkedTabs
      }
      this.sendMessage(message)

      const trackingMessage = {
        command: 'tracking.add.event',
        eventName: 'collectionTabDeleteMultiple',
        eventProps: {
          number: this.checkedTabs ? this.checkedTabs.length : 0
        }
      }
      this.sendMessage(trackingMessage)

      // reseting
      this.uncheckAllTabs()
      this.moveOrCopySelectedMode = false
      this.disableEditTabsMode()
    },

    closeSelectedTabs() {
      const tabIdArray = []
      for (let i = 0; i < this.cluster.tabs.length; i++) {
        const tab = this.cluster.tabs[i]
        if (this.checkedTabs.includes(tab._uid)) {
          tabIdArray.push(tab.id)
        }
      }

      const message = {
        command: 'tabs.close',
        // clusterUid: this.cluster._uid,
        // tabUidArray: this.checkedTabs
        tabIdArray
      }

      // console.log('tabs.close', message)

      this.sendMessage(message)
      this.uncheckAllTabs()
      this.moveOrCopySelectedMode = false // TODO < is this neccessary
      this.disableEditTabsMode()
    },

    moveSelected(targetClusterUid) {
      targetClusterUid = parseInt(targetClusterUid) // from select we get a string

      const message = {
        command: 'tabs.move',
        sourceClusterUid: this.cluster._uid,
        tabUidArray: this.checkedTabs,
        targetClusterUid // this.selectedClusterUid
      }
      console.log('MOVE SELECTED', message)
      this.sendMessage(message, function (response) {
        // TODO: later maybe when we confirm if we are moving all tabs in source cluster (now we just delete it)
      })

      const eventProps = {
        tabs: this.checkedTabs.length
      }
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionMoveSelectedTabs',
        eventProps
      })

      const clusterTitle = this.getClusterTitleFromClusterUid(targetClusterUid)

      const s = this.checkedTabs.length > 1 ? 's' : ''
      this.$toasted.show(
        `<div>${this.checkedTabs.length} tab${s} moved to <span class="highlight_cluster_action" data-clusterUid="${targetClusterUid}">${clusterTitle}</span></div>`,
        {
          // TODO: moved to where (cluster title)
          duration: TOAST_UNDO_DURATION,
          onComplete: function () {
            // oncomplete is not called if undo is clicked
            // self.$emit('clusterDelete', clusterDetails)
          },
          className: 'toasted-type-success',
          action: [
            /*
                {
                    text: 'UNDO',
                    onClick: (e, toastObject) => {
                        self.hideBeforeDelete = false
                        //alert('Undo deleting' + self.hideBeforeDelete)
                        toastObject.goAway(0)
                    }
                },
              */
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

      this.uncheckAllTabs()
      this.moveOrCopySelectedMode = false
      this.disableEditTabsMode()
    },
    copySelected(targetClusterUid) {
      targetClusterUid = parseInt(targetClusterUid) // from select we get a string

      const message = {
        command: 'tabs.copy',
        sourceClusterUid: this.cluster._uid,
        tabUidArray: this.checkedTabs,
        targetClusterUid // this.selectedClusterUid
      }

      console.log('COPY SELECTED', message)
      this.sendMessage(message)

      const eventProps = {
        tabs: this.checkedTabs.length
      }
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionCopySelectedTabs',
        eventProps
      })

      const clusterTitle = this.getClusterTitleFromClusterUid(targetClusterUid)

      const s = this.checkedTabs.length > 1 ? 's' : ''
      this.$toasted.show(
        `<div>${this.checkedTabs.length} tab${s} copied to <span class="highlight_cluster_action" data-clusterUid="${targetClusterUid}">${clusterTitle}</span></div>`,
        {
          duration: TOAST_UNDO_DURATION,
          onComplete: function () {
            // oncomplete is not called if undo is clicked
            // self.$emit('clusterDelete', clusterDetails)
          },
          className: 'toasted-type-success',
          action: [
            /*
                {
                    text: 'UNDO',
                    onClick: (e, toastObject) => {
                        self.hideBeforeDelete = false
                        //alert('Undo deleting' + self.hideBeforeDelete)
                        toastObject.goAway(0)
                    }
                },
              */
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

      this.uncheckAllTabs()
      this.moveOrCopySelectedMode = false
      this.disableEditTabsMode()
    },
    copySelectedToNewCluster(newClusterName) {
      const message = {
        command: 'tabs.copy-to-new-cluster',
        sourceClusterUid: this.cluster._uid,
        tabUidArray: this.checkedTabs,
        newClusterName:
          newClusterName !== '' ? newClusterName : 'New cluster (via copy tabs)' // this.selectedClusterUid
      }
      this.sendMessage(message)

      const eventProps = {
        tabs: this.checkedTabs.length
      }
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionCopySelectedTabsToNewCollection',
        eventProps
      })

      // TODO: get new collection Uid and add link (like copy and move)

      const s = this.checkedTabs.length > 1 ? 's' : ''
      this.$toasted.show(
        `<div>${this.checkedTabs.length} tab${s} copied to new collection "${newClusterName}"</div>`,
        {
          duration: TOAST_UNDO_DURATION,
          onComplete: function () {
            // oncomplete is not called if undo is clicked
            // self.$emit('clusterDelete', clusterDetails)
          },
          className: 'toasted-type-success',
          action: [
            /*
                {
                    text: 'UNDO',
                    onClick: (e, toastObject) => {
                        self.hideBeforeDelete = false
                        //alert('Undo deleting' + self.hideBeforeDelete)
                        toastObject.goAway(0)
                    }
                },
              */
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

      this.uncheckAllTabs()
      this.moveOrCopySelectedMode = false
      this.disableEditTabsMode()
    },
    moveSelectedToNewCluster(newClusterName) {
      const message = {
        command: 'tabs.move-to-new-cluster',
        sourceClusterUid: this.cluster._uid,
        tabUidArray: this.checkedTabs,
        newClusterName:
          newClusterName !== '' ? newClusterName : 'New cluster (via move tabs)' // this.selectedClusterUid
      }
      this.sendMessage(message)

      const eventProps = {
        tabs: this.checkedTabs.length
      }
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'collectionMoveSelectedTabsToNewCollection',
        eventProps
      })

      // TODO: get new collection Uid and add link (like copy and move)

      const s = this.checkedTabs.length > 1 ? 's' : ''
      this.$toasted.show(
        `<div>${this.checkedTabs.length} tab${s} moved to new collection "${newClusterName}"</div>`,
        {
          duration: TOAST_UNDO_DURATION,
          onComplete: function () {
            // oncomplete is not called if undo is clicked
            // self.$emit('clusterDelete', clusterDetails)
          },
          className: 'toasted-type-success',
          action: [
            /*
                {
                    text: 'UNDO',
                    onClick: (e, toastObject) => {
                        self.hideBeforeDelete = false
                        //alert('Undo deleting' + self.hideBeforeDelete)
                        toastObject.goAway(0)
                    }
                },
              */
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

      this.uncheckAllTabs()
      this.moveOrCopySelectedMode = false
      this.disableEditTabsMode()
    },
    shareSelected() {
      alert('not implemented yet')
      this.moveOrCopySelectedMode = false
    },
    // cluster functions - end

    sendMessage(message, callback) {
      // for sending message to background.js
      // message.sourceWindowId = this.thisWindowId //always add windowId for identification (this is probably not used anywhere - test)
      message.messageSenderSource = 'cluster'

      console.log('senMessage called from cluster', message)

      try {
        chrome.runtime.sendMessage(
          null,
          message,
          callback !== undefined && callback !== null
            ? callback
            : function (x) {
                console.log(
                  'sendMessage called, message and response are: ',
                  message,
                  x
                )
                void chrome.runtime.lastError
              }
        ) // for external messages params look like (extId, message, callback)
      } catch (e) {
        console.log('wtf?', e.toString())
      }
    },
    libraryIsTabSuspendedOrDiscarded(tab) {
      return Library.isTabSuspendedOrDiscarded(tab)
    },
    isTabTransparent(tab) {
      const self = this
      if (this.clusterProvide.searchQuery.trim() === '') {
        return false
      } else {
        if (Object.prototype.hasOwnProperty.call(tab, 'title')) {
          if (
            tab.title
              .toLowerCase()
              .search(self.clusterProvide.searchQuery.toLowerCase()) !== -1
          ) {
            return false
          }
        }
        if (Object.prototype.hasOwnProperty.call(tab, 'url')) {
          if (
            tab.url
              .toLowerCase()
              .search(self.clusterProvide.searchQuery.toLowerCase()) !== -1
          ) {
            return false
          }
        }
        if (Object.prototype.hasOwnProperty.call(tab, 'note')) {
          if (
            tab.note
              .toLowerCase()
              .search(self.clusterProvide.searchQuery.toLowerCase()) !== -1
          ) {
            return false
          }
        }
      }
      return true
    },
    disableEditTabsMode() {
      this.uncheckAllTabs()
      this.disableSelectedMode()
      /*
        //trigger change of selectAllCheckbox variable
        this.selectAllCheckbox = true //this is only put to true initially so we can change to false (change needs to be there)
        this.$nextTick(() => {
          this.selectAllCheckbox = false //shortcut to deselect all and everything is back to normal
          this.disableSelectedMode()
        })
        */
    },
    toggleSelectedMode(actionAfterSelectedCollection = '') {
      this.actionAfterSelectedCollection = actionAfterSelectedCollection
      if (this.moveOrCopySelectedMode === false) {
        this.enableSelectedMode()
      } else {
        this.disableSelectedMode()
      }
    },
    clickOnSelectElementsEventListenerFunction() {
      // something clears this field before it can
      const inputFieldValue =
        this.$refs['v-select--container'].getElementsByClassName(
          'vs__search'
        )[0].value
      if (this.moveOrCopySelectedMode === true) {
        this.moveSelectedToNewCluster(inputFieldValue)
      } else {
        this.copySelectedToNewCluster(inputFieldValue)
      }
    },
    enableSelectedMode() {
      this.moveOrCopySelectedMode = true
      this.clusterExportClose()

      const self = this

      this.$nextTick(() => {
        const container = self.$refs['v-select--container']
        const inputField = container.getElementsByClassName('vs__search')[0]

        // put focus on the input element
        inputField.focus()

        // add onclick on actions ("Create +") but check if it exists before
        const createButtonList = container.getElementsByClassName('vs__actions')
        if (createButtonList.length > 0) {
          createButtonList[0].addEventListener(
            'click',
            self.clickOnSelectElementsEventListenerFunction
          )
        }
      })
    },
    disableSelectedMode() {
      this.moveOrCopySelectedMode = false

      // remove onclick on actions ("Create") but check if it exists before
      // WARNING: it gets removed earlier and we cannot use code below! (so we commented out)
      /*
        let createButtonList = self.$refs['v-select--container'].getElementsByClassName('vs__actions')
        if (createButtonList.length > 0) {
            createButtonList[0].removeEventListener('click', this.clickOnSelectElementsEventListenerFunction)
        }
        */
    },
    vueSelectSearch(search, loading) {
      // hack: filter outside of vue-select so we "guess/know" there are no results
      const searchQuery = search.toLowerCase()

      if (searchQuery.trim() === '') {
        // if empty, do not show
        this.vueSelectDisplayCreate = false
        return true
      } else {
        for (
          let i = 0;
          i < this.clusterProvide.filteredSavedClustersToSelect.length;
          i++
        ) {
          const cluster = this.clusterProvide.filteredSavedClustersToSelect[i]
          if (cluster.title.toLowerCase().search(searchQuery) !== -1) {
            this.vueSelectDisplayCreate = false
            return true
          }
        }
        this.vueSelectDisplayCreate = true
        return true
      }
    },
    onSelectedClusterUid(targetClusterUid) {
      // old scenario: action depends on this.clusterType
      // == opened => copySelected
      // == !opened => moveSelected

      // new scenario: action depends on what button we clicked

      if (this.actionAfterSelectedCollection === 'move') {
        this.moveSelected(targetClusterUid)
      } else {
        this.copySelected(targetClusterUid)
      }
      this.disableSelectedMode()
    },
    updateUIState() {
      const self = this
      if (this.isThisClusterInActiveMode) {
        // this should be as soon as possible
        this.$store.dispatch('updateActiveCluster', this.cluster._uid)
      } else {
        // this is with delay, because otherwise we first detect this and then press of Escape
        setTimeout(function () {
          self.$store.dispatch('updateActiveCluster', null)
        }, 100)
      }
    },
    initListeners: function () {
      const self = this
      chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
          // console.log('onMessage SettingsManager', request)
          switch (request.command) {
            // if there is new screenshot in the database (sent by background.js
            // we test and update default screenshot
            case 'screenshot.new.notification-only':
              // V1
              // self.setDefaultScreenshot()

              // V2
              const url = request.url
              if (self.dummyScreenshot === true) {
                const firstTabUrl = self.cluster.tabs[0].url
                if (url === firstTabUrl) {
                  self.setDefaultScreenshot()
                }
              }

              sendResponse({ status: 'ok' })
              return true
          }
        }
      )
    }
  },
  computed: {
    ...mapState({
      highlightedClusterUid: (state) => state.uistate.highlightedClusterUid,
      isShift: (state) => state.keys.shift
    }),
    allActiveModes() {
      return [
        this.editTagMode,
        // this.editTabsMode, //we will not use it because if we check tabs in two clusters two can be active in the same time
        this.editTitleMode,
        this.moveOrCopySelectedMode
      ]
    },
    isThisClusterInActiveMode() {
      // this counts true in an array
      return this.allActiveModes.filter(Boolean).length > 0
    },
    // is any dropdown opened
    anyDropdownOpened() {
      const self = this
      for (let i = 0; i < this.dropdownTypes.length; i++) {
        const selfElement = self[self.dropdownTypes[i] + 'Opened']
        if (selfElement === true) {
          return true
        }
      }
      return false
    },
    /**
     * Do not show this one
     */
    clustersForSelectWithoutThis() {
      // const self = this
      return this.clusterProvide.filteredSavedClustersToSelect.filter(
        (cluster) => {
          if (cluster._uid === this.cluster._uid) {
            return false
          } else {
            return true
          }
        }
      )
    },
    highlightMode() {
      // return (this.clusterProvide.highlightedClusterComponentClusterUid === this.cluster._uid)
      return this.highlightedClusterUid === this.cluster._uid
    },
    filteredTagItems() {
      // we first filter
      const filteredTags = this.clusterProvide.tagsForSelect.filter((i) => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1
      })

      // then we sort by length (good enough indicator for match)

      const sortedTags = filteredTags.sort((a, b) => {
        return a.text.length - b.text.length
      })

      return sortedTags
    },
    showingMoreThanMaxTabs() {
      return this.filteredTabs.length > 5
    },
    showAllTabs() {
      if (this.highlightMode === true) {
        return true
      }

      if (this.searchMode === true) {
        return true
      }

      // if is this window and we are not in tablerone as new page
      if (this.isThisWindowCluster === true) {
        return true
      }

      return false
    },
    filteredTabs() {
      const filteredTabs = this.allFilteredValidTabs

      if (this.showAllTabs === true) {
        return filteredTabs
      }

      return filteredTabs.slice(0, 5)
    },
    allFilteredValidTabs() {
      return this.cluster.tabs.filter((tab) => Library.isValidTab(tab))
    },
    searchMode() {
      // V1 - if we search tagged + string
      // return (this.searchTags.length !== 0 || this.searchQuery.trim() !== '')

      // V2 - only if we search by string
      return this.clusterProvide.searchQuery.trim() !== ''
    },
    isThisWindowCluster() {
      // console.log("isThisWindowCluster: " + this.cluster.windowId + " === " + this.clusterProvide.thisWindowId)
      if (
        Object.prototype.hasOwnProperty.call(this.cluster, 'windowId') &&
        this.cluster.windowId === this.clusterProvide.thisWindowId
      ) {
        return true
      } else {
        return false
      }
    },
    allOrIfSelectedOnlySelectedTabs() {
      const self = this
      if (this.checkedTabs.length === 0) {
        return this.cluster.tabs
      } else {
        return this.cluster.tabs.filter((x) => {
          return self.checkedTabs.includes(x._uid)
        })
      }
    },
    isLoadingCluster() {
      return this.clusterProvide.loadingClusterUid === this.cluster._uid
    },
    showDummy() {
      // (
      // if it is loading => always show dummy
      // or
      // if it is set as always active (this.showOnlyOnObserveSettingProp - active opened windows), linked with is observed
      // )
      // and
      // ignore everything if it is in interaction (with different modes inside cluster)
      return (
        (this.isLoadingCluster ||
          (this.showOnlyOnObserveSettingProp === true &&
            this.isObserved === false)) &&
        !this.isInInteraction
      )
    },
    isInInteraction() {
      return (
        this.exportOpened ||
        this.editTagMode ||
        this.editTitleMode ||
        this.moveOrCopySelectedMode ||
        this.editTabsMode ||
        this.searchMode
      )
    },
    selectAllCheckbox() {
      return this.checkedTabs.length === this.cluster.tabs.length
    },
    selectAllCheckboxIndeterminate() {
      if (
        this.checkedTabs.length === this.cluster.tabs.length ||
        this.checkedTabs.length === 0
      ) {
        return false
      } else {
        return true
      }
    },
    // this is the best way to bind a checkbox to a value
    selectAllCheckboxLocal: {
      // we get computed value for value
      get: function () {
        return this.selectAllCheckbox
      },
      // this is basically a method triggered onchange of checkbox (conceptually kind of weird)
      set: function (newValue) {
        // newValue should not be used => otherwise we probably come into a loop
        if (newValue) {
          // this.checkedTabs.length > parseInt(this.cluster.tabs.length/2)) { //if more than half are checked => uncheck
          this.checkAllTabs()
        } else {
          this.uncheckAllTabs()
        }
      }
    },
    editTabsMode() {
      return this.checkedTabs.length > 0
    }
  },
  watch: {
    isThisClusterInActiveMode: {
      handler(newValue) {
        this.updateUIState()
      }
    },
    highlightMode: {
      immediate: false,
      handler(newValue) {
        // on change we need to manually reposition the dropdown menus
        const self = this
        if (newValue === false) {
          // self.clusterDropdownMenuReposition(-28) //reposition reopen (from true to false => deduct)
          self.disableEditTabsMode()
          self.clusterExportClose()
        } else {
          self.$nextTick(() => {
            // self.clusterDropdownMenuReposition(28) //reposition reopen (from false to true => add)
          })
        }
      }
    },
    editTabsMode: {
      handler(newValue) {
        if (newValue === true) {
          // if we go into this mode, hide export menu
          this.clusterExportClose()
        }
      }
    },
    cluster: {
      // when new cluster is put inside, refresh title
      deep: true,
      immediate: true,
      handler(newObject) {
        // update title
        if (
          !Object.prototype.hasOwnProperty.call(newObject, 'title') ||
          newObject.title.trim() === ''
        ) {
          this.localClusterTitle = Library.guessTitle(this.cluster.tabs)
        } else {
          this.localClusterTitle = newObject.title
        }

        // update favourites
        this.localClusterFavourite =
          Library.getFavouriteValueFromCluster(newObject)

        // update tags
        this.localClusterTags = Library.getTagsArrayFromCluster(newObject)
        this.localTags = this.localClusterTags.map((x) => {
          return { text: x }
        })
      }
    }
  }
}
</script>

<style></style>
