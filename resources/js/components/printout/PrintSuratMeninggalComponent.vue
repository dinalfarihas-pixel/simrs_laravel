<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

        <div class="container my-5">
        <!-- Header Section -->
        <div class="header">
            <!-- <img src="your-logo-url-here.png" alt="Logo"> -->
            <kop-surat-component></kop-surat-component>
        
        </div>
        <hr>
        <!-- Title Section -->
        <div class="text-center">
            <h5><u> <b> SURAT KETERANGAN KEMATIAN</b></u></h5>
            <p>Nomor : 670 / ............</p>
        </div>

        <!-- Content Section -->
        <div class="content">
            <p>Yang bertanda tangan dibawah ini, dokter pada Puskesmas Sabarmiokre dengan ini menerangkan bahwa Pegawai Negeri Sipil tersebut dibawah ini:</p>

            <table class="table table-borderless">
                <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>: HERMAN MANSOBEN</td>
                    </tr>
                    <tr>
                        <td>NIP</td>
                        <td>: 640 001 638</td>
                    </tr>
                    <tr>
                        <td>Pangkat/Gol</td>
                        <td>: PENATA Tk I (III/d)</td>
                    </tr>
                    <tr>
                        <td>Jabatan</td>
                        <td>: Pensiunan PNS pada Kantor Bawasda Kab. Biak Numfor</td>
                    </tr>
                </tbody>
            </table>

            <p>Pada hari Sabtu, 21 April 2012 telah <strong>Meninggal Dunia di Kampung Wapur</strong> pada pukul 15.00 WIT dengan penyebab kematian diagnosa akhir adalah <strong>DECOMPENSATIO CORDIS GRADE IV</strong> yang dideritanya.</p>

            <p>Demikian Surat Keterangan Kematian ini dibuat untuk digunakan seperlunya.</p>
        </div>

        <!-- Signature Section -->
        <div class="footer">
            <p>Sabarmiokre, 22 Mei 2012</p>
            <p>Dokter Puskesmas Sabarmiokre</p>
            <br><br><br>
            <p><strong><u>dr. RUTH HUTAPEA</u></strong></p>
            <p>NRPTT. 26 1 005 432</p>
        </div>
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
        props: {
            msg: String,
        },
        data() {
            return {
                fact: [],
                form: {
                    startdate: '',
                    enddate: '',
                },
                isLoading: false,
                fullPage: true,
                data_rs:'',
                nama_rs:'',
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
          
        },
        created() {
            //this.fetchData();
      
            this.profile_rs();
           
        },
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            print()
            {
                window.addEventListener("load", window.print());
            },
            profile_rs() {
                axios.get('/data_rumahsakit', "")
                    .then(response => {

                        this.data_rs = response.data
                        this.nama_rs =this.data_rs['nama_rs'].toUpperCase() 
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
    
    .header {
        text-align: center;
        margin-bottom: 20px;
    }

    
    .content p {
        text-align: justify;
    }

    .signature {
        text-align: right;
        margin-top: 40px;
    }

    .signature p {
        margin: 0;
    }

    .footer {
        text-align: right;
        margin-top: 50px;
    }

</style>
