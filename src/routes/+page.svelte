<script>
  import PdfViewer from '$lib/PdfViewer.svelte';
  import { onMount } from 'svelte';

  let pdfViewer;
  let pdfUrls = [
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/test/pdfs/TAMReview.pdf',
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/test/pdfs/issue6946.pdf',
  ];
  let currentPage = 1;
  let isLoading = true;

  onMount(() => {
    console.log('Component mounted');
    loadCurrentPdf();
  });

  function loadCurrentPdf() {
    console.log(`Loading PDF ${currentPage}`);
    isLoading = true;
    fetch(pdfUrls[currentPage - 1])
      .then(response => response.blob())
      .then(blob => {
        console.log('PDF blob fetched');
        if (pdfViewer && pdfViewer.setPdfBlob) {
          pdfViewer.setPdfBlob(blob);
          console.log('PDF blob set to viewer');
        } else {
          console.error('pdfViewer or setPdfBlob not available');
        }
        isLoading = false;
      })
      .catch(error => {
        console.error('Error fetching PDF:', error);
        isLoading = false;
      });
  }

  function nextPage() {
    if (currentPage < pdfUrls.length) {
      currentPage++;
      loadCurrentPdf();
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
      loadCurrentPdf();
    }
  }
</script>

<main>
  <h1>PDF Viewer Demo</h1>
  <p>Current Page: {currentPage}</p>
  <p>Is Loading: {isLoading}</p>
  <PdfViewer bind:this={pdfViewer} />
</main>

<style>
  main {
    padding: 1em;
    max-width: 1200px;
    margin: 0 auto;
  }
  h1 {
    color: #ff3e00;
    font-size: 2em;
    text-align: center;
  }
</style>