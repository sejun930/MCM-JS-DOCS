// 예시용 컴포넌트들에 적용되는 타입
export interface ModalExampleCommonsTypes {
  isShow: Array<boolean>;
  openModal: (idx: number) => () => void;
  closeModal: (idx: number) => () => void;
}

// 추가적으로 붙는 예시용 모달 타입
export interface ModalExampleInitTypes {
  showBGAnimation?: boolean;
  showModalOpenAnimation?: boolean;
  styles?: { width?: string; height?: string };
  mobileDefaultStyles?: { width?: string; height?: string };
}

// // 전체의 타입에 물음표를 붙여준다.
// type test1 = Partial<TestTypes>;
// // 전체의 타입을 필수 타입으로 변경한다.
// type test2 = Required<TestTypes>;
// // 전체 타입안에서 필요한 타입만 꺼내온다.
// type test3 = Pick<TestTypes, "name" | "age">;
// // 전체 타입안에서 해당 타입만 제외한다.
// type test4 = Omit<TestTypes, "name">;
// // 원하는 타입을 직접 지정한다. (유니온 타입)
// type test5 = "name" | "age";

// type test6 = Record<test5, TestTypes>;

// type test7 = keyof TestTypes;
// const aa: test7 = "name";
