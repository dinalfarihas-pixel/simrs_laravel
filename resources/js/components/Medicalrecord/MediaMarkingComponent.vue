<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card elevation-0">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-6">
                            <h3 class="card-title"><b>MARKING SITE</b></h3> <br/>
                        </div>
                        <div class="col-md-6" style="text-align: left;">
                            <Button label="Clear" align="" @click="clearCanvas()" icon="pi pi-times" class="p-button p-button-text p-button-warning" />
                        </div>
                    </div>

                </div>
                <div class="card-body">
                    <!-- {{ canvas}} -->
                    <!-- <span>{{x}}, {{y}}</span> -->
                    <canvas ref="canvas"  width="450" height="450"  @mousemove="draw" @mousedown="beginDrawing" @mouseup="stopDrawing" />
                    <!-- <Button label="Clear" align="" @click="clearCanvas()" icon="pi pi-check" class="p-button" /> -->

                    <!-- <Button label="undo" align="" @click="undo()" icon="pi pi-undo" class="p-button button-warning" /> -->
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {
                canvas: null,
                x: 0,
                y: 0,
                fact: [],
                canvasStates: [],
                currentStep: -1,
                form: {
                    startdate: '',
                    enddate: '',
                },
                isDrawing: false,
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            const canvas = this.$refs.canvas;
            this.canvas = canvas.getContext('2d');
            this.loadimage();
            //this.drawOnCanvas()
        },
        created() {
            //this.fetchData();

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            clearCanvas()
            {
                const canvas = this.$refs.canvas;
                const ctx = canvas.getContext('2d');
                // Clear the entire canvas
                ctx.clearRect(0, 0, 450, 450);
                this.loadimage();

            },
            loadimage()
            {
                const canvas = this.$refs.canvas;
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.src = 'https://ws-simrs.net/anatomipic/anatomi1.jpg';
                img.onload = () => {
                    ctx.drawImage(img, 0, 0,450, 450);
                };

            },
            drawLine(x1, y1, x2, y2) {
                let ctx = this.canvas;
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.lineWidth =1;
                // ctx.globalAlpha = 1;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
                ctx.closePath();
            },
            draw(e) {
                if(this.isDrawing) {
                    this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
                    this.x = e.offsetX;
                    this.y = e.offsetY;
                }
            },
            showCoordinates(e) {
                this.x = e.offsetX;
                this.y = e.offsetY;
            },
            beginDrawing(e) {
                this.x = e.offsetX;
                this.y = e.offsetY;
                this.isDrawing = true;
            },
            stopDrawing(e) {
                if (this.isDrawing) {
                    this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
                    this.x = 0;
                    this.y = 0;
                    this.isDrawing = false;
                    //this.saveState();
                }
            },
            saveState() {
                const canvas = this.$refs.canvas;
                this.currentStep++;
                this.canvasStates = this.canvasStates.slice(0, this.currentStep); // Remove any redo states
                this.canvasStates.push(canvas);
                console.log(this.canvasStates);
            },
            undo() {
                if (this.currentStep > 0) {
                    this.currentStep--;
                    this.restoreState();
                }
            },
            restoreState() {
                const canvas = this.$refs.canvas;
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.src = this.canvasStates[this.currentStep];
                console.log(this.canvasStates);
                img.onload = () => {
                    // ctx.clearRect(0, 0, 450, 450);
                    // ctx.drawImage("", 0, 0);
                    ctx.drawImage("http://127.0.0.1:8000/list-pasien-igd", 0, 0);
                };
            },

           async uploadImage() {
                const dataURL = this.$refs.canvas.toDataURL("image/png");
                const blob = this.dataURLToBlob(dataURL);

                // Create FormData and append the blob
                const formData = new FormData();
                formData.append('image', blob, 'canvas-image.png');

                // Send the image to the Laravel backend
               await axios.post('/api/upload-canvas-image', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                })
                .then(response => {
                    console.log('Image uploaded successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                });
            },

        },
    }

</script>
