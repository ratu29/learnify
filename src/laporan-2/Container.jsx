export default function Container({children}){
    return(
        <div className="card">
            <h1 ClassName="card">Pemrograman Framework Lanjutan</h1>
            <br/>
                {children}
            <br/>
            <footer ClassName="card" >
                <p>Kelompok 7 - Learning Center</p>
            </footer>
        </div>
    )
}