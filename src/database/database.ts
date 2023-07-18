import mongoose from "mongoose";


const ConnectDB = async () =>{
    try {
        //Se corrige el error de typeScript agregando el || 'un string'
        await mongoose.connect(process.env.CONNECTMONGODB || 'CONNECTDBs');
        console.log('Database is Connected')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default ConnectDB