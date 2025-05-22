export default function HelloWorld(){
        const propsUserCard = {
            nama: "Goku",
            nim: "999999",
            tanggal: "2025-01-01", 
            hobi:"scroll tiktok"
        }
    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai/>
            <QuoteText/>

            <UserCard 
	            nama="Ratuchan" 
	            nim="2357301109"
	            tanggal={new Date().toLocaleDateString()}
                hobi="scroll tiktok"
	          />
              
            <UserCard {...propsUserCard}/>

            <img src="img/capy baru.webp" className="kecil" alt="logo"/>
            
        </div>
    )
}

function GreetingBinjai(){
    return (
        <small> Salam Dari Pekanbaru </small>
    )
}

function QuoteText() {
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function UserCard(props){
    return (
        <div>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
            <p>hobi: {props.hobi}</p>
        </div>
    )
}
