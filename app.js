const furniture = [
  {id:1,name:"Cadeira Escolar 68",type:"cadeira",year:1968,origin:"Campus Recife",tomb:"UFPE-PA-00681",status:"available",statusLabel:"Disponível",material:"Madeira maciça",designer:"Desconhecido",featured:true,history:"Modelo de uso educacional associado à expansão dos espaços de ensino da universidade no final dos anos 1960. A peça foi recuperada estruturalmente, com limpeza e tratamento da madeira, preservando marcas de uso.",model:"models/cadeira-escolar-68.glb",image:"https://images.unsplash.com/photo-1580481077494-e3299acae5a7?auto=format&fit=crop&w=800&q=80"},
  {id:2,name:"Cadeira Curva 72",type:"cadeira",year:1972,origin:"Centro de Artes",tomb:"UFPE-PA-00742",status:"available",statusLabel:"Disponível",material:"Imbuia / madeira",designer:"Acervo a identificar",featured:true,history:"Cadeira de linhas curvas, representativa da produção brasileira de mobiliário do período. A restauração priorizou a conservação dos encaixes e do acabamento original.",model:"models/cadeira-curva-72.glb",image:"https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"},
  {id:3,name:"Mesa de Reunião 74",type:"mesa",year:1974,origin:"Reitoria",tomb:"UFPE-PA-00917",status:"reserved",statusLabel:"Em reserva",material:"Madeira laminada",designer:"Desconhecido",featured:true,history:"Mesa institucional utilizada em reuniões e atividades administrativas. Apresenta sinais de uso compatíveis com sua trajetória e recebeu recuperação de estrutura e superfície.",model:"models/mesa-reuniao-74.glb",image:"https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80"},
  {id:4,name:"Banco de Corredor 65",type:"banco",year:1965,origin:"Centro de Ciências",tomb:"UFPE-PA-00421",status:"queue",statusLabel:"Fila de espera",material:"Madeira maciça",designer:"Desconhecido",featured:false,history:"Banco de uso coletivo, provavelmente produzido para áreas de circulação. A peça preserva sua construção original e aguarda nova destinação.",model:"models/banco-corredor-65.glb",image:"https://images.unsplash.com/photo-1543854564-eb7742edc173?auto=format&fit=crop&w=800&q=80"},
  {id:5,name:"Cadeira de Braço 78",type:"cadeira",year:1978,origin:"CAC",tomb:"UFPE-PA-01003",status:"available",statusLabel:"Disponível",material:"Madeira / compensado",designer:"Desconhecido",featured:false,history:"Peça de assento com braços, recuperada para uso em ambientes de atendimento e leitura.",model:"models/cadeira-braco-78.glb",image:"models/cadeira-braco-78.jpeg"},
  {id:6,name:"Mesa de Desenho 69",type:"mesa",year:1969,origin:"Arquitetura",tomb:"UFPE-PA-00695",status:"restoration",statusLabel:"Em restauro",material:"Madeira / metal",designer:"Acervo a identificar",featured:false,history:"Mesa associada a práticas de desenho e projeto. Encontra-se em processo de restauração, com previsão de documentação completa após a intervenção.",model:"models/mesa-desenho-69.glb",image:"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"},
  {id:7,name:"Cadeira Auditório 81",type:"cadeira",year:1981,origin:"Centro de Tecnologia",tomb:"UFPE-PA-01128",status:"available",statusLabel:"Disponível",material:"Madeira / metal",designer:"Desconhecido",featured:false,history:"Cadeira de auditório preservada em conjunto. A peça foi individualizada no sistema para permitir rastreabilidade de cada unidade.",model:"models/cadeira-auditorio-81.glb",image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"},
  {id:8,name:"Armário Arquivo 63",type:"armario",year:1963,origin:"Biblioteca",tomb:"UFPE-PA-00308",status:"available",statusLabel:"Disponível",material:"Madeira",designer:"Desconhecido",featured:false,history:"Armário destinado ao armazenamento de documentos e materiais. Sua restauração revelou camadas de acabamento de diferentes períodos.",model:"models/armario-arquivo-63.glb",image:"https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80"}
];

let cart = JSON.parse(localStorage.getItem("acervoCart") || "[]");
let requests = JSON.parse(localStorage.getItem("acervoRequests") || JSON.stringify([
  {item:"Cadeira Escolar 68",dept:"Departamento de Design",status:"Em análise",date:"13/09/2026"},
  {item:"Mesa de Reunião 74",dept:"Coordenação do CAC",status:"Reservada",date:"12/09/2026"},
  {item:"Banco de Corredor 65",dept:"Biblioteca Central",status:"Fila",date:"11/09/2026"},
  {item:"Cadeira Curva 72",dept:"Pós-graduação",status:"Aprovada",date:"09/09/2026"}
]));

document.addEventListener("DOMContentLoaded",()=>{renderCatalog();renderCart();renderDashboard();updateCartCount();});

function renderCatalog(){
  const q=(document.getElementById("searchInput").value||"").toLowerCase().trim();
  const cat=document.getElementById("categoryFilter").value;
  const status=document.getElementById("statusFilter").value;
  const sort=document.getElementById("sortFilter").value;
  let data=furniture.filter(x=>{
    const matchesQ=!q || [x.name,x.tomb,x.origin,x.year,x.material].join(" ").toLowerCase().includes(q);
    const matchesCat=cat==="all"||x.type===cat;
    const matchesStatus=status==="all"||x.status===status;
    return matchesQ&&matchesCat&&matchesStatus;
  });
  if(sort==="oldest")data.sort((a,b)=>a.year-b.year);
  if(sort==="newest")data.sort((a,b)=>b.year-a.year);
  if(sort==="name")data.sort((a,b)=>a.name.localeCompare(b.name));
  if(sort==="featured")data.sort((a,b)=>Number(b.featured)-Number(a.featured));
  document.getElementById("resultInfo").textContent=`${data.length} ${data.length===1?"peça":"peças"} encontrada${data.length===1?"":"s"}`;
  const grid=document.getElementById("catalogGrid");
  if(!data.length){grid.innerHTML='<div class="empty">Nenhum mobiliário corresponde aos filtros.<br>Tente outra busca.</div>';return;}
  grid.innerHTML=data.map(cardHTML).join("");
}
function cardHTML(x){
  return `<article class="product-card">
    <button class="product-image" onclick="openProduct(${x.id})" aria-label="Abrir ${x.name}">
      ${objectHTML(x)}
      <span class="status ${x.status}">${x.statusLabel}</span>
    </button>
    <div class="card-info">
      <div class="card-meta"><span>${typeLabel(x.type)}</span><span>${x.year}</span></div>
      <h3>${x.name}</h3><p>${x.origin} · ${x.tomb}</p>
      <div class="card-bottom"><span></span><button class="view-link" onclick="openProduct(${x.id})">Ver peça ↗</button></div>
    </div>
  </article>`;
}
function objectHTML(x){
  if(x.image) {
    return `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--paper); overflow: hidden;">
              <img src="${x.image}" alt="${x.name}" style="max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain;" onerror="this.parentElement.style.display='none'; this.parentElement.nextElementSibling.style.display='flex';">
            </div>
            <div class="mini-object mini-${x.type}" style="display:none;"><i class="back"></i><i class="seat"></i><i class="leg a"></i><i class="leg b"></i></div>`;
  }
  if(x.type==="mesa")return `<div class="mini-object mini-table"><i class="top"></i><i class="leg a"></i><i class="leg b"></i></div>`;
  if(x.type==="banco")return `<div class="mini-object mini-bench"><i class="top"></i><i class="leg a"></i><i class="leg b"></i></div>`;
  if(x.type==="armario")return `<div class="mini-object mini-cabinet"><i class="box"></i><i class="door d1"></i><i class="door d2"></i><i class="knob k1"></i><i class="knob k2"></i></div>`;
  return `<div class="mini-object mini-chair"><i class="back"></i><i class="seat"></i><i class="leg a"></i><i class="leg b"></i></div>`;
}
function typeLabel(t){return ({cadeira:"Cadeira",mesa:"Mesa",banco:"Banco",armario:"Armário",outros:"Outro"})[t]||t}
function quickFilter(type,el){document.getElementById("categoryFilter").value=type;document.querySelectorAll(".pill").forEach(p=>p.classList.remove("active"));el.classList.add("active");renderCatalog();document.getElementById("acervo").scrollIntoView({behavior:"smooth"});}
function openProduct(id){
  const x=furniture.find(i=>i.id===id); if(!x)return;
  const modelExists=x.model;
  document.getElementById("productDetail").innerHTML=`
    <div class="product-detail">
      <div class="product-visual">
        <model-viewer src="${modelExists}" camera-controls auto-rotate shadow-intensity="1" exposure=".85" alt="Modelo 3D de ${x.name}">
          <div class="three-d-placeholder" slot="poster"><div class="big">3D</div>Adicione o arquivo GLB desta peça em <b>${x.model}</b></div>
        </model-viewer>
      </div>
      <div class="product-copy">
        <span class="eyebrow">${typeLabel(x.type)} • ${x.year}</span>
        <h2>${x.name}</h2>
        <p class="lead">${x.material}. Peça integrante do acervo restaurado e documentado pelo projeto.</p>
        <div class="detail-tags"><span>${x.statusLabel}</span><span>UFPE</span><span>3D</span></div>
        <div class="detail-grid">
          <div><small>Tombamento</small><strong>${x.tomb}</strong></div>
          <div><small>Origem</small><strong>${x.origin}</strong></div>
          <div><small>Material</small><strong>${x.material}</strong></div>
          <div><small>Autoria</small><strong>${x.designer}</strong></div>
        </div>
        <div class="history"><h4>História da peça</h4><p>${x.history}</p></div>
        <div class="product-actions">
          ${x.status==="available"
            ? `<button class="btn btn-dark" onclick="addToCart(${x.id})">Adicionar ao carrinho <span>+</span></button>`
            : `<button class="btn btn-dark" onclick="joinQueue(${x.id})">${x.status==="queue"?"Entrar na fila":"Solicitar reserva"} <span>→</span></button>`}
          <button class="btn btn-light" onclick="showToast('Ficha técnica marcada para consulta')">Ficha técnica ↓</button>
        </div>
      </div>
    </div>`;
  openModal("productModal");
}
function addToCart(id){if(!cart.includes(id)){cart.push(id);saveCart();renderCart();updateCartCount();window.showToast?.("Peça adicionada ao carrinho") || showToast("Peça adicionada ao carrinho");}else showToast("Essa peça já está no carrinho");}
function removeCart(id){cart=cart.filter(x=>x!==id);saveCart();renderCart();updateCartCount();}
function saveCart(){localStorage.setItem("acervoCart",JSON.stringify(cart))}
function renderCart(){
  const el=document.getElementById("cartItems");
  if(!cart.length){el.innerHTML='<div class="cart-empty">Seu carrinho está vazio.<br><br>Escolha uma peça no acervo para iniciar uma solicitação.</div>';}
  else el.innerHTML=cart.map(id=>{const x=furniture.find(i=>i.id===id);return `<div class="cart-item"><div class="cart-thumb">${objectHTML(x)}</div><div><h4>${x.name}</h4><p>${x.tomb} · ${x.origin}</p><button class="remove" onclick="removeCart(${x.id})">Remover</button></div></div>`}).join("");
  document.getElementById("cartTotal").textContent=cart.length;
}
function updateCartCount(){document.getElementById("cartCount").textContent=cart.length}
function toggleCart(){document.getElementById("cartDrawer").classList.toggle("open");document.getElementById("drawerOverlay").classList.toggle("open");}
function checkout(){
  if(!cart.length){showToast("Adicione uma peça primeiro");return}
  closeModal("productModal");toggleCart();openLogin(true);
}
function openLogin(after=false){window.afterLogin=after;openModal("loginModal");}
function login(){
  const email=document.getElementById("loginEmail").value.trim();
  if(!email){showToast("Informe seu e-mail institucional");return}
  closeModal("loginModal");showToast("Acesso de protótipo realizado");
  if(window.afterLogin){window.afterLogin=false;openRequestFromCart();}
}
function openRequestFromCart(){
  if(!cart.length){openRequestModal();return}
  const names=cart.map(id=>furniture.find(x=>x.id===id)?.name).join(", ");
  openRequestModal();
  document.getElementById("requestNotes").value=`Peças selecionadas: ${names}`;
}
function openRequestModal(){openModal("requestModal")}
function submitNewRequest(){
  const dept=document.getElementById("requestDept").value.trim();
  if(!dept){showToast("Informe o departamento ou setor");return}
  const type=document.getElementById("requestType").value;
  const qty=document.getElementById("requestQty").value;
  requests.unshift({item:`${type} (${qty} un.)`,dept,status:"Em análise",date:new Date().toLocaleDateString("pt-BR")});
  localStorage.setItem("acervoRequests",JSON.stringify(requests));
  closeModal("requestModal");renderDashboard();showToast("Solicitação enviada para análise");
}
function joinQueue(id){const x=furniture.find(i=>i.id===id);requests.unshift({item:x.name,dept:"A definir",status:"Fila",date:new Date().toLocaleDateString("pt-BR")});localStorage.setItem("acervoRequests",JSON.stringify(requests));renderDashboard();showToast("Você entrou na fila de espera");}
function openRequests(){openAdmin();document.querySelector(".admin-modal").scrollTo({top:0,behavior:"smooth"})}
function openAdmin(){renderDashboard();openModal("adminModal")}
function renderDashboard(){
  document.getElementById("statTotal").textContent=furniture.length;
  document.getElementById("statAvailable").textContent=furniture.filter(x=>x.status==="available").length;
  document.getElementById("statReserved").textContent=furniture.filter(x=>x.status==="reserved").length;
  document.getElementById("statRequests").textContent=requests.length;
  document.getElementById("requestList").innerHTML=requests.slice(0,5).map(r=>`<div class="request-row"><div><strong>${r.item}</strong><span>${r.dept} · ${r.date}</span></div><em>${r.status}</em></div>`).join("");
  document.getElementById("adminTable").innerHTML=furniture.map(x=>`<tr><td>${x.name}</td><td>${x.tomb}</td><td>${x.origin}</td><td><span class="status ${x.status}">${x.statusLabel}</span></td><td>13/09/2026</td></tr>`).join("");
}
function exportCSV(){
  const rows=[["Peça","Tombamento","Tipo","Ano","Origem","Status"],...furniture.map(x=>[x.name,x.tomb,typeLabel(x.type),x.year,x.origin,x.statusLabel])];
  const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(";")).join("\n");
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="acervo-vivo.csv";a.click();URL.revokeObjectURL(a.href);showToast("CSV exportado");
}
function navigate(where){if(where==="catalog")document.getElementById("acervo").scrollIntoView({behavior:"smooth"});else window.scrollTo({top:0,behavior:"smooth"})}
function openModal(id){document.getElementById(id).classList.add("open");document.body.style.overflow="hidden"}
function closeModal(id){document.getElementById(id).classList.remove("open");document.body.style.overflow=""}
function closeModalOnBackdrop(e,id){if(e.target.id===id)closeModal(id)}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2400)}
