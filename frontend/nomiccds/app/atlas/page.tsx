import Sidebar from "@/components/sidebar"

export default function AtlasMap() {
    return (
        <main className="flex min-h-screen h-screen flex-row items-center justify-between py-6 px-8 gap-x-2">
            
            <div className='w-1/5 h-full'>
                <Sidebar active="atlas"/>
            </div>
            <iframe className="w-full h-full rounded-md" src="https://atlas.nomic.ai/map/9d9acf23-67fb-42fb-8290-0cef81cb1eb3/f1b144f4-cd37-4ead-be7f-319e28a430ce">
            </iframe>    
        </main>
    )
}