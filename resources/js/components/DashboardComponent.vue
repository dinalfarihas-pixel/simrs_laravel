<template>
    <section class="content">
        <div class="container-fluid">
            <Card style="width: 100%; margin-bottom: 1em">
                <template #header>
                    <!-- <img alt="user header" src="demo/images/usercard.png"> -->
                </template>
                <template #title>
                    <!-- <MultiSelect v-model="selectedCars" :options="cars" optionLabel="brand" placeholder="Select Brands" /> -->
                    <Button type="button" icon="pi pi-search" class="p-button-success"
                        style="margin-right: .5em"></Button />
                </template>
                <template #content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
                    repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                    neque quas!
                </template>
                <template #footer>
                    <Button icon="pi pi-check" label="Save" />
                    <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
                </template>
            </Card>

            <div class="row"> 
                <div class="col-6 sm-12">
                        <Card style="width: 100%; margin-bottom: 4em">
                            <template #header>
                                <!-- <img alt="user header" src="demo/images/usercard.png"> -->
                            </template>
                            <template #title>
                                <MultiSelect v-model="selectedCars" :options="cars" optionLabel="brand"
                                    placeholder="Select Brands" />
                                <Button type="button" icon="pi pi-search" class="p-button-success"
                                    style="margin-right: .5em"></Button />
                            </template>
                            <template #content>
                                <Chart type="bar" :data="basicData" :options="basicOptions" />
                            </template>

                            <template #footer>

                            </template>
                        </Card>
                    </div>
                        <div class="col-6 sm-12">
                        <Card style="width: 100%; margin-bottom: 4em">
                            <template #header>
                                <!-- <img alt="user header" src="demo/images/usercard.png"> -->
                            </template>
                            <template #title>
                                <MultiSelect v-model="selectedCars" :options="cars" optionLabel="brand"
                                    placeholder="Select Brands" />
                                <Button type="button" icon="pi pi-search" class="p-button-success"
                                    style="margin-right: .5em"></Button />
                            </template>
                            <template #content>
                                <Chart type="bar" :data="basicData" :options="basicOptions" />
                            </template>

                            <template #footer>

                            </template>
                        </Card>
                    </div>
                </div>
            </div>
   
    </section>
</template>
<script>
    import Chart from 'primevue/chart';
    import MultiSelect from 'primevue/multiselect';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import Divider from 'primevue/divider';
    export default {
        components: {
            'Chart': Chart,
            'MultiSelect': MultiSelect,
            'Button': Button,
            'Card': Card,
            'Divider': Divider
        },
        data() {
            return {
                selectedCars: null,
                cars: [{
                        brand: 'Audi',
                        value: 'Audi'
                    },
                    {
                        brand: 'BMW',
                        value: 'BMW'
                    },
                    {
                        brand: 'Fiat',
                        value: 'Fiat'
                    },
                    {
                        brand: 'Honda',
                        value: 'Honda'
                    },
                    {
                        brand: 'Jaguar',
                        value: 'Jaguar'
                    },
                    {
                        brand: 'Mercedes',
                        value: 'Mercedes'
                    },
                    {
                        brand: 'Renault',
                        value: 'Renault'
                    },
                    {
                        brand: 'Volkswagen',
                        value: 'Volkswagen'
                    },
                    {
                        brand: 'Volvo',
                        value: 'Volvo'
                    }
                ],
                basicData: {

                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                            'label': 'My First dataset',
                            'backgroundColor': '#42A5F5',
                            'data': [65, 59, 80, 81, 56, 55, 40]
                        },
                        {
                            'label': 'My Second dataset',
                            'backgroundColor': '#FFA726',
                            'data': [28, 48, 40, 19, 86, 27, 90]
                        },
                        {
                            'label': 'My Second dataset',
                            'backgroundColor': '#FFA726',
                            'data': [28, 48, 40, 19, 86, 27, 90]
                        }
                    ]
                },
                multiAxisData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Dataset 1',
                        backgroundColor: [
                            '#EC407A',
                            '#AB47BC',
                            '#42A5F5',
                            '#7E57C2',
                            '#66BB6A',
                            '#FFCA28',
                            '#26A69A'
                        ],
                        yAxisID: 'y',
                        data: [65, 59, 80, 81, 56, 55, 10]
                    }, {
                        label: 'Dataset 2',
                        backgroundColor: '#78909C',
                        yAxisID: 'y1',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }]
                },
                stackedData: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        type: 'bar',
                        label: 'Dataset 1',
                        backgroundColor: '#42A5F5',
                        data: [
                            50,
                            25,
                            12,
                            48,
                            90,
                            76,
                            42
                        ]
                    }, {
                        type: 'bar',
                        label: 'Dataset 2',
                        backgroundColor: '#66BB6A',
                        data: [
                            21,
                            84,
                            24,
                            75,
                            37,
                            65,
                            34
                        ]
                    }, {
                        type: 'bar',
                        label: 'Dataset 3',
                        backgroundColor: '#FFA726',
                        data: [
                            41,
                            52,
                            24,
                            74,
                            23,
                            21,
                            32
                        ]
                    }]
                },
                basicOptions: {
                    plugins: {
                        legend: {
                            labels: {
                                color: '#495057'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        }
                    }
                },
                horizontalOptions: {
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            labels: {
                                color: '#495057'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        },
                        y: {
                            ticks: {
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        }
                    }
                },
                multiAxisOptions: {
                    plugins: {
                        legend: {
                            labels: {
                                color: '#495057'
                            }
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: true
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            ticks: {
                                min: 0,
                                max: 100,
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: {
                                drawOnChartArea: false,
                                color: '#ebedef'
                            },
                            ticks: {
                                min: 0,
                                max: 100,
                                color: '#495057'
                            }
                        }
                    }
                },
                stackedOptions: {
                    plugins: {
                        tooltips: {
                            mode: 'index',
                            intersect: false
                        },
                        legend: {
                            labels: {
                                color: '#495057'
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        },
                        y: {
                            stacked: true,
                            ticks: {
                                color: '#495057'
                            },
                            grid: {
                                color: '#ebedef'
                            }
                        }
                    }
                }
            }
        }
    }

</script>
