<template>
  <div id="modal_window--container" @click="closeModalWindow">
    <!--
      <div id="version">
        <a
            :href="TABLERONE_URL_PARTICULAR_RELEASE_NOTE"
            target="_blank"
        >{{version}}</a>
      </div>
      <div id="modal_window--footer">
          <b>© 2020 about:blank studio</b>
          ・
          <a
                  :href="termsOfServiceUrl"
                  target="_blank"
          >Terms of Service</a>
          ・
          <a
                  :href="privacyPolicyUrl"
                  target="_blank"
          >Privacy policy</a>
          ・
          <a
                  :href="releaseNotesUrl"
                  target="_blank"
          >Changelog</a>
      </div>
    -->

    <!-- main window of settings -->
    <div id="modal_window--main" @click.stop>
      <div id="modal_window--header">
        <h1>Share: <span v-html="shortenedTitle"></span></h1>
        <div
          id="modal_window--header--close_button"
          @click.stop="closeModalWindow()"
          class="button--main"
        >
          <!--<img src="/icons/ui/share/btn-sidebar-close.svg">-->
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
            <g
              stroke="#000"
              stroke-linecap="square"
              fill="none"
              fill-rule="evenodd"
            >
              <path d="M14.5.5l-14 14M14.5 14.5L.5.5" />
            </g>
          </svg>
        </div>
      </div>
      <div class="modal_window--content">
        <div class="modal_window--element modal_window--element--main">
          <div class="modal_window--element--left">
            <svg width="23" height="23" xmlns="http://www.w3.org/2000/svg">
              <g
                stroke="#0F62FE"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M11.5.5v22M.5 11.5h22" />
                <ellipse cx="11.5" cy="11.5" rx="5.5" ry="11" />
                <circle cx="11.5" cy="11.5" r="11" />
              </g>
            </svg>
          </div>
          <div class="modal_window--element--right">
            <div class="toggle-button--container">
              <toggle-button
                v-model="sharePublic"
                :color="{
                  checked: '#6FDC8C',
                  unchecked: '#F4F4F4',
                  disabled: '#F4F4F4'
                }"
                :sync="true"
                :labels="false"
                :width="44"
                :height="24"
                :margin="1"
              />
            </div>
            <h2>Publish to the web</h2>
            <p>Anyone can view it via direct link or search engines</p>
          </div>
        </div>
        <transition name="slide">
          <div class="modal_window--element" v-if="sharePublic">
            <div class="modal_window--element--left"></div>
            <div class="modal_window--element--right">
              <div class="modal_window--element--right--inline">
                <p class="what_about">What is this collection about?</p>
                <span class="counter">{{ sharePublicDescriptionCounter }}</span>
              </div>
              <textarea
                placeholder="Your description will be visible on the page and social media cards"
                v-model="sharePublicDescription"
                ref="sharePublicDescription"
                maxlength="200"
                rows="3"
              ></textarea>
              <div
                class="modal_window--element--right--inline modal_window--element--right--inline--padding"
              >
                <div>
                  <select v-model="sharePublicExpiresTime" style="width: 250px">
                    <option value="5_min">
                      Take offline after 5 minutes (preview)
                    </option>
                    <option value="1_day">Take offline after 1 day</option>
                    <option value="1_week">Take offline after 1 week</option>
                    <option value="1_month">Take offline after 1 month</option>
                  </select>
                  <a
                    :href="whyDoCollectionsGoOfflineUrl"
                    target="_blank"
                    class="modal_window--element--right--link"
                  >
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle
                          stroke="#0F62FE"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          cx="8"
                          cy="8"
                          r="7.5"
                        />
                        <circle
                          fill="#0F62FE"
                          fill-rule="nonzero"
                          cx="8.003"
                          cy="12"
                          r="1"
                        />
                        <path
                          d="M6.5 3.577c.953-.86 3.018-.845 3.423.635C10.453 6.134 8 6.142 8 9"
                          stroke="#0F62FE"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </a>
                </div>
                <button
                  class="button__save"
                  :disabled="!canShare"
                  @click="share()"
                  ref="sharePublicButton"
                >
                  Publish collection
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="modal_window--content">
        <div class="modal_window--element modal_window--element--main">
          <div class="modal_window--element--left">
            <!--            <img src="/icons/ui/share/icon-web-hyperlink.svg">-->
            <svg width="23" height="19" xmlns="http://www.w3.org/2000/svg">
              <g
                stroke="#0F62FE"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21.145 7.499A3.99 3.99 0 0122.5 10.5v4a4 4 0 01-4 4h-9a4 4 0 01-4-4v-4a4 4 0 014-4h4"
                />
                <path
                  d="M1.855 11.501A3.99 3.99 0 01.5 8.5v-4a4 4 0 014-4h9a4 4 0 014 4v4a4 4 0 01-4 4h-4"
                />
              </g>
            </svg>
          </div>
          <div class="modal_window--element--right">
            <div class="toggle-button--container">
              <toggle-button
                v-model="shareUnlisted"
                :color="{
                  checked: '#6FDC8C',
                  unchecked: '#F4F4F4',
                  disabled: '#F4F4F4'
                }"
                :sync="true"
                :labels="false"
                :width="44"
                :height="24"
                :margin="1"
              />
            </div>
            <h2>Open to anyone who receives the link</h2>
            <p>Only people with the link can see it (unlisted)</p>
          </div>
        </div>
        <transition name="slide">
          <div class="modal_window--element" v-if="shareUnlisted">
            <div class="modal_window--element--left"></div>
            <div class="modal_window--element--right">
              <div class="modal_window--element--right--inline">
                <p class="what_about">What is this collection about?</p>
                <span class="counter">{{
                  shareUnlistedDescriptionCounter
                }}</span>
              </div>
              <textarea
                placeholder="Your description will be visible on the page and social media cards"
                v-model="shareUnlistedDescription"
                ref="shareUnlistedDescription"
                maxlength="200"
                rows="3"
              ></textarea>
              <div
                class="modal_window--element--right--inline modal_window--element--right--inline--padding"
              >
                <div>
                  <select
                    v-model="shareUnlistedExpiresTime"
                    style="width: 250px"
                  >
                    <option value="5_min">
                      Take offline after 5 minutes (preview)
                    </option>
                    <option value="1_day">Take offline after 1 day</option>
                    <option value="1_week">Take offline after 1 week</option>
                    <option value="1_month">Take offline after 1 month</option>
                  </select>
                  <a
                    :href="whyDoCollectionsGoOfflineUrl"
                    target="_blank"
                    class="modal_window--element--right--link"
                  >
                    <svg
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="none" fill-rule="evenodd">
                        <circle
                          stroke="#0F62FE"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          cx="8"
                          cy="8"
                          r="7.5"
                        />
                        <circle
                          fill="#0F62FE"
                          fill-rule="nonzero"
                          cx="8.003"
                          cy="12"
                          r="1"
                        />
                        <path
                          d="M6.5 3.577c.953-.86 3.018-.845 3.423.635C10.453 6.134 8 6.142 8 9"
                          stroke="#0F62FE"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </a>
                </div>
                <button
                  class="button__save"
                  :disabled="!canShare"
                  @click="share()"
                  ref="shareUnlistedButton"
                >
                  Publish collection
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="modal_window--content">
        <div class="modal_window--element modal_window--element--main">
          <div class="modal_window--element--left">
            <!--            <img src="/icons/ui/share/icon-users-mm.svg">-->
            <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
              <g
                stroke="#0F62FE"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M18.5 19.5h4v-4.323a1 1 0 00-.629-.928l-3.742-1.5a1 1 0 01-.629-.926v-.878a3.982 3.982 0 002-3.445v-2a4 4 0 00-6-3.465M13.871 15.249l-3.742-1.5a1 1 0 01-.629-.926v-.878a3.982 3.982 0 002-3.445v-2a4 4 0 10-8 0v2a3.982 3.982 0 002 3.445v.878a1 1 0 01-.629.928l-3.742 1.5a1 1 0 00-.629.926V19.5h14v-3.323a1 1 0 00-.629-.928z"
                />
              </g>
            </svg>
          </div>
          <div class="modal_window--element--right">
            <div class="toggle-button--container">
              <toggle-button
                v-model="shareSpecific"
                :color="{
                  checked: '#6FDC8C',
                  unchecked: '#F4F4F4',
                  disabled: '#F4F4F4'
                }"
                :sync="true"
                :labels="false"
                :width="44"
                :height="24"
                :margin="1"
              />
            </div>
            <h2>Share with specific people</h2>
            <p>Only specified individuals can see it</p>
          </div>
        </div>
        <div class="modal_window--element" v-if="shareSpecific">
          <div class="modal_window--element--left"></div>
          <div class="modal_window--element--right" style="margin-bottom: 24px">
            <img
              src="/icons/ui/share/credit-locked.svg"
              style="margin: 36px auto 20px auto"
            />
            <p>
              If you would like to see this feature developed
              <a @click="donateClick()" :href="donateUrl" target="_blank"
                >please consider donating.</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Library from '../../../library/library'

import { ToggleButton } from 'vue-js-toggle-button'
import {
  TABLERONE_URL_DONATION_VOTE_AND_SUGGEST,
  TABLERONE_URL_WHY_DO_COLLECTIONS_GO_OFFLINE
} from '../../../config'

const TOAST_DURATION = 7000

export default {
  name: 'ShareModal',
  components: {
    ToggleButton
  },
  props: {
    title: String,
    clusterUid: Number // not string anymore
  },
  data: () => {
    return {
      sharePublic: false,
      sharePublicDescription: '',
      sharePublicExpiresTime: '1_month',
      shareUnlisted: false,
      shareUnlistedDescription: '',
      shareUnlistedExpiresTime: '1_month',
      shareSpecific: false,

      donateUrl: '',
      whyDoCollectionsGoOfflineUrl: ''
    }
  },
  mounted() {
    this.donateUrl = TABLERONE_URL_DONATION_VOTE_AND_SUGGEST
    this.whyDoCollectionsGoOfflineUrl =
      TABLERONE_URL_WHY_DO_COLLECTIONS_GO_OFFLINE
    this.sendMessage({
      command: 'tracking.add.event',
      eventName: 'shareCollectionPopupOpened'
    })
  },
  methods: {
    resetToDefaultOptions() {
      this.sharePublic = false
      this.sharePublicDescription = ''
      this.sharePublicExpiresTime = '1_month'
      this.shareUnlisted = false
      this.shareUnlistedDescription = ''
      this.shareUnlistedExpiresTime = '1_month'
      this.shareSpecific = false

      this.$refs.sharePublicButton = 'Publish collection'
      this.$refs.shareUnlistedButton = 'Publish collection'
    },
    donateClick() {
      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'donateClick',
        eventProps: { source: 'share' }
      })
    },
    closeModalWindow() {
      this.resetToDefaultOptions()
      this.$emit('closeModalWindow')
    },
    sendMessage(message, callback) {
      // for sending message to background.js
      message.messageSenderSource = 'sharemodal'
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
        console.log('sendMessage problem', e.toString())
      }
    },
    share() {
      const self = this

      let comment = ''
      let expires = '1_month'
      let listing = 'unlisted'
      let button = this.$refs.sharePublicButton
      if (this.sharePublic) {
        comment = this.sharePublicDescription
        expires = this.sharePublicExpiresTime
        listing = 'public'
        button = this.$refs.sharePublicButton
      } else if (this.shareUnlisted) {
        comment = this.shareUnlistedDescription
        expires = this.shareUnlistedExpiresTime
        listing = 'unlisted'
        button = this.$refs.shareUnlistedButton
      }
      const message = {
        command: 'api.save.collection',
        clusterUid: self.clusterUid,
        comment,
        expires_setting: expires,
        listing
      }

      this.sendMessage({
        command: 'tracking.add.event',
        eventName: 'shareCollection',
        eventProps: {
          comment: comment.length,
          expires: self.expires,
          listing
        }
      })

      button.innerHTML = 'Publishing'
      button.disabled = true

      this.sendMessage(message, function (responseObject) {
        setTimeout(function () {
          // add notification (toast)
          self.$emit('notifyAboutShare', {
            title: self.title,
            shareUid: responseObject
          })

          // revert this modal back to defaults
          self.closeModalWindow()
        }, 500)
      })
    }
  },
  computed: {
    displayDateFunction() {
      return Library.getDateDisplay(new Date(), this.tableroneDateFormat, true)
    },
    canShare() {
      return this.sharePublic || this.shareUnlisted
    },
    sharePublicDescriptionCounter() {
      return 200 - this.sharePublicDescription.length
    },
    shareUnlistedDescriptionCounter() {
      return 200 - this.shareUnlistedDescription.length
    },
    shortenedTitle() {
      return Library.trunc(this.title, 28)
    }
  },
  watch: {
    sharePublic: {
      // when this changes, trigger import mode and emit reset of this value
      handler(newValue) {
        if (newValue) {
          const self = this
          this.$nextTick(() => {
            self.$refs.sharePublicDescription.focus() // focus the description field
          })

          // this.sharePublic = false
          this.shareUnlisted = false
          this.shareSpecific = false
        }
      }
    },
    shareUnlisted: {
      // when this changes, trigger import mode and emit reset of this value
      handler(newValue) {
        if (newValue) {
          const self = this
          this.$nextTick(() => {
            self.$refs.shareUnlistedDescription.focus() // focus the description field
          })
          this.sharePublic = false
          // this.shareUnlisted = false
          this.shareSpecific = false
        }
      }
    },
    shareSpecific: {
      // when this changes, trigger import mode and emit reset of this value
      handler(newValue) {
        if (newValue) {
          this.sharePublic = false
          this.shareUnlisted = false
          // this.shareSpecific = false

          this.sendMessage({
            command: 'tracking.add.event',
            eventName: 'shareCollectionShareSpecific'
          })
        }
      }
    }
    // sharePublic: false,
    // shareUnlisted: false,
    // shareSpecific: false,
  }
}
</script>

<style scoped lang="scss">
@import '../../colors';

#modal_window--container {
  height: 100%;
  width: 100%;
  z-index: 1100000;
  top: 0;
  position: absolute;
  margin-bottom: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  #modal_window--main {
    max-width: 560px;
    width: 50%;
    min-width: 480px;

    height: auto;
    background: var(--color-background-modal);
    box-shadow: 0 8px 80px 0 rgba(0, 0, 0, 0.15);
    border-radius: 10px;

    #modal_window--header {
      text-align: center;
      position: relative;
      height: 72px;
      line-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal_window--content + .modal_window--content {
      border-top: none;
    }

    .modal_window--content {
      border-top: 1px solid var(--color-border);
      border-bottom: 1px solid var(--color-border);
      //padding: 24px 0;

      .modal_window--element {
        display: flex;

        &.modal_window--element--main {
          height: 72px;
        }

        .modal_window--element--left {
          flex: 0 1 72px;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            g {
              stroke: var(--color-blue);
            }
          }
        }

        .modal_window--element--right {
          &.modal_window--element--right--padding {
            padding-bottom: 24px;
          }

          .modal_window--element--right--inline {
            display: flex;
            justify-content: space-between;
            flex-direction: row;
            width: 100%;
            padding-bottom: 4px;

            .what_about {
              font-size: 13px;
              color: var(--color-text-black);
              letter-spacing: 0;
            }

            .counter {
              font-size: 13px;
              color: #8d8d8d;
              letter-spacing: 0;
              text-align: right;
            }

            &.modal_window--element--right--inline--padding {
              padding-top: 16px;
              padding-bottom: 32px;
            }
          }

          text-align: left;
          flex: 0 1 calc(100% - 72px);
          padding-right: 24px;
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          .toggle-button--container {
            position: absolute;
            right: 24px;
            top: 24px;
          }

          h2 {
            font-weight: 400;
            font-size: 14px;
            color: var(--color-text-black);
            letter-spacing: 0;
            margin: 0;
          }

          p {
            font-size: 12px;
            color: var(--color-grey-links);
            letter-spacing: 0;
            margin: 0;
          }
        }
      }
    }

    &.modal_window--view_mode {
      #modal_window--footer {
        align-items: flex-start;
      }
    }
  }

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

  #modal_window--footer {
    font-size: 11px;
    color: #8d8d8d;
    text-align: center;
    width: 100%;
    padding-bottom: 40px;
    position: fixed;
    bottom: 0px;
    z-index: 1000;
    background: rgba(var(--color-muted-background-rgb), 1);
    box-shadow: 0 0px 40px 0 rgba(0, 0, 0, 0.1);
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
  #modal_window--container {
    /* if scroll we need to scroll across footer */
    margin-bottom: 200px;
  }
}

@media screen and (max-height: 1000px) {
  #modal_window--container {
    /* if scroll we need to scroll across footer */
    margin-bottom: 400px;
  }
}

@media screen and (max-height: 700px) {
  #modal_window--container {
    /* if scroll we need to scroll across footer */
    margin-bottom: 600px;
  }
}

h1 {
  font-size: 20px;
  text-align: center;
  max-width: 80%;
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
    cursor: pointer;
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
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
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

.button-settings-close {
  z-index: 1100001;
  position: fixed;

  &:hover {
    cursor: pointer;
  }
}

textarea {
  transition: all 0.15s ease-out;
  font-size: 13px;
  line-height: 18px;
  color: var(--color-text-black);
  background: var(--color-input-background);
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  border: 1px solid var(--color-grey);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  padding: 4px 8px;

  &:focus {
    border-color: var(--color-blue);
  }
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

.chrome-button {
  //font-family: Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 16px;
  margin-left: 10px;
  min-width: 96px;
  padding: 9px 23px;
  text-align: center;
  vertical-align: middle;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #1a73e8;
  border: 1px solid transparent;
  transition: all 0.3s ease-out;

  &[disabled] {
    background: #e7e8e8;
    color: #a8a8a8;
  }
}

.slide-enter-active {
  -moz-transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s;
  -o-transition-duration: 0.15s;
  transition-duration: 0.15s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 0.15s;
  -webkit-transition-duration: 0.15s;
  -o-transition-duration: 0.15s;
  transition-duration: 0.15s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  height: 162px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  height: 0;
}

.modal_window--element--right--link {
  color: var(--color-blue);

  svg {
    position: relative;
    top: 4px;
    left: 4px;
    g,
    circle,
    path {
      stroke: var(--color-blue);
    }
  }
}

.vue-js-switch {
  .v-switch-core {
    background-color: red; //var(--color-general-background);
  }
}
</style>
