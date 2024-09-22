# PDF.js Viewer Svelte Component

A Svelte component that integrates Mozilla's PDF.js Viewer into SvelteKit applications, providing a powerful and flexible PDF viewing experience.

## Features

- 📄 Embed PDF.js Viewer in your SvelteKit application
- 🔗 Load PDFs from URL or binary data
- 🎮 Control PDF navigation programmatically
- 💾 Download edited PDFs with form inputs and annotations
- 🌐 Cross-browser compatibility

## Installation

1. Install the package:
` ```npm install svelte-pdfjs-viewer```

2. Copy the PDF.js files to your `static` folder:
- Download PDF.js (version 4.0.379) from [here](https://github.com/mozilla/pdf.js/releases/tag/v4.0.379).
- Extract the contents to `static/pdfjs-dist` in your SvelteKit project.

## Basic Usage

```svelte
<script>
import PdfViewer from 'svelte-pdfjs-viewer';

let pdfViewer;
let pdfUrl = 'path/to/your/pdf.pdf';
</script>

<PdfViewer 
bind:this={pdfViewer}
initialPdfUrl={pdfUrl}
on:viewerReady={() => console.log('PDF Viewer is ready')}
on:pdfLoaded={() => console.log('PDF loaded')}
on:error={(e) => console.error(e.detail.message)}
/>
```

📚 **API Reference**

🔧 **Props**
- ``initialPdfUrl`` (string): Initial PDF URL to load
  
🛠️ **Methods**
- ``setPdfBinary(arrayBuffer)``: Load a PDF from an ArrayBuffer
- ``getPdfBinary()``: Get the current PDF as an ArrayBuffer
- ``getCurrentPage()``: Get the current page number
- ``setCurrentPage(pageNumber)``: Set the current page number
  
🔔 **Events**
- ``viewerReady``: Fired when the PDF.js viewer is loaded and ready
- ``pdfLoaded``: Fired when a PDF is successfully loaded
- ``error``: Fired when an error occurs, with the error message in event.detail.message
- ``browserCompatibility``: Fired with browser compatibility information
  
🌐 **Browser Compatibility**
- Tested on Chrome, Firefox, Edge, and Safari.

🤝 **Contributing**
- Contributions are welcome! Please feel free to submit a Pull Request.

📄 **License**
- This project is licensed under the MIT License - see the LICENSE file for details.

🙏 **Acknowledgments**
- PDF.js by Mozilla


This revised README provides a concise overview of your component, its features, installation instructions, basic usage, and API reference without delving into the specifics of your implementation. It's more appropriate for a component that others will use in their projects. You can expand on this as needed, adding any crucial information specific to your implementation.
