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
    <div
      id="modal_window--main"
      :class="{
        'modal_window--view_mode': mode === 'view'
      }"
      @click.stop
    >
      <div id="modal_window--header">
        <div id="modal_window--header--icon">
          <img :src="favIcon" />
        </div>
        <h1><strong>Notes:</strong> {{ modalTitle }}</h1>
        <button
          id="modal_window--header--close_button"
          @click.stop="closeModalWindow()"
          class="button--main"
        >
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
        </button>
      </div>
      <div class="modal_window--content">
        <div class="modal_window--element" v-if="mode === 'edit'">
          <textarea
            placeholder="Start typing to enter a note for this page..."
            v-model="note"
            ref="noteInput"
            rows="5"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="saveNote"
          ></textarea>
        </div>
        <div
          class="modal_window--element modal_window--element--edit"
          v-if="mode === 'view'"
          @click="goToEditMode"
        >
          <span>
            {{ note }}
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 15.5h14M10.5.5l3 3L5 12l-4 1 1-4z"
                stroke="#0F62FE"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div class="modal_window--footer" v-show="mode === 'edit'">
        <button
          class="button--normal icon--edit_tabs_mode--delete_selected_tabs"
          @click="closeModalWindow()"
        >
          <!-- e.remove.svg -->
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <g
              stroke="#0F62FE"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              fill-rule="evenodd"
            >
              <circle cx="8" cy="8" r="7.5" />
              <path d="M2.697 13.303L13.303 2.697" />
            </g>
          </svg>
          <span>Cancel</span>
        </button>
        <button
          class="button--normal icon--edit_tabs_mode--delete_selected_tabs"
          @click="saveNote()"
        >
          <!-- e.remove.svg -->
          <svg width="16" height="13" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 8.5L5.5 13 15 .5"
              stroke="#0F62FE"
              stroke-linecap="square"
              fill="none"
              fill-rule="evenodd"
            />
          </svg>
          <span>Save changes</span>
        </button>
      </div>
      <div class="modal_window--footer" v-show="mode === 'view'">
        <button
          class="button--mini button--mini--red icon--edit_tabs_mode--delete_selected_tabs"
          @click="deleteNote()"
        >
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <g
              stroke="#DA1E28"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M.5 2.5h11M4.5 2.5v-2h3v2M9.5 4.5v6a1 1 0 01-1 1h-5a1 1 0 01-1-1v-6"
              />
            </g>
          </svg>
          <span>Delete note</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Library from '../../../library/library'
import { mapGetters } from 'vuex'

export default {
  name: 'EditNotesModal',
  components: {},
  props: {},
  data: () => {
    return {
      mode: 'edit', // ["edit", "view"]
      modalTitle: '',
      tabUid: null,
      clusterUid: null,
      title: '',
      note: '',
      originalNote: '',
      tabTitle: '',
      tabUrl: '',
      clusterTitle: ''
    }
  },
  mounted() {
    const self = this

    // track opening edit notes
    this.sendMessage({
      command: 'tracking.add.event',
      eventName: 'editNotesPopupOpened'
    })

    // read the data from vuex
    const tabNoteData = this.$store.getters.getTabNoteEdit
    this.tabUid = tabNoteData.tabUid
    this.clusterUid = tabNoteData.clusterUid
    this.originalNote = tabNoteData.originalNote
    this.note = tabNoteData.originalNote
    this.tabTitle = tabNoteData.tabTitle
    this.tabUrl = tabNoteData.tabUrl
    this.clusterTitle = tabNoteData.clusterTitle
    this.mode = tabNoteData.mode

    this.modalTitle = Library.trunc(tabNoteData.tabTitle, 33, '..')

    // focus the input field
    this.$nextTick(() => {
      if (self.mode === 'edit') {
        self.focusAndSelect()
      }
    })
  },
  methods: {
    resetToDefaultOptions() {
      this.tabUid = null
      this.clusterUid = null
      this.title = ''
      this.note = ''
      this.originalNote = ''
      this.tabTitle = ''
      this.tabUrl = ''
      this.clusterTitle = ''
    },
    focusAndSelect() {
      this.$refs.noteInput.focus()
      // this.$refs.noteInput.setSelectionRange(0, this.$refs.noteInput.value.length)
      this.$refs.noteInput.setSelectionRange(
        this.$refs.noteInput.value.length,
        this.$refs.noteInput.value.length
      )
    },
    goToEditMode() {
      const self = this
      this.mode = 'edit'
      this.$nextTick(() => {
        self.focusAndSelect()
      })
    },
    closeModalWindow() {
      this.resetToDefaultOptions()
      this.$emit('closeModalWindow')
    },
    sendMessage(message, callback) {
      // for sending message to background.js
      message.messageSenderSource = 'editnotesmodal'
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
    newline() {
      this.note = `${this.note}\n`
    },
    saveNote() {
      const self = this
      const message = {
        command: 'tab.note-save',
        clusterUid: self.getTabNoteEdit.clusterUid,
        tabUid: self.getTabNoteEdit.tabUid,
        note: self.note
      }

      this.sendMessage(message, function () {
        self.closeModalWindow()
      })
    },
    deleteNote() {
      const self = this
      const message = {
        command: 'tab.note-delete',
        clusterUid: self.getTabNoteEdit.clusterUid,
        tabUid: self.getTabNoteEdit.tabUid
      }

      this.sendMessage(message, function () {
        self.closeModalWindow()
      })
    }
  },
  computed: {
    ...mapGetters({
      getTabNoteEdit: 'getTabNoteEdit'
    }),
    shortenedTitle() {
      return Library.trunc(this.title, 30)
    },
    favIcon() {
      return Library.getFavIconFromUrl(this.tabUrl)
    }
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

    margin: 128px 0;

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

      #modal_window--header--icon {
        position: absolute;
        left: 20px; /* 28 - (10/2) */
        /* padding: 10px; */
        display: flex;

        img {
          height: 24px;
          width: 24px;
        }
      }

      #modal_window--header--close_button {
        right: 20px; /* 28 - (10/2) */
        top: 12px;
      }
    }

    .modal_window--content + .modal_window--content {
      border-top: none;
    }

    .modal_window--content {
      border-top: 1px solid var(--color-hr-grey);
      //border-bottom: 1px solid var(--color-border);
      padding: 24px 24px 0px 24px;

      max-height: calc(
        100vh - 430px
      ); //174px is top+bottom stuff inside modal, 128px * 2 is margin
      overflow-y: scroll;

      .modal_window--element {
        display: flex;

        &.modal_window--element--edit {
          span {
            //same as textarea
            white-space: pre-wrap;
            word-wrap: break-word;

            cursor: pointer;

            text-align: left;
            transition: all 0.15s ease-out;
            font-size: 14px;
            line-height: 20px;
            color: var(--color-text-black);
            width: 100%;
            height: auto;
            box-sizing: border-box;
            border: 1px solid transparent;
            padding: 4px 8px;

            > svg {
              opacity: 0;
              padding-left: 8px;
              vertical-align: text-bottom;
              transition: all 0.3s ease-out;
              cursor: pointer;
            }

            &:hover {
              > svg {
                opacity: 1;
              }
            }
          }
        }

        &.modal_window--element--main {
          height: 72px;
        }

        .modal_window--element--left {
          flex: 0 1 72px;
          display: flex;
          align-items: center;
          justify-content: center;
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
              color: #000000;
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
            color: #000000;
            letter-spacing: 0;
            margin: 0;
          }

          p {
            font-size: 12px;
            color: #8d8d8d;
            letter-spacing: 0;
            margin: 0;
          }
        }
      }
    }

    &.modal_window--view_mode {
      .modal_window--footer {
        justify-content: flex-start;

        button {
          margin: 0;
        }
      }
    }
  }

  .modal_window--footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 24px 8px 24px;

    height: 64px;

    .modal_window--element {
      display: flex;
    }
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
  font-weight: 400;
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
  max-height: calc(
    100vh - 430px
  ); //174px is top+bottom stuff inside modal, 128px * 2 is margin
  transition: all 0.15s ease-out;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-black);
  background: var(--color-input-background);
  width: 100%;
  /* height: 64px; */
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
  }
}
</style>
