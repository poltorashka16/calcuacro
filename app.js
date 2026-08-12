const COUNTERTOPS = [
  { group: "Однотонные (белый холодный). Черный крафт. Толщина 12 мм", items: [
    ["3670 × 600 мм", 24515], ["3670 × 910 мм", 36022], ["3670 × 1200 мм", 47530], ["3670 × 1840 мм", 69045]
  ]},
  { group: "Однотонные (цветные). Черный крафт.", items: [
    ["3670 × 600 мм", 27316], ["3670 × 910 мм", 40225], ["3670 × 1200 мм", 53133], ["3670 × 1840 мм", 77450]
  ]},
  { group: "Фактурные (каменные, древесные и прочие). Черный крафт.", items: [
    ["3670 × 600 мм", 29083], ["3670 × 910 мм", 42875], ["3670 × 1200 мм", 56666], ["3670 × 1840 мм", 82750],
    ["3050 × 645 мм", 25779], ["3050 × 1300 мм", 48559]
  ]},
  { group: "Фактурные (каменные, древесные и прочие). Белый крафт.", items: [
    ["3670 × 600 мм", 47683], ["3670 × 910 мм", 70775], ["3670 × 1200 мм", 93866], ["3670 × 1840 мм", 138550]
  ]},
  { group: "Antifingerprint (Soft Touch). Черный крафт.", items: [
    ["3050 × 600 мм", 55560], ["3050 × 1300 мм", 108120]
  ]},
  { group: "Antifingerprint (Soft Touch). Цветной крафт.", items: [
    ["3050 × 600 мм", 66775], ["3050 × 1300 мм", 130550]
  ]}
];

const PROCESSING = [
  ["Прямолинейный черновой раскрой (дополнительно)", "м.п.", 280],
  ["Обработка по периметру деталей — фаска R1/R2, шлифовка", "м.п.", 490],
  ["Обработка деталей — фаска R3", "м.п.", 550],
  ["Обработка деталей — фаска R6-R8", "м.п.", 640],
  ["Обработка деталей — фаска 45", "м.п.", 660],
  ["Изготовление плинтуса 50мм в цвет", "м.п.", 2600],
  ["Прямой стык / K-TOP (стяжки в комплекте)", "шт", 3900],
  ["Еврозапил (стяжки в комплекте)", "шт", 4900],
  ["Вырез под мойку / варочную поверхность (накладную)", "шт", 3600],
  ["Прямой стык / K-TOP (стяжки в комплекте)", "шт", 3900],
  ["Вырез под мойку (подстольного монтажа)", "шт", 4600],
  ["Подклейка мойки подстольного монтажа (только нержавейка)", "шт", 5500],
  ["Вырез под смеситель, дозатор, кнопку", "шт", 950],
  ["Барное соединение", "шт", 4900],
  ["Фигурный вырез ЧПУ", "шт", 3000],
  ["Дополнительный вырез по месту", "шт", 1600],
  ["Радиусный угол R6", "шт", 300],
  ["Радиусный угол до R20", "шт", 450],
  ["Радиусный угол до R40", "шт", 650],
  ["Установка футорки м4-м6", "шт", 85],
  ["Гравировка, нанесение изображений, надписей (по запросу)", "см²", 40]
];

const DELIVERY = [
  ["Упаковка в стрейч пленку деталей", "м²", 350],
  ["Упаковка в картон / пузырчатую пленку деталей", "м²", 450],
  ["Жесткая упаковка для столешниц с вырезами", "м²", 1000],
  ["Жесткая упаковка в транспортный короб", "м²", 1500],
  ["Доставка в пределах МКАД до 1 тонны", "шт", 5000],
  ["Доставка 15км от МКАД до 1 тонны", "шт", 10000],
  ["Доставка 50км от МКАД до 1 тонны", "шт", 18000],
  ["Транспортный палет до 4300", "шт", 9800],
  ["Транспортный палет до 3670", "шт", 9000],
  ["Транспортный палет до 3050", "шт", 4700],
  ["Доставка в другой город или регион (считается отдельно)", "шт", 0],
  ["Доставка свыше 1 тонны (считается отдельно)", "шт", 0]
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const money = value =>
  `${Number(value || 0).toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽`;

const decimal = (value, digits = 2) =>
  Number(value || 0).toLocaleString("ru-RU", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });

function createDetailRows() {
  const tbody = $("#productTable6 tbody");
  tbody.innerHTML = Array.from({ length: 13 }, (_, i) => `
    <tr data-detail="${i + 1}">
      <td><strong>Деталь ${i + 1}</strong></td>
      <td><input class="length" type="number" min="0" step="1" placeholder="0" aria-label="Длина детали ${i + 1}"></td>
      <td><input class="width" type="number" min="0" step="1" placeholder="0" aria-label="Ширина детали ${i + 1}"></td>
      <td><input class="quantity" type="number" min="0" step="1" placeholder="0" aria-label="Количество детали ${i + 1}"></td>
      <td class="perimeter">—</td>
      <td class="area">—</td>
    </tr>
  `).join("");
}

function createCountertops() {
  const root = $("#countertopsList");
  root.innerHTML = COUNTERTOPS.map((group, groupIndex) => `
    <div class="catalog-group">
      <div class="catalog-group-title">${group.group}</div>
      ${group.items.map((item, itemIndex) => {
        const id = `countertop-${groupIndex}-${itemIndex}`;
        return `
          <div class="catalog-row" data-countertop data-price="${item[1]}">
            <div class="dimension">${item[0]}</div>
            <input type="number" min="0" step="1" value="" placeholder="0" id="${id}" aria-label="Количество ${item[0]}">
            <div class="unit-price">${money(item[1])} / шт.</div>
            <div class="row-total">0 ₽</div>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");
}

function createServices(targetId, items, type) {
  const root = $(`#${targetId}`);
  root.innerHTML = items.map((item, index) => `
    <div class="service-row" data-service="${type}" data-price="${item[2]}">
      <div class="service-name">${item[0]}</div>
      <div class="service-unit">${item[1]}</div>
      <input type="number" min="0" step="0.01" value="" placeholder="0" aria-label="${item[0]}">
      <div class="service-price">${money(item[2])} / ${item[1]}</div>
      <div class="service-total">0 ₽</div>
    </div>
  `).join("");
}

function calculateDetails() {
  let totalLength = 0;
  let totalWidth = 0;
  let totalQuantity = 0;
  let totalPerimeter = 0;
  let totalArea = 0;

  $$("#productTable6 tbody tr").forEach(row => {
    const length = Number($(".length", row).value) || 0;
    const width = Number($(".width", row).value) || 0;
    const quantity = Number($(".quantity", row).value) || 0;

    if (length > 0 && width > 0 && quantity > 0) {
      const perimeter = 2 * (length + width) * quantity / 1000;
      const area = length * width * quantity / 1000000;

      $(".perimeter", row).textContent = decimal(perimeter);
      $(".area", row).textContent = decimal(area);

      totalPerimeter += perimeter;
      totalArea += area;
      totalLength += length;
      totalWidth += width;
      totalQuantity += quantity;
    } else {
      $(".perimeter", row).textContent = "—";
      $(".area", row).textContent = "—";
    }
  });

  $("#totalLength").textContent = `${decimal(totalLength / 1000)} м`;
  $("#totalWidth").textContent = `${decimal(totalWidth / 1000)} м`;
  $("#totalQuantity").textContent = decimal(totalQuantity, 0);
  $("#totalPerimeter").textContent = decimal(totalPerimeter);
  $("#totalArea").textContent = decimal(totalArea);

  $("#detailsAreaTop").textContent = `${decimal(totalArea)} м²`;

  const thickness = Number($("#thickness").value) || 0;
  const weight = Math.round(totalArea * 1.45 * thickness * 1000) / 1000;
  $("#totalWeight").textContent = `${decimal(weight, 3)} кг`;

  return { totalArea, totalPerimeter, weight };
}

function calculateCountertops() {
  let total = 0;
  $$("[data-countertop]").forEach(row => {
    const quantity = Number($("input", row).value) || 0;
    const price = Number(row.dataset.price) || 0;
    const result = quantity * price;
    $(".row-total", row).textContent = money(result);
    total += result;
  });

  $("#countertopsTotal").textContent = money(total);
  $("#summaryCountertops").textContent = money(total);
  return total;
}

function calculateServices(type) {
  let total = 0;
  $$(`[data-service="${type}"]`).forEach(row => {
    const quantity = Number($("input", row).value) || 0;
    const price = Number(row.dataset.price) || 0;
    const result = quantity * price;
    $(".service-total", row).textContent = money(result);
    total += result;
  });
  return total;
}

function calculateAll() {
  const details = calculateDetails();
  const countertops = calculateCountertops();
  const processing = calculateServices("processing");
  const delivery = calculateServices("delivery");
  const total = countertops + processing + delivery;

  $("#processingTotal").textContent = money(processing);
  $("#deliveryTotal").textContent = money(delivery);

  $("#summaryProcessing").textContent = money(processing);
  $("#summaryDelivery").textContent = money(delivery);
  $("#summaryArea").textContent = `${decimal(details.totalArea)} м²`;
  $("#summaryPerimeter").textContent = `${decimal(details.totalPerimeter)} м.п.`;
  $("#summaryWeight").textContent = `${decimal(details.weight, 3)} кг`;
  $("#overallTotal").textContent = money(total);

  return { total, countertops, processing, delivery, details };
}

function resetCalculator() {
  $$("input").forEach(input => {
    input.value = "";
  });
  calculateAll();
}

function openResult() {
  const result = calculateAll();
  $("#modalTotal").textContent = money(result.total);
  $("#modalDetails").innerHTML = `
    <div><span>Материал столешниц</span><strong>${money(result.countertops)}</strong></div>
    <div><span>Обработка</span><strong>${money(result.processing)}</strong></div>
    <div><span>Упаковка и доставка</span><strong>${money(result.delivery)}</strong></div>
    <div><span>Площадь деталей</span><strong>${decimal(result.details.totalArea)} м²</strong></div>
    <div><span>Вес</span><strong>${decimal(result.details.weight, 3)} кг</strong></div>
  `;
  $("#resultModal").classList.add("is-open");
  $("#resultModal").setAttribute("aria-hidden", "false");
}

function closeResult() {
  $("#resultModal").classList.remove("is-open");
  $("#resultModal").setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  createDetailRows();
  createCountertops();
  createServices("processingList", PROCESSING, "processing");
  createServices("deliveryList", DELIVERY, "delivery");

  document.addEventListener("input", event => {
    if (event.target.matches("input")) calculateAll();
  });

  $("#calculateButton").addEventListener("click", openResult);
  $("#calculateButtonSide").addEventListener("click", openResult);
  $("#resetButton").addEventListener("click", resetCalculator);
  $("#resetButtonBottom").addEventListener("click", resetCalculator);

  $$("[data-close-modal]").forEach(element => {
    element.addEventListener("click", closeResult);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeResult();
  });

  calculateAll();
});
