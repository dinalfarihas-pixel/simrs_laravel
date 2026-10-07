<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Data kunjungan pasien</h3>
                </div>
                <div class="card-body">
                    <v-chart class="chart" :option="chartOption" autoresize />
                </div>
            </div>

            
        </div>
    </section>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent
]);

export default {
    components: {
        Loading,
        VChart
    },
    data() {
        return {
            form: {
                startdate: '',
                enddate: '',
            },
            isLoading: false,
            fullPage: true,
            chartOption: {
                grid: {
                    top: 40,
                    left: 50,
                    right: 40,
                    bottom: 80,  // Increased to accommodate double x-axis
                    show: true,
                    borderWidth: 1,
                    backgroundColor: '#fff'
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: [
                            '10:10', '10:40', '11:10', '11:40', '12:10', '12:40',
                            '13:10', '13:40', '14:10', '14:40', '15:10', '15:40',
                            '16:10', '16:40', '17:10', '17:40', '18:10', '18:40',
                            '19:10', '19:40', '20:10', '20:40', '21:10', '21:40',
                            '22:10', '22:40', '23:10', '23:40', '00:10', '00:40',
                            '01:10', '01:40', '02:10'
                        ],
                        axisLine: {
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#ccc',
                                type: 'solid'
                            }
                        },
                        position: 'bottom'
                    },
                    {
                        type: 'value',
                        min: 0,
                        max: 16,
                        interval: 1,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        position: 'bottom',
                        offset: 25,  // Space between the two x-axes
                        axisTick: {
                            show: true
                        }
                    }
                ],
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 10,
                    interval: 1,
                    axisLine: {
                        lineStyle: {
                            color: '#333'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ccc',
                            type: 'solid'
                        }
                    }
                },
                series: [
                    {
                        name: 'WASPADA',
                        type: 'line',
                        data: [4, 5, 6, 7, 8, 9, 10],
                        symbol: 'circle',
                        symbolSize: 8,
                        lineStyle: {
                            color: '#ff4d4f',
                            width: 2
                        },
                        itemStyle: {
                            color: '#ff4d4f'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: 'WASPADA',
                            backgroundColor: '#ff4d4f',
                            padding: [4, 8],
                            borderRadius: 4,
                            color: '#fff',
                            distance: 10
                        }
                    },
                    {
                        name: 'BERTINDAK',
                        type: 'line',
                        data: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                        symbol: 'diamond',
                        symbolSize: 8,
                        lineStyle: {
                            color: '#1890ff',
                            width: 2
                        },
                        itemStyle: {
                            color: '#1890ff'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: 'BERTINDAK',
                            backgroundColor: '#1890ff',
                            padding: [4, 8],
                            borderRadius: 4,
                            color: '#fff',
                            distance: 10
                        }
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    formatter: function(params) {
                        let result = params[0].axisValue + '<br/>';
                        params.forEach(param => {
                            result += param.seriesName + ': ' + param.value + '<br/>';
                        });
                        return result;
                    }
                },
                legend: {
                    data: ['WASPADA', 'BERTINDAK'],
                    bottom: 0
                }
            }
        };
    },
    mounted() {
        var currentDate = new Date();
        this.form.startdate = currentDate;
    },
    methods: {
        fetchData() {
            var currentDate = new Date();
            console.log(this.form.startdate);
        },
        open(type, message) {
            this.$toast.open({
                message: message,
                position: 'top-right',
                type: type,
                duration: 3000,
                dismissible: true
            });
        }
    }
};
</script>

<style scoped>
.chart {
    height: 400px;
    width: 100%;
}
.card-body {
    padding: 1.25rem;
}
</style>