const express = require('express');
const cors = require('cors');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

app.get('/', function(req, res){
    res.send('Olá, mundo!')
});

app.post('/servicos', async(req, res)=>{
    await servico.create(req.body).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/clientes', async(req, res)=>{
    await cliente.create({
        nome: 'Haron Tavares',
        endereco: 'Rua Martin Afonso',
        cidade: 'Maringá',
        uf: 'PR',
        nascimento: "09/02/2001",
        clienteDesde: "06/01/2022"
    });
    res.send('Cliente criado com sucesso!')
});

app.get('/pedidos', async(req, res)=>{
    await pedido.create({
        data: "06/01/2022",
        ClienteId: 3
    });
    res.send("Pedido criado com sucesso!")
})

app.get('/itempedidos', async(req, res)=>{
    await itempedido.create({
        PedidoId: 6,
        ServicoId: 1,
        quantidade: 3,
        valor: 258.00
    })
    res.send("Item criado com sucesso!")
})

let port = process.env.PORT || 3001;

app.listen(port,(req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
});