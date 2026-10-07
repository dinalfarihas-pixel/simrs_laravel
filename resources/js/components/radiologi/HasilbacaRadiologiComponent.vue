<template>
    <section class="content">

        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title"><strong> Expertis radiologi </strong></h3>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-9">
                        <div class="card" v-for="item in hasilbacaradiologi">
                            <div class="card-header">
                                <h3 class="card-title">Keterangan hasil baca <strong> {{item.NAMA}} </strong></h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <span v-for="att in item.attachment">
                                            <!-- <ImagePreview :src="att.link_img" alt="Image" width="250" preview
                                                class="mb-2">
                                                <template #indicator>
                                                    {{att.caption_file}}
                                                </template>
                                            </ImagePreview> -->
                                            <div class="image-preview-container">
                                                <!-- Image Preview Component -->
                                                <ImagePreview
                                                :src="att.link_img"
                                                alt="Image"
                                                width="250"
                                                preview
                                                class="mb-2 custom-image-preview"
                                                @show="onImageShow"
                                                >
                                                <template #indicator>
                                                    {{att.caption_file}}
                                                </template>
                                                </ImagePreview>
                                            </div>
                                          </span>
                                        <br />
                                        <Button label="Add" icon="pi pi-plus" @click="showdialogParam=true"
                                            class="p-button p-button  p-button-sm p-button-primary mr-1" />
                                    </div>
                                    <div class="col-md-8">
                                        <h5>Subject </h5>
                                        <p class="text-muted">Hasil baca Radiologi, update terakhir
                                            {{ item.TANGGAL_TIMPSTAMP  }}</p>
                                        <h6><span v-html="convert_chart(item.HASIL_BACA)"></span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ImagePreview from 'primevue/image';
    import Textarea from 'primevue/textarea';
    export default {
        components: {
            Loading,
            ImagePreview
        },
        props: {
            noreceipt: String,
        },

        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                    hasilbaca: '',
                    mode: '',
                    no_receipt: ''
                },
                isLoading: false,
                fullPage: true,
                showdialogParam: false,
                hasilbacaradiologi: []
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
            //this.form.hasilbaca = this.noregister[0].HASIL_BACA
        },
        created() {
            //this.fetchData();
            this.get_subdetail();
        },
        methods: {
            onImageShow() {
                // After image preview is shown, add a close button to the preview mask
                this.$nextTick(() => {
                    const maskElement = document.querySelector('.p-image-mask');

                    if (maskElement && !document.querySelector('.custom-close-btn')) {
                    // Create close button element
                    const closeBtn = document.createElement('button');
                    closeBtn.className = 'custom-close-btn';
                    closeBtn.innerHTML = '<i class="pi pi-times"></i>';

                    // Add click event to close the preview
                    closeBtn.addEventListener('click', () => {
                        // Find and click the mask to close the preview
                        const mask = document.querySelector('.p-image-mask');
                        if (mask) mask.click();
                    });

                    // Append button to mask
                    maskElement.appendChild(closeBtn);
                    }
                });
            },

            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            convert_chart: function (stringText) {
                if (stringText == null) {
                    return "";
                } else {
                    // let res =  stringText.replace(/(\\r)*\\n/g, '<br>')
                    // res =  res.replace(/\n\n/g, '<br>');
                    let res = stringText.replace(/\n/g, '<br>');
                    return res;
                }
            },
            handleCallback() {
                console.log('Function called from child component');
            },
            showdialogFunct() {
                this.showdialogParam = true;
                console.log('Testing');
            },
            async get_subdetail() {
                this.isLoading = true
                //this.param.NOPENDAFTARAN = this.datapasien.NOPENDAFTARAN;
                //this.form.no_receipt = "1100194767277779";
                this.form.no_receipt = this.noreceipt;
                this.form.mode = "1"
                await axios.post('/get_detail_radiologi', this.form)
                    .then(response => {
                        this.hasilbacaradiologi = response.data.response
                        // this.hasilbacaradiologi =  this.hasilbacaradiologi.filter(x => x.BARCODE===BARCODE);
                        console.log(this.form.hasilbaca);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
        },
    }

</script>



<style>
/* Vue 2 syntax for deep selectors */
.custom-image-preview >>> .p-image-preview {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Style for the caption/indicator */
.custom-image-preview >>> .p-image-preview-indicator {
  font-weight: 500;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border-radius: 4px;
}

/* Improving the overlay background */
.custom-image-preview >>> .p-image-mask {
  background-color: rgba(0, 0, 0, 0.7);
}

/* Additional style to make the image look better in normal view */
.custom-image-preview >>> .p-image img {
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

/* Custom close button styling */
.custom-close-btn {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10000;
}

.custom-close-btn:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.custom-close-btn i {
  font-size: 1.2rem;
  color: #333;
}
</style>
