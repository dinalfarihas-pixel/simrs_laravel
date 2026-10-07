<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header"> 
                    <Button label="" icon="pi pi-refresh" @click="getdata_lampiran()" autofocus />
                </div>
                <div class="card-body">

                    <DataTable fixTableHead :value="list_lampiran" :rowHover="true" columnResizeMode="fit" selectionMode="single"
                        stripedRows sortMode="multiple" class="p-datatable-sm mt-4" responsiveLayout="scroll"
                        :resizableColumns="true">
                        <template #header>
                           
                        </template>
                        <template #loading>
                            Loading customers data. Please wait.
                        </template>
                    

                        <Column field="NOPENDAFTARAN" :sortable="true" header="NOREGISTER" :styles="{'width':'10em'}">
                        </Column>
                        <Column field="tglreg" :sortable="true" header="TGL"></Column>
                        <Column field="namadokter" :sortable="true" header="DOKTER"></Column> 
                        <Column field="poli" :sortable="true" header="POLI"></Column>
                        <Column field="caption_file" :sortable="true" header="CAPTION"></Column>
                        <Column field="jenisrawat" :sortable="true" header="JENIS RAWAT"></Column>
                        <Column field="POLI" :sortable="true" header="POLI/RUANG"></Column>
                        <Column field=""  header="LAMPIRAN">  
                            <template #body='slotProps'>
                                <img class="previewer-demo-img" :src="slotProps.data.src" width="100"
                                @click="show(0,slotProps.data)"  /> 
                            </template>
                        </Column> 
                        <!-- <Column field="JENISRAWAT" :sortable="true" header="JENIS RAWAT"></Column> -->

                    </DataTable>
                    <div>
                        <!-- <img class="previewer-demo-img" v-for="(item, index) in list_lampiran" :src="item.src" width="100"
                            @click="show(index)" :key="index" /> -->
                      
                    </div>
                </div>
            </div>
            <previewer ref="previewer" :list="list" :options="options"> </previewer>
        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    export default {
        components: {
            Loading
        },
        props: ['datapasien'],
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                },
                isLoading: false,
                fullPage: true,
                list_lampiran: [], 
                list: [  
                ],
                options: {
                    getThumbBoundsFn(index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[
                            index
                        ];
                        // get window scroll Y
                        let pageYScroll =
                            window.pageYOffset || document.documentElement.scrollTop;
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect();
                        // w = width
                        return {
                            x: rect.left,
                            y: rect.top,
                            w: rect.width
                        };
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                },
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.getdata_lampiran();
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            show(index,data) {
          
                this.list=[
                    {
                        msrc:data.msrc,
                        src:data.src,
                        w: 0,
                        h: 0
                    }
                ]

                console.log(this.list)
                this.$refs.previewer.show(index);
            },
            async getdata_lampiran() {
                this.isLoading = true;
                this.form.nomr = this.datapasien.NOMR
                this.form.jenisrawat = 'JALAN';
                this.mod
                await axios.post('/get_filelampiran_pasien', this.form)
                    .then(response => {
                        console.log(response.data)
                        this.list_lampiran = response.data.response
                        this.isLoading = false
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
                    duration: 3000,
                    dismissible: true
                })
            },
        },
    }

</script>
