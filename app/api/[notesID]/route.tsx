import knex from "knex";
import knexConfig from "@/knexfile"

const kn = knex(knexConfig.development)

export async function DELETE(req: Request, {params}: any) {
    const { notesID } = await params;

    await kn('keeper').where({ id: notesID }).del();
    return Response.json({message: 'Delete Successful'})
}

export async function PUT(req: Request, {params}: any) {
    const { notesID } = await params;
    const { title, note } = await req.json();
    
    if(!title || !note){
        return Response.json({error: 'All fields are required'})
    }

    await kn('keeper').where({ id: notesID }).update({ title, note }).returning('*');
    return Response.json({message: 'Edit successful'})
}