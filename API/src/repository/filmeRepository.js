import { con } from './connection.js';
export async function InserirFilme(filme) {
    const comando = `
    INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
                VALUES (?, ?, ?, ?, ?, ?)
    `
    const [resposta] = await con.query (comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel ])
    filme.id = resposta.insertId;
    return filme
}

export async function listarTodosFilmes () {
    const comando = `
            SELECT id_filme		id,
            nm_filme			nome,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel
    FROM    tb_filme `
    
    const [resposta] = await con.query(comando)
    return resposta;
}

export async function listarPorID (id) {
    const comando = 
    `SELECT id_filme		    id,
            nm_filme			nome,
            ds_sinopse          sinopse,
            ds_imagem           capa,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel
    FROM    tb_filme 
    WHERE   id_filme = ? `;
    
    const [resposta] = await con.query(comando, [id])
    return resposta;
}

export async function listarPorNome (nome) {
    const comando = 
    `SELECT id_filme		    id,
            nm_filme			nome,
            vl_avaliacao		avaliacao,
            dt_lancamento	    lancamento,
            bt_disponivel	    disponivel
    FROM    tb_filme 
    WHERE   nm_filme like ? `;
    
    const [resposta] = await con.query(comando, [ `%${nome}%`]);
    return resposta[0];
}

export async function deletarFilme (id) {
    const comando = 
    `DELETE FROM  tb_filme 
           WHERE  id_filme = ?`;
    
    const resposta = await con.query (comando, [id]);
    return resposta.affectedROWS;
}