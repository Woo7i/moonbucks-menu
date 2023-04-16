// 수업을 통해 알게 된 메서드
// : innterHTML, innerText, insertAdjacenHtml, closest, target, addEventListener

/*
step 1 요구사항 구현을 위한 전략

TODO 메뉴추가
- [x] 메뉴의 이름을 입력받고 엔터키 입력으로 추가한다.
- [x] 메뉴의 이름을 입력받고 확인버튼을 클릭하면 값을 추가한다.
- [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
- [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
- [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

TODO 메뉴수정
- [x] 메뉴의 수정 버튼클릭 이벤트를 받고, 메뉴수정 프롬프트 창을 띄운다.
- [x] 프롬프트 창에서 입력 값을 받고, 확인 버튼을 누르면 업데이트 된다.

TODO 메뉴삭제
- [x] 메뉴 삭제 버튼클릭 이벤트를 받고, 메뉴삭제 컨펌 프롬프트를 띄운다.
- [x] 확인 버튼을 누르면 메뉴가 삭제된다.
- [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
*/

/*
step 2 요구사항 구현을 위한 전략

TODO localStorage Read & Write
- [ ] [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)에 
데이터를 저장한다.
- [x] 메뉴를 추가할 때
- [x] 메뉴를 수정할 때
- [x] 메뉴를 삭제할 때
- [x] localStorage에 있는 데이터를  읽어온다.

TODO 카테고리별 메뉴판 관리
각각의 종류별로 나뉜다.
- [x] 에스프레소, 메뉴판을 관리할 수 있게 만든다.
- [x] 프라푸치노, 메뉴판을 관리할 수 있게 만든다.
- [x] 블렌디드, 메뉴판을 관리할 수 있게 만든다.
- [x] 티바나, 메뉴판을 관리할 수 있게 만든다.
- [x] 디저트, 메뉴판을 관리할 수 있게 만든다.


TODO 페이지 접근시 최초 데이터 Read & Rendering
- [x] 페이지가 최초로 접근할 때 localStorage에 에스프레소 메뉴를 읽어온다.
- [x] 에스프레소 메뉴를 페이지에 그려준다.

 TODO 품절 상태 관리
- [x] 클릭이벤트에서 가장 가까운 li태그의 class 속성 값에 `sold-out` class를 추가하여 상태를 변경한다.
- [x] 품절 버튼을 추가하고 
- [x] 품절 버튼을 클릭하게 되면
- [x]  localStorge에 상태 값이 저장된다.


// TODO 서버의 요청부분
// - [x] 웹 서버를 띄운다.
// - [x] 서버에 새로운 메뉴가 추가될 수 있도록 요청한다.
// - [x] 서버에 카테고리별 메뉴리스트를 불러온다.
// - [x] 서버에 메뉴가 수정 될 수 있도록 요청한다..
// - [x] 서버에 메뉴의 품절상태를 토글될 수 있도록 요청한다.
// - [x] 서버에 메뉴가 삭제될 수 있도록 요청한다.
// fetch(BASE_URL, option); 서버에 요청할 수 있는 메서드

// TODO 리팩터링 부분
//   - [x] localStorage에 저장하는 로직은 지운다.
//   - [x] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.

// TODO 사용자 경험
// - [x] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 [alert](https://developer.mozilla.org/ko/docs/Web/API/Window/alert)으로 예외처리를 진행한다.
// - [x] 중복되는 메뉴는 추가할 수 없다.


- 품절 상태 메뉴의 마크업
*/

import { $ } from "./utils/dom.js";
import store from "./store/index.js";
import MenuApi from "./api/index.js";

// 상태(변할 수 있는 데이터, 이 앱에서 변하는 것이 무엇인가.) - 메뉴명, 총 갯수(굳이 상태 관리 하지 않아도 됨.)
function App() {
  // 메뉴가 여러개가 될 수 있기에 배열로 초기화.
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = "espresso";

  this.init = async () => {
    // this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
    //   this.currentCategory
    // );
    render();
    initEventLiseners();
  };
  const render = async () => {
    this.menu[this.currentCategory] = await MenuApi.getAllMenuByCategory(
      this.currentCategory
    );

    const template = this.menu[this.currentCategory]
      .map((item) => {
        return `
    <li data-menu-id="${
      item.id
    }" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${item.isSoldOut ? "sold-out" : ""} ">${
          item.name
        }</span>
      
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
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
      })
      .join("");

    $("#menu-list").innerHTML = template;
    //const menuCount = li 개수를 카운팅 해서 총 개수 반환
    countMenuUpdate();
  };

  //리팩터링을 위한 함수 모음.
  const countMenuUpdate = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  // 메뉴의 입력 받는 상태.
  const addMenuName = async (e) => {
    if ($("#menu-name").value === "") {
      alert("값을 입력해주세요.");
      return; // 구문을 빠져나오기 위해 return 해줘야 아래 스크립트가 실행되지 않음.
    }

    const duplicatedItem = this.menu[this.currentCategory].find(
      (menuItem) => menuItem.name === $("#menu-name").value
    );
    console.log(duplicatedItem);
    if (duplicatedItem) {
      alert("이미 등록된 메뉴입니다. 다시 입력해주세요.");
      $("#menu-name").value = ""; // 검색창 초기화.
      return;
    }

    // await fetch(`${BASE_URL}/category/${this.currentCategory}/menu`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: menuName }),
    // }).then((response) => {
    //   return response.json();
    // });

    const menuName = $("#menu-name").value;
    await MenuApi.createMenu(this.currentCategory, menuName);
    render();
    $("#menu-name").value = "";

    // this.menu[this.currentCategory].push({ name: menuName });
  };

  // 메뉴를 수정 하는 기능.
  const fixedMenuUpdate = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    // e의 값으로 오는 li 태그 중 가장 가까운 부모 태그 할당.
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴명을 수정하세요.", $menuName.innerText);
    await MenuApi.updateMenu(this.currentCategory, updatedMenuName, menuId);

    render();
  };

  // 메뉴를 삭제 하는 기능.
  const removeMenuName = async (e) => {
    // confirm() : 확인 == true, 취소 == false를 반환하는 메소드
    if (confirm("이 메뉴를 삭제 하시갰습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MenuApi.deleteMenu(this.currentCategory, menuId);
      // this.menu[this.currentCategory].splice(menuId, 1);
      // store.setLocalStorage(this.menu);
      render();
    }
  };
  // 메뉴를 품절처리 하는 기능.
  const soldOutMenu = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MenuApi.toggleSoldOutMenu(this.currentCategory, menuId);

    // this.menu[this.currentCategory][menuId].soldOut =
    // !this.menu[this.currentCategory][menuId].soldOut;
    // store.setLocalStorage(this.menu);
    render();
  };

  const changeCategory = (e) => {
    const isCategoryButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryButton) {
      const categoryName = e.target.dataset.categoryName;
      //dataset :  data-category-name="" 에서 data 속성의 값을 가져오는 것.
      this.currentCategory = categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;

      render();
    }
  };

  const initEventLiseners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        fixedMenuUpdate(e);
        return;
        // 연속된 if문에서 계속되는 연산이 없어지도록 문을 나오기 위해 return을 적는 습관을 들이자.
      }
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault(); // form 태그가 자동으로 전송되는 걸 막아준다.
    });

    // 클릭 이벤트를 통해 입력 값을 받아오는 것.
    $("#menu-submit-button").addEventListener("click", () => addMenuName());

    // 엔터 입력이 아닐시 구문 나옴.
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }
      addMenuName();
    });

    $("nav").addEventListener("click", changeCategory);
  };
}

// App(); 일반 함수는 window 객체를 this로 참조함.

const app = new App();
//new 생성자메서드를 통해 생성된 객체의 this를 함수 객체를 참조하도록 함.
app.init();
