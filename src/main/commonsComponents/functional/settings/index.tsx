// 다크모드 추가 설정 on/off
const toggleDarkMode = (on: boolean) => {
  const href = location.href;
  const isAdmin = String(href).includes("/admin");

  const body = document.body;

  if (body) {
    if (on) {
      // 다크모드 on
      body.classList.add("darkMode-body");
    } else {
      // 다크모드 off
      body.classList.remove("darkMode-body");
    }
    // 관리자 페이지는 다크모드 적용 off
    if (isAdmin) body.classList.remove("darkMode-body");
  }
};

export { toggleDarkMode };
