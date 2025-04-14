import { Serie } from './series.js';
import { series } from './data.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
let seriesDetails: HTMLElement = document.getElementById('details')!;

renderSeriesInTable(series);
renderAverageSeasons(series);

seriesTbody.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const row = target.closest('tr');
    if (row) {
        const serieId = row.firstElementChild?.textContent;
        const serie = series.find(s => s.id.toString() === serieId);
        if (serie) {
             renderSerieDetails(serie);
        }
    }
});

function renderSeriesInTable(series: Serie[]) {
    series.forEach((serie) => {
        let trElement = document.createElement("tr");
        trElement.classList.add("table-active");
        trElement.innerHTML = `<td scope="row">${serie.id}</td>
                                <td>${serie.name}</td>
                                <td>${serie.channel}</td>
                                <td>${serie.seasons}</td>`;
        seriesTbody.appendChild(trElement);
    });
}

function renderAverageSeasons(series: Serie[]) {
    let totalSeasons = 0;
    let trElement = document.createElement("tr");
    series.forEach((serie) => {
        totalSeasons += serie.seasons;
    });
    let averageSeasons = totalSeasons / series.length;
    trElement.innerHTML = `<td colspan="3">Seasons average: ${averageSeasons}</td>`;
    seriesTbody.appendChild(trElement);
}

function renderSerieDetails(serie: Serie) {
    seriesDetails.innerHTML = `<img src="${serie.image}" alt="${serie.name}" class="img-fluid">
                                <h3>${serie.name}</h3>
                                <p>${serie.description}</p>
                                <a href="${serie.link}" target="_blank">${serie.link}</a>`;
}