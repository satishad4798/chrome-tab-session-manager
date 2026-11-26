<template>
  <div>
    <textarea
      :placeholder="importDataPlaceholder"
      v-model="importData"
      ref="dropArea"
      :class="{ highlight: highlightClass }"
    ></textarea>
    <!-- <input type="file" id="fileElem" onchange="handleFiles(this.files)"> -->
  </div>
</template>

<script>
// import { getHostnameForDisplay, getDateDisplay, getTimeDisplay, isToday, getFavIcon } from '../../library/library'
const DEFAULT_IMPORT_DATA_PLACEHOLDER = 'Drop in file or copy-paste values...'
export default {
  name: 'SettingsDropzone',
  components: {},
  props: {
    // settingsTableroneDateFormat: String,
  },
  data: () => {
    return {
      importDataPlaceholder: DEFAULT_IMPORT_DATA_PLACEHOLDER,
      importData: '',
      highlightClass: false
    }
  },
  mounted() {
    const self = this
    const dropArea = this.$refs.dropArea

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropArea.addEventListener(eventName, self.preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.highlight, false)
    })
    ;['dragleave', 'drop'].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.unhighlight, false)
    })

    dropArea.addEventListener('drop', this.handleDrop, false)
  },
  methods: {
    preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    highlight(e) {
      this.highlightClass = true
    },
    unhighlight(e) {
      this.highlightClass = false
    },
    handleDrop(e) {
      this.importDataPlaceholder = 'Loading File...'
      this.$emit('importDataLoadingFileContents', true)
      this.handleFiles(e.dataTransfer.files)
    },
    handleFiles(files) {
      // ([...files]).forEach(previewFile)
      this.previewFile(files[0])
    },
    previewFile(file) {
      const self = this
      if (file) {
        const reader = new FileReader()
        reader.readAsText(file, 'UTF-8')
        reader.onload = function (evt) {
          self.$emit('importDataLoadingFileContents', false)
          const fileContents = evt.target.result.trim()
          self.importDataPlaceholder = DEFAULT_IMPORT_DATA_PLACEHOLDER
          // change reactive variable to result
          self.importData = fileContents
        }
        reader.onerror = function (evt) {
          console.log('READ FILE ERROR')
        }
      }
    }
  },
  beforeDestroy() {
    const dropArea = this.$refs.dropArea

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      dropArea.removeEventListener(eventName, self.preventDefaults, false)
    })
    ;['dragenter', 'dragover'].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.highlight, false)
    })
    ;['dragleave', 'drop'].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.unhighlight, false)
    })

    dropArea.removeEventListener('drop', this.handleDrop, false)
  },
  computed: {},
  watch: {
    importData: {
      immediate: true,
      handler(newValue) {
        const t0 = performance.now()
        this.$emit('importDataChange', newValue)
        const t1 = performance.now()
        console.log(
          'Call to importDataChange took ' + (t1 - t0) + ' milliseconds.'
        )
      }
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
@import '../../colors';
.highlight {
  border-color: var(--color-blue);
  border-style: dashed;
}

textarea {
  font-size: 13px;
  line-height: 18px;
  background: var(--color-input-background);
  color: var(--color-text-black);
  width: 100%;
  height: 480px;
}
</style>
