//브라우저 로컬 스토리지에 데이터를 저장할 수 있는 객체 함수.
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
    //저장소의 key, value 데이터를 JSON 형식으로 변환.
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
    //parsing을 통해 문자열을 값으로 변경.
  },
};

export default store;
