import TopBarView from "#components/Roadmap/TopBarView/TopBarView.jsx"
import ContentView from "#components/Roadmap/ContentView/ContentView"
export default function RoadmapVuew(){
    return(
        <div style={{ display: 'flex',width:'100%',height:'100vh', flexDirection: "column"}}>
        <TopBarView />
        <ContentView />
        </div>
    )
}