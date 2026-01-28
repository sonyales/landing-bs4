import $ from "jquery";

window.$ = $;
window.jQuery = $;

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "../scss/app.scss";
  $(function () {
    $('.button_more').on('click', function () {
      $('#forWhom')[0].scrollIntoView();
  })

  $('.paint_button').on('click', function() {
    $('.panel-menu').toggle()
    $(this).toggleClass('is-open');
  })

// рассчет валюты
  const RATE = 70; // стоимость доллара по условию

  function getNumber($el) {
    return parseInt($el.text().replace(/\D/g, ''), 10) || 0;
  }

  function formatPrice(value, currency) {
    return value.toLocaleString('ru-RU') + ' ' + currency;
  }

  // 1) Сохраняем базовые рубли для каждой карточки отдельно + ставим стартовое состояние
  $('.pricing-card').each(function () {
    const $card = $(this);

    const $sale = $card.find('.sale-price');
    const $oldS = $card.find('.sale-old-price s');

    $sale.data('rub', getNumber($sale));
    $oldS.data('rub', getNumber($oldS));

    // старт: рубли
    $card.find('.button_rubles').addClass('active');
    $card.find('.button_dollar').removeClass('active');
  });

  // 2) ₽ в конкретной карточке
  $(document).on('click', '.pricing-card .button_rubles', function () {
    const $card = $(this).closest('.pricing-card');

    const $sale = $card.find('.sale-price');
    const $oldS = $card.find('.sale-old-price s');

    $sale.text(formatPrice($sale.data('rub'), '₽'));
    $oldS.text(formatPrice($oldS.data('rub'), '₽'));

    $card.find('.button_rubles').addClass('active');
    $card.find('.button_dollar').removeClass('active');
  });

  // 3) $ в конкретной карточке
  $(document).on('click', '.pricing-card .button_dollar', function () {
    const $card = $(this).closest('.pricing-card');

    const $sale = $card.find('.sale-price');
    const $oldS = $card.find('.sale-old-price s');

    const usdSale = Math.round($sale.data('rub') / RATE);
    const usdOld  = Math.round($oldS.data('rub') / RATE);

    $sale.text(formatPrice(usdSale, '$'));
    $oldS.text(formatPrice(usdOld, '$'));

    $card.find('.button_dollar').addClass('active');
    $card.find('.button_rubles').removeClass('active');
  });
});
