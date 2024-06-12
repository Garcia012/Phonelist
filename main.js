// Array para armazenar os contatos
let contatos = [];

// Função para exibir o formulário de adição de contato
function exibirFormulario() {
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('listaContatos').style.display = 'none';
}

// Função para exibir a lista de contatos
function exibirContatos() {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('listaContatos').style.display = 'block';
    exibirContatosLista();
}

// Função para adicionar um novo contato
function adicionarContato() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    // Verifica se o campo de nome está preenchido
    if (!nome) {
        alert('Por favor, preencha o campo de nome.');
        return;
    }

    // Formata o número de telefone para o formato brasileiro
    const telefoneFormatado = telefone ? formatarTelefone(telefone) : '';

    // Verifica se o campo de telefone ou email está preenchido
    if (!telefoneFormatado && !email) {
        alert('Por favor, preencha o campo de telefone ou email.');
        return;
    }

    // Verifica se o campo de email está preenchido, e se estiver, valida o formato
    if (email && !validarEmail(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }

    // Se todos os critérios forem atendidos, cria o objeto de contato e o adiciona ao array
    const contato = { nome, telefone: telefoneFormatado, email };
    contatos.push(contato);
    exibirContatosLista();
    limparCampos();
}

// Função para validar o formato do email
function validarEmail(email) {
    // Expressão regular para validar o email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para formatar o número de telefone no formato brasileiro
function formatarTelefone(telefone) {
    // Remove todos os caracteres que não são dígitos
    const numeros = telefone.replace(/\D/g, '');
    
    // Formata o número de telefone
    const regex = /^(\d{2})(\d{1})(\d{4})(\d{4})$/;
    const telefoneFormatado = numeros.replace(regex, '($1) $2 $3-$4');
    
    return telefoneFormatado;
}

// Função para exibir os contatos na lista
function exibirContatosLista() {
    const listaContatos = document.getElementById('listaContatos');
    listaContatos.innerHTML = '';

    if (contatos.length === 0) {
        listaContatos.innerHTML = '<p>Nenhum contato encontrado.</p>';
        return;
    }

    // Criação da tabela
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse'; // Adiciona bordas colapsadas
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    listaContatos.appendChild(table);

    // Preenchimento da tabela com os contatos
    const tbody = table.querySelector('tbody');
    contatos.forEach(contato => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="padding: 8px;">${contato.nome}</td>
            <td style="padding: 8px;">${contato.telefone ? contato.telefone : '-'}</td>
            <td style="padding: 8px;">${contato.email ? contato.email : '-'}</td>
        `;
        tbody.appendChild(row);
    });
}

// Função para limpar os campos após adicionar um contato
function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
}

// Evento para adicionar contato quando a tecla "Enter" é pressionada
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && document.getElementById('formulario').style.display === 'block') {
        adicionarContato();
    }
});