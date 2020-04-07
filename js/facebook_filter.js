(function () {
    var count = 0;
    chrome.storage.sync.get(['coronaOn', 'data'], function (item) {
        var observer = new MutationObserver(function (mutations) {
            if (!item.coronaOn) {
                return;
            }

            var filterArray = [
                "2020",
                "αγγελιες",
                "give",
                "stemfa",
                "vourbawdyra",
                "ggedco",
                "ldverseve",
                "nomousderive",
                "typepast",
                "tiredsed",
                "ateawe",
                "someb",
                "reathe",
                "obnoxio",
                "uspow",
                "dercute",
                "cautiousunh",
                "ealth",
                "ysnatchs",
                "oarlonely",
                "funnyboundar",
                "yunhealthy",
                "cheerfulbread",
                "drinktartst",
                "ressult",
                "ratinspin",
                "painfulsta",
                "temen",
                "tscrawny",
                "boxtinh",
                "umnotebookd",
                "omineeringpa",
                "inbookslistcirc",
                "letric",
                "kadvertis",
                "ementnotic",
                "eplausi",
                "bleco",
                "ughhandl",
                "estring",
                "perishclot",
                "hechairsc",
                "easekn",
                "eelkickla",
                "tesquaresink",
                "awakes",
                "paceflam",
                "esteadfas",
                "tmalic",
                "iousrenewk",
                "nowledg",
                "eablefal",
                "lcrydesig",
                "ndizzyorder",
                "hewcom",
                "petitio",
                "nindustrio",
                "uscorre",
                "sponhear",
                "tbreakin",
                "gscreamres",
                "elloffset",
                "plainflath",
                "orsesgulli",
                "blerubharsh",
                "noncha",
                "lantright",
                "fultearfule",
                "xpandden",
                "ymagical",
                "routeexist",
                "strayplodas",
                "sortedclouds",
                "elasticinscri",
                "beproduce",
                "superterri",
                "toryrealizelo",
                "udimpea",
                "chvoiceb",
                "asketforgetf",
                "ulnippye",
                "xample",
                "earkeynon",
                "descriptbrig",
                "htsuddenli",
                "pdependovenfo",
                "amyhypnoti",
                "zebetopineum",
                "brellas",
                "cabmessy",
                "zebraget",
                "existenc",
                "edegreetripin",
                "credibl",
                "efrighte",
                "ntasteex",
                "changeho",
                "useshumo",
                "rorganize",
                "lighthushedha",
                "tchdealgustyarc",
                "hideafixrur",
                "alvoic",
                "eless"
            ];

            mutations.forEach(function (mutation) {
                var newNodes = mutation.addedNodes;
                if (newNodes !== null) {
                    if (document.querySelector('.userContentWrapper') == null) { //if facebook new
                        var nodes = document.querySelectorAll('[role="article"]');
                    }
                    else {  //if facebook old
                        var nodes = document.querySelectorAll('.userContentWrapper');
                    }
                    for (var ii = 0, nn = nodes.length; ii < nn; ii++) {
                        var text = nodes[ii] ? nodes[ii].textContent.toLowerCase() : '';
                        // filterArray are the keywords
                        for (var filterItem in filterArray) {
                            if (text && text.indexOf(filterArray[filterItem].toLowerCase()) >= 0 && nodes[ii].style.display != 'none') {
                                nodes[ii].style.display = 'none';
                                count += 1;
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
