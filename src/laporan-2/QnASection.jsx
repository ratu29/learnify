export default function QnASection(){
    return (
        <div>
            <h1>QnASection </h1>
            <div className="qna-container"></div>
            <Question/>
            <Answer/>
            <VoteButtons/>
            <InteractiveTips/>

        </div>
    )
}

function Question(){
    return(
        <div className="question-box">
        <h3>❓ Pertanyaan:</h3>
        <p>Bagaimana peran guru dalam pembelajaran online di Learnify?</p>
      </div>
    );
  }

function Answer(){
    return( 
        <div className="answer-box">
      <h3>✅ Jawaban:</h3>
      <p>
        Dalam Learify, guru berperan sebagai fasilitator, mentor, dan motivator bagi siswa.
        Dengan fitur seperti konsultasi online dan sesi QnA interaktif, guru dapat memberikan
        solusi yang sesuai dengan kebutuhan belajar siswa.
      </p>
    </div>
  );
}

function VoteButtons() {
  return (
    <div className="vote-box">
          <button className="bg-blue-500 text-white px-3 py-1 rounded">👍 Upvote</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded">👎 Downvote</button>
      </div>
  );
}



function InteractiveTips(){
return(
    <div className="tips-box">
      <h3>💡 Tips Belajar Efektif:</h3>
      <ul>
        <li>Gunakan fitur konsultasi untuk mendapatkan bimbingan langsung.</li>
        <li>Berlatih soal secara rutin untuk meningkatkan pemahaman.</li>
        <li>Diskusikan materi dengan teman atau komunitas belajar.</li>
      </ul>
    </div>
  );
}

