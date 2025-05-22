export default function ListProduct(){
    return (
        <div>
            <h1>ListProduct </h1>
            <Literasi/>
            <TesPotensiSkolastik/>
            <PenalaranMatematika/>
            <PengetahuanKuantitatif/>

        </div>
    )
}

function Literasi(){
    return(
        <div className="course-box">
      <h2>📖 Literasi dalam Bahasa Indonesia dan Bahasa Inggris</h2>
      <p>
        Ujian ini menguji pemahaman terhadap teks dalam bahasa Indonesia dan Inggris, termasuk analisis isi,
        makna kata, dan struktur kalimat.
      </p>
    </div>
  );
}

function TesPotensiSkolastik(){
    return(
        
        <div className="course-box">
      <h2>🧠 Tes Potensi Skolastik (TPS)</h2>
      <p>
        Tes ini mengukur kemampuan kognitif peserta dalam memahami dan memecahkan masalah secara logis.
        Soal-soalnya mencakup penalaran umum, pemahaman bacaan, dan kemampuan kuantitatif.
      </p>
    </div>
  );
}

function PenalaranMatematika(){
return(
    <div className="course-box">
    <h2>🔢 Penalaran Matematika</h2>
    <p>
      Materi ini berfokus pada pemecahan masalah matematika secara logis, termasuk aljabar, geometri,
      dan pemahaman konsep numerik.
    </p>
  </div>
);
}

function PengetahuanKuantitatif() {
  return (
      <div className="course-box">
          <h2>📊 Pengetahuan Kuantitatif</h2>
          <p>
              Tes ini mengukur kemampuan peserta dalam memahami konsep dasar perhitungan, analisis data,
              serta interpretasi grafik dan tabel dalam berbagai konteks.
          </p>
      </div>
  );
}
