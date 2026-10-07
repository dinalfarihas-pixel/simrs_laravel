<template>
    <section class="content">
        <div class="container-fluid">

                <div class="card-body box-profile">
                    <div class="text-center">
                        <img class="profile-user-img img-fluid img-circle"
                            src="https://t4.ftcdn.net/jpg/01/01/04/45/360_F_101044524_kiJrW0BxWXU8HUI7VJbOS6qOCDWrScO2.jpg"
                            alt="User profile picture">
                    </div>
                    <h3 class="profile-username text-center">{{ datapasien.DATA_SINGKAT }}</h3>
                    <p class="text-muted text-center">{{ datapasien.ALAMAT }}</p>
                </div>
                <strong><i class="fas fa-book mr-1"></i>Tanggal lahir</strong>
                <p class="text-muted">
                    {{ datapasien.TGLLAHIR }}
                </p>
                <hr>
                <strong><i class="fas fa-map-marker-alt mr-1"></i> Alamat</strong>
                <p class="text-muted"> {{ datapasien.NAMAKECAMATAN }}- {{ datapasien.ALAMAT }}</p>
                <hr>
                <strong><i class="fas fa-pencil-alt mr-1"></i> NORM</strong>
                <p class="text-muted">
                    <span class="tag tag-danger">{{ datapasien.NOMR }}</span>

                </p>
                <hr>
                <strong><i class="fas fa-pencil-alt mr-1"></i> POLI/RUANG</strong>
                <p class="text-muted">
                    <span class="tag tag-danger">{{ datapasien.POLI }}</span>

                </p>
                <hr>
                <strong><i class="far fa-file-alt mr-1"></i> DPJP</strong>
                <p class="text-muted"> {{ datapasien.NAMADOKTER}}</p>
            </div>


    </section>
</template>





<script>
    export default {
        mounted() {
            //console.log('Component mounted.')
        },
        props: {
            datapasien: [],
        },
    }

</script>
