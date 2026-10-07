<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <Dialog header="Tanda tangan" v-model:visible="displayModal" :containerStyle="{width: '30vw'}" :modal="true">
                <div class="card-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Passphrase</label><br />
                        <InputText type="password" v-model="phasepress" autocomplete="off" style="width: 30em;" />
                    </div>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" @click="closeModal" class="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" @click="closeModal" autofocus />
                </template>
            </Dialog>
            <Dialog header="Header" v-model:visible="displayBasic2" :containerStyle="{width: '60vw'}" :modal="false">
                <div class="card-body">
                    <PDFViewer :source="url_pdf" style="height: 70vh; width: 60vw" />
                </div>
                <template #footer>
                    <Button label="Lakukan tanda tangan" icon="pi pi-pencil" @click="openModal()"
                        class="p-button-text" />
                    <Button label="Tutup" icon="pi pi-check" @click="closeBasic2" autofocus />
                </template>
            </Dialog>
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Filter data</h3>
                </div>
             
                <Toolbar style="background-color: white;">
                    <template #start>
                        <SelectButton v-model="value2" :options="paymentOptions"  optionLabel="name">
                            <template #option="slotProps">
                            <div class="car-option" @click="filterdata(slotProps.option.value)">
                                <div>{{slotProps.option.name}}</div>
                            </div>
                        </template>
                        </SelectButton>
     
                    </template>

                    <template #end>
                        <!-- <Button icon="pi pi-search" class="mr-2" />
                        <Button icon="pi pi-calendar" class="p-button-success mr-2" />
                        <Button icon="pi pi-times" class="p-button-danger" /> -->
                    </template>
                </Toolbar>
            </div>

            <div class="card">

                <div class="card-body  table-sm table-responsive p-10" style="height: 700px;">
                    <table class="table table-bordered table-striped  dataTable dtr-inline">
                        <thead>
                            <tr>
                                <th>

                                </th>
                                <th>

                                </th>
                                <th>

                                    <div class="input-group input-group-sm">
                                        <input type="text" v-model="filters.nama_dokument.value" autocomplete="off"
                                            name="table_search" class="form-control float-left" placeholder="Search">
                                    </div>
                                </th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>

                            </tr>
                            <tr>
                                <th>NO</th>
                                <th>NOMOR</th>
                                <th>
                                    PERIHAL
                                </th>
                                <th>TGL PENGAJUAN</th>
                                <th>TTD OLEH</th>
                                <th>STTS</th> 
                                <th>AKSI</th> 
                            </tr>

                        </thead>
                        <tbody>
                            <tr v-for="(row,k) in fact">
                                <td>{{ k+1 }}</td>
                                <td>
                                    
                                  
                                    <!-- <Button :label="row.nomor_surat" @click="openBasic2(row.link_lampiran)"
                                        icon="pi pi-file-pdf"  class="p-button-link"
                                         /> -->
                                    <a :href="row.link_lampiran" target="_blank">  {{ row.nomor_surat }}</a>

                                </td>
                                <td>{{ row.nama_dokument }} </td>
                                <td>{{ row.tgl_pengajuan }}</td>
                                <td style="text-align: center;">
                                    <span v-for="user in row.detail_user">

                                        <Chip :label="user.user_name"
                                            image="https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg"
                                            class="mr-2 custom-chip" /> <br /> 
                                    </span>
                                </td>
                                <td style="text-align: center;">
                                    <span v-for="user in row.detail_user">
                                        <!-- <Badge value="Menunggu" class="mr-2 p-button-raised " icon="pi pi-pencil" severity="" ></Badge>   -->
                                        <!-- <Button :label="user.stts" @click="check_user_ttd()" icon="pi pi-check"
                                            :class="user.css" />
                                        <br /> -->
                                        <Tag :value="user.stts" :severity="user.css"></Tag>
                                        <!-- <Badge :value="user.stts" size="small" class="p-button-raised" :severity="user.css"></Badge> -->
                                    </span>

                                </td>
                                <td>
                                    <Button label="" @click="hapus_tte(row.id)"
                                        icon="pi pi-times"  class="p-button-danger p-button-text"
                                         />
                                </td>
                              

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import PDFViewer from 'pdf-viewer-vue/dist/vue3-pdf-viewer'
    import Tag from 'primevue/tag';
    import Chip from 'primevue/chip';
    import SplitButton from 'primevue/splitbutton';
    import Toolbar from 'primevue/toolbar';
    import SelectButton from 'primevue/selectbutton';
    export default {
        components: {
            Loading,
            PDFViewer,
            Tag,
            Chip,
            SplitButton,
            SelectButton
        },
        props: {
            msg: String,
        },
        data() {
            return {
                temp_data:[],
                filters: {
                    nama_dokument: {
                        value: '',
                        keys: ['nama_dokument'],
                    },
                },
                fact: [],
                paymentOptions: [
                    {name: 'Semua', value: 1},
                    {name: 'Yang belum TTD', value: 2},
                    {name: 'Yang sudah TTD', value: 3}
                ],
                value2: [
                    {name: 'Semua', value: 1},
                ],
                displayModal: false,
                phasepress: '',
                url_pdf: '',
                displayBasic2: false,
                form: {
                    startdate: '',
                    enddate: '',
                    id:''
                },
                isLoading: false,
                fullPage: true,
                items: [{
                        label: 'Update',
                        icon: 'pi pi-refresh',
                        command: () => {
                            this.$toast.add({
                                severity: 'success',
                                summary: 'Updated',
                                detail: 'Data Updated',
                                life: 3000
                            });
                        }
                    },
                    {
                        label: 'Batalkan',
                        icon: 'pi pi-times',
                        command: () => {
                            this.$toast.add({
                                severity: 'warn',
                                summary: 'Delete',
                                detail: 'Data Deleted',
                                life: 3000
                            });
                        }
                    },
                ]
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            this.getlist_ttd();

        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            openBasic2(url) {
                this.url_pdf = url;
                this.displayBasic2 = true;
            },
            closeBasic2() {
                this.displayBasic2 = false;
            },
            openModal() {
                this.displayModal = true;
            },
            closeModal() {
                this.displayModal = false;
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

            async hapus_tte(id)
            {
                this.form.id = id;
                this.isLoading = true
                await axios.post('/hapus_tte',this.form)
                    .then(response => { 
                        this.isLoading = false  
                        if(response.data.metadata.code==200)
                        {
                            this.open('success','Data telah dihapus')
                            this.getlist_ttd();
                        }
                        else
                        {
                            this.open('warning','Data telah dihapus')
                        }
                        
                    
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async check_user_ttd() {
                this.isLoading = true
                await axios.post('/ttd-api-checkuser')
                    .then(response => { 
                        this.isLoading = false
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            filterdata(value)
            { 
                this.isLoading = true
                if (value == 1) { 
                    this.fact = this.temp_data; 
                }
                if (value == 2) {
                    this.fact = this.temp_data;
                    this.fact = this.fact.filter(x => x.sudah_ttd == 0);
                }
                if (value == 3) {
                    this.fact = this.temp_data;
                    this.fact = this.fact.filter(x => x.sudah_ttd == 1);
                }
                this.isLoading = false
                //this.temp_data=
            },
            async getlist_ttd() {
                this.isLoading = true
                await axios.post('/getlist_ttd')
                    .then(response => {
                        this.fact = response.data.response
                        this.temp_data = response.data.response 
                        this.isLoading = false
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
