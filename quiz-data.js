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
    familia:["floral"], intensidade:"leve", ocasiao:["dia"], nicho:false},
  {insp:"La Vie Est Belle", nome:"Felicidade", linha:"feminino", fonte:"ess",
    familia:["doce","gourmand"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"Black Opium", nome:"Vício", linha:"feminino", fonte:"ess",
    familia:["oriental","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"J'adore", nome:"Adoração", linha:"feminino", fonte:"ess",
    familia:["floral"], intensidade:"moderado", ocasiao:["trabalho"], nicho:false},
  {insp:"Flowerbomb", nome:"Explosão", linha:"feminino", fonte:"ess",
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
    familia:["amadeirado","fresco"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"One Million", nome:"Fortuna", linha:"masculino", fonte:"ess",
    familia:["especiado","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Eros", nome:"Conquista", linha:"masculino", fonte:"ess",
    familia:["fresco","doce"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"Polo Blue", nome:"Clássico", linha:"masculino", fonte:"ess",
    familia:["aquatico"], intensidade:"leve", ocasiao:["dia"], nicho:false},
  {insp:"Le Male", nome:"Rebeldia", linha:"masculino", fonte:"ess",
    familia:["especiado","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:false},
  {insp:"Fahrenheit", nome:"Autêntico", linha:"masculino", fonte:"ess",
    familia:["amadeirado","floral"], intensidade:"intenso", ocasiao:["versatil"], nicho:false},

  // ---------- UNISSEX ----------
  {insp:"Baccarat Rouge 540", nome:"Âmbar Raro", linha:"unissex", fonte:"ess",
    familia:["doce","amadeirado"], intensidade:"intenso", ocasiao:["noite","versatil"], nicho:true},
  {insp:"Santal 33", nome:"Deserto", linha:"unissex", fonte:"ess",
    familia:["amadeirado"], intensidade:"moderado", ocasiao:["versatil"], nicho:true},
  {insp:"Tobacco Vanille", nome:"Charuto", linha:"unissex", fonte:"ess",
    familia:["oriental","doce"], intensidade:"intenso", ocasiao:["noite"], nicho:true},
  {insp:"Bvlgari Black", nome:"Enigma", linha:"unissex", fonte:"ess",
    familia:["amadeirado"], intensidade:"moderado", ocasiao:["versatil"], nicho:false},
  {insp:"CK One", nome:"Livre", linha:"unissex", fonte:"ess",
    familia:["fresco"], intensidade:"leve", ocasiao:["dia"], nicho:false},
];

const QUIZ_QUESTIONS = [
  {
    q: "Você está buscando um perfume de uso...",
    options: [
      {label:"Feminino", effect:{linha:"feminino"}},
      {label:"Masculino", effect:{linha:"masculino"}},
      {label:"Unissex ou sem preferência", effect:{linha:"qualquer"}},
    ]
  },
  {
    q: "Qual frase mais combina com você?",
    options: [
      {label:"Gosto de ser lembrada(o) pelo perfume que uso", effect:{intensidade:{intenso:2}}},
      {label:"Prefiro algo discreto — só quem chega perto sente", effect:{intensidade:{leve:2}}},
      {label:"Equilíbrio é tudo: nem fraco, nem exagerado", effect:{intensidade:{moderado:2}}},
    ]
  },
  {
    q: "Pra qual momento você mais vai usar esse perfume?",
    options: [
      {label:"Dia a dia, trabalho, rotina", effect:{ocasiao:{dia:1, trabalho:2}}},
      {label:"Noite, festas, sair", effect:{ocasiao:{noite:2}}},
      {label:"Quero um só perfume pra tudo", effect:{ocasiao:{versatil:2}}},
    ]
  },
  {
    q: "Qual dessas notas mais te atrai?",
    options: [
      {label:"Floral — rosas, jasmim, flores brancas", effect:{familia:{floral:3}}},
      {label:"Doce e adocicado — baunilha, caramelo, frutas", effect:{familia:{doce:3}}},
      {label:"Amadeirado — cedro, sândalo, musgo", effect:{familia:{amadeirado:3}}},
      {label:"Fresco e cítrico — bergamota, notas marinhas", effect:{familia:{fresco:3}}},
      {label:"Especiado — canela, âmbar, especiarias", effect:{familia:{especiado:3}}},
    ]
  },
  {
    q: "Se seu perfume fosse uma estação do ano, seria...",
    options: [
      {label:"Verão — leve e refrescante", effect:{familia:{fresco:2, aquatico:2}, intensidade:{leve:1}}},
      {label:"Inverno — quente e envolvente", effect:{familia:{amadeirado:1, oriental:1}, intensidade:{intenso:1}}},
      {label:"O ano inteiro, sem depender do clima", effect:{ocasiao:{versatil:2}}},
    ]
  },
  {
    q: "Como você quer que as pessoas se sintam perto de você?",
    options: [
      {label:"Encantadas — romântico e delicado", effect:{familia:{floral:2}}},
      {label:"Curiosas — querendo saber o que é", effect:{nicho:3}},
      {label:"Confortáveis — é aconchegante", effect:{familia:{gourmand:2, doce:1}}},
      {label:"Revigoradas — é leve e energizante", effect:{familia:{fresco:2}}},
    ]
  },
  {
    q: "Você prefere um perfume que...",
    options: [
      {label:"Todo mundo já conhece e ama — clássico garantido", effect:{nicho:-2}},
      {label:"Poucas pessoas têm — bem exclusivo", effect:{nicho:3}},
    ]
  },
  {
    q: "Qual cor combina mais com o perfume que você imagina?",
    options: [
      {label:"Dourado / âmbar", effect:{familia:{oriental:1, amadeirado:1}}},
      {label:"Branco / rosa claro", effect:{familia:{floral:2}}},
      {label:"Azul", effect:{familia:{aquatico:2, fresco:1}}},
      {label:"Marrom / terracota", effect:{familia:{amadeirado:2}}},
    ]
  },
  {
    q: "O que mais importa pra você num perfume?",
    options: [
      {label:"Que dure o dia todo sem precisar reaplicar", effect:{intensidade:{intenso:1}}},
      {label:"Que seja sutil e agradável, sem cansar", effect:{intensidade:{leve:1}}},
      {label:"Que combine com qualquer roupa ou ocasião", effect:{ocasiao:{versatil:2}}},
    ]
  },
  {
    q: "Por último: qual fase combina mais com você hoje?",
    options: [
      {label:"Uma fase clássica e elegante", effect:{familia:{floral:1, amadeirado:1}, nicho:-1}},
      {label:"Uma fase ousada, quero arriscar", effect:{nicho:2, intensidade:{intenso:1}}},
      {label:"Uma fase leve, simples, natural", effect:{familia:{fresco:1}, intensidade:{leve:1}}},
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
    if(quizScore.linha === 'feminino') return p.linha === 'feminino' || p.linha === 'unissex';
    if(quizScore.linha === 'masculino') return p.linha === 'masculino' || p.linha === 'unissex';
    return true; // "qualquer"
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
      <p class="quiz-result-blurb">Combina com o seu perfil: presença ${match.intensidade === 'intenso' ? 'marcante' : match.intensidade === 'leve' ? 'discreta' : 'equilibrada'}, com notas ${match.familia.join(' e ')}.</p>
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
