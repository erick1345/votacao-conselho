const dadosIniciais = [
    { id: 1, nome: "Marcela Antunes", foto: "imagens/marcela.jpeg" },
    { id: 2, nome: "Aline Ferreira", foto: "imagens/aline.jpeg" },
    { id: 3, nome: "Patricia Wience", foto: "imagens/patricia.jpeg" },
    { id: 4, nome: "Josiele Leal", foto: "imagens/josiele.jpeg" },
    { id: 5, nome: "Luana Setni", foto: "imagens/luana.jpeg" },
    { id: 6, nome: "Marciano Inglês", foto: "imagens/marcio.jpeg" },
    { id: 7, nome: "Joyce Luchette", foto: "imagens/joice.jpeg" },
    { id: 8, nome: "Regiane Felisbino", foto: "imagens/regiane.jpeg" },
    { id: 9, nome: "Sirlei Jordão", foto: "imagens/sirlei.jpeg" },
    { id: 10, nome: "Josilene Seguro", foto: "imagens/josi.jpeg" }
];

let candidatoSelecionadoId = null;
let candidatos = JSON.parse(localStorage.getItem('votos_conselho')) || 
                dadosIniciais.map(c => ({ ...c, votos: 0 }));

function salvar() {
    localStorage.setItem('votos_conselho', JSON.stringify(candidatos));
}

// Abre a mini tela
function votar(id) {
    const cand = candidatos.find(c => c.id === id);
    if (cand) {
        candidatoSelecionadoId = id;
        document.getElementById('nome-candidato-modal').innerText = cand.nome;
        document.getElementById('modal-confirmacao').style.display = 'flex';
    }
}

// Fecha a mini tela
function fecharModal() {
    document.getElementById('modal-confirmacao').style.display = 'none';
}

// FUNÇÃO DO BOTÃO CONFIRMAR
function confirmarVoto() {
    if (candidatoSelecionadoId !== null) {
        const index = candidatos.findIndex(c => c.id === candidatoSelecionadoId);
        if (index !== -1) {
            candidatos[index].votos++;
            salvar();
            atualizarRanking();
            fecharModal();
            
            // CHAMA A MENSAGEM BONITA EM VEZ DO ALERT
            mostrarToast(candidatos[index].nome);
        }
    }
}

// Função para criar a mensagem na tela
function mostrarToast(nome) {
    // Cria o elemento
    const toast = document.createElement('div');
    toast.className = 'toast-sucesso';
    toast.innerHTML = `✅ Voto para <strong>${nome}</strong> registrado!`;
    
    // Adiciona na página
    document.body.appendChild(toast);
    
    // Remove do HTML automaticamente após 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
function atualizarRanking() {
    const corpo = document.getElementById('corpo-ranking');
    if (!corpo) return;
    const ordenados = [...candidatos].sort((a, b) => b.votos - a.votos);
    corpo.innerHTML = "";
    ordenados.forEach((c, index) => {
        const medalha = index === 0 ? "🥇 " : index === 1 ? "🥈 " : index === 2 ? "🥉 " : "";
        corpo.innerHTML += `<tr><td>${medalha}${index+1}º</td><td>${c.nome}</td><td>${c.votos}</td></tr>`;
    });
}

function desenharCards() {
    const grid = document.getElementById('grid-candidatos');
    if (!grid) return;
    grid.innerHTML = "";
    candidatos.forEach(c => {
        grid.innerHTML += `
            <div class="card">
                <div class="foto-container">
                    <img src="${c.foto}" class="foto" onerror="this.src='https://via.placeholder.com/300?text=Foto+Indisponivel'">
                </div>
                <div class="info">
                    <strong>${c.nome}</strong>
                    <button class="btn-voto" onclick="votar(${c.id})">Votar</button>
                </div>
            </div>`;
    });
}

function resetarVotos() {
    if(confirm("Zerar todos os votos?")) {
        localStorage.clear();
        location.reload();
    }
}

// Inicia
desenharCards();
atualizarRanking();