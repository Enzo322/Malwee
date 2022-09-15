//-------------------------links-----------------------------------
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3005;
const md5 = require('md5');
const http = require('http');
const jwt = require('jsonwebtoken');
//-------------------------Conexão------------------------------------


const execSQL = (sql) => {
    
    
    return new Promise((resolve, reject) => {
        const con = require('./conection').connect();
    
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


app.post('/login', async (req, res) => {

    const con = require('./conection').connect();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })

    const name  = req.body.name;
    const senha = md5(req.body.senha);
  
    const sql    = `SELECT * FROM USER WHERE NAME = '${name}' AND SENHA = '${senha}' AND STATUS = 1 `
    const result =  await execSQL(sql);
  
    if (result == undefined || result.length == 0){
      res.status(500).json({message: 'Login inválido!'});
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


//-------------------------servidor--------------------------- 
app.use(bodyParser.json());

/*app.get('/users', (req,res)=>{
    res.sendFile(path.join(__dirname + '/Login.html'));
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname + '/Cadastro.html'));
    
});*/

app.get('/users', (req,res)=>{//select
    const con = require('./conection').connect();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    con.query ('select * from Usuario', function(err,result){
        res.send(result);
        if(err){
            throw err;
        }
    });
});

app.post('/users', (req,res)=>{//insert
    const con = require('./conection').connect();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    let name = req.body.name;
    let cpf = req.body.cpf;
    let status = req.body.status;
    let senha = md5(req.body.senha);

    con.query ("insert into Usuario (name, cpf, status, senha) values ("+name+"','"
    +cpf+"',"+status+",'"+senha+"')", function(err,result){
        res.send(result);
        console.log("FOI!");

        if(err){
            throw err;
        }
    });
    console.log(req.body);
    
});

app.delete('/users',(req,res)=>{//delete
    const con = require('./conection').connect();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })
    con.query("delete from Usuario where idUsuario = "+req.body.idUsuario,function(err,result){
        res.send(result);
        if(err){
            throw err;
        }
    });
});

app.put('/users',(req,res)=>{//update
    const con = require('./conection').connect();

    con.connect((error) => {
        if (error){
            res.json({error : true}); 
            console.error(error);
            return;
        }
    })

    con.query('update Usuario set status = '+req.body.status+' where idUsuario = '+req.body.idUsuario,function(err,result){
        res.send(result);
        if(err){
            throw err;
        }
    });
});

app.patch('/users',(req,res)=>{
    //patch
})

app.listen(port, () =>{

    console.log(`Exemplo app listening na porta ${port}`);
})