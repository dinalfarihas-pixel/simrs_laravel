<template>
    <section class="content"> 
        <div class="card elevation-0">
            <div class="card-body">
             
                <Timeline :value="events1" layout="horizontal" align="bottom">
                <template #opposite="slotProps"> 
                    {{slotProps.item.date}} 
                </template>
                <template #content="slotProps"> 
                   <strong> <i :class="slotProps.item.icon"></i></strong>  {{slotProps.item.status}}
                </template>
                
            </Timeline>
            </div>
        </div> 
       
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import Timeline from 'primevue/timeline';
    export default {
        components: {
            Loading,
            Timeline
        },
        props: ['data_pr'],
        data() {
            return {
                fact: [],
                events2: [
                "2020", "2021", "2022", "2023"
                ],
                events1: [
                    // {status: 'Telaah dibuat', date: '15/06/2024 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg'},
                    // {status: 'disetujui', date: '15/06/2024 14:00', icon: 'pi pi-cog', color: '#673AB7'},
                    // {status: 'disetujui', date: '15/06/2024 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800'},
                    // {status: 'disetujui', date: '16/06/2024 10:00', icon: 'pi pi-check', color: '#607D8B'}
                ],
                form: {
                    startdate: '',
                    enddate: '',
                    no_permintaan:''
                },
                isLoading: false,
                fullPage: true,
            };
        },
        mounted() {
            var currentDate = new Date();
            this.form.startdate = currentDate;
            console.log(currentDate);
        },
        created() {
            //this.fetchData();
            this.list_timeline()
        },
       
        methods: {
            fetchData() {
                var currentDate = new Date();
                console.log(this.form.startdate);
            },
            async list_timeline()
            { 
                //console.log(this.form);
                this.form.no_permintaan = this.data_pr;
                this.isLoading = true 
                await axios.post('/list_timeline', this.form)
                    .then(response => {  
                        this.isLoading = false  
                        this.events1 = response.data.response
                        console.log(response.data) 
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
