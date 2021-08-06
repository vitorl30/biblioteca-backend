const firebase = require('./firebase_connect');


module.exports = {
    saveData: (req, callback)=>{
        let {id, titulo, editora, foto, autores} = req;

        firebase.database().ref("obras/"+titulo).set({
            id, 
            titulo, 
            editora, 
            foto, 
        });
        callback(null, {"status.code": 200, "menssage": "Inserted Sucessfull"});
    } ,
    listData: async (req, callback) => {
        const dbRef = firebase.database().ref();
        const result = await dbRef.child("obras").get().then((snapshot) => {
        if (snapshot.exists()) {

            return snapshot.val();
    
         } else {
            console.log("No data available");
        }
        }).catch((error) => {
            console.error(error);
        });

        console.log(typeof result)

        callback(null, result)
    }
}
