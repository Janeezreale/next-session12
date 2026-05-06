// ─────────────────────────────────────────────
//  ReactionTest — 반응속도
//  담당자: 윤가빈(@Janeezreale)
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";

function ReactionTest({ teamName, members }) {
  /* useState */

  // ready: 시작 전, waiting: 대기, go: 클릭 가능, result: 결과 표시
  const [status, setStatus] = useState("ready");
  // 초록색(go)이 된 시점의 시간을 저장
  const [startedAt, setStartedAt] = useState(null);
  // 현재 테스트의 반응 속도 저장
  const [reactionMs, setReactionMs] = useState(null);
  // 최고 기록 저장
  const [bestMs, setBestMs] = useState(null);

  /* useEffect */

  // status 값이 변경될 때 실행
  useEffect(() => {
    // waiting 상태가 아니면 아무것도 일어나지 X
    if (status !== "waiting") return;

    // 1~5초 사이로 랜덤 시간 생성
    const delay = Math.floor(Math.random() * 4000) + 1000;

    // 시간이 지나면 초록색(go)로 변경
    const timerId = setTimeout(() => {
      // 시작 시간 저장
      setStartedAt(Date.now());
      // 클릭 가능한 상태로
      setStatus("go");
    }, delay);

    // cleanup
    return () => clearTimeout(timerId);
  }, [status]); // status가 바뀔 때마다 실행

  // 테스트 시작
  const startTest = () => {
    // 이전 기록 초기화
    setReactionMs(null);
    // 시작 시간 초기화
    setStartedAt(null);
    // 대기 상태(waiting)로 변경
    setStatus("waiting");
  };

  // 버튼 클릭 시 시작
  const handleClick = () => {
    // 시작 전 혹은 결과 상태에서 클릭하면 새 테스트 시작
    if (status === "ready" || status === "result") {
      startTest();
      return;
    }

    // 대기 상태(waiting)에서 클릭 -> "너무 빨랐어요!"
    if (status === "waiting") {
      // 초기 상태로 복귀
      setStatus("ready");
      // 기록은 제거
      setReactionMs(null);
      // "너무 빨랐어요!" 창 출력
      alert("너무 빨랐어요! 초록색이 된 후 클릭하세요.");
      return;
    }

    // 초록색(go) 상태에서 클릭
    if (status === "go") {
      // 현재 시간 - 시작 시간 = 반응 속도
      const ms = Date.now() - startedAt;
      // 현재 기록 저장
      setReactionMs(ms);
      // 최고 기록 갱신
      setBestMs((prev) => (prev === null || ms < prev ? ms : prev));
      // 결과 상태로 변경
      setStatus("result");
    }
  };

  // UI
  return (
    <section className="card">
      <h2>{teamName} 반응속도</h2>

      {members && members.length > 0 && <p>팀원: {members.join(", ")}</p>}

      <button
        onClick={handleClick}
        style={{
          width: "220px",
          height: "120px",
          backgroundColor: status === "go" ? "green" : "red",
          color: "white",
          fontSize: "20px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        {status === "ready" && "시작"}
        {status === "waiting" && "기다리세요..."}
        {status === "go" && "클릭!"}
        {status === "result" && "다시 시작"}
      </button>

      {reactionMs !== null && <p>이번 기록: {reactionMs}ms</p>}
      {bestMs !== null && <p>최고 기록: {bestMs}ms</p>}
    </section>
  );
}

export default ReactionTest;
