let header = {
    "typ": "JWT",
    "alg": "HS256"
}

header = JSON.stringify(header);
header = Buffer.from(header).toString('base64');

let payload = [
    iss = 'omundoedos.net',
    iat = new Date().toLocaleString(),
    exp = new Date().setMinutes(60).toLocaleString(),
    acl = ['coordenador', 'participante'],
    username = 'Thiago Adriano',
    email = 'tadriano.net@gmail.com'
];

payload = JSON.stringify(payload);
payload = Buffer.from(payload).toString('base64');

console.log(header+payload)