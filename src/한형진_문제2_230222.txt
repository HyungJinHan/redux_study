/**
userInfo: 유저의 행동과 아이디, 닉네임 정보를 담을 객체
actionInfo: 입력한 record 정보가 담긴 userInfo에 따른 유저의 각각의 행동 문구 출력을 위한 배열 형태의 데이터
resultArr: 유저들의 행동에 대한 결과 출력을 위핸 배열 형태의 데이터
enterAction: record에 담긴 action 정보가 "Write"일 경우, "님이 방명록에 새글을 남겼습니다."를 유저 닉네임과 함께 출력

record: 배열 형태로 입력하며, 공백을 기준으로 Write, Leave / 유저 아이디 / 닉네임으로 구성

errorUserInfo: record에 담긴 유저 아이디 또는 닉네임의 길이가 잘못된 경우, "아이디 또는 닉네임의 길이가 잘못되었습니다. (1 이상 10 이하)"를 출력
errorRecord: record의 전체 길이가 잘못된 경우, "정보의 길이가 잘못되었습니다. (1 이상 100,000 이하)"를 출력

record에 담긴 action 정보가 "Leave"의 경우, 유저 아이디를 "떠난 더비"로 변경
record에 담긴 action 정보가 "Change"와 함께 닉네임 수정 시, 해당 유저의 모든 닉네임이 수정되어 정보 출력
*/
function solution2() {
  const userInfo = {};
  const actionInfo = [];
  const resultArr = []
  const enterAction = "님이 방명록에 새글을 남겼습니다.";
  const errorUserInfo = "아이디 또는 닉네임의 길이가 잘못되었습니다. (1 이상 10 이하)";
  const errorRecord = "정보의 길이가 잘못되었습니다. (1 이상 100,000 이하)";

  const record = [
    "Write uid1 Black",
    "Write Uid1 black",
    "Write uid1 Black",
    "Write uid2 Josh",
    "Change uid1 White",
    "Leave uid2",
    "Write uid3 Red",
    "Change uid3 Blue",
    "Write uid3 Blue",
    "Write uid4 Purple",
    "Write uid4 Purple",
    "Write uiasufiasufoiasufoais Pasikfjaoipsgnas",
    ""
  ];

  console.log('record ->', record);

  record.forEach((userLog) => {
    const [action, userId, nickname] = userLog.split(" ");

    if (action === "Write") {
      if ((userId.length < 1 || userId.length > 10) || (nickname.length < 1 || nickname.length > 10)) {
        actionInfo.push({ action: errorUserInfo });
      } else {
        userInfo[userId] = nickname;
        actionInfo.push({ userId, action: enterAction });
      }
    } else if (action === "Leave") {
      userInfo[userId] = "떠난 더비";
    } else if (action === "Change") {
      userInfo[userId] = nickname;
    } else if (userLog.length < 1 || userLog.length > 100000) {
      userInfo[userId] = "더비님의 ";
      actionInfo.push({ userId, action: errorRecord });
    }
  });

  actionInfo.map(({ userId, action }) => {
    resultArr.push(`${userInfo[userId]}${action}`);
  });

  return console.log('resultArr ->', resultArr);
}

solution2();