<script>
  import PdfViewer from '$lib/PdfViewer.svelte';
  import { onMount } from 'svelte';

  let pdfViewer;
  let pdfUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
  let isLoading = true;

  onMount(async () => {
    console.log('Component mounted');
    await loadPdf();
  });

  async function loadPdf() {
    console.log('Loading PDF');
    isLoading = true;
    try {
      const response = await fetch(pdfUrl);
      const arrayBuffer = await response.arrayBuffer();
      if (pdfViewer && pdfViewer.setPdfBinary) {
        pdfViewer.setPdfBinary(arrayBuffer);
        console.log('PDF binary data set to viewer');
      } else {
        console.error('pdfViewer or setPdfBinary not available');
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    } finally {
      isLoading = false;
    }
  }

  async function downloadPdf() {
    try {
      const arrayBuffer = await pdfViewer.getPdfBinary();
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  }
</script>

<main>
  <h1>PDF Viewer Demo</h1>
  {#if isLoading}
    <p>Loading PDF...</p>
  {:else}
    <PdfViewer bind:this={pdfViewer} />
    <button on:click={downloadPdf}>Download PDF</button>
  {/if}
</main>

<style>
  main {
    padding: 1em;
    max-width: 1200px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
    text-align: center;
  }
  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 1em;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
</style>