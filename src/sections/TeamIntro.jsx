// ─────────────────────────────────────────────
//  TeamIntro — 팀 소개 (자율)
//  담당자: 송수민
// ─────────────────────────────────────────────

// useState랑 useEffect 가져오기
import { useState, useEffect } from "react";

// 팀 소개 슬로건 목록
const SLOGANS = [
  "🚀 우리가 최고",
  "💡 우리가 짱",
  "🌟 넥스트 고트 팀은 다르다",
  "🔥 프로덕트 데이 2팀 ❤️",
];

// 팀 소개 컴포넌트
function TeamIntro({ teamName, members }) { // 팀 이름과 멤버 목록 받기(props)
  // 1. useState: 보여줄 슬로건의 순서를 기억
  const [sloganIndex, setSloganIndex] = useState(0);

  // 2. useEffect: 화면에 나타날 때 3초마다 슬로건을 바꾸는 타이머 실행
  useEffect(() => {
    const timer = setInterval(() => { // 반복 타이머 설정
      // 다음 슬로건으로 넘어가되, 마지막이면 다시 처음으로 돌아오게 계산
      setSloganIndex((prevIndex) => (prevIndex + 1) % SLOGANS.length); // 슬로건 순서 업데이트
    }, 3000);

    return () => clearInterval(timer); // 화면에서 사라질 때 타이머를 꺼주는 정리 작업
  }, []);

  // 카드 스타일 설정
  return (
    <section className="card" style={{ textAlign: "center" }}>  
      {/* 3. props 활용: 전달받은 teamName 화면에 그리기 */}
      <h2 style={{ color: "#5b21b6", marginBottom: "10px" }}>{teamName}</h2>

      <div
        style={{
          margin: "20px 0",
          padding: "20px",
          backgroundColor: "#f3f4f6",
          borderRadius: "12px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#374151" }}>
          ✨ 오늘의 슬로건
        </h3>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            margin: 0,
            color: "#1f2937",
          }}
        >
          {SLOGANS[sloganIndex]}
        </p>
      </div>

      {/* 3. props 활용: 전달받은 teamName 화면에 그리기 */}
      <h3 style={{ color: "#4b5563", marginBottom: "15px" }}>👥 멤버 소개</h3>
      {/* 3. props 활용: 전달받은 members 배열을 각각 화면에 그리기 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
      
        {/* 3. props 활용: 전달받은 members 배열을 각각 화면에 그리기 */}
        {members.map((member, index) => (
          <span
            key={index}
            style={{
              padding: "8px 16px",
              backgroundColor: "#e0e7ff",
              borderRadius: "20px",
              color: "#4338ca",
              fontWeight: "bold",
            }}
          >
            {member}
          </span>
        ))}
      </div>
    </section>
  );
}

export default TeamIntro;
