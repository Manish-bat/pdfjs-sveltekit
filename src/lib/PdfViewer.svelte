<script>
  import { onMount } from 'svelte';

  export let url = '';
  let iframe;
  let viewerLoaded = false;

  onMount(() => {
    iframe.addEventListener('load', () => {
      viewerLoaded = true;
      console.log('PDF Viewer iframe loaded');
    });
  });

  export function setPdfBlob(blob) {
    if (viewerLoaded) {
      console.log('Setting PDF blob');
      const reader = new FileReader();
      reader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        iframe.contentWindow.PDFViewerApplication.open(typedarray);
      };
      reader.readAsArrayBuffer(blob);
    } else {
      console.error('Viewer not loaded yet');
    }
  }

  export function getPdfBlob() {
    return new Promise((resolve, reject) => {
      if (viewerLoaded) {
        iframe.contentWindow.PDFViewerApplication.pdfDocument.getData().then(data => {
          resolve(new Blob([data], { type: 'application/pdf' }));
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