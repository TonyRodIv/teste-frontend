let rowInEdition = null;

$(document).ready(function () {
    if (typeof data_survey !== 'undefined') {
        loadInitialQuestions();
    } else {
        updateCounter();
    }

    $('#tabela-perguntas').on('click', '.btn-delete', function (e) {
        e.preventDefault();
        if (confirm("Deseja realmente excluir esta pergunta?")) {
            $(this).closest('tr').remove();
            updateCounter();
        }
    });

    $('#tabela-perguntas').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        
        let tr = $(this).closest('tr');
        rowInEdition = tr;
        
        let fullText = tr.find('td:first').text();
        let hasAsterisk = tr.find('td:first span').length > 0;
        let textOnly = fullText.replace('*', '').trim();

        $("#input-nova-pergunta").val(textOnly);
        $("#check-obrigatorio").prop("checked", hasAsterisk);
        
        $("#container-nova-pergunta .title h2").text("Editar Pergunta");
        
        if ($("#container-nova-pergunta").is(":hidden")) {
            $("#container-nova-pergunta").show();
            $("#btn-add-wrapper").hide();
        }
        
        $("#input-nova-pergunta").focus();
    });
});

function loadInitialQuestions() {
    let $table = $("#tabela-perguntas");
    $table.empty();

    $.each(data_survey, function(key, item) {
        let isRequired = item.obrigatorio === "True";
        let htmlRequired = isRequired ? ' <span style="color:red; font-weight:bold;">*</span>' : '';
        let rowId = key; 

        let newRow = `
            <tr data-id="${rowId}">
                <td data-th="text-md">${item.pergunta}${htmlRequired}</td>
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
        $table.append(newRow);
    });
    updateCounter();
}

function toggleForm() {
    let $container = $("#container-nova-pergunta");

    if ($container.is(":hidden")) {
        $container.show();
        $("#input-nova-pergunta").focus();
        $("#btn-add-wrapper").hide();
    } else {
        $container.hide();
        $("#btn-add-wrapper").css("display", "block");
        clearForm();
    }
}

function saveQuestion() {
    let questionText = $("#input-nova-pergunta").val();
    let isRequired = $("#check-obrigatorio").is(":checked");
    let $table = $("#tabela-perguntas");

    if ($.trim(questionText) === "") {
        alert("Por favor, digite uma pergunta.");
        return;
    }

    let htmlRequired = isRequired ? ' <span style="color:red; font-weight:bold;">*</span>' : '';

    if (rowInEdition) {
        rowInEdition.find('td:first').html(questionText + htmlRequired);
        rowInEdition = null; 
        $("#container-nova-pergunta .title h2").text("Nova Pergunta");
    } else {
        let idTest = Math.floor(Math.random() * 10000);
        let newRow = `
            <tr data-id="${idTest}">
                <td data-th="text-md">${questionText}${htmlRequired}</td>
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
        $table.append(newRow);
    }

    toggleForm();
    updateCounter();
}

function clearForm() {
    $("#input-nova-pergunta").val("");
    $("#check-obrigatorio").prop("checked", false);
    $("#input-edit-id").val("");
    rowInEdition = null;
    $("#container-nova-pergunta .title h2").text("Nova Pergunta");
}

function updateCounter() {
    let total = $("#tabela-perguntas tr").length;
    $("#contador-perguntas").text("(" + total + ")");
}