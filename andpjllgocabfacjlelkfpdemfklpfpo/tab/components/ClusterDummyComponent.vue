<template>
  <div class="collection__dummy">
    <div class="window--header--container">
      <div class="window--header">
        <div class="window--header--title">
          <label class="window--header--title--label">
            <span v-if="isDummyBrand">{{ title }}</span>
            <span
              v-else
              class="window--header--title--label---dummy"
              :style="{ width: Math.floor(Math.random() * 250 + 150) + 'px' }"
            ></span>
          </label>
        </div>

        <div class="window--header--buttons--container">
          <div class="window--header--buttons--gradient"></div>

          <div class="window--header--buttons">
            <template v-if="isDummyBrand === false">
              <template v-for="index in Math.floor(Math.random() * 1) + 2">
                <span class="button--square---dummy"></span>
              </template>

              <template v-for="index in Math.floor(Math.random() * 2) + 1">
                <span
                  class="button--normal---dummy"
                  :style="{
                    width: Math.floor(Math.random() * 50 + 100) + 'px'
                  }"
                ></span>
              </template>

              <template v-for="index in Math.floor(Math.random() * 1)">
                <span class="button--square---dummy"></span>
              </template>
            </template>
            <template v-else>
              <button
                @click="importBookmarks"
                class="button--normal icon--close"
              >
                <!--                                            <img src="/icons/ui/blue-import-data.svg">-->
                <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                  <g
                    stroke="#0F62FE"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <path d="M.5 7.5h10M6.5 3.5l4 4-4 4" />
                    <path
                      d="M.5 4.5v-3a1 1 0 011-1h13a1 1 0 011 1v12a1 1 0 01-1 1h-13a1 1 0 01-1-1v-3"
                    />
                  </g>
                </svg>
                <span>Import bookmarks</span>
              </button>
              <button
                @click="openDummyBrand"
                class="button--normal icon--close"
              >
                <!--                                            <img src="/icons/ui/blue-import-data.svg">-->
                <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                  <g
                    stroke="#0F62FE"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <path d="M.5 7.5h10M6.5 3.5l4 4-4 4" />
                    <path
                      d="M.5 4.5v-3a1 1 0 011-1h13a1 1 0 011 1v12a1 1 0 01-1 1h-13a1 1 0 01-1-1v-3"
                    />
                  </g>
                </svg>
                <span>Import data</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="window--content">
      <div class="window--screenshot">
        <div class="window--screenshot--container">
          <div class="window--screenshot--container--image">
            <div
              class="window--screenshot--image"
              :class="[
                { 'window--screenshot--image__brand': isDummyBrand },
                'window--screenshot--image__brand__' + dummyBrand
              ]"
              :style="{
                'background-image': 'url(\'' + backgroundImage + '\')'
              }"
            ></div>
          </div>
        </div>
      </div>
      <div class="window--tabs">
        <table class="tab-table">
          <tbody>
            <template v-for="index in randomUrls">
              <tr class="tab">
                <td class="tab-favicon center">
                  <span class="tab-favicon---dummy"></span>
                </td>
                <td class="tab-title-url left">
                  <span
                    class="tab-title---dummy"
                    :style="{
                      width: Math.floor(Math.random() * 50 + 20) + '%'
                    }"
                  ></span>
                  <span
                    class="tab-url---dummy"
                    :style="{
                      width: Math.floor(Math.random() * 10 + 10) + '%'
                    }"
                  ></span>
                </td>
                <td class="tab-buttons center">
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
                </td>
              </tr>
            </template>
            <!-- this is to add missing height if neccessary -->
            <template v-if="randomUrls < 5">
              <tr style="visibility: hidden" v-for="index in 5 - randomUrls">
                <td></td>
              </tr>
            </template>
          </tbody>

          <tfoot>
            <tr>
              <td colspan="3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import TabComponent from './TabComponent'

export default {
  name: 'ClusterDummyComponent',
  props: {
    // clusterTitle: String,
    dummyBrand: String,
    tabNumberProp: {
      default: -1,
      type: Number
    }
  },
  components: {
    // 'tab-component': TabComponent,
  },
  mounted() {
    if (this.tabNumberProp === -1) {
      this.randomUrls = Math.floor(Math.random() * 3) + 2
    } else {
      this.randomUrls = this.tabNumberProp >= 5 ? 5 : this.tabNumberProp
    }

    if (this.dummyBrand) {
      this.isDummyBrand = true

      if (this.dummyBrand === 'import') {
        this.backgroundImage = '/icons/import_dummy_collection@2x.png'
        this.title = 'Import existing sessions'
      }
    }
  },
  data: () => {
    return {
      isDummyBrand: false,
      randomUrls: 3,
      backgroundImage: '/icons/ui/empty-thumbnail__dummy.svg',
      title: ''
    }
  },
  methods: {
    openDummyBrand() {
      const self = this
      this.$emit('buttonClicked', self.dummyBrand)
    },
    importBookmarks() {
      const self = this
      this.$emit('buttonClicked2', self.dummyBrand)
    }
  }
}
</script>

<style lang="scss">
.collection__dummy {
  .window--screenshot--image {
    &.window--screenshot--image__brand {
      background-size: auto;
      background-position: center center;
      background-size: contain;
    }
  }

  .window--screenshot--image__brand__onetab {
    background-size: 116px 28px !important;
  }

  .window--screenshot--image__brand__sessionbuddy {
    background-size: 164px 27px !important;
  }
}
</style>
