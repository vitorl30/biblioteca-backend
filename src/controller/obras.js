const notion = require('../../config/notion')

function list(req,res){
    (async () => {
        const databaseId = process.env.NOTION_DATABASE_ID;
        const response = await notion.databases.query({
          database_id: databaseId,
        });

        const resultsArray = response.results

        const results = resultsArray.map(result=>{
            const id = result.id
            const titulo = result.properties.titulo.title[0].text.content;
            const editora = result.properties.editora.rich_text[0].text.content;
            const foto = result.properties.foto.rich_text[0].text.content;
            const autoresLista = result.properties.autores.multi_select
            const autores = autoresLista.map(autor =>{
                return autor.name
            })

            return {id, titulo, editora, foto, autores}
        })

        res.json(results)
      })();

}

function obra(req, res){ 
    (async () => {
    const {id}  = req.params

    console.log(id)

        const pageId = id;
        try {
        const response = await notion.pages.retrieve({ page_id: pageId });
        //console.log(response);
                if(response.archived){
                    return res.json({erro: "Este livro foi excluido"})
                }
        
                const titulo = response.properties.titulo.title[0].text.content;
                const editora = response.properties.editora.rich_text[0].text.content;
                const foto = response.properties.foto.rich_text[0].text.content;
                const autoresLista = response.properties.autores.multi_select
        
                const autores = autoresLista.map(autor =>{
                    return autor.name
                })
        
                //res.json(response)
        
        
                res.json({id, titulo, editora, foto, autores })

            console.log("Teste OK")
        } catch (error) {
            console.log(error)
            if(error.status === 404){
              return res.json({erro: "Livro não foi encontrado"})
            }

            res.json({erro: "Algo deu errado"})
        }
      })();
}

function create(req, res){

    
    (async () => {
        const { titulo, editora, foto, autores} =req.body

        const autoresSplit = autores.split(",")
        const autoresArr = autoresSplit.map(autor =>{
            return {name: autor}
        })

        const response = await notion.pages.create({
          parent: {
            database_id: process.env.NOTION_DATABASE_ID,
          },
          properties: {
            titulo:{
                title:[{
                    text: {
                        content: titulo,
                    },
                }]
            },
            editora: {
                rich_text:[{
                    text: {
                        content: editora,
                    },
                }]
            },
            foto:{
                rich_text:[{
                    text: {
                        content: foto,
                    },
                }]
            },
            autores:{
                multi_select: autoresArr
            }
          },

        });
        res.json(response)
      })();

}

function edit(req, res){
    (async () => {
        const {id}  = req.params
        const pageId = id;
        const {titulo, editora, foto, autores} = req.body
        const dados = {}

        if(titulo) dados.titulo = {title:[{text:{content:titulo}}]}

        if(editora) dados.editora = {rich_text:[{text:{content:editora}}]}

        if(foto) dados.foto = {rich_text:[{text:{content:foto}}]}

        if(autores) {
            const autoresSplit = autores.split(",")
            const autoresArr = autoresSplit.map(autor =>{
                return {name:autor} 
            })

            dados.autores = {multi_select:autoresArr}
        }



        console.log(dados)

        try{
            const response = await notion.pages.update({
              page_id: pageId,
              properties: dados
            });
    
    
            res.json({mensage:`o Livro ${response.properties.titulo.title[0].text.content} foi atualizado.`});

        } catch (error){
            if(error.status === 404)
                return res.json({erro: "Este livro não foi encontrado ou foi excluido"});

            res.json({erro: "Este livro não foi encontrado ou já foi excluido"});
        }
      })();
}

function remove(req, res){
    (async () => {
        const {id}  = req.params
        const pageId = id;

        try{
            
            const response = await notion.pages.update({
              page_id: pageId,
              archived: true
            });
    
            res.json({mensage:`o Livro ${response.properties.titulo.title[0].text.content} foi deletado.`});

        } catch (error){
            if(error.status === 404)
                return res.json({erro: "Este livro não foi encontrado ou já foi excluido"});

            res.json({erro: "Este livro não foi encontrado ou já foi excluido"});
        }
      })();
        
}


module.exports = {list, create, obra, edit, remove}