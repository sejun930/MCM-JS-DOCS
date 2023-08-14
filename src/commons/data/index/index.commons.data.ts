// 목차 리스트 기본형
export const initIndexList = (module: string) => [
  { title: `📖 ${module}`, id: "main-title-form" },
  { title: "🔍 How To Use", id: "how-use-form" },
  { title: "📝 Example", id: "example-form" },
  { title: "📤 Props List", id: "props-form" },
  { title: "📂 Module Tree", id: "tree-form" },
  { title: "🌟 Comments", id: "comments-form" },
];

// 모듈별 목차 리스트
export const moduleIndexList = (module: string, vers: number) => {
  const list: { [key: string]: () => Array<{ title: string; id: string }> } = {
    Modal: () => {
      const list = initIndexList(module);
      if (vers === 1) {
        list.splice(3, 0, {
          title: "🏷 Functional",
          id: "functional-form",
        });
      }

      return list;
    },
  };

  return list[module];
};
