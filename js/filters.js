(function () {
    var count = 0;
    chrome.storage.sync.get(['coronaOn', 'data'], function (item) {
        var observer = new MutationObserver(function (mutations) {
            if (!item.coronaOn) {
                return;
            }

            var filterArray = [
                "wuhan",
                "coronavirus ",
                "coronaviruses",
                "sars-cov",
                "sars-cov-2",
                "2019-ncov",
                "2019-cov",
                "koronavirus",
                "virus",
                "viruses",
                "alphacoronavirus",
                "who",
                "bat",
                "bats",
                "infection",
                "infections",
                "epidemics",
                "epidemiologic",
                "disease",
                "diseases",
                "msc",
                "quarantine",
                "quarantine",
                "pandemic-induced",
                "virus-induced",
                "nidovirales",
                "incertae",
                "sedis",
                "229E",
                "Hcov",
                "nl63",
                "hcu1",
                "mers-cov",
                "sads-cov",
                "tcv",
                "cov",
                "bcv",
                "fcov",
                "coronavirinae",
                "coronaviridae",
                "orthocoronavirinae",
                "corona",
                "korona",
                "coronav",
                "covid",
                "covid-19",
                "co-19",
                "cov-19",
                "ncov-19",
                "h-cov",
                "mers",
                "sars",
                "tgev",
                "ibv",
                "bronchitis",
                "respiratory",
                "bovine",
                "pneumonia",
                "#coronavirus",
                "#covid-19",
                "#ncov-19",
                "#stayathome",
                "#stayhome",
                "#virus",
                "#corona",
                "#itscoronatime",
                "#koronavirus",
                "#pandemic",
                "#covid",
                "κορονοϊός",
                "κορωνοϊός",
                "κορονοιος",
                "κορωνοιος",
                "κορονοιός",
                "κορωνοιός",
                "πανδημία",
                "καραντίνα",
                "καραντίνες",
                "ιος",
                "ιός",
                "ιοί",
                "koronavirusi",
                "coronavirusi",
                "maska",
                "virusi",
                "viruseve",
                "karantine",
                "karantin",
                "karantina",
                "oksigjen",
                "كورونا",
                "коронавірус",
                "коронавирус",
                "coronafirws",
                "koroonaviirus",
                "ویروس کرونا",
                "koronaviirus",
                "કોરોનાવાયરસ",
                "कोरोना",
                "koronavirusa",
                "koronavírus",
                "կորոնավիրուս",
                "kórónaveira",
                "נגיף קורונה",
                "コロナウイルス",
                "კორონავირუსი",
                "outbreak",
                "outbreaks",
                "pandemic",
                "mask",
                "masks",
                "bioweapon",
                "bioweapons",
                "epidemic",
                "коронавирус",
                "មេរោគឆ្លង",
                "ಕರೋನವೈರಸ್",
                "코로나 바이러스",
                "alphacoronaviruses",
                "betacoronavirus",
                "betacoronaviruses",
                "gammacoronavirus",
                "gammacoronaviruses",
                "deltacoronavirus",
                "deltacoronaviruses",
                "vaccine",
                "vaccines",
                "vaccination",
                "vaccinations",
                "riboviria",
                "koronavirusas",
                "koronavīruss",
                "коронавирус",
                "കൊറോണ വൈറസ്",
                "коронавирус",
                "कोरोनाव्हायरस",
                "कोरोनाभाइरस",
                "ਕੋਰੋਨਾਵਾਇਰਸ",
                "koronawirus",
                "coronavírus",
                "коронавирус",
                "කොරෝනා වයිරස්",
                "koronavírus",
                "коронавирус",
                "கொரோனா வைரஸ்",
                "కరోనా",
                "коронавирус",
                "coronavirüs",
                "коронавірус",
                "کوروناویرس",
                "oniro-arun",
                "新冠病毒",
                "新冠病毒",
                "新冠病毒",
                "вірус",
                "вирус",
                "দুষ্ট",
                "firws",
                "viirus",
                "birusa",
                "víreas",
                "વાયરસ",
                "kwayar cuta",
                "वाइरस",
                "viris",
                "vírus",
                "վիրուս",
                "וירוס",
                "ウイルス",
                "ვირუსი",
                "Вирус",
                "មេរោគ",
                "ವೈರಸ್",
                "바이러스",
                "ໄວຣັດ",
                "virusas",
                "vīruss",
                "tsimokaretina",
                "huaketo",
                "вирус",
                "വൈറസ്",
                "вирус",
                "विषाणू",
                "भाइरस",
                "kachilombo",
                "ਵਾਇਰਸ",
                "wirus",
                "вирус",
                "fayras",
                "вирус",
                "vaerase",
                "வைரஸ்",
                "వైరస్",
                "вирус",
                "ไวรัส",
                "virüs",
                "вірус",
                "وائرس",
                "病毒",
                "病毒",
                "igciwane"
            ];

            mutations.forEach(function (mutation) {
                var newNodes = mutation.addedNodes;
                if (newNodes !== null) {
                    if (document.querySelector('.userContentWrapper') == null) { //fn
                        var nodes = document.querySelectorAll('[role="article"]');
                    }
                    else {  //fo
                        var nodes = document.querySelectorAll('.userContentWrapper');
                    }
                    for (var ii = 0, nn = nodes.length; ii < nn; ii++) {
                        var text = nodes[ii] ? nodes[ii].textContent.toLowerCase() : '';
                        for (var filterItem in filterArray) {
                            if (text && text.indexOf(filterArray[filterItem].toLowerCase()) >= 0 && nodes[ii].style.display != 'none') {
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


    chrome.runtime.onMessage.addListener(
        function (message, sender, sendResponse) {
            switch (message.type) {
                case "getCount":
                    sendResponse(count);
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
            return true;
        }
    );

})();
