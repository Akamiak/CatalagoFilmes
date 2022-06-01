import { Router } from "express";
import { InserirFilme } from "../repository/filmeRepository.js";

const server = Router();

server.post('/filme', async (req, resp) => {
    try {
        const novoFilme = req.body;

        const filmeInserido = await InserirFilme(novoFilme);

        resp.send(filmeInserido)

    } catch (err) {
        resp.send(400).send({
            erro: err.message
        })
    }


})

export default server;