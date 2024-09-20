<script>
  import { onMount } from 'svelte';
  import 'pdfjs-dist/web/pdf_viewer.css';

  export let url = '';
  let viewer;
  let pdfDoc = null;
  let pageNum = 1;
  let pageCount = 0;
  let pageRendering = false;
  let pageNumPending = null;
  let pdfjsLib;

  onMount(async () => {
    pdfjsLib = await import('pdfjs-dist/build/pdf');
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.js',
      import.meta.url
    ).toString();

    await loadPdf(url);
  });

  async function loadPdf(pdfUrl) {
    try {
      pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
      pageCount = pdfDoc.numPages;
      renderPage(pageNum);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  async function renderPage(num) {
    pageRendering = true;
    const page = await pdfDoc.getPage(num);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = viewer;
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    pageRendering = false;

    if (pageNumPending !== null) {
      renderPage(pageNumPending);
      pageNumPending = null;
    }
  }

  function queueRenderPage(num) {
    if (pageRendering) {
      pageNumPending = num;
    } else {
      renderPage(num);
    }
  }

  function onPrevPage() {
    if (pageNum <= 1) return;
    pageNum--;
    queueRenderPage(pageNum);
  }

  function onNextPage() {
    if (pageNum >= pageCount) return;
    pageNum++;
    queueRenderPage(pageNum);
  }

  export function setPdfBlob(blob) {
    const url = URL.createObjectURL(blob);
    loadPdf(url);
  }

  export function getPdfBlob() {
    return fetch(url).then(response => response.blob());
  }
</script>

<div class="pdf-viewer">
  <canvas bind:this={viewer}></canvas>
  <div class="controls">
    <button on:click={onPrevPage} disabled={pageNum <= 1}>Previous</button>
    <span>{pageNum} / {pageCount}</span>
    <button on:click={onNextPage} disabled={pageNum >= pageCount}>Next</button>
  </div>
</div>

<style>
  .pdf-viewer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  canvas {
    border: 1px solid #ccc;
  }
  .controls {
    margin-top: 10px;
  }
</style>