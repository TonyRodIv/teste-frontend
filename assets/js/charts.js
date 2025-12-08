$(document).ready(function () {

    $.each(data_survey, function (cardId, cardData) {
        let chart_result = 0
        let high_rating = 0
        let high_rating_name
        $.each(cardData.detalhes, function (key, detalhe) {
            chart_result += detalhe.count;
            if(high_rating < detalhe.count){
                high_rating = detalhe.count
                high_rating_name = key
                console.log(key)
            }
        });

        console.log(chart_result)
        $('#charts-grid').append(`
            <article class="chart-card">
                                        <header class="header-area">
                                            <div>
                                                <span class="number text-l">${cardId}</span>
                                                <h2 class="question text-l">${cardData.pergunta}</h2>
                                            </div>
                                            <div class="score-area d-flex d_flex-column">
                                                <strong class="percentage ${high_rating_name}T">${Math.round((high_rating / chart_result) * 100)}%</strong>
                                                <span class="badge text-l ${high_rating_name}">${high_rating_name}</span>
                                            </div>
                                        </header>
                                        <section class="d-flex d_flex-column d_gap-05">
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.excelente.count}" max="${chart_result}"  class="bar_green"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Excelente</span>
                                                    <strong class="count text-l">${cardData.detalhes.excelente.count < 10 ? '0' + cardData.detalhes.excelente.count : cardData.detalhes.excelente.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.bom.count}" max="${chart_result}" class="bar_light_green"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Bom</span>
                                                    <strong class="count text-l">${cardData.detalhes.bom.count < 10 ? '0' + cardData.detalhes.bom.count : cardData.detalhes.bom.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.regular.count}" max="${chart_result}" class="bar_yellow"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Regular</span>
                                                    <strong class="count text-l">${cardData.detalhes.regular.count < 10 ? '0' + cardData.detalhes.regular.count : cardData.detalhes.regular.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.ruim.count}" max="${chart_result}" class="bar_pink"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Ruim</span>
                                                    <strong class="count text-l">${cardData.detalhes.ruim.count < 10 ? '0' + cardData.detalhes.ruim.count : cardData.detalhes.ruim.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.pessimo.count}" max="${chart_result}" class="bar_red"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Péssimo</span>
                                                    <strong class="count text-l">${cardData.detalhes.pessimo.count < 10 ? '0' + cardData.detalhes.pessimo.count : cardData.detalhes.pessimo.count}</strong>
                                                </div>
                                            </div>

                                        </section>
                                    </article>
            `)

    });
    if ($('.comentarios-tabela').length) {
        var comentariosSalvos = JSON.parse(localStorage.getItem('comentarios_doity') || '[]');
        var $tbody = $('.comentarios-tabela tbody');
        comentariosSalvos.forEach(function(c) {
            var htmlLinha = `<tr class="comentarios-row"><td class="comentarios-td-comentario text-md">${c.msg}</td><td class="comentarios-td-participante text-md">${c.autor} <br><small style="color:#999; font-size:11px;">${c.data}</small></td></tr>`;
            $tbody.prepend(htmlLinha);
            $tbody.find('tr:last').remove();
        });
    }
})


