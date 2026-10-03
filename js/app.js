/**
 * LVLV绿侣服装供应链商城 - 核心主逻辑控制系统
 */

document.addEventListener('DOMContentLoaded', () => {
  // 全局应用状态
  const state = {
    isLoggedIn: false,
    currentUser: null,
    cart: [],
    currentSlide: 0,
    searchKeyword: '',
    selectedProduct: null,
    isDesktopView: false,
  };

  // 初始化 T恤定制器实例
  const customizer = new TShirtCustomizer();

  // ==========================================
  // 1. 渲染 16 宫格分类区 (4列 × 4行)
  // ==========================================
  function renderCategoryGrid() {
    const gridContainer = document.getElementById('category-grid-16');
    if (!gridContainer) return;

    gridContainer.innerHTML = CATEGORIES_DATA.map(cat => `
      <button class="cat-item-btn" data-cat-id="${cat.id}" title="${cat.name}">
        <div class="cat-icon-box">
          ${ApparelArtwork.renderCategoryIcon(cat.iconType, cat.color)}
        </div>
        <span class="cat-title-text">${cat.name}</span>
      </button>
    `).join('');

    // 绑定分类点击事件：若为“来图定制”或“设计”，直接打开打版工作室；否则平滑滚动至对应品类专区
    gridContainer.querySelectorAll('.cat-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catId = e.currentTarget.dataset.catId;
        if (catId === 'custom-print' || catId === 'oem') {
          customizer.open();
        } else {
          scrollToCategory(catId);
        }
      });
    });
  }

  // ==========================================
  // 2. 渲染 3 列商品流 (对齐截图 2)
  // ==========================================
  function renderProductStreams() {
    const streamContainer = document.getElementById('product-stream-container');
    if (!streamContainer) return;

    // 按照主流类目分组展示
    const displayCategories = [
      { id: 'short-t', name: '短袖T恤' },
      { id: 'long-t', name: '长袖T恤' },
      { id: 'crewneck', name: '圆领卫衣' },
      { id: 'hoodie', name: '连帽卫衣' }
    ];

    streamContainer.innerHTML = displayCategories.map(cat => {
      const items = PRODUCTS_DATA.filter(p => p.categoryId === cat.id);
      if (items.length === 0) return '';

      return `
        <article class="stream-category-block" id="category-section-${cat.id}">
          <div class="category-block-header">
            <h3>${cat.name}</h3>
            <button class="view-more-link" data-cat-id="${cat.id}">
              <span>&gt;</span>
            </button>
          </div>

          <div class="products-3col-grid">
            ${items.map(product => renderSingleProductCard(product)).join('')}
          </div>
        </article>
      `;
    }).join('');

    // 绑定商品卡片点击
    streamContainer.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const pId = card.dataset.productId;
        const product = PRODUCTS_DATA.find(p => p.id === pId);
        if (product) {
          openProductDetail(product);
        }
      });
    });

    // 绑定价格按钮点击（防止卡片与按钮事件冲突）
    streamContainer.querySelectorAll('.price-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pId = e.currentTarget.dataset.productId;
        const product = PRODUCTS_DATA.find(p => p.id === pId);
        if (!state.isLoggedIn) {
          openAuthModal();
        } else if (product) {
          openProductDetail(product);
        }
      });
    });
  }

  function renderSingleProductCard(product) {
    const priceDisplay = state.isLoggedIn 
      ? `
        <div class="unlocked-price-tag">
          <span class="currency">¥</span>
          <span class="num">${product.displayPrice}</span>
          <span class="unit">起批</span>
        </div>
      `
      : `<button class="price-btn login-price-trigger" data-product-id="${product.id}">登录查看价格</button>`;

    return `
      <div class="product-card" data-product-id="${product.id}" title="${product.title}">
        <div class="card-media-box">
          ${ApparelArtwork.renderProductVisual(product)}
        </div>
        <div class="card-info-box">
          <h4 class="card-title">${product.title}</h4>
          <div class="price-btn-wrap">
            ${priceDisplay}
          </div>
        </div>
      </div>
    `;
  }

  // 平滑滚动至指定类目区块
  function scrollToCategory(catId) {
    const targetSection = document.getElementById(`category-section-${catId}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      // 找不到则过滤
      const filtered = PRODUCTS_DATA.filter(p => p.categoryId === catId);
      if (filtered.length > 0) {
        openProductDetail(filtered[0]);
      }
    }
  }

  // ==========================================
  // 3. 首焦轮播 Banner 控制
  // ==========================================
  function initHeroBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.indicator-dot');
    let bannerInterval = null;

    function goToSlide(index) {
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      state.currentSlide = index;
    }

    function nextSlide() {
      const next = (state.currentSlide + 1) % slides.length;
      goToSlide(next);
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        goToSlide(idx);
        restartTimer();
      });
    });

    function startTimer() {
      bannerInterval = setInterval(nextSlide, 7000);
    }

    function restartTimer() {
      clearInterval(bannerInterval);
      startTimer();
    }

    startTimer();

    const bannerContainer = document.getElementById('banner-carousel');
    bannerContainer?.addEventListener('mouseenter', () => clearInterval(bannerInterval));
    bannerContainer?.addEventListener('mouseleave', () => startTimer());

    // 绑定 Banner 内右侧两个特性卡片点击
    document.getElementById('subcard-sports')?.addEventListener('click', () => {
      scrollToCategory('short-t');
    });

    document.getElementById('subcard-colorblock')?.addEventListener('click', () => {
      scrollToCategory('short-t');
    });

    document.getElementById('banner-hoodie-cta')?.addEventListener('click', () => {
      scrollToCategory('hoodie');
    });

    document.getElementById('banner-custom-cta')?.addEventListener('click', () => {
      customizer.open();
    });
  }

  // ==========================================
  // 4. 批发价格体系与一键认证登录状态机
  // ==========================================
  function setAuthState(isLoggedIn, phone = '13800138000') {
    state.isLoggedIn = isLoggedIn;
    state.currentUser = isLoggedIn ? { phone } : null;

    const authDot = document.getElementById('auth-state-dot');
    const authText = document.getElementById('auth-state-text');
    if (authDot && authText) {
      if (isLoggedIn) {
        authDot.className = 'auth-icon-dot logged';
        authText.textContent = `批发商(${phone.slice(-4)})已认证 · 底价已解锁`;
      } else {
        authDot.className = 'auth-icon-dot guest';
        authText.textContent = '游客模式 (点击解锁底价)';
      }
    }

    // 重新渲染商品卡片价格
    renderProductStreams();
  }

  function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal?.classList.remove('hidden');
  }

  function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal?.classList.add('hidden');
  }

  // ==========================================
  // 5. 商品详情多规格采购抽屉
  // ==========================================
  function openProductDetail(product) {
    state.selectedProduct = product;
    const modal = document.getElementById('product-detail-modal');
    const content = document.getElementById('product-detail-content');
    if (!modal || !content) return;

    let selectedColor = product.colors[0];
    let selectedSize = product.sizes[0];
    let currentQty = 1;

    function renderDetailContent() {
      const activeColorObj = COLOR_PALETTE[selectedColor] || { name: '标准色', hex: '#1E1E1E' };
      const currentTier = product.tieredPrices.find(t => currentQty >= t.min && currentQty <= t.max) || product.tieredPrices[0];
      const unitPrice = state.isLoggedIn ? currentTier.price : '登录解锁';
      const subtotal = state.isLoggedIn ? (currentTier.price * currentQty).toFixed(2) : '--';

      content.innerHTML = `
        <div class="detail-top-card">
          <div class="detail-thumb-box">
            ${ApparelArtwork.renderProductVisual({ ...product, colors: [selectedColor, ...product.colors] })}
          </div>
          <div class="detail-meta-box">
            <div>
              <span class="detail-badge-pill">${product.badgeText} · ${product.tag}</span>
              <h3 class="detail-title" id="modal-product-title">${product.title}</h3>
              <p class="text-muted" style="font-size:11px; margin-top:2px;">货号: ${product.code} | 现货库存: ${product.stock} 件</p>
            </div>
            <div style="margin-top: 6px;">
              <span style="font-size:11px; color:#64748b;">单价：</span>
              <span style="font-size:18px; font-weight:900; color:#ff5500;">
                ${state.isLoggedIn ? `¥${unitPrice}` : `<span style="font-size:14px; color:#d99b26; font-weight:700;">登录查看价格</span>`}
              </span>
              <span style="font-size:10px; color:#94a3b8;"> (${currentTier.label})</span>
            </div>
          </div>
        </div>

        <!-- 阶梯出厂底价表 -->
        <div class="tier-price-table">
          ${product.tieredPrices.map(tier => `
            <div class="tier-col ${currentQty >= tier.min && currentQty <= tier.max ? 'highlight' : ''}">
              <span class="tier-qty">${tier.min}${tier.max < 99999 ? `-${tier.max}` : '+'}件</span>
              <span class="tier-p">${state.isLoggedIn ? `¥${tier.price.toFixed(2)}` : '***'}</span>
            </div>
          `).join('')}
        </div>

        <!-- 颜色选择 -->
        <div class="spec-selector-section">
          <div class="spec-title">面料颜色 (已选: ${activeColorObj.name})</div>
          <div class="color-chips-row">
            ${product.colors.map(cKey => {
              const cObj = COLOR_PALETTE[cKey] || { name: cKey, hex: '#ccc' };
              return `
                <button class="spec-chip ${cKey === selectedColor ? 'active' : ''}" data-color-key="${cKey}">
                  <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${cObj.hex};margin-right:4px;border:1px solid #ddd;"></span>
                  ${cObj.name}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 尺码选择 -->
        <div class="spec-selector-section">
          <div class="spec-title">规格尺码 (已选: ${selectedSize})</div>
          <div class="color-chips-row">
            ${product.sizes.map(sz => `
              <button class="spec-chip ${sz === selectedSize ? 'active' : ''}" data-size-val="${sz}">
                ${sz}码
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 面料参数 -->
        <div class="customizer-specs-card" style="margin-bottom: 14px;">
          <div class="spec-row"><span class="spec-label">面料克重：</span><span class="spec-val">${product.weight}</span></div>
          <div class="spec-row"><span class="spec-label">面料材质：</span><span class="spec-val">${product.material}</span></div>
          <div class="spec-row"><span class="spec-label">版型结构：</span><span class="spec-val">${product.fit}</span></div>
        </div>

        <!-- 采购数量计数器 -->
        <div class="spec-selector-section" style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div class="spec-title" style="margin-bottom:2px;">采购件数</div>
            <span style="font-size:11px; color:#64748b;">支持拼色拼码混合批量下单</span>
          </div>
          <div class="qty-counter">
            <button class="qty-btn" id="btn-qty-minus">-</button>
            <input type="number" class="qty-input" id="input-detail-qty" value="${currentQty}" min="1" max="50000">
            <button class="qty-btn" id="btn-qty-plus">+</button>
          </div>
        </div>

        <!-- 底部提交操作栏 -->
        <div style="margin-top: 18px; display:flex; gap:10px;">
          <button class="secondary-btn" id="btn-add-to-cart" style="flex:1;">
            加入采购车
          </button>
          <button class="primary-btn pulse-glow" id="btn-instant-order" style="flex:1.2;">
            ${state.isLoggedIn ? `立即订购 (¥${subtotal})` : '登录查看批发底价'}
          </button>
        </div>
      `;

      // 绑定切换颜色
      content.querySelectorAll('[data-color-key]').forEach(b => {
        b.addEventListener('click', (e) => {
          selectedColor = e.currentTarget.dataset.colorKey;
          renderDetailContent();
        });
      });

      // 绑定切换尺码
      content.querySelectorAll('[data-size-val]').forEach(b => {
        b.addEventListener('click', (e) => {
          selectedSize = e.currentTarget.dataset.sizeVal;
          renderDetailContent();
        });
      });

      // 数量增减
      content.querySelector('#btn-qty-minus')?.addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          renderDetailContent();
        }
      });

      content.querySelector('#btn-qty-plus')?.addEventListener('click', () => {
        currentQty++;
        renderDetailContent();
      });

      content.querySelector('#input-detail-qty')?.addEventListener('change', (e) => {
        const val = parseInt(e.target.value, 10);
        currentQty = isNaN(val) || val < 1 ? 1 : val;
        renderDetailContent();
      });

      // 加入购物车
      content.querySelector('#btn-add-to-cart')?.addEventListener('click', () => {
        addToCart(product, selectedColor, selectedSize, currentQty, currentTier.price);
        closeProductDetail();
      });

      // 立即订购
      content.querySelector('#btn-instant-order')?.addEventListener('click', () => {
        if (!state.isLoggedIn) {
          closeProductDetail();
          openAuthModal();
        } else {
          addToCart(product, selectedColor, selectedSize, currentQty, currentTier.price);
          closeProductDetail();
          openCartDrawer();
        }
      });
    }

    renderDetailContent();
    modal.classList.remove('hidden');
  }

  function closeProductDetail() {
    const modal = document.getElementById('product-detail-modal');
    modal?.classList.add('hidden');
  }

  // ==========================================
  // 6. 采购车与订货单管理
  // ==========================================
  function addToCart(product, colorKey, size, qty, price) {
    const colorObj = COLOR_PALETTE[colorKey] || { name: colorKey };
    const existingIndex = state.cart.findIndex(
      item => item.product.id === product.id && item.colorKey === colorKey && item.size === size
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += qty;
    } else {
      state.cart.push({
        id: 'cart_' + Date.now() + Math.random().toString().slice(-4),
        product,
        colorKey,
        colorName: colorObj.name,
        size,
        qty,
        price
      });
    }

    updateCartBadge();
    showToast(`已成功加入采购车：${product.code} (${colorObj.name}/${size}码) x${qty}件`);
  }

  function updateCartBadge() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const badge1 = document.getElementById('cart-badge-count');
    const badge2 = document.getElementById('tab-cart-badge');
    const countSpan = document.getElementById('cart-total-count');

    if (badge1) badge1.textContent = totalCount;
    if (badge2) {
      badge2.textContent = totalCount;
      badge2.classList.toggle('hidden', totalCount === 0);
    }
    if (countSpan) countSpan.textContent = totalCount;
  }

  function openCartDrawer() {
    const modal = document.getElementById('cart-drawer-modal');
    const list = document.getElementById('cart-items-list');
    const totalAmount = document.getElementById('cart-total-amount');
    if (!modal || !list) return;

    if (state.cart.length === 0) {
      list.innerHTML = `
        <div class="cart-empty-state">
          <div style="font-size:36px;margin-bottom:8px;">🛒</div>
          <p>您的采购清单还是空的</p>
          <p style="font-size:11px;margin-top:4px;">挑选心仪服装或来图定制，随时添加样品核价</p>
        </div>
      `;
      if (totalAmount) totalAmount.textContent = '¥0.00';
    } else {
      let sum = 0;
      list.innerHTML = state.cart.map(item => {
        const itemTotal = item.price * item.qty;
        sum += itemTotal;
        return `
          <div class="cart-item-row">
            <div class="cart-item-meta">
              <h5>${item.product.code} · ${item.product.title}</h5>
              <p>颜色: ${item.colorName} | 尺码: ${item.size}码 | 单价: ¥${item.price.toFixed(2)}</p>
            </div>
            <div style="text-align:right;">
              <span style="font-size:13px;font-weight:800;color:#ff5500;">¥${itemTotal.toFixed(2)}</span>
              <div style="font-size:11px;color:#64748b;margin-top:2px;">x${item.qty}件</div>
            </div>
          </div>
        `;
      }).join('');

      if (totalAmount) {
        totalAmount.textContent = state.isLoggedIn ? `¥${sum.toFixed(2)}` : '登录查看总额';
      }
    }

    modal.classList.remove('hidden');
  }

  function closeCartDrawer() {
    document.getElementById('cart-drawer-modal')?.classList.add('hidden');
  }

  // ==========================================
  // 7. 高清图库素材包下载中心
  // ==========================================
  function openHdModal() {
    const modal = document.getElementById('hd-modal');
    const list = document.getElementById('hd-pack-list');
    if (!modal || !list) return;

    list.innerHTML = HD_GALLERY_PACKS.map(pack => `
      <div class="hd-pack-card">
        <div>
          <h5>${pack.title}</h5>
          <p>文件大小: ${pack.size} · 包含: ${pack.count} · 格式: ${pack.format}</p>
        </div>
        <button class="hd-download-icon-btn" onclick="alert('已加入下载任务序列！高速节点正在为您打包打包数据包：${pack.title}')">
          下载素材
        </button>
      </div>
    `).join('');

    modal.classList.remove('hidden');
  }

  function closeHdModal() {
    document.getElementById('hd-modal')?.classList.add('hidden');
  }

  // ==========================================
  // 8. 公司与展厅联系方式
  // ==========================================
  function openContactModal() {
    const modal = document.getElementById('contact-modal');
    const container = document.getElementById('contact-info-content');
    if (!modal || !container) return;

    container.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:12px;font-size:12.5px;color:#334155;margin:14px 0;">
        <div>
          <strong style="color:#0f172a;">🏢 品牌主体：</strong><br>
          ${COMPANY_INFO.name}
        </div>
        <div>
          <strong style="color:#0f172a;">📞 现货招商热线：</strong><br>
          <a href="tel:${COMPANY_INFO.hotline}" style="color:#ff5500;font-weight:700;">${COMPANY_INFO.hotline}</a> / ${COMPANY_INFO.mobile}
        </div>
        <div>
          <strong style="color:#0f172a;">💬 官方直营微信：</strong><br>
          <span style="background:#f1f5f9;padding:2px 8px;border-radius:4px;font-family:monospace;font-weight:700;">${COMPANY_INFO.wechat}</span>
        </div>
        <div>
          <strong style="color:#0f172a;">🏭 广州智造制衣总厂：</strong><br>
          ${COMPANY_INFO.factoryAddr}
        </div>
        <div>
          <strong style="color:#0f172a;">🏪 华东档口订货展厅：</strong><br>
          ${COMPANY_INFO.showroomAddr}
        </div>
        <div>
          <strong style="color:#0f172a;">⏰ 营业时间：</strong><br>
          ${COMPANY_INFO.businessHours}
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  function closeContactModal() {
    document.getElementById('contact-modal')?.classList.add('hidden');
  }

  // ==========================================
  // 9. 客服即时咨询抽屉
  // ==========================================
  function openChatModal() {
    document.getElementById('chat-modal')?.classList.remove('hidden');
  }

  function closeChatModal() {
    document.getElementById('chat-modal')?.classList.add('hidden');
  }

  function sendChatMessage(text) {
    const msgsContainer = document.getElementById('chat-messages');
    if (!msgsContainer || !text) return;

    // 渲染用户消息
    const userMsg = document.createElement('div');
    userMsg.className = 'message msg-user';
    userMsg.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
    msgsContainer.appendChild(userMsg);
    msgsContainer.scrollTop = msgsContainer.scrollHeight;

    // 模拟客服机器人即时回复
    setTimeout(() => {
      const replies = [
        `收到您的咨询！关于“${text}”，我们所有现货均支持一件看样试单，全国顺丰直达！`,
        `您好！2026全色系现货目前拥有30万件仓储，您可以随时点击右侧【高清图】下载原图或联系厂长微信 ${COMPANY_INFO.wechat} 索取实体实物色卡包！`,
        `好的！如果是大宗批量订购（1000件以上），我们有专门的一级供应链合作协议与返利支持，稍后客户经理将为您出具详细报价单！`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const agentMsg = document.createElement('div');
      agentMsg.className = 'message msg-agent';
      agentMsg.innerHTML = `<div class="msg-bubble">${randomReply}</div>`;
      msgsContainer.appendChild(agentMsg);
      msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }, 600);
  }

  // ==========================================
  // 10. 绑定全量全局交互事件
  // ==========================================
  function bindAllEvents() {
    // 桌面端视图切换 (仿真模式 / 宽屏模式)
    const viewportWrapper = document.getElementById('viewport-wrapper');
    const btnMobile = document.getElementById('btn-mode-mobile');
    const btnDesktop = document.getElementById('btn-mode-desktop');

    btnMobile?.addEventListener('click', () => {
      btnMobile.classList.add('active');
      btnDesktop.classList.remove('active');
      viewportWrapper.classList.remove('expanded-mode');
    });

    btnDesktop?.addEventListener('click', () => {
      btnDesktop.classList.add('active');
      btnMobile.classList.remove('active');
      viewportWrapper.classList.add('expanded-mode');
    });

    // 顶部快捷认证按钮
    document.getElementById('global-auth-toggle-btn')?.addEventListener('click', () => {
      if (state.isLoggedIn) {
        setAuthState(false);
        showToast('已切换为游客模式');
      } else {
        openAuthModal();
      }
    });

    // 搜索输入过滤
    const searchInput = document.getElementById('main-search-input');
    const clearBtn = document.getElementById('clear-search-btn');

    searchInput?.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      state.searchKeyword = val;
      clearBtn?.classList.toggle('hidden', val.length === 0);
      filterProducts(val);
    });

    clearBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      clearBtn.classList.add('hidden');
      filterProducts('');
    });

    // 浮动快捷操作栏
    document.getElementById('fab-hd')?.addEventListener('click', openHdModal);
    document.getElementById('fab-contact')?.addEventListener('click', openContactModal);
    document.getElementById('fab-service')?.addEventListener('click', openChatModal);
    document.getElementById('fab-cart')?.addEventListener('click', openCartDrawer);

    // 底部 5 个 Tab 切换
    document.getElementById('tab-home')?.addEventListener('click', (e) => {
      setActiveTab(e.currentTarget);
      document.getElementById('scrollable-content')?.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.getElementById('tab-category')?.addEventListener('click', (e) => {
      setActiveTab(e.currentTarget);
      document.getElementById('category-grid-16')?.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('tab-design')?.addEventListener('click', (e) => {
      setActiveTab(e.currentTarget);
      customizer.open();
    });

    document.getElementById('tab-cart')?.addEventListener('click', (e) => {
      setActiveTab(e.currentTarget);
      openCartDrawer();
    });

    document.getElementById('tab-profile')?.addEventListener('click', (e) => {
      setActiveTab(e.currentTarget);
      if (!state.isLoggedIn) {
        openAuthModal();
      } else {
        openContactModal();
      }
    });

    // 模态框关闭事件
    document.getElementById('close-detail-drawer')?.addEventListener('click', closeProductDetail);
    document.getElementById('close-auth-modal')?.addEventListener('click', closeAuthModal);
    document.getElementById('close-hd-modal')?.addEventListener('click', closeHdModal);
    document.getElementById('close-contact-modal')?.addEventListener('click', closeContactModal);
    document.getElementById('close-chat-drawer')?.addEventListener('click', closeChatModal);
    document.getElementById('close-cart-drawer')?.addEventListener('click', closeCartDrawer);

    // 登录表单提交
    document.getElementById('quick-auth-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneInput = document.getElementById('auth-phone');
      const phone = phoneInput ? phoneInput.value : '13800138000';
      setAuthState(true, phone);
      closeAuthModal();
      showToast('🎉 批发商资格已认证通过！现已为您全量解锁一手出厂底价！');
    });

    document.getElementById('guest-preview-btn')?.addEventListener('click', () => {
      closeAuthModal();
    });

    // 复制微信
    document.getElementById('copy-wechat-btn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(COMPANY_INFO.wechat).then(() => {
        showToast('微信已复制成功！打开微信即可添加厂长微信');
      }).catch(() => {
        showToast(`厂长微信：${COMPANY_INFO.wechat}`);
      });
    });

    // 发送聊天消息
    const chatInput = document.getElementById('chat-user-input');
    const sendBtn = document.getElementById('send-chat-btn');
    const triggerSend = () => {
      if (chatInput && chatInput.value.trim()) {
        sendChatMessage(chatInput.value.trim());
        chatInput.value = '';
      }
    };
    sendBtn?.addEventListener('click', triggerSend);
    chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') triggerSend();
    });

    // 快捷提问词点击
    document.querySelectorAll('.quick-q-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const text = e.currentTarget.dataset.msg;
        sendChatMessage(text);
      });
    });

    // 清空购物车
    document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
      if (confirm('确定要清空当前的采购清单吗？')) {
        state.cart = [];
        updateCartBadge();
        openCartDrawer();
      }
    });

    // 导出订货单
    document.getElementById('checkout-cart-btn')?.addEventListener('click', () => {
      if (state.cart.length === 0) {
        alert('当前采购车暂无货品！');
        return;
      }
      alert('已为您生成采购合同意向单 PDF！\n专属客户经理正在调配仓库货品，并将于 10 分钟内主动与您电话确认物流与对公转账事宜。');
      closeCartDrawer();
    });

    // 高清图全部下载
    document.getElementById('download-all-packs-btn')?.addEventListener('click', () => {
      alert('正在启动多线程高速下载通道：7.4 GB 完整模特图与PSD设计素材包已加入下载列表！');
      closeHdModal();
    });
  }

  function setActiveTab(clickedTab) {
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    clickedTab?.classList.add('active');
  }

  function filterProducts(keyword) {
    const allCards = document.querySelectorAll('.product-card');
    allCards.forEach(card => {
      const title = card.getAttribute('title') || '';
      const match = title.toLowerCase().includes(keyword);
      card.style.display = match ? 'flex' : 'none';
    });
  }

  function showToast(msg) {
    const existing = document.getElementById('app-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.style.cssText = `
      position: fixed;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(15, 23, 42, 0.92);
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      z-index: 9999;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      backdrop-filter: blur(6px);
      animation: popIn 0.2s ease;
      white-space: nowrap;
      border: 1px solid rgba(255,255,255,0.15);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // ==========================================
  // 执行初始化
  // ==========================================
  renderCategoryGrid();
  renderProductStreams();
  initHeroBanner();
  bindAllEvents();
});
