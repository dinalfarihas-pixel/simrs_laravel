<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>  
            <div class="card elevation-0" style="height: 320px;" v-if="data_sign.deleted==0"> 
                <div class="card-header" style="text-align: center;">
                    <h5>{{ data_sign.ket }}</h5>
                </div> 
                <div class="card-body" style="text-align: center;" > 
                    <div class="row">
                        <div class="col-md-6">
                            <canvas ref="canvas"  style="border: .5px solid gray;" width="420" height="180"  @mousemove="draw" @mousedown="beginDrawing" @mouseup="stopDrawing" /> 
                            <h5><u>{{ data_sign.nama_keluarga_pasien }}/{{ data_sign.hubungan }}</u></h5>
                        </div>
                        <div class="col-md-6">
                            <take-picture-consent ref="get" :data_sign="data_sign"></take-picture-consent>
                        </div>
                    </div> 
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-md-6">
                            <Button label="Clear" align="" @click="clearCanvas()" icon="pi pi-times" class="p-button p-button-text p-button-danger" />
                            <Button label="Simpan" align="" @click="uploadImage()" icon="pi pi-save" class="p-button p-button p-button-text" />
                        </div>
                        <div class="col-md-6" style="text-align: right;">
                            <Button label="Hapus" align="" @click="hapusTdd(data_sign)" icon="pi pi-trash" class="p-button p-button-danger p-button-text" />
                        </div>
                    </div> 
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
        props: ['data_sign'],
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
                    id:''
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
            this.loadimage(this.data_sign.link_tt);
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
                ctx.clearRect(0, 0, 450, 450);  
            },
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                })
            },
            async hapusTdd(data)
            {  
                this.isLoading =true;
                var currentDate = new Date();  
                this.form.id = data.id;
                await axios.post('/hapus_ttd',this.form)
                    .then(response => {   
                        console.log(data) 
                        if(response.data.metadata.code==200)
                        { 
                            this.data_sign.deleted =1;
                            this.isLoading =false;
                            this.open("success",response.data.metadata.message) 
                        }
                        else
                        {
                            this.isLoading =false;
                            this.open("warning",response.data.metadata.message)
                        }  
                        
                    })
                    .catch(error => {
                        console.log(error)
                        //this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            loadimage(url)
            {
                if(url!="")
                {
                    const canvas = this.$refs.canvas;
                    const ctx = canvas.getContext('2d');  
                    const img = new Image(); 
                    img.src = url;   
                    img.onload = () => {
                        ctx.drawImage(img, 0, 0,420, 180);
                    };
                } 
               
            },
            drawLine(x1, y1, x2, y2) {
                let ctx = this.canvas;
                ctx.beginPath();
                ctx.strokeStyle = 'black';
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
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 3000,
                    dismissible: true
                })
            },
           async uploadImage() {
                
                const canvas = this.$refs.canvas;

                canvas.toBlob((blob) => {
                    // Create FormData object
                    
                    const formData = new FormData();
                    var image_kel_pasien = this.$refs.get.get_pic();
                     
                    formData.append("data", JSON.stringify(this.data_sign));
                    formData.append('image', blob, 'canvasImage.png');  
                    formData.append('pic_kel_pasien', image_kel_pasien, 'pic.png');   
                        axios.post('/upload_canvas', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then(response => { 
                        this.open("success",response.data.metadata.message)
                        //console.log('Image uploaded successfully:', response.data);
                    })
                    .catch(error => {
                        this.open("warning",error)
                        //console.error('Error uploading the image:', error);
                    });
                }, 'image/png');
            }, 
        },
    }

</script>
