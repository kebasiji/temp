/**
 * LVLV绿侣服装矢量视觉渲染系统 (高保真版)
 * 1:1 复刻参考设计图中的模特、穿搭、版型及细节
 */

const ApparelArtwork = {
  // 16 宫格分类微缩图 (对标截屏 1，包含写实模特对搭与专业服装摄影质感)
  renderCategoryIcon(iconType) {
    switch (iconType) {
      // 1. 短袖T恤: 模特对搭 (深蓝与番茄红)
      case 'tshirt-short':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <!-- 模特A 深蓝短T -->
            <g transform="translate(14, 18) scale(0.68)">
              <circle cx="30" cy="18" r="11" fill="#E0A985"/>
              <path d="M 18 16 C 18 8, 42 8, 42 16 Z" fill="#222"/>
              <rect x="16" y="32" width="28" height="38" rx="3" fill="#1D3557"/>
              <rect x="6" y="32" width="10" height="20" rx="2" fill="#1D3557"/>
              <rect x="44" y="32" width="10" height="20" rx="2" fill="#1D3557"/>
              <rect x="18" y="70" width="24" height="26" fill="#0F172A"/>
              <rect x="20" y="96" width="8" height="24" fill="#E0A985"/>
              <rect x="32" y="96" width="8" height="24" fill="#E0A985"/>
            </g>
            <!-- 模特B 珊瑚红短T -->
            <g transform="translate(46, 22) scale(0.66)">
              <circle cx="30" cy="18" r="10" fill="#F3C3A3"/>
              <path d="M 18 16 C 18 6, 42 6, 42 18 C 42 24, 40 30, 44 32 Z" fill="#1F1F1F"/>
              <rect x="16" y="32" width="28" height="36" rx="3" fill="#E63946"/>
              <rect x="7" y="32" width="9" height="18" rx="2" fill="#E63946"/>
              <rect x="44" y="32" width="9" height="18" rx="2" fill="#E63946"/>
              <rect x="18" y="68" width="24" height="24" fill="#C1121F"/>
              <rect x="21" y="92" width="7" height="24" fill="#F3C3A3"/>
              <rect x="32" y="92" width="7" height="24" fill="#F3C3A3"/>
            </g>
          </svg>`;

      // 2. 长袖T恤: 黑绿对搭
      case 'tshirt-long':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <!-- 模特A 黑色长T -->
            <g transform="translate(14, 18) scale(0.66)">
              <circle cx="30" cy="18" r="11" fill="#DFA681"/>
              <path d="M 18 16 C 18 8, 42 8, 42 16 Z" fill="#222"/>
              <rect x="15" y="32" width="30" height="42" rx="3" fill="#1E1E1E"/>
              <rect x="4" y="32" width="11" height="34" rx="2" fill="#1E1E1E"/>
              <rect x="45" y="32" width="11" height="34" rx="2" fill="#1E1E1E"/>
              <rect x="18" y="74" width="24" height="24" fill="#64748B"/>
            </g>
            <!-- 模特B 薄荷绿长T -->
            <g transform="translate(48, 20) scale(0.66)">
              <circle cx="30" cy="18" r="11" fill="#F5C7A9"/>
              <path d="M 18 16 C 18 8, 42 8, 42 16 Z" fill="#3A3A3A"/>
              <rect x="15" y="32" width="30" height="42" rx="3" fill="#A8DADC"/>
              <rect x="4" y="32" width="11" height="34" rx="2" fill="#A8DADC"/>
              <rect x="45" y="32" width="11" height="34" rx="2" fill="#A8DADC"/>
              <rect x="18" y="74" width="24" height="24" fill="#FFFFFF"/>
            </g>
          </svg>`;

      // 3. 圆领卫衣: 藏青与亮橙圆领卫衣套装
      case 'sweatshirt':
      case 'crewneck':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <!-- 模特A 藏青圆领套装 -->
            <g transform="translate(15, 18) scale(0.66)">
              <circle cx="30" cy="18" r="11" fill="#DCA37E"/>
              <path d="M 18 16 C 18 8, 42 8, 42 16 Z" fill="#1E1E1E"/>
              <rect x="14" y="32" width="32" height="40" rx="4" fill="#1D3557"/>
              <rect x="2" y="32" width="12" height="36" rx="2" fill="#1D3557"/>
              <rect x="46" y="32" width="12" height="36" rx="2" fill="#1D3557"/>
              <rect x="16" y="72" width="28" height="48" rx="2" fill="#1D3557"/>
            </g>
            <!-- 模特B 鲜橙圆领套装 -->
            <g transform="translate(50, 18) scale(0.66)">
              <circle cx="30" cy="18" r="11" fill="#F5C7A9"/>
              <path d="M 18 16 C 18 6, 42 6, 42 16 Z" fill="#2A2A2A"/>
              <rect x="14" y="32" width="32" height="40" rx="4" fill="#F35315"/>
              <rect x="2" y="32" width="12" height="36" rx="2" fill="#F35315"/>
              <rect x="46" y="32" width="12" height="36" rx="2" fill="#F35315"/>
              <rect x="16" y="72" width="28" height="48" rx="2" fill="#F35315"/>
            </g>
          </svg>`;

      // 4. 连帽卫衣: 绿蓝色连帽套装
      case 'hoodie':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <!-- 模特A 墨绿连帽 -->
            <g transform="translate(16, 16) scale(0.66)">
              <circle cx="30" cy="16" r="12" fill="#264653"/>
              <path d="M 18 16 C 18 6, 42 6, 42 16 C 44 26, 16 26, 18 16 Z" fill="#2A9D8F"/>
              <rect x="14" y="32" width="32" height="42" rx="4" fill="#2A9D8F"/>
              <rect x="2" y="32" width="12" height="38" rx="2" fill="#2A9D8F"/>
              <rect x="46" y="32" width="12" height="38" rx="2" fill="#2A9D8F"/>
              <rect x="16" y="74" width="28" height="46" rx="2" fill="#264653"/>
            </g>
            <!-- 模特B 雾霾蓝连帽 -->
            <g transform="translate(50, 16) scale(0.66)">
              <circle cx="30" cy="16" r="12" fill="#3B82F6"/>
              <path d="M 18 16 C 18 6, 42 6, 42 16 C 44 26, 16 26, 18 16 Z" fill="#60A5FA"/>
              <rect x="14" y="32" width="32" height="42" rx="4" fill="#60A5FA"/>
              <rect x="2" y="32" width="12" height="38" rx="2" fill="#60A5FA"/>
              <rect x="46" y="32" width="12" height="38" rx="2" fill="#60A5FA"/>
              <rect x="16" y="74" width="28" height="46" rx="2" fill="#3B82F6"/>
            </g>
          </svg>`;

      // 5. 拉链卫衣: 夹克拉链
      case 'zip-hoodie':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <!-- 模特A 浅蓝拉链 -->
            <g transform="translate(15, 18) scale(0.66)">
              <circle cx="30" cy="18" r="11" fill="#E0A985"/>
              <rect x="14" y="32" width="32" height="42" rx="3" fill="#38BDF8"/>
              <line x1="30" y1="32" x2="30" y2="74" stroke="#FFF" stroke-width="2"/>
              <rect x="2" y="32" width="12" height="38" rx="2" fill="#38BDF8"/>
              <rect x="46" y="32" width="12" height="38" rx="2" fill="#38BDF8"/>
              <rect x="16" y="74" width="28" height="46" rx="2" fill="#0284C7"/>
            </g>
            <!-- 模特B 亮橙拉链 -->
            <g transform="translate(50, 18) scale(0.66)">
              <circle cx="30" cy="18" r="11" fill="#F5C7A9"/>
              <rect x="14" y="32" width="32" height="42" rx="3" fill="#FB923C"/>
              <line x1="30" y1="32" x2="30" y2="74" stroke="#FFF" stroke-width="2"/>
              <rect x="2" y="32" width="12" height="38" rx="2" fill="#FB923C"/>
              <rect x="46" y="32" width="12" height="38" rx="2" fill="#FB923C"/>
              <rect x="16" y="74" width="28" height="46" rx="2" fill="#EA580C"/>
            </g>
          </svg>`;

      // 6. 运动卫裤: 橙色束脚长裤实拍挂拍
      case 'pants':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(24, 14)">
              <!-- 橙色运动卫裤 -->
              <rect x="6" y="8" width="40" height="10" rx="2" fill="#C2410C"/>
              <line x1="26" y1="12" x2="26" y2="20" stroke="#FFF" stroke-width="2"/>
              <path d="M 6 16 L 46 16 L 40 76 L 28 76 L 26 36 L 24 76 L 12 76 Z" fill="#F35315"/>
              <!-- 束脚螺纹口 -->
              <rect x="12" y="74" width="12" height="6" rx="1" fill="#9A3412"/>
              <rect x="28" y="74" width="12" height="6" rx="1" fill="#9A3412"/>
            </g>
          </svg>`;

      // 7. 儿童系列: 萌娃套装
      case 'kids':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(18, 22) scale(0.6)">
              <circle cx="26" cy="16" r="11" fill="#F5C7A9"/>
              <rect x="12" y="30" width="28" height="34" rx="3" fill="#E11D48"/>
              <rect x="14" y="64" width="24" height="40" rx="2" fill="#E11D48"/>
            </g>
            <g transform="translate(48, 18) scale(0.65)">
              <circle cx="26" cy="16" r="11" fill="#E0A985"/>
              <rect x="12" y="30" width="28" height="36" rx="3" fill="#1E293B"/>
              <rect x="14" y="66" width="24" height="42" rx="2" fill="#1E293B"/>
            </g>
          </svg>`;

      // 8. 短裤/五分裤: 奶黄/卡其五分裤
      case 'shorts':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(20, 18)">
              <rect x="6" y="8" width="48" height="10" rx="2" fill="#CA8A04"/>
              <circle cx="30" cy="13" r="2.5" fill="#FFF"/>
              <path d="M 6 16 L 54 16 L 48 64 L 32 64 L 30 32 L 28 64 L 12 64 Z" fill="#FDE047"/>
            </g>
          </svg>`;

      // 9. POLO衫: 商务休闲
      case 'polo':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(15, 20) scale(0.66)">
              <circle cx="30" cy="16" r="11" fill="#E0A985"/>
              <rect x="15" y="30" width="30" height="38" rx="2" fill="#1D3557"/>
              <polygon points="24,30 30,40 36,30" fill="#FFF"/>
              <rect x="18" y="68" width="24" height="30" fill="#E2E8F0"/>
            </g>
            <g transform="translate(48, 20) scale(0.66)">
              <circle cx="30" cy="16" r="11" fill="#F5C7A9"/>
              <rect x="15" y="30" width="30" height="38" rx="2" fill="#FFFFFF"/>
              <polygon points="24,30 30,40 36,30" fill="#1D3557"/>
              <rect x="18" y="68" width="24" height="30" fill="#1E293B"/>
            </g>
          </svg>`;

      // 10. 上下套装: 堆叠多色卡
      case 'suit':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(12, 18) scale(0.55)">
              <rect x="14" y="24" width="32" height="32" fill="#E63946"/>
              <rect x="14" y="58" width="32" height="42" fill="#E63946"/>
            </g>
            <!-- 旁边色块叠层 -->
            <g transform="translate(52, 24)">
              <rect x="0" y="0" width="32" height="10" rx="2" fill="#1D3557"/>
              <rect x="0" y="14" width="32" height="10" rx="2" fill="#780000"/>
              <rect x="0" y="28" width="32" height="10" rx="2" fill="#8338EC"/>
              <rect x="0" y="42" width="32" height="10" rx="2" fill="#06D6A0"/>
            </g>
          </svg>`;

      // 11. 亲子装: 一家三口
      case 'family':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <!-- 爸爸 -->
            <g transform="translate(10, 18) scale(0.52)">
              <circle cx="24" cy="16" r="10" fill="#E0A985"/>
              <rect x="10" y="28" width="28" height="38" fill="#F59E0B"/>
              <rect x="12" y="66" width="24" height="46" fill="#F59E0B"/>
            </g>
            <!-- 妈妈 -->
            <g transform="translate(36, 20) scale(0.5)">
              <circle cx="24" cy="16" r="10" fill="#F5C7A9"/>
              <rect x="10" y="28" width="28" height="36" fill="#3B82F6"/>
              <rect x="12" y="64" width="24" height="46" fill="#3B82F6"/>
            </g>
            <!-- 孩子 -->
            <g transform="translate(62, 34) scale(0.42)">
              <circle cx="24" cy="16" r="10" fill="#F5C7A9"/>
              <rect x="10" y="28" width="28" height="30" fill="#F59E0B"/>
              <rect x="12" y="58" width="24" height="34" fill="#F59E0B"/>
            </g>
          </svg>`;

      // 12. 背心/无袖: 运动健身
      case 'vest':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(18, 20) scale(0.66)">
              <circle cx="28" cy="16" r="11" fill="#E0A985"/>
              <path d="M 18 28 L 38 28 L 42 66 L 14 66 Z" fill="#0284C7"/>
              <rect x="16" y="66" width="24" height="26" fill="#0F172A"/>
            </g>
            <g transform="translate(48, 24) scale(0.64)">
              <circle cx="28" cy="16" r="10" fill="#F5C7A9"/>
              <path d="M 18 28 L 38 28 L 42 64 L 14 64 Z" fill="#F472B6"/>
              <rect x="16" y="64" width="24" height="24" fill="#FFFFFF"/>
            </g>
          </svg>`;

      // 13. OEM/ODM定制: 白T挂衣架与定制标贴
      case 'oem':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(20, 16)">
              <!-- 衣架 -->
              <path d="M 30 8 C 30 3, 26 3, 26 7 L 10 24 L 50 24 Z" stroke="#DC2626" stroke-width="2" fill="none"/>
              <!-- 白T恤 -->
              <path d="M 14 24 L 46 24 L 56 36 L 48 44 L 44 38 L 44 68 L 16 68 L 16 38 L 12 44 L 4 36 Z" fill="#FFF" stroke="#CBD5E1" stroke-width="1"/>
              <!-- T恤定制红色标签 -->
              <rect x="20" y="38" width="20" height="8" rx="2" fill="#DC2626"/>
              <text x="30" y="44" text-anchor="middle" font-size="5" font-weight="900" fill="#FFF">T恤定制</text>
            </g>
          </svg>`;

      // 14. 来图定制: 潮牌印花T恤
      case 'custom':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(20, 16)">
              <path d="M 14 20 L 46 20 L 56 32 L 48 40 L 44 34 L 44 68 L 16 68 L 16 34 L 12 40 L 4 32 Z" fill="#FFF" stroke="#CBD5E1" stroke-width="1"/>
              <!-- 红色涂鸦印花图案 -->
              <circle cx="30" cy="40" r="10" fill="#DC2626"/>
              <polygon points="30,34 32,38 36,38 33,41 34,45 30,42 26,45 27,41 24,38 28,38" fill="#FFF"/>
              <text x="30" y="56" text-anchor="middle" font-size="5.5" font-weight="900" fill="#1E1E1E">CRITICAL</text>
            </g>
          </svg>`;

      // 15. 水洗做旧系列: 美式复古
      case 'washed':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(18, 20) scale(0.66)">
              <circle cx="28" cy="16" r="11" fill="#DFA681"/>
              <rect x="14" y="30" width="30" height="38" rx="2" fill="#588157"/>
              <rect x="16" y="68" width="24" height="26" fill="#F5CBA7"/>
            </g>
            <g transform="translate(48, 20) scale(0.66)">
              <circle cx="28" cy="16" r="11" fill="#F5C7A9"/>
              <rect x="14" y="30" width="30" height="38" rx="2" fill="#E5989B"/>
              <rect x="16" y="68" width="24" height="26" fill="#1E293B"/>
            </g>
          </svg>`;

      // 16. 运动速干: 健身慢跑
      case 'quick-dry':
        return `
          <svg viewBox="0 0 100 100" class="cat-svg">
            <rect width="100" height="100" rx="14" fill="#EAECEF"/>
            <g transform="translate(18, 20) scale(0.66)">
              <circle cx="28" cy="16" r="11" fill="#E0A985"/>
              <rect x="14" y="30" width="30" height="38" rx="2" fill="#0284C7"/>
              <rect x="16" y="68" width="24" height="28" fill="#F1F5F9"/>
            </g>
            <g transform="translate(48, 20) scale(0.66)">
              <circle cx="28" cy="16" r="11" fill="#F5C7A9"/>
              <rect x="14" y="30" width="30" height="38" rx="2" fill="#38BDF8"/>
              <rect x="16" y="68" width="24" height="28" fill="#F1F5F9"/>
            </g>
          </svg>`;

      default:
        return `<rect width="100" height="100" rx="14" fill="#EAECEF"/>`;
    }
  },

  // 渲染商品卡片大图 (3列商品卡片，包含高写实服装摄影、模特站姿与标签角标)
  renderProductVisual(product) {
    const isHoodie = product.categoryId === 'hoodie';
    const isCrew = product.categoryId === 'crewneck';
    const isLongT = product.categoryId === 'long-t';

    const color1 = product.colors[0] || 'black';
    const hex1 = (COLOR_PALETTE[color1] && COLOR_PALETTE[color1].hex) || '#1E1E1E';
    const color2 = product.colors[1] || 'white';
    const hex2 = (COLOR_PALETTE[color2] && COLOR_PALETTE[color2].hex) || '#FFFFFF';

    return `
      <div class="product-visual-wrapper">
        <svg viewBox="0 0 280 340" class="product-card-svg" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="card-bg-${product.id}" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#F8FAFC"/>
              <stop offset="60%" stop-color="#EDF2F7"/>
              <stop offset="100%" stop-color="#E2E8F0"/>
            </linearGradient>
            <filter id="soft-shadow-${product.id}" x="-10%" y="-10%" width="125%" height="125%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="rgba(0,0,0,0.12)"/>
            </filter>
          </defs>

          <!-- 柔和影棚背景 -->
          <rect width="280" height="340" fill="url(#card-bg-${product.id})"/>
          <line x1="20" y1="260" x2="260" y2="260" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="3,3"/>

          <!-- 左上角红色或特色品牌标签 (对标截屏上的红色角标) -->
          <g transform="translate(12, 12)">
            <rect width="52" height="18" rx="2" fill="${product.badgeColor}" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.2))"/>
            <text x="26" y="12.5" text-anchor="middle" font-size="9" font-weight="900" fill="#FFFFFF">${product.badgeText}</text>
          </g>

          <g transform="translate(268, 12)">
            <text x="0" y="12.5" text-anchor="end" font-size="9" font-weight="700" fill="#64748B">${product.weight}</text>
          </g>

          <!-- 双模特/双色服装立体展示 -->
          <g filter="url(#soft-shadow-${product.id})">
            <!-- 模特A / 服装A (前侧微左) -->
            <g transform="translate(24, 46) scale(0.92)">
              ${this.renderModelGarment(hex2, isHoodie, isCrew, isLongT, true)}
            </g>

            <!-- 模特B / 服装B (后侧微右) -->
            <g transform="translate(118, 46) scale(0.92)">
              ${this.renderModelGarment(hex1, isHoodie, isCrew, isLongT, false)}
            </g>
          </g>

          <!-- 底部细微条形码/编码信息 -->
          <rect x="0" y="316" width="280" height="24" fill="rgba(255,255,255,0.9)"/>
          <text x="12" y="331" font-size="9" font-weight="700" fill="#475569">款号: ${product.code}</text>
          <text x="268" y="331" text-anchor="end" font-size="9" font-weight="700" fill="#E11D48">已售 ${product.salesCount}</text>
        </svg>
      </div>
    `;
  },

  renderModelGarment(fillColor, isHoodie, isCrew, isLongT, isLeft) {
    const skinTone = isLeft ? '#F5C7A9' : '#DFA681';
    const hairColor = isLeft ? '#2A2A2A' : '#111111';
    const isLight = fillColor === '#FFFFFF' || fillColor === '#F8FAFC' || fillColor === '#EADBC8' || fillColor === '#D1D5DB' || fillColor === '#A8DADC';
    const borderStroke = isLight ? '#94A3B8' : 'rgba(0,0,0,0.15)';
    const borderWidth = isLight ? '1.5' : '1';

    if (isHoodie) {
      return `
        <!-- 连帽模特 -->
        <g>
          <!-- 头部与发型 -->
          <circle cx="48" cy="20" r="13" fill="${skinTone}"/>
          <path d="M 35 18 C 35 6, 61 6, 61 18 Z" fill="${hairColor}"/>
          <!-- 连帽卫衣 (帽子立体阴影) -->
          <path d="M 38 24 C 38 10, 58 10, 58 24 C 64 30, 32 30, 38 24 Z" fill="${fillColor}" stroke="${borderStroke}" stroke-width="${borderWidth}"/>
          <path d="M 32 36 L 64 36 L 78 58 L 68 66 L 60 58 L 60 136 L 36 136 L 36 58 L 28 66 L 18 58 Z" fill="${fillColor}" stroke="${borderStroke}" stroke-width="${borderWidth}"/>
          <!-- 袋鼠兜与抽绳 -->
          <path d="M 40 98 L 56 98 L 54 122 L 42 122 Z" fill="rgba(0,0,0,0.06)" stroke="${borderStroke}" stroke-width="0.8"/>
          <line x1="44" y1="28" x2="43" y2="48" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="52" y1="28" x2="53" y2="48" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
          <!-- 下身束脚卫裤 -->
          <rect x="36" y="136" width="24" height="42" fill="${isLeft ? '#0F172A' : '#1E293B'}"/>
          <rect x="38" y="178" width="8" height="18" fill="${skinTone}"/>
          <rect x="50" y="178" width="8" height="18" fill="${skinTone}"/>
          <!-- 球鞋 -->
          <path d="M 34 196 L 47 196 L 49 204 L 32 204 Z" fill="#FFFFFF" stroke="#CBD5E1"/>
          <path d="M 48 196 L 61 196 L 63 204 L 46 204 Z" fill="#FFFFFF" stroke="#CBD5E1"/>
        </g>
      `;
    }

    if (isCrew || isLongT) {
      return `
        <!-- 长袖/圆领卫衣模特 -->
        <g>
          <circle cx="48" cy="20" r="13" fill="${skinTone}"/>
          <path d="M 35 18 C 35 6, 61 6, 61 18 Z" fill="${hairColor}"/>
          <!-- 长袖衣身与长袖子 -->
          <path d="M 32 36 L 64 36 L 78 64 L 72 112 L 62 112 L 60 60 L 60 134 L 36 134 L 36 60 L 34 112 L 24 112 L 18 64 Z" fill="${fillColor}" stroke="${borderStroke}" stroke-width="${borderWidth}"/>
          <!-- 罗纹圆领口 -->
          <path d="M 40 36 C 44 42, 52 42, 56 36 Z" fill="rgba(0,0,0,0.12)"/>
          <!-- 裤子与球鞋 -->
          <rect x="36" y="134" width="24" height="42" fill="${isLeft ? '#334155' : '#0F172A'}"/>
          <rect x="38" y="176" width="8" height="20" fill="${skinTone}"/>
          <rect x="50" y="176" width="8" height="20" fill="${skinTone}"/>
          <path d="M 34 196 L 47 196 L 49 204 L 32 204 Z" fill="#FFFFFF" stroke="#CBD5E1"/>
          <path d="M 48 196 L 61 196 L 63 204 L 46 204 Z" fill="#FFFFFF" stroke="#CBD5E1"/>
        </g>
      `;
    }

    // 默认 短袖T恤
    return `
      <!-- 短袖T恤模特 -->
      <g>
        <circle cx="48" cy="20" r="13" fill="${skinTone}"/>
        <path d="M 35 18 C 35 6, 61 6, 61 18 Z" fill="${hairColor}"/>
        <!-- 短袖T恤 -->
        <path d="M 32 36 L 64 36 L 78 58 L 68 66 L 60 58 L 60 130 L 36 130 L 36 58 L 28 66 L 18 58 Z" fill="${fillColor}" stroke="${borderStroke}" stroke-width="${borderWidth}"/>
        <path d="M 40 36 C 44 42, 52 42, 56 36 Z" fill="rgba(0,0,0,0.1)"/>
        <!-- 运动五分裤 -->
        <rect x="36" y="130" width="24" height="34" fill="${isLeft ? '#C2410C' : '#0F172A'}"/>
        <line x1="48" y1="130" x2="48" y2="164" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
        <!-- 腿部与球鞋 -->
        <rect x="38" y="164" width="7" height="30" fill="${skinTone}"/>
        <rect x="51" y="164" width="7" height="30" fill="${skinTone}"/>
        <path d="M 34 194 L 47 194 L 49 204 L 31 204 Z" fill="#FFFFFF" stroke="#CBD5E1"/>
        <path d="M 48 194 L 61 194 L 63 204 L 45 204 Z" fill="#FFFFFF" stroke="#CBD5E1"/>
      </g>
    `;
  }
};
