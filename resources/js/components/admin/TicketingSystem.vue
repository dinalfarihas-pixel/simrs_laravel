<template>
    <section class="content">
        <div class="container-fluid">
            <div class="content">
                <!-- Create New Ticket Form -->
                <div class="ticket-form-card">
                    <div class="form-header">
                        <h2>Terbitkan Tiket Baru</h2>
                        <span class="ticket-id" v-if="ticketId">#{{ ticketId }}</span>
                    </div>

                    <form @submit.prevent="submitTicket">
                        <!-- Ticket Details -->
                        <div class="form-row">
                            <div class="form-group">
                                <label for="subject">Judul *</label>
                                <InputText type="text" id="subject" v-model="ticket.subject"
                                    placeholder="Brief description of your issue" style="width: 100%;" required />
                            </div>

                            <div class="form-group">
                                <label for="priority">Prioritas</label>
                                <Select v-model="ticket.priority" :options="priorityOptions" optionLabel="label"
                                    optionValue="value" placeholder="Pilih Prioritas" style="width: 100%;" />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="category">Category</label>
                                <Select v-model="ticket.category" :options="categoryOptions" optionLabel="label"
                                    optionValue="value" placeholder="Pilih Kategori" style="width: 100%;" />
                            </div>

                        </div>

                        <!-- Description with Image Support -->
                        <div class="form-group">
                            <label for="description">Description *</label>
                            <div class="ticket-editor" contenteditable="true" @paste="handlePaste"
                                @input="handleTextInput" @dragover.prevent @drop.prevent="handleDrop"
                                @focus="handleFocus" @blur="handleBlur" ref="descriptionEditor"
                                :class="{ 'focused': isEditorFocused, 'has-content': hasContent }">
                                <div v-if="!hasContent && !isEditorFocused" class="editor-placeholder">
                                    Describe your issue in detail. You can type text or paste/drag images...
                                </div>

                                <!-- Display attached images -->
                                <div v-if="attachedImages.length > 0" class="attached-images">
                                    <div v-for="(image, index) in attachedImages" :key="index" class="image-attachment">
                                        <img :src="image.dataUrl" :alt="image.name" class="attachment-image" />
                                        <div class="image-info">
                                            <span class="image-name">{{ image.name }}</span>
                                            <span class="image-size">{{ formatFileSize(image.size) }}</span>
                                        </div>
                                        <button type="button" @click="removeImage(index)" class="remove-attachment"
                                            title="Remove image">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Editor Tools -->
                            <div class="editor-tools">
                                <button type="button" @click="triggerFileUpload" class="tool-btn">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                        <polyline points="21,15 16,10 5,21"></polyline>
                                    </svg>
                                    Attach Images
                                </button>

                                <span class="tool-info">
                                    {{ attachedImages.length }}/{{ maxImages }} images •
                                    {{ textContent.length }} characters
                                </span>
                            </div>

                            <!-- Hidden file input -->
                            <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" multiple
                                style="display: none;" />
                        </div>

                        <!-- Form Actions -->
                        <div class="form-actions">
                            <button type="button" @click="saveDraft" class="btn btn-secondary"
                                :disabled="!canSaveDraft">
                                💾 Save as Draft
                            </button>
                            <button type="submit" class="btn btn-primary" :disabled="!canSubmit">
                                🎫 Create Ticket
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Success Message -->
                <div v-if="showSuccess" class="success-message">
                    <div class="success-content">
                        <div class="success-icon">✅</div>
                        <div>
                            <h3>Ticket Created Successfully!</h3>
                            <p>Your ticket <strong>#{{ lastCreatedTicket.id }}</strong> has been submitted.</p>
                            <p>We'll respond to <strong></strong> within
                                {{ getResponseTime(lastCreatedTicket.priority) }}.</p>
                        </div>
                    </div>
                    <button @click="showSuccess = false" class="close-success">×</button>
                </div>

                <!-- Created Tickets List -->
                <div v-if="createdTickets.length > 0" class="tickets-list">
                    <h3>Your Recent Tickets</h3>

                    <div v-for="ticket in createdTickets" :key="ticket.id" class="ticket-item">
                        <div class="ticket-header">
                            <div class="ticket-meta">
                                <span class="ticket-number">#{{ ticket.id }}</span>
                                <span class="ticket-status"
                                    :class="ticket.status">{{ getStatusText(ticket.status) }}</span>
                                <span class="ticket-priority"
                                    :class="ticket.priority">{{ getPriorityText(ticket.priority) }}</span>
                            </div>
                            <span class="ticket-date">{{ formatDate(ticket.createdAt) }}</span>
                        </div>

                        <h4 class="ticket-subject">{{ ticket.subject }}</h4>

                        <div class="ticket-description">
                            {{ ticket.description.substring(0, 150) }}{{ ticket.description.length > 150 ? '...' : '' }}
                        </div>

                        <div v-if="ticket.images.length > 0" class="ticket-attachments">
                            <span class="attachment-count">📎 {{ ticket.images.length }} attachment(s)</span>
                        </div>

                        <div class="ticket-footer">
                            <span class="ticket-category">{{ getCategoryText(ticket.category) }}</span>
                            <button class="btn btn-sm btn-outline">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import InputText from 'primevue/inputtext';

    export default {
        name: 'TicketingSystem',
        data() {
            return {
                ticket: {
                    subject: '',
                    description: '',
                    priority: 'medium',
                    category: 'technical', 
                    status: 'open'
                },
                textContent: '',
                attachedImages: [],
                isEditorFocused: false,
                maxImages: 5,
                createdTickets: [],
                showSuccess: false,
                lastCreatedTicket: null,
                ticketId: null,
                priorityOptions: [{
                        label: '🟢 Rendah',
                        value: 'low'
                    },
                    {
                        label: '🟡 Sedang',
                        value: 'medium'
                    },
                    {
                        label: '🟠 Tinggi',
                        value: 'high'
                    },
                    {
                        label: '🔴 Urgent',
                        value: 'urgent'
                    }
                ],
                categoryOptions: [{
                        label: '🔧 Technical Issue',
                        value: 'technical'
                    },
                    {
                        label: '💳 Billing',
                        value: 'billing'
                    },
                    {
                        label: '💡 Feature Request',
                        value: 'feature'
                    },
                    {
                        label: '🐛 Bug Report',
                        value: 'bug'
                    },
                    {
                        label: '❓ General Support',
                        value: 'general'
                    }
                ]
            };
        },
        computed: {
            hasContent() {
                return this.textContent.length > 0 || this.attachedImages.length > 0;
            },
            canSubmit() {
                return this.ticket.subject.trim() &&
                    this.textContent.trim()  
            },
            canSaveDraft() {
                return this.ticket.subject.trim() || this.textContent.trim();
            }
        },
        mounted() {
            this.generateTicketId();
            this.loadDrafts();
        },
        methods: {
            handlePaste(event) {
                const clipboardData = event.clipboardData;

                const hasImages = Array.from(clipboardData.items).some(item =>
                    item.type.indexOf('image') !== -1
                );

                if (hasImages && this.attachedImages.length < this.maxImages) {
                    event.preventDefault();
                    this.processClipboardData(clipboardData);
                } else {
                    setTimeout(() => {
                        this.updateTextContent();
                    }, 0);
                }
            },

            handleTextInput() {
                setTimeout(() => {
                    this.updateTextContent();
                }, 0);
            },

            handleFocus() {
                this.isEditorFocused = true;
            },

            handleBlur() {
                this.isEditorFocused = false;
            },

            handleDrop(event) {
                event.preventDefault();
                if (this.attachedImages.length >= this.maxImages) {
                    alert(`Maximum ${this.maxImages} images allowed`);
                    return;
                }
                const files = Array.from(event.dataTransfer.files);
                this.processFiles(files);
            },

            updateTextContent() {
                if (this.$refs.descriptionEditor) {
                    const textNodes = [];
                    const walker = document.createTreeWalker(
                        this.$refs.descriptionEditor,
                        NodeFilter.SHOW_TEXT,
                        null,
                        false
                    );

                    let node;
                    while (node = walker.nextNode()) {
                        if (!node.parentElement.classList.contains('editor-placeholder') &&
                            !node.parentElement.closest('.attached-images')) {
                            textNodes.push(node.textContent);
                        }
                    }

                    this.textContent = textNodes.join('').trim();
                    this.ticket.description = this.textContent;
                }
            },

            processClipboardData(clipboardData) {
                if (!clipboardData) return;

                const items = Array.from(clipboardData.items);

                for (let item of items) {
                    if (item.type.indexOf('image') !== -1 && this.attachedImages.length < this.maxImages) {
                        const file = item.getAsFile();
                        this.processImageFile(file);
                    }
                }
            },

            processFiles(files) {
                files.forEach(file => {
                    if (file.type.startsWith('image/') && this.attachedImages.length < this.maxImages) {
                        this.processImageFile(file);
                    }
                });
            },

            processImageFile(file) {
                if (!file) return;

                const reader = new FileReader();

                reader.onload = (e) => {
                    const imageData = {
                        dataUrl: e.target.result,
                        name: file.name || `image-${Date.now()}.png`,
                        size: file.size,
                        type: file.type,
                        file: file
                    };

                    this.attachedImages.push(imageData);
                };

                reader.readAsDataURL(file);
            },

            triggerFileUpload() {
                if (this.attachedImages.length >= this.maxImages) {
                    alert(`Maximum ${this.maxImages} images allowed`);
                    return;
                }
                this.$refs.fileInput.click();
            },

            handleFileSelect(event) {
                const files = Array.from(event.target.files);
                this.processFiles(files);
                event.target.value = '';
            },

            removeImage(index) {
                this.attachedImages.splice(index, 1);
            },

            generateTicketId() {
                this.ticketId = Date.now().toString().slice(-6);
            },

            submitTicket() {
                if (!this.canSubmit) return;

                const newTicket = {
                    id: this.ticketId,
                    subject: this.ticket.subject,
                    description: this.textContent,
                    priority: this.ticket.priority,
                    category: this.ticket.category, 
                    status: 'open',
                    images: [...this.attachedImages],
                    createdAt: new Date(),
                    updatedAt: new Date()
                };

                // Simulate API call
                this.createdTickets.unshift(newTicket);
                this.lastCreatedTicket = newTicket;
                this.showSuccess = true;

                // Emit to parent component
                this.$emit('ticket-created', newTicket);

                // Clear form
                this.resetForm();

                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    this.showSuccess = false;
                }, 5000);
            },

            saveDraft() {
                const draft = {
                    subject: this.ticket.subject,
                    description: this.textContent,
                    priority: this.ticket.priority,
                    category: this.ticket.category,
                    images: [...this.attachedImages],
                    savedAt: new Date()
                };

                localStorage.setItem('ticket-draft', JSON.stringify(draft));
                alert('Draft saved!');
            },

            loadDrafts() {
                const draft = localStorage.getItem('ticket-draft');
                if (draft) {
                    const parsedDraft = JSON.parse(draft);

                    if (confirm('You have a saved draft. Would you like to restore it?')) {
                        this.ticket.subject = parsedDraft.subject || '';
                        this.ticket.priority = parsedDraft.priority || 'medium';
                        this.ticket.category = parsedDraft.category || 'technical';
                        this.textContent = parsedDraft.description || '';
                        this.attachedImages = parsedDraft.images || [];

                        if (this.$refs.descriptionEditor) {
                            this.$refs.descriptionEditor.innerHTML = this.textContent;
                        }

                        localStorage.removeItem('ticket-draft');
                    }
                }
            },

            resetForm() {
                this.ticket = {
                    subject: '',
                    description: '',
                    priority: 'medium',
                    category: 'technical',
                    status: 'open'
                };
                this.textContent = '';
                this.attachedImages = [];
                if (this.$refs.descriptionEditor) {
                    this.$refs.descriptionEditor.innerHTML = '';
                }
                this.generateTicketId();
            },

            formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            },

            formatDate(date) {
                return new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            },

            getStatusText(status) {
                const statuses = {
                    'open': 'Open',
                    'in-progress': 'In Progress',
                    'waiting': 'Waiting for Response',
                    'resolved': 'Resolved',
                    'closed': 'Closed'
                };
                return statuses[status] || status;
            },

            getPriorityText(priority) {
                const priorities = {
                    'low': '🟢 Low',
                    'medium': '🟡 Medium',
                    'high': '🟠 High',
                    'urgent': '🔴 Urgent'
                };
                return priorities[priority] || priority;
            },

            getCategoryText(category) {
                const categories = {
                    'technical': '🔧 Technical',
                    'billing': '💳 Billing',
                    'feature': '💡 Feature Request',
                    'bug': '🐛 Bug Report',
                    'general': '❓ General'
                };
                return categories[category] || category;
            },

            getResponseTime(priority) {
                const times = {
                    'urgent': '2 hours',
                    'high': '4 hours',
                    'medium': '24 hours',
                    'low': '48 hours'
                };
                return times[priority] || '24 hours';
            }
        }
    };

</script>

<style scoped>
    .ticket-system {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .ticket-form-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 24px;
        margin-bottom: 24px;
    }

    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #f0f0f0;
    }

    .form-header h2 {
        margin: 0;
        color: #2d3748;
        font-size: 24px;
    }

    .ticket-id {
        background: #e2e8f0;
        color: #4a5568;
        padding: 4px 12px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 16px;
    }

    .form-group {
        margin-bottom: 16px;
    }

    .form-group label {
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
        color: #374151;
        font-size: 14px;
    }

    .form-input,
    .form-select {
        width: 100%;
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input:focus,
    .form-select:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .ticket-editor {
        min-height: 120px;
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        outline: none;
        font-size: 16px;
        line-height: 1.5;
        position: relative;
        background: white;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    .ticket-editor.focused {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .editor-placeholder {
        color: #9ca3af;
        pointer-events: none;
        position: absolute;
        top: 12px;
        left: 12px;
    }

    .attached-images {
        margin: 12px 0;
    }

    .image-attachment {
        display: flex;
        align-items: center;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 8px;
        margin-bottom: 8px;
        position: relative;
    }

    .attachment-image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 6px;
        margin-right: 12px;
    }

    .image-info {
        flex: 1;
    }

    .image-name {
        display: block;
        font-weight: 600;
        color: #374151;
        font-size: 14px;
    }

    .image-size {
        color: #6b7280;
        font-size: 12px;
    }

    .remove-attachment {
        background: #ef4444;
        color: white;
        border: none;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s;
    }

    .remove-attachment:hover {
        background: #dc2626;
    }

    .editor-tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;
        padding-top: 8px;
        border-top: 1px solid #e5e7eb;
    }

    .tool-btn {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: #374151;
        transition: background-color 0.2s;
    }

    .tool-btn:hover {
        background: #e5e7eb;
    }

    .tool-info {
        font-size: 12px;
        color: #6b7280;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid #e5e7eb;
    }

    .btn {
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
    }

    .btn-primary {
        background: #3b82f6;
        color: white;
    }

    .btn-primary:hover:not(:disabled) {
        background: #2563eb;
    }

    .btn-secondary {
        background: #f3f4f6;
        color: #374151;
        border: 1px solid #d1d5db;
    }

    .btn-secondary:hover:not(:disabled) {
        background: #e5e7eb;
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .success-message {
        background: #ecfdf5;
        border: 1px solid #10b981;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
        position: relative;
    }

    .success-content {
        display: flex;
        align-items: flex-start;
        gap: 12px;
    }

    .success-icon {
        font-size: 24px;
    }

    .success-content h3 {
        margin: 0 0 4px 0;
        color: #065f46;
    }

    .success-content p {
        margin: 4px 0;
        color: #047857;
    }

    .close-success {
        position: absolute;
        top: 8px;
        right: 12px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #059669;
    }

    .tickets-list {
        margin-top: 32px;
    }

    .tickets-list h3 {
        margin-bottom: 16px;
        color: #2d3748;
    }

    .ticket-item {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin-bottom: 12px;
        border-left: 4px solid #e5e7eb;
    }

    .ticket-item:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .ticket-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .ticket-meta {
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .ticket-number {
        font-weight: 600;
        color: #4a5568;
    }

    .ticket-status,
    .ticket-priority {
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }

    .ticket-status.open {
        background: #dbeafe;
        color: #1e40af;
    }

    .ticket-priority.low {
        background: #dcfce7;
        color: #166534;
    }

    .ticket-priority.medium {
        background: #fef3c7;
        color: #92400e;
    }

    .ticket-priority.high {
        background: #fed7aa;
        color: #c2410c;
    }

    .ticket-priority.urgent {
        background: #fecaca;
        color: #dc2626;
    }

    .ticket-date {
        font-size: 12px;
        color: #6b7280;
    }

    .ticket-subject {
        margin: 8px 0;
        color: #2d3748;
        font-size: 16px;
    }

    .ticket-description {
        color: #4a5568;
        margin-bottom: 8px;
        line-height: 1.4;
    }

    .ticket-attachments {
        margin: 8px 0;
    }

    .attachment-count {
        font-size: 12px;
        color: #6b7280;
    }

    .ticket-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
        padding-top: 8px;
        border-top: 1px solid #f3f4f6;
    }

    .ticket-category {
        font-size: 12px;
        color: #6b7280;
    }

    .btn-sm {
        padding: 6px 12px;
        font-size: 12px;
    }

    .btn-outline {
        background: white;
        color: #3b82f6;
        border: 1px solid #3b82f6;
    }

    .btn-outline:hover {
        background: #3b82f6;
        color: white;
    }

    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }

        .form-actions {
            flex-direction: column;
        }

        .ticket-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }
    }

</style>
