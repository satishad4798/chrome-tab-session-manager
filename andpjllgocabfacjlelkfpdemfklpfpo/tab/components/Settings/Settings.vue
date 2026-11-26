<template>
  <div id="settings--container">
    <div id="version">
      <a :href="TABLERONE_URL_PARTICULAR_RELEASE_NOTE" target="_blank">{{ version }}</a>
    </div>
    <!-- main window of settings -->
    <div id="settings--main" v-if="importMode === false">
      <div @click.stop="discardChanges()" id="settings--main--close" class="button--main button-settings-close">
        <span class="button--main--tooltip button--main--tooltip__to_left">Close settings</span>
        <!--                <img src="/icons/ui/times.svg">-->
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5.5l-14 14m14 0L.5.5" stroke="#000" fill="none" fill-rule="evenodd" stroke-linecap="square" />
        </svg>
      </div>
      <div class="settings--content">
        <h1>
          <!--                    <img src="/icons/ui/logo-tablerone.svg">-->
          <svg width="158" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.984 14.589V2.309H1.12a1.001 1.001 0 01-1.012-.99C.108.746.568.286 1.12.286h10.004c.552 0 1.034.46 1.034 1.035 0 .551-.482.988-1.034.988h-3.84v12.28c0 .622-.53 1.15-1.15 1.15-.645 0-1.15-.528-1.15-1.15m39.95-.989c1.61 0 2.576-.92 2.576-2.415 0-1.265-.874-2.368-2.576-2.368h-4.576V13.6h4.576zm-.115-6.807c1.541 0 2.392-.966 2.392-2.23 0-1.266-.85-2.255-2.392-2.255h-4.461v4.485h4.461zm-6.761 7.612V1.504c0-.782.437-1.22 1.242-1.22h5.956c2.737 0 4.323 1.68 4.323 3.91 0 1.932-1.264 3.22-2.667 3.519 1.632.253 2.966 1.908 2.966 3.771 0 2.415-1.61 4.14-4.438 4.14H39.3c-.805 0-1.242-.437-1.242-1.22zm18.453 0V1.32c0-.621.529-1.15 1.173-1.15.62 0 1.127.529 1.127 1.15V13.6h6.048c.552 0 1.035.437 1.035.989 0 .575-.483 1.035-1.035 1.035h-7.106c-.805 0-1.242-.437-1.242-1.22m14.972.001V1.504c0-.782.437-1.22 1.242-1.22h8.14c.553 0 1.036.46 1.036 1.036 0 .552-.483.988-1.035.988h-7.083v4.485h6.66c.553 0 1.035.437 1.035.989 0 .575-.482 1.035-1.034 1.035h-6.661V13.6h7.083c.552 0 1.035.437 1.035.989 0 .575-.483 1.035-1.035 1.035h-8.141c-.805 0-1.242-.437-1.242-1.22m19.48-6.714h3.863c1.656 0 2.851-1.081 2.851-2.691 0-1.61-1.195-2.69-2.851-2.69h-3.863v5.38zm9.129 6.99c0 .484-.437 1.059-1.08 1.059-.392 0-.76-.184-.967-.483l-3.84-5.543h-3.242v4.876c0 .62-.507 1.15-1.127 1.15-.645 0-1.173-.53-1.173-1.15V1.504c0-.782.437-1.22 1.242-1.22h5.22c2.92 0 4.921 1.886 4.921 4.715 0 2.576-1.61 4.048-3.426 4.416l3.242 4.553c.138.16.23.345.23.713zm13.156-12.601c-3.29 0-5.359 2.506-5.359 5.887 0 3.357 2.07 5.887 5.359 5.887 3.242 0 5.358-2.53 5.358-5.887 0-3.38-2.116-5.887-5.358-5.887m0-2.047c4.576 0 7.727 3.38 7.727 7.934 0 4.553-3.151 7.933-7.727 7.933-4.577 0-7.727-3.38-7.727-7.933 0-4.554 3.15-7.934 7.727-7.934m23.933 15.108l-8.14-11.29v10.739c0 .62-.507 1.15-1.128 1.15-.644 0-1.172-.53-1.172-1.15V1.688a1.516 1.516 0 012.737-.898l7.98 10.993V1.32c0-.621.505-1.15 1.126-1.15.644 0 1.173.529 1.173 1.15v12.993c0 .782-.644 1.426-1.426 1.426-.483 0-.897-.207-1.15-.598m9.504-.736V1.504c0-.782.438-1.22 1.242-1.22h8.141c.552 0 1.035.46 1.035 1.036 0 .552-.483.988-1.035.988h-7.083v4.485h6.661c.552 0 1.035.437 1.035.989 0 .575-.483 1.035-1.035 1.035h-6.66V13.6h7.082c.552 0 1.035.437 1.035.989 0 .575-.483 1.035-1.035 1.035h-8.14c-.805 0-1.243-.437-1.243-1.22M26.739 9.807h-5.141c-.65 0-1.318.176-1.88.585v-1.39a2.088 2.088 0 012.087-2.081h4.727c1.153 0 2.088.935 2.088 2.088v1.384c-.563-.41-1.231-.586-1.881-.586m-4.98-7.498h4.82c1.125 0 2.041.916 2.041 2.042v1.43c-.563-.41-1.231-.585-1.881-.585h-5.141c-.65 0-1.318.175-1.88.584V4.351c0-1.126.915-2.042 2.04-2.042m5.35-2.024H21.23c-2.005 0-3.636 1.81-3.636 3.816v10.527c0 .602.487 1.11 1.063 1.11h.026c.272-.006.53-.117.723-.31.2-.2.311-.465.311-.75v-1.065a2.088 2.088 0 012.088-2.08h4.727c1.153 0 2.088.934 2.088 2.087v1.059c0 .284.11.55.312.749.193.193.45.304.723.31h.025c.281 0 .548-.117.75-.331.2-.21.314-.494.314-.78V4.102c0-2.005-1.631-3.816-3.637-3.816"
              fill-rule="evenodd"
            />
          </svg>
        </h1>

        <div class="settings--section">
          <div class="hr">
            <svg class="hr--image" width="24" height="22" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21H3a2 2 0 01-2-2V1h8l3 4h11v14a2 2 0 01-2 2z"
                stroke="#000"
                stroke-linecap="square"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
            <div class="hr--title">Behaviour</div>
            <div class="hr--line"></div>
          </div>

          <table class="table">
            <tr
              :class="{
                highlight_mode_set_tablerone_as: settingsOpenHighlightSetTableroneAs
              }"
            >
              <td>
                <span style="position: relative; top: 41px"> Set Tablerone as: </span>
              </td>

              <td class="behavior-selection__button-container">
                <div class="toolbar_button behavior-selection__button-grid">
                  <img src="/icons/ui/settings/behavior_indexed@2x.png" class="behavior-selection__image" />

                  <div class="toolbar_button--content">
                    <div class="toolbar_button--content--top">
                      <span class="form-group">
                        <input
                          type="radio"
                          :id="PINNED_TAB_MODE"
                          name="tablerone-mode"
                          v-model="tableroneMode"
                          :value="PINNED_TAB_MODE"
                          autocomplete="off"
                          data-testid="behavior-mode-pinned-tab"
                        />
                        <label class="custom-control-label" :for="PINNED_TAB_MODE"> Index Tab </label>
                      </span>
                    </div>
                    <div class="toolbar_button--content--bottom addendum">
                      <span>Pinned first tab in every</span>
                      <span
                        >window —
                        <span class="key-combo">{{ keyboardShortcutFirstTab }}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="toolbar_button behavior-selection__button-grid">
                  <img src="/icons/ui/settings/behavior_new_tab@2x.png" class="behavior-selection__image" />

                  <div class="toolbar_button--content">
                    <div class="toolbar_button--content--top">
                      <span class="form-group">
                        <input
                          type="radio"
                          :id="NEW_TAB_MODE"
                          name="tablerone-mode"
                          v-model="tableroneMode"
                          :value="NEW_TAB_MODE"
                          autocomplete="off"
                          style="margin-left: 0; padding-left: 0"
                          data-testid="behavior-mode-new-tab"
                        />
                        <label class="custom-control-label" :for="NEW_TAB_MODE"> New Tab page </label>
                      </span>
                    </div>
                    <div class="toolbar_button--content--bottom addendum">
                      <span>Open a new tab to load</span>
                      <span>
                        Tablerone —
                        <span class="key-combo">{{ keyboardShortcutNewTab }}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="toolbar_button behavior-selection__button-grid">
                  <img src="/icons/ui/settings/behavior_hidden@2x.png" class="behavior-selection__image" />

                  <div class="toolbar_button--content">
                    <div class="toolbar_button--content--top">
                      <span class="form-group">
                        <input
                          type="radio"
                          :id="POPUP_ONLY_MODE"
                          name="tablerone-mode"
                          v-model="tableroneMode"
                          :value="POPUP_ONLY_MODE"
                          autocomplete="off"
                          style="margin-left: 0; padding-left: 0"
                          data-testid="behavior-mode-new-tab"
                        />
                        <label class="custom-control-label" :for="POPUP_ONLY_MODE"> Toolbar only </label>
                      </span>
                    </div>
                    <div class="toolbar_button--content--bottom addendum">
                      <span
                        >Use toolbar menu <span class="key-combo">{{ keyboardShortcutOpenPopup }}</span></span
                      >
                      <span>
                        and Open shortcut
                        <span class="key-combo">{{ keyboardShortcutOpenTimeline }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>

            <!-- Doing it manually as the current class & structure does not correspond to the needs. -->
            <tr style="height: 34px">
              <td style="padding: 0; height: 34px; margin-right: -1px">
                <div
                  class="hr--line"
                  style="
                    height: 1px;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                    width: 100%;
                    border-bottom: 1px solid var(--color-hr-grey);
                  "
                ></div>
              </td>
              <td class="hr" style="width: 100%; height: 34px; margin-left: -1px; margin-bottom: 0.5rem">
                <div class="hr--line" style="height: 1px; margin-top: 1rem; margin-bottom: 0; width: 100%"></div>
              </td>
            </tr>

            <tr v-if="localSettings.tableroneMode === PINNED_TAB_MODE">
              <td>Index tab:</td>
              <td>
                <input
                  id="autoCloseInput"
                  style="margin-left: 0"
                  type="checkbox"
                  name="autoClose"
                  ref="autoClose"
                  v-model="autoCloseUI"
                />
                <label for="autoCloseInput">Auto-close Index Tab after closing the last tab</label>
              </td>
            </tr>

            <tr>
              <td>Daily clean-up:</td>
              <td>
                <input
                  id="sleepEnabledInput"
                  style="margin-left: 0"
                  type="checkbox"
                  name="sleepEnabled"
                  ref="sleepEnabled"
                  v-model="sleepEnabledUI"
                />
                <label for="sleepEnabledInput">Autosave all tabs from the previous day at</label>
                <input
                  type="time"
                  name="sleepHour"
                  ref="sleepHour"
                  v-model="sleepHourUI"
                  class="small-input"
                  id="sleepEnabledInputField"
                  style="min-width: 76px; width: fit-content; margin-left: 8px"
                />
              </td>
            </tr>
            <tr
              :class="{
                highlight_mode: settingsOpenHighlightCloseTabsAfterSaving
              }"
            >
              <td>
                <div class="left">Manual clean-up:</div>
              </td>
              <td>
                <div class="right">
                  <input
                    id="closeTabsAndSaveInput"
                    style="margin-left: 0"
                    type="checkbox"
                    name="closeTabsAndSave"
                    ref="closeTabsAndSave"
                    v-model="closeTabsAndSaveUI"
                  />
                  <label for="closeTabsAndSaveInput">Close tabs after saving</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>Speedy loading:</td>
              <td>
                <input
                  id="openCollectionSuspendedInput"
                  style="margin-left: 0"
                  type="checkbox"
                  name="openCollectionSuspended"
                  ref="openCollectionSuspended"
                  v-model="openCollectionSuspendedUI"
                />
                <label for="openCollectionSuspendedInput">
                  Open sessions with &nbsp;
                  <input
                    id="suspendedTabsTabLimitInput"
                    type="number"
                    name="suspendedTabsTabLimit"
                    ref="suspendedTabsTabLimit"
                    v-model.lazy="suspendedTabsTabLimitUI"
                    class="small-input"
                    style="width: 32px"
                    min="1"
                    :disabled="!this.localSettings.openCollectionSuspended"
                  />
                  &nbsp; tabs or more hibernated
                </label>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top">Tab Nap:</td>
              <td style="flex-direction: column; align-items: flex-start">
                <div>
                  <input
                    id="tabNapEnabledInput"
                    style="margin-left: 0"
                    type="checkbox"
                    name="tabNapEnabled"
                    ref="tabNapEnabled"
                    v-model="tabNapEnabledUI"
                  />
                  <label for="tabNapEnabledInput"> Hibernate tabs when not in use </label>
                </div>

                <div style="gap: 8px; display: flex; align-content: center" v-if="this.localSettings.tabNapEnabled">
                  <div style="color: #8d8d8d; min-width: 50px">Unless:</div>
                  <div style="line-height: 16px; display: flex; align-items: center">
                    <input
                      id="tabNapSettingLimit"
                      type="number"
                      min="0"
                      style="width: 32px"
                      ref="tabNapSettingLimit"
                      v-model="tabNapSettingLimitUI"
                    />
                    &nbsp; Recently used
                  </div>
                  <div style="line-height: 16px; display: flex; align-items: center">
                    <input
                      type="checkbox"
                      id="tabNapSettingFocus"
                      ref="tabNapSettingFocus"
                      v-model="tabNapSettingFocusUI"
                      :disabled="!this.localSettings.tabNapEnabled"
                    />

                    <label for="tabNapSettingFocus"> In focus </label>
                  </div>

                  <div style="line-height: 16px; display: flex; align-items: center">
                    <input
                      type="checkbox"
                      id="tabNapSettingPinned"
                      ref="tabNapSettingPinned"
                      v-model="tabNapSettingPinnedUI"
                      :disabled="!this.localSettings.tabNapEnabled"
                    />

                    <label for="tabNapSettingPinned"> Pinned </label>
                  </div>

                  <div style="line-height: 16px; display: flex; align-items: center">
                    <input
                      type="checkbox"
                      id="tabNapSettingAV"
                      ref="tabNapSettingAV"
                      v-model="tabNapSettingAVUI"
                      :disabled="!this.localSettings.tabNapEnabled"
                    />

                    <label for="tabNapSettingAV"> Playing audio/video </label>
                  </div>

                  <div style="line-height: 16px; display: flex; align-items: center">
                    <input
                      type="checkbox"
                      id="tabNapSettingUnsavedForm"
                      ref="tabNapSettingUnsavedForm"
                      v-model="tabNapSettingUnsavedFormUI"
                      :disabled="!this.localSettings.tabNapEnabled"
                    />

                    <label for="tabNapSettingUnsavedForm"> Unsaved form </label>
                  </div>
                </div>

                <div style="display: flex; gap: 8px; width: 100%" v-if="this.localSettings.tabNapEnabled">
                  <div style="line-height: 12px; min-width: 50px; color: #8d8d8d">Never:</div>

                  <textarea
                    style="width: 100%; font-size: 12px; border-radius: 4px; height: 64px"
                    placeholder="https://domain.com - Any URLs for this domain
https://domain.com/category/specific-page - This URL
https://domain.*/page - Wildcard URL"
                    ref="tabNapSettingsExcluded"
                    v-model="tabNapSettingsExcludedUI"
                    :disabled="!this.localSettings.tabNapEnabled"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <td>Waking up:</td>
              <td>
                <input
                  id="tabNapWakingUpInput"
                  style="margin-left: 0"
                  type="checkbox"
                  name="tabNapWakingUp"
                  ref="tabNapWakingUp"
                  v-model="tabNapWakingUpUI"
                />
                <label for="tabNapWakingUpInput">Automatically reload hibernated tabs on focus</label>
              </td>
            </tr>

            <tr>
              <td>External Links:</td>
              <td>
                <input
                  id="openExternalLinksInNewWindowInput"
                  style="margin-left: 0"
                  type="checkbox"
                  name="externalLinksInNewWindow"
                  ref="openExternalLinksInNewWindow"
                  v-model="openExternalLinksInNewWindowUI"
                />
                <label for="openExternalLinksInNewWindowInput"
                  >Open URLs from other apps in a new window automatically</label
                >
              </td>
            </tr>

            <tr>
              <td>Appearance:</td>
              <td>
                <input
                  type="radio"
                  id="theme-automatic"
                  name="theme"
                  v-model="themeUI"
                  value="automatic"
                  autocomplete="off"
                  style="margin: 0px 8px 0px 0px; padding-left: 0"
                />
                <label style="margin-right: 24px" class="custom-control-label" for="theme-automatic">
                  Same as OS (auto)
                </label>
                <input
                  type="radio"
                  id="theme-dark"
                  name="theme"
                  v-model="themeUI"
                  value="dark"
                  autocomplete="off"
                  style="margin: 0px 8px 0px 0px; padding-left: 0"
                />
                <label style="margin-right: 24px" class="custom-control-label" for="theme-dark"> Dark theme </label>
                <input
                  type="radio"
                  id="theme-light"
                  name="theme"
                  v-model="themeUI"
                  value="light"
                  autocomplete="off"
                  style="margin: 0px 8px 0px 0px; padding-left: 0"
                />
                <label class="custom-control-label" for="theme-light"> Light theme </label>
              </td>
            </tr>
          </table>
        </div>

        <div class="settings--section" style="margin-top: 40px">
          <div class="hr">
            <!--                        <img class="hr&#45;&#45;image" src="/icons/ui/settings/icon-time.svg">-->
            <svg class="hr--image" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g
                transform="translate(1 1)"
                stroke="#000"
                stroke-linecap="square"
                stroke-width="2"
                fill="none"
                fill-rule="evenodd"
              >
                <circle cx="11" cy="11" r="11" />
                <path d="M11 5v6h6" />
              </g>
            </svg>
            <!--                        <svg class="hr&#45;&#45;image" width="24" height="24" xmlns="http://www.w3.org/2000/svg">-->
            <!--                            <g transform="translate(1 1)" stroke="#000" stroke-linecap="square" stroke-width="2" fill="none" fill-rule="evenodd">-->
            <!--                                <circle cx="11" cy="11" r="11"/>-->
            <!--                                <path d="M11 5v6h6"/>-->
            <!--                            </g>-->
            <!--                        </svg>-->
            <div class="hr--title">Time</div>
            <div class="hr--line"></div>
          </div>

          <table class="table">
            <tr>
              <td>Display time stamp:</td>
              <td>
                <span>
                  <input
                    id="tableroneTimestampFormatRelativeInput"
                    style="margin-left: 0"
                    type="radio"
                    name="tableroneTimestampFormat"
                    value="relative"
                    v-model="tableroneTimestampFormatUI"
                  />
                  <label for="tableroneTimestampFormatRelativeInput">Relative (2 hours ago)</label>
                </span>
                <span style="padding-left: 8px">
                  <input
                    id="tableroneTimestampFormatAbsoluteInput"
                    type="radio"
                    name="tableroneTimestampFormat"
                    value="absolute"
                    v-model="tableroneTimestampFormatUI"
                  />
                  <label for="tableroneTimestampFormatAbsoluteInput">Absolute ({{ absolute2HoursAgo }})</label>
                </span>
              </td>
            </tr>
            <!--
                      <tr>
                          <td>Time format:</td>
                          <td>
                              <span><input type="radio" name="tableroneTimeFormat" value="12h" v-model="tableroneTimeFormat"> 12 hour (4:12 pm)</span>
                              <span><input type="radio" name="tableroneTimeFormat" value="24h" v-model="tableroneTimeFormat"> 24 hour (16:12)</span>
                          </td>
                      </tr>
                      -->
            <tr>
              <td>Date formatting:</td>
              <td>
                <select v-model="tableroneDateFormatUI" style="width: 200px">
                  <option value="little_endian-long_month">Wednesday, 26 April 2022</option>
                  <option value="little_endian-long_month-dot">Wednesday, 26. April 2022</option>
                  <option value="little_endian-short_month-mm-slash">Wednesday, 26/04/2022</option>
                  <option value="little_endian-short_month-mm-dots">Wednesday, 26.04.2022</option>
                  <option value="little_endian-short_month-m-dots">Wednesday, 26.4.2022</option>
                  <option value="middle_endian-long_month">Wednesday, April 26 2022</option>
                  <option value="middle_endian-long_month-dot">Wednesday, April 26. 2022</option>
                  <option value="middle_endian-short_month-mm-slash">Wednesday, 04/26/2022</option>
                  <option value="middle_endian-short_month-mm-dots">Wednesday, 04.26.2022</option>
                  <option value="middle_endian-short_month-m-dots">Wednesday, 4.26.2022</option>
                  <option value="big_endian-long_month">Wednesday, 2022 April 26</option>
                  <option value="big_endian-long_month-dot">Wednesday, 2022 April 26.</option>
                  <option value="big_endian-short_month-mm-slash">Wednesday, 2022/04/26</option>
                  <option value="big_endian-short_month-mm-dots">Wednesday, 2022.04.26</option>
                  <option value="big_endian-short_month-m-dots">Wednesday, 2022.4.26</option>
                </select>
                <span style="padding-left: 8px">
                  <input
                    id="tableroneTimeFormat12hInput"
                    type="radio"
                    name="tableroneTimeFormat"
                    value="12h"
                    v-model="tableroneTimeFormatUI"
                  />
                  <label for="tableroneTimeFormat12hInput">12 hour (4:12 pm)</label>
                </span>
                <span style="padding-left: 8px">
                  <input
                    id="tableroneTimeFormat24hInput"
                    type="radio"
                    name="tableroneTimeFormat"
                    value="24h"
                    v-model="tableroneTimeFormatUI"
                  />
                  <label for="tableroneTimeFormat24hInput">24 hour (16:12)</label>
                </span>
              </td>
            </tr>
            <!--
                      <tr>
                          <td>Today long</td>
                          <td>{{displayDateFunction}}</td>
                      </tr>
                      <tr>
                          <td>Today short</td>
                          <td>{{displayShortDateFunction}}</td>
                      </tr>
                      -->
          </table>
        </div>

        <div class="settings--section" style="margin-top: 40px">
          <div class="hr">
            <!--                        <img class="hr&#45;&#45;image" src="/icons/ui/settings/icon-database.svg">-->
            <svg class="hr--image" width="20" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(1 1)" stroke="#000" stroke-width="2" fill="none" fill-rule="evenodd">
                <path d="M0 3v16c0 1.7 4 3 9 3s9-1.3 9-3V3" />
                <ellipse stroke-linecap="square" cx="9" cy="3" rx="9" ry="3" />
                <path d="M18 11c0 1.7-4 3-9 3s-9-1.3-9-3" stroke-linecap="square" />
              </g>
            </svg>
            <!--                        <svg class="hr&#45;&#45;image" width="20" height="24" xmlns="http://www.w3.org/2000/svg">-->
            <!--                            <g transform="translate(1 1)" stroke="#000" stroke-width="2" fill="none" fill-rule="evenodd">-->
            <!--                                <path d="M0 3v16c0 1.7 4 3 9 3s9-1.3 9-3V3"/>-->
            <!--                                <ellipse stroke-linecap="square" cx="9" cy="3" rx="9" ry="3"/>-->
            <!--                                <path d="M18 11c0 1.7-4 3-9 3s-9-1.3-9-3" stroke-linecap="square"/>-->
            <!--                            </g>-->
            <!--                        </svg>-->
            <div class="hr--title">Data</div>
            <div class="hr--line"></div>
          </div>

          <table id="settings-auto-backup" :class="['table', { 'table--highlighted_dangerous': !backupEnabledUI }]">
            <tr>
              <td>
                <div class="left top">Auto back-up:</div>
              </td>
              <td>
                <div class="right top" style="display: block">
                  <input
                    id="backupEnabledInput"
                    style="margin-left: 0"
                    type="checkbox"
                    name="backupEnabled"
                    ref="backupEnabled"
                    v-model="backupEnabledUI"
                    disabled
                  />
                  <label for="backupEnabledInput">Back-up data every</label>
                  <input
                    id="backupTime"
                    type="number"
                    name="backupTime"
                    ref="backupTime"
                    v-model.lazy="backupTimeUI"
                    class="small-input"
                    style="min-width: 40px; text-align: center; margin: 0px 8px"
                  />
                  <label for="backupTime">hour(s)</label>

                  <div class="google-drive-container">
                    to <img src="/icons/ui/google-drive.svg" alt="Google Drive" />
                    <span>Google Drive</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="left"></div>
              </td>
              <td>
                <button v-if="backupEnabledUI" @click="disconnectGoogleDrive">Disconnect</button>
                <button v-else @click="connectGoogleDrive" class="button__save">Connect Google Drive</button>

                <!-- Error message -->
                <div v-if="connectionError" class="error-message">
                  <img src="/icons/ui/warning-red.svg" alt="Warning" />
                  <span>{{ connectionError }}</span>
                </div>

                <!-- Backup info (only shown when no error and backup exists) -->
                <div v-if="!connectionError">
                  <svg
                    v-show="backupEnabledUI"
                    :style="{
                      verticalAlign: 'middle',
                      marginLeft: '10px',
                      marginTop: '8px'
                    }"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="24"
                    height="24"
                    xml:space="preserve"
                    version="1.1"
                    viewBox="0 0 32 32"
                  >
                    <image
                      width="20"
                      height="20"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABO1BMVEUAAABVqlVCoEZDn0dDoEZDoEdDoEdDoEdDn0c5qlVEn0ZCoEdDoEdEoEdDoEZDoEdDoUYA/wBEn0hDoEdEn0eAgIBCoEdDn0dCoUhEoEdDoUdEoEdEoEdDoEZNmU1DoEhCoUhDoUZDoEhDoEdDoEdFoklDn0hDoUZDoEdEokhCoEhDoEhAv0BCn0hDoEdEoEhEn0dDoEZEn0hDoEdDoUdDoEdDn0dDoEgzmTNEoUdDoEdDoEdAn0BVqlVDoEdCoEVDoEdDoEdDoEdGokZDoEdFoEhDoEdDoEdEn0lDoEdCoEhDoEdCoUdFn0VEoEdDoEdDoEdBoEZDoUhDoEdCnkZDoEdGokZBoEdDnklFn0VDoEdDoEdDoEdGn0ZCnEpDoUdDoEdCoUhDn0dDoEZEn0hCoEZBoEVDoEf///+dmniPAAAAZ3RSTlMAAz6Nx+n6jD0JeOp2VuTiVAGA/ogCqaiHhIJTj4YKeZKKmb/oP6Bf/TyOqwRV/IvIrlL7xbawsgVP+boIBrNG9/jCC8NDyvU48sTxNjDuie8zLuw66ywrKiXmc+EoH+DjUYWndXQ7OjSc/AAAAAFiS0dEaMts9CIAAAAHdElNRQfmAxIIIgwRbuxIAAABZElEQVQ4y5WTZ0PCMBCGwyhDKkOsKCiKFhUXjuLAIioq7r2tA1f+/z8wuYa2CfmA9+Xe5LlygwtC3ZvPHwgqoZASDEd8EhztiWHHFDUq8t445iyR5HCqL40FS/drLtcGsMQybsQgltqQk1/CsjRLjtWf6ODDCI0QF89DwGgHH6PXBSJUmE9M5OMp6GwCY51OrCjySbv6qWmiS0TMCHx2Dvj8Aj2UiVrk+ZLNl1fgZBDJSqisgltbB74Rsm91oqugNs3aFjjg9W32ezvtgN0GQrUK3msA329zCKApDgDkAzb3N52KaIog8U2/5689PHJLPibnMBUnpw4/O/f0dEEuIqAurxi/vvE2fUtHrYC8uwf+wA1eh6GqbA8fiX565qb2Ah+ZFgt/RW/vHP9gq5tkC2kVLX4tW+3CP+Url3WXNiPjX1r3a08sJyym1RKflvmte/r/MSWvUyuVDb1a1Y3Cr/aPN/8H1cbeolIIdsYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDMtMThUMDg6MzQ6MTIrMDA6MDDkEHl2AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTAzLTE4VDA4OjM0OjEyKzAwOjAwlU3BygAAAABJRU5ErkJggg=="
                    />
                  </svg>
                  <label
                    v-if="backupEnabledUI"
                    :style="{
                      textDecoration: 'underline',
                      fontSize: '12px',
                      cursor: backupExists ? 'pointer' : 'default'
                    }"
                    @click="backupExists && onBackupInfoClicked()"
                    >{{ backupDateInfo || 'Successfully connected' }}</label
                  >
                </div>
              </td>
            </tr>
          </table>

          <table class="table">
            <tr>
              <td>
                <div class="left">Bookmarks:</div>
              </td>
              <td>
                <div class="right">
                  <input
                    id="autoSaveToBookmarks"
                    style="margin-left: 0"
                    type="checkbox"
                    name="autoSaveToBookmarks"
                    ref="autoSaveToBookmarks"
                    v-model="autoSaveToBookmarksUI"
                  />
                  <label for="autoSaveToBookmarks">Add Tablerone sessions to Other Bookmarks</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="left">Import data:</div>
              </td>
              <td class="settings--import-buttons" style="display: table-cell">
                <button class="import-icon" @click="enableImportMode('tablerone-backup')">
                  <img src="/icons/ui/import/tablerone.svg" alt="Tablerone backup" />
                </button>
                <button class="import-icon" @click="enableImportMode('onetab')">
                  <img src="/icons/ui/import/onetab.svg" alt="Onetab" />
                </button>
                <button class="import-icon" @click="enableImportMode('sessionbuddy')">
                  <img src="/icons/ui/import/session-buddy.svg" alt="Session Buddy" />
                </button>
                <button class="import-icon" @click="enableImportMode('Raindrop')">
                  <img src="/icons/ui/import/raindrop-io.svg" alt="Raindrop" />
                </button>
                <button class="import-icon" @click="enableImportMode('Workona')">
                  <img src="/icons/ui/import/workona.svg" alt="Workona" />
                </button>
                <button class="import-icon" @click="enableImportMode('Toby')">
                  <img src="/icons/ui/import/toby.svg" alt="Toby" />
                </button>
                <button class="import-icon" @click="enableImportMode('Tab Session Manager')">
                  <img src="/icons/ui/import/tab-session-manager.svg" alt="Tab Session Manager" />
                </button>
                <button class="import-icon" @click="enableImportMode('Tab Manager Plus')">
                  <img src="/icons/ui/import/tab-manager-plus.png" alt="Tab Manager Plus" />
                </button>

                <button @click="importBookmarks()">Bookmarks</button>
              </td>
            </tr>
            <tr>
              <td>Export data:</td>
              <td style="display: table-cell">
                <select
                  id="export"
                  name="export"
                  ref="export"
                  v-model="exportSelect"
                  @change="exportSelectEventOnChange($event)"
                  @click="calculateBackupSize()"
                >
                  <option value="select-format">Select format</option>
                  <option value="tablerone-backup">Tablerone backup data only ({{ backupSizeDataOnly }} .TXT)</option>
                  <option value="tablerone-backup-thumbs">
                    Tablerone backup with thumbs ({{ backupSizeWithThumbs }}
                    .TXT)
                  </option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </td>
            </tr>
            <!--
                    <tr>
                      <td>
                        <div class="left">
                          Thumbnails:
                        </div>
                      </td>
                      <td>
                        <button @click="generateMissingScreenshots()">Generate missing thumbnails</button>
                      </td>
                    </tr>
                    -->
          </table>
        </div>

        <!-- DONATE - start -->
        <div id="settings--donate">
          <p>
            Like Tablerone?
            <a @click="donateClick()" :href="donationVoteAndSuggestUrl" target="_blank">Please consider donating</a>. So
            we can make it better.
          </p>
        </div>
        <!-- DONATE - end -->

        <!--
              <div id="settings--final_decision_buttons">
                  <button @click="discardChanges()">Discard changes</button>
                  <button @click="saveSettings" class="button__save">Save settings</button>
              </div>
              -->
      </div>
    </div>

    <!-- import window of settings -->
    <div id="settings--import" v-else>
      <div @click.stop="importMode = false" id="settings--import--close" class="button--main button-settings-close">
        <!--                <img src="/icons/ui/times.svg">-->
        <span class="button--main--tooltip button--main--tooltip__to_left">Close import</span>
        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5.5l-14 14m14 0L.5.5" stroke="#000" fill="none" fill-rule="evenodd" stroke-linecap="square" />
        </svg>
      </div>
      <div class="settings--content">
        <!--<h1>Import</h1>-->

        <div class="import_list">
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'tablerone-backup'
            }"
            @click="switchImportSource('tablerone-backup')"
          >
            <img src="/icons/ui/import/tablerone.svg" alt="Tablerone backup" />
            Tablerone
          </div>
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'onetab'
            }"
            @click="switchImportSource('onetab')"
          >
            <img src="/icons/ui/import/onetab.svg" alt="Onetab" />
            OneTab
          </div>
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'sessionbuddy'
            }"
            @click="switchImportSource('sessionbuddy')"
          >
            <img src="/icons/ui/import/session-buddy.svg" alt="Session Buddy" />
            Session Buddy
          </div>
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'Raindrop'
            }"
            @click="switchImportSource('Raindrop')"
          >
            <img src="/icons/ui/import/raindrop-io.svg" alt="Raindrop" />
            Raindrop
          </div>
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'Workona'
            }"
            @click="switchImportSource('Workona')"
          >
            <img src="/icons/ui/import/workona.svg" alt="Workona" />
            Workona
          </div>
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'Toby'
            }"
            @click="switchImportSource('Toby')"
          >
            <img src="/icons/ui/import/toby.svg" alt="Toby" />
            Toby
          </div>
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'TabSessionManager'
            }"
            @click="switchImportSource('TabSessionManager')"
          >
            <img src="/icons/ui/import/tab-session-manager.svg" alt="Tab Session Manager" />
            Tab Session Manager
          </div>
          <div
            class="import_list--element"
            :class="{
              'import_list--element__selected': importSource === 'TabManagerPlus'
            }"
            @click="switchImportSource('TabManagerPlus')"
          >
            <img src="/icons/ui/import/tab-manager-plus.png" alt="Tab Manager Plus" />
            Tab Manager Plus
          </div>
        </div>
        <div class="import_field">
          <settings-dropzone
            @importDataChange="importDataChange($event)"
            @importDataLoadingFileContents="importDataLoadingFileContents($event)"
          ></settings-dropzone>
        </div>

        <div id="import--final_decision_buttons" v-if="loadingImportData === false">
          <div class="import_field--buttons" v-if="importing === false">
            <button @click="disableImportMode()">Cancel</button>
            <button
              :disabled="importDataStats === ''"
              @click.once="importFromSource()"
              :class="{
                button__save: importDataStats !== ''
              }"
            >
              Import {{ importDataStats }}
            </button>
          </div>
          <div class="import_field--buttons import_field--buttons__notification" v-else>
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
            <span>Importing {{ importDataStats }}</span>
          </div>
        </div>
        <div id="import--loading-file" v-else>
          <span>Loading File...</span>
        </div>
      </div>
    </div>

    <div id="settings--footer">
      <b>© 2021 about:blank studio</b>
      ・
      <a :href="termsOfServiceUrl" target="_blank">Terms of Service</a>
      ・
      <a :href="privacyPolicyUrl" target="_blank">Privacy policy</a>
      ・
      <a :href="releaseNotesUrl" target="_blank">Changelog</a>
    </div>
  </div>
</template>

<script>
import Library from '../../../library/library'
import KNOTDB from '../../../library/knotidb'

import BehaviorMode, { NEW_TAB_MODE, PINNED_TAB_MODE, POPUP_ONLY_MODE } from '../../../background/managers/BehaviorMode'

import SettingsDropzone from './SettingsDropzone.vue'
import {
  DB_TBL_CLUSTERS,
  DB_TBL_SCREENSHOTS,
  TABLERONE_URL_MULTIPLE_WAYS_TO_SAVE_TABS,
  TABLERONE_URL_PARTICULAR_RELEASE_NOTE,
  TABLERONE_URL_RELEASE_NOTES
} from '../../../config'
import { log } from '../../../utils/loggerone'
import Backup from '@/background/managers/Backup'
import Notification from '@/background/managers/Notification'
import Settings from '@/background/managers/Settings'
import { Tbl } from '@v2/tbl/_index'

const TOAST_DURATION = 7000

export default {
  name: 'Settings',
  components: {
    'settings-dropzone': SettingsDropzone
  },
  props: {
    settings: Object,

    // urls
    donationVoteAndSuggestUrl: String,
    privacyPolicyUrl: String,
    termsOfServiceUrl: String,
    setAsHomePageUrl: String,

    timer: Array,

    getSetting: Function,

    importModeOnStartup: String,

    settingsOpenHighlightCloseTabsAfterSaving: Boolean,
    settingsOpenHighlightSuspend: Boolean,
    settingsOpenHighlightSetTableroneAs: Boolean
  },
  data() {
    return {
      PINNED_TAB_MODE,
      NEW_TAB_MODE,
      POPUP_ONLY_MODE,
      BehaviorMode,
      importMode: false, // are we in import mode or not (window)
      loadingImportData: false,
      importSource: '', // what have we selected
      importData: '', // v-model for textarea
      importing: false, // true is when we click on import button
      importDataStats: '', // we get this data when we paste inside textarea some data
      isHidden: true,
      exportSelect: 'select-format',
      releaseNotesUrl: '',

      backupExists: false,
      backupDateInfo: null,
      backupFolderLink: null,
      // default values of backup sizes
      backupSizeDataOnly: '100 kB',
      backupSizeWithThumbs: '500 kB',

      localSettings: {
        theme: null,
        sleepEnabled: null, // if I do not declare them (ALL) here... they do not work in computed sleepEnabledUI
        suspendTimeMinutes: null,
        closeTabsAndSave: null,
        openCollectionSuspended: null,
        suspendedTabsTabLimit: null,
        tabNapSettingLimit: null,
        tabNapEnabled: null,
        tabNapSettingFocus: null,
        tabNapSettingPinned: null,
        tabNapSettingAV: null,
        tabNapSettingLimitUI: null,
        tabNapSettingUnsavedForm: null,
        tabNapSettingsExcluded: null,
        tabNapWakingUp: null,
        autoClose: null,
        sleepHour: null,
        doNotSuspendActiveTabs: null,
        doNotSuspendPinnedTabs: null,
        doNotSuspendAudibleTabs: null,
        // suspendViaDiscard: null,
        tableroneTimestampFormat: null,
        tableroneDateFormat: null,
        tableroneTimeFormat: null,
        tableroneMode: PINNED_TAB_MODE,
        autoSaveToBookmarks: null,
        suspendEnabled: null,
        backupEnabled: null,
        backupTime: null,
        openExternalLinksInNewWindow: null
      }, // we will try to use these for those who do not have params below

      keyboardShortcutFirstTab: 'Ctrl+1',
      keyboardShortcutNewTab: 'Ctrl+T',
      keyboardShortcutHomePage: 'Ctrl+Shift+H',
      keyboardShortcutOpenPopup: 'Ctrl+Shift+.',
      keyboardShortcutOpenTimeline: 'Ctrl+Shift+Space',
      urlLearnMoreAboutMultipleWays: '',

      version: '', // version from manifest
      TABLERONE_URL_PARTICULAR_RELEASE_NOTE: '',
      connectionError: null // Error message for Google Drive connection
    }
  },

  mounted() {
    this.updateSettings()

    this.releaseNotesUrl = TABLERONE_URL_RELEASE_NOTES

    this.urlLearnMoreAboutMultipleWays = TABLERONE_URL_MULTIPLE_WAYS_TO_SAVE_TABS

    this.version = 'v' + chrome.runtime.getManifest().version

    this.importDataStats = ''
    this.importSource = ''
    this.importData = ''
    this.TABLERONE_URL_PARTICULAR_RELEASE_NOTE =
      TABLERONE_URL_PARTICULAR_RELEASE_NOTE + this.version.replaceAll('.', '-').replace('v', 'v-') + '/'

    Library.getOS().then((OS) => {
      if (OS === 'mac') {
        this.keyboardShortcutFirstTab = '⌘+1' // '⌘+R' //⌘  ⇧ ⌃ ⌥
        this.keyboardShortcutNewTab = '⌘+T' // '⌘+R' //⌘  ⇧ ⌃ ⌥
        this.keyboardShortcutHomePage = '⌘+⇧+H' // '⌘+⇧+H' //⌘  ⇧ ⌃ ⌥
        this.keyboardShortcutOpenPopup = '⌘+⇧+.'
        this.keyboardShortcutOpenTimeline = '⌘+⇧+Space'
      }
    })

    // calculating size
    this.calculateBackupSize()
    this.getBackupInfo()
    this.initMessageListener()

    // Check for scroll to backup section parameter
    this.checkForScrollToBackupSection()
  },
  methods: {
    calculateBackupSize() {
      this.getArrayOfClusters().then((backupSizeDataOnlyData) => {
        this.backupSizeDataOnly = Library.textToSizeUnits(JSON.stringify(backupSizeDataOnlyData))
      })

      this.getArrayOfClusters(true).then((backupSizeWithThumbsData) => {
        this.backupSizeWithThumbs = Library.textToSizeUnits(JSON.stringify(backupSizeWithThumbsData))
      })
    },

    browseResult(e) {
      const fileselector = document.getElementById('fileselector')
      console.log(fileselector.value)
    },
    importDataChange(text) {
      this.importData = text.trim()
    },
    importDataLoadingFileContents(loadingImportData) {
      this.loadingImportData = loadingImportData
    },
    chooseFileTablerone() {
      document.getElementById('fileUploadTablerone').click()
    },
    changeFileTablerone(event) {
      // console.log()
      // console.log("CHANGE FILE", event.target)
      const file = document.getElementById('fileUploadTablerone').files[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = function (evt) {
          // document.getElementById("fileContents").innerHTML
          console.log('READ FILE', evt.target.result)
        }
        reader.onerror = function (evt) {
          console.log('READ FILE ERROR')
          // document.getElementById("fileContents").innerHTML = "error reading file";
        }
      }
    },
    donateClick() {
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'donateClick',
        eventProps: { source: 'settings' }
      })
    },
    async updateSettings() {
      // this.localSettings = this.settings <== this does not work (computed *UI params do not get updated)
      this.localSettings.theme = this.settings.theme
      this.localSettings.sleepEnabled = this.settings.sleepEnabled
      this.localSettings.suspendTimeMinutes = this.settings.suspendTimeMinutes
      this.localSettings.suspendedTabsTabLimit = this.settings.suspendedTabsTabLimit
      this.localSettings.closeTabsAndSave = this.settings.closeTabsAndSave
      this.localSettings.openCollectionSuspended = this.settings.openCollectionSuspended

      this.localSettings.tabNapEnabled = this.settings.tabNapEnabled
      this.localSettings.tabNapSettingFocus = this.settings.tabNapSettingFocus ?? true
      this.localSettings.tabNapSettingPinned = this.settings.tabNapSettingPinned ?? true
      this.localSettings.tabNapSettingAV = this.settings.tabNapSettingAV ?? true
      this.localSettings.tabNapSettingLimit = this.settings.tabNapSettingLimit
      this.localSettings.tabNapSettingUnsavedForm = this.settings.tabNapSettingUnsavedForm ?? true
      this.localSettings.tabNapSettingsExcluded = this.settings.tabNapSettingsExcluded
      this.localSettings.tabNapWakingUp = this.settings.tabNapWakingUp
      this.localSettings.autoClose = this.settings.autoClose

      this.localSettings.sleepHour = this.settings.sleepHour
      this.localSettings.doNotSuspendActiveTabs = this.settings.doNotSuspendActiveTabs
      this.localSettings.doNotSuspendPinnedTabs = this.settings.doNotSuspendPinnedTabs
      this.localSettings.doNotSuspendAudibleTabs = this.settings.doNotSuspendAudibleTabs
      // this.localSettings.suspendViaDiscard = this.settings.suspendViaDiscard
      this.localSettings.tableroneTimestampFormat = this.settings.tableroneTimestampFormat
      this.localSettings.tableroneDateFormat = this.settings.tableroneDateFormat
      this.localSettings.tableroneTimeFormat = this.settings.tableroneTimeFormat
      // * hiding this line behind the flag would require marking this function as async
      // * which would change the way it would be consumed
      // * `this.localSettings.tableroneMode` is only consumed in by the `tableroneMode` computed property
      // * which is only consumed by the template & only when the feature flag is enabled
      // * IMHO: we should not touch it
      this.localSettings.tableroneMode = this.settings.tableroneMode || PINNED_TAB_MODE

      this.localSettings.autoSaveToBookmarks = this.settings.autoSaveToBookmarks
      this.localSettings.suspendEnabled = this.settings.suspendEnabled
      this.localSettings.backupEnabled = await Backup.hasPermissions()
      this.localSettings.backupTime = this.settings.backupTime
      this.localSettings.openExternalLinksInNewWindow = this.settings.openExternalLinksInNewWindow
    },
    discardChanges() {
      this.$emit('closeSettings')
    },
    async exportSelectEventOnChange(val) {
      // first calculate size
      this.calculateBackupSize()

      if (this.exportSelect === 'tablerone-backup') {
        this.exportToTableroneBackup()
      } else if (this.exportSelect === 'tablerone-backup-thumbs') {
        this.exportToTableroneBackup(true)
      } else if (this.exportSelect === 'excel') {
        this.exportToExcel()
      } else if (this.exportSelect === 'csv') {
        await this.exportToCSV()
      }

      // reset to default
      setTimeout(() => {
        this.exportSelect = 'select-format'
      }, 3000)
    },
    viewTrash() {
      this.$emit('closeSettingsAndShowTrash')
    },
    enableImportMode(val) {
      this.importMode = true
      this.importSource = val

      // fix so it scrolls to top on smaller screens
      this.$nextTick(() => {
        document.getElementById('settings').scrollTo(0, 0)
      })

      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'settingsImportOpen',
        eventProps: { importSouce: val }
      })
    },

    async restoreData() {
      const { status, result } = await chrome.runtime.sendMessage({ command: 'backup.get' })

      if (status === 'ok' && result.content != null) {
        this.importData = result.content.trim()
        this.importSource = 'tablerone-backup'
        this.importFromSource()
      }
    },

    generateMissingScreenshots() {
      const decisionAboutDeleting = confirm(
        'Tablerone has to take over your browser for a few moments.\n' +
          '\n' +
          'It will open all windows, select all tabs, and make screenshots. In the meantime, sit back, relax, and fingers AFK.\n' +
          '\n' +
          'You can stop the process at any time by closing the window.'
      )
      if (decisionAboutDeleting === true) {
        this.sendMessage({
          command: 'screenshotgenerator.generate-all-screenshots'
        }) // delete it when you save as no
      }
    },
    generateMissingScreenshotsLead() {
      const decisionAboutDeleting = confirm(
        'Tablerone has to take over your browser for a few moments.\n' +
          '\n' +
          'It will open all windows, select all tabs, and make screenshots. In the meantime, sit back, relax, and fingers AFK.\n' +
          '\n' +
          'You can stop the process at any time by closing the window.'
      )
      if (decisionAboutDeleting === true) {
        this.sendMessage({
          command: 'screenshotgenerator.generate-lead-screenshots'
        }) // delete it when you save as no
      }
    },

    importFromSource() {
      this.importing = true

      const importSource = this.importSource
      const importData = encodeURI(this.importData)

      const self = this

      // wait one second
      setTimeout(() => {
        self.sendMessage(
          {
            command: 'settings.import',
            source: importSource,
            data: importData
          },
          function (result) {
            // reset parameters (does not matter if error or not)
            self.disableImportMode()

            let message

            // explanation of the weird code:
            // in some browsers the response is always chrome.runtime.lastError, but the import is done flawlessly
            // because of difficult debugging we opted for this kind of solution

            if (chrome.runtime.lastError) {
              console.warn('Whoops... problem sending message for import: ' + chrome.runtime.lastError.message)
              message = '<div>Import was successfull</div>'
              // because it obviously works anyways
            } else {
              if (result.status === 'ok') {
                // alert(`Successfully imported ${result.result.tabs} tabs divided accross ${result.result.clusters} clusters.`)
                message = `<div>${result.result.clusters} sessions imported to timeline</div>`
              } else {
                message = '<div>Import was not successfull</div>'
                // alert('Problem with import: ' + result.error)
              }
            }

            self.$toasted.show(message, {
              // TODO: moved to where (cluster title)
              duration: TOAST_DURATION,
              onComplete: function () {
                // oncomplete is not called if undo is clicked
              },
              containerClass: 'toasted-type-success',
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
            self.$emit('closeSettings')
          }
        ) // for external messages params look like (extId, message, callback)
      }, 1000)
    },

    download(content, fileName, contentType) {
      const a = document.createElement('a')
      const file = new Blob([content], { type: contentType })
      a.href = URL.createObjectURL(file)
      a.download = fileName
      a.click()
    },

    async getArrayOfClusters(includeThumbs = false) {
      // V2 - we basically moved the 'settings.export-get-cluster-json' because it appears something did not work there
      const db = await KNOTDB
      const clusters = await db.getAll(DB_TBL_CLUSTERS)
      const arrayOfClusters = []
      for (let i = 0; i < clusters.length; i++) {
        const cluster = clusters[i]

        if (Library.isSavedCluster(cluster)) {
          if (Library.isHealthyCluster(cluster)) {
            // we do this filter to ensure no unhealthy stuff is inside
            if (!Object.prototype.hasOwnProperty.call(cluster, 'gettingStarted')) {
              // ignore getting started cluster
              const sanitizedClusterForExport = Library.sanitizeClusterForExport(cluster)
              arrayOfClusters.push(sanitizedClusterForExport)
            }
          }
        }
      }

      if (includeThumbs) {
        for (let i = 0; i < arrayOfClusters.length; i++) {
          const cluster = arrayOfClusters[i]

          for (let j = 0; j < cluster.tabs.length; j++) {
            const tab = cluster.tabs[j]
            const screenshot = await db.getFromIndex(DB_TBL_SCREENSHOTS, 'url', tab.url) // IDBKeyRange.only(url)
            if (screenshot) {
              tab.screenshotDataUrl = screenshot.dataUrl
            }
          }
        }
      }
      return arrayOfClusters
    },
    async exportToTableroneBackup(includeThumbs = false) {
      // V2 - we basically moved the 'settings.export-get-cluster-json' because it appears something did not work there
      const arrayOfClusters = await this.getArrayOfClusters(includeThumbs)
      const tabsNumber = Library.getNumberOfTabs(arrayOfClusters)

      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'exportTablerone',
        eventProps: {
          clusters: arrayOfClusters.length,
          tabs: tabsNumber,
          type: 'backup',
          subtype: includeThumbs,
          file: 'json'
        }
      })

      const data = { export: arrayOfClusters }
      const stringifiedJson = JSON.stringify(data)
      let includeThumbsText = ''
      if (includeThumbs) {
        includeThumbsText = 'with_thumbs_'
      }
      this.download(
        stringifiedJson,
        'tablerone_backup_' + includeThumbsText + Library.getFilenameDate() + '.txt',
        'text/plain'
      )

      // V1
      /*
      let self = this
      chrome.runtime.sendMessage(
        null,
        { command: 'settings.export-get-cluster-json' },
        function (data) {
          if (chrome.runtime.lastError) {
            console.warn('Whoops... problem sending message: ' + chrome.runtime.lastError.message)
          } else {
            let stringifiedJson = JSON.stringify(data)
            // console.log('stringifiedJson', stringifiedJson)
            // self.$refs['exportData'].value = stringifiedJson
            self.download(stringifiedJson, 'tablerone_backup.txt', 'text/plain')
          }
        }) */
    },
    async exportToCSV() {
      // V2 - we basically moved the 'settings.export-get-cluster-csv' because it appears something did not work there
      const arrayOfClusters = await this.getArrayOfClusters()

      const tabsNumber = Library.getNumberOfTabs(arrayOfClusters)
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'exportTablerone',
        eventProps: {
          clusters: arrayOfClusters.length,
          tabs: tabsNumber,
          type: 'csv',
          file: 'csv'
        }
      })

      let content = ''
      for (let i = 0; i < arrayOfClusters.length; i++) {
        const cluster = arrayOfClusters[i]
        const line = cluster.title + ', '

        for (let j = 0; j < cluster.tabs.length; j++) {
          const tab = cluster.tabs[j]
          content += line + tab.title + ', ' + tab.url + '\r\n'
        }
      }

      this.download(content, 'tablerone_export_' + Library.getFilenameDate() + '.csv', 'text/plain')

      // V1
      /*
      let self = this
      chrome.runtime.sendMessage(
        null,
        {
          command: 'settings.export-get-cluster-csv'
        },
        function (data) {
          if (chrome.runtime.lastError) {
            console.warn('Whoops... problem sending message: ' + chrome.runtime.lastError.message)
          } else {
            self.download(data, 'tablerone_export_' + Library.getFilenameDate() + '.csv', 'text/plain')
          }
        })
       */
    },
    async exportToExcel() {
      // moved to background.js
      // this.sendMessage({ command: 'tracking.add.event', eventName: 'exportTablerone', eventProps: { type: 'excel', file: 'excel' } })
      const downloadsPermissionExists = await chrome.permissions.contains({
        permissions: ['downloads']
      })
      if (!downloadsPermissionExists) {
        const downloadsPermissionGranted = await chrome.permissions.request({
          permissions: ['downloads']
        })
        if (!downloadsPermissionGranted) return
      }
      chrome.runtime.sendMessage(null, { command: 'settings.export-excel' }, function (result) {
        if (chrome.runtime.lastError) {
          console.warn('Whoops... problem sending message: ' + chrome.runtime.lastError.message)
        } else {
          if (result.status === true) {
            // alert(`Successfully imported ${result.result.tabs} tabs divided accross ${result.result.clusters} clusters.`)
          } else {
            // alert('Problem: ' + result.error)
          }
          console.log(result)
        }
      }) // for external messages params look like (extId, message, callback)
    },
    /*
    async saveSettings () {
      // TODO: improve this part (save it in one go)
      let settings = {...this.localSettings}

      //we must remapp this (legacy)
      settings.newWindowMode = this.localSettings.newWindowMode ? 'one' : 'two' // this way we get if checkbox is checked

      //close the settings
      this.$emit('closeSettings')

      chrome.runtime.sendMessage(
        null,
        { command: 'settings.set-all', settings: settings },
        function (data) {
          if (chrome.runtime.lastError) {
            console.warn('Whoops... problem sending message: ' + chrome.runtime.lastError.message)
          }
          return true
        })
    },
    */
    saveSetting(settingCodename, settingValue) {
      chrome.runtime.sendMessage(
        null,
        {
          command: 'settings.set',
          settingCodename,
          settingValue
        },
        function (data) {
          // alert('sending settings ' + settingCodename + " " + settingValue)
          if (chrome.runtime.lastError) {
            console.warn('Whoops... problem sending message: ' + chrome.runtime.lastError.message)
          }
          return true
        }
      )
    },
    disableImportMode() {
      this.importMode = false
      this.importSource = ''
      this.importData = ''
      this.importing = false
    },
    reevaluateImportData() {
      const importSource = this.importSource
      const importData = this.importData.trim()
      const self = this

      chrome.runtime.sendMessage(
        null,
        {
          command: 'settings.count-clusters',
          source: importSource,
          data: importData
        },
        function (result) {
          if (result.status == 'error') {
            log.serviceWorker.log('error with import', result)
          }
          if (chrome.runtime.lastError) {
            console.warn('Whoops... problem sending message: ' + chrome.runtime.lastError.message)
          } else {
            if (result.status === 'ok' && self.importData.trim() !== '') {
              self.importDataStats = ` ${result.result.clusters} sessions...`
            } else {
              self.importDataStats = ''
              // alert('Problem with data: ' + result.error)
            }
          }
        }
      ) // for external messages params look like (extId, message, callback)
    },
    switchImportSource(newImportSource) {
      this.importSource = newImportSource
      this.reevaluateImportData()
    },
    sendMessage(message, callback) {
      // for sending message to background.js
      message.messageSenderSource = 'settingsmodal'
      try {
        chrome.runtime.sendMessage(
          null,
          message,
          callback !== undefined && callback !== null
            ? callback
            : function (x) {
                console.log('sendMessage called, message and response are: ', message, x)
                void chrome.runtime.lastError
              }
        ) // for external messages params look like (extId, message, callback)
      } catch (e) {
        console.log('sendMessage problem', e.toString())
      }
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
          source: 'settings'
        })
        this.discardChanges()
      }
    },

    async getBackupInfo() {
      const response = await Backup.getLastBackupInfo()

      if (response == null) {
        this.backupExists = false
        this.backupDateInfo = null
        this.backupFolderLink = null
        return false
      }
      this.backupExists = true
      this.backupDateInfo = this.getBackupDateInfoStr({
        lastBackupTime: response.lastBackupTime
      })
      this.backupFolderLink = response.backupFolderLink
      return true
    },

    onBackupInfoClicked() {
      window.open(this.backupFolderLink, '_blank')
    },

    async connectGoogleDrive() {
      // Clear any previous error
      this.connectionError = null

      const tbl = await Tbl()
      tbl.api.Auth.oauthConnect()

      const onMessage = async (event) => {
        if (event.data?.type === 'oauth-success') {
          window.removeEventListener('message', onMessage)
          Backup.clearPermissionsCache()

          this.sendMessage({
            command: 'tracking.add.event',
            eventName: 'backupEnabled',
            eventProps: {
              value: true
            }
          })

          await Settings._setSetting('backupEnabled', true)
          for (const notification of await Backup.findAllBackupRequestWarnings()) {
            await Notification.markAsRead(notification._uid)
          }
          for (const notification of await Backup.findAllBackupLowSpaceWarnings()) {
            await Notification.markAsRead(notification._uid)
          }

          this.backupEnabledUI = true

          await Notification.addNotification('backup', '<strong>Google Drive Connected</strong>')
          await this.getBackupInfo()
          await chrome.runtime.sendMessage({ command: 'backup.created' })
        } else if (event.data?.type === 'oauth-error') {
          window.removeEventListener('message', onMessage)
          this.connectionError = 'There was an error connecting to Google Drive. Please try again.'
        }
      }

      window.addEventListener('message', onMessage)
    },

    async disconnectGoogleDrive() {
      // Clear any previous error
      this.connectionError = null

      try {
        const tbl = await Tbl()
        await tbl.api.Auth.logout()
        Backup.clearPermissionsCache()
        
        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'backupEnabled',
          eventProps: {
            value: false
          }
        })

        Settings._setSetting('backupEnabled', false)
        await Notification.addNotification('backup', '<strong>Google Drive Disconnected</strong>')
        this.backupEnabledUI = false
      } catch (error) {
        console.log('GDrive disconnect problem', error.message)
        await Notification.addNotification('backup', '<strong>There was an error disconnecting GDrive</strong>')
      }
    },

    getBackupDateInfoStr({ lastBackupTime }) {
      const date = new Date(lastBackupTime)
      return (
        'Latest: ' +
        date.getDate() +
        ' ' +
        date.toLocaleString('en-us', { month: 'short' }) +
        ' ' +
        date.getFullYear() +
        ', ' +
        String(date.getHours()).padStart(2, '0') +
        ':' +
        String(date.getMinutes()).padStart(2, '0')
      )
    },

    initMessageListener() {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.command) {
          case 'backup.created': {
            Backup.clearPermissionsCache()
            this.localSettings.backupEnabled = true
            this.backupExists = true
            this.backupDateInfo = this.getBackupDateInfoStr({
              lastBackupTime: request.lastBackupTime
            })
            // Update backup folder link when a new backup is created
            this.getBackupInfo()
            sendResponse(true)
            break
          }
          default:
            break
        }
      })
    },

    /**
     * Checks if the URL contains a query parameter to scroll to the backup section
     * and scrolls to it if present
     */
    checkForScrollToBackupSection() {
      // Get the current URL parameters
      const urlParams = new URLSearchParams(window.location.search)

      // Check if the scrollToBackup parameter exists
      if (urlParams.has('scrollToBackup')) {
        // Wait for the DOM to be fully rendered
        this.$nextTick(() => {
          // Find the backup section element
          const backupSection = document.getElementById('settings-auto-backup')

          if (backupSection) {
            // Scroll the element into view with smooth behavior
            backupSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        })
      }
    }
  },

  computed: {
    displayDateFunction() {
      return Library.getDateDisplay(new Date(), this.localSettings.tableroneDateFormat, true)
    },
    displayShortDateFunction() {
      return Library.getDateDisplay(new Date(), this.localSettings.tableroneDateFormat, false)
    },
    absolute2HoursAgo() {
      const d = Library.getDate()
      d.setTime(d.getTime() - 120 * 60 * 1000)
      return (
        Library.getDateDisplay(d, this.localSettings.tableroneDateFormat, false) +
        ' ' +
        Library.getTimeDisplay(d, this.localSettings.tableroneTimeFormat)
      )
    },
    // radio button with values
    themeUI: {
      get() {
        return this.localSettings.theme
      },
      set(value) {
        this.localSettings.theme = value
        this.saveSetting('theme', value) // this value will come back with a delay
      }
    },
    // radio button with values
    tableroneMode: {
      // * Not worth complexifying the code here with a feature flag IMHO:
      // * this computed property is only consumed in the template IF the flag is activated
      get() {
        return this.localSettings.tableroneMode
      },
      set(value) {
        this.localSettings.tableroneMode = value

        this.sendMessage({
          command: 'tracking.add.event',
          eventName: 'behaviourMode',
          eventProps: {
            mode: value
          }
        })
        ;(async () => {
          // * Both methods work
          // * Choosing `BehaviorMode` here allows for containment of
          // * the code responsible for the tab state changes
          // * inside of the `BehaviorMode.js` file.
          // * => Straightforward to follow.

          await this.BehaviorMode.setMode(value)

          // * 06/12/2023 -> Natan is okay with a reload on mode switch.
          // * This allows for a synchronous flag checks to be in sync. :)
          // * 17/01/2024 -> We need the setTimeout to allow for the line above
          // * to be executed to completion (especially loggerone calls).
          setTimeout(() => {
            alert('We will reload the timeline to switch modes.')
            window.location.reload()
          })
        })()
      }
    },
    suspendEnabledUI: {
      get() {
        return this.localSettings.suspendEnabled
      },
      set(value) {
        this.localSettings.suspendEnabled = value
        this.saveSetting('suspendEnabled', value) // this value will come back with a delay
      }
    },
    backupEnabledUI: {
      get() {
        return this.localSettings.backupEnabled
      },
      set(value) {
        this.localSettings.backupEnabled = value
        this.saveSetting('backupEnabled', value) // this value will come back with a delay
      }
    },
    backupTimeUI: {
      get() {
        return this.localSettings.backupTime
      },
      set(value) {
        this.localSettings.backupTime = value
        this.saveSetting('backupTime', value) // this value will come back with a delay
      }
    },

    doNotSuspendActiveTabsUI: {
      get() {
        return this.localSettings.doNotSuspendActiveTabs
      },
      set(value) {
        this.localSettings.doNotSuspendActiveTabs = value
        this.saveSetting('doNotSuspendActiveTabs', value)
      }
    },
    doNotSuspendPinnedTabsUI: {
      get() {
        return this.localSettings.doNotSuspendPinnedTabs
      },
      set(value) {
        this.localSettings.doNotSuspendPinnedTabs = value
        this.saveSetting('doNotSuspendPinnedTabs', value)
      }
    },
    doNotSuspendAudibleTabsUI: {
      get() {
        return this.localSettings.doNotSuspendAudibleTabs
      },
      set(value) {
        this.localSettings.doNotSuspendAudibleTabs = value
        this.saveSetting('doNotSuspendAudibleTabs', value)
      }
    },
    sleepEnabledUI: {
      get() {
        return this.localSettings.sleepEnabled
      },
      set(value) {
        this.localSettings.sleepEnabled = value
        this.saveSetting('sleepEnabled', value) // this value will come back with a delay
      }
    },
    sleepHourUI: {
      get() {
        return this.localSettings.sleepHour
      },
      set(value) {
        this.localSettings.sleepHour = value
        this.saveSetting('sleepHour', value) // this value will come back with a delay
      }
    },
    closeTabsAndSaveUI: {
      get() {
        return this.localSettings.closeTabsAndSave
      },
      set(value) {
        this.localSettings.closeTabsAndSave = value
        this.saveSetting('closeTabsAndSave', value) // this value will come back with a delay
      }
    },
    openCollectionSuspendedUI: {
      get() {
        return this.localSettings.openCollectionSuspended
      },
      set(value) {
        this.localSettings.openCollectionSuspended = value
        this.saveSetting('openCollectionSuspended', value) // this value will come back with a delay

        if (this.settings.tabNapWakingUp === undefined && value) {
          this.localSettings.tabNapWakingUp = true
          this.saveSetting('tabNapWakingUp', true)
        }
      }
    },
    openExternalLinksInNewWindowUI: {
      get() {
        return this.localSettings.openExternalLinksInNewWindow
      },
      set(value) {
        this.localSettings.openExternalLinksInNewWindow = value
        this.saveSetting('openExternalLinksInNewWindow', value) // this value will come back with a delay
      }
    },
    /*
    suspendViaDiscardUI: {
      get() {
        return this.localSettings.suspendViaDiscard
      },
      set(value) {
        this.localSettings.suspendViaDiscard = value
        this.saveSetting('suspendViaDiscard', value) //this value will come back with a delay
      }
    },
     */
    // next here
    tableroneDateFormatUI: {
      get() {
        return this.localSettings.tableroneDateFormat
      },
      set(value) {
        this.tableroneDateFormat = value
        this.saveSetting('tableroneDateFormat', value) // this value will come back with a delay
      }
    },
    suspendTimeMinutesUI: {
      get() {
        return this.localSettings.suspendTimeMinutes
      },
      set(value) {
        const intValue = parseInt(value)
        this.localSettings.suspendTimeMinutes = intValue
        this.saveSetting('suspendTimeMinutes', intValue) // this value will come back with a delay
      }
    },
    suspendedTabsTabLimitUI: {
      get() {
        return this.localSettings.suspendedTabsTabLimit
      },
      set(value) {
        const intValue = parseInt(value)
        const newValue = isNaN(intValue) ? 1 : intValue

        this.localSettings.suspendedTabsTabLimit = newValue
        this.saveSetting('suspendedTabsTabLimit', newValue)
      }
    },
    tabNapEnabledUI: {
      get() {
        return this.localSettings.tabNapEnabled
      },
      set(value) {
        this.localSettings.tabNapEnabled = value
        this.saveSetting('tabNapEnabled', value)

        if (value) {
          this.saveSetting('tabNapSettingFocus', this.localSettings.tabNapSettingFocus)
          this.saveSetting('tabNapSettingPinned', this.localSettings.tabNapSettingPinned)
          this.saveSetting('tabNapSettingAV', this.localSettings.tabNapSettingAV)
          this.saveSetting('tabNapSettingLimit', this.localSettings.tabNapSettingLimit)
          this.saveSetting('tabNapSettingUnsavedForm', this.localSettings.tabNapSettingUnsavedForm)
          this.saveSetting('tabNapSettingsExcluded', this.localSettings.tabNapSettingsExcluded)
        }

        if (this.settings.tabNapWakingUp === undefined && value) {
          this.localSettings.tabNapWakingUp = true
          this.saveSetting('tabNapWakingUp', true)
        }
      }
    },
    tabNapSettingFocusUI: {
      get() {
        return this.localSettings.tabNapSettingFocus
      },
      set(value) {
        this.localSettings.tabNapSettingFocus = value
        this.saveSetting('tabNapSettingFocus', value)
      }
    },
    tabNapSettingPinnedUI: {
      get() {
        return this.localSettings.tabNapSettingPinned
      },
      set(value) {
        this.localSettings.tabNapSettingPinned = value
        this.saveSetting('tabNapSettingPinned', value)
      }
    },
    tabNapSettingLimitUI: {
      get() {
        return this.localSettings.tabNapSettingLimit
      },
      set(value) {
        this.localSettings.tabNapSettingLimit = Number(value)
        this.saveSetting('tabNapSettingLimit', Number(value))
      }
    },
    tabNapSettingAVUI: {
      get() {
        return this.localSettings.tabNapSettingAV
      },
      set(value) {
        this.localSettings.tabNapSettingAV = value
        this.saveSetting('tabNapSettingAV', value)
      }
    },
    tabNapSettingUnsavedFormUI: {
      get() {
        return this.localSettings.tabNapSettingUnsavedForm
      },
      set(value) {
        this.localSettings.tabNapSettingUnsavedForm = value
        this.saveSetting('tabNapSettingUnsavedForm', value)
      }
    },
    tabNapSettingsExcludedUI: {
      get() {
        return this.localSettings.tabNapSettingsExcluded
      },
      set(value) {
        this.localSettings.tabNapSettingsExcluded = value ?? ''
        this.saveSetting('tabNapSettingsExcluded', value ?? '')
      }
    },

    tabNapWakingUpUI: {
      get() {
        return this.localSettings.tabNapWakingUp
      },
      set(value) {
        this.localSettings.tabNapWakingUp = value
        this.saveSetting('tabNapWakingUp', value)
      }
    },
    autoCloseUI: {
      get() {
        return this.localSettings.autoClose
      },
      set(value) {
        this.localSettings.autoClose = value
        this.saveSetting('autoClose', value) // this value will come back with a delay
      }
    },
    tableroneTimestampFormatUI: {
      get() {
        return this.localSettings.tableroneTimestampFormat
      },
      set(value) {
        this.localSettings.tableroneTimestampFormat = value
        this.saveSetting('tableroneTimestampFormat', value) // this value will come back with a delay
      }
    },
    tableroneTimeFormatUI: {
      get() {
        return this.localSettings.tableroneTimeFormat
      },
      set(value) {
        this.localSettings.tableroneTimeFormat = value
        this.saveSetting('tableroneTimeFormat', value) // this value will come back with a delay
      }
    },
    autoSaveToBookmarksUI: {
      get() {
        return this.localSettings.autoSaveToBookmarks
      },
      set(value) {
        this.localSettings.autoSaveToBookmarks = value
        if (value === false) {
          const decisionAboutDeleting = confirm('Do you also want to delete Bookmarks created by Tablerone?')
          if (decisionAboutDeleting === true) {
            this.sendMessage({ command: 'bookmarks.empty' }) // delete it when you save as no
          }
        }
        this.saveSetting('autoSaveToBookmarks', value) // this value will come back with a delay
      }
    }
  },
  watch: {
    importModeOnStartup: {
      // when this changes, trigger import mode and emit reset of this value
      handler(newValue) {
        console.log('changed value of importModeOnStartup: ' + newValue)
        if (newValue.trim() !== '') {
          this.enableImportMode(newValue)
          this.$emit('resetImportModeOnStartup')
        }
      }
    },
    settings: {
      deep: true,
      handler(newValue) {
        this.updateSettings()
      }
    },
    importData: {
      // when we put new data into import field
      handler(newValue) {
        this.reevaluateImportData()
      }
    }
  }
}
</script>

<style scoped lang="scss">
$color-blue: #0f62fe;

#settings--container {
  height: 100%;
  width: 100%;
  z-index: 1100000;
  top: 0;
  position: absolute;
  margin-bottom: 0px;

  #version {
    position: fixed;
    left: 40px;
    height: 128px;
    line-height: 128px;
    font-size: 13px;

    a {
      transition: all 0.3s ease-out;
      color: var(--color-text-black);
      text-decoration: none;

      &:hover {
        color: var(--color-blue);
      }
    }
  }

  #settings--footer {
    font-size: 11px;
    color: var(--color-grey-links);
    text-align: center;
    width: 100%;
    padding-bottom: 40px;
  }

  select {
    width: auto;
    max-width: auto;
    min-width: 200px;
    display: inline-block;
  }
}

/* TODO: improve this poor implementation of layout of Settings */
//this hack improves how the space in settings is used
@media screen and (max-height: 1300px) {
  #settings--container {
    /* if scroll we need to scroll across footer */
    margin-bottom: 200px;
  }
}

@media screen and (max-height: 1000px) {
  #settings--container {
    /* if scroll we need to scroll across footer */
    margin-bottom: 400px;
  }
}

@media screen and (max-height: 700px) {
  #settings--container {
    /* if scroll we need to scroll across footer */
    margin-bottom: 600px;
  }
}

h1 {
  text-transform: uppercase;
  font-size: 26px;
  padding: 0;
  margin: 0;
  height: 128px;
  line-height: 128px;
  margin-bottom: 40px;
}

button {
  border: 1px solid #e0e0e0;
  font-size: 13px;
  padding: 3px 16px;
  border-radius: 5px;
  transition: all 0.4s ease-out;

  &:hover {
    background: var(--color-blue);
    color: #ffffff;
    border-color: 1px solid var(--color-blue);
  }

  &.button__save {
    background: var(--color-blue);
    color: #ffffff;
  }
}

select,
option {
  font-size: 13px;
}

select {
  display: block;
  font-size: 13px;
  font-weight: normal;
  line-height: 1.3;
  padding: 3px 6px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;

  border: 1px solid #e0e0e0;
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);

  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;

  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
  background-repeat: no-repeat, repeat;
  background-position:
    right 0.7em top 50%,
    0 0;
  background-size:
    0.65em auto,
    100%;
}

select::-ms-expand {
  display: none;
}

select:hover {
  border-color: #888;
}

select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: #222;
  outline: none;
}

select option {
  font-weight: normal;
}

.hr {
  width: 100%;
  color: #a4a4a4;
  font-size: 18px;
}

.small-input {
  width: 50px;
  font-size: 13px;
  line-height: 20px;
  height: 20px;
  padding: 0 3px;
}

.google-drive-container {
  display: inline-flex;
  margin-left: 8px;
  gap: 8px;
  align-items: center;
}

.settings--content {
  padding-bottom: 66px;
  min-width: 500px;
  max-width: fit-content;
  margin: 0 auto;

  h1 {
    svg {
      path {
        fill: var(--color-text-black);
      }
    }
  }
}

span {
  &.muted {
    color: #8d8d8d;
  }
}

// * Specific to the "Set Tablerone as" feature
// * The existing class gave a super weird result
// * The border property did not work
table.table tr.highlight_mode_set_tablerone_as {
  outline: 2px solid transparent;
  border-radius: 10px;
  animation-name: blue-outline-fadeout !important;
  animation-duration: 8s !important;
  animation-iteration-count: 1 !important;
}

@keyframes blue-outline-fadeout {
  0% {
    outline-color: transparent;
  }
  1% {
    outline-color: var(--color-blue);
  }
  90% {
    outline-color: var(--color-blue);
  }
  100% {
    outline-color: transparent;
  }
}

table.table {
  border: none;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  padding: 0;
  margin: 0;

  &--highlighted_dangerous {
    padding: 8px 0;
    border: 2px solid #e01f1f;
    border-radius: 8px;
  }

  tr,
  td {
    border: none;
  }

  td {
    small {
      font-size: 11px;
      color: #8d8d8d;
    }
  }

  tr {
    &.highlight_mode {
      > td:first-child {
        padding-right: 0px; /* applied to div instead */
      }

      div {
        border: 2px solid transparent;
        /* box-shadow: 0px 0px 5px var(--color-blue); */
        /* transition: all 1s ease-in-out; */
        animation-name: blue-border-fadeout;
        animation-duration: 8s;
        animation-iteration-count: 1;
      }

      div.left {
        padding-right: 16px; /* instead of td:first child */
        border-right: 0 !important;
        border-radius: 10px 0 0 10px;
        -moz-border-radius: 10px 0 0 10px;
      }

      div.left.top {
        border-radius: 10px 0 0 0px;
        -moz-border-radius: 10px 0 0 0px;
        border-bottom: 0 !important;
      }

      div.left.bottom {
        border-radius: 0 0 0 10px;
        -moz-border-radius: 0 0 0 10px;
        border-top: 0 !important;
        padding-top: 2px;
        margin-top: -2px;
        position: relative;
      }

      div.right {
        border-left: 0 !important;
        border-radius: 0 10px 10px 0;
        -moz-border-radius: 0 10px 10px 0;

        /* 1px bug */
        position: relative;
        padding-left: 1px;
        left: -1px;
      }

      div.right.top {
        border-radius: 0 10px 0 0px;
        -moz-border-radius: 0 10px 0 0px;
        border-bottom: 0 !important;
      }

      div.right.bottom {
        border-radius: 0 0 10px 0;
        -moz-border-radius: 0 0 10px 0;
        border-top: 0 !important;
        padding-top: 2px;
        margin-top: -2px;
        position: relative;
      }
    }
  }

  > tr {
    &.short {
      line-height: 24px;
    }

    font-size: 14px;
    line-height: 40px; /* 16px (line-height in design) + 12 (half on the top) + 12 (half on the bottom */

    > td:first-child {
      width: 160px;
      padding-right: 16px;
      text-align: right;
      color: #8d8d8d;
      vertical-align: middle;
    }

    > td:nth-of-type(2) {
      text-align: left;
      width: auto;
      display: flex;
      align-items: center;
    }
  }

  table.table--set_tablerone_as {
    border-spacing: 0;

    tr {
      &.short {
        line-height: 8px;
        height: 24px;

        td {
          vertical-align: top;
        }
      }

      td {
        text-align: left;

        &.center {
          text-align: center;
        }
      }
    }
  }
}

.button-settings-close {
  z-index: 1100001;
  position: fixed;

  &:hover {
    cursor: pointer;
  }
}

#settings--donate {
  border: 2px solid var(--color-hr-grey);
  font-size: 14px;
  padding: 20px;
  margin: 40px 0;
  border-radius: 10px;

  p {
    padding: 0;
    margin: 0;
  }
}

#settings--final_decision_buttons,
#import--final_decision_buttons,
#import--loading-file {
  text-align: center;
  /*padding-top: 20px;*/
  /*margin-top: 40px; !* because we have box shadow *!*/
  padding-bottom: 40px;

  position: sticky;
  bottom: 80px;
  background: rgba(var(--color-muted-background-rgb), 1);
  box-shadow: 10px 10px 20px 20px rgba(var(--color-muted-background-rgb), 1);

  button {
    display: inline-block;

    &:first-child {
      margin-right: 24px;
    }
  }
}

#import--final_decision_buttons {
  .import_field--buttons {
    margin-top: 40px;

    button + button {
      margin-left: 24px;
    }

    &.import_field--buttons__notification {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      font-size: 13px;

      div {
        margin-right: 16px;
      }
    }
  }
}

#import--loading-file {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 13px;

  span {
    margin-top: 40px;
  }
}

.import_list {
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-top: 128px;
  line-height: 80px;
  height: 80px;
  overflow-x: auto;
  white-space: nowrap;

  .import_list--element {
    display: flex;
    font-size: 16px;
    color: var(--color-blue);
    padding: 0 15px;
    cursor: pointer;
    gap: 8px;
    align-items: center;

    &.import_list--element__selected {
      color: var(--color-text-black);
      white-space: nowrap;
    }
  }
}

.import_field {
  textarea {
    font-size: 13px;
    line-height: 18px;
    color: var(--color-text-black);
    width: 100%;
    height: 480px;
    background: var(--color-input-background);
  }
}

#toolbar_button {
  display: flex;
  align-items: center; //vertically center

  line-height: 1.2em; //override the positioning

  #toolbar_button--image {
    margin-right: 16px;
  }

  #toolbar_button--content {
    #toolbar_button--content--top {
      display: flex;

      .form-group {
        display: inline-block;

        label {
          font-weight: bold;
        }

        input {
          margin-left: 0;
        }

        &:first-child {
          margin-right: 24px;
        }
      }
    }

    #toolbar_button--content--bottom {
      color: #8d8d8d;
      font-size: 12px;
      margin-top: 20px;

      a {
        color: #8d8d8d;
        text-decoration: underline;

        transition: color 0.4s ease-in-out;

        &:hover {
          color: var(--color-blue);
        }
      }
    }
  }
}

// * Same base as the id-based version above + some modifications.
// * Behavior-selection rules are found right after this set.
.toolbar_button {
  display: flex;
  align-items: center;

  line-height: 1.2em;

  .toolbar_button--content {
    .toolbar_button--content--top {
      display: flex;

      .form-group {
        display: inline-block;

        label {
          font-weight: bold;
        }

        input {
          margin-left: 0;
        }

        &:first-child {
          margin-right: 24px;
        }
      }
    }

    .toolbar_button--content--bottom {
      color: #8d8d8d;
      font-size: 12px;
      margin-top: 20px;

      // * Currently only used for behavior-selection,
      // * might be useful for organisation-selection as well.
      // * Hence, kept as reference here instead of in the behavior-selection rules.
      // * Note: at that point the development might have switched to React & Tailwind.
      &.addendum {
        margin-top: 0.5rem;
        display: grid;

        & .key-combo {
          color: var(--color-text-black);
        }
      }

      a {
        color: #8d8d8d;
        text-decoration: underline;

        transition: color 0.4s ease-in-out;

        &:hover {
          color: var(--color-blue);
        }
      }
    }
  }
}

.behavior-selection__button-container {
  display: flex;
  gap: 1rem;

  .behavior-selection__button-grid {
    display: grid;
  }

  .behavior-selection__image {
    width: 186px;
    margin-bottom: 1rem;
  }
}

#sleepEnabledInputField {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  width: 70px;
}

@keyframes blue-border-fadeout {
  0% {
    border-color: transparent;
  }
  1% {
    border-color: var(--color-blue);
  }
  90% {
    border-color: var(--color-blue);
  }
  100% {
    border-color: transparent;
  }
}

#toolbar_button--image {
  height: 104px;
  width: 104px;
}

::placeholder {
  color: #8d8d8d;
}

.settings--section {
  display: flex;
  flex-direction: column;

  .import-icon {
    vertical-align: middle;
    margin-right: 8px;
    border: none;
    background: none;
    cursor: pointer;
  }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 450px;
  overflow: hidden;
  margin-left: 10px;

  span {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
