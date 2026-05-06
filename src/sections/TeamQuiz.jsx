// ─────────────────────────────────────────────
//  TeamQuiz — 미니 퀴즈
//  담당자: 건준
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";

// 퀴즈 문제 3개 — answerIndex는 members 배열에서 정답의 위치
const QUESTIONS = [
  { question: "우리 팀에서 가장 나이가 적은 사람은?", answerIndex: 0 },
  { question: "우리 팀에서 본전공이 이과인 사람은?", answerIndex: 1 },
  { question: "우리 팀에서 서관에서 수업을 듣는 사람은?", answerIndex: 2 },
];

function TeamQuiz({ teamName, members }) {
  // 지금 몇 번째 문제인지 — 0부터 시작해서 2까지
  const [currentIndex, setCurrentIndex] = useState(0);
  // 지금까지 맞힌 개수
  const [score, setScore] = useState(0);
  // 사용자가 고른 보기 인덱스 — null이면 아직 아무것도 안 고른 상태
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // selectedAnswer가 바뀔 때마다 실행 — 답을 고르면 1.5초 뒤 자동으로 다음 문제로 넘어감
  useEffect(() => {
    // 아직 아무것도 안 골랐으면 타이머 시작 안 함
    if (selectedAnswer === null) return;

    // 1.5초 후 다음 문제로 이동하고 선택 초기화
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }, 1500);

    // 컴포넌트가 사라지거나 selectedAnswer가 다시 바뀌면 이전 타이머 취소
    return () => clearTimeout(timer);
  }, [selectedAnswer]);

  // 보기 버튼을 클릭했을 때 — 정답 여부 체크하고 선택 기록
  function handleSelect(index) {
    // 이미 골랐으면 중복 클릭 무시
    if (selectedAnswer !== null) return;

    // 정답이면 점수 1 올림
    if (index === QUESTIONS[currentIndex].answerIndex) {
      setScore((prev) => prev + 1);
    }

    // 고른 보기를 저장 — 이걸 보고 useEffect가 타이머를 시작함
    setSelectedAnswer(index);
  }

  // 보기 버튼 색상 결정 — 고르기 전엔 흰색, 고른 후 정답 초록 / 내가 고른 오답 빨강
  function getBgColor(index) {
    if (selectedAnswer === null) return "#fff";
    if (index === QUESTIONS[currentIndex].answerIndex) return "#4caf50";
    if (index === selectedAnswer) return "#f44336";
    return "#fff";
  }

  // 문제를 다 풀었으면 결과 화면으로 전환
  if (currentIndex >= QUESTIONS.length) {
    return (
      <section className="card">
        <h2>{teamName} 미니 퀴즈 결과</h2>
        {/* 최종 점수 크게 표시 */}
        <p style={{ fontSize: "52px", margin: "20px 0" }}>
          {score} / {QUESTIONS.length}
        </p>
        {/* 다시 풀기 버튼 — 누르면 모든 상태를 처음으로 초기화 */}
        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore(0);
            setSelectedAnswer(null);
          }}
          style={{ padding: "10px 24px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ddd" }}
        >
          다시 풀기
        </button>
      </section>
    );
  }

  // 현재 문제 꺼내기
  const current = QUESTIONS[currentIndex];

  return (
    <section className="card">
      {/* 몇 번째 문제인지 위쪽에 작게 표시 */}
      <p style={{ color: "#888", marginBottom: "8px" }}>
        {currentIndex + 1} / {QUESTIONS.length}
      </p>
      {/* 현재 문제 텍스트 */}
      <h2>{current.question}</h2>
      {/* members 배열을 그대로 보기 4개로 렌더링 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
        {members.map((name, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              background: getBgColor(index),
              border: "1px solid #ddd",
              borderRadius: "10px",
              textAlign: "left",
              transition: "background 0.2s",
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default TeamQuiz;
