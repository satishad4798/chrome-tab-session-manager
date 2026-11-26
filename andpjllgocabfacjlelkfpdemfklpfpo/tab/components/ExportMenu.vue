<template>
  <ul>
    <li
      @click="
        collectionExportTo($event, 'plaintext', 'clipboard', 'list', false)
      "
    >
      <span class="normal">Plain text list</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <li
      @click="
        collectionExportTo($event, 'plaintext', 'clipboard', 'table', false)
      "
    >
      <span class="normal">Plain text table</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <li
      @click="
        collectionExportTo(
          $event,
          'markdown-sources',
          'clipboard',
          'list',
          true
        )
      "
    >
      <span class="normal">Markdown list with thumbs</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <li
      @click="
        collectionExportTo(
          $event,
          'markdown-sources',
          'clipboard',
          'table',
          false
        )
      "
    >
      <span class="normal">Markdown table</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <li @click="collectionExportTo($event, 'html', 'clipboard', 'list', true)">
      <span class="normal">HTML list with thumbs</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <li
      @click="collectionExportTo($event, 'html', 'clipboard', 'table', false)"
    >
      <span class="normal">HTML table</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <li
      @click="collectionExportTo($event, 'tablerone', 'clipboard', '', false)"
    >
      <span class="normal">Tablerone backup</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <!--
    <li @click="collectionExportTo($event, 'excel', 'file', false)">
        <span class="normal">Excel</span>
        <span class="loading">Preparing file</span>
        <span class="success">File downloading</span>
    </li>
    -->
    <li @click="collectionExportTo($event, 'csv', 'clipboard', false)">
      <span class="normal">CSV</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
    <li @click="collectionExportTo($event, 'json', 'clipboard', false)">
      <span class="normal">JSON</span>
      <span class="loading">Copying to clipboard</span>
      <span class="success">Copied to clipboard</span>
    </li>
  </ul>
</template>

<script>
export default {
  // functional: true,
  name: 'ExportMenu',
  methods: {
    collectionExportTo(
      event,
      targetFormat,
      targetType,
      targetSubFormat = '',
      includeScreenshots = false
    ) {
      const params = {
        event,
        targetFormat,
        targetType,
        targetSubFormat,
        includeScreenshots
      }
      this.$emit('collectionExportTo', params)
    }
  }
}
</script>

<style></style>
