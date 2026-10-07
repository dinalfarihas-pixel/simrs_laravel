<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Riwayat Login User</h3>
                </div>
                <div class="card-body">
                    <div class="row align-items-end">
                        <div class="col-auto mb-2">
                            <label class="d-block">Tanggal Awal</label>
                            <Calendar v-model="form.startdate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal awal" style="width: 14em;" />
                        </div>
                        <div class="col-auto mb-2">
                            <label class="d-block">Tanggal Akhir</label>
                            <Calendar v-model="form.enddate" class="text-sm" :showIcon="true" view="date"
                                dateFormat="dd/mm/yy" :yearNavigator="true" yearRange="2000:2030"
                                aria-placeholder="Tanggal akhir" style="width: 14em;" />
                        </div>
                        <div class="col-auto mb-2">
                            <Button label="Tampilkan" @click="getdata()" icon="pi pi-check" class="p-button" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Daftar Login User</h3>
                    <div class="card-tools">
                        <span class="badge badge-info">{{ fact.length }} data</span>
                    </div>
                </div>
                <div class="card-body p-0">
                    <DataTable :value="fact" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                        stripedRows showGridlines class="p-datatable-sm" sortField="last_login" :sortOrder="-1"
                        emptyMessage="Tidak ada data login user">
                        <Column header="#" style="width: 3rem; text-align: center">
                            <template #body="{ index }">{{ index + 1 }}</template>
                        </Column>
                        <Column field="user_id" header="NIP / User ID" sortable style="min-width: 8rem" />
                        <Column field="username" header="Nama User" sortable style="min-width: 12rem" />
                        <Column field="last_login" header="Terakhir Login" sortable style="min-width: 10rem">
                            <template #body="{ data }">
                                <span :title="data.last_login">{{ timeAgo(data.last_login) }}</span>
                            </template>
                        </Column>
                        <Column header="Status Password" style="min-width: 10rem; text-align: center">
                            <template #body="{ data }">
                                <Tag v-if="Number(data.is_default_pass) === 1" value="Password Default"
                                    severity="danger" />
                                <Tag v-else value="Sudah Diganti" severity="success" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Pendaftaran Dibatalkan</h3>
                    <div class="card-tools">
                        <span class="badge badge-info">{{ pendaftaranBatal.length }} data</span>
                    </div>
                </div>
                <div class="card-body p-0">
                    <DataTable :value="pendaftaranBatal" :paginator="true" :rows="10"
                        :rowsPerPageOptions="[10, 20, 50]" stripedRows showGridlines class="p-datatable-sm"
                        emptyMessage="Tidak ada data pendaftaran dibatalkan">
                        <Column header="#" style="width: 3rem; text-align: center">
                            <template #body="{ index }">{{ index + 1 }}</template>
                        </Column>
                        <Column field="NOMR" header="No RM" sortable style="min-width: 8rem" />
                        <Column field="NOPENDAFTARAN" header="No Pendaftaran" sortable style="min-width: 10rem" />
                        <Column field="NOSEP" header="No SEP" sortable style="min-width: 10rem" />
                        <Column field="ALASAN_BATAL" header="Alasan Batal" style="min-width: 16rem" />
                        <Column field="DELETED_BY" header="Dibatalkan Oleh" sortable style="min-width: 10rem" />
                    </DataTable>
                </div>
            </div>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import dayjs from 'dayjs';
    export default {
        components: {
            Loading
        },
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                pendaftaranBatal: [],
                form: {
                    startdate: '',
                    enddate: '',

                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            this.form.enddate = currentDate;
        },
        created() {
            this.getdata();
        },
        methods: {
            timeAgo(dateStr) {
                if (!dateStr) return '-';

                const then = dayjs(dateStr);
                if (!then.isValid()) return '-';

                const now = dayjs();

                const diffMinutes = now.diff(then, 'minute');
                if (diffMinutes < 1) return 'Baru saja';
                if (diffMinutes < 60) return diffMinutes + ' menit yang lalu';

                const diffHours = now.diff(then, 'hour');
                if (diffHours < 24) return diffHours + ' jam yang lalu';

                const diffDays = now.diff(then, 'day');
                if (diffDays < 7) return diffDays + ' hari yang lalu';

                const diffWeeks = now.diff(then, 'week');
                if (diffWeeks < 5) return diffWeeks + ' minggu yang lalu';

                const diffMonths = now.diff(then, 'month');
                if (diffMonths < 12) return diffMonths + ' bulan yang lalu';

                const diffYears = now.diff(then, 'year');
                return diffYears + ' tahun yang lalu';
            },
            async getdata() {
                this.isLoading = true;
                await axios.post('/loguser_login', this.form)
                    .then(response => {
                        this.fact = response.data.response.log_user || []
                        this.pendaftaranBatal = response.data.response.pendaftaran_batal || []
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
