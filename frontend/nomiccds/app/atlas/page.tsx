import Sidebar from "@/components/sidebar"

export default function AtlasMap() {
    return (
        <main className="flex min-h-screen h-screen flex-row items-center justify-between py-6 px-8 gap-x-2">
            
            <div className='w-1/5 h-full'>
                <Sidebar active="atlas"/>
            </div>
            <iframe className="w-full h-full rounded-md" src="https://atlas.nomic.ai/map/deb7a93e-fe0a-444d-8d4f-c92898b43d90/9f9c4db2-5730-4dbb-8bc0-188f264a79e3">
            </iframe>    
        </main>
    )
}