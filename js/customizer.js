/**
 * LVLV绿侣服装定制工作台 (T-Shirt Design Studio)
 */

class TShirtCustomizer {
  constructor() {
    this.currentColor = '#FFFFFF';
    this.currentGraphic = 'logo1';
    this.currentText = '2026 CREATIVE';
    this.textColor = '#1E1E1E';
    this.printPosition = 'chest'; // chest, back, pocket, sleeve
    this.init();
  }

  init() {
    this.renderCustomizerModal();
    this.bindEvents();
  }

  renderCustomizerModal() {
    const modalHtml = `
      <div id="customizer-modal" class="modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="customizer-title">
        <div class="customizer-sheet">
          <div class="sheet-header">
            <div class="sheet-title-group">
              <span class="sheet-tag">3D在线打版</span>
              <h3 id="customizer-title">来图定制 · 智能实时设计工作台</h3>
            </div>
            <button class="close-btn" id="close-customizer-btn" aria-label="关闭">&times;</button>
          </div>

          <div class="customizer-body">
            <!-- 预览展示区 -->
            <div class="customizer-preview-container">
              <div class="tshirt-canvas-wrapper" id="customizer-canvas-wrapper">
                <svg id="customizer-svg" viewBox="0 0 400 440" class="tshirt-mockup-svg">
                  <defs>
                    <filter id="fabric-shadow" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.12)" />
                    </filter>
                    <linearGradient id="tshirt-crease" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#000" stop-opacity="0.08"/>
                      <stop offset="20%" stop-color="#fff" stop-opacity="0.12"/>
                      <stop offset="50%" stop-color="#000" stop-opacity="0.04"/>
                      <stop offset="80%" stop-color="#fff" stop-opacity="0.1"/>
                      <stop offset="100%" stop-color="#000" stop-opacity="0.1"/>
                    </linearGradient>
                    <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,0,0,0.03)" stroke-width="0.5"/>
                    </pattern>
                  </defs>

                  <!-- 衣服轮廓底色 -->
                  <g id="tshirt-base" filter="url(#fabric-shadow)">
                    <!-- 短袖衣身轮廓 -->
                    <path id="tshirt-silhouette" d="M 130 50 
                             C 150 70, 250 70, 270 50 
                             L 330 95 
                             L 300 160 
                             L 260 145 
                             L 260 380 
                             C 260 390, 140 390, 140 380 
                             L 140 145 
                             L 100 160 
                             L 70 95 Z" 
                          fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
                    <!-- 领口罗纹 -->
                    <path d="M 130 50 C 160 85, 240 85, 270 50 C 250 65, 150 65, 130 50 Z" 
                          fill="rgba(0,0,0,0.06)" stroke="#CBD5E1" stroke-width="1"/>
                    <!-- 袖口褶皱与底边车线 -->
                    <line x1="72" y1="98" x2="98" y2="157" stroke="rgba(0,0,0,0.08)" stroke-width="1" stroke-dasharray="3,2"/>
                    <line x1="328" y1="98" x2="302" y2="157" stroke="rgba(0,0,0,0.08)" stroke-width="1" stroke-dasharray="3,2"/>
                    <line x1="145" y1="372" x2="255" y2="372" stroke="rgba(0,0,0,0.08)" stroke-width="1" stroke-dasharray="3,2"/>
                  </g>

                  <!-- 印花打印安全区 -->
                  <rect id="print-area" x="160" y="120" width="80" height="110" rx="4" 
                        fill="rgba(255, 107, 26, 0.04)" stroke="#ff6b1a" stroke-width="1" stroke-dasharray="4,3"/>
                  <text x="200" y="115" text-anchor="middle" font-size="9" fill="#ff6b1a" font-weight="600">胸前A4印花范围</text>

                  <!-- 实时印花图层 -->
                  <g id="custom-graphic-layer" transform="translate(165, 130)">
                    <rect id="custom-graphic-box" width="70" height="70" fill="none"/>
                    <g id="graphic-content">
                      <!-- 动态填充印花矢量 -->
                      <circle cx="35" cy="35" r="28" fill="#F35315"/>
                      <polygon points="35,15 42,28 56,28 45,38 49,52 35,43 21,52 25,38 14,28 28,28" fill="#FFF"/>
                    </g>
                    <!-- 自定义文字 -->
                    <text id="custom-text-preview" x="35" y="86" text-anchor="middle" font-family="'Impact', 'Arial Black', sans-serif" font-size="11" font-weight="900" fill="#1E1E1E">2026 CREATIVE</text>
                  </g>
                </svg>

                <div class="preview-actions-bar">
                  <span class="preview-badge"><i class="badge-dot"></i> 4K光影实时演算</span>
                  <div class="preview-controls">
                    <button id="rotate-view-btn" class="sm-btn" title="切换正背面">正/反切换</button>
                    <button id="reset-canvas-btn" class="sm-btn" title="重置设计">重置</button>
                  </div>
                </div>
              </div>

              <!-- 面料与样衣参数展示 -->
              <div class="customizer-specs-card">
                <div class="spec-row">
                  <span class="spec-label">打版底衫：</span>
                  <span class="spec-val">BT200001 200克双纱精梳纯棉</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">印花工艺：</span>
                  <span class="spec-val">高精数码直喷 (DTG) · 环保亲肤级</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">起印门槛：</span>
                  <span class="spec-val highlight-val">1 件起印 · 当天打样 · 48小时大货发货</span>
                </div>
              </div>
            </div>

            <!-- 控制面板区 -->
            <div class="customizer-controls">
              <!-- 底衫颜色选择 -->
              <div class="control-group">
                <label class="control-label">1. 选择底衫面料颜色</label>
                <div class="color-picker-grid" id="customizer-color-grid">
                  <!-- 动态插入色块 -->
                </div>
              </div>

              <!-- 印花图案库 -->
              <div class="control-group">
                <label class="control-label">2. 选择预设潮牌矢量图案 / 上传图纸</label>
                <div class="graphic-picker-grid">
                  <button class="graphic-item active" data-graphic="star">
                    <svg viewBox="0 0 40 40" width="28" height="28">
                      <circle cx="20" cy="20" r="18" fill="#F35315"/>
                      <polygon points="20,7 24,15 33,15 26,21 29,30 20,24 11,30 14,21 7,15 16,15" fill="#FFF"/>
                    </svg>
                    <span>潮酷星芒</span>
                  </button>
                  <button class="graphic-item" data-graphic="tiger">
                    <svg viewBox="0 0 40 40" width="28" height="28">
                      <circle cx="20" cy="20" r="18" fill="#1D3557"/>
                      <text x="20" y="26" text-anchor="middle" font-size="16" fill="#FFF">🐯</text>
                    </svg>
                    <span>美式神兽</span>
                  </button>
                  <button class="graphic-item" data-graphic="badge">
                    <svg viewBox="0 0 40 40" width="28" height="28">
                      <rect x="5" y="8" width="30" height="24" rx="4" fill="#002FA7"/>
                      <text x="20" y="24" text-anchor="middle" font-size="10" font-weight="900" fill="#FFF">LVLV</text>
                    </svg>
                    <span>品牌徽章</span>
                  </button>
                  <button class="graphic-item" data-graphic="flame">
                    <svg viewBox="0 0 40 40" width="28" height="28">
                      <circle cx="20" cy="20" r="18" fill="#780000"/>
                      <text x="20" y="26" text-anchor="middle" font-size="16" fill="#FFF">🔥</text>
                    </svg>
                    <span>高街烈焰</span>
                  </button>
                </div>
                <div class="upload-trigger-wrap">
                  <label for="custom-file-input" class="upload-btn">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                    </svg>
                    上传您的 AI/PSD/PNG 矢量图
                  </label>
                  <input type="file" id="custom-file-input" accept="image/*" class="sr-only">
                </div>
              </div>

              <!-- 个性标语文字 -->
              <div class="control-group">
                <label class="control-label" for="custom-text-input">3. 标语印刷文字</label>
                <div class="text-input-wrap">
                  <input type="text" id="custom-text-input" value="2026 CREATIVE" maxlength="20" placeholder="输入品牌名字或标语...">
                  <div class="text-color-swatches" id="text-color-swatches">
                    <button class="t-color-dot active" data-color="#1E1E1E" style="background:#1E1E1E" title="黑字"></button>
                    <button class="t-color-dot" data-color="#FFFFFF" style="background:#FFFFFF;border:1px solid #ccc" title="白字"></button>
                    <button class="t-color-dot" data-color="#F35315" style="background:#F35315" title="橙字"></button>
                    <button class="t-color-dot" data-color="#002FA7" style="background:#002FA7" title="蓝字"></button>
                  </div>
                </div>
              </div>

              <!-- 定制数量与预算核算 -->
              <div class="customizer-quote-box">
                <div class="quote-header">
                  <span>智能估价参考：</span>
                  <span class="quote-price" id="customizer-estimate-price">¥29.90 / 件</span>
                </div>
                <p class="quote-tip">含一件纯棉高定底衫 + A4数码高清直喷打样费。批量100件起低至 ¥19.80/件</p>
                <div class="quote-actions">
                  <button class="primary-btn pulse-glow" id="submit-custom-order-btn">提交样品打版需求</button>
                  <button class="secondary-btn" id="save-design-draft-btn">保存设计草稿</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    this.populateColorGrid();
  }

  populateColorGrid() {
    const grid = document.getElementById('customizer-color-grid');
    if (!grid) return;

    Object.entries(COLOR_PALETTE).forEach(([key, color], index) => {
      const btn = document.createElement('button');
      btn.className = `color-chip ${index === 0 ? 'active' : ''}`;
      btn.style.backgroundColor = color.hex;
      btn.style.borderColor = color.border;
      btn.title = color.name;
      btn.innerHTML = `<span class="sr-only">${color.name}</span>`;
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        this.updateTShirtColor(color.hex);
      });
      grid.appendChild(btn);
    });
  }

  updateTShirtColor(hex) {
    this.currentColor = hex;
    const silhouette = document.getElementById('tshirt-silhouette');
    if (silhouette) {
      silhouette.setAttribute('fill', hex);
      // 若底色为浅色，文字默认黑，若深色，可适配
      if (hex === '#1E1E1E' || hex === '#1D3557' || hex === '#780000') {
        silhouette.setAttribute('stroke', '#334155');
      } else {
        silhouette.setAttribute('stroke', '#E2E8F0');
      }
    }
  }

  bindEvents() {
    // 监听关闭
    document.getElementById('close-customizer-btn')?.addEventListener('click', () => {
      this.close();
    });

    // 监听文字输入
    const textInput = document.getElementById('custom-text-input');
    const textPreview = document.getElementById('custom-text-preview');
    textInput?.addEventListener('input', (e) => {
      const val = e.target.value.trim() || '';
      if (textPreview) {
        textPreview.textContent = val;
      }
    });

    // 字体颜色切换
    document.querySelectorAll('.t-color-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        document.querySelectorAll('.t-color-dot').forEach(d => d.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const color = e.currentTarget.dataset.color;
        if (textPreview) {
          textPreview.setAttribute('fill', color);
        }
      });
    });

    // 印花切换
    document.querySelectorAll('.graphic-item').forEach(item => {
      item.addEventListener('click', (e) => {
        document.querySelectorAll('.graphic-item').forEach(i => i.classList.remove('active'));
        const target = e.currentTarget;
        target.classList.add('active');
        const gType = target.dataset.graphic;
        this.changeGraphic(gType);
      });
    });

    // 本地图片上传预览
    const fileInput = document.getElementById('custom-file-input');
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.setCustomImageGraphic(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });

    // 提交订单模拟
    document.getElementById('submit-custom-order-btn')?.addEventListener('click', () => {
      alert('已成功生成 3D 定制打版单！打样单号：DZ' + Date.now().toString().slice(-6) + '\n我们的版房专属工艺师将在 15 分钟内联系您确认数码直喷位移与色差校验！');
      this.close();
    });

    // 保存草稿
    document.getElementById('save-design-draft-btn')?.addEventListener('click', () => {
      alert('设计草稿已保存至您的“设计工作室”方案夹中！');
    });
  }

  changeGraphic(type) {
    const graphicContent = document.getElementById('graphic-content');
    if (!graphicContent) return;

    if (type === 'star') {
      graphicContent.innerHTML = `
        <circle cx="35" cy="35" r="28" fill="#F35315"/>
        <polygon points="35,15 42,28 56,28 45,38 49,52 35,43 21,52 25,38 14,28 28,28" fill="#FFF"/>
      `;
    } else if (type === 'tiger') {
      graphicContent.innerHTML = `
        <circle cx="35" cy="35" r="28" fill="#1D3557"/>
        <text x="35" y="44" text-anchor="middle" font-size="28" fill="#FFF">🐯</text>
      `;
    } else if (type === 'badge') {
      graphicContent.innerHTML = `
        <rect x="5" y="15" width="60" height="40" rx="8" fill="#002FA7"/>
        <text x="35" y="40" text-anchor="middle" font-size="14" font-weight="900" fill="#FFF">LVLV 2026</text>
      `;
    } else if (type === 'flame') {
      graphicContent.innerHTML = `
        <circle cx="35" cy="35" r="28" fill="#780000"/>
        <text x="35" y="44" text-anchor="middle" font-size="28" fill="#FFF">🔥</text>
      `;
    }
  }

  setCustomImageGraphic(url) {
    const graphicContent = document.getElementById('graphic-content');
    if (!graphicContent) return;
    graphicContent.innerHTML = `
      <image href="${url}" x="5" y="5" width="60" height="60" preserveAspectRatio="xMidYMid meet" />
    `;
  }

  open() {
    const modal = document.getElementById('customizer-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    const modal = document.getElementById('customizer-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }
}
