<template functional>
  <div class="collection__dummy collection__dummy_minimal">
    <div class="window--header--container">
      <div class="window--header">
        <div class="window--header--title">
          <label class="window--header--title--label">
            <span
              class="window--header--title--label---dummy"
              :style="{ width: Math.floor(Math.random() * 250 + 150) + 'px' }"
            ></span>
          </label>
        </div>
        <div class="window--header--buttons--container">
          <div class="window--header--buttons--gradient"></div>
          <div class="window--header--buttons">
            <template v-for="index in Math.floor(Math.random() * 1) + 2">
              <span class="button--square---dummy"></span>
            </template>

            <template v-for="index in Math.floor(Math.random() * 2) + 1">
              <span
                class="button--normal---dummy"
                :style="{ width: Math.floor(Math.random() * 50 + 100) + 'px' }"
              ></span>
            </template>

            <template v-for="index in Math.floor(Math.random() * 1)">
              <span class="button--square---dummy"></span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="window--content">
      <div class="window--screenshot">
        <div class="window--screenshot--container">
          <div class="window--screenshot--container--image">
            <div class="window--screenshot--image"></div>
          </div>
        </div>
      </div>
      <div class="window--tabs">
        <table class="tab-table">
          <tbody>
            <template
              v-for="index in props.tabNumberProp > 5 ? 5 : props.tabNumberProp"
            >
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
            <template v-if="props.tabNumberProp < 5">
              <tr
                style="visibility: hidden"
                v-for="index in 5 - props.tabNumberProp"
              >
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
