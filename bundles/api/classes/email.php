<?php
namespace GTEngine;
require_once(dirname(__FILE__) . "/conf_email.php");
 class Email extends GT_API_CRUD {
    public function enviar() {
        if (isPost(['name', 'email', 'phone', 'message'])) {
            //Envio de email para a Empresa
            $nomeRemetente = $_POST['email'];

            $assunto = 'New email!';
            //Texto da mensagem
            $corpoHTML = '
                    <h2>New email from template</h2>
                    <h3>Name: <span style="font-size:12px">'.$_POST['name'].'</span></h3>
                    <h3>Email: <span style="font-size:12px">'.$_POST['email'].'</span></h3>
                    <h3>Phone number: <span style="font-size:12px">'.$_POST['phone'].'</span></h3>
                    <h4>Message:</h4>
                    <p>'.$_POST['message'].'</p>';
            if (email($GLOBALS['CONFIG_EMAIL']['utilizador_email'], $nomeRemetente, $GLOBALS['email_administracao'], $assunto, $corpoHTML, $corpoHTML, null, null)){
                json("ok");
            }else{
                json("erro_enviar_email");
            }
        }else{
            json("erro_funcao_enviar");
        }
    }
}