const express = require('express');
const cors = require('cors');

const { Sequelize } = require('./models');

const models = require('./models');
const { Promise } = require('sequelize');
// const { get } = require('express/lib/response');
// const req = require('express/lib/request');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let itemcompra = models.ItemCompra;
let compra = models.Compra;
let produto = models.Produto;

app.get('/', function (req, res) {
    res.send('Olá, mundo!')
});

//Clientes

app.post('/clientes', async (req, res) => {
    await cliente.create(req.body).then(function () {
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/listaclientes', async (req, res) => {
    await cliente.findAll({
        raw: true
        // order: [['nascimento', "ASC"]]
    }).then(function (clientes) {
        res.json({ clientes })
    });
});

app.get('/quantclientes', async (req, res) => {
    await cliente.count('id').then(function (clientes) {
        res.json({ clientes })
    });
});

app.get('/cliente/:id', async (req, res) => {
    await cliente.findAll({
        where: { id: req.params.id }
    })
        .then(client => {
            return res.json({
                error: false,
                client
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível conectar!"
            });
        });
});

app.get('/cliente/:id/pedidos', async (req, res) => {
    await pedido.findAll({
        where: { ClienteId: req.params.id }
    })
        .then(pedido => {
            return res.json({
                error: false,
                pedido
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível conectar!"
            });
        });
});

app.put('/atualizacliente', async (req, res) => {
    await cliente.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Cliente foi alterado com sucesso!"
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });
});

app.get('/excluircliente/:id', async (req, res) => {
    await cliente.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Cliente foi excluído com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});

//Pedidos

app.post('/pedidos', async (req, res) => {
    await pedido.create(req.body).then(function () {
        return res.json({
            error: false,
            message: "Pedido criado com sucesso"
        })
    }).catch(function () {
        return res.json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/listapedidos', async (req, res) => {
    await pedido.findAll({
        raw: true
        // order: [['nascimento', "ASC"]]
    }).then(function (pedidos) {
        res.json({ pedidos })
    });
});

app.get('/quantpedidos', async (req, res) => {
    await pedido.count('id').then(function (pedidos) {
        res.json({ pedidos })
    });
});

app.get('/pedidos/:id', async (req, res) => {
    await pedido.findByPk(req.params.id, { include: [{ all: true }] })
        .then(ped => {
            return res.json({ ped });
        });
});

app.get('/pedido/:id/pedidos', async (req, res) => {
    await itempedido.findAll({
        where: { PedidoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível conectar!"
            });
        });
});

app.put('/atualizapedido', async (req, res) => {
    await pedido.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Pedido foi alterado com sucesso!"
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do pedido."
        });
    });
});

app.get('/excluirpedido/:id', async (req, res) => {
    await pedido.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Pedido foi excluído com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o pedido."
        });
    });
});

//Servicos

app.post('/servicos', async (req, res) => {
    await servico.create(req.body).then(function () {
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/listaservicos', async (req, res) => {
    await servico.findAll({
        raw: true
        // order: [['nome', 'ASC']]  
    }).then(function (servicos) {
        res.json({ servicos })
    });
});

app.get('/ofertaservicos', async (req, res) => {
    await servico.count('id').then(function (servicos) {
        res.json({ servicos })
    });
});

app.get('/servico/:id', async (req, res) => {
    await servico.findByPk(req.params.id).then(serv => {
        return res.json({
            error: false,
            serv
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível conectar!"
        });
    });
});

app.get('/servico/:id/pedidos', async (req, res) => {
    await itempedido.findAll({
        where: { ServicoId: req.params.id }
    })
        .then(item => {
            return res.json({
                error: false,
                item
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível conectar!"
            });
        });
});

app.put('/atualizaservico', async (req, res) => {
    await servico.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do serviço."
        });
    });
});

app.get('/excluirservico/:id', async (req, res) => {
    await servico.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Serviço foi excluído com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o serviço."
        });
    });
});

//Item Pedidos

app.post('/itempedidos', async (req, res) => {
    await itempedido.create(req.body).then(function () {
        return res.json({
            error: false,
            message: "Item criado com sucesso!"
        })
    }).catch(function () {
        return res.json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/listaitempedidos', async (req, res) => {
    await itempedido.findAll({
        raw: true
        // order: [['nascimento', "ASC"]]
    }).then(function (itempedidos) {
        res.json({ itempedidos })
    });
});

app.get('/quantitempedidos', async (req, res) => {
    await itempedido.count('id').then(function (itempedidos) {
        res.json({ itempedidos })
    });
});

app.get('/pedidos/:id/itempedidos', async (req, res) => {
    await itempedido.findAll({ where: { PedidoId: req.params.id }, include: [{ all: true }] })
        .then(itemped => {
            return res.json({ itemped });
        });
});

app.get('/itempedido/:id/pedido', async (req, res) => {
    await pedido.findAll({
        where: { id: req.params.id }
    })
        .then(pedido => {
            return res.json({
                error: false,
                pedido
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível conectar!"
            });
        });
});

app.get('/itempedido/:id/servico', async (req, res) => {
    await servico.findAll({
        where: { id: req.params.id }
    })
        .then(servico => {
            return res.json({
                error: false,
                servico
            });
        }).catch(erro => {
            return res.status(400).json({
                error: true,
                message: "Erro: não foi possível conectar!"
            });
        });
});

app.put('/pedidos/:id/atualizaitem', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await pedido.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Pedido não foi encontrado.'
        });
    };

    if (!await servico.findByPk(req.body.ServicoId)) {
        return res.status(400).json({
            error: true,
            message: 'Serviço não foi encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ ServicoId: req.body.ServicoId },
            { PedidoId: req.params.id })
    }).then(itens => {
        return res.json({
            error: false,
            message: "Item foi alterado com sucesso!",
            itens
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.get('/pedido/:idPed/servico/:idServ/excluiritempedido', async (req, res) => {
    await itempedido.destroy({
        where: Sequelize.and({ PedidoId: req.params.idPed },
            { ServicoId: req.params.idServ })
    }).then(() => {
        return res.json({
            error: false,
            message: "Item foi excluído com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o item."
        });
    });
});

//Compras

app.post('/compras', async (req, res) => {
    await compra.create(req.body).then(function () {
        return res.json({
            error: false,
            message: "Compra criada com sucesso!"
        })
    }).catch(function () {
        return res.json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/listacompras', async (req, res) => {
    await compra.findAll({
        raw: true
    }).then(function (compras) {
        res.json({ compras })
    });
});

app.get('/quantcompras', async (req, res) => {
    await compra.count('id').then(function (compras) {
        res.json({ compras })
    });
});

app.get('/compras/:id', async (req, res) => {
    await compra.findByPk(req.params.id, { include: [{ all: true }] })
        .then(comp => {
            return res.json({ comp });
        });
});

app.put('/atualizacompra', async (req, res) => {
    await compra.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Compra foi alterada com sucesso!"
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração da compra."
        });
    });
});

app.get('/excluircompra/:id', async (req, res) => {
    await compra.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Compra foi excluída com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a compra."
        });
    });
});

//Produtos

app.post('/produtos', async (req, res) => {
    await produto.create(req.body).then(function () {
        return res.json({
            error: false,
            message: "Produto criado com sucesso!"
        })
    }).catch(function (erro) {
        return res.status(400).json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/listaprodutos', async (req, res) => {
    await produto.findAll({
        raw: true
    }).then(function (produtos) {
        res.json({ produtos })
    });
});

app.get('/ofertaprodutos', async (req, res) => {
    await produto.count('id').then(function (produtos) {
        res.json({ produtos })
    });
});

app.get('/produto/:id', async (req, res) => {
    await produto.findByPk(req.params.id).then(prod => {
        return res.json({
            error: false,
            prod
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível conectar!"
        });
    });
});

app.put('/atualizaproduto', async (req, res) => {
    await produto.update(req.body, {
        where: { id: req.body.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Produto foi alterado com sucesso!"
        });
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do produto."
        });
    });
});

app.get('/excluirproduto/:id', async (req, res) => {
    await produto.destroy({
        where: { id: req.params.id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Produto foi excluído com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o produto."
        });
    });
});

//Item Compras

app.post('/itemcompras', async (req, res) => {
    await itemcompra.create(req.body).then(function () {
        return res.json({
            error: false,
            messagem: "Item criado com sucesso!"
        })
    }).catch(function () {
        return res.json({
            error: true,
            message: "Foi impossível se conectar."
        })
    });
});

app.get('/listaitemcompras', async (req, res) => {
    await itemcompra.findAll({
        raw: true
    }).then(function (itempedidos) {
        res.json({ itempedidos })
    });
});

app.get('/quantitemcompras', async (req, res) => {
    await itemcompra.count('id').then(function (itemcompras) {
        res.json({ itemcompras })
    });
});

app.get('/compras/:id/itemcompras', async (req, res) => {
    await itemcompra.findAll({ where: { CompraId: req.params.id }, include: [{ all: true }] })
        .then(itemcomp => {
            return res.json({ itemcomp });
        });
});

app.put('/compras/:id/atualizaitem', async (req, res) => {
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if (!await compra.findByPk(req.params.id)) {
        return res.status(400).json({
            error: true,
            message: 'Compra não foi encontrada.'
        });
    };

    if (!await produto.findByPk(req.body.ProdutoId)) {
        return res.status(400).json({
            error: true,
            message: 'Produto não foi encontrado.'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ ProdutoId: req.body.ProdutoId },
            { CompraId: req.params.id })
    }).then(itens => {
        return res.json({
            error: false,
            message: "Item foi alterado com sucesso!",
            itens
        });
    }).catch(erro => {
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possível alterar."
        });
    });
});

app.get('/compra/:idComp/produto/:idProd/excluiritemcompra', async (req, res) => {
    await itemcompra.destroy({
        where: Sequelize.and({ CompraId: req.params.idComp },
            { ProdutoId: req.params.idProd })
    }).then(() => {
        return res.json({
            error: false,
            message: "Item foi excluído com sucesso!"
        });
    }).catch(() => {
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o item."
        });
    });
});



let port = process.env.PORT || 3001;

app.listen(port, (req, res) => {
    console.log('Servidor ativo: http://localhost:3001');
});