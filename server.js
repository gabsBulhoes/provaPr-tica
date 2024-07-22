//Paciência e uma boa prova. Que a Força esteja com você!
import { v4 as uuidv4 } from 'uuid'; //Se não souber, não precisa usar.
import {createServer} from "node:http";
import fs from "node:fs";
import { URLSearchParams } from 'node:url';

import livraria from "./helper/livraria.js";

const PORT = 3333;

const server = createServer((request, response)=>{
    const {url, method} = request;
    if(method === 'GET' && url === '/livros/{id}'){
        livraria((err, livraria)=>{
            if(err){
                response.writeHead(500, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: 'Erro ao ler dados'}))
                return
            }
            response.writeHead(200, {'Content-Type': 'application/json'})
            response.end(JSON.stringify(livraria))
        })
    }else if(method === 'POST' && url === '/livros'){
        let body = ''
        request.on('data', (chunck)=>{
            body += chunck;
        })
        request.on('end', ()=>{
            const livro = JSON.parse(body)
            livraria((err, livro)=>{
                if(err){
                    response.writeHead(500, {'Content-Type': 'application/json'})
                    response.end(JSON.stringify({message:"Erro ao procurar livro"}))
                    return
                }
                novoLivro.id = uuidv4();
                livro.push(novoLivro)
                fs.writeFile("onibus.json", JSON.stringify(livro, null, 2), (err)=>{
                    if(err){
                        response.writeHead(500, {"Content-Type":"application/json"})
                        response.end(JSON.stringify({message:"Erro ao procurar livro"}))
                        return
                    }
                    response.writeHead(201, {"Content-Type": "application/json"})
                    response.end(JSON.stringify((novoLivro)))
                })
            })
        })
    }else if(method === 'GET' && url.startsWith('/livros/{id}')){
        
    }else if(method === 'POST' && url.startsWith('/editoras')){
        const urlParams = new URLSearchParams(url.split("?")[1])
        const editoras = urlParams.get("editoras");

        livraria((err, livro)=>{
            if(err){
                response.writeHead(500, {"Content-Type":"application/json"})
                response.end(JSON.stringify({message:"Erro ao procurar editora"}))
                return;
            }
            const resultado = receitas. filter((livro)=>
            livro.editores.some((editores)=>
            editores.includes("editores")
            )
        );
        if(resultado.length === 0){
            response.writeHead(404, {"Content-Type" : "application/json"})
            response.end(JSON.stringify({message:"Não foi encontrado editor desse livro" + editores}))
            return
        }
        response.writeHead(200, {"Content-Type": "application/json"})
        response.end(JSON.stringify(resultado))
        })
    }else if(method === 'POST' && url.startsWith('/editores')){

    }else if(method === 'PUT' && url.startsWith('/editoras/{id}')){

    }else if(method === 'DELETE' && url.startsWith('/autores/{id}')){

    }else{
        response.writeHead(404, {'Content-Type':'application/json'})
        response.end(JSON.stringify({message:"Página não encontrada"}))
    }
})

server.listen(PORT, ()=>{
    console.log(`Servidor on PORT http://localhost:${PORT}`);
})