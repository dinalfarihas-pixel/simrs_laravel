<template>
    <section class="content">
        <div class="container-fluid">
            <PDFViewer :source="pdfUrl" style="height: 100vh; width: 100vw"  />
        </div>
    </section>
</template>


<script>

    import PDFViewer from 'pdf-viewer-vue/dist/vue3-pdf-viewer'

    export default {
        name: 'PdfViewer',
        components: {
            PDFViewer
        },
        props: ['pdfUrl'],
        data() {
            return {
                // pdfUrl: 'path/to/your/document.pdf', // Update this with your PDF path
                currentPage: 1,
                pageCount: 0,
                loading: true,
                error: null,
                zoom: 1
            }
        },
        created()
        {
             
        },
        methods: {
            loadHandler(numPages) {
                this.loading = false
                this.pageCount = numPages
            },
            errorHandler(error) {
                this.loading = false
                this.error = `Error loading PDF: ${error.message}`
                console.error('PDF Error:', error)
            }
        }
    }

</script>

<style scoped>
    .pdf-container {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        position: relative;
    }

    .pdf-toolbar {
        padding: 10px;
        background: #f5f5f5;
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 10px;
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .pdf-viewer {
        border: 1px solid #ddd;
        min-height: 500px;
        position: relative;
        display: flex;
        justify-content: center;
        transition: transform 0.2s ease;
    }

    .loading,
    .error {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error {
        color: red;
    }

    button {
        padding: 5px 10px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    select {
        padding: 5px;
        border-radius: 4px;
    }

</style>
