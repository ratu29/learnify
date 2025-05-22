export default function ArtikelDetail(){
    return (
        <div className ="artikel-container">
            <h1>Artikel </h1>
            <Tittle/>
            <Images/>
            <Isi/>
            <Kesimpulan/>
        </div>
    )
}

function Tittle(){
    return(
        <h2> Peran Guru dalam Meningkatkan Pembelajaran
                di Learnify </h2>
    )
}

function Images(){
    return(
        
        <img src="img/pict1.jpg" className="guru" alt="logo"/> 
    )
}

function Isi(){
return(
        <small className="teks">Dalam era digital, peran guru semakin berkembang seiring dengan hadirnya platform 
        Learning Center yang menyediakan akses belajar secara online.
    
        Guru tidak hanya berperan sebagai pemberi materi, tetapi juga sebagai 
       fasilitator, mentor, dan motivator bagi siswa.
    
        Dalam Learning Center, guru memiliki peran penting dalam memberikan bimbingan yang 
        personal kepada siswa. Setiap siswa memiliki gaya belajar yang berbeda, dan dengan fitur seperti 
        konsultasi online atau QnA interaktif, guru dapat memberikan solusi yang lebih 
        sesuai dengan kebutuhan mereka.</small>
)
}

function Kesimpulan(){
    return(
    <div className="kesimpulan">
    <h3>📌 Kesimpulan</h3>
    <p>
        Guru dalam Learning Center tidak hanya mengajar, tetapi juga membimbing secara 
        personal agar siswa dapat belajar lebih efektif dengan metode yang sesuai dengan kebutuhan mereka.
    </p>
</div>
    )
}



