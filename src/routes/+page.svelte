<script>
  import PdfViewer from '$lib/PdfViewer.svelte';
  import { onMount } from 'svelte';

  let pdfViewer;
  let pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
  let isLoading = true;

  onMount(() => {
    // Example of setting a PDF blob
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        if (pdfViewer && pdfViewer.setPdfBlob) {
          pdfViewer.setPdfBlob(blob);
        }
        isLoading = false;
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
        isLoading = false;
      });
  });

  function downloadPdf() {
    if (pdfViewer && pdfViewer.getPdfBlob) {
      pdfViewer.getPdfBlob().then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }
</script>

<main>
  <h1>PDF Viewer Demo</h1>
  {#if isLoading}
    <p>Loading PDF...</p>
  {:else}
    <PdfViewer bind:this={pdfViewer} url={pdfUrl} />
    <button on:click={downloadPdf}>Download PDF</button>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>