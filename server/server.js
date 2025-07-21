import {PORT,connectDatabase} from './config/config.js'
import { app } from "./app.js";



const startServer=async()=>
{
    try{await connectDatabase()
    app.listen(PORT,()=>
        {
            console.log(`Server is listening on ${PORT}`);
            
        })}
    catch(error) {console.error(error);
    }    
}

startServer()











