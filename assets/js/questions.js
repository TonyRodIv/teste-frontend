/* --- Funcionalidade de Nova/EEditar pergunta --- */

function toggleFormulario() {
    var $container = $("#container-nova-pergunta");

    if ($container.is(":hidden")) {
        $container.show();
        $("#input-nova-pergunta").focus();
        $("#btn-add-wrapper").hide();
    } else {
        $container.hide();
        $("#btn-add-wrapper").css("display", "flex");
        limparFormulario();
    }
}

var linhaEmEdicao = null;

function adicionarNaTabela() {
    var textoPergunta = $("#input-nova-pergunta").val();
    var isObrigatorio = $("#check-obrigatorio").is(":checked");
    var $tabela = $("#tabela-perguntas");

    if ($.trim(textoPergunta) === "") {
        alert("Por favor, digite uma pergunta.");
        return;
    }

    var htmlObrigatorio = isObrigatorio ? ' <span style="color:red; font-weight:bold;">*</span>' : '';

    if (linhaEmEdicao) {
        // --- MODO EDIÇÃO: Atualiza a linha existente ---
        linhaEmEdicao.find('td:first').html(textoPergunta + htmlObrigatorio);
        
        // Remove destaque ou lógica extra se necessário
        linhaEmEdicao = null; 
        $("#container-nova-pergunta .title h2").text("Nova Pergunta"); // Reseta o título
    } else {
        // --- MODO CRIAÇÃO: Adiciona nova linha ---
        var idTest = Math.floor(Math.random() * 10000);
        var novaLinha = `
            <tr data-id="${idTest}">
                <td data-th="text-md">${textoPergunta}${htmlObrigatorio}</td>
                <td data-th="Ações" class="d-flex d_align-center d_gap-05">
                    <a href="#" class="btn-edit"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <path d="M4.75 19.2501L9 18.2501L18.2929 8.9572C18.6834 8.56667 18.6834 7.93351 18.2929 7.54298L16.4571 5.7072C16.0666 5.31667 15.4334 5.31667 15.0429 5.7072L5.75 15.0001L4.75 19.2501Z"
                                stroke="#5A5A5A" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                            <path d="M19.25 19.25H13.75" stroke="#5A5A5A" stroke-width="1.5"
                                stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg></a>
                    <a href="#" class="btn-delete"><img src="./assets/img/trash.svg" width="20px" alt=""></a>
                </td>
            </tr>
        `;
        $tabela.append(novaLinha);
    }

    toggleFormulario();
    atualizarContador();
}

function limparFormulario() {
    $("#input-nova-pergunta").val("");
    $("#check-obrigatorio").prop("checked", false);
    $("#input-edit-id").val("");
    linhaEmEdicao = null;
    $("#container-nova-pergunta .title h2").text("Nova Pergunta");
}

$('#tabela-perguntas').on('click', '.btn-delete', function (e) {
    e.preventDefault();
    if (confirm("Deseja realmente excluir esta pergunta?")) {
        $(this).closest('tr').remove();
        atualizarContador();
    }
});

$('#tabela-perguntas').on('click', '.btn-edit', function (e) {
    e.preventDefault();
    
    var tr = $(this).closest('tr');
    linhaEmEdicao = tr;
    
    var textoCompleto = tr.find('td:first').text();
    var temAsterisco = tr.find('td:first span').length > 0;
    
    var apenasTexto = textoCompleto.replace('*', '').trim();

    $("#input-nova-pergunta").val(apenasTexto);
    $("#check-obrigatorio").prop("checked", temAsterisco);
    
    $("#container-nova-pergunta .title h2").text("Editar Pergunta");
    
    if ($("#container-nova-pergunta").is(":hidden")) {
        $("#container-nova-pergunta").show();
        $("#btn-add-wrapper").hide();
    }
    
    $("#input-nova-pergunta").focus();
});

function atualizarContador() {
    var total = $("#tabela-perguntas tr").length;
    $("#contador-perguntas").text("(" + total + ")");
}