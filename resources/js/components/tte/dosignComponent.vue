<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- ===== DIALOG: Passphrase ===== -->
        <Dialog header="Konfirmasi Passphrase" v-model:visible="displayModal"
            :containerStyle="{width: '95vw', maxWidth:'420px'}" position="center" :modal="true">
            <div class="pp-wrap">
                <div class="pp-icon">
                    <i class="fas fa-key"></i>
                </div>
                <p class="pp-desc">Masukkan passphrase untuk menandatangani dokumen secara digital</p>
                <div class="pp-field">
                    <label class="pp-label"><i class="fas fa-lock mr-1"></i> Passphrase</label>
                    <InputText type="password" v-model="form.passphrase" autocomplete="off" style="width:100%" placeholder="Masukkan passphrase..." />
                </div>
            </div>
            <template #footer>
                <Button label="Batal" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                <Button label="Tanda Tangani" icon="pi pi-check-circle" @click="submit_ttd()" class="p-button-success" />
            </template>
        </Dialog>

        <div class="container-fluid px-0">

            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-7">

                    <!-- Header -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-file-signature mr-2 text-primary"></i>
                                Tanda Tangan Elektronik
                            </h3>
                            <ProgressBar mode="indeterminate" v-show="isLoading"
                                style="height:.25em;width:130px;border-radius:4px" />
                        </div>
                    </div>

                    <!-- Form -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-header">
                            <h3 class="card-title font-weight-bold mb-0">
                                <i class="fas fa-file-alt mr-2 text-primary"></i>
                                Informasi Dokumen
                            </h3>
                        </div>
                        <div class="card-body">

                            <!-- Nama Dokumen -->
                            <div class="form-group mb-3">
                                <label class="tte-label">
                                    <i class="fas fa-file-alt mr-1"></i> Nama Dokumen
                                </label>
                                <input type="text" v-model="form.nama_dokumen"
                                    style="text-transform:uppercase"
                                    autocomplete="off" class="form-control tte-input"
                                    placeholder="Nama dokumen..." />
                            </div>

                            <!-- Nomor Surat -->
                            <div class="form-group mb-3">
                                <label class="tte-label">
                                    <i class="fas fa-hashtag mr-1"></i> Nomor Surat
                                </label>
                                <input type="text" v-model="form.nomor_surat"
                                    style="text-transform:uppercase"
                                    autocomplete="off" class="form-control tte-input"
                                    placeholder="Nomor surat..." />
                            </div>

                            <!-- Penandatangan -->
                            <div class="form-group mb-3" v-show="false">
                                <label class="tte-label">
                                    <i class="fas fa-users mr-1"></i> Ditandatangani Oleh
                                </label>
                                <MultiSelect v-model="form.user_dipilih" style="width:100%"
                                    :options="user_list" optionLabel="nama_user"
                                    placeholder="Pilih penandatangan..." :filter="true"
                                    class="multiselect-custom">
                                    <template #value="slotProps">
                                        <div class="country-item country-item-value"
                                            v-for="option of slotProps.value" :key="option.nip">
                                            <div>{{ option.nama_user }}</div>
                                        </div>
                                        <template v-if="!slotProps.value || slotProps.value.length === 0">
                                            Pilih penandatangan...
                                        </template>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="country-item">
                                            <i class="fas fa-user mr-2 text-primary"></i>
                                            {{ slotProps.option.nama_user }}
                                        </div>
                                    </template>
                                </MultiSelect>
                            </div>

                            <!-- Total Halaman -->
                            <div class="form-group mb-3">
                                <label class="tte-label">
                                    <i class="fas fa-copy mr-1"></i> Total Halaman
                                </label>
                                <InputNumber v-model="form.halaman" mode="decimal" :min="0" :max="100"
                                    class="w-100" />
                                <small v-if="pageCount !== null" class="text-primary mt-1 d-block">
                                    <i class="fas fa-info-circle mr-1"></i>
                                    PDF terdeteksi: <strong>{{ pageCount }}</strong> halaman
                                </small>
                            </div>

                            <!-- Upload PDF -->
                            <div class="form-group mb-1">
                                <label class="tte-label">
                                    <i class="fas fa-upload mr-1"></i> File PDF
                                </label>
                                <div class="tte-file-wrap">
                                    <input type="file" class="tte-file-input" accept="application/pdf"
                                        @change="onFileChange" id="inputFile" />
                                    <label for="inputFile" class="tte-file-label">
                                        <i class="fas fa-cloud-upload-alt mr-2"></i>
                                        <span>{{ file_size }}</span>
                                    </label>
                                </div>
                                <small class="text-muted mt-1 d-block">
                                    <i class="fas fa-exclamation-circle mr-1 text-warning"></i>
                                    Maksimal ukuran file <strong>700 KB</strong>
                                </small>
                            </div>

                        </div>
                        <div class="card-footer d-flex" style="gap:8px">
                            <Button label="TTD &amp; Simpan" icon="pi pi-check-circle"
                                class="p-button-success" @click="openModal()" />
                            <Button label="Daftar Dokumen" icon="pi pi-list"
                                class="p-button-warning p-button-outlined" @click="closeConfirmation()" />
                        </div>
                    </div>

                    <!-- Logo BSRE -->
                    <div class="card card-outline card-primary shadow-sm mb-3">
                        <div class="card-body d-flex align-items-center" style="gap:12px">
                            <img src="https://bsre.bssn.go.id/img/bsre-logo-full.aa4caa4d.png"
                                width="100" height="30" alt="BSRE BSSN" />
                            <small class="text-muted">
                                Layanan tanda tangan elektronik menggunakan infrastruktur BSRE — Badan Siber dan Sandi Negara
                            </small>
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
    import ProgressBar from 'primevue/progressbar';
    import QrcodeVue from 'qrcode.vue';
    import QRCode from 'qrcode';
    import { degrees, PDFDocument, StandardFonts, componentsToColor, rgb } from 'pdf-lib';
    export default {
        components: {
            Loading,
            InputNumber,
            ProgressBar,
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
            //this.getdata_user();
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

                this.pdf_file = file;

                console.log(file);

                reader.onload = async (e) => {

                    const arrayBuffer = e.target.result;

                    const pdfDoc = await PDFDocument.load(arrayBuffer);

                    //var response = await this.modify_file(arrayBuffer)

                    //this.file_size = e.target.files[0].name + '- file size ' + size + ' kb';

                   // this.pdf_file = response.type

                    //this.pdf_file = response;
                    this.pageCount = pdfDoc.getPageCount();
                    this.form.halaman = this.pageCount;
                }
                reader.readAsArrayBuffer(file);
            },

           async modify_file(file)
            {


                return file;


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
                fd.append("pdf_file", this.form.file_attch);
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

          async submit_ttd()
          {
                this.isLoading = true;
                let fd = new FormData();
                this.closeModal();
                fd.append("pdf_file", this.form.file_attch);
                fd.append("data", JSON.stringify(this.form));

                await axios.post('/ttd_file_v2', fd)
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
<style scoped>
/* ===== LABEL ===== */
.tte-label {
    display: block;
    font-weight: 700;
    color: #333;
    margin-bottom: 5px;
    text-transform: uppercase;
    letter-spacing: .04em;
}

/* ===== INPUT ===== */
.tte-input {
    border: 1.5px solid #ced4da;
    border-radius: 8px;
    padding: 9px 14px;
    transition: border-color .2s, box-shadow .2s;
}
.tte-input:focus {
    border-color: #1565c0;
    box-shadow: 0 0 0 3px rgba(21,101,192,.12);
    outline: none;
}

/* ===== FILE UPLOAD ===== */
.tte-file-wrap { position: relative; }
.tte-file-input {
    position: absolute;
    width: 1px; height: 1px;
    opacity: 0; overflow: hidden;
}
.tte-file-label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 2px dashed #ced4da;
    border-radius: 8px;
    cursor: pointer;
    color: #555;
    font-weight: 600;
    transition: border-color .2s, background .2s;
    background: #f8f9fa;
    word-break: break-all;
}
.tte-file-label:hover {
    border-color: #1565c0;
    background: #e3f2fd;
    color: #1565c0;
}

/* ===== PASSPHRASE DIALOG ===== */
.pp-wrap { padding: 8px 0 16px; text-align: center; }
.pp-icon {
    width: 52px; height: 52px; border-radius: 50%;
    background: linear-gradient(135deg, #1565c0, #42a5f5);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; color: #fff;
    margin: 0 auto 12px;
    box-shadow: 0 4px 12px rgba(21,101,192,.3);
}
.pp-desc { color: #888; margin-bottom: 16px; }
.pp-field { text-align: left; }
.pp-label {
    display: block; font-weight: 700; color: #333;
    margin-bottom: 5px; text-transform: uppercase; letter-spacing: .04em;
}
</style>

<style>
.p-multiselect { min-width: 100%; width: 100%; }
.country-item-value {
    padding: .2rem .5rem;
    border-radius: 4px;
    display: inline-flex;
    margin-right: .4rem;
    background-color: #1565c0;
    color: #fff;
}
</style>
