<script>
  import { onMount } from 'svelte';

  let iframe;
  let viewerLoaded = false;

  onMount(() => {
    iframe.addEventListener('load', () => {
      viewerLoaded = true;
      console.log('PDF Viewer iframe loaded');
    });
  });

  export function setPdfBinary(arrayBuffer) {
    if (viewerLoaded) {
      console.log('Setting PDF binary data');
      const uint8Array = new Uint8Array(arrayBuffer);
      iframe.contentWindow.PDFViewerApplication.open(uint8Array);
    } else {
      console.error('Viewer not loaded yet');
    }
  }

  export function getPdfBinary() {
    return new Promise((resolve, reject) => {
      if (viewerLoaded) {
        iframe.contentWindow.PDFViewerApplication.pdfDocument.getData().then(data => {
          resolve(data.buffer);
        }).catch(reject);
      } else {
        reject(new Error('Viewer not loaded'));
      }
    });
  }
</script>

<iframe
  bind:this={iframe}
  src="/pdfjs-dist/web/viewer.html"
  width="100%"
  height="800px"
  title="PDF Viewer"
></iframe>

<style>
  iframe {
    border: none;
    display: block;
  }
</style>