var Quiz = function() {
    var that = this;

    this.arrayInfo = {
        exercicio_1: {
            progresso: 0
        },
        exercicio_2: {
            progresso: 0
        },
        exercicio_3: {
            progresso: 0
        },
        exercicio_4: {
            progresso: 0
        },
    }

    this.create = function() {
        //Function create
    };
    this.read = function(exercicio) {
        gt.hide("[data-painel-exercicios]");
        gt.hide("[data-exercicio]");
        gt.show("[data-exercicio='" + exercicio + "']");
        $("[data-exercicio='" + exercicio + "']").attr("data-exercicio-ativo", "");
        $("[data-progresso-exercicio]").html("1/4");
    };
    this.update = function() {
        var exercicio = $("[data-exercicio-ativo]").data("exercicio");
        console.log(exercicio)
        console.log(that.arrayInfo["exercicio_" + exercicio]["progresso"]);
        if (that.arrayInfo["exercicio_" + exercicio].progresso != 100) {
            that.arrayInfo["exercicio_" + exercicio].progresso += 25;
        } else {
            that.arrayInfo["exercicio_" + exercicio].progresso = that.arrayInfo["exercicio_" + exercicio].progresso;
        }

        $("[data-btn-exercicio=" + exercicio + "]").find("h4").html(that.arrayInfo["exercicio_" + exercicio].progresso + "%");
        $("[data-btn-exercicio=" + exercicio + "]").find("[data-progress-bar]").attr("aria-valuenow", that.arrayInfo["exercicio_" + exercicio].progresso);
        $("[data-btn-exercicio=" + exercicio + "]").find("[data-progress-bar]").attr("style", "width: " + that.arrayInfo["exercicio_" + exercicio].progresso + "%; height: 5px;");
    };
    this.getExercises = function(categoria, passo) {
        //Here we are going go get and print in the monitor the exercise
    }
    this.renderExercise = function() {
        //Here we are going to build the HTML with the exercise info
    };
    this.setup = function() {
        $("[data-btn-exercicio]").on("click", function() {
            var exercicio = $(this).data("btn-exercicio");
            that.read(exercicio);
        });
        $("[data-info-passo]").on("click", function() {
            if ($(this).data("info-passo") == "correto") {
                gt.show("[data-proximo-passo]");
                $(this).addClass("rightAnswer");
            } else {
                $(this).addClass("wrongAnswer");
            }
        });
        $("[data-proximo-passo]").on("click", function() {
            var exercicio = $("[data-passo-ativo]").data("passo-exercicio");
            if (exercicio != 4) {
                $("[data-progresso-exercicio]").html((exercicio + 1) + "/4");
                $("[data-passo-exercicio=" + exercicio + "]").removeAttr("data-passo-ativo");
                $("[data-passo-exercicio=" + (exercicio + 1) + "]").attr("data-passo-ativo", "");
                gt.hide("[data-passo-exercicio=" + exercicio + "]");
                gt.show("[data-passo-exercicio=" + (exercicio + 1) + "]");
                gt.hide("[data-proximo-passo]");
            } else {
                $("[data-exercicio]").html("\n" +
                    "<h1 class='text-center'>You have finish this quest! Well done son!</h1>");
                gt.show("[data-voltar]");
            }
            that.update();
        });
        $("[data-voltar]").on("click", function() {
            gt.hide("[data-exercicio]");
            gt.hide("[data-voltar]");
            gt.show("[data-painel-exercicios]");
        });
    };
    this.start = function() {
        that.setup();
    };
    that.start();
};
var quiz;
gt.start("backoffice/separador_exercicio", function() {
    quiz = new Quiz();
})