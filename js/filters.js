(function () {
  var count = 0;
  chrome.storage.sync.get(['coronaOn', 'data'], function (item) {
    var observer = new MutationObserver(function (mutations) {
      if (!item.coronaOn) {
        return;
      }

      var filterArray = [
        '#corona',
        '#coronavirus',
        '#covid',
        '#covid-19',
        '#itscoronatime',
        '#koronavirus',
        '#ncov-19',
        '#pandemic',
        '#stayathome',
        '#stayhome',
        '#virus',
        '2019-cov',
        '2019-ncov',
        '229E',
        'Hcov',
        'N95 respirator',
        'alphacoronavirus',
        'alphacoronaviruses',
        'asymptomatic',
        'bat',
        'bats',
        'bcv',
        'betacoronavirus',
        'betacoronaviruses',
        'bioweapon',
        'bioweapons',
        'birusa',
        'bovine',
        'bronchitis',
        'co-19',
        'corona',
        'coronafirws',
        'coronav',
        'coronaviridae',
        'coronavirinae',
        'coronavirus ',
        'coronaviruses',
        'coronavirusi',
        'coronavirüs',
        'coronavírus',
        'cov',
        'cov-19',
        'covid variant',
        'covid variants',
        'covid',
        'covid-19',
        'covid19 variant',
        'deltacoronavirus',
        'deltacoronaviruses',
        'disease',
        'diseases',
        'epidemic',
        'epidemics',
        'epidemiologic',
        'fayras',
        'fcov',
        'firws',
        'gammacoronavirus',
        'gammacoronaviruses',
        'h-cov',
        'hcu1',
        'herd immunity',
        'huaketo',
        'ibv',
        'igciwane',
        'incertae',
        'incubation period',
        'infection',
        'infections',
        'kachilombo',
        'karantin',
        'karantina',
        'karantine',
        'korona',
        'koronaviirus',
        'koronavirus',
        'koronavirusa',
        'koronavirusas',
        'koronavirusi',
        'koronavírus',
        'koronavírus',
        'koronavīruss',
        'koronawirus',
        'koroonaviirus',
        'kwayar cuta',
        'kórónaveira',
        'mask',
        'maska',
        'masks',
        'mers',
        'mers-cov',
        'msc',
        'ncov-19',
        'nidovirales',
        'nl63',
        'novel strain',
        'oksigjen',
        'omicron variant',
        'omicron',
        'oniro-arun',
        'orthocoronavirinae',
        'outbreak',
        'outbreaks',
        'pandemic',
        'pandemic-induced',
        'patient zero',
        'pneumonia',
        'presymptomatic',
        'quarantine',
        'quarantine',
        'respiratory',
        'riboviria',
        'sads-cov',
        'sars',
        'sars-cov',
        'sars-cov-2',
        'sedis',
        'tcv',
        'tgev',
        'tsimokaretina',
        'vaccinate',
        'vaccinated',
        'vaccination',
        'vaccinations',
        'vaccine',
        'vaccines',
        'vaerase',
        'variant',
        'variants',
        'viirus',
        'viris',
        'virus',
        'virus-induced',
        'virusas',
        'viruses',
        'viruseve',
        'virusi',
        'virüs',
        'víreas',
        'vírus',
        'vīruss',
        'who',
        'wirus',
        'wuhan',
        'εμβολιασμένοι',
        'εμβολιασμένος',
        'εμβολιασμενοι',
        'εμβολιασμενος',
        'εμβολιο',
        'εμβόλιο',
        'ιοί',
        'ιος',
        'ιός',
        'καραντίνα',
        'καραντίνες',
        'κορονοιος',
        'κορονοιός',
        'κορονοϊός',
        'κορωνοιος',
        'κορωνοιός',
        'κορωνοϊός',
        'πανδημία',
        'Вирус',
        'вирус',
        'вирус',
        'вирус',
        'вирус',
        'вирус',
        'вирус',
        'вірус',
        'вірус',
        'коронавирус',
        'коронавирус',
        'коронавирус',
        'коронавирус',
        'коронавирус',
        'коронавирус',
        'коронавирус',
        'коронавірус',
        'коронавірус',
        'կորոնավիրուս',
        'վիրուս',
        'וירוס',
        'נגיף קורונה',
        'كورونا',
        'وائرس',
        'ویروس کرونا',
        'کوروناویرس',
        'कोरोना',
        'कोरोनाभाइरस',
        'कोरोनाव्हायरस',
        'भाइरस',
        'वाइरस',
        'विषाणू',
        'দুষ্ট',
        'ਕੋਰੋਨਾਵਾਇਰਸ',
        'ਵਾਇਰਸ',
        'કોરોનાવાયરસ',
        'વાયરસ',
        'கொரோனா வைரஸ்',
        'வைரஸ்',
        'కరోనా',
        'వైరస్',
        'ಕರೋನವೈರಸ್',
        'ವೈರಸ್',
        'കൊറോണ വൈറസ്',
        'വൈറസ്',
        'කොරෝනා වයිරස්',
        'ไวรัส',
        'ໄວຣັດ',
        'ვირუსი',
        'კორონავირუსი',
        'មេរោគ',
        'មេរោគឆ្លង',
        'ウイルス',
        'コロナウイルス',
        '新冠病毒',
        '新冠病毒',
        '新冠病毒',
        '病毒',
        '病毒',
        '바이러스',
        '코로나 바이러스',
      ];

      mutations.forEach(function (mutation) {
        var newNodes = mutation.addedNodes;
        if (newNodes !== null) {
          if (document.querySelector('.userContentWrapper') == null) {
            //fn
            var nodes = document.querySelectorAll('[role="article"]');
          } else {
            //fo
            var nodes = document.querySelectorAll('.userContentWrapper');
          }
          for (var ii = 0, nn = nodes.length; ii < nn; ii++) {
            var text = nodes[ii] ? nodes[ii].textContent.toLowerCase() : '';
            for (var filterItem in filterArray) {
              if (
                text &&
                text.indexOf(filterArray[filterItem].toLowerCase()) >= 0 &&
                nodes[ii].style.display != 'none'
              ) {
                nodes[ii].style.display = 'none';
                count += 1;
                chrome.runtime.sendMessage({ badgeText: String(count) });
              }
            }
          }
        }
      });
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
      case 'getCount':
        sendResponse(count);
        break;
      default:
        console.error('Unrecognised message: ', message);
    }
    return true;
  });
})();
