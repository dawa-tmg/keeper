import knex from "knex";
import knexConfig from "@/knexfile";

const kn = knex(knexConfig.development);

export async function GET(){
    const getNotes = await kn('keeper').select('*');
    return Response.json({ getNotes })
}

export async function POST(req: Request) {
    const { title, note } = await req.json();

    if(!title || !note){
        return Response.json({error: 'All the fields are required'})
    }

    const [ addNote ] = await kn('keeper').insert({ title, note }).returning('*');
    return Response.json({message: 'Note added successfully'})
}