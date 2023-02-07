interface NavListTypes {
  name: string;
  href?: string; // 있다면 설정된 페이지로, 없다면 name 값의 lowerCase 결과인 페이지로
}

export const navList: Array<NavListTypes> = [
  { name: "Modal" },
  { name: "Slick" },
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "z" },
  { name: "c" },
  { name: "d" },
  { name: "e" },
];
