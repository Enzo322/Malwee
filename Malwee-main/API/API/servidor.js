//-------------------------links-----------------------------------
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3005;
const md5 = require('md5');
const http = require('http');
const jwt = require('jsonwebtoken');
const cors = require('cors');
//-------------------------Conexão------------------------------------

app.use(bodyParser.json());
const corsOption = {
    origin : '*',
    optionsSuccessStatus : 200
}
app.use(cors(corsOption));

const execSQL = (sql) => {
    
    
    return new Promise((resolve, reject) => {
        const con = require('./conection').con();
    
        con.connect((error) => {
            if (error){
                reject(error);
                return;
            }
                   
            con.query(sql, (error, result) => {
                if (error){
                    reject(error);
                    return;
                }
                
                con.destroy();
                resolve(result);
            })
        })
    })
}
function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).end();
    
    req.cpf = decoded.cpf
    next()
})}
//---------------------login-----------------
app.get('/login', (req,res)=>{//select login
    const con = require('./conection').con();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    con.query ('select * from usuario', function(err,result){
        res.send(result);
        if(err){
            throw err;
        }
    });
});


app.post('/users', (req,res)=>{//insert login
    const con = require('./conection').con();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    let cpf = req.body.cpf;
    let senha = md5(req.body.senha);

con.query (`insert into usuario (cpf, senha) values ('${cpf}','${senha}')`, function(err,result){
        res.send(result);
        console.log("FOI!");

        if(err){
            throw err;
        }
    });
    console.log(req.body);
    
});


app.post('/login', async (req, res) => {//token login

    const con = require('./conection').con();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })

    const cpf  = req.body.cpf;
    const senha = md5(req.body.senha);

    const sql    = `SELECT * FROM USUARIO WHERE CPF = '${cpf}' AND senha = '${senha}'`
    const result =  await execSQL(sql);
    console.log('SQL: '+sql);
    console.log('result: '+result);
    if (result == undefined || result.length == 0){
      res.status(500).json({message: 'login inválido!'});
      return;
    }
  
    const id = result[0].idUsuario;
    const token = jwt.sign({ id }, '1234', {
        expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
});

    app.post('/logout', function(req, res) {
        res.json({ auth: false, token: null });
});


//-------------------------contatos--------------------------- 


/*app.get('/users', (req,res)=>{
    res.sendFile(path.join(__dirname + '/Login.html'));
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + '/Cadastro.html'));
    
});*/

app.get('/contatos', (req,res)=>{//select contatos
    const con = require('./conection').con();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    con.query ('select * from contatos', function(err,result){
        res.send(result);
        if(err){
            throw err;
        }
    });
});



app.post('/contatos', (req,res)=>{//insert contato
    const con = require('./conection').con();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    let nome = req.body.nome;
    let tel = req.body.telefone;

con.query (`insert into contatos (nome, telefone) values ('${nome}','${tel}')`, function(err,result){
        res.send(result);
        console.log("FOI!");

        if(err){
            throw err;
        }
    });
    console.log(req.body);
    
});

app.post('/delete',(req,res)=>{//delete
    const con = require('./conection').con();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    con.query("delete from contatos where idcontatos = "+req.body.idcontatos,function(err,result){
        res.send(result);
        if(err){
            throw err;
        }
    });
});

app.put('/contatos',(req,res)=>{//update
    const con = require('./conection').con();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })

    con.query('update contatos set tel = '+req.body.tel+' where idContatos = '+req.body.idContatos,function(err,result){
        res.send(result);
        if(err){
            throw err;
        }
    });
});

app.listen(port, () =>{

    console.log(`Exemplo app listening na porta ${port}`);
})