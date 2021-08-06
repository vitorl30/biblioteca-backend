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
        const response = await notion.pages.retrieve({ page_id: pageId });
        //console.log(response);

        const titulo = response.properties.titulo.title[0].text.content;
        const editora = response.properties.editora.rich_text[0].text.content;
        const foto = response.properties.foto.rich_text[0].text.content;
        const autoresLista = response.properties.autores.multi_select

        const autores = autoresLista.map(autor =>{
            return autor.name
        })

        res.json(response)


       // res.json({id, titulo, editora, foto, autores })
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

function remove(req, res){

    
    (async () => {
        const {id}  = req.params
        const pageId = id;
        const response = await notion.pages.update({
          page_id: pageId,
          archived: true
        });
        res.json(response);
      })();

}


module.exports = {list, create, obra, remove}