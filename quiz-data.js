// ============================================================
// VERAZ — Diagnóstico de Perfume (quiz-data.js)
// Base de produtos "tageada" + motor de pontuação + interface
// ============================================================

const QUIZ_PRODUCTS = [
  // ---------- FEMININOS ----------
  {insp:"Coco Mademoiselle", nome:"Presença",  linha:"feminino", fonte:"main", foto:"frasco-real.jpeg?v=2",
    familia:["floral","amadeirado"], intensidade:"moderado", ocasiao:["trabalho","versatil"], nicho:false},
  {insp:"Scandal", nome:"Ousadia", linha:"feminino", fonte:"main", foto:"frasco-escandalo.jpg?v=2",
    familia:["doce","floral"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Good Girl", nome:"Dualidade", linha:"feminino", fonte:"main", foto:"frasco-menina-boa.jpg?v=2",
    familia:["doce","gourmand"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Chloé", nome:"Romance", linha:"feminino", fonte:"main", foto:"frasco-cloe.jpg?v=2",
    familia:["floral"], intensidade:"leve", ocasiao:["dia"], nicho:false},
  {insp:"Olympéa", nome:"Magnética", linha:"feminino", fonte:"main", foto:"frasco-olimpia.jpg?v=2",
    familia:["doce","oriental"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Miss Dior", nome:"Delicadeza", linha:"feminino", fonte:"ess",
    foto:"frasco-miss-dior.jpg",
    familia:["floral"], intensidade:"leve", ocasiao:["dia"], nicho:false},
  {insp:"La Vie Est Belle", nome:"Felicidade", linha:"feminino", fonte:"ess",
    foto:"frasco-la-vie-est-belle.jpg",
    familia:["doce","gourmand"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"Black Opium", nome:"Vício", linha:"feminino", fonte:"ess",
    foto:"frasco-black-opium.jpg",
    familia:["oriental","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"J'adore", nome:"Adoração", linha:"feminino", fonte:"ess",
    foto:"frasco-jadore.jpg",
    familia:["floral"], intensidade:"moderado", ocasiao:["trabalho"], nicho:false},
  {insp:"Flowerbomb", nome:"Explosão", linha:"feminino", fonte:"ess",
    foto:"frasco-flowerbomb.jpg",
    familia:["floral","doce"], intensidade:"intenso", ocasiao:["noite","versatil"], nicho:false},

  // ---------- MASCULINOS ----------
  {insp:"212 VIP Black", nome:"Noturno", linha:"masculino", fonte:"main", foto:"frasco-212-vip-preto.jpg?v=2",
    familia:["especiado","amadeirado"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Sauvage", nome:"Liberdade", linha:"masculino", fonte:"main", foto:"frasco-selvagem.jpg?v=2",
    familia:["fresco","amadeirado"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"Hugo Boss", nome:"Executivo", linha:"masculino", fonte:"main", foto:"frasco-chefe.jpg?v=2",
    familia:["amadeirado"], intensidade:"moderado", ocasiao:["trabalho"], nicho:false},
  {insp:"Acqua di Gio", nome:"Oceano", linha:"masculino", fonte:"main", foto:"frasco-agua-marinha.jpg?v=2",
    familia:["aquatico","fresco"], intensidade:"leve", ocasiao:["dia"], nicho:false},
  {insp:"Creed Aventus", nome:"Império", linha:"masculino", fonte:"main", foto:"frasco-legado.jpg?v=2",
    familia:["amadeirado","frutado"], intensidade:"intenso", ocasiao:["versatil"], nicho:false},
  {insp:"Bleu de Chanel", nome:"Elegância", linha:"masculino", fonte:"ess",
    foto:"frasco-bleu-de-chanel.jpg",
    familia:["amadeirado","fresco"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"One Million", nome:"Fortuna", linha:"masculino", fonte:"ess",
    foto:"frasco-one-million.jpg",
    familia:["especiado","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Eros", nome:"Conquista", linha:"masculino", fonte:"ess",
    foto:"frasco-eros.jpg",
    familia:["fresco","doce"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"Polo Blue", nome:"Clássico", linha:"masculino", fonte:"ess",
    foto:"frasco-polo-blue.jpg",
    familia:["aquatico"], intensidade:"leve", ocasiao:["dia"], nicho:false},
  {insp:"Le Male", nome:"Rebeldia", linha:"masculino", fonte:"ess",
    foto:"frasco-le-male.jpg",
    familia:["especiado","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Fahrenheit", nome:"Autêntico", linha:"masculino", fonte:"ess",
    foto:"frasco-fahrenheit.jpg",
    familia:["amadeirado","floral"], intensidade:"intenso", ocasiao:["versatil"], nicho:false},

  // ---------- UNISSEX ----------
  {insp:"Baccarat Rouge 540", nome:"Âmbar Raro", linha:"unissex", fonte:"ess",
    foto:"frasco-baccarat-rouge-540.jpg",
    familia:["doce","amadeirado"], intensidade:"intenso", ocasiao:["noite","versatil"], nicho:true},
  {insp:"Santal 33", nome:"Deserto", linha:"unissex", fonte:"ess",
    foto:"frasco-santal-33.jpg",
    familia:["amadeirado"], intensidade:"moderado", ocasiao:["versatil"], nicho:true},
  {insp:"Tobacco Vanille", nome:"Charuto", linha:"unissex", fonte:"ess",
    foto:"frasco-tobacco-vanille.jpg",
    familia:["oriental","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:true},
  {insp:"Bvlgari Black", nome:"Enigma", linha:"unissex", fonte:"ess",
    foto:"frasco-bvlgari-black.jpg",
    familia:["amadeirado"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"CK One", nome:"Livre", linha:"unissex", fonte:"ess",
    foto:"frasco-ck-one.jpg",
    familia:["fresco"], intensidade:"leve", ocasiao:["dia"], nicho:false},
];

const QUIZ_QUESTIONS = [
  {
    q: "Esse perfume é para você usar sendo...",
    options: [
      {label:"Mulher", effect:{linha:"feminino"}},
      {label:"Homem", effect:{linha:"masculino"}},
      {label:"Tanto faz / qualquer um", effect:{linha:"qualquer"}},
    ]
  },
  {
    q: "Você quer que o perfume seja sentido...",
    options: [
      {label:"Bem forte — quero que sintam de longe", effect:{intensidade:{intenso:2}}},
      {label:"Bem suave — só quem chegar perto sente", effect:{intensidade:{leve:2}}},
      {label:"No meio termo — nem fraco, nem forte demais", effect:{intensidade:{moderado:2}}},
    ]
  },
  {
    q: "Onde você mais vai usar esse perfume?",
    options: [
      {label:"No trabalho e no dia a dia", effect:{ocasiao:{dia:1, trabalho:2}}},
      {label:"Pra sair à noite e ir em festas", effect:{ocasiao:{noite:2}}},
      {label:"Em qualquer lugar — quero um só perfume pra tudo", effect:{ocasiao:{versatil:2}}},
    ]
  },
  {
    q: "Qual desses cheiros você mais gosta?",
    options: [
      {label:"Cheiro de flores", effect:{familia:{floral:3}}},
      {label:"Cheiro doce, tipo sobremesa ou baunilha", effect:{familia:{doce:3}}},
      {label:"Cheiro de madeira, mais sério e encorpado", effect:{familia:{amadeirado:3}}},
      {label:"Cheiro fresco, tipo limão ou dia de praia", effect:{familia:{fresco:3}}},
      {label:"Cheiro de tempero quente, tipo canela", effect:{familia:{especiado:3}}},
    ]
  },
  {
    q: "Você prefere um perfume...",
    options: [
      {label:"Leve e refrescante, tipo dia de verão", effect:{familia:{fresco:2, aquatico:2}, intensidade:{leve:1}}},
      {label:"Quentinho e envolvente, tipo dia de frio", effect:{familia:{amadeirado:1, oriental:1}, intensidade:{intenso:1}}},
      {label:"Não ligo pro clima — quero um só pro ano todo", effect:{ocasiao:{versatil:2}}},
    ]
  },
  {
    q: "Quando alguém sentir seu perfume, você quer que a pessoa fique...",
    options: [
      {label:"Encantada, achando romântico", effect:{familia:{floral:2}}},
      {label:"Curiosa, perguntando o que é", effect:{nicho:3}},
      {label:"Relaxada, achando gostoso e aconchegante", effect:{familia:{gourmand:2, doce:1}}},
      {label:"Com sensação de frescor, bem-disposta", effect:{familia:{fresco:2}}},
    ]
  },
  {
    q: "Você prefere um perfume...",
    options: [
      {label:"Famoso, que muita gente já usa e conhece", effect:{nicho:-2}},
      {label:"Raro, que quase ninguém mais tem", effect:{nicho:3}},
    ]
  },
  {
    q: "Pensando numa cor pro cheiro que você imagina, seria...",
    options: [
      {label:"Dourado", effect:{familia:{oriental:1, amadeirado:1}}},
      {label:"Branco ou rosa clarinho", effect:{familia:{floral:2}}},
      {label:"Azul", effect:{familia:{aquatico:2, fresco:1}}},
      {label:"Marrom", effect:{familia:{amadeirado:2}}},
    ]
  },
  {
    q: "O que é mais importante pra você num perfume?",
    options: [
      {label:"Durar o dia todo, sem precisar passar de novo", effect:{intensidade:{intenso:1}}},
      {label:"Ser leve e agradável, sem incomodar ninguém", effect:{intensidade:{leve:1}}},
      {label:"Combinar com qualquer roupa e ocasião", effect:{ocasiao:{versatil:2}}},
    ]
  },
  {
    q: "Pra fechar: qual dessas frases combina mais com você?",
    options: [
      {label:"Gosto do clássico, do que já é elegante e certeiro", effect:{familia:{floral:1, amadeirado:1}, nicho:-1}},
      {label:"Gosto de arriscar, de ser diferente", effect:{nicho:2, intensidade:{intenso:1}}},
      {label:"Gosto do simples, do natural, sem exagero", effect:{familia:{fresco:1}, intensidade:{leve:1}}},
    ]
  },
];

// ---------- Motor de pontuação ----------
let quizIndex = 0;
let quizScore = { linha:null, familia:{}, intensidade:{}, ocasiao:{}, nicho:0 };

function quizApplyEffect(effect){
  if(effect.linha) quizScore.linha = effect.linha;
  if(effect.familia){
    for(const k in effect.familia) quizScore.familia[k] = (quizScore.familia[k]||0) + effect.familia[k];
  }
  if(effect.intensidade){
    for(const k in effect.intensidade) quizScore.intensidade[k] = (quizScore.intensidade[k]||0) + effect.intensidade[k];
  }
  if(effect.ocasiao){
    for(const k in effect.ocasiao) quizScore.ocasiao[k] = (quizScore.ocasiao[k]||0) + effect.ocasiao[k];
  }
  if(typeof effect.nicho === 'number') quizScore.nicho += effect.nicho;
}

function quizBestMatch(){
  let pool = QUIZ_PRODUCTS.filter(p => {
    if(quizScore.linha === 'feminino') return p.linha === 'feminino';
    if(quizScore.linha === 'masculino') return p.linha === 'masculino';
    return true; // "qualquer" — inclui femininos, masculinos e unissex
  });

  let best = null, bestScore = -Infinity;
  pool.forEach(p => {
    let s = 0;
    p.familia.forEach(f => { s += (quizScore.familia[f] || 0); });
    s += (quizScore.intensidade[p.intensidade] || 0);
    p.ocasiao.forEach(o => { s += (quizScore.ocasiao[o] || 0); });
    s += p.nicho ? quizScore.nicho : -quizScore.nicho * 0.3;
    if(s > bestScore){ bestScore = s; best = p; }
  });
  return best;
}

// ---------- Interface ----------
function quizRenderProgress(){
  const pct = quizIndex === 0 ? 0 : Math.round((quizIndex / QUIZ_QUESTIONS.length) * 100);
  document.getElementById('quizProgressFill').style.width = pct + '%';
  document.getElementById('quizProgressLabel').textContent =
    quizIndex === 0 ? 'Início' : `Pergunta ${quizIndex} de ${QUIZ_QUESTIONS.length}`;
}

function quizRenderQuestion(){
  quizRenderProgress();
  const q = QUIZ_QUESTIONS[quizIndex];
  const stage = document.getElementById('quizStage');
  stage.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt.label}</button>`).join('')}
      </div>
      ${quizIndex > 0 ? '<button class="quiz-back" id="quizBackBtn">← Voltar</button>' : ''}
    </div>
  `;
  stage.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      quizApplyEffect(q.options[parseInt(btn.dataset.idx,10)].effect);
      quizIndex++;
      if(quizIndex >= QUIZ_QUESTIONS.length){
        quizRenderResult();
      }else{
        quizRenderQuestion();
      }
    });
  });
  const backBtn = document.getElementById('quizBackBtn');
  if(backBtn){
    backBtn.addEventListener('click', () => {
      quizIndex--;
      quizRenderQuestion();
    });
  }
}

const QUIZ_FAMILIA_LABEL = {
  floral: "flores",
  doce: "doce",
  gourmand: "gostoso, tipo sobremesa",
  amadeirado: "madeira",
  fresco: "fresco",
  especiado: "tempero quente",
  oriental: "encorpado",
  aquatico: "brisa refrescante",
  frutado: "frutas",
};

function quizRenderResult(){
  document.getElementById('quizProgressFill').style.width = '100%';
  document.getElementById('quizProgressLabel').textContent = 'Resultado';

  const match = quizBestMatch();
  const stage = document.getElementById('quizStage');

  const photoHtml = match.foto ? `
    <div class="quiz-result-photo-frame"><img src="${match.foto}" alt="Frasco VERAZ ${match.nome}"></div>
  ` : '';

  // busca a essência/perfume completo (com preço) nos dados reais do site, se disponíveis
  let priceHtml = '';
  let linkHref = '#';
  if(typeof PRODUCTS !== 'undefined' && match.fonte === 'main'){
    const full = PRODUCTS.find(p => p.insp === match.insp);
    if(full){
      priceHtml = `<div class="quiz-result-price">${fmt(full.preco)}</div>`;
    }
    linkHref = `index.html?produto=${encodeURIComponent(match.insp)}&fonte=main#perfumes`;
  }else if(typeof ESSENCIAS !== 'undefined' && match.fonte === 'ess'){
    const full = ESSENCIAS.find(p => p.insp === match.insp);
    if(full){
      priceHtml = `<div class="quiz-result-price">${fmt(full.preco)}</div>`;
    }
    linkHref = `essencias.html?produto=${encodeURIComponent(match.insp)}&fonte=ess#essencias`;
  }else{
    linkHref = match.fonte === 'main' ? 'index.html#perfumes' : 'essencias.html#essencias';
  }

  stage.innerHTML = `
    <div class="quiz-card quiz-result">
      <div class="quiz-result-eyebrow">O perfume ideal pra você é</div>
      ${photoHtml}
      <div class="quiz-result-insp">${match.insp}</div>
      <div class="quiz-result-name">${match.nome} · 60ml</div>
      <p class="quiz-result-blurb">Combina com você: presença ${match.intensidade === 'intenso' ? 'marcante' : match.intensidade === 'leve' ? 'discreta' : 'equilibrada'}, com cheiro de ${match.familia.map(f => QUIZ_FAMILIA_LABEL[f] || f).join(' e ')}.</p>
      ${priceHtml}
      <a href="${linkHref}" class="btn-gold" style="display:block; margin-top:22px;">Ver esse perfume</a>
      <button class="quiz-restart" id="quizRestartBtn">Refazer o diagnóstico</button>
    </div>
  `;
  document.getElementById('quizRestartBtn').addEventListener('click', quizStart);
}

function quizStart(){
  quizIndex = 0;
  quizScore = { linha:null, familia:{}, intensidade:{}, ocasiao:{}, nicho:0 };
  quizRenderQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('quizStartBtn');
  if(startBtn){
    startBtn.addEventListener('click', quizStart);
  }
});
