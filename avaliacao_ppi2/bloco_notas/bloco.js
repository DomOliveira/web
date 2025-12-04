/* Declarar Variaves*/
    const tituloInput = document.getElementById('titulo');
    const mensText = document.getElementById('mensagem');
    const botaoSa = document.getElementById('botaoSalvar');
    const listaNotas = document.getElementById('lista-notas');
    /* Variável para armazenar o ID da nota que está em edição.*/
    let notaEditId = null;
    /* Ação do botão de salvar nota*/
    botaoSa.addEventListener('click', () => {
    const titulo = tituloInput.value.trim();
    const mensagem = mensText.value.trim();
        /*Alerta caso não seja preenchido os campos*/
    if (titulo === '' || mensagem === '') {
        alert('Por favor, preencha o título e a mensagem.');
        return;
    }
    let notas = JSON.parse(localStorage.getItem('notas')) || [];
    /* Verifica se estamos em modo de EDIÇÃO (se notaEditId tem um valor)*/
    if (notaEditId != null) {
        /* Encontra a posição da nota no array que corresponde ao ID em edição.*/
        const index = notas.findIndex(nota => nota.id === notaEditId);
        if (index !== -1) {
            /* Atualiza o conteúdo da nota existente com os novos valores dos campos*/
            notas[index].titulo = titulo;
            notas[index].mensagem = mensagem;
        }
        notaEditId = null;
        botaoSa.textContent = 'Salvar Nota';
    } else { /*Se notaEditId for null, estamos em modo de CRIAÇÃO*/
        /*Será salvo a data atual do PC*/
        const novaNota = {
            id: Date.now(),
            titulo: titulo,
            mensagem: mensagem,
            data: new Date().toLocaleDateString('pt-BR')
        };
        notas.push(novaNota); /* Adiciona a nova nota ao array*/
    }
    localStorage.setItem('notas', JSON.stringify(notas));
    /*Limpa os campos após o salvamento*/
    limparCampos();
    listarNotas();
    });
    /*Função que irá mostrar a lista das notas salvas*/
    function listarNotas() {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        listaNotas.innerHTML = '<h2>Minhas Anotações</h2>';

        if (notas.length === 0) {
            listaNotas.innerHTML += '<p style="font-family: Arial, sans-serif;">Nenhuma nota salva ainda.</p>';
            return;
        }

        notas.forEach(nota => { /*Criada uma div para cada nota salva*/
            const notaElemento = document.createElement('div');
            notaElemento.classList.add('nota-item');
            notaElemento.innerHTML = `
                <div class="nota-header">
                    <h3>${nota.titulo}</h3>
                </div>
                <span>${nota.data}</span>
                <div class="nota-acoes">
                    <button class="btn-editar" data-id="${nota.id}">Editar</button>
                    <button class="btn-excluir" data-id="${nota.id}">Excluir</button>
                </div>
            `;
            notaElemento.querySelector('.nota-header').addEventListener('click', () => abrirNotaParaVisualizar(nota.id)); /*Abrir a nota ao clicar nela*/
            notaElemento.querySelector('.btn-editar').addEventListener('click', (e) => abrirNotaParaEdicao(Number(e.target.dataset.id))); /* Chamar a edição da nota*/
            notaElemento.querySelector('.btn-excluir').addEventListener('click', (e) => excluirNota(Number(e.target.dataset.id))); /*Chama a função de exclusão da nota*/

            listaNotas.appendChild(notaElemento); /* Insere o item na lista na tela*/
        });
    }
    /* Criação da função para poder visualizar a nota ao clicar nela*/
    function abrirNotaParaVisualizar(id) {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        /* Usa o método .find para buscar a nota correspondente ao ID clicado*/
        const nota = notas.find(n => n.id === id);

        if (nota) {
            tituloInput.value = nota.titulo;
            mensText.value = nota.mensagem;

            notaEditId = null;
            botaoSa.textContent = 'Salvar Nota'; 

            tituloInput.focus();
        }
    }
    /* Fazer Edição da nota já salva e mudar o texto do botão*/
    function abrirNotaParaEdicao(id) {
        const notas = JSON.parse(localStorage.getItem('notas')) || [];
        const nota = notas.find(n => n.id === id); /* Busca a nota a ser editada pelo ID*/

        if (nota) {
            tituloInput.value = nota.titulo;
            mensText.value = nota.mensagem;

            notaEditId = id; 
            botaoSa.textContent = 'Atualizar Nota'; 
        }
    }
    /*Caso confirme a exclusão da nota, para seguir excluindo ela*/
    function excluirNota(id) {
        if (confirm('Tem certeza que deseja excluir esta nota?')) {
            let notas = JSON.parse(localStorage.getItem('notas')) || [];
            /* Filtra o array, mantendo SOMENTE as notas cujo ID é diferente do ID a ser excluído*/
            notas = notas.filter(nota => nota.id !== id);

            localStorage.setItem('notas', JSON.stringify(notas));

            if (notaEditId === id) { 
                limparCampos();
            }

            listarNotas(); 
        }
    }
    /*Limpar os campos Após salvar*/
    function limparCampos() {
        tituloInput.value = '';
        mensText.value = '';
        notaEditId = null;
        botaoSa.textContent = 'Salvar Nota';
    }

    listarNotas();