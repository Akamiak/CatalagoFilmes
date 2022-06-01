import { Router } from "express";
import { deletarFilme, InserirFilme, listarPorID, listarPorNome, listarTodosFilmes } from "../repository/filmeRepository.js";

const server = Router();

server.post('/filme', async (req, resp) => {
    try {
        const novoFilme = req.body;

        if(!novoFilme.nome)
        throw new Error ("Campo de nome Obrigatório!")

        if(!novoFilme.sinopse)
        throw new Error ("Campo de sinopse Obrigatório!")

        if(!novoFilme.avaliacao)
        throw new Error ("Campo de avalição Obrigatório!")

        if(!novoFilme.lancamento)
        throw new Error ("Campo de lançamento Obrigatório!")

        if(!novoFilme.disponivel)
        throw new Error ("Campo disponivel Obrigatório!")
        
        if(!novoFilme.usuario)
        throw new Error ("Campo de usuario Obrigatório!")

        const filmeInserido = await InserirFilme(novoFilme);

        resp.send(filmeInserido)

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme', async (req, resp) => {
    try{
        const resposta = await listarTodosFilmes()
        resp.send(resposta)
    }

    catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/busca', async (req, resp) => {
    try{
        const nome = req.query.nome;

        const resposta = await listarPorNome(nome);

        if (!resposta)
        throw new Error('filme não encontrado')

        resp.send(resposta)
    }

    catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/:id', async (req, resp) => {
    try{
        const id = Number(req.params.id);

        const resposta = await listarPorID(id);

        if (resposta.length == 0)
        throw new Error('filme não encontrado')

        resp.send(resposta)
    }

    catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.delete('/filme/:id', async (req, resp) => {
    try{

    const id = req.params.id
    const deletar = await deletarFilme(id);

    if(deletar != 1)
    throw new Error ('Não foi possivel deletar o filme')

    resp.status(200).send();

    } catch(err) {
        resp.status(400).send({
            erro : err.message
        })
    }
})


export default server;