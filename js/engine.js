var gt = {
    cache: {
        loadedBundles: {}
    },
    url: {
        /**
         * obter os parametros passados por get
         * @param  {Function} callback
         * @return {array}            array associativo com os valores passados por GET
         */
        getParams: function(callback) {
            var params = window.location.search;

            if (params.length > 0) {
                var s = params.replace("?", "");
                s = s.trim();
                var a = s.split("&");
                var arrayParams = {};

                for (var i in a) {
                    var param = a[i].split("=");
                    arrayParams[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
                }

                if (callback) {
                    // devolver array com os parametros passados por GET
                    callback(arrayParams);
                }

            } else {
                // sem parametros no URL
                if (callback) callback(false);
            }
        }
    },
    setLoaded: function(categoria, pagina) {
        gt.cache.loadedBundles[categoria + pagina] = true;
    },
    isLoaded: function(categoria, pagina) {
        if (typeof gt.cache.loadedBundles[categoria + pagina] !== "undefined") {
            return true;
        } else {
            return false;
        }
    },

    init: function() {
        // MODULES initialization
        gt.load(Config.template, 'page_index', 'body');
        gt.emit('gt-init');
    },

    loadBundleHTML: function(categoria, pagina, callback) {

        $.ajax({
            url: "./bundles/" + categoria + "/" + pagina + "/index.html",
            type: "GET",
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status === 404) {
                    // template não foi encontrado é lido e carregado o template do config.js
                    gt.session.clear();
                    window.location.assign("./");
                }
            },
            success: function(html) {
                if (callback) callback(html);
            }
        });
    },
    loadBundleJS: function(categoria, pagina, callback) {
        // verificamos se o JS do conteudo já não se encontra carregado no browser
        if (gt.isLoaded(categoria, pagina) === false) {
            gt.setLoaded(categoria, pagina);
            $.get("./bundles/" + categoria + "/" + pagina + "/index" + ".js", function(js) {
                if (callback) callback(js);
            }).fail(function() {
                console.warn('[GT-Engine] (' + categoria + '/' + pagina + ') - Help! Couldn\'t load the bundle javascript asked!');
            });
        } else {
            if (callback) callback();
        }
    },
    loadBundleCSS: function(categoria, pagina, callback) {
        $.get("./bundles/" + categoria + "/" + pagina + "/index" + ".css", function(css) {
            cssHTML = css;
            if (callback) callback(cssHTML);
        }).fail(function() {
            console.warn('[GT-Engine] (' + categoria + '/' + pagina + ') - Help! Couldn\'t load the bundle CSS asked!');
        });;
    },
    loadBundle: function(categoria, pagina, callback) {
        // conteudo a colocar no elemento
        // Get the page using jQuery/XHR method
        gt.loadBundleHTML(categoria, pagina, function(html) {
            gt.loadBundleJS(categoria, pagina, function(js) {
                gt.loadBundleCSS(categoria, pagina, function(css) {

                    cssHTML = "<style>" + css + "</style>";

                    // emit event bundle loaded
                    gt.emit("gt-load-bundle", categoria, pagina);

                    if (callback) callback(html + cssHTML);
                });
            });
        });
    },

    load: function(categoria, pagina, destino) {
        gt.loadBundle(categoria, pagina, function(conteudo) {
            $(destino).html(conteudo);
        });
    },

    hide: function(elemento) {
        $(elemento).hide();
        gt.emit('gt-hide', elemento);
    },

    show: function(elemento) {
        $(elemento).show();
        gt.emit('gt-show', elemento);
    },

    api: {
        url: './api/?t=',
        urlSafe: './api/?safe=check',
        post: function(objecto, data, operation, callback) {
            $.post(gt.api.url + objecto + "&op=" + operation, data, function(res) {
                if (callback) callback(res);
            }).fail(function() {
                console.warn('It seems there\'s a problem with the API (' + objecto + ' -> ' + operation + ')');
            });
        },
        get: function(objecto, id, operation, callback) {
            $.get(gt.api.url + objecto + "&op=" + operation + "&id=" + id, function(res) {
                if (callback) callback(res);
            }).fail(function() {
                console.warn('It seems there\'s a problem with the API (' + objecto + ' -> ' + operation + ')');
            });
        },
    },


    emit: function(nomeEvento, parametroEvento1, parametroEvento2) {
        var parametrosEvento = [];

        if (typeof parametroEvento1 !== "undefined") {
            parametrosEvento.push(parametroEvento1);
        }

        if (typeof parametroEvento2 !== "undefined") {
            parametrosEvento.push(parametroEvento2)
        }

        $("body").trigger(nomeEvento, parametrosEvento);
    },

    on: function(nomeEvento, callback) {
        $("body").off(nomeEvento).on(nomeEvento, function(objecto, param1, param2) {
            if (callback) callback(param1, param2);
        });
    }
};