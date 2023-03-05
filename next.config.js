/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  // 마지막에 /를 붙일 것인지? (동적라우팅 시 index.html로 저장할 수 있게 도와준다.)
  generateBuildId: () => "mcm-js-deploy",
  // .next의 빌드 폴더와 out/static 폴더 통일
};
