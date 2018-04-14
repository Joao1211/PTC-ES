# Template Agency para o GTEngine

##### Criado por João Cunha

## Envio de email

No ficheiro: `api/classes/email.php`

#### Alterar apenas as variaveis:

`$assunto` - Texto a aparecer como assunto;

`$corpoHTML` - Formatação HTML para aparecer como texto do email

## Configuração do email

No ficheiro: `config/bundle_cfg.php`

#### Alterar apenas as variaveis:
No array `$CONFIG_EMAIL` alterar:

`"servidor_email"` - Para alterar o servidor;

`"protocolo_email"` - Para alterar o protocolo;

`"porta_email"` - Para alterar a porta;

`"utilizador_email"` - Para alterar o email de envio;

`"password_email"` - Para alterar a password do email de envio;

Exemplo:

`$CONFIG_EMAIL = array(
            "servidor_email" => "smtp.gmail.com",
            "protocolo_email" => "ssl",
            "porta_email" => "465",
            "utilizador_email" => "goldycentralteste@gmail.com",
            "password_email" => "central1234"
);`

No ficheiro: `api/classes/conf_email.php`

#### Alterar apenas a variavel:

`$email_administracao` - Email para quem vai ser enviado email.