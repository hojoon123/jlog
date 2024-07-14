import { createClient } from '@/utils/supabase/server'

export default async function Page() {
    const supabase = createClient()
    const { data: notes } = await supabase.from('notes').select()

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 mt-12 font-bold">Notes</h1>
            <ul>
                {notes?.map((note) => (
                    <li 
                    className="mb-4 rounded border p-4 text-lg font-bold bg-gray-100"
                    key={note.id}
                    >
                        {note.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}