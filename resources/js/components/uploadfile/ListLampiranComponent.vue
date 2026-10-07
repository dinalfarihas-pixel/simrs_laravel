<template>
    <section class="content">
        <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <!-- ===== DIALOG: UPLOAD FILE ===== -->
        <Dialog header="Upload Lampiran File" v-model:visible="showdialogParam"
            :containerStyle="{width: '50vw'}" position="center" :modal="true">
            <upload-file :noregister="datapasien.NOPENDAFTARAN"
                :moduleupload="modeduleFrom" :foldername="form.foldername">
            </upload-file>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="showdialogParam=false; getdata_lampiran()" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== DIALOG: KAMERA ===== -->
        <Dialog header="Ambil Gambar" v-model:visible="showcamera"
            :containerStyle="{width: '55vw'}" position="center" :modal="true">
            <div class="camera-wrap">
                <video v-if="showCanvas" ref="video" class="camera-video" autoplay></video>
                <img v-if="imageData && !showCanvas" :src="imageData" class="camera-preview" alt="Captured" />
            </div>
            <div class="d-flex justify-content-center mt-3" style="gap:10px">
                <Button label="Buka Kamera" icon="pi pi-camera" class="p-button-warning" @click="startVideo" />
                <Button label="Ambil Gambar" icon="pi pi-circle-fill" class="p-button-danger" @click="capture" />
            </div>
            <canvas ref="canvas" width="640" height="480" style="display:none"></canvas>
            <template #footer>
                <Button label="Tutup" icon="pi pi-times" @click="stopcamera" class="p-button-text" />
            </template>
        </Dialog>

        <!-- ===== GALLERIA FULLSCREEN ===== -->
        <Galleria :value="list_lampiran" v-model:activeIndex="activeIndex"
            :responsiveOptions="responsiveOptions" :numVisible="7"
            :circular="true" :fullScreen="true" :showItemNavigators="true"
            :showThumbnails="false" v-model:visible="displayCustom">
            <template #item="slotProps">
                <img :src="slotProps.item.file_lampiran" :alt="slotProps.item.caption_file"
                    style="width:100%;max-height:90vh;object-fit:contain;display:block" />
            </template>
        </Galleria>

        <div class="container-fluid px-0">

            <!-- ===== HEADER CARD ===== -->
            <div class="card card-outline card-primary shadow-sm mb-3">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title font-weight-bold mb-0">
                        <i class="fas fa-paperclip mr-2 text-primary"></i>
                        Lampiran File
                    </h3>
                    <div class="d-flex align-items-center" style="gap:8px">
                        <ProgressBar mode="indeterminate" v-show="isLoading"
                            style="height:.25em;width:140px;border-radius:4px" />
                        <Button label="Upload File" icon="pi pi-upload" class="p-button-primary p-button-sm"
                            @click="showdialogParam=true" />
                        <Button icon="pi pi-refresh" class="p-button-success p-button-sm p-button-outlined"
                            @click="getdata_lampiran()" title="Refresh" />
                    </div>
                </div>
                <div class="card-body p-3">
                    <small class="text-muted">
                        <i class="pi pi-info-circle mr-1"></i>
                        Klik gambar untuk melihat ukuran penuh. Mendukung format JPG, PNG, PDF.
                    </small>
                </div>
            </div>

            <!-- ===== EMPTY STATE ===== -->
            <div v-if="!isLoading && list_lampiran.length === 0" class="card shadow-sm">
                <div class="card-body empty-state">
                    <i class="fas fa-images"></i>
                    <div class="mt-3 font-weight-bold">Belum ada lampiran</div>
                    <p class="text-muted mt-1">Klik tombol "Upload File" untuk menambahkan lampiran.</p>
                    <Button label="Upload Sekarang" icon="pi pi-upload" class="p-button-outlined p-button-primary mt-2"
                        @click="showdialogParam=true" />
                </div>
            </div>

            <!-- ===== GRID LAMPIRAN ===== -->
            <div v-if="list_lampiran.length > 0" class="lampiran-grid">
                <div v-for="(image, index) in list_lampiran" :key="index" class="lampiran-item">
                    <div class="lampiran-card">
                        <!-- Gambar -->
                        <div class="lampiran-img-wrap" @click="imageClick(index)">
                            <img :src="image.file_lampiran" :alt="image.caption_file" class="lampiran-img" />
                            <div class="lampiran-overlay">
                                <i class="fas fa-search-plus"></i>
                            </div>
                        </div>

                        <!-- Footer kartu -->
                        <div class="lampiran-footer">
                            <div class="lampiran-caption" :title="image.caption_file">
                                {{ image.caption_file || 'Tanpa keterangan' }}
                            </div>
                            <div class="lampiran-actions">
                                <button class="btn-lamp btn-lamp-view" @click="imageClick(index)" title="Lihat">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-lamp btn-lamp-del" @click="hapusLampiranGambar(index)" title="Hapus">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer info -->
            <div v-if="list_lampiran.length > 0" class="text-muted mt-2 mb-3">
                <small>Total <strong>{{ list_lampiran.length }}</strong> lampiran</small>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Galleria from 'primevue/galleria';
    import ProgressBar from 'primevue/progressbar';

    export default {
        components: { Loading, Galleria, ProgressBar },
        props: ['isInput', 'datapasien'],
        data() {
            return {
                responsiveOptions: [
                    { breakpoint: '1024px', numVisible: 5 },
                    { breakpoint: '768px',  numVisible: 3 },
                    { breakpoint: '560px',  numVisible: 1 },
                ],
                imageData: null,
                activeIndex: 0,
                displayCustom: false,
                showCanvas: true,
                form: {
                    startdate: '',
                    enddate: '',
                    noregister: '',
                    foldername: 'LAMPIRAN',
                    id: 0
                },
                isLoading: false,
                fullPage: false,
                showdialogParam: false,
                modeduleFrom: 'LAMPIRAN',
                list_lampiran: [],
                videoStream: null,
                showcamera: false
            };
        },
        mounted() {
            this.form.startdate = new Date();
        },
        created() {
            this.getdata_lampiran();
        },
        methods: {
            startVideo() {
                this.showCanvas = true;
                this.imageData = null;
                navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: 'environment' } } })
                    .then(stream => {
                        this.$refs.video.srcObject = stream;
                        this.videoStream = stream;
                    })
                    .catch(err => console.error('Camera error:', err));
            },
            stopcamera() {
                if (this.videoStream) {
                    this.videoStream.getTracks().forEach(t => t.stop());
                    this.videoStream = null;
                }
                this.showcamera = false;
            },
            capture() {
                const canvas = this.$refs.canvas;
                canvas.getContext('2d').drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
                this.imageData = canvas.toDataURL('image/png');
                this.showCanvas = false;
            },
            imageClick(index) {
                this.activeIndex = index;
                this.displayCustom = true;
            },
            async hapusLampiranGambar(index) {
                if (!confirm('Hapus lampiran ini?')) return;
                this.form.id = this.list_lampiran[index].id;
                this.isLoading = true;
                try {
                    const response = await axios.post('/hapus_datalampiran', this.form);
                    const res = response.data.metadata;
                    if (res.code == 200) {
                        this.list_lampiran.splice(index, 1);
                    } else {
                        alert('Gagal menghapus lampiran');
                    }
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoading = false;
                }
            },
            async getdata_lampiran() {
                this.isLoading = true;
                this.form.noregister = this.datapasien.NOPENDAFTARAN;
                try {
                    const response = await axios.post('/getdata_lampiran', this.form);
                    this.list_lampiran = response.data.response || [];
                } catch (e) {
                    console.error(e);
                } finally {
                    this.isLoading = false;
                }
            },
        }
    }
</script>

<style scoped>
/* ===== EMPTY STATE ===== */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #aaa;
}
.empty-state .fas { font-size: 3.5rem; opacity: .3; }

/* ===== GRID ===== */
.lampiran-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 8px;
}

/* ===== CARD ===== */
.lampiran-card {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,.10);
    transition: transform .2s, box-shadow .2s;
}
.lampiran-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,.15);
}

/* ===== IMAGE ===== */
.lampiran-img-wrap {
    position: relative;
    width: 100%;
    height: 160px;
    overflow: hidden;
    cursor: pointer;
    background: #f0f0f0;
}
.lampiran-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .3s;
}
.lampiran-card:hover .lampiran-img { transform: scale(1.06); }

.lampiran-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,.35);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity .2s;
    color: #fff;
    font-size: 1.8rem;
}
.lampiran-card:hover .lampiran-overlay { opacity: 1; }

/* ===== FOOTER ===== */
.lampiran-footer {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}
.lampiran-caption {
    font-weight: 600;
    font-size: .82rem;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
}
.lampiran-actions { display: flex; gap: 6px; flex-shrink: 0; }

.btn-lamp {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: .8rem;
    transition: opacity .15s;
}
.btn-lamp:hover { opacity: .8; }
.btn-lamp-view { background: #e3f2fd; color: #1565c0; }
.btn-lamp-del  { background: #ffebee; color: #c62828; }

/* ===== KAMERA ===== */
.camera-wrap {
    text-align: center;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.camera-video, .camera-preview {
    max-width: 100%;
    max-height: 380px;
    display: block;
}
</style>
