'use strict';

console.log('\'Allo \'Allo! Popup');

$(function() {
  var $group = $('.btn-group');
  var $form = $('form');
  var $_almostAlwaysVisible = $form.find('.almost-always-visible')
  var $_actionInput = $form.find('[name="action"]');
  var $_readOrNot = $form.find('[name="read-or-not"]');
  var $_textInput = $form.find('textarea');
  var $_urlInput = $form.find('input[name="url"]');
  var $_submitButton = $form.find('button');
  var $resolution = $('.resolution');
  var data = {};

  $_readOrNot.on('change', function() {
    var $formGroups = $form.find('.form-group').not('.always-visible').not('.almost-always-visible');
    if ('yes' === $(this).val()) {
      $formGroups.removeClass('hidden');

    } else {
      $formGroups.addClass('hidden');
      $_almostAlwaysVisible.addClass('hidden');
      $_actionInput.val('');
      $group.find('span').removeClass('active');
      $_submitButton.addClass('disabled');
    }
  });




  chrome.tabs.getSelected(function(selected) {
    chrome.tabs.get(selected.id, function(tab) {
      $_urlInput.val(tab.url);

      var _getDomain = function(uri) {
        var parser = document.createElement('a');
        parser.href = uri;

        return parser.hostname;
      }

      // @todo: cache measurements!

      data['domain'] = _getDomain(tab.url);

      // fetch data from another domain with JSONP
      $.getJSON('http://bashmach.koding.io/measurement/take?domain='+_getDomain(tab.url), function(response){

        $resolution.find('.spinner').addClass('hidden');
        $resolution.find('.link').removeClass('hidden').on('click', function() {

          chrome.tabs.create({ url: 'http://bashmach.koding.io/scan/'+response.domain });
        });

        switch (response.temperature) {
          case 'cold':
          case 'danger':
          case 'success':
            $resolution.find('.col-xs-12.'+response.temperature).removeClass('hidden');
            break;
          default:
            $resolution.find('.col-xs-12.unknown').removeClass('hidden');
            break;
        }

        if (false == response.authorized) {
          $('.anonymous-container').removeClass('hidden');
        } else {
          $('.authorized-container').removeClass('hidden');
        }
      });


    });
  });

  $group.on('click', 'span', function() {
    var action;

    $group.find('.active').removeClass('active');
    $(this).addClass('active');
    $_submitButton.removeClass('disabled');

    action = $(this).data('action');

    $_actionInput.val(action);

    if ('none' === action) {
      $_almostAlwaysVisible.addClass('hidden');
    } else {
      $_almostAlwaysVisible.removeClass('hidden');
    }
  });

  $_submitButton.on('click', function() {

    data['url'] = $_urlInput.val();
    data['text'] = $_textInput.val();
    data['action'] = $_actionInput.val();

    $.post(
      'http://bashmach.koding.io/report'
      , data
      , function(response) {
        window.close();
      })
  })
})