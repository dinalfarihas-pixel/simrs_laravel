<template>
    <section class="content">
        <div class="container-fluid">
            <!-- <loading v-model:active="isLoading" :is-full-page="fullPage"></loading> -->

            <Dialog header="Catatan Pasien Pindah Ruang" v-model:visible="showPindahruang"
                :containerStyle="{width: '80vw'}" :modal="true">
                <catatan-pemindahan-list :datapasien="details_pasien" :mode=2></catatan-pemindahan-list>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="showPindahruang=false" class="p-button-text" />
                    <Button label="Tutup" icon="pi pi-check" @click="showPindahruang=false" autofocus />
                </template>
            </Dialog>

            <Dialog header="Rekam Medis" v-model:visible="displayBasic2" :containerStyle="{width: '95vw'}"
                class="container_modal" :modal="true">
                <div class="card card-warning card-outline">
                    <div class="card-header">
                        <h3 class="card-title">Menampilkan data rekam medis pasien dalam satu episode rawatan</h3>
                    </div>
                    <div class="card-body">
                        <div class="row invoice-info">
                            <div class="col-md-2">
                                <img width="220px" height="130px" src="https://ws-simrs.link/ilustration/ilustrasi1.png"
                                    alt="Ilustration">
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Pasien KLL <span v-if="details_pasien.KLL==1"><strong>Ya</strong></span>
                                <span v-if="details_pasien.KLL==0"><strong>Tidak</strong></span>
                                <address>
                                    <h5> <strong> {{details_pasien.DATA_SINGKAT}} , {{details_pasien.NOMR}}</strong>
                                    </h5>
                                    {{details_pasien.CARABAYAR}} - <strong> {{details_pasien.NOSEP}}</strong><br>
                                    {{details_pasien.NAMAKECAMATAN}}<br>
                                </address>
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Masuk
                                <address>
                                    <strong> {{details_pasien.MASUKPOLY_DISPLAY}} ,
                                        {{details_pasien.NOPENDAFTARAN}}</strong><br>
                                    Ruangan/Poli, {{details_pasien.POLI}}<br>
                                    DPJP <strong> {{details_pasien.NAMADOKTER}}</strong><br>
                                    Dx Awal
                                    <strong>{{ details_pasien.DIAGNOSA_AWAL }}-{{ details_pasien.DX_CAPTION }}</strong>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- {{ details_pasien }} -->
                <Tabs>
                    <TabList>
                        <Tab>TRIASE IGD</Tab>
                        <Tab>KAJIAN AWAL</Tab>
                        <Tab>OBAT-OBATAN</Tab>
                        <Tab>PENUNJANG</Tab>
                        <Tab v-if="details_pasien.JENISRAWAT=='INAP' || details_pasien.KODEPOLI=='IGD'">OBSERVASI</Tab>
                        <Tab>TINDAKAN</Tab>
                        <Tab v-if="details_pasien.JENISRAWAT=='INAP'">DIET PASIEN (GIZI)</Tab>
                        <Tab v-if="details_pasien.JENISRAWAT=='INAP'">RESUME PASIEN PULANG</Tab>
                        <Tab>LAMPIRAN FILE</Tab>
                        <Tab>TINDAK LANJUT PASIEN</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>

                            <subtriaseigd :datapasien=details_pasien></subtriaseigd>

                        </TabPanel>
                        <TabPanel>

                            <kajianawalpasien :datapasien="details_pasien"></kajianawalpasien>

                        </TabPanel>
                        <TabPanel>

                            <Tabs>
                                <TabList>
                                    <Tab>PERMINTAAN OBAT</Tab>
                                    <Tab>FORMULIR PEMBERIAN OBAT</Tab>
                                    <Tab>REKONSILIASI OBAT</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                    <permintaanobat :datapasien=details_pasien></permintaanobat>

                                    </TabPanel>
                                    <TabPanel>

                                    <pemberian-obat :datapasien=details_pasien></pemberian-obat>

                                    </TabPanel>
                                    <TabPanel>

                                    <rekonsiliasi-obat :datapasien=details_pasien></rekonsiliasi-obat>

                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </TabPanel>
                        <TabPanel>

                            <Tabs>
                                <TabList>
                                    <Tab>LABORATORIUM</Tab>
                                    <Tab>RADIOLOGI</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                    <permintaan-lab :datapasien="details_pasien"></permintaan-lab>

                                    </TabPanel>
                                    <TabPanel>

                                    <permintaan-radiologi :datapasien="details_pasien"></permintaan-radiologi>

                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </TabPanel>
                        <TabPanel v-if="details_pasien.JENISRAWAT=='INAP' || details_pasien.KODEPOLI=='IGD'">

                            <Tabs>
                                <TabList>
                                    <Tab>CPPT</Tab>
                                    <Tab>GRAFIK PERKEMBANGAN PASIEN</Tab>
                                    <Tab>EARLY WARNING SCORE</Tab>
                                    <Tab>PEMANTAUAN CAIRAN</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                    <soap-form :datapasien="details_pasien" :noregister="details_pasien.NOPENDAFTARAN"
                                        :showinstruksi="true"></soap-form>

                                    </TabPanel>
                                    <TabPanel>

                                    <grafik-cppt :noregister="details_pasien.NOPENDAFTARAN"></grafik-cppt>

                                    </TabPanel>
                                    <TabPanel>

                                    <early-warning-score :datapasien="details_pasien"></early-warning-score>

                                    </TabPanel>
                                    <TabPanel>

                                    <form-input-cairan :datapasien="details_pasien"></form-input-cairan>

                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </TabPanel>
                        <TabPanel>

                        <tindakan :datapasien="details_pasien"></tindakan>

                        </TabPanel>
                        <TabPanel v-if="details_pasien.JENISRAWAT=='INAP'">

                        <diet-pasien :datapasien="details_pasien"></diet-pasien>

                        </TabPanel>
                        <TabPanel v-if="details_pasien.JENISRAWAT=='INAP'">

                        <resume-pulang :datapasien="details_pasien"></resume-pulang>

                        </TabPanel>
                        <TabPanel>

                            <Tabs>
                                <TabList>
                                    <Tab>LAMPIRAN FILE PADA KUNJUNGAN INI</Tab>
                                    <Tab>LAMPIRAN SEMUA KUNJUNGAN</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>

                                    <listupload :datapasien="details_pasien"></listupload>

                                    </TabPanel>
                                    <TabPanel>

                                    <listupload-pasien :datapasien="details_pasien"></listupload-pasien>

                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </TabPanel>
                        <TabPanel>

                        <selesai-rawat :datapasien="details_pasien"></selesai-rawat>

                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeBasic2" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeBasic2" autofocus />
                </template>
            </Dialog>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <Message v-show="showmessage" severity="warn"><strong>Terdapat pasien dengan cara bayar "WAITING
                            LIST" mohon di perhatikan</strong></Message>
                    <Toolbar class="mb-0">
                        <template #start>
                            <InputText type="text" v-model="form.norm" placeholder="Cari RM" style="width: 8em; "
                                @keyup.enter="getdata_pasien(7)" class="mr-1" />
                            <!-- <Calendar v-model="form.startdate" class="text-sm mr-1" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 12em; " /> -->
                            <Button label="" align="" @click="getdata_pasien(7)" icon="pi pi-check"
                                class="p-button mr-2" />
                            <Button :label="'Pasien Mengantri ('+ antrian_pasien+ ')'"
                                @click="show_list_pasien_pindah_ruang()" :class="class_button"
                                icon="pi pi-check"></Button>
                        </template>
                        <template #end>
                            <Select v-model="form.ruanganselected" style="width: 15em;" class="mr-2"
                                :options="ruangan" optionLabel="NAMA" @change="change_ruangan" :filter="true"
                                placeholder="Pilh ruangan rawat" :showClear="false">
                                <template #option="slotProps">
                                    <div class="p-dropdown-car-option">
                                        <span>{{slotProps.option.NAMA}}</span>
                                    </div>
                                </template>
                            </Select>
                            <!-- <Button label="Proses" @click="getdata()" style="height: 2.5em;" icon="pi pi-refresh"
                                class="p-button-help mr-2" /> -->
                        </template>
                    </Toolbar>
                </div>
            </div>


            <Sidebar v-model:visible="visibleFull" :baseZIndex="1000" position="full">
                <div class="card card-warning card-outline">
                    <div class="card-header">
                        <h3 class="card-title">Data kunjungan pasien</h3>
                    </div>
                    <div class="card-body">
                        <div class="row invoice-info">
                            <div class="col-sm-4 invoice-col">
                                Pasien
                                <address>
                                    <strong> {{details_pasien.DATA_SINGKAT}} , {{details_pasien.NOMR}}</strong><br>
                                    {{details_pasien.CARABAYAR}} - <strong> {{details_pasien.NOSEP}}</strong><br>
                                    {{details_pasien.NAMAKECAMATAN}}<br>
                                </address>
                            </div>
                            <div class="col-sm-4 invoice-col">
                                Masuk
                                <address>
                                    <strong> {{details_pasien.MASUKPOLY_DISPLAY}} ,
                                        {{details_pasien.NOPENDAFTARAN}}</strong><br>
                                    Ruangan/Poli, {{details_pasien.POLI}}<br>
                                    DPJP <strong> {{details_pasien.NAMADOKTER}}</strong><br>
                                </address>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-12">

                    </div>

                </div>
            </Sidebar>

            <div class="card" style="height: 100%">
                <div class="card-header">
                    <ProgressBar mode="indeterminate" v-show="isLoading" style="height: .2em" />
                </div>
                <div class="card-body">
                    <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                        <table class="table table-bordered table-striped  dataTable dtr-inline">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>#</th>
                                    <th>PASIEN</th>
                                    <th>ALAMAT</th>
                                    <th>NOPENDAFTARAN</th>
                                    <th>MASUK</th>
                                    <th>LOS</th>
                                    <th>CARA BAYAR</th>
                                    <th>AKSI</th>
                                    <th>PINDAH RUANGAN</th>
                                    <th>JENIS RAWAT</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="(row,k) in fact">
                                    <td class="text-center">
                                        <h5>{{ k+1 }}</h5>
                                    </td>
                                    <td>
                                        <span v-if="row.JENISKELAMIN=='P'">
                                            <ion-icon size="large" style="color: pink;" name="woman-sharp"></ion-icon>
                                        </span>
                                        <span v-if="row.JENISKELAMIN=='L'">
                                            <ion-icon size="large" style="color: navy;" name="man-sharp"> </ion-icon>
                                        </span>
                                    </td>
                                    <td>
                                        <h5>
                                            # {{row.NOMR}} - {{row.DATA_SINGKAT}}</h5>
                                        <p style="color: cadetblue;">{{row.NAMADOKTER}}</p>
                                    </td>
                                    <td>{{ row.ALAMAT }}</td>
                                    <td>
                                        <span v-if="row.STATUS==0">
                                            <span class="badge badge-danger">Sedang rawat</span>
                                        </span>
                                        <span v-if="row.STATUS!=0">
                                            <span class="badge badge-success">{{row.KETERANGAN}}</span>
                                        </span>
                                        <br />
                                        {{row.POLI}}
                                    </td>
                                    <td>M: {{ row.MASUKPOLY_DISPLAY }} <br /> K :{{ row.KELUARPOLY }}</td>
                                    <td>
                                        <h5> <strong> {{row.JLM_HARI_RAWAT}}</strong></h5> hari
                                    </td>
                                    <td>
                                        <span v-if="row.KODECARABAYAR==27 || row.KODECARABAYAR==28">
                                            <button type="button" class="btn btn-block btn-danger btn-sm">
                                                <ion-icon name="wallet-outline"></ion-icon>{{ row.CARABAYAR }}
                                            </button>
                                        </span>
                                        <span v-else>
                                            <button type="button" class="btn btn-block btn-outline-success btn-sm">
                                                <ion-icon name="wallet-outline"></ion-icon>{{ row.CARABAYAR }}
                                            </button>
                                        </span>
                                    </td>

                                    <td>
                                        <button type="button" class="btn btn-block btn-info btn-sm" style="width: 10em;"
                                            @click="showdetails(row)">
                                            <ion-icon name="apps-outline"></ion-icon>
                                        </button>

                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-block btn-outline-info btn-sm"
                                            style="width: 5em;" @click="pasiwn_pindah_ruang(row)">
                                            <ion-icon style="color: turquoise;" name="arrow-redo-outline"> </ion-icon>
                                        </button>

                                        <small>{{ row.HAKKELAS }}</small>
                                    </td>
                                    <td>
                                        <p>{{row.JENISRAWAT}}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Dialog header="TRANSFER RUANGAN" v-model:visible="form_pindahruang" :containerStyle="{width: '80vw'}"
                :modal="true">

                <div class="card card-warning card-outline">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <p>
                                    <ion-icon name="sync" style="color: turquoise;"></ion-icon> Ruangan asal
                                </p>
                                <h5>{{ namaruagan_asal }}</h5>
                            </div>
                            <div class="col-md-8">
                                <p>
                                    <ion-icon name="sync" style="color: turquoise;"></ion-icon> Ruangan Tujuan
                                </p>

                                <DataTable :value="dataruangan_realtime" stripedRows class="p-datatable-sm"
                                    responsiveLayout="scroll">
                                    <template #header>
                                        Small Table
                                    </template>
                                    <Column field="NAMA" header="NAMA"></Column>
                                    <Column field="TERSEDIA" header="TERSEDIA"></Column>
                                    <Column field="quantity" header="AKSI">
                                        <template #body="slotProps">
                                            <Button @click="excute_pindah_ruangan(slotProps.data)" label="Pindah"
                                                class="p-button p-button-sm p-button-success" />
                                        </template>
                                    </Column>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                </div>
                <template #footer>
                    <Button label="Batal" icon="pi pi-times" @click="form_pindahruang=false" class="p-button-text" />
                </template>
            </Dialog>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import ProgressBar from 'primevue/progressbar';
    import Sidebar from 'primevue/sidebar';
    import Dialog from 'primevue/dialog';
    import Tabs from 'primevue/tabs';
    import TabList from 'primevue/tablist';
    import Tab from 'primevue/tab';
    import TabPanels from 'primevue/tabpanels';
    import TabPanel from 'primevue/tabpanel';
    import Message from 'primevue/message';

    export default {
        components: {
            Loading,
            Sidebar,
            Dialog,
            Tabs, TabList, Tab, TabPanels, TabPanel,
            Message,
            ProgressBar
        },
        props: {
            msg: String
            },
        data() {
            return {
                fact: [],
                antrian_pasien: 0,
                class_button: '',
                form: {
                    startdate: '',
                    enddate: '',
                    mode: 'history15',
                    kodeunit: '',
                    norm: '',
                    ruanganselected: {
                        NAMA: '',
                        KODE: ''
                    },
                    ruangan_tujuan_transfer: null,
                    old_ruangan: 0,
                    id_ruangan: 0,
                    noregister: ''
                },

                int_kd_ruangan_user: null,
                isLoading: false,
                fullPage: true,
                visibleFull: false,
                displayBasic2: false,
                form_pindahruang: false,
                namaruagan_asal: null,
                details_pasien: [],
                ruangan: [],
                dataruangan_realtime: [],
                kode_unit_login: null,
                splitParts_kode_unit: [],
                characterFound: false,
                showmessage: false,
                showPindahruang: false
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
        },
        created() {
            //this.fetchData();
            this.getdata_pasien(41);
            //this.getruangan_user_login();
            this.getnamaruangan_poli();
            this.getkode_unit();
            this.getnotif_pindahruangan();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                //console.log(this.form.startdate);
            },
            show_list_pasien_pindah_ruang() {
                this.showPindahruang = true;
            },
            checkCharacter(param) {
                var containsComma = false;
                if (typeof param === 'string') {
                    containsComma = param.includes(',');
                    containsComma = true;

                } else {
                    containsComma = false;
                }

                return containsComma
            },
            getkode_unit() {
                axios.post('/getruangan_user_login')
                    .then(response => {
                        this.kode_unit_login = response.data
                        this.splitParts_kode_unit = [];
                        this.characterFound = this.checkCharacter(this.kode_unit_login);
                        if (this.characterFound == true) {
                            this.splitParts_kode_unit = this.kode_unit_login.split(',').map(item => item.trim());
                            this.isLoading = false
                        } else {
                            this.splitParts_kode_unit.push(this.kode_unit_login);
                        }

                        console.log(this.splitParts_kode_unit);
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            showdetails(pasien) {
                this.openBasic2();
                this.details_pasien = pasien;
            },
            async change_ruangan(e) {
                console.log(e.value);
                this.form.kodeunit = e.value.KODE
                this.getdata_pasien(41)
            },
            async pasiwn_pindah_ruang(data) {
                console.log(data)
                this.pasien_sedang_rawat_inap();
                this.form.old_ruangan = data.KODERUANGAN
                this.form_pindahruang = true;
                this.form.noregister = data.NOPENDAFTARAN;
                this.details_pasien = data;
            },

            open(type, message) {
                this.$toast.open({
                    message: message,
                    position: 'top-right',
                    type: type,
                    duration: 4000,
                    dismissible: true
                })
            },
            async excute_pindah_ruangan(data) {
                this.form.id_ruangan = data.KD_RUANGAN;

                this.isLoading = true

                await axios.post('/pasien_pindah_ruangan', this.form)
                    .then(response => {
                        var res = response.data
                        console.log(res);
                        if (res == 200) {
                            this.open("success", "Sukses");
                        }
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getdata_pasien(mode) {
                this.fact = [];
                this.form.mode = mode;
                this.isLoading = true;
                console.log(this.form)
                await axios.post('/getpasien_api', this.form)
                    .then(response => {
                        console.log(response.data);
                        this.fact = response.data.response

                        this.showmessage = false
                        for (let i = 0; i < this.fact.length; i++) {
                            if (this.fact[i].KODECARABAYAR == 27 || this.fact[i].KODECARABAYAR == 28) {
                                this.showmessage = true;
                                break
                            }
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },

            openBasic2() {
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            },

            async pasien_sedang_rawat_inap() {
                await axios.post('/pasien_sedang_rawat_inap')
                    .then(response => {

                        this.isLoading = true
                        this.dataruangan_realtime = response.data.response

                        for (let i = 0; i < this.dataruangan_realtime.length; i++) {
                            this.dataruangan_realtime[i].MYROOM = 0

                            for (let j = 0; j < this.splitParts_kode_unit.length; j++) {
                                if (this.dataruangan_realtime[i].KD_RUANGAN == this.splitParts_kode_unit[j]) {
                                    this.dataruangan_realtime[i].MYROOM = 1
                                }
                            }
                        }

                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getnamaruangan_poli() {
                this.form.mode = 0
                await axios.post('/getnamaruangan_poli', this.form)
                    .then(response => {
                        console.log('data ruangan')
                        console.log(response.data)
                        this.ruangan = response.data
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async getnotif_pindahruangan() {
                await axios.post('/getnotif_pindahruangan')
                    .then(response => {
                        console.log(response.data);
                        this.antrian_pasien = response.data.response.antrian
                        if (this.antrian_pasien > 0) {
                            this.class_button = "p-button p-button-danger";
                        } else {
                            this.class_button = "p-button p-button";
                        }
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            }
        }
    }

</script>
