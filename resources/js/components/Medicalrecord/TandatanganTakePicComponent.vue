<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>  
            <div v-if="!cameraIsOpen" class="image-container">
                <img 
                src="https://static.vecteezy.com/system/resources/thumbnails/007/104/553/small/search-no-result-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                alt="Captured Photo" style="border: 1px solid gray;"width="410" height="180" />
                <Button v-if="!cameraIsOpen" class="button-xl" icon="pi pi-camera" label="Foto" @click="startVideo()"/>
               
            </div>    
            
            <canvas ref="canvas_pic" width="420" height="180" style="display:none;border: 1px solid gray;"></canvas>
            <div v-if="!captured">
                <video ref="video" width="420" height="180" autoplay></video>
                <Button label="Foto" icon="pi pi-camera" @click="capturePhoto()" class="p-button-text" />
              
            </div>
            <div v-else>
                <img :src="photo" alt="Captured Photo" style="border: 1px solid gray;" width="410" height="180" />
                <Button label="Foto Ulang" icon="pi pi-camera" @click="retakePhoto()" class="p-button-text" />
                <!-- <Button class="button-xl" icon="pi pi-download" label="Foto" @click="downloadImage()"/> -->
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
                stream: null, // To store the video stream from the camera
                videoStream: null,
                photo: '', // To store the captured photo
                captured: false,
                fullPage: true,
                isLoading: false,
                cameraIsOpen: false,
                file_picture:null

            };
        },
        mounted() {

            //this.startVideo();
            this.check_has_take_pic();
        },
        created() {
            //this.fetchData();
           
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
            },
            check_has_take_pic()
            {
                if(this.data_sign.pic!="")
                {
                    this.photo = this.data_sign.pic;
                    this.captured = true;
                    this.cameraIsOpen=true
                }  
            },
            startCamera() {
                navigator.mediaDevices.getUserMedia({
                        video: {
                            facingMode: {
                                exact: "environment"
                            }
                        }
                    })
                    .then(stream => {
                        this.$refs.video.srcObject = stream;
                        this.stream = stream;
                    })
                    .catch(err => {
                        console.error("Error accessing the camera: ", err);
                    });
            },
            startVideo() {
                const constraints = {
                    video: {
                        width: {
                            ideal: 1280
                        }, // Remove or lower if needed
                        height: {
                            ideal: 720
                        }, // Remove or lower if needed
                        facingMode: 'user' // 'user' for front camera, 'environment' for rear
                    }
                };
                navigator.mediaDevices.getUserMedia(constraints)
                    .then((stream) => {
                        this.stream = stream;
                        this.$refs.video.srcObject = stream;
                        this.cameraIsOpen = true
                    })
                    .catch((error) => {
                        if (error.name === 'OverconstrainedError') {
                            console.error("OverconstrainedError: Could not meet requested camera constraints.",
                                error);
                        } else if (error.name === 'NotAllowedError') {
                            console.error("NotAllowedError: Camera access denied by user.", error);
                        } else {
                            console.error("Error accessing the camera: ", error);
                        }
                    });
            },
            retakePhoto() {
                this.captured = false;
                this.startVideo();
            },
            capturePhoto() {
                const video = this.$refs.video;
                const canvas_pic = this.$refs.canvas_pic;
                const ctx = canvas_pic.getContext('2d'); 
               
                ctx.drawImage(video, 0, 0, canvas_pic.width, canvas_pic.height);
 
                this.photo = canvas_pic.toDataURL('image/png');
                
                if(this.photo)
                {
                    canvas_pic.toBlob((blob) => {
                        // Create FormData object  
                        this.file_picture =blob
                        console.log(this.file_picture) 
                    }, 'image/png');
                }
               

                this.stopcamera();
                this.captured = true;
            },
            capture() {
                const video = this.$refs.video;
                const canvas_pic = this.$refs.canvas_pic;
                const context = canvas_pic.getContext('2d');
                // context.drawImage(video, 0, 0, canvas.width, canvas.height);
                // this.photo = canvas.toDataURL('image/png');
                // this.showCanvas = false;
               
            }, 
            stopcamera() { 
                if (this.stream) {
                    this.stream.getTracks().forEach(track => track.stop());
                    this.stream = null;
                }  
            }, 
            get_pic()
            {
                return this.file_picture;
            },

            downloadImage() {
            // Convert base64 to blob
                const canvas = this.$refs.canvas_pic;

                canvas.toBlob((blob) => {
                    // Create FormData object  
                    console.log(blob) 
                }, 'image/png');
            }

        },
    }

</script>
<style>
    .image-container {
      position: relative;
      display: inline-block;
    }

    .image-container img {
      display: block;
      width: 100%;
      height: auto;
    }

    .image-container button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 10px 20px;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
      border-radius: 5px;
    }

    .image-container button:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  </style>