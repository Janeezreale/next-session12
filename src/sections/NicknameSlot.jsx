// ─────────────────────────────────────────────
// NicknameSlot — 별명 슬롯머신 컴포넌트입니다.
// 담당자: 조혜진
// ─────────────────────────────────────────────

// React에서 useEffect와 useState 기능을 가져옵니다.
import { useEffect, useState } from "react";

// 오른쪽 슬롯에 들어갈 별명 목록입니다.
const NICKNAMES = ["사과", "복숭아", "딸기", "오렌지"];

// 배열에서 무작위 값 하나를 뽑아주는 함수입니다.
function getRandomItem(list) {
  // 0부터 배열 길이보다 작은 숫자 중 하나를 랜덤으로 만듭니다.
  const randomIndex = Math.floor(Math.random() * list.length);

  // 랜덤으로 뽑힌 번호에 해당하는 배열 값을 반환합니다.
  return list[randomIndex];
}

// NicknameSlot 컴포넌트입니다.
// App.jsx에서 teamName과 members를 props로 전달받습니다.
function NicknameSlot({ teamName, members }) {
  // 현재 왼쪽 슬롯에 보이는 멤버 이름을 저장합니다.
  // 처음에는 members 배열의 첫 번째 값인 "조혜진"이 들어갑니다.
  const [currentMember, setCurrentMember] = useState(members[0]);

  // 현재 오른쪽 슬롯에 보이는 별명을 저장합니다.
  // 처음에는 NICKNAMES 배열의 첫 번째 값인 "사과"가 들어갑니다.
  const [currentNickname, setCurrentNickname] = useState(NICKNAMES[0]);

  // 슬롯이 현재 돌아가는 중인지 아닌지를 저장합니다.
  // 처음에는 멈춘 상태이므로 false입니다.
  const [isSpinning, setIsSpinning] = useState(false);

  // isSpinning 값이 바뀔 때마다 실행되는 코드입니다.
  useEffect(() => {
    // isSpinning이 false라면 슬롯을 돌릴 필요가 없으므로 여기서 useEffect 실행을 끝냅니다.
    if (!isSpinning) return;

    // 슬롯이 돌아가는 동안 80ms마다 멤버 이름과 별명을 랜덤으로 바꿉니다.
    const intervalId = setInterval(() => {
      // members 배열에서 멤버 이름 하나를 랜덤으로 뽑아 현재 멤버로 저장합니다.
      setCurrentMember(getRandomItem(members));

      // NICKNAMES 배열에서 별명 하나를 랜덤으로 뽑아 현재 별명으로 저장합니다.
      setCurrentNickname(getRandomItem(NICKNAMES));
    }, 80);

    // 슬롯이 1.8초 동안 돌아간 뒤 멈추도록 설정합니다.
    const timeoutId = setTimeout(() => {
      // 멈추기 직전에 최종 멤버 이름을 랜덤으로 한 번 더 정합니다.
      setCurrentMember(getRandomItem(members));

      // 멈추기 직전에 최종 별명을 랜덤으로 한 번 더 정합니다.
      setCurrentNickname(getRandomItem(NICKNAMES));

      // 슬롯이 멈췄다는 의미로 isSpinning 값을 false로 바꿉니다.
      setIsSpinning(false);
    }, 1800);

    // useEffect가 다시 실행되거나 컴포넌트가 사라질 때 정리하는 코드입니다.
    return () => {
      // 80ms마다 반복 실행되던 setInterval을 멈춥니다.
      clearInterval(intervalId);

      // 1.8초 뒤 실행 예정이던 setTimeout을 정리합니다.
      clearTimeout(timeoutId);
    };
  }, [isSpinning, members]); // isSpinning이나 members 값이 바뀌면 useEffect가 다시 실행됩니다.

  // 슬롯 돌리기 버튼을 눌렀을 때 실행되는 함수입니다.
  const handleSpin = () => {
    // 이미 슬롯이 돌아가는 중이면 버튼을 또 눌러도 아무 일도 하지 않게 막습니다.
    if (isSpinning) return;

    // 슬롯을 돌리기 위해 isSpinning 값을 true로 바꿉니다.
    setIsSpinning(true);
  };

  // 화면에 보여줄 JSX를 반환합니다.
  return (
    // 별명 슬롯머신 전체를 감싸는 영역입니다.
    <section className="nicknameSection">
      {/* 슬롯머신 제목입니다. */}
      <h2 className="sectionTitle">별명 슬롯머신</h2>

      {/* 슬롯머신에 대한 짧은 설명 문장입니다. */}
      <p className="sectionDesc">
        {/* App.jsx에서 받은 teamName을 화면에 보여줍니다. */}
        {teamName} 멤버에게 어울리는 별명을 무작위로 매칭해보세요.
      </p>

      {/* 두 개의 슬롯 박스를 감싸는 영역입니다. */}
      <div className="slotMachine">
        {/* 왼쪽 슬롯 박스입니다. isSpinning이 true면 spinning 클래스가 추가됩니다. */}
        <div className={`slotBox ${isSpinning ? "spinning" : ""}`}>
          {/* 왼쪽 슬롯의 라벨입니다. */}
          <span className="slotLabel">MEMBER</span>

          {/* 현재 선택된 멤버 이름을 보여줍니다. */}
          <strong className="slotText">{currentMember}</strong>
        </div>

        {/* 멤버와 별명 사이에 보여줄 + 기호입니다. */}
        <div className="slotPlus">+</div>

        {/* 오른쪽 슬롯 박스입니다. isSpinning이 true면 spinning 클래스가 추가됩니다. */}
        <div className={`slotBox ${isSpinning ? "spinning" : ""}`}>
          {/* 오른쪽 슬롯의 라벨입니다. */}
          <span className="slotLabel">NICKNAME</span>

          {/* 현재 선택된 별명을 보여줍니다. */}
          <strong className="slotText">{currentNickname}</strong>
        </div>
      </div>

      {/* 슬롯 결과 메시지를 보여주는 영역입니다. */}
      <div className="nicknameResult">
        {/* isSpinning이 true이면 슬롯이 돌아가는 중이라는 문구를 보여줍니다. */}
        {isSpinning ? (
          // 슬롯이 돌아가는 중일 때 보여줄 문장입니다.
          <p>드르르륵... 슬롯이 돌아가는 중!</p>
        ) : (
          // 슬롯이 멈춰 있을 때 최종 결과를 보여줍니다.
          <p>
            {/* 현재 선택된 멤버 이름을 강조해서 보여줍니다. */}
            결과: <strong>{currentMember}</strong> 님의 별명은{" "}

            {/* 현재 선택된 별명을 강조해서 보여줍니다. */}
            <strong>{currentNickname}</strong>입니다!
          </p>
        )}
      </div>

      {/* 슬롯을 돌리는 버튼입니다. */}
      <button
        // 버튼에 적용할 CSS 클래스 이름입니다.
        className="slotButton"

        // 버튼을 클릭하면 handleSpin 함수가 실행됩니다.
        onClick={handleSpin}

        // 슬롯이 돌아가는 중에는 버튼을 비활성화합니다.
        disabled={isSpinning}
      >
        {/* 슬롯이 돌아가는 중이면 "돌아가는 중...", 아니면 "슬롯 돌리기"를 보여줍니다. */}
        {isSpinning ? "돌아가는 중..." : "슬롯 돌리기"}
      </button>
    </section>
  );
}

// 다른 파일에서 NicknameSlot 컴포넌트를 import해서 사용할 수 있도록 내보냅니다.
export default NicknameSlot;