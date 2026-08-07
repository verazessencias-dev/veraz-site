// VERAZ Essências v2 — lógica do site
function fmt(v){ return "R$ " + v.toFixed(2).replace('.', ','); }

// ---------- Menu mobile ----------
const menuBtn = document.getElementById('menuBtn');
const hdrDrawer = document.getElementById('hdrDrawer');
menuBtn.addEventListener('click', () => hdrDrawer.classList.toggle('open'));

// ---------- Cards de produto ----------
function cardHTML(p, tag){
  return `
    <div class="p-card" data-id="${p.id}">
      <div class="p-card-img">
        ${tag ? `<span class="p-card-tag">${tag}</span>` : ''}
        <img src="${p.foto}" alt="Frasco do perfume ${p.nome}" loading="lazy">
      </div>
      <div class="p-card-body">
        <span class="p-card-cat">${p.categoria === 'nicho' ? 'Nicho' : (p.categoria === 'lancamento' ? 'Lançamento VERAZ' : 'Clássico')}</span>
        <div class="p-card-insp">Inspirado em ${p.insp}</div>
        <div class="p-card-nome">${p.nome}</div>
        <div class="p-card-price">
          <span class="old">${fmt(p.precoOriginal)}</span>
          <span class="main">${fmt(p.preco)}</span>
        </div>
        <div class="p-card-ml">60ml</div>
      </div>
    </div>
  `;
}

function renderRow(containerId, list, tagFn){
  const el = document.getElementById(containerId);
  el.innerHTML = list.map(p => cardHTML(p, tagFn ? tagFn(p) : null)).join('');
}

renderRow('rowBest', CATALOG.filter(p => p.maisVendido), p => 'Mais vendido');
renderRow('rowLaunch', CATALOG.filter(p => p.categoria === 'lancamento'), () => 'Lançamento');

let currentFilter = 'todos';
function renderCatalog(){
  const list = currentFilter === 'todos' ? CATALOG : CATALOG.filter(p => p.linha === currentFilter);
  renderRow('catGrid', list, p => p.categoria === 'lancamento' ? 'Lançamento' : (p.maisVendido ? 'Mais vendido' : null));
}
renderCatalog();

document.getElementById('catTabs').addEventListener('click', e => {
  const btn = e.target.closest('.cat-tab');
  if(!btn) return;
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.filter;
  renderCatalog();
});

// ---------- Clique em qualquer card abre o produto ----------
document.addEventListener('click', e => {
  const card = e.target.closest('.p-card');
  if(card){ openProduct(card.dataset.id); return; }
  const trigger = e.target.closest('[data-product]');
  if(trigger){ e.preventDefault(); openProduct(trigger.dataset.product); }
});

// ---------- Overlay: Produto ----------
const productOverlay = document.getElementById('productOverlay');
let currentProduct = null;
let currentSize = 'frasco';
let currentQty = 1;

function openProduct(id){
  currentProduct = CATALOG.find(p => p.id === id);
  if(!currentProduct) return;
  currentSize = 'frasco';
  currentQty = 1;

  document.getElementById('pImg').src = currentProduct.foto;
  document.getElementById('pImg').alt = 'Frasco do perfume ' + currentProduct.nome;
  document.getElementById('pCategoria').textContent = currentProduct.categoria === 'nicho' ? 'Nicho' : (currentProduct.categoria === 'lancamento' ? 'Lançamento VERAZ' : 'Clássico');
  document.getElementById('pInsp').textContent = 'Inspirado em ' + currentProduct.insp;
  document.getElementById('pNome').textContent = currentProduct.nome;
  document.getElementById('pBlurb').textContent = currentProduct.blurb;
  document.getElementById('pNotes').innerHTML = `
    <div><b>Topo</b><span>${currentProduct.notas.topo}</span></div>
    <div><b>Coração</b><span>${currentProduct.notas.coracao}</span></div>
    <div><b>Fundo</b><span>${currentProduct.notas.fundo}</span></div>
  `;
  document.querySelectorAll('.size-tab').forEach(t => t.classList.toggle('active', t.dataset.size === 'frasco'));
  document.getElementById('pQtyVal').textContent = '1';
  document.getElementById('pAddedMsg').classList.remove('show');
  updateProductPrice();
  productOverlay.classList.add('open');
}
function closeProduct(){ productOverlay.classList.remove('open'); }
document.getElementById('productClose').addEventListener('click', closeProduct);
productOverlay.addEventListener('click', e => { if(e.target === productOverlay) closeProduct(); });

document.querySelectorAll('.size-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    currentSize = tab.dataset.size;
    document.querySelectorAll('.size-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    updateProductPrice();
  });
});
document.getElementById('pQtyMinus').addEventListener('click', () => {
  if(currentQty > 1) currentQty--;
  document.getElementById('pQtyVal').textContent = currentQty;
  updateProductPrice();
});
document.getElementById('pQtyPlus').addEventListener('click', () => {
  currentQty++;
  document.getElementById('pQtyVal').textContent = currentQty;
  updateProductPrice();
});
function unitPrice(){ return currentSize === 'frasco' ? currentProduct.preco : currentProduct.decant; }
function unitPriceOriginal(){ return currentSize === 'frasco' ? currentProduct.precoOriginal : currentProduct.decantOriginal; }
function updateProductPrice(){
  document.getElementById('pPriceOld').textContent = fmt(unitPriceOriginal() * currentQty);
  document.getElementById('pPriceMain').textContent = fmt(unitPrice() * currentQty);
}

// ---------- Carrinho ----------
const CART_STORAGE_KEY = 'veraz_cart_v2';
let cart = [];
try{
  const saved = localStorage.getItem(CART_STORAGE_KEY);
  if(saved) cart = JSON.parse(saved);
}catch(err){ cart = []; }

function saveCart(){
  try{ localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); }
  catch(err){ /* localStorage indisponível — carrinho segue funcionando só nesta sessão */ }
}

function cartKey(p, size){ return p.id + '|' + size; }

document.getElementById('pAddToCart').addEventListener('click', () => {
  const key = cartKey(currentProduct, currentSize);
  const existing = cart.find(i => i.key === key);
  if(existing){ existing.qty += currentQty; }
  else{
    cart.push({
      key, id: currentProduct.id, nome: currentProduct.nome, foto: currentProduct.foto,
      size: currentSize, sizeLabel: currentSize === 'frasco' ? 'Frasco 60ml' : 'Tester 5ml',
      unitPrice: unitPrice(), qty: currentQty
    });
  }
  updateCartCount();
  saveCart();
  document.getElementById('pAddedMsg').classList.add('show');
});
document.getElementById('pGoCart').addEventListener('click', e => { e.preventDefault(); closeProduct(); openCart(); });

const cartOverlay = document.getElementById('cartOverlay');
document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', e => { if(e.target === cartOverlay) closeCart(); });

function openCart(){ renderCart(); cartOverlay.classList.add('open'); }
function closeCart(){ cartOverlay.classList.remove('open'); }

function cartItemCount(){ return cart.reduce((s,i) => s + i.qty, 0); }
function cartSubtotal(){ return cart.reduce((s,i) => s + i.unitPrice * i.qty, 0); }

function updateCartCount(){
  const count = cartItemCount();
  const el = document.getElementById('cartCount');
  el.textContent = count;
  el.hidden = count === 0;
}
updateCartCount();

function renderCart(){
  const itemsBox = document.getElementById('cartItems');
  const emptyBox = document.getElementById('cartEmpty');
  const foot = document.getElementById('cartFoot');
  if(cart.length === 0){
    itemsBox.innerHTML = '';
    emptyBox.style.display = 'block';
    foot.hidden = true;
    return;
  }
  emptyBox.style.display = 'none';
  foot.hidden = false;
  itemsBox.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.foto}" alt="${item.nome}">
      <div class="ci-info">
        <div class="ci-name">${item.nome}</div>
        <div class="ci-size">${item.sizeLabel}</div>
        <div class="ci-qty">
          <button data-act="minus" data-idx="${idx}">−</button>
          <span>${item.qty}</span>
          <button data-act="plus" data-idx="${idx}">+</button>
        </div>
        <span class="ci-remove" data-act="remove" data-idx="${idx}">remover</span>
      </div>
      <div class="ci-price">${fmt(item.unitPrice * item.qty)}</div>
    </div>
  `).join('');
  document.getElementById('cartSubtotal').textContent = fmt(cartSubtotal());
}

document.getElementById('cartItems').addEventListener('click', e => {
  const btn = e.target.closest('[data-act]');
  if(!btn) return;
  const idx = parseInt(btn.dataset.idx, 10);
  if(btn.dataset.act === 'plus') cart[idx].qty++;
  if(btn.dataset.act === 'minus'){ cart[idx].qty--; if(cart[idx].qty <= 0) cart.splice(idx,1); }
  if(btn.dataset.act === 'remove') cart.splice(idx,1);
  updateCartCount();
  saveCart();
  renderCart();
});

// ---------- Checkout ----------
const checkoutOverlay = document.getElementById('checkoutOverlay');
let shipMode = 'retirada';
let checkoutStep = 1;

document.getElementById('cartCheckoutBtn').addEventListener('click', () => {
  if(cart.length === 0) return;
  closeCart();
  goToStep(1);
  renderSummary();
  checkoutOverlay.classList.add('open');
});
document.getElementById('checkoutClose').addEventListener('click', () => checkoutOverlay.classList.remove('open'));
checkoutOverlay.addEventListener('click', e => { if(e.target === checkoutOverlay) checkoutOverlay.classList.remove('open'); });

function goToStep(n){
  checkoutStep = n;
  document.querySelectorAll('.checkout-step-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(n === 1 ? 'stepDados' : n === 2 ? 'stepEntrega' : 'stepPagamento').classList.add('active');
  document.querySelectorAll('.step').forEach(s => {
    const sn = parseInt(s.dataset.step, 10);
    s.classList.toggle('active', sn === n);
    s.classList.toggle('done', sn < n);
  });
}

document.getElementById('goStep2').addEventListener('click', () => {
  const nome = document.getElementById('custNome').value.trim();
  const tel = document.getElementById('custTelefone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const err = document.getElementById('dadosError');
  if(!nome || !tel || !email){ err.textContent = 'Preencha nome, WhatsApp e e-mail.'; return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ err.textContent = 'Digite um e-mail válido.'; return; }
  err.textContent = '';
  document.getElementById('dadosResumo').textContent = `${nome} · ${email} · ${tel}`;
  goToStep(2);
});
document.getElementById('backStep1').addEventListener('click', () => goToStep(1));

document.querySelectorAll('.ship-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    shipMode = tab.dataset.ship;
    document.querySelectorAll('.ship-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('enderecoBlock').hidden = shipMode === 'retirada';
    renderSummary();
  });
});

document.getElementById('goStep3').addEventListener('click', () => {
  const err = document.getElementById('entregaError');
  if(shipMode === 'correios' && !document.getElementById('custEndereco').value.trim()){
    err.textContent = 'Informe o endereço completo.';
    return;
  }
  err.textContent = '';
  goToStep(3);
  renderSummary();
  renderPix();
  updateWppFinishLink();
});
document.getElementById('backStep2').addEventListener('click', () => goToStep(2));

document.querySelectorAll('.pay-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.pay-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.pay === 'pix' ? 'payPix' : 'payWpp').classList.add('active');
  });
});

function shippingPrice(){ return shipMode === 'retirada' ? 0 : CONFIG.fretePadrao; }
function totalComFrete(){ return cartSubtotal() + shippingPrice(); }
function totalComDescontoPix(){ return totalComFrete() * (1 - CONFIG.descontoPixPct); }

function renderSummary(){
  const box = document.getElementById('summaryItems');
  box.innerHTML = cart.map(i => `
    <div class="summary-item">
      <img src="${i.foto}" alt="${i.nome}">
      <div style="flex:1;">
        <div class="si-name">${i.nome}</div>
        <div class="si-meta">${i.sizeLabel} · ${i.qty}x</div>
      </div>
      <div>${fmt(i.unitPrice * i.qty)}</div>
    </div>
  `).join('');
  document.getElementById('sumSubtotal').textContent = fmt(cartSubtotal());
  document.getElementById('sumFrete').textContent = shipMode === 'retirada' ? 'Grátis (retirada)' : fmt(shippingPrice());

  const descontoRow = document.getElementById('sumDescontoRow');
  const payingPix = document.querySelector('.pay-tab.active') ? document.querySelector('.pay-tab.active').dataset.pay === 'pix' : true;
  if(payingPix){
    descontoRow.hidden = false;
    document.getElementById('sumDesconto').textContent = '-' + fmt(totalComFrete() - totalComDescontoPix());
    document.getElementById('sumTotal').textContent = fmt(totalComDescontoPix());
  }else{
    descontoRow.hidden = true;
    document.getElementById('sumTotal').textContent = fmt(totalComFrete());
  }
}
document.querySelectorAll('.pay-tab').forEach(tab => tab.addEventListener('click', renderSummary));

function updateWppFinishLink(){
  const nome = document.getElementById('custNome').value.trim();
  const tel = document.getElementById('custTelefone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const endereco = shipMode === 'retirada' ? 'Retirar em mãos' : document.getElementById('custEndereco').value.trim();
  const itens = cart.map(i => `${i.qty}x ${i.nome} (${i.sizeLabel})`).join('\n');
  const msg = `Oi! Quero fechar meu pedido VERAZ:\n\nNome: ${nome}\nWhatsApp: ${tel}\nE-mail: ${email}\nEndereço: ${endereco}\n\nItens:\n${itens}\n\nTotal: ${fmt(totalComFrete())}`;
  document.getElementById('wppFinishBtn').href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  document.getElementById('floatWpp').href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Oi! Vim pelo site da VERAZ e queria saber mais sobre as essências.")}`;
}
document.getElementById('floatWpp').href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent("Oi! Vim pelo site da VERAZ e queria saber mais sobre as essências.")}`;

// ---------- Pix (BR Code / QR estático) ----------
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
function tlv(id, value){ return `${id}${String(value.length).padStart(2,'0')}${value}`; }
function stripAccents(str){ return str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7E]/g,''); }
function buildPixPayload(amount){
  const key = CONFIG.pixKey;
  const name = stripAccents(CONFIG.merchantName).substring(0,25);
  const city = stripAccents(CONFIG.merchantCity).substring(0,15);
  const amountStr = amount.toFixed(2);
  const merchantAccountInfo = tlv('00','br.gov.bcb.pix') + tlv('01', key);
  const additionalData = tlv('05', '***');
  let payload =
    tlv('00','01') + tlv('26', merchantAccountInfo) + tlv('52','0000') + tlv('53','986') +
    tlv('54', amountStr) + tlv('58','BR') + tlv('59', name) + tlv('60', city) +
    tlv('62', additionalData) + '6304';
  return payload + crc16(payload);
}
function renderPix(){
  const box = document.getElementById('qrcode-box');
  box.innerHTML = '';
  try{
    if(typeof QRCode === 'undefined') throw new Error('lib not loaded');
    const payload = buildPixPayload(totalComDescontoPix());
    new QRCode(box, { text: payload, width: 180, height: 180, colorDark:"#1B120A", colorLight:"#ffffff" });
  }catch(err){
    box.innerHTML = '<p style="font-size:12.5px;color:#8B2E3A;text-align:center;">Não foi possível carregar o QR Code. Tenta recarregar, ou finaliza pelo WhatsApp.</p>';
  }
}
