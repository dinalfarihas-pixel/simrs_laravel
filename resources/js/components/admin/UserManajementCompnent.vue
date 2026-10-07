<template>
    <section class="content">
        <div class="container-fluid">

            <Dialog header="UPDATE USER" v-model:visible="showModal" :containerStyle="{width: '80vw'}" :modal="true">
                <div class="card">
                    <div class="card-header">

                    </div>
                    <div class="card-body">

                        <div class="row">
                            <!-- Basic Information -->
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>USER ID</label>
                                    <input type="text" disabled class="form-control" v-model="form.NIP">
                                </div>
                                <div class="form-group">
                                    <label>Nama User</label>
                                    <input type="text" disabled class="form-control" v-model="form.NAMA_USER">
                                </div>
                                <div class="form-group">
                                    <label>NIK</label>
                                    <input type="text" disabled class="form-control" v-model="form.NIK">
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" disabled class="form-control" v-model="form.PWD">
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" v-model="form.EMAIL">
                                </div>
                            </div>

                            <!-- Professional Information -->
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Jabatan</label>
                                    <input type="text" disabled class="form-control" v-model="form.JABATAN">
                                </div>
                                <div class="form-group">
                                    <label>Profesi</label>
                                    <input type="text" disabled class="form-control" v-model="form.PROFESI">
                                </div>

                                <div class="form-group">
                                    <label>Unit (Ruangan tempat bekerja)</label> <br>
                                    <!-- <input type="text" class="form-control" v-model="form.KDUNIT"> -->
                                    <MultiSelect v-model="temp_ruang_selected" id="kode" style="width: 100%;"
                                        class="multiselect-custom" :options="ruangan_all" optionLabel="nama"
                                        display="chip" :filter="true" placeholder="ruangan/poli" :showClear="true">
                                    </MultiSelect>
                                </div>
                                <div class="form-group">
                                    <label>Jenis Rawat</label>
                                    <input type="text" disabled class="form-control" v-model="form.JENISRAWAT">
                                </div>
                            </div>

                            <!-- Additional Information -->
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Loket</label>
                                    <input type="text" class="form-control" v-model="form.LOKET">
                                </div>
                                <div class="form-group">
                                    <label>Kode Dokter</label>
                                    <input type="text" class="form-control" v-model="form.KD_DOKTER">
                                    <div class="alert alert-primary" role="alert"
                                        style="margin-top: 1em; opacity: 0.3;">
                                        Jika user merupakan dokter, maka kode dokter wajib di isi
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Kode Dokter BPJS</label>
                                    <input type="text" class="form-control" v-model="form.KD_DOKTER_BPJS">
                                </div>
                            </div>

                            <!-- System Information -->
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>ID Lokasi</label>
                                    <p class="mute">Jika user ingin melakukan permintaan barang logistik maka ini akan
                                        menjadi id tujuan pengiriman logistik</p><br>
                                    <!-- <input type="text" class="form-control" v-model="form.ID_LOKASI"> -->
                                    <Select v-model="temp_lokasi_selected" style="width: 100%;" class="mr-2"
                                        :options="lokasi_arr" optionLabel="CAPION" :filter="true" placeholder="Lokasi"
                                        :showClear="false">
                                        <template #value="slotProps">
                                            <div class="p-dropdown-car-value" v-if="slotProps.value">
                                                <span>{{slotProps.value.CAPION}}</span>
                                            </div>
                                            <span v-else>
                                                {{slotProps.placeholder}}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="p-dropdown-car-option">
                                                <span>{{slotProps.option.CAPION}}</span>
                                            </div>
                                        </template>
                                    </Select>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <template #footer>
                    <Button label="Tutup" icon="pi pi-times" @click="showModal=false" class="p-button-text" />
                    <Button label="Simpan" class="p-button warninng" @click="update_user()" icon="pi pi-check"
                        autofocus />
                </template>
            </Dialog>

            <Dialog header="Register user" v-model:visible="showRegister" :containerStyle="{width: '80vw'}" :modal="true">
                <register-user></register-user>

                <template #footer>
                    <Button label="Tutup" icon="pi pi-times" @click="showRegister=false" class="p-button-text" />
                    <Button label="Simpan" class="p-button warninng" @click="update_user()" icon="pi pi-check"
                        autofocus />
                </template>

            </Dialog>


            <Dialog header="Assign Menu" v-model:visible="showAssignMenu" :containerStyle="{width: '80vw'}" :modal="true">

                <div class="card">
                    <div class="card-header">
                        <div class="search-box mb-3">
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="filterMenu" placeholder="Search..."
                                    @input="handleSearch">
                                <div class="input-group-append">
                                    <span class="input-group-text">
                                        <i class="fas fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-striped table-sm dataTable dtr-inline">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Groups</th>
                                    <th>Menu</th>
                                    <th>Url</th>
                                    <th>Check</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="row in filteredMenus" :key="row.id">
                                    <td>{{ row.id }} </td>
                                    <td>{{ row.groups }} </td>
                                    <td>{{ row.menus }} </td>
                                    <td>{{ row.path_url }} </td>
                                    <td>
                                        <InputSwitch v-model="row.checked" @change="handleSwitchChange(row)" />
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> 

                <template #footer>
                    <Button label="Tutup" icon="pi pi-times" @click="showAssignMenu=false" class="p-button-text" />
                    <Button label="Simpan" class="p-button warninng" @click="doSaveUpdateMenu()" icon="pi pi-check"
                        autofocus />
                </template>

            </Dialog>


            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <div class="search-box mb-3">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="searchQuery" placeholder="Search..."
                                @input="handleSearch">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body table-sm table-responsive p-10" style="height: 700px;">
                    <!-- Search Box -->
                    <Button label="Add user" @click="CallRegister" class="p-button p-button-danger p-button-sm"
                        style="padding-top: 1em;" icon="pi pi-plus" autofocus />

                    <Button label="Refresh" @click="get_user" class="p-button p-button-default p-button-sm"
                        style="padding-top: 1em;" icon="pi pi-refresh" autofocus />
<!-- 
                    <Button label="Refresh" class="p-button p-button-default p-button-sm" style="padding-top: 1em;"
                        icon="pi pi-refresh" @click="showModal=true" autofocus /> -->

                    <table class="table table-bordered table-striped table-sm dataTable dtr-inline">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nama</th>
                                <th>Ruangan</th>
                                <th>Aksi</th>
                                <th>Menu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in filteredData" :key="row.id">
                                <td>{{ row.NIP }} </td>
                                <td>{{ row.NAMA_USER }}</td>
                                <td>
                                    <span v-for="ruangan in row.RUANGAN">
                                        <Tag severity="secondary" :value="ruangan.nama" style="padding-left: 7px;">
                                        </Tag>
                                    </span>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-success btn-sm"
                                        @click="CallModal(row)">Modif</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-success btn-sm"
                                        @click="update_menus(row)">Asiign Menu</button>
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
    import Tag from 'primevue/tag'
    import Dialog from 'primevue/dialog';
    import MultiSelect from 'primevue/multiselect';
    export default {
        components: {
            Loading,
            Tag
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                currentPage: 1,
                totalPages: 0,
                showModal: false,
                showRegister: false,
                showAssignMenu: false,
                lokasi_arr: [],
                ruangan_all: [],
                selectedMenu: null,    
                selecteMenuToSaved:[],            
                isLoading: false,
                fullPage: true,
                temp_ruang_selected: [],
                temp_lokasi_selected: null,
                searchQuery: '', // Added for search functionality
                filterMenu: '', 
                form: {
                    ID: '',
                    JENIS_NOINDUK: '',
                    NOINDUK: '',
                    JABATAN: '',
                    PROFESI: '',
                    NIP: '',
                    NAMA_USER: '',
                    KD_DOKTER: '',
                    KD_DOKTER_BPJS: '',
                    PWD: '',
                    KDUNIT: '',
                    DEPARTEMEN: '',
                    JENISRAWAT: '',
                    LOKET: '',
                    JENIS_LOKET: '',
                    USER_ID_INV: '',
                    NIK: '',
                    COB_CD: '',
                    ID_LOKASI: '',
                    ID_LOKASI_INV: '',
                    EMAIL: '',
                    FGL: '',
                    ID_CLIENT: '',
                    lokasi_selected: null,
                    ruangan_selected: [],
                    RUANGAN: [],

                },
                menus: [],
               
            };
        },
        computed: {
            filteredData() {
                if (!this.searchQuery) {
                    return this.fact;
                }

                const query = this.searchQuery.toLowerCase();
                return this.fact.filter(item => {
                    return Object.values(item).some(value =>
                        String(value).toLowerCase().includes(query)
                    );
                });
            },
            filteredMenus() {  // renamed for clarity and consistency
            // Early return if no filter
                if (!this.filterMenu?.trim()) {
                    return this.menus;
                }

                const query = this.filterMenu.toLowerCase().trim();
                const searchableProps = ['name', 'menus', 'groups']; // adjust based on your menu structure

                return this.menus.filter(item => 
                    searchableProps.some(prop => {
                        const value = item[prop];
                        if (value == null) return false;
                        return String(value).toLowerCase().includes(query);
                    })
                );
            }
        }, 
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate); 
        },


        created() {
            //this.fetchData();
            this.get_user();
            this.get_lokasi();
            this.get_data_all_ruangan();
            this.get_all_menu();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            async handleSwitchChange(row) { 
                // Handle error  
                const menu_saved ={
                   data: row
                }
                await axios.post('/admin/do_update_menu', menu_saved)
                    .then(response => {
                        console.log(response.data); 
                        this.open('success',response.data.metadata.message)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)

                console.log('arr to save',this.selecteMenuToSaved)
            },
            async doSaveUpdateMenu()
            { 
                this.showAssignMenu = false;
            },
            async update_menus(row) {

                this.selecteMenuToSaved =[]; //Reset menu
                await axios.post('/admin/get_menu_assigned', row)
                    .then(response => {
                        const menu_selected = response.data.response

                        console.log(menu_selected);

                        const updateMenuSelection = (menus, selectedMenus) => {
                            // Create a Set of selected menu IDs for O(1) lookup
                            const selectedIds = new Set(selectedMenus.map(item => item.group_menu_id)); 
                            // Update menus with a single iteration
                            return menus.map(menu => ({
                                ...menu,
                                checked: selectedIds.has(menu.id),
                                nip:row.NIP,
                                row: true
                            }));
                        };

                        // Usage example:
                        const updatedMenus = updateMenuSelection(this.menus, menu_selected);
                        this.menus = updatedMenus;

                        this.showAssignMenu = true;
                        console.log(this.menus);

                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)


            },
            async get_data_all_ruangan() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.post('/admin/get_data_all_ruangan', "")
                    .then(response => {
                        this.ruangan_all = response.data.response

                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_lokasi() {
                const dataform = new FormData();
                this.isLoading = true;
                await axios.get('/getlokasi-api', "")
                    .then(response => {
                        this.lokasi_arr = response.data.response

                        // console.log(response.data.response);
                        //this.lokasi_arr = this.lokasi_arr.filter(x => x.IS_HQ=="1") 
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    .finally(() => this.isLoading = false)
            },
            CallModal(row) {

                this.showModal = true;
                this.form = row
                console.log(row);
                // this.form.ruangan_selected = []; 

                const ruangan_list = this.ruangan_all;
                this.temp_ruang_selected = [];
                this.temp_lokasi_selected = null;

                row.RUANGAN.forEach(ruangan => {
                    const matchingRooms = ruangan_list.find(x => x.kode === ruangan.kode);
                    if (matchingRooms) {
                        this.temp_ruang_selected.push(matchingRooms);
                    }
                });

                const lokasi = this.lokasi_arr.find(x => x.ID === row.ID_LOKASI);
                this.temp_lokasi_selected = lokasi;

            },
            CallRegister() {
                this.showRegister = true;
            },
            handleSearch() {
                // Reset to first page when searching 

                // Debounce search to avoid too many updates
                if (this.searchTimeout) {
                    clearTimeout(this.searchTimeout);
                }

                this.searchTimeout = setTimeout(() => {
                    // The filteredData computed property will handle the actual filtering
                }, 300);
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

            async get_all_menu() {
                await axios.post('/admin/get_all_menu', this.form)
                    .then(response => {
                        this.isLoading = false
                        this.showModal = false
                        this.menus = response.data.response;
                        //console.log(response.data)

                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async update_user() {
                //this.isLoading = true;
                this.form.ruangan_selected = this.temp_ruang_selected;
                this.form.lokasi_selected = this.temp_lokasi_selected;

                await axios.post('/admin/simpan_update_user', this.form)
                    .then(response => {
                        this.isLoading = false
                        this.showModal = false
                        console.log(response.data)
                        this.open("success", response.data.metadata.message)
                        this.get_user();
                    })
                    .catch(error => {
                        console.log(error)
                        this.isLoading = false
                    })
                    .finally(() => this.isLoading = false)
            },
            async get_user() {
                this.isLoading = true;
                await axios.post('/admin/get_user', this.form)
                    .then(response => {
                        this.isLoading = false
                        console.log(response.data)
                        this.fact = response.data.response
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
 