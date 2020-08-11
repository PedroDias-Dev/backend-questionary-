import { Request, Response} from 'express'

import db from "../database/connection";

export default class ClassesController{
    async index(request: Request, response: Response) {
        const filters = request.query;

        //
        const name = filters.name as string;
        const nota = filters.nota as string;
        //

        if(!filters.name ){ // || !filters.nota
                return response.status(400).json({
                error: "Oh meu querido ta faltando os filtros ai hein, vamo faze esse negocio direito"
            })
        }

        const users = await db('users')
        
            .where('users.name', '=', name)
            //.where('users.nota', '!=', '');

            //.select(['users.*'])

        return response.json(users);
    }

    async create(request: Request, response: Response)  {
        const {
            name,
            nota
        } = request.body;
    
        const trx = await db.transaction();
    
        try{
            const InsertedUsersId = await trx('users').insert({
                name,
                nota
            });
        
            const user_Id = InsertedUsersId[0];
        
            await trx.commit();
        
            console.log('Criado com sucesso!');
        
            return response.status(201).send();  
            
            //return response.json( {message: 'hello'} );
            //https://localhost:3333/classes
        } catch (err){
            // desfaz a alteracao em caso d erro
            await trx.rollback();

            console.log(err);
    
            return response.status(400).json({
                error: 'Erro inesperado ao criar nova classe... Verifica tudo ai e faz d novo filhao'
            });
        }
    
    }

    // async update(request: Request, response: Response) {
    //     const {
    //         nota
    //     } = request.body;
    
    //     const trx = await db.transaction();

    //     async function Name(){
    //         const Name = await db('users')
    //             .where('users.name', '=', name)
    //         return name;
    //     }

    //     try{
    //         const InsertedUsersId = await trx('users').where({name: {Name}}).update({
    //             nota
    //         });
        
    //         //const user_Id = InsertedUsersId[0];
        
    //         await trx.commit();
        
    //         console.log('Nota cadastrada');
        
    //         return response.status(201).send();  
            
    //         //return response.json( {message: 'hello'} );
    //         //https://localhost:3333/classes
    //     } catch (err){
    //         // desfaz a alteracao em caso d erro
    //         await trx.rollback();

    //         console.log(err);
    
    //         return response.status(400).json({
    //             error: 'Erro inesperado ao criar nova classe... Verifica tudo ai e faz d novo filhao'
    //         });
    //     }
    // }
};