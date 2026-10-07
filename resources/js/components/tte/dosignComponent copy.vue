<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>
            <Dialog header="Passphrase" v-model:visible="displayModal" :containerStyle="{width: '30vw'}" :modal="true">
                <div class="card-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Passphrase</label><br />
                        <InputText type="password" v-model="form.passphrase" autocomplete="off" style="width: 30em;" />
                    </div>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="submit_ttd()" autofocus />
                </template>
            </Dialog>

          
            <div class="row centered">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <h4>Tanda tangan elektronik</h4>
                        </div> 
                        <!-- <form @submit.prevent="submit"> -->
                        <div class="card-body">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Nama Dokumen</label>
                                <input type="text" v-model="form.nama_dokumen" style="text-transform:uppercase" autocomplete="off" class="form-control"
                                    id="exampleInputEmail1" placeholder="">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Nomor</label>
                                <input type="text" v-model="form.nomor_surat" style="text-transform:uppercase" autocomplete="off" class="form-control"
                                    id="exampleInputEmail1" placeholder="">
                            </div>

                            <div class="form-group w-30">
                                <label for="minmax">Ditandatangani oleh</label> <br />
                                <MultiSelect v-model="form.user_dipilih" style="width: 30em;" :options="user_list"
                                    optionLabel="nama_user" placeholder="Pilih user penandatangan" :filter="true"
                                    class="multiselect-custom">
                                    <template #value="slotProps">
                                        <div class="country-item country-item-value" v-for="option of slotProps.value"
                                            :key="option.nip">
                                            <!-- <img src="../../assets/images/flag_placeholder.png" :class="'flag flag-' + option.code.toLowerCase()" /> -->
                                            <div>{{option.nama_user}}</div>
                                        </div>
                                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                                            Pilih user penandatangan
                                        </template>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="country-item">
                                            <!-- <img src="../../assets/images/flag_placeholder.png" :class="'flag flag-' + slotProps.option.code.toLowerCase()" /> -->
                                            <div>{{slotProps.option.nama_user}}</div>
                                        </div>
                                    </template>
                                </MultiSelect>
                            </div>

                            <!-- <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="text" name="password" autocomplete="off" class="form-control"
                                    id="exampleInputPassword1" placeholder="Password">
                            </div> -->

                            <div class="form-group">
                                <label for="minmax">Total halaman</label> <br />
                                <InputNumber id="minmax" v-model="form.halaman" mode="decimal" :min="0" :max="100" />
                            </div>
                            <!-- <qrcode-vue :value="value" :size="size"  level="H"></qrcode-vue> -->
                            <!-- 
                                <div class="form-group">
                                    <input class="form-control" type="file" @change="onFileChange"> 
                                    <InputText type="file" class="custom-file-input" @change="onFileChange"
                                        placeholder="Search" />
                                </div> -->

                          
                            <div class="input-group w-30"> 
                                <input type="file" class="custom-file-input" accept="application/pdf"
                                    @change="onFileChange" id="exampleInputFile">
                                <label class="custom-file-label" for="exampleInputFile">{{ file_size }}</label>
                                <div v-if="pageCount !== null">The PDF has {{ form.halaman = pageCount }} {{ pageCount }} pages.</div>
                            </div>
                            <div class="form-group">
                                <small><label for="minmax">Maksimal ukuran file 700 kb</label></small> <br />
                            </div>
                        </div>
                        <div class="card-footer">
                            <!-- <button @click="submit" class="btn btn-primary">Hanya Simpan</button> -->
                            <button @click="openModal()" class="btn btn-success" >TTD dan simpan</button>
                            <button @click="closeConfirmation()" class="btn" style="background-color: orange;">Daftar dokumen</button>
                        </div>
                        <!-- </form> -->
                    </div>
                </div>

            </div>

            <div class="row centered">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <img src="https://bsre.bssn.go.id/img/bsre-logo-full.aa4caa4d.png" width="100" height="30"
                                alt="Description of the image">
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    </section>
</template>

<script>
    import sha256 from 'crypto-js/sha256';
    import Loading from 'vue-loading-overlay';
    import InputNumber from 'primevue/inputnumber';
    import QrcodeVue from 'qrcode.vue'; 
    import QRCode from 'qrcode'; // Import the qrcode library
    import { degrees,PDFDocument, StandardFonts, componentsToColor, rgb } from 'pdf-lib'
    export default {
        components: {
            Loading,
            InputNumber,
            QrcodeVue, 
            QRCode
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                data_res:'',
                displayModal: false,
                hash_code:'',
                form: {
                    startdate: '',
                    nama_dokumen: '',
                    enddate: '',
                    file_attch: '',
                    halaman: 1,
                    nomor_surat:'',
                    user_dipilih:null,
                    signature:'',
                    passphrase:'',
                },
                user_list:[],
               
                value: 'https://example.com',
                size: 100,
                isLoading: false,
                fullPage: true,
                pdf_file: '',
                file_size: 'Maxmimum ukuran file 700kb',
                pageCount:null
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
      
        created() {
            //this.fetchData(); 
            this.getdata_user();
        },
        methods: {
            generateHashCodeWithTimestamp() {
                const timestamp = new Date().getTime().toString(); // Get current timestamp
                const combinedString = timestamp;  
                return sha256(combinedString).toString();// Concatenate the string with the timestamp
               
            },
            hashCode(str) {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                let char = str.charCodeAt(i);
                hash = (hash << 5) - hash + char;
                hash = hash & hash; // Convert to 32bit integer
                } 
                return md5(hash).toString();;
            },
            async onFileChange(e) { 
            
                let size = e.target.files[0].size / 1000;
                this.file_size = e.target.files[0].name + '- file size ' + size + ' kb';
               
                this.form.file_attch = e.target.files[0]    

                const file = e.target.files[0]; // Get the file from the file input 
           
                const reader = new FileReader();
            
                reader.onload = async (e) => {
                
                    const arrayBuffer = e.target.result;  

                    const pdfDoc = await PDFDocument.load(arrayBuffer); 

                    var response = await this.modify_file(arrayBuffer)

                    //this.file_size = e.target.files[0].name + '- file size ' + size + ' kb';

                   // this.pdf_file = response.type
 
                    this.pdf_file = response; 
                    this.pageCount = pdfDoc.getPageCount();
                    this.form.halaman = this.pageCount; 
                }  
                reader.readAsArrayBuffer(file); 
            },

           async modify_file(file)
            {
               
                const pdfDoc = await PDFDocument.load(file)
                const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

                const pages = pdfDoc.getPages();
                
                // Access the last page of the document
                const lastPage = pages[pages.length - 1];
                
                // Get the width and height of the last page
                const { width, height } = lastPage.getSize(); 

                this.form.signature = this.generateHashCodeWithTimestamp(); 
                 
                // lastPage.drawText(this.form.signature, {
                //     x: 380,
                //     y: 125,
                //     size: 12,
                //     font: helveticaFont,
                //     color: rgb(0.1, 0.1, 0.1),
                //     rotate: degrees(0),
                // });  
                lastPage.drawText(this.form.user_dipilih[0]['nama_user'], {
                    x: width - 180,
                    y: height-680,
                    size: 11,
                    font: helveticaFont,
                    color: rgb(0.1, 0.1, 0.1),
                    rotate: degrees(0),
                }); 

                // Draw text on the last page
              
                const qrCodeData =this.form.signature; // The data to be encoded in the QR code
                const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData);
                const qrImage = await pdfDoc.embedPng(qrCodeDataUrl);
                 // Define the dimensions and placement of the QR code image on the last page
                const qrWidth = 70; // Adjust the width as needed
                const qrHeight = 70; // Adjust the height as needed
                const qrX = lastPage.getWidth() - qrWidth - 100; // Adjust the X position as needed
                const qrY = 40; // Adjust the Y position as needed

                lastPage.drawImage(qrImage, {
                    x: qrX,
                    y: qrY,
                    width: qrWidth,
                    height: qrHeight,
                }); 

                const pdfBytes = await pdfDoc.save()

                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                //this.download(pdfBytes, "pdf-lib_modification_example.pdf");
               
                return blob;
               
       
            },

            
            closeConfirmation(){  
                window.location.assign("/list_tte"); 
            },

            download(pdfBytes, fileName) {
                // Create a Blob from the PDF bytes
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });

                // Create an object URL from the Blob
                const url = URL.createObjectURL(blob);

                // Create a temporary link element
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;

                // Append the link to the document body
                document.body.appendChild(link);

                // Programmatically trigger a click to start the download
                link.click();

                // Clean up: remove the link element and revoke the URL
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                },

            
            convertUint8ArrayToFile(uint8Array, fileName = 'document.pdf', mimeType = 'application/pdf') {
                // Create a Blob from the Uint8Array
                const blob = new Blob([uint8Array], { type: mimeType });

                // Create a File object from the Blob
                const file = new File([blob], fileName, { type: mimeType });

                // Return the File object
                return file;
            },
            async handleConvertPdf(file) {
               
                const pdfFile = this.convertUint8ArrayToFile(file, 'myDocument.pdf'); 
                return pdfFile;
    
            },
            openModal() {
                this.form.passphrase='';
                this.displayModal = true;
            },
            closeModal() {
                this.displayModal = false;
            },
            async submit() {  
                this.isLoading = true;
                let fd = new FormData();
                fd.append("pdf_file", this.pdf_file); 
                fd.append("data", JSON.stringify(this.form));
                await axios.post('/uploaddata', fd)
                    .then(response => {
                        // this.fact = response.data.response
                        this.isLoading = false 
                        console.log(response.data)
                        if(response.data.code==201)
                        {
                            this.open("warning",response.data.message)
                        }
                        if(response.data.metadata.code==200)
                        {
                            this.open("success",response.data.metadata.message)
                            this.closeConfirmation();
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
           async getdata_user()
            {
                await axios.post('/get_user')
                    .then(response => {
                        this.user_list = response.data.response
                        console.log(this.user_list);
                        this.isLoading = false
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }, 
            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 2500,
                    dismissible: true
                })
            },

          async submit_ttd(){
                this.isLoading = true;
                let fd = new FormData(); 
                this.closeModal();
                fd.append("pdf_file", this.pdf_file,'modified_pdf_with_qr_code.pdf');
                fd.append("data", JSON.stringify(this.form));

                await axios.post('/ttd_file', fd)
                    .then(response => { 
                        // this.fact = response.data.response
                        this.isLoading = false 
                        console.log(response.data)
                        if(response.data.code==201)
                        {
                            this.open("warning",response.data.message)
                        }
                        if(response.data.code==200)
                        {
                            this.open("success",response.data.message) 
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }
         
        },
    }

</script>
<style>
 .centered {
      display: flex;
      justify-content: center;
      align-items: center; 
    }
.p-multiselect {
    min-width: 15rem;
}

:deep(.multiselect-custom) {
    .p-multiselect-label:not(.p-placeholder) {
        padding-top: .25rem;
        padding-bottom: .25rem;
    }

    .country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
        background-color: var(--primary-color);
        color: var(--primary-color-text);

        img.flag {
            width: 17px;
        }
    }
}
</style>