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
                                                    <strong class="count text-l">${cardData.detalhes.excelente.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.bom.count}" max="${chart_result}" class="bar_light_green"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Bom</span>
                                                    <strong class="count text-l">${cardData.detalhes.bom.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.regular.count}" max="${chart_result}" class="bar_yellow"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Regular</span>
                                                    <strong class="count text-l">${cardData.detalhes.regular.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.ruim.count}" max="${chart_result}" class="bar_pink"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Ruim</span>
                                                    <strong class="count text-l">${cardData.detalhes.ruim.count}</strong>
                                                </div>
                                            </div>
                                            <div class="bar-area">
                                                <progress id="" value="${cardData.detalhes.pessimo.count}" max="${chart_result}" class="bar_red"></progress>
                                                <div class="legend-row">
                                                    <span class="label text-l">Péssimo</span>
                                                    <strong class="count text-l">${cardData.detalhes.pessimo.count}</strong>
                                                </div>
                                            </div>

                                        </section>
                                    </article>
            `)
    });


})

let data_survey = {
    "01": {
        "pergunta": "Você gostou da apresentação do participante x?",
        "obrigatorio": "True",
        "detalhes": {
            "excelente": { "count": 42 },
            "bom": { "count": 8 },
            "regular": { "count": 3 },
            "ruim": { "count": 12 },
            "pessimo": { "count": 7 }
        }
    },
    "02": {
        "pergunta": "Você gostou da apresentação do participante x?",
        "obrigatorio": "False",
        "detalhes": {
            "excelente": { "count": 120 },
            "bom": { "count": 4 },
            "regular": { "count": 2 },
            "ruim": { "count": 2 },
            "pessimo": { "count": 2 }
        }
    },
    "03": {
        "pergunta": "Você gostou da apresentação do participante x?",
        "obrigatorio": "True",
        "detalhes": {
            "excelente": { "count": 20 },
            "bom": { "count": 15 },
            "regular": { "count": 7 },
            "ruim": { "count": 4 },
            "pessimo": { "count": 70 }
        }
    },
    "04": {
        "pergunta": "Você gostou da apresentação do participante x?",
        "obrigatorio": "False",
        "detalhes": {
            "excelente": { "count": 19 },
            "bom": { "count": 3 },
            "regular": { "count": 30 },
            "ruim": { "count": 10 },
            "pessimo": { "count": 12 }
        }
    },
    "05": {
        "pergunta": "Você gostou da apresentação do participante x?",
        "obrigatorio": "False",
        "detalhes": {
            "excelente": { "count": 9 },
            "bom": { "count": 20 },
            "regular": { "count": 25 },
            "ruim": { "count": 40 },
            "pessimo": { "count": 30 }
        }
    },
    "06": {
        "pergunta": "Você gostou da apresentação do participante x?",
        "obrigatorio": "True",
        "detalhes": {
            "excelente": { "count": 17 },
            "bom": { "count": 22 },
            "regular": { "count": 15 },
            "ruim": { "count": 14 },
            "pessimo": { "count": 16 }
        }
    }
};
