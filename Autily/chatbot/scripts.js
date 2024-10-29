document.addEventListener('DOMContentLoaded', () => {
    const floatButton = document.getElementById('floatButton');
    const chatbox = document.getElementById('chatbox');
    const closeButton = document.getElementById('closeButton');
    const messages = document.getElementById('messages');
    const options = document.getElementById('options');

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    // Função para iniciar o arrasto
    floatButton.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - floatButton.getBoundingClientRect().left;
        offsetY = event.clientY - floatButton.getBoundingClientRect().top;
        floatButton.style.cursor = 'grabbing';
    });

    // Função para mover o botão durante o arrasto
    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            floatButton.style.left = `${event.clientX - offsetX}px`;
            floatButton.style.top = `${event.clientY - offsetY}px`;
            floatButton.style.bottom = 'auto'; // Para evitar conflito com a posição bottom
            floatButton.style.right = 'auto';  // Para evitar conflito com a posição right
            floatButton.style.position = 'absolute';
        }
    });

    // Função para parar o arrasto
    document.addEventListener('mouseup', () => {
        isDragging = false;
        floatButton.style.cursor = 'grab';
    });

    // Abre e fecha o chatbox
    floatButton.addEventListener('click', () => {
        chatbox.classList.toggle('hidden');
        if (!chatbox.classList.contains('hidden')) {
            showResponse('inicial');
        }
    });

    closeButton.addEventListener('click', () => {
        chatbox.classList.add('hidden');
        messages.innerHTML = ''; // Apaga todas as mensagens
        options.innerHTML = '';  // Apaga as opções
    });

    // Função para mostrar mensagem e opções
    function showResponse(responseKey) {
        const response = responses[responseKey][0];
        addMessage(response.text, 'assistant');

        // Limpa opções anteriores
        options.innerHTML = '';

        // Adiciona novas opções
        if (response.options) {
            response.options.forEach(option => {
                const button = document.createElement('button');
                button.className = 'option';
                button.textContent = option;
                button.addEventListener('click', () => handleOption(option));
                options.appendChild(button);
            });
        }
    }

    // Adiciona uma mensagem ao chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ' + sender; // Adiciona a classe do balão de mensagem
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight; // Auto-scroll para o fim
    }

   // Função para exibir o balão de planos
   function showPlanBalloon(planOptions) {
    const planMessage = document.createElement('div');
    planMessage.classList.add('message', 'assistant', 'plan');

    // Adiciona a legenda "Planos de Valores"
    const planLegend = document.createElement('div');
    planLegend.classList.add('plan-legend');
    planLegend.textContent = "Planos de Valores";
    planMessage.appendChild(planLegend);

    // Adiciona cada opção dentro do balão de planos
    planOptions.forEach(option => {
        const planOption = document.createElement('button');
        planOption.classList.add('plan-option');
        planOption.textContent = option;
        planOption.addEventListener('click', () => {
            showResponse(option); // Mostra os detalhes do plano selecionado
        });
        planMessage.appendChild(planOption);
    });

    messages.appendChild(planMessage);
    messages.scrollTop = messages.scrollHeight;
}

// Lógica de opções selecionadas
function handleOption(option) {
    addMessage(option, 'user'); // Mostra a escolha do usuário
    if (responses[option]) {
        showResponse(option); // Mostra a resposta correspondente
    } else if (option === "Planos de Valores") {
        const plans = ["Plano Básico", "Plano Padrão", "Plano Premium"];
        showPlanBalloon(plans);
    } else {
        addMessage("Desculpe, não entendi sua solicitação.", 'assistant');
    }
}

    // Estrutura de respostas e opções
    const responses = {
        "inicial": [
            { text: "Oi, Como posso te ajudar?", options: ["Sobre o APP", "Sobre o Site do APP", "Rede de Apoio"] }
        ],
        "Ajuda sobre o APP": [
            { text: "Qual é a sua dúvida?", options: ["Minha conta", "Conta da criança", "Voltar"] }
        ],
        "Site": [
            { text: "Qual é a sua dúvida?", options: ["Como posso encontrar?", "Desenvolvedores", "Voltar"] }
        ],
        "local": [
            { text: "Pesquise em seu navegador, autily.com.br", options: ["Voltar"] }
        ],
        "desenvolvedores": [
            { text: "Nossos desenvolvedores são 5 alunos da ETEC de Ribeirão Pires, que colocaram essa ideia em prática no ano de 2024.", options: ["Voltar"] }
        ],
        "Conta": [
            { text: "Qual o problema?", options: ["Como edito minhas informações de perfil?", "Como adiciono outra criança?", "Voltar"] }
        ],
        "Criança": [
            { text: "Qual a sua dúvida?", options: ["Como edito as informações da criança?", "Como adiciono outra criança?", "Voltar"] }
        ],
        "Rede": [
            { text: "Qual a sua dúvida?", options: ["Como acessar a rede?", "Como conversar com alguma pessoa fora do grupo?"] }
        ],
        "acessar rede": [
            { text: "Para acessar a rede basta clicar...", options: ["Voltar"] }
        ],
        "Grupo": [
            { text: "Para conversar com uma pessoa no privado, é necessário pagar um valor!", options: ["Ver plano de valores", "Voltar"] }
        ],
    
        "Planos de Valores": [
            { text: "Aqui estão os planos disponíveis:", options: ["Plano Básico", "Plano Padrão", "Plano Premium"] }
        ],
        "Plano Básico": [
            { text: "Plano Básico: R$ 29,90/mês. Benefícios: Acesso limitado." }
        ],
        "Plano Padrão": [
            { text: "Plano Padrão: R$ 59,90/mês. Benefícios: Acesso a funcionalidades principais." }
        ],
        "Plano Premium": [
            { text: "Plano Premium: R$ 99,90/mês. Benefícios: Acesso total e suporte VIP." }
        ],
    };

    

    // Lida com a opção selecionada
    function handleOption(option) {
        addMessage(option, 'user');
        // Sobre o APP
        if (option === "Sobre o APP") {
            showResponse('Ajuda sobre o APP');
        } 
        // Sobre o SITE
        else if (option === "Sobre o Site do APP") {
            showResponse('Site');
        } 
        // Local
        else if (option === "Como posso encontrar?") {
            showResponse('local');
        } 
        // Voltar
        else if (option === "Voltar") {
            showResponse('inicial');
        } 
        // Desenvolvedores
        else if (option === "Desenvolvedores") {
            showResponse('desenvolvedores');
        } 
        // Sobre a conta
        else if (option === "Minha conta") {
            showResponse('Conta');
        } 
        // Sobre a conta criança
        else if (option === "Conta da criança") {
            showResponse('Criança');
        } 
        // Como acessar a rede de apoio
        else if (option === "Rede de Apoio") {
            showResponse('Rede');
        } 
        // Como acessar a rede de apoio
        else if (option === "Como acessar a rede?") {
            showResponse('acessar rede');
        } 
        // Privado (planos)
        else if (option === "Como conversar com alguma pessoa fora do grupo?") {
            showResponse('Grupo');
        } 
        // (planos)
        else if (option === "Ver plano de valores") {
            showPlanBalloon(responses['planos'][1]);
        } 
        else {
            addMessage('Desculpe, não entendi a sua opção.', 'assistant');
        }
    }
});
