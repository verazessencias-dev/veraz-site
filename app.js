// VERAZ Essências — lógica compartilhada (carrinho, modal, checkout, menu, Pix)
if(typeof PRODUCTS === 'undefined') var PRODUCTS = [];
if(typeof ESSENCIAS === 'undefined') var ESSENCIAS = [];

  function wppLink(text){
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }
  if(document.getElementById('navWpp')) document.getElementById('navWpp').href = wppLink("Oi! Vim pelo site da VERAZ e queria saber mais sobre as essências.");
  if(document.getElementById('drawerWpp')) document.getElementById('drawerWpp').href = wppLink("Oi! Vim pelo site da VERAZ e queria saber mais sobre as essências.");

  const drawerBackdrop = document.getElementById('drawerBackdrop');
  function openDrawer(){ drawerBackdrop.classList.add('open'); }
  function closeDrawer(){ drawerBackdrop.classList.remove('open'); }
  document.getElementById('navToggle').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', (e)=>{ if(e.target === drawerBackdrop) closeDrawer(); });
  document.querySelectorAll('.drawer-link').forEach(link=>{
    link.addEventListener('click', closeDrawer);
  });
  if(document.getElementById('contactWpp')) document.getElementById('contactWpp').href = wppLink("Oi! Vim pelo site da VERAZ e queria uma ajuda pra escolher a essência certa.");
  if(document.getElementById('floatWpp')) document.getElementById('floatWpp').href = wppLink("Oi! Vim pelo site da VERAZ e queria saber mais sobre as essências.");
  document.querySelectorAll('.fd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nome = btn.dataset.kit;
      const price = parseFloat(btn.dataset.price);
      const insp = btn.dataset.insp || 'Edição Dia dos Pais';
      const key = 'kit|' + nome;
      const existing = cart.find(i => i.key === key);
      if(existing){ existing.qty += 1; }
      else{ cart.push({ key, insp, nome, size: 'kit', sizeLabel: 'Kit', unitPrice: price, qty: 1 }); }
      updateCartBadge();
      openCart();
    });
  });

  function fmt(v){ return "R$ " + v.toFixed(2).replace('.', ','); }

  function renderProductGrid(list, gridMap, source){
    gridMap.forEach(([gridId, linha])=>{
      const targetGrid = document.getElementById(gridId);
      if(!targetGrid) return;
      targetGrid.innerHTML = "";
      list.forEach((p, idx) => {
        if(p.linha !== linha) return;
        const card = document.createElement('div');
        card.className = `card ${p.linha}`;
        card.dataset.idx = idx;
        card.dataset.source = source;
        const iconHtml = p.foto ? `
          <div class="card-photo-frame"><img class="card-photo" src="${p.foto}" alt="Frasco VERAZ ${p.nome}, inspirado em ${p.insp}"></div>
        ` : `
          <svg class="card-icon" viewBox="340 115 175 415"><g fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 410 470 C 405 430 402 400 408 375 C 412 358 420 350 450 350 C 480 350 488 358 492 375 C 498 400 495 430 490 470 C 493 495 493 515 450 518 C 407 515 407 495 410 470 Z"/>
        <path d="M 435 350 C 433 335 433 322 435 312 L 465 312 C 467 322 467 335 465 350"/>
        <path d="M 428 312 C 428 300 430 292 450 292 C 470 292 472 300 472 312"/>
        <line x1="428" y1="300" x2="472" y2="300"/>
        <path d="M 415 460 C 430 466 470 466 485 460" opacity="0.55"/>
        <path d="M 450 292 C 448 265 430 250 410 235 C 388 219 380 195 392 172 C 402 152 425 145 445 155 C 462 163 468 182 458 198 C 450 210 434 212 428 200 C 423 190 430 180 440 183 C 448 185 450 194 444 198"/>
        <path d="M 410 235 C 392 232 378 240 372 256 C 367 270 374 284 388 286 C 400 288 409 279 406 267 C 404 259 396 256 391 262"/>
        <path d="M 392 172 C 375 168 362 175 358 190 C 355 202 363 213 375 213 C 385 213 391 205 388 196"/>
        <path d="M 445 155 C 452 138 470 130 486 138 C 500 145 504 161 494 172 C 486 180 474 178 473 167"/>
        <path d="M 415 250 C 405 258 400 270 405 280"/>
        <path d="M 468 190 C 478 195 484 205 480 216"/>
      </g>
      <circle cx="440" cy="199" r="4" fill="currentColor"/>
      <circle cx="493" cy="155" r="3" fill="currentColor"/></svg>
        `;
        card.innerHTML = `
          <span class="spark" style="--dx:-24px"></span>
          <span class="spark" style="--dx:6px"></span>
          <span class="spark" style="--dx:28px"></span>
          ${p.categoria === 'nicho' ? '<div class="nicho-badge">NICHO</div>' : ''}
          ${iconHtml}
          <div class="insp"><span class="insp-label">Inspirado em</span><span class="insp-name">${p.insp}</span></div>
          <div class="veraz-name">${p.nome} <span class="ml-tag">60ml</span></div>
          <div class="blurb">${p.blurb}</div>
          ${p.precoOriginal ? '<div class="launch-badge">PREÇO DE LANÇAMENTO</div>' : ''}
          <div class="price-row">
            ${p.precoOriginal ? `<span class="price-old">${fmt(p.precoOriginal)}</span>` : ''}
            <span class="price-main">${fmt(p.preco)}</span>
            <span class="price-decant">tester 5ml ${fmt(p.decant)}</span>
          </div>
          <button class="buy-btn" data-idx="${idx}">Comprar</button>
        `;
        targetGrid.appendChild(card);
      });
    });
  }
  function renderCards(){
    renderProductGrid(PRODUCTS, [['gridFem','feminino'], ['gridMasc','masculino']], 'main');
    renderProductGrid(ESSENCIAS, [['gridEssFem','feminino'], ['gridEssMasc','masculino'], ['gridEssUnissex','unissex']], 'ess');
  }
  renderCards();

  function renderTesterList(){
    const container = document.getElementById('testerList');
    if(!container) return;
    container.innerHTML = "";
    const allItems = [
      ...PRODUCTS.map((p, idx) => ({p, idx, source:'main'})),
      ...ESSENCIAS.map((p, idx) => ({p, idx, source:'ess'})),
    ];
    allItems.forEach(({p, idx, source}) => {
      const row = document.createElement('div');
      row.className = 'tester-row';
      row.dataset.idx = idx;
      row.dataset.source = source;
      row.dataset.testermode = '1';
      const photoHtml = p.foto ? `
        <div class="tester-row-photo"><img src="${p.foto}" alt="Frasco VERAZ ${p.nome}"></div>
      ` : `
        <div class="tester-row-photo"><svg viewBox="340 115 175 415" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
          <path d="M 410 470 C 405 430 402 400 408 375 C 412 358 420 350 450 350 C 480 350 488 358 492 375 C 498 400 495 430 490 470 C 493 495 493 515 450 518 C 407 515 407 495 410 470 Z"/>
          <path d="M 435 350 C 433 335 433 322 435 312 L 465 312 C 467 322 467 335 465 350"/>
          <path d="M 428 312 C 428 300 430 292 450 292 C 470 292 472 300 472 312"/>
          <line x1="428" y1="300" x2="472" y2="300"/>
        </svg></div>
      `;
      row.innerHTML = `
        ${photoHtml}
        <div class="tester-row-info">
          <span class="tester-row-insp">Inspirado em ${p.insp}</span>
          <span class="tester-row-name">${p.nome}</span>
        </div>
        <div class="tester-row-price">
          ${p.decantOriginal ? `<span class="tester-row-old">${fmt(p.decantOriginal)}</span>` : ''}
          <span class="tester-row-main">${fmt(p.decant)}</span>
        </div>
        <button class="tester-row-btn">Comprar</button>
      `;
      container.appendChild(row);
    });
  }
  renderTesterList();

  // ---------- Abre automaticamente o produto vindo do Diagnóstico ----------
  (function(){
    const params = new URLSearchParams(window.location.search);
    const produtoNome = params.get('produto');
    const fonte = params.get('fonte');
    if(!produtoNome) return;
    const sourceList = fonte === 'ess' ? ESSENCIAS : PRODUCTS;
    const found = sourceList.find(p => p.insp === produtoNome);
    if(found){
      setTimeout(()=>{
        currentProduct = found;
        currentSize = 'frasco';
        currentQty = 1;
        openModal();
      }, 400);
    }
  })();

  // ---------- Popup promocional de lançamento (só na home, 1x por sessão) ----------
  (function(){
    const promoBackdrop = document.getElementById('promoBackdrop');
    if(!promoBackdrop) return;
    const alreadyShown = sessionStorage.getItem('verazPromoShown');
    function closePromo(){ promoBackdrop.classList.remove('open'); }
    function openPromo(){
      promoBackdrop.classList.add('open');
      sessionStorage.setItem('verazPromoShown', '1');
    }
    if(!alreadyShown){
      setTimeout(openPromo, 1800);
    }
    const closeBtn = document.getElementById('promoClose');
    const skipBtn = document.getElementById('promoSkip');
    const ctaBtn = document.getElementById('promoCta');
    if(closeBtn) closeBtn.addEventListener('click', closePromo);
    if(skipBtn) skipBtn.addEventListener('click', closePromo);
    if(ctaBtn) ctaBtn.addEventListener('click', closePromo);
    promoBackdrop.addEventListener('click', (e)=>{ if(e.target === promoBackdrop) closePromo(); });
  })();

  // ---------- Nossas Essências (abas) ----------
  function switchEssTab(tabName){
    document.querySelectorAll('.ess-tab').forEach(t => t.classList.toggle('active', t.dataset.esstab === tabName));
    document.querySelectorAll('.ess-panel').forEach(p => p.classList.toggle('active', p.dataset.esspanel === tabName));
  }
  document.querySelectorAll('.ess-tab').forEach(tab=>{
    tab.addEventListener('click', (e)=>{
      e.preventDefault();
      switchEssTab(tab.dataset.esstab);
    });
  });

  // ---------- Mais da VERAZ (abas) ----------
  function switchMvTab(tabName){
    document.querySelectorAll('.mv-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    document.querySelectorAll('.mv-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === tabName));
  }
  document.querySelectorAll('.mv-tab').forEach(tab=>{
    tab.addEventListener('click', (e)=>{
      e.preventDefault();
      switchMvTab(tab.dataset.tab);
    });
  });
  function handleMvHash(){
    const h = window.location.hash.replace('#','');
    if(['decants','clube'].includes(h)){
      switchMvTab(h);
      const mv = document.getElementById('moreVeraz');
      if(mv) mv.scrollIntoView({behavior:'smooth', block:'start'});
    }
  }
  window.addEventListener('hashchange', handleMvHash);
  if(window.location.hash) handleMvHash();

  const modalBackdrop = document.getElementById('modalBackdrop');
  const cartBackdrop = document.getElementById('cartBackdrop');
  let currentProduct = null;
  let currentSize = 'frasco';
  let currentQty = 1;

  document.addEventListener('click', (e)=>{
    const card = e.target.closest('.card, .tester-row');
    if(!card) return;
    const sourceList = card.dataset.source === 'ess' ? ESSENCIAS : PRODUCTS;
    currentProduct = sourceList[card.dataset.idx];
    currentSize = card.dataset.testermode === '1' ? 'decant' : 'frasco';
    currentQty = 1;
    openModal();
  });

  function itemUnitPrice(product, size){ return size === 'frasco' ? product.preco : product.decant; }

  function openModal(){
    document.getElementById('modalTitle').textContent = currentProduct.insp;
    document.getElementById('modalSub').textContent = currentProduct.nome;
    document.getElementById('modalBlurb').textContent = currentProduct.blurb;
    document.getElementById('modalNotes').innerHTML = `
      <div class="note-row"><span class="note-label">Topo</span><span>${currentProduct.notas.topo}</span></div>
      <div class="note-row"><span class="note-label">Coração</span><span>${currentProduct.notas.coracao}</span></div>
      <div class="note-row"><span class="note-label">Fundo</span><span>${currentProduct.notas.fundo}</span></div>
    `;
    const nichoBadge = document.getElementById('modalNichoBadge');
    nichoBadge.style.display = currentProduct.categoria === 'nicho' ? 'block' : 'none';
    const combinaBox = document.getElementById('modalCombina');
    if(currentProduct.combina){
      combinaBox.innerHTML = `<strong>Combina com</strong>${currentProduct.combina}`;
      combinaBox.style.display = 'block';
    }else{
      combinaBox.style.display = 'none';
    }
    document.querySelectorAll('.size-tab').forEach(t=>t.classList.toggle('active', t.dataset.size===currentSize));
    document.getElementById('qtyVal').textContent = currentQty;
    document.getElementById('addCartConfirm').classList.remove('show');
    updateItemSubtotal();
    modalBackdrop.classList.add('open');
    document.getElementById('floatWpp').style.display='none'; document.getElementById('floatIg').style.display='none';
  }
  document.getElementById('modalClose').addEventListener('click', ()=> { modalBackdrop.classList.remove('open'); document.getElementById('floatWpp').style.display='flex'; document.getElementById('floatIg').style.display='flex'; });
  modalBackdrop.addEventListener('click', (e)=>{ if(e.target === modalBackdrop){ modalBackdrop.classList.remove('open'); document.getElementById('floatWpp').style.display='flex'; document.getElementById('floatIg').style.display='flex'; } });

  document.querySelectorAll('.size-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      currentSize = tab.dataset.size;
      document.querySelectorAll('.size-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      updateItemSubtotal();
    });
  });
  document.getElementById('qtyMinus').addEventListener('click', ()=>{ if(currentQty>1) currentQty--; document.getElementById('qtyVal').textContent=currentQty; updateItemSubtotal(); });
  document.getElementById('qtyPlus').addEventListener('click', ()=>{ currentQty++; document.getElementById('qtyVal').textContent=currentQty; updateItemSubtotal(); });

  function updateItemSubtotal(){
    document.getElementById('itemSubtotal').textContent = fmt(itemUnitPrice(currentProduct, currentSize) * currentQty);
  }

  let cart = [];

  function addToCartFromModal(){
    const sizeLabel = currentSize === 'frasco' ? 'Frasco 60ml' : 'Tester 5ml';
    const unitPrice = itemUnitPrice(currentProduct, currentSize);
    const key = currentProduct.insp + '|' + currentSize;
    const existing = cart.find(i => i.key === key);
    if(existing){
      existing.qty += currentQty;
    }else{
      cart.push({ key, insp: currentProduct.insp, nome: currentProduct.nome, size: currentSize, sizeLabel, unitPrice, qty: currentQty });
    }
    updateCartBadge();
    document.getElementById('addCartConfirm').classList.add('show');
  }
  document.getElementById('addToCartBtn').addEventListener('click', addToCartFromModal);
  document.getElementById('goToCartLink').addEventListener('click', (e)=>{
    e.preventDefault();
    modalBackdrop.classList.remove('open');
    document.getElementById('floatWpp').style.display='flex'; document.getElementById('floatIg').style.display='flex';
    openCart();
  });

  const TESTER_PAIR_PRICE = 22.90;

  function cartItemCount(){ return cart.reduce((s,i)=>s+i.qty, 0); }

  function cartBreakdown(){
    const testerUnits = [];
    let frascoSubtotal = 0, frascoCount = 0;
    let kitSubtotal = 0, kitCount = 0;

    cart.forEach(item => {
      if(item.size === 'decant'){
        for(let i=0;i<item.qty;i++) testerUnits.push(item.unitPrice);
      }else if(item.size === 'kit'){
        kitSubtotal += item.unitPrice * item.qty;
        kitCount += item.qty;
      }else{
        frascoSubtotal += item.unitPrice * item.qty;
        frascoCount += item.qty;
      }
    });

    testerUnits.sort((a,b)=>a-b);
    const pairs = Math.floor(testerUnits.length/2);
    const hasOdd = testerUnits.length % 2 === 1;
    const oddPrice = hasOdd ? testerUnits[testerUnits.length-1] : 0;
    const testerRawSubtotal = testerUnits.reduce((s,p)=>s+p,0);
    const testerPairedTotal = (pairs * TESTER_PAIR_PRICE) + oddPrice;
    const testerSavings = testerRawSubtotal - testerPairedTotal;

    const discountEligibleSubtotal = frascoSubtotal + (hasOdd ? oddPrice : 0);
    const discountEligibleUnits = frascoCount + (hasOdd ? 1 : 0);
    const generalDiscountRate = cartItemCount() >= 2 ? 0.10 : 0;
    const generalDiscountValue = discountEligibleSubtotal * generalDiscountRate;

    const subtotal = frascoSubtotal + kitSubtotal + testerRawSubtotal;
    const totalDiscount = generalDiscountValue + testerSavings;
    const total = subtotal - totalDiscount;

    return { subtotal, testerSavings, generalDiscountValue, totalDiscount, total, pairs, hasOdd, testerCount: testerUnits.length };
  }

  function cartSubtotal(){ return cartBreakdown().subtotal; }
  function cartDiscountValue(){ return cartBreakdown().totalDiscount; }
  function cartTotal(){ return cartBreakdown().total + cartShippingPrice(); }

  function updateCartBadge(){
    const count = cartItemCount();
    const badge = document.getElementById('cartBadge');
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }
  updateCartBadge();

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', (e)=>{ if(e.target === cartBackdrop) closeCart(); });

  function openCart(){
    renderCart();
    showCartStep1();
    cartBackdrop.classList.add('open');
    document.getElementById('floatWpp').style.display='none'; document.getElementById('floatIg').style.display='none';
  }
  function closeCart(){
    cartBackdrop.classList.remove('open');
    document.getElementById('floatWpp').style.display='flex'; document.getElementById('floatIg').style.display='flex';
  }

  function showCartStep1(){
    document.getElementById('cartStep1').style.display = 'block';
    document.getElementById('cartStep2').style.display = 'none';
  }
  function showCartStep2(){
    document.getElementById('cartStep1').style.display = 'none';
    document.getElementById('cartStep2').style.display = 'block';
  }
  document.getElementById('cartGoCheckout').addEventListener('click', showCartStep2);
  document.getElementById('cartContinueShopping').addEventListener('click', closeCart);
  document.getElementById('cartBackStep1').addEventListener('click', showCartStep1);

  function renderCart(){
    const itemsBox = document.getElementById('cartItems');
    const emptyBox = document.getElementById('cartEmpty');
    const summaryBlock = document.getElementById('cartSummaryBlock');

    if(cart.length === 0){
      itemsBox.innerHTML = '';
      emptyBox.style.display = 'block';
      summaryBlock.style.display = 'none';
      return;
    }
    emptyBox.style.display = 'none';
    summaryBlock.style.display = 'block';

    itemsBox.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="ci-info">
          <div class="ci-name">${item.nome}</div>
          <div class="ci-size">${item.sizeLabel}</div>
        </div>
        <div class="ci-qty">
          <button data-act="minus" data-idx="${idx}">−</button>
          <span>${item.qty}</span>
          <button data-act="plus" data-idx="${idx}">+</button>
        </div>
        <div class="ci-price">${fmt(item.unitPrice * item.qty)}</div>
        <span class="ci-remove" data-act="remove" data-idx="${idx}">remover</span>
      </div>
    `).join('');

    document.getElementById('cartSubtotal').textContent = fmt(cartSubtotal());
    const bd = cartBreakdown();
    const discountRow = document.getElementById('cartDiscountRow');
    if(bd.totalDiscount > 0.001){
      discountRow.style.display = 'flex';
      let label = 'Desconto';
      if(bd.pairs > 0 && bd.generalDiscountValue > 0.001) label = `Desconto (${bd.pairs}x par de testers + 10% multi-produto)`;
      else if(bd.pairs > 0) label = `Desconto (${bd.pairs}x par de testers, R$22,90)`;
      else label = 'Desconto (2+ produtos, 10%)';
      discountRow.querySelector('span').textContent = label;
      document.getElementById('cartDiscountVal').textContent = '-' + fmt(bd.totalDiscount);
    }else{
      discountRow.style.display = 'none';
    }

    updateCartTotal();
  }

  document.getElementById('cartItems').addEventListener('click', (e)=>{
    const btn = e.target.closest('[data-act]');
    if(!btn) return;
    const idx = parseInt(btn.dataset.idx, 10);
    if(btn.dataset.act === 'plus') cart[idx].qty++;
    if(btn.dataset.act === 'minus'){ cart[idx].qty--; if(cart[idx].qty <= 0) cart.splice(idx,1); }
    if(btn.dataset.act === 'remove') cart.splice(idx,1);
    updateCartBadge();
    renderCart();
  });

  let cartShipMode = 'retirada';
  let cartShipPrice = 0;
  let cartShipNote = SHIPPING.retirada.note;
  let cartShipLabel = SHIPPING.retirada.label;

  document.querySelectorAll('#cartShipTabs .ship-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      cartShipMode = tab.dataset.ship;
      document.querySelectorAll('#cartShipTabs .ship-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('cepBlock').style.display = cartShipMode === 'correios' ? 'block' : 'none';
      document.getElementById('custEnderecoBlock').style.display = cartShipMode === 'retirada' ? 'none' : 'block';
      if(cartShipMode === 'retirada'){ cartShipPrice = 0; cartShipNote = SHIPPING.retirada.note; cartShipLabel = SHIPPING.retirada.label; }
      if(cartShipMode === 'correios'){ cartShipPrice = 0; cartShipNote = 'Informe o CEP e calcule o frete.'; cartShipLabel = 'Correios'; }
      updateCartTotal();
    });
  });

  const CORREIOS_REGIOES = {
    SP_CAPITAL: { price: 12.90, prazo: '1 a 3 dias úteis' },
    SP_INTERIOR:{ price: 18.90, prazo: '2 a 5 dias úteis' },
    SUDESTE:    { price: 24.90, prazo: '3 a 6 dias úteis' },
    SUL:        { price: 27.90, prazo: '4 a 7 dias úteis' },
    CENTRO_OESTE:{ price: 29.90, prazo: '5 a 8 dias úteis' },
    NORDESTE:   { price: 34.90, prazo: '6 a 10 dias úteis' },
    NORTE:      { price: 39.90, prazo: '7 a 14 dias úteis' },
  };
  const UF_TO_REGIAO = {
    SP:'SP_INTERIOR', RJ:'SUDESTE', MG:'SUDESTE', ES:'SUDESTE',
    PR:'SUL', SC:'SUL', RS:'SUL',
    DF:'CENTRO_OESTE', GO:'CENTRO_OESTE', MT:'CENTRO_OESTE', MS:'CENTRO_OESTE',
    BA:'NORDESTE', SE:'NORDESTE', AL:'NORDESTE', PE:'NORDESTE', PB:'NORDESTE', RN:'NORDESTE', CE:'NORDESTE', PI:'NORDESTE', MA:'NORDESTE',
    TO:'NORTE', PA:'NORTE', AP:'NORTE', AM:'NORTE', RR:'NORTE', RO:'NORTE', AC:'NORTE',
  };

  document.getElementById('cepCalcBtn').addEventListener('click', calcularFreteCEP);
  document.getElementById('cepInput').addEventListener('keydown', (e)=>{ if(e.key==='Enter') calcularFreteCEP(); });
  document.getElementById('cepInput').addEventListener('input', (e)=>{
    let v = e.target.value.replace(/\D/g,'').slice(0,8);
    if(v.length > 5) v = v.slice(0,5) + '-' + v.slice(5);
    e.target.value = v;
  });

  async function calcularFreteCEP(){
    const raw = document.getElementById('cepInput').value.replace(/\D/g,'');
    const resultBox = document.getElementById('cepResult');
    document.getElementById('cepInput').blur();
    if(raw.length !== 8){
      resultBox.innerHTML = '<span class="cep-error">CEP inválido. Digite os 8 números.</span>';
      resultBox.classList.add('show');
      resultBox.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    resultBox.innerHTML = 'Calculando frete real...';
    resultBox.classList.add('show');
    resultBox.scrollIntoView({behavior:'smooth', block:'center'});

    try{
      const res = await fetch(`/.netlify/functions/frete?cep=${raw}`);
      const data = await res.json();
      if(data.options && data.options.length > 0){
        renderShippingOptions(data.options, resultBox);
        return;
      }
    }catch(err){
      console.error('Melhor Envio (Netlify Function) indisponível, tentando alternativa:', err);
    }

    if(CONFIG.sheetsUrl){
      try{
        const res = await fetch(`${CONFIG.sheetsUrl}?action=frete&cep=${raw}`);
        const data = await res.json();
        if(data.status === 'ok'){
          cartShipPrice = data.preco;
          cartShipNote = `Prazo estimado: ${data.prazo}.`;
          cartShipLabel = `${data.transportadora} ${data.servico}`;
          resultBox.innerHTML = `📦 ${data.transportadora} ${data.servico} — <strong>${fmt(data.preco)}</strong> (${data.prazo})`;
          updateCartTotal();
          setTimeout(()=> document.getElementById('modalTotal').scrollIntoView({behavior:'smooth', block:'center'}), 150);
          return;
        }
      }catch(err){
        console.error('Apps Script indisponível, usando estimativa:', err);
      }
    }

    try{
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const data = await res.json();
      if(data.erro){
        resultBox.innerHTML = '<span class="cep-error">CEP não encontrado.</span>';
        return;
      }
      let regiao;
      if(data.uf === 'SP' && data.localidade === 'São Paulo') regiao = 'SP_CAPITAL';
      else regiao = UF_TO_REGIAO[data.uf] || 'NORDESTE';
      const info = CORREIOS_REGIOES[regiao];
      cartShipPrice = info.price;
      cartShipNote = `Prazo estimado: ${info.prazo}. (estimativa)`;
      cartShipLabel = `Correios — ${data.localidade}/${data.uf}`;
      resultBox.innerHTML = `📍 ${data.localidade}/${data.uf} — frete estimado: <strong>${fmt(info.price)}</strong> (${info.prazo})`;
      updateCartTotal();
      setTimeout(()=> document.getElementById('modalTotal').scrollIntoView({behavior:'smooth', block:'center'}), 150);
    }catch(err){
      resultBox.innerHTML = '<span class="cep-error">Não foi possível calcular agora. Tenta de novo em instantes.</span>';
      console.error('CEP error:', err);
    }
  }

  function renderShippingOptions(options, resultBox){
    resultBox.innerHTML = `
      <div class="ship-options-label">Escolha a modalidade de envio:</div>
      <div class="ship-options-list">
        ${options.map((o, i) => `
          <label class="ship-option">
            <input type="radio" name="shipOption" value="${i}" ${i===0 ? 'checked' : ''}>
            <span class="ship-option-name">${o.company} ${o.service}</span>
            <span class="ship-option-time">até ${o.deliveryTime} dias úteis</span>
            <span class="ship-option-price">${fmt(o.price)}</span>
          </label>
        `).join('')}
      </div>
    `;
    resultBox.querySelectorAll('input[name="shipOption"]').forEach(radio=>{
      radio.addEventListener('change', ()=>{
        applyShippingOption(options[parseInt(radio.value,10)]);
      });
    });
    applyShippingOption(options[0]);
  }

  function applyShippingOption(opt){
    cartShipPrice = opt.price;
    cartShipNote = `Prazo estimado: até ${opt.deliveryTime} dias úteis.`;
    cartShipLabel = `${opt.company} ${opt.service}`;
    updateCartTotal();
  }

  function cartShippingPrice(){ return cartShipMode === 'retirada' ? 0 : cartShipPrice; }

  function updateCartTotal(){
    document.getElementById('modalTotal').textContent = fmt(cartTotal());
    document.getElementById('modalShippingNote').textContent =
      cartShipMode === 'retirada' ? cartShipNote : `${cartShipLabel}: ${fmt(cartShippingPrice())}. ${cartShipNote}`;

    if(cart.length > 0){
      const itemsList = cart.map(i => `${i.qty}x ${i.nome} (${i.sizeLabel})`).join('\n');
      const discountLine = cartDiscountValue() > 0.001 ? `\nDesconto: -${fmt(cartDiscountValue())}` : '';
      const shipLine = cartShippingPrice() > 0 ? `\nEntrega (${cartShipLabel}): ${fmt(cartShippingPrice())}` : `\nEntrega: ${cartShipLabel}`;
      const msg = `Oi! Quero fechar meu pedido VERAZ:\n\nNome: ${document.getElementById('custNome').value.trim()}\nTelefone: ${document.getElementById('custTelefone').value.trim()}\nE-mail: ${document.getElementById('custEmail').value.trim()}\nEndereço: ${cartShipMode === 'retirada' ? 'Retirar em mãos' : document.getElementById('custEndereco').value.trim()}\n\nItens:\n${itemsList}${discountLine}${shipLine}\nTotal: ${fmt(cartTotal())}`;
      document.getElementById('wppBuyBtn').href = wppLink(msg);
    }
    renderPix();
  }

  function validateDelivery(){
    const nome = document.getElementById('custNome').value.trim();
    const telefone = document.getElementById('custTelefone').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const endereco = document.getElementById('custEndereco').value.trim();
    const errorBox = document.getElementById('deliveryError');

    if(!nome || !telefone || !email || (cartShipMode !== 'retirada' && !endereco)){
      errorBox.textContent = 'Preencha nome, telefone, e-mail' + (cartShipMode !== 'retirada' ? ' e endereço' : '') + ' antes de continuar.';
      errorBox.classList.add('show');
      return false;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errorBox.textContent = 'Digite um e-mail válido.';
      errorBox.classList.add('show');
      return false;
    }
    errorBox.classList.remove('show');
    return true;
  }

  function sendOrderToSheet(){
    if(!CONFIG.sheetsUrl) return;
    const itemsList = cart.map(i => `${i.qty}x ${i.nome} (${i.sizeLabel}) — ${fmt(i.unitPrice * i.qty)}`).join(' | ');
    const payload = {
      nome: document.getElementById('custNome').value.trim(),
      telefone: document.getElementById('custTelefone').value.trim(),
      email: document.getElementById('custEmail').value.trim(),
      endereco: cartShipMode === 'retirada' ? 'Retirar em mãos' : document.getElementById('custEndereco').value.trim(),
      itens: itemsList,
      subtotal: fmt(cartSubtotal()),
      desconto: cartDiscountValue() > 0.001 ? fmt(cartDiscountValue()) : 'Nenhum',
      frete: `${cartShipLabel}: ${fmt(cartShippingPrice())}`,
      total: fmt(cartTotal()),
      pagamento: document.querySelector('.pay-tab.active').dataset.pay === 'pix' ? 'Pix' : 'WhatsApp',
    };
    fetch(CONFIG.sheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {'Content-Type': 'text/plain'},
      body: JSON.stringify(payload),
    }).catch(err => console.error('Erro ao registrar pedido na planilha:', err));
  }

  document.getElementById('wppBuyBtn').addEventListener('click', (e)=>{
    if(!validateDelivery()){ e.preventDefault(); return; }
    updateCartTotal();
    e.target.href = document.getElementById('wppBuyBtn').href;
    sendOrderToSheet();
  });

  document.querySelectorAll('.pay-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      if(tab.dataset.pay === 'pix' && !validateDelivery()) return;
      document.querySelectorAll('.pay-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.pay-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.pay === 'wpp' ? 'panelWpp' : 'panelPix').classList.add('active');
      if(tab.dataset.pay === 'pix'){
        renderPix();
        sendOrderToSheet();
      }
    });
  });

  function crc16(payload){
    let crc = 0xFFFF;
    for(let i=0;i<payload.length;i++){
      crc ^= (payload.charCodeAt(i) << 8);
      for(let j=0;j<8;j++){
        crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4,'0');
  }
  function tlv(id, value){
    const len = String(value.length).padStart(2,'0');
    return `${id}${len}${value}`;
  }
  function stripAccents(str){
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E]/g,'');
  }
  function buildPixPayload(amount){
    const key = CONFIG.pixKey;
    const name = stripAccents(CONFIG.merchantName).substring(0,25);
    const city = stripAccents(CONFIG.merchantCity).substring(0,15);
    const amountStr = amount.toFixed(2);

    const merchantAccountInfo = tlv('00','br.gov.bcb.pix') + tlv('01', key);
    const additionalData = tlv('05', '***');

    let payload =
      tlv('00','01') +
      tlv('26', merchantAccountInfo) +
      tlv('52','0000') +
      tlv('53','986') +
      tlv('54', amountStr) +
      tlv('58','BR') +
      tlv('59', name) +
      tlv('60', city) +
      tlv('62', additionalData) +
      '6304';

    return payload + crc16(payload);
  }

  let qrInstance = null;
  function renderPix(){
    const box = document.getElementById('qrcode-box');
    box.innerHTML = "";
    try{
      if (typeof QRCode === 'undefined') throw new Error('QRCode lib not loaded');
      const payload = buildPixPayload(cartTotal());
      qrInstance = new QRCode(box, { text: payload, width: 190, height: 190, colorDark: "#1B120A", colorLight: "#ffffff" });
    }catch(err){
      box.innerHTML = '<p style="font-size:12.5px; color:#a32e3c; text-align:center; padding:10px;">Não foi possível carregar o QR Code agora. Tenta recarregar a página, ou finaliza pelo WhatsApp.</p>';
      console.error('Pix QR error:', err);
    }
  }
