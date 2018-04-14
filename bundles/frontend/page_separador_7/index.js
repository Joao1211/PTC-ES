var sendEmail = function() {
    var dados = {
        name: $("#name").val().trim(),
        email: $("#email").val().trim(),
        phone: $("#phone").val().trim(),
        message: $("#message").val().trim()
    };

    //verificar se todos os campos estao preenchidos
    var dadosOK = true;
    for (var i in dados) {
        if (dados[i].length === 0) {
            dadosOK = false;
        }
    }

    if (dadosOK) {
        gt.api.post("Email&debug=1", dados, "enviar", function(res) {
            if (res === "ok") {
                $("#contactForm").find("input").val("");
                $("#message").val("");
                swal("", "Your message has been sent!", "success");
            } else {
                swal("", "There was a failure to send the email. Please try again later!", "error");
            }
        });
    } else {
        swal("", "You have to fill all fields!", "warning");
    }
}