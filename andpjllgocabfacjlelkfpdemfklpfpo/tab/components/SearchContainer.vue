<template>
  <div
    id="search-container"
    :class="{ 'search-container--hidden': !showNavbar }"
  >
    <div
      id="search-container--content"
      :class="{
        focus_input_field: $store.getters.getFocused
      }"
    >
      <!-- left column -->
      <div id="start_new_session">
        <button
          v-if="isSearchMode"
          id="search--back_to_timeline--button"
          class="button--normal"
          @click="searchBackToTimeline"
          style="margin-left: 0"
        >
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
          v-else
          id="start_new_session--button"
          class="button--normal"
          @click="openNewWindow"
        >
          <svg width="21" height="21" xmlns="http://www.w3.org/2000/svg">
            <g
              stroke="#0F62FE"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10.5.5v20M20.5 10.5H.5"></path>
            </g>
          </svg>
          <span
            >New session (<span id="start_new_session--button--shortcut">{{
              keyboardShortcutNewWindow
            }}</span
            >)</span
          >
        </button>
      </div>

      <!-- center column -->
      <div
        id="middle_info"
        v-if="getTags.length > 0 && $store.getters.getFocused === false"
      >
        <svg width="21" height="23" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M12.743 21.914l5.171-5.171a2 2 0 000-2.829L8.5 4.5h-8v8l9.414 9.414a2 2 0 002.829 0zM20.5 10.5l-10-10h-8"
              fill="none"
              stroke="#8D8D8D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle fill="#8D8D8D" cx="5.5" cy="9.5" r="2" />
          </g>
        </svg>
        <span class="middle_info--tag_title">{{ getTags[0].text }}</span>
        <span class="middle_info--tag_title" v-if="getTags.length > 1"
          >&nbsp;+ {{ getTags.length - 1 }} more</span
        >
      </div>

      <!-- right column -->
      <div id="search_fields" v-on-clickaway="ifEmptyFocusOut">
        <div id="search_fields__wrapper">
          <div id="search_fields__right" style="display: flex">
            <div
              id="search-container__search_icon"
              class="button--main"
              @click="focusMainSearchInput"
            >
              <!--<img src="/icons/ui/icon-search-black.svg">-->
              <svg width="21" height="21" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#000000" fill="none" fill-rule="evenodd">
                  <path d="M20.5 20.5l-4-4" stroke-linecap="square" />
                  <circle stroke-linecap="square" cx="8.5" cy="8.5" r="8" />
                  <path d="M4.5 8.5a4 4 0 014-4" />
                </g>
              </svg>
            </div>
          </div>
          <!-- icons/ui/icon-search-grey.svg-->

          <div id="search-container--input_wrapper">
            <input
              v-model.lazy.trim="searchInput"
              v-debounce="500"
              ref="searchQueryInputField"
              type="text"
              @keyup.esc="emptySearchInputAndFocusOut"
              @keyup.enter="forceSearch"
              @focusin="focusIn"
            /><!-- @focusout="focusOut" - causes the button X not being able to click -->
          </div>

          <button
            id="search-container--empty_button"
            :class="{
              'search-container--empty_button__show': searchInput.length > 0,
              'search-container--empty_button__show--fast': fastTransition
            }"
            @click.stop.prevent="emptySearchInputAndFocusOut()"
          >
            <!--<img src="/icons/ui/blue-oval-times.svg">-->
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z"
                fill="#0F62FE"
              />
            </svg>
          </button>

          <!-- :add-onkey="[]" means it can only select from dropdown via keyboard or mouse => no automatic selection from dropdown -->
          <!-- @tags-changed="newTags => searchTags = newTags.map(x => x.text)" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'v-debounce'
import { mixin as clickaway } from 'vue-clickaway'
import Library from '../../library/library'

// import store from '../../store/store'

export default {
  name: 'SearchContainer',
  mixins: [clickaway],
  directives: { debounce },
  props: {
    showNavbar: Boolean,
    /* tab: {
      type: Object,
      required: false,
      validator: function (value) {
        let neededKeys = [
          'url',
          '_uid',
        ]

        neededKeys.forEach(function (key) {
          if (!value.hasOwnProperty(key)) {
            return false
          }
        })

        return true
      }
    }, */
    isSearchMode: Boolean,
    searchBackToTimeline: Function
  },
  data: () => {
    return {
      // isSearchMode: false, //TODO - do this for archive !!!
      fastTransition: false, // we send this in if we input by instant search to speed up transition (looks slow if not)
      keyboardShortcutNewWindow: 'Ctrl+N'
    }
  },
  methods: {
    ifEmptyFocusOut() {
      console.log('is empty focus out')
      this.$nextTick(function () {
        if (this.isEmpty) {
          this.focusOut()
        }
      })
    },
    emptySearchInputAndFocusOut() {
      console.log('emptySearchInputAndFocusOut')
      this.emptySearchInput()
      this.focusOut()
      this.$nextTick(function () {
        this.emptySearchInput()
        this.focusOut()
      })
    },
    emptySearchInput() {
      this.$store.dispatch('updateSearchInput', '')
      this.$store.dispatch('updateQuery', '')
      // this.$store.actions.updateTags([])
      // this.searchTags = []
      // this.sendMessage({ command: 'tracking.add.event', eventName: 'searchEmptyInput' })
    },
    focusMainSearchInput(fastTransition = false) {
      console.log('focusMainSearchInput is SET')
      this.$refs.searchQueryInputField.focus()
      this.focusIn() // force this
      if (fastTransition) {
        this.fastTransition = true
      }
    },
    focusIn() {
      this.$store.dispatch('updateFocused', true)
    },
    focusOut() {
      console.log('focus out')
      // we have to delay this a bit so that the X button stays long enough to press it
      this.$nextTick(function () {
        this.$store.dispatch('updateFocused', false)
        this.fastTransition = false
      })
    },
    openNewWindow() {
      this.$emit('openNewWindow')
    },
    forceSearch() {
      this.$store.dispatch('forceSearch')
    }
  },
  computed: {
    isEmpty() {
      if (this.searchInput === '') {
        return true
      } else {
        return false
      }
    },
    searchQuery: {
      get() {
        return this.$store.getters.getQuery
      }
    },
    getTags: {
      get() {
        return this.$store.getters.getTags
      }
    },
    searchInput: {
      get() {
        return this.$store.getters.getSearchInput
      },
      set(value) {
        // update input
        this.$store.dispatch('updateSearchInput', value)

        // update query
        if (value.length === 0 || value.length >= 3) {
          this.$store.dispatch('updateQuery', value)
        }
      }
    }
  },
  watch: {
    searchQuery: {
      handler: function (newValue) {
        // if (newValue.length > 0) {
        // if not focused yet
        if (this.$store.getters.getFocused === false) {
          this.focusMainSearchInput() // this triggers getFocused to be true
          this.$store.dispatch('updateFocused', true) // just to be safe
        }
        // }
      }
    }
    /*
    searchQuery: {
      handler: function (newValue) {
          this.$emit('searchQueryChange', { query: newValue }) // sending to parent
      }
    },
    */
    /*
    searchTags: {
      handler: function (newValue) {
        this.$emit('searchTagsChange', { tags: newValue }) // sending to parent
      }
    },
    */
  },
  mounted() {
    Library.getOS().then((OS) => {
      if (OS === 'mac') {
        this.keyboardShortcutNewWindow = '⌘+N' // '⌘+R' //⌘  ⇧ ⌃ ⌥
      }
    })
  }
}
</script>

<style lang="scss">
@import '../colors';

#search-container--content {
  height: 80px;
  width: 100%;

  //if it is opened (focused)
  &.focus_input_field {
    #start_new_session {
      opacity: 0;
      overflow: hidden;

      #start_new_session--button {
      }
    }

    #search_fields {
      width: 100%;

      #search-container--input_wrapper {
        border-color: var(--color-search-border);
        background: var(--color-search-background);

        input {
          width: 100%;
          padding-left: 48px;
          padding-right: 14px;
          background: var(--color-search-background);
          color: var(--color-text-black);
        }
      }

      #search-container__search_icon {
        cursor: auto;
        right: 100%;

        /* animate this */
        width: 48px;
        span {
          font-size: 0;
          opacity: 0;
          margin-left: 0;
          width: 0;
        }

        svg {
          position: relative;
          left: 48px;

          g,
          path,
          circle {
            stroke: var(--color-blue);
          }
        }

        border-width: 0; //hide border here
        background: transparent;

        &:active {
          background: transparent;
        }
      }

      /* start showing x icon */
      #search-container--empty_button {
        display: block;
        cursor: pointer;
      }
    }
  }

  #start_new_session {
    position: absolute;
    left: 0;
    top: 0;

    transition: all 0.15s ease-out;
    height: 48px;
    line-height: 48px;
    //flex: 1 1 auto;

    #start_new_session--button {
      margin-left: 0;
      transition: all 0.15s ease-out;

      svg {
        g,
        path,
        circle {
          stroke: var(--color-blue);
        }
      }
    }
  }

  #search_fields {
    position: absolute;
    right: 0;
    top: 0;

    width: 48px;
    //width: 168px;
    height: 48px;

    transition: all 0.15s ease-out;
    //flex: 1 1 auto;

    #search_fields__wrapper {
      position: relative;
    }

    #search-container--input_wrapper {
      transition: all 0.15s ease-out;
      height: 48px;
      border: 2px solid transparent;

      input {
        padding-left: 0px;
        padding-right: 0px;
        border: 0;

        width: 0px;
        max-width: 100%;
        height: 48px;
        line-height: 48px;
        font-size: 20px;

        transition: all 0.15s ease-out;

        box-sizing: border-box; /* to stay inside it's wrapper */

        float: right;

        /*
            background-image: url("/icons/ui/blue-oval-times.svg");
            background-position: center left;
            background-repeat: no-repeat;*/
      }
    }

    #search-container__search_icon {
      width: 48px;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      transition: all 0.15s ease-out;
      position: absolute;
      z-index: 1000000;

      /*
      svg {
        position: relative;
        top: 7px;
      }
      */

      &:hover {
        svg {
          g {
            transition: all 0.15s ease-out;
            stroke: var(--color-blue);
          }

          //for X
          path {
            transition: all 0.15s ease-out;
            stroke: var(--color-blue);
          }

          circle {
            transition: all 0.15s ease-out;
            stroke: var(--color-blue);
          }
        }
      }

      /*
      background-image: url(/icons/ui/icon-search-grey.svg);
      background-repeat: no-repeat;
      background-position: 50% 50%;
      height: 36px;
      width: 36px;
      margin-left: 2px;
      margin-right: 0px;
      content: "";
      */
    }

    #search-container--empty_button {
      background: green;
      display: none;
      position: absolute;
      background: transparent;
      z-index: 1000001;
      right: 2px; /* border */
      top: 2px;
      padding: 15px;
      cursor: auto;
      opacity: 0; /* by default it is hidden */
      transition: all 0.15s ease-out;
      border: 0;
      opacity: 1;
      //border: 3px solid red;

      svg {
        path {
          fill: var(--color-blue);
        }
      }

      &.search-container--empty_button__show {
        cursor: pointer;
        opacity: 1;

        &:hover {
          opacity: 1;
          //background: red;
        }
      }

      &:hover {
        opacity: 1;
        //border-color: green;
      }

      //fast transitions below somewhere else!!! - to expansion of input
      &.search-container--empty_button__show--fast {
        transition-duration: 0;
      }
    }
  }

  #middle_info {
    line-height: 48px;
    font-size: 20px;
    font-weight: 300;
    color: var(--color-grey-button);
    display: flex;
    align-items: center;
    justify-content: center;

    .middle_info--tag_title {
      max-width: 300px;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      //color: #8D8D8D;
    }

    svg {
      margin-right: 16px;
      vertical-align: middle;

      g,
      path,
      circle {
        stroke: var(--color-grey-button);
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  #search-container--content {
    #middle_info {
      font-size: 12px;

      .middle_info--tag_title {
        max-width: 80px;
      }

      svg {
        //height: 16px;
        //width: 15px;
      }
    }
  }
}

@media screen and (max-width: 735px) {
  #search-container--content {
    #middle_info {
      .middle_info--tag_title {
        max-width: 50px;
      }
    }
  }
}

/* set background because tags have to go underneath it */
#search--back_to_timeline--button {
  background: var(--color-general-background);
}
</style>
