// step 1 요구사항 구현을 위한 전략

// TODO 메뉴추가
// - [x] 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
// - [x] 메뉴의 이름을 입력받고 확인버튼을 클릭하면 값을 추가한다.
// - [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴수정
// - [x] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴수정 프롬프트 창을 띄운다.
// - [x] 프롬프트 창에서 입력 값을 받고, 확인 버튼을 누르면 업데이트 된다.

// TODO 메뉴삭제
// - [x] 메뉴 삭제 버튼클릭 이벤트를 받고, 메뉴삭제 컨펌 프롬프트를 띄운다.
// - [x] 확인 버튼을 누르면 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);
// $ 자바스크립트에서 DOM 엘리먼트를 가져올 때 표현하는 키워드.

function App() {
  //리팩터링을 위한 함수 모음.
  const countMenuUpdate = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 메뉴의 입력 받는 것
  const addMenuName = (e) => {
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return; // 구문을 빠져나오기 위해 return 해줘야 아래 스크립트가 실행되지 않음.
    }

    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `
  <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    //const menuCount = li 개수를 카운팅 해서 총 개수 반환
    countMenuUpdate();
    $("#espresso-menu-name").value = null;
  };

  // 메뉴를 수정 하는 기능.
  const fixedMenuUpdate = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  // 메뉴를 삭제 하는 기능.
  const removeMenuName = (e) => {
    // confirm() : 확인 == true, 취소 == false를 반환하는 메소드
    if (confirm("이 메뉴를 삭제 하시갰습니까?")) {
      e.target.closest("li").remove();
      countMenuUpdate();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      fixedMenuUpdate(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  document
    .querySelector("#espresso-menu-form") // $를 써서 개선 가능.
    .addEventListener("submit", (e) => {
      e.preventDefault(); // form 태그가 자동으로 전송되는 걸 막아준다.
    });

  // 클릭 이벤트를 통해 입력 값을 받아오는 것.
  $("#espresso-menu-submit-button").addEventListener("click", () =>
    addMenuName()
  );

  // 엔터 입력이 아닐시 구문 나옴.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
