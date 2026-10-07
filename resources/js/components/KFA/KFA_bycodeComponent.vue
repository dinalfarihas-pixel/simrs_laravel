<template>
   
      <div class="card">
        <div class="card-header text-white" style="background-color: #18B8B2;">
         
        <h4 class="mb-0">{{ productData.name }}</h4>
        </div>
        <div class="card-body">
          <!-- Basic Information -->
          <div class="row mb-4">
            <div class="col-md-6">
              <h5 class="border-bottom pb-2">Basic Information</h5>
              <table class="table table-sm">
                <tbody>
                  <tr>
                    <th width="30%">KFA Code</th>
                    <td>{{ productData.kfa_code }}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span :class="getStatusBadge(productData.active, productData.state)">
                        {{ productData.active ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>NIE</th>
                    <td>{{ productData.nie }}</td>
                  </tr>
                  <tr>
                    <th>Manufacturer</th>
                    <td>{{ productData.manufacturer }}</td>
                  </tr>
                  <tr>
                    <th>Type</th>
                    <td>{{ productData.farmalkes_type?.name }}</td>
                  </tr>
                  <tr>
                    <th>Dosage Form</th>
                    <td>{{ productData.dosage_form?.name }}</td>
                  </tr>
                  <tr>
                    <th>Price (HET)</th>
                    <td>{{ formatCurrency(productData.het_price) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="col-md-6">
              <h5 class="border-bottom pb-2">Product Details</h5>
              <table class="table table-sm">
                <tbody>
                  <tr>
                    <th width="30%">Generic</th>
                    <td>
                      <span :class="productData.generik ? 'badge bg-info' : 'badge bg-secondary'">
                        {{ productData.generik ? 'Yes' : 'No' }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Route</th>
                    <td>{{ productData.rute_pemberian?.name }}</td>
                  </tr>
                  <tr>
                    <th>Control Type</th>
                    <td>{{ productData.controlled_drug?.name }}</td>
                  </tr>
                  <tr>
                    <th>Unit</th>
                    <td>{{ productData.uom?.name }}</td>
                  </tr>
                  <tr>
                    <th>Production</th>
                    <td>{{ capitalizeFirst(productData.produksi_buatan) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <!-- Active Ingredients -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="border-bottom pb-2">Active Ingredients</h5>
              <div class="table-responsive">
                <table class="table table-bordered table-sm">
                  <thead class="table-light">
                    <tr>
                      <th>Code</th>
                       <th>Name</th>
                      <th>Strength</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ingredient in productData.active_ingredients" :key="ingredient.kfa_code">
                      <td>{{ ingredient.kfa_code }}</td>
                      <td>{{ ingredient.zat_aktif }}</td>
                      <td>{{ ingredient.kekuatan_zat_aktif }}</td>
                      <td>{{ formatDate(ingredient.updated_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <!-- Dosage Usage -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="border-bottom pb-2">Dosage Usage</h5>
              <div class="table-responsive">
                <table class="table table-bordered table-sm">
                  <thead class="table-light">
                    <tr>
                      <th>Category</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(dosage, index) in productData.dosage_usage" :key="index">
                      <td>{{ capitalizeFirst(dosage.category) }}</td>
                      <td>{{ dosage.qty }} {{ dosage.qty_uom }}</td>
                      <td>{{ dosage.frequency }}-{{ dosage.frequency_max }} times per {{ dosage.period }} {{ dosage.period_ucum }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
  
          <!-- Medical Information -->
          <div class="row">
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">Description</h5>
              <div v-html="productData.description" class="medical-info"></div>
            </div>
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">Indication</h5>
              <div v-html="productData.indication" class="medical-info"></div>
            </div>
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">Warning</h5>
              <div v-html="productData.warning" class="medical-info"></div>
            </div>
            <div class="col-md-6 mb-4">
              <h5 class="border-bottom pb-2">Side Effects</h5>
              <div v-html="productData.side_effect" class="medical-info"></div>
            </div>
          </div>
        </div>
      </div> 
  </template>
  
  <script>
  export default {
    name: 'ProductDetailForm',
    props: {
            data_trans: Object,
        },
    data() {
      return {
        productData: {
          // Your JSON data will go here
            name: '',
            kfa_code: '',
            active: false,
            state: '',
            image: null,
            updated_at: '',

            // Type and Classification
            farmalkes_type: {
            code: '',
            name: '',
            group: ''
            },

            // Units and Measurements
            ucum: {
            name: '',
            cs_code: ''
            },
            uom: {
            name: ''
            },

            // Form and Administration
            dosage_form: {
            code: '',
            name: ''
            },
            controlled_drug: {
            code: '',
            name: ''
            },
            rute_pemberian: {
            code: '',
            name: ''
            },

            // Product Details
            produksi_buatan: '',
            nie: '',
            nama_dagang: '',
            manufacturer: '',
            registrar: '',
            generik: false,
            rxterm: null,
            dose_per_unit: null,
            fix_price: null,
            het_price: null,

            // Additional Product Info
            farmalkes_hscode: '',
            tayang_lkpp: null,
            kode_lkpp: null,
            score_tkdn: null,
            score_bmp: null,
            score_tkdn_bmp: 0,

            // Measurements
            net_weight: null,
            net_weight_uom_name: '',
            volume: null,
            volume_uom_name: '',

            // Medical Device Info
            med_dev_jenis: null,
            med_dev_subkategori: null,
            med_dev_kategori: null,
            med_dev_kelas_risiko: null,
            klasifikasi_izin: null,

            // ATC Classification
            atc_ddd: {
            name: ''
            },
            atc_l1: {
            code: '',
            name: '',
            level: '',
            comment: null,
            parent_code: null
            },
            atc_l2: {
            code: '',
            name: '',
            level: '',
            comment: null,
            parent_code: ''
            },
            atc_l3: {
            code: '',
            name: '',
            level: '',
            comment: null,
            parent_code: ''
            },
            atc_l4: {
            code: '',
            name: '',
            level: '',
            comment: null,
            parent_code: ''
            },
            atc_l5: {
            code: '',
            name: '',
            level: '',
            comment: null,
            parent_code: ''
            },

            // Product Information
            description: '',
            indication: '',
            warning: '',
            side_effect: '',

            // Identifiers
            identifier_ids: [
            {
                url: null,
                code: '',
                name: '',
                source_name: ''
            }
            ],

            // Packaging
            packaging_ids: [
              {
                  qty: 0,
                  name: '',
                  uom_id: '',
                  kfa_code: '',
                  pack_price: 0
              }
            ],

            // Product Template
            product_template: {
            name: '',
            state: '',
            bmhp: null,
            active: true,
            kfa_code: '',
            updated_at: '',
            display_name: ''
            },

            // Active Ingredients
            active_ingredients: [
            {
                state: '',
                active: true,
                kfa_code: '',
                zat_aktif: '',
                updated_at: '',
                kekuatan_zat_aktif: ''
            }
            ],

            // Dosage Usage
            dosage_usage: [
            {
                qty: 0,
                name: '',
                period: 0,
                qty_uom: '',
                category: '',
                duration: 0,
                qty_high: 0,
                qty_ucum: null,
                use_ucum: false,
                frequency: 0,
                updated_at: '',
                period_ucum: '',
                display_name: '',
                duration_max: 0,
                duration_ucum: '',
                frequency_max: 0,
                body_weight_max: 0,
                body_weight_min: 0
            }
            ],

            // Tags and Replacements
            tags: [],
            replacement: {
            product: null,
            template: null
            },
            cvx_info: {}
        },
         
      }
    },
    mounted() {
        this.productData =this.data_trans.result
    },
    methods: {
      getStatusBadge(active, state) {
        if (!active) return 'badge bg-danger'
        return state === 'valid' ? 'badge bg-success' : 'badge bg-warning'
      },
      formatCurrency(value) {
        if (!value) return '-'
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR'
        }).format(value)
      },
      formatDate(dateString) {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      },
      capitalizeFirst(str) {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    margin: 20px 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  .table th {
    background-color: #f8f9fa;
  }
  
  .medical-info {
    font-size: 0.9rem;
    line-height: 1.5;
  }
  
  .medical-info :deep(p) {
    margin-bottom: 0.5rem;
  }
  
  .badge {
    font-weight: normal;
    font-size: 0.9rem;
  }
  </style>