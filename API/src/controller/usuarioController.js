import { Router } from 'express';
import { login } from '../repository/usuarioRepository.js';
const server = Router();

server.post('/usuario/login', async (req, resp) => {
    try {
        
        const { email, senha} = req.body;
        const x = await login(email, senha);
        resp.send(x)

    } catch (err) {
        resp.status(400).send({
            erro: 'ERROR!'
        })
    }


}
)

export default { server }