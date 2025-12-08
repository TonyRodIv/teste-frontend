$(document).ready(function () {
    if ($('.formulario-dados').length) {
        renderizarFormularioPreview();
    }

    $('#btn-survey').on('click', function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            var comentario = $('#PesquisaAvaliacaoComentario').val();
            var listaComentarios = JSON.parse(localStorage.getItem('comentarios_doity') || '[]');
            listaComentarios.unshift({
                msg: comentario,
                autor: "Participante Teste",
                data: new Date().toLocaleDateString('pt-BR')
            });
            localStorage.setItem('comentarios_doity', JSON.stringify(listaComentarios));
            $("#container").css("display", "flex");
        }
    });
});

function hideModal() { $("#container").hide(); }

function renderizarFormularioPreview() {
    const $container = $('.formulario-dados');
    $container.empty();
    let html = '';
    let counter = 1;

    $.each(data_survey, function(key, item) {
        html += `
        <div class="row pergunta-item" data-obrigatorio="${item.obrigatorio}" id="pergunta-container-${key}">
            <span class="text-l">${counter}. ${item.pergunta} ${item.obrigatorio === "True" ? '<span style="color:red">*</span>' : ''}</span>
            <div class="star-rating">
                <span class="rating">
                    <input type="radio" class="rating-input" value="5" id="p${key}_5" name="data[pergunta][${key}][nota]"><label for="p${key}_5" class="rating-star" title="Excelente">Excelente</label>
                    <input type="radio" class="rating-input" value="4" id="p${key}_4" name="data[pergunta][${key}][nota]"><label for="p${key}_4" class="rating-star" title="Bom">Bom</label>
                    <input type="radio" class="rating-input" value="3" id="p${key}_3" name="data[pergunta][${key}][nota]"><label for="p${key}_3" class="rating-star" title="Razoável">Razoável</label>
                    <input type="radio" class="rating-input" value="2" id="p${key}_2" name="data[pergunta][${key}][nota]"><label for="p${key}_2" class="rating-star" title="Ruim">Ruim</label>
                    <input type="radio" class="rating-input" value="1" id="p${key}_1" name="data[pergunta][${key}][nota]"><label for="p${key}_1" class="rating-star" title="Péssimo">Péssimo</label>
                </span>
                <p class="error-msg" style="display: none; color: #FF2B34; font-size: 12px; margin-top: 5px; font-weight: 500;">
                    <i class="fa fa-exclamation-circle"></i> Por favor, avalie este item.
                </p>
            </div>
        </div>
        <hr>`;
        counter++;
    });
    $container.html(html);
}

function validarFormulario() {
    let isValid = true;
    $('.pergunta-item').each(function() {
        const isObrigatorio = $(this).data('obrigatorio') === "True";
        const hasChecked = $(this).find('input[type="radio"]:checked').length > 0;
        const $errorMsg = $(this).find('.error-msg');
        if (isObrigatorio && !hasChecked) { $errorMsg.show(); isValid = false; } 
        else { $errorMsg.hide(); }
    });

    const $comentario = $('#PesquisaAvaliacaoComentario');
    if ($comentario.val().trim() === "") {
        $comentario.css('border', '1px solid #FF2B34');
        if ($comentario.parent().find('.error-msg-comment').length === 0) {
            $comentario.after('<p class="error-msg-comment" style="color: #FF2B34; font-size: 12px; margin-top: 5px; font-weight: 500;"><i class="fa fa-exclamation-circle"></i> O comentário é obrigatório.</p>');
        }
        isValid = false;
    } else {
        $comentario.css('border', '');
        $comentario.parent().find('.error-msg-comment').remove();
    }
    if (!isValid) {
        $('html, body').animate({ scrollTop: $(".error-msg:visible, .error-msg-comment").first().offset().top - 100 }, 500);
    }
    return isValid;
}