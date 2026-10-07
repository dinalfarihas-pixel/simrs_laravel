<template>
    <section class="content">
        <div class="container-fluid">
            <loading v-model:active="isLoading" :is-full-page="fullPage"></loading>

            <div class="row" style="height: calc(100vh - 140px);">

                <!-- ===== SIDEBAR LIST ===== -->
                <div class="col-md-4 col-lg-3 p-0"
                    style="border-right: 1px solid #dee2e6; background: #fff; display: flex; flex-direction: column; height: 100%;">

                    <!-- Header -->
                    <div class="p-3" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #dee2e6;">
                        <h6 class="mb-0" style="font-size: 15px;"><i class="fas fa-inbox mr-2"></i>Kotak Masuk Konsul</h6>
                        <span class="badge badge-danger badge-pill" style="font-size: 12px;">{{ unreadCount }} Baru</span>
                    </div>

                    <!-- Search -->
                    <div class="p-2" style="border-bottom: 1px solid #f0f0f0;">
                        <input v-model="searchQuery" type="text" class="form-control"
                            style="font-size: 14px;"
                            placeholder="🔍 Cari konsultasi..." />
                    </div>

                    <!-- Tabs -->
                    <ul class="nav nav-tabs nav-justified" style="flex-shrink: 0;">
                        <li class="nav-item">
                            <a class="nav-link" style="font-size: 14px;"
                                :class="{ active: activeTab === 'masuk' }" href="#"
                                @click.prevent="activeTab = 'masuk'">
                                <i class="fas fa-inbox mr-1"></i> Masuk
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" style="font-size: 14px;"
                                :class="{ active: activeTab === 'selesai' }" href="#"
                                @click.prevent="activeTab = 'selesai'">
                                <i class="fas fa-check-circle mr-1"></i> Selesai
                            </a>
                        </li>
                    </ul>

                    <!-- List Konsul -->
                    <div style="overflow-y: auto; flex: 1;">
                        <div v-if="filteredKonsul.length === 0" class="text-center text-muted p-4">
                            <i class="fas fa-inbox fa-2x mb-2"></i>
                            <br>
                            <span style="font-size: 14px;">Tidak ada konsultasi</span>
                        </div>
                        <div v-for="item in filteredKonsul" :key="item.id_konsul"
                            class="d-flex align-items-start p-3"
                            :class="{
                                'bg-warning-light': item.is_read === '0' && activeTab === 'masuk',
                                'sidebar-item-active': selectedKonsul && selectedKonsul.id_konsul === item.id_konsul
                            }"
                            style="border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.15s;"
                            @click="selectKonsul(item)">

                            <!-- Avatar -->
                            <div class="mr-2 d-flex align-items-center justify-content-center rounded-circle text-white flex-shrink-0"
                                :style="{ background: item.avatarColor, width: '42px', height: '42px', fontSize: '14px', fontWeight: '700' }">
                                {{ item.initials }}
                            </div>

                            <!-- Konten -->
                            <div class="flex-grow-1 overflow-hidden">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-truncate"
                                        :style="{ fontWeight: item.is_read === '0' ? '700' : '500', fontSize: '14px' }">
                                        {{ item.dokterPengirim }}
                                    </span>
                                    <small class="text-muted ml-1 flex-shrink-0" style="font-size: 12px;">{{ item.waktu }}</small>
                                </div>
                                <div class="text-truncate mt-1"
                                    style="font-size: 13px; color: #343a40;"
                                    :style="{ fontWeight: item.is_read === '0' ? '600' : '400' }">
                                    {{ item.isUrgent ? '⚡ URGENT: ' : '' }}{{ item.subject }}
                                </div>
                                <div class="d-flex align-items-center mt-1">
                                    <span class="text-truncate text-muted" style="font-size: 12px; flex: 1;">
                                        {{ item.preview }}
                                    </span>
                                </div>
                            </div>

                            <!-- Dot unread -->
                            <div v-if="item.is_read === '0' && activeTab === 'masuk'"
                                style="width: 9px; height: 9px; background: #007bff; border-radius: 50%; flex-shrink: 0; margin-top: 6px; margin-left: 6px;">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ===== PANEL DETAIL ===== -->
                <div class="col-md-8 col-lg-9 p-0 d-flex flex-column" style="height: 100%; background: #fff;">

                    <!-- Empty state -->
                    <div v-if="!selectedKonsul"
                        class="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-muted">
                        <i class="fas fa-envelope-open fa-4x mb-3" style="opacity: 0.3;"></i>
                        <p style="font-size: 15px;">Pilih konsultasi untuk dibaca</p>
                    </div>

                    <template v-else>
                        <!-- Header detail -->
                        <div class="p-3 d-flex align-items-center justify-content-between"
                            style="border-bottom: 1px solid #dee2e6; background: #fdfdfd;">
                            <div class="d-flex align-items-center">
                                <div class="mr-3 d-flex align-items-center justify-content-center rounded-circle text-white flex-shrink-0"
                                    :style="{ background: selectedKonsul.avatarColor, width: '46px', height: '46px', fontSize: '15px', fontWeight: '700' }">
                                    {{ selectedKonsul.initials }}
                                </div>
                                <div>
                                    <strong style="font-size: 16px;">{{ selectedKonsul.subject }}</strong>
                                    <div style="font-size: 13px; color: #6c757d; margin-top: 3px;">
                                        <span class="badge" :class="selectedKonsul.spesialisBadgeClass" style="font-size: 12px;">
                                            {{ selectedKonsul.spesialis }}
                                        </span>
                                        &nbsp;
                                        <span style="font-size: 13px;">{{ selectedKonsul.dokterPengirim }}</span>
                                        <i class="fas fa-arrow-right mx-1" style="font-size: 11px;"></i>
                                        <span style="font-size: 13px;">{{ selectedKonsul.namaDokterTujuan }}</span>
                                        &nbsp;
                                        <span class="badge" :class="statusBadgeClass(selectedKonsul.status)" style="font-size: 12px;">
                                            {{ selectedKonsul.status }}
                                        </span>
                                        &nbsp;
                                        <span v-if="selectedKonsul.isUrgent" class="badge badge-danger" style="font-size: 12px;">
                                            ⚡ Urgent
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-success btn-sm mr-2" @click="markAsSelesai(selectedKonsul)"
                                    style="font-size: 13px;">
                                    <i class="fas fa-check mr-1"></i> Selesai
                                </button>
                                <button class="btn btn-outline-secondary btn-sm" @click="teruskanKonsul(selectedKonsul)"
                                    style="font-size: 13px;">
                                    <i class="fas fa-share mr-1"></i> Teruskan
                                </button>
                            </div>
                        </div>

                        <!-- Info Pasien -->
                        <div class="mx-3 mt-3 p-3 rounded" style="background: #f8f9fa; border: 1px solid #dee2e6; flex-shrink: 0;">
                            <div class="row">
                                <div class="col-6 col-md-3 mb-2">
                                    <div style="font-size: 11px; color: #adb5bd; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;">Nama Pasien</div>
                                    <div style="font-size: 14px; font-weight: 600; color: #212529;">{{ selectedKonsul.pasien.nama }}
                                    <button class="btn btn-sm btn-outline-info mt-1 mr-2 ml-2" style="font-size: 11px; padding: 2px 6px;"
                                        @click="print_soap(selectedKonsul.pasien.noregister)">
                                        <i class="fas fa-info-circle mr-1"></i> Tampilkan CPPT</button></div>
                                </div>
                                <div class="col-6 col-md-3 mb-2">
                                    <div style="font-size: 11px; color: #adb5bd; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;">No. RM</div>
                                    <div style="font-size: 14px; font-weight: 600; color: #212529;">{{ selectedKonsul.pasien.noRm }}</div>
                                </div>
                                <div class="col-6 col-md-3 mb-2">
                                    <div style="font-size: 11px; color: #adb5bd; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;">No. Register</div>
                                    <div style="font-size: 14px; font-weight: 600; color: #212529;">{{ selectedKonsul.pasien.noregister }}</div>
                                </div>
                                <div class="col-6 col-md-3 mb-2">
                                    <div style="font-size: 11px; color: #adb5bd; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px;">Diagnosa</div>
                                    <div style="font-size: 14px; font-weight: 600; color: #212529;">{{ selectedKonsul.pasien.diagnosa }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Thread pesan -->
                        <div ref="threadContainer" class="flex-grow-1 overflow-auto p-3" style="background: #f1f3f5;">
                            <div v-for="(msg, i) in selectedKonsul.messages" :key="i" class="mb-4">

                                <!-- Nama + waktu -->
                                <div class="d-flex align-items-center mb-1"
                                    :class="msg.isMe ? 'flex-row-reverse' : 'flex-row'">
                                    <div class="d-flex align-items-center justify-content-center rounded-circle text-white flex-shrink-0"
                                        :class="msg.isMe ? 'ml-2' : 'mr-2'"
                                        :style="{
                                            background: msg.isMe ? '#007bff' : selectedKonsul.avatarColor,
                                            width: '32px', height: '32px',
                                            fontSize: '13px', fontWeight: '700'
                                        }">
                                        {{ msg.initials }}
                                    </div>
                                    <strong style="font-size: 14px;">{{ msg.sender }}</strong>
                                    <small class="text-muted mx-2" style="font-size: 12px;">{{ msg.time }}</small>
                                </div>

                                <!-- Baris: centang + bubble -->
                                <div class="d-flex align-items-center"
                                    :class="msg.isMe ? 'flex-row-reverse' : 'flex-row'">

                                    <!-- Bubble pesan -->
                                    <div class="p-3"
                                        style="font-size: 14px; line-height: 1.7; text-align: left; max-width: 80%;"
                                        :style="{
                                            background:    msg.isMe ? '#dbeafe' : '#ffffff',
                                            border:        msg.isMe ? '1px solid #bfdbfe' : '1px solid #e9ecef',
                                            boxShadow:     '0 1px 3px rgba(0,0,0,0.05)',
                                            borderRadius:  msg.isMe ? '12px 12px 4px 12px' : '12px 12px 12px 4px'
                                        }"
                                        v-html="msg.body.replace(/\n/g, '<br>')">
                                    </div>

                                    <!-- Centang di samping bubble -->
                                    <div class="d-flex align-items-center justify-content-center flex-shrink-0"
                                        :class="msg.isMe ? 'mr-2' : 'ml-2'"
                                        style="width: 24px; height: 24px;">
                                        <template v-if="msg.isMe">
                                            <i v-if="msg.is_read_penerima === '1'"
                                                class="fas fa-check-double"
                                                style="font-size: 14px; color: #1a73e8;"
                                                title="Sudah dibaca">
                                            </i>
                                            <i v-else
                                                class="fas fa-check"
                                                style="font-size: 14px; color: #adb5bd;"
                                                title="Terkirim, belum dibaca">
                                            </i>
                                        </template>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Reply Trigger Button -->
                        <div class="p-3" style="border-top: 1px solid #dee2e6; background: #fff; flex-shrink: 0;">
                            <button class="btn btn-primary btn-block" @click="openReplyModal()"
                                style="font-size: 14px; padding: 10px;">
                                <i class="fas fa-reply mr-2"></i> Tulis Balasan Konsul
                            </button>
                        </div>
                    </template>

                </div>
            </div>

            <!-- ===== MODAL BALAS KONSUL ===== -->
            <transition name="modal-fade">
                <div v-if="showReplyModal"
                    class="modal-overlay"
                    @click.self="closeReplyModal()">

                    <div class="modal-dialog-konsul">

                        <!-- Modal Header -->
                        <div class="modal-konsul-header">
                            <div class="d-flex align-items-center">
                                <div class="modal-avatar mr-3"
                                    :style="{ background: selectedKonsul ? selectedKonsul.avatarColor : '#6f42c1' }">
                                    {{ selectedKonsul ? selectedKonsul.initials : '??' }}
                                </div>
                                <div>
                                    <div style="font-size: 14px; font-weight: 600; color: #212529;">
                                        {{ selectedKonsul ? selectedKonsul.dokterPengirim : '' }}
                                    </div>
                                    <div style="font-size: 12px; color: #6c757d; margin-top: 2px;">
                                        Pasien:
                                        <strong style="color: #343a40;">{{ selectedKonsul ? selectedKonsul.pasien.nama : '' }}</strong>
                                        &nbsp;·&nbsp; No. RM:
                                        <strong style="color: #343a40;">{{ selectedKonsul ? selectedKonsul.pasien.noRm : '' }}</strong>
                                    </div>
                                </div>
                            </div>
                            <button class="btn-close-modal" @click="closeReplyModal()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <!-- Preview Keluhan -->
                        <div class="modal-konsul-preview">
                            <div class="preview-label">Isi konsultasi</div>
                            <div class="preview-body">
                                {{ selectedKonsul && selectedKonsul.messages[0] ? selectedKonsul.messages[0].body : '-' }}
                            </div>
                        </div>

                        <!-- Modal Body -->
                        <div class="modal-konsul-body">

                            <!-- Status & Prioritas -->
                            <div class="row mb-3">
                                <div class="col-6">
                                    <label class="modal-label">Status balasan</label>
                                    <select v-model="replyStatus" class="form-control form-control-sm" style="font-size: 13px;">
                                        <option value="dibalas">Dibalas</option>
                                        <option value="perlu_tindak">Perlu tindak lanjut</option>
                                        <option value="selesai">Langsung selesai</option>
                                    </select>
                                </div>
                                <div class="col-6">
                                    <label class="modal-label">Prioritas</label>
                                    <select v-model="replyPrioritas" class="form-control form-control-sm" style="font-size: 13px;">
                                        <option value="normal">Normal</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Textarea Balasan -->
                            <div class="mb-2">
                                <label class="modal-label">
                                    Balasan konsultasi <span style="color: #dc3545;">*</span>
                                </label>
                                <textarea
                                    v-model="replyText"
                                    class="form-control"
                                    rows="5"
                                    placeholder="Tulis jawaban konsultasi Anda di sini..."
                                    style="font-size: 13px; resize: vertical; line-height: 1.7;">
                                </textarea>
                                <div class="d-flex justify-content-between align-items-center mt-1">
                                    <!-- Quick Snippets -->
                                    <div class="d-flex flex-wrap" style="gap: 5px;">
                                        <button class="btn-snippet" @click="insertSnippet('Terima kasih atas konsultasinya. ')">
                                            + Sapaan
                                        </button>
                                        <button class="btn-snippet" @click="insertSnippet('Disarankan untuk melakukan pemeriksaan lanjutan berupa ')">
                                            + Pemeriksaan
                                        </button>
                                        <button class="btn-snippet" @click="insertSnippet('Kami setuju dengan diagnosis dan tatalaksana yang telah dilakukan. ')">
                                            + Setuju
                                        </button>
                                    </div>
                                    <small class="text-muted" style="font-size: 11px; white-space: nowrap; margin-left: 8px;">
                                        {{ replyText.length }} karakter
                                    </small>
                                </div>
                            </div>

                            <!-- Tanda Tangan -->
                            <div class="d-flex align-items-center mt-2">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="chkTtdModal" v-model="replyWithTtd">
                                    <label class="custom-control-label" for="chkTtdModal"
                                        style="font-size: 13px; color: #6c757d; cursor: pointer;">
                                        Sertakan tanda tangan digital otomatis
                                    </label>
                                </div>
                            </div>

                        </div>

                        <!-- Modal Footer -->
                        <div class="modal-konsul-footer">
                            <button class="btn btn-outline-secondary btn-sm mr-2" @click="closeReplyModal()"
                                style="font-size: 13px; padding: 7px 18px;">
                                Batal
                            </button>
                            <button class="btn btn-primary btn-sm"
                                :disabled="!replyText.trim() || isSending"
                                @click="sendReply()"
                                style="font-size: 13px; padding: 7px 20px; min-width: 130px;">
                                <span v-if="!isSending">
                                    <i class="fas fa-paper-plane mr-1"></i> Kirim Balasan
                                </span>
                                <span v-else>
                                    <i class="fas fa-spinner fa-spin mr-1"></i> Mengirim...
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </transition>

        </div>
    </section>
</template>

<script>
    import Loading from 'vue-loading-overlay';

    export default {
        name: 'KonsulInbox',
        components: { Loading },

        data() {
            return {
                isLoading: false,
                fullPage: true,
                activeTab: 'masuk',
                searchQuery: '',
                replyText: '',
                replyStatus: 'dibalas',
                replyPrioritas: 'normal',
                replyWithTtd: true,
                selectedKonsul: null,
                konsul_list_db: [],
                showReplyModal: false,
                isSending: false,
            };
        },

        computed: {
            unreadCount() {
                return this.konsul_list_db.filter(k => k.is_read === '0' && k.selesai === '0').length;
            },
            filteredKonsul() {
                return this.konsul_list_db
                    .filter(k => k.tab === this.activeTab)
                    .filter(k => {
                        if (!this.searchQuery) return true;
                        const q = this.searchQuery.toLowerCase();
                        return (
                            k.dokterPengirim.toLowerCase().includes(q) ||
                            k.subject.toLowerCase().includes(q) ||
                            k.pasien.nama.toLowerCase().includes(q)
                        );
                    });
            }
        },

        created() {
            this.get_konsultasi_dokter();
        },

        methods: {

            // ===== HELPER =====
            extractSpesialis(namaDokter) {
                if (!namaDokter) return 'Umum';
                const match = namaDokter.match(/Sp\.\w+/);
                return match ? match[0] : 'Umum';
            },

            formatWaktu(tanggal) {
                if (!tanggal) return '';
                const now = new Date();
                const tgl = new Date(tanggal);
                const diffHours = (now - tgl) / (1000 * 60 * 60);
                const diffDays  = diffHours / 24;
                if (diffHours < 24) {
                    return tgl.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                } else if (diffDays < 2) {
                    return 'Kemarin';
                } else {
                    return tgl.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
                }
            },

            print_soap(noregister) {
                window.open('/print-soap/' + noregister, '_blank');
            },

            formatWaktuLengkap(tanggal) {
                if (!tanggal) return '';
                return new Date(tanggal).toLocaleString('id-ID', {
                    weekday: 'long',
                    day:     '2-digit',
                    month:   'short',
                    year:    'numeric',
                    hour:    '2-digit',
                    minute:  '2-digit'
                });
            },

            getAvatarColor(id) {
                const colors = [
                    '#dc3545', '#6f42c1', '#17a2b8',
                    '#20c997', '#fd7e14', '#e83e8c',
                    '#007bff', '#28a745', '#c0392b'
                ];
                return colors[parseInt(id) % colors.length];
            },

            getSpesialisBadgeClass(spesialis) {
                const map = {
                    'Sp.PD': 'badge-success',
                    'Sp.B':  'badge-danger',
                    'Sp.JP': 'badge-purple',
                    'Sp.A':  'badge-info',
                    'Sp.OG': 'badge-warning',
                    'Sp.S':  'badge-dark',
                    'Sp.M':  'badge-secondary',
                };
                return map[spesialis] || 'badge-primary';
            },

            statusBadgeClass(status) {
                const map = {
                    'Baru':    'badge badge-primary',
                    'Dibalas': 'badge badge-success',
                    'Selesai': 'badge badge-secondary',
                    'Urgent':  'badge badge-danger',
                };
                return map[status] || 'badge badge-light';
            },

            // ===== MAPPING DB → UI =====
            mapKonsulItem(item) {
                const spesialis = this.extractSpesialis(item.nama_dokter_pengirim);
                const initials  = item.inisial_dokter_pengirim
                    ? item.inisial_dokter_pengirim
                    : (item.nama_dokter_pengirim || '??').substring(0, 2).toUpperCase();

                let status = 'Baru';
                if (item.selesai === '1') {
                    status = 'Selesai';
                } else if (item.is_read === '1') {
                    status = 'Dibalas';
                }

                const tab = item.selesai === '1' ? 'selesai' : 'masuk';

                const messages = [{
                    sender:   item.nama_dokter_pengirim,
                    initials: initials,
                    isMe:     false,
                    isRead:   item.is_read === '1',
                    time:     this.formatWaktuLengkap(item.tanggal_konsul),
                    body:     item.keluhan || '(tidak ada isi pesan)'
                }];

                return {
                    id_konsul:      item.id_konsul,
                    noregister:     item.noregister,
                    is_read:        item.is_read,
                    is_urgent:      item.is_urgent,
                    selesai:        item.selesai,
                    dokter_tujuan:  item.dokter_tujuan,
                    tanggal_konsul: item.tanggal_konsul,

                    dokterPengirim:      item.nama_dokter_pengirim,
                    namaDokterTujuan:    item.nama_dokter_tujuan,
                    spesialis:           spesialis,
                    spesialisBadgeClass: this.getSpesialisBadgeClass(spesialis),
                    subject:             item.diagnosa  || '(tanpa diagnosa)',
                    preview:             (item.keluhan  || '').substring(0, 80) + '...',
                    waktu:               this.formatWaktu(item.tanggal_konsul),
                    isRead:              item.is_read   === '1',
                    isUrgent:            item.is_urgent === '1',

                    status,
                    tab,
                    initials,
                    avatarColor: this.getAvatarColor(item.id_konsul),

                    pasien: {
                        nama:       item.nama_pasien || '-',
                        noRm:       item.no_rm       || '-',
                        noregister: item.noregister  || '-',
                        diagnosa:   item.diagnosa    || '-'
                    },

                    messages
                };
            },

            // ===== FETCH LIST =====
            async get_konsultasi_dokter() {
                this.isLoading = true;
                try {
                    const response = await axios.post('/get_konsultasi_dokter', {
                        kd_dokter:  '303568',
                        mode:       2,
                        noregister: ''
                    });
                    const rawData = response.data.response || [];
                    this.konsul_list_db = rawData.map(item => this.mapKonsulItem(item));
                } catch (error) {
                    console.error('Error fetch konsultasi:', error);
                } finally {
                    this.isLoading = false;
                }
            },

            // ===== FETCH DETAIL / BALASAN =====
            async get_detil_konsul(item) {
                this.isLoading = true;
                try {
                    const response = await axios.post('/get_konsultasi_dokter', {
                        id_konsul:  item.id_konsul,
                        noregister: item.noregister,
                        mode:       3
                    });

                    const data = response.data.response;
                    if (!data || data.length === 0) {
                        console.warn('Tidak ada detail untuk id_konsul:', item.id_konsul);
                        return;
                    }

                    const details = data[0].details || [];
                    if (details.length === 0) return;

                    if (this.selectedKonsul && this.selectedKonsul.id_konsul === item.id_konsul) {
                        this.selectedKonsul.messages = [this.selectedKonsul.messages[0]];

                        details.forEach(d => {
                            this.selectedKonsul.messages.push({
                                sender:           d.nama_dokter || item.namaDokterTujuan,
                                initials:         d.inisial     || item.inisial_dokter_tujuan || 'DR',
                                isMe:             d.is_me       === '1',
                                isRead:           d.is_me === '1' ? this.selectedKonsul.is_read === '1' : true,
                                is_read_penerima: d.is_read_penerima,
                                time:             this.formatWaktuLengkap(d.tanggal || item.tanggal_konsul),
                                body:             d.balasan || d.pesan || d.isi || ''
                            });
                        });

                        this.$nextTick(() => {
                            if (this.$refs.threadContainer) {
                                this.$refs.threadContainer.scrollTop = this.$refs.threadContainer.scrollHeight;
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error fetch detail konsul:', error);
                } finally {
                    this.isLoading = false;
                }
            },

            // ===== PILIH KONSUL =====
            selectKonsul(item) {
                this.selectedKonsul = null;
                this.replyText      = '';

                this.$nextTick(() => {
                    this.selectedKonsul = item;
                    item.is_read = '1';
                    item.isRead  = true;

                    if (Array.isArray(item.messages)) {
                        item.messages.forEach(msg => { msg.isRead = true; });
                    }

                    this.get_detil_konsul(item);
                    this.markAsReadOnServer(item);

                    this.$nextTick(() => {
                        if (this.$refs.threadContainer) {
                            this.$refs.threadContainer.scrollTop = this.$refs.threadContainer.scrollHeight;
                        }
                    });
                });
            },

            // ===== MODAL BALAS =====
            openReplyModal() {
                this.replyText      = '';
                this.replyStatus    = 'dibalas';
                this.replyPrioritas = 'normal';
                this.replyWithTtd   = true;
                this.showReplyModal = true;
            },

            closeReplyModal() {
                this.showReplyModal = false;
            },

            insertSnippet(text) {
                this.replyText += text;
            },

            // ===== KIRIM BALASAN =====
            async sendReply() {
                if (!this.replyText.trim() || !this.selectedKonsul) return;

                this.isSending = true;
                const pesan    = this.replyText;
                const timeStr  = this.formatWaktuLengkap(new Date().toISOString());

                this.selectedKonsul.messages.push({
                    sender:   this.selectedKonsul.namaDokterTujuan || 'dr. Anda',
                    initials: 'AN',
                    isMe:     true,
                    isRead:   false,
                    is_read_penerima: '0',
                    time:     timeStr,
                    body:     pesan
                });

                this.selectedKonsul.status  = 'Dibalas';
                this.selectedKonsul.is_read = '1';
                this.selectedKonsul.preview = pesan.substring(0, 80) + '...';

                // Jika status langsung selesai
                if (this.replyStatus === 'selesai') {
                    this.selectedKonsul.status  = 'Selesai';
                    this.selectedKonsul.tab     = 'selesai';
                    this.selectedKonsul.selesai = '1';
                }

                this.$nextTick(() => {
                    if (this.$refs.threadContainer) {
                        this.$refs.threadContainer.scrollTop = this.$refs.threadContainer.scrollHeight;
                    }
                });

                try {
                    await this.postReplyToServer(this.selectedKonsul, pesan);
                    this.open('success', 'Balasan berhasil dikirim.');
                    this.closeReplyModal();

                    if (this.replyStatus === 'selesai') {
                        await this.postSelesaiToServer(this.selectedKonsul);
                        this.selectedKonsul = null;
                    }
                } catch (e) {
                    // error sudah di-handle di postReplyToServer
                } finally {
                    this.isSending  = false;
                    this.replyText  = '';
                }
            },

            // ===== TANDAI SELESAI =====
            markAsSelesai(item) {
                item.status  = 'Selesai';
                item.tab     = 'selesai';
                item.selesai = '1';
                this.selectedKonsul = null;
                this.postSelesaiToServer(item);
                this.open('success', 'Konsultasi ditandai selesai.');
            },

            open(type, message) {
                this.$toast.open({
                    message:     message,
                    position:    'top-right',
                    type:        type,
                    duration:    3000,
                    dismissible: true
                });
            },

            // ===== TERUSKAN =====
            teruskanKonsul() {
                this.open('info', 'Fitur teruskan konsultasi akan segera tersedia.');
            },

            // ===== API CALLS =====
            async markAsReadOnServer(konsul) {
                try {
                    await axios.post('/konsultasi_read', { id_konsul: konsul.id_konsul });
                } catch (e) {
                    console.error('Gagal tandai baca:', e);
                }
            },

            async postReplyToServer(konsul, pesan) {
                try {
                    const param = {
                        id_konsul:   konsul.id_konsul,
                        noregister:  konsul.noregister,
                        kode_dokter: konsul.dokter_tujuan,
                        nama_dokter: konsul.namaDokterTujuan,
                        balasan:     pesan,
                        is_me:       '1',
                        status:      konsul.status
                    };
                    const res = await axios.post('/insert_balasan_konsul', param);
                    console.log('Balasan berhasil dikirim:', res.data);
                } catch (e) {
                    console.error('Gagal mengirim balasan:', e);
                    this.open('error', 'Gagal mengirim balasan, silahkan periksa koneksi.');
                    throw e;
                }
            },

            async postSelesaiToServer(konsul) {
                try {
                    await axios.post('/konsultasi_selesai', {
                        id_konsul:  konsul.id_konsul,
                        noregister: konsul.noregister
                    });
                } catch (e) {
                    console.error('Gagal tandai selesai:', e);
                }
            }
        }
    };
</script>

<style scoped>
.bg-warning-light {
    background-color: #fffbea !important;
}

.sidebar-item-active {
    background-color: #e8f4fd !important;
    border-left: 3px solid #007bff !important;
}

.badge-purple {
    background-color: #6f42c1;
    color: #fff;
}

/* ===== MODAL OVERLAY ===== */
.modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

/* ===== MODAL DIALOG ===== */
.modal-dialog-konsul {
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #dee2e6;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    display: flex;
    flex-direction: column;
}

/* ===== MODAL HEADER ===== */
.modal-konsul-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
}

.modal-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
}

.btn-close-modal {
    background: none;
    border: none;
    cursor: pointer;
    color: #6c757d;
    font-size: 16px;
    padding: 4px 8px;
    border-radius: 6px;
    line-height: 1;
    transition: background 0.15s, color 0.15s;
}

.btn-close-modal:hover {
    background: #f0f0f0;
    color: #343a40;
}

/* ===== MODAL PREVIEW ===== */
.modal-konsul-preview {
    padding: 0.875rem 1.25rem;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
    flex-shrink: 0;
}

.preview-label {
    font-size: 11px;
    color: #adb5bd;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 5px;
}

.preview-body {
    font-size: 13px;
    color: #495057;
    line-height: 1.7;
    max-height: 80px;
    overflow-y: auto;
}

/* ===== MODAL BODY ===== */
.modal-konsul-body {
    padding: 1.25rem;
    flex: 1;
}

.modal-label {
    font-size: 12px;
    color: #6c757d;
    font-weight: 600;
    display: block;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}

/* ===== QUICK SNIPPET BUTTONS ===== */
.btn-snippet {
    font-size: 11px;
    padding: 3px 9px;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    background: #f8f9fa;
    color: #6c757d;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    line-height: 1.5;
}

.btn-snippet:hover {
    background: #e9ecef;
    color: #343a40;
}

/* ===== MODAL FOOTER ===== */
.modal-konsul-footer {
    padding: 0.875rem 1.25rem;
    border-top: 1px solid #dee2e6;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
}

/* ===== TRANSITION ===== */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-active .modal-dialog-konsul,
.modal-fade-leave-active .modal-dialog-konsul {
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter .modal-dialog-konsul,
.modal-fade-leave-to .modal-dialog-konsul {
    transform: scale(0.96);
    opacity: 0;
}

/* ===== DOUBLE CHECKMARK ===== */
.single-check {
    font-size: 13px;
    font-weight: 700;
    color: #adb5bd;
    letter-spacing: -2px;
}

.double-check {
    font-size: 13px;
    font-weight: 700;
    color: #adb5bd;
    letter-spacing: -2px;
}

.double-check-blue {
    color: #1a73e8 !important;
}
</style>