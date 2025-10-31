import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// import path from "path";

export default defineConfig({
  //issue #10455 Cannot read properties of null (reading 'useContext') #10455
  //Vite의 HMR(핫 리로드) 또는 의존성 최적화 이후 컨텍스트가 null로 초기화되면서 useContext 에러가 발생합니다.
  // npm install some-package  이후 개발 중에 HMR(핫 리로드) 시 컨텍스트 깨짐을 예방
  // optimizeDeps: {
  //   include: ["react", "react-dom", "react-router"], // HMR 중 항상 동일 인스턴스를 사용
  // },
  // resolve: {
  //   dedupe: ["react", "react-dom", "react-router"], // 중복 번들 방지
  // },
  //dedupe가 핵심입니다. HMR 시 중복된 React 인스턴스 때문에 useContext가 깨지는 문제를 방지합니다.
  // server: {
  //   hmr: false
  // },
//| 패키지                 | 용도          | 특징                                         | HMR 안정성       |
// | ------------------- | ----------- | ------------------------------------------ | ------------- |
// | `react-router`      | 안정 버전       | core routing, v6 스타일 nested route          | 안정적           |
// | `react-router-dom`  | 브라우저 환경     | v6, `<Routes>` + `<Route>`                 | 안정적           |
// | `@react-router/dev` | 개발용 dev 패키지 | 파일 기반 라우팅, `route()`/`layout()`/`prefix()` | **HMR 깨짐 가능** |


  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // resolve: {
  //   alias: {
  //     // "@": path.resolve(__dirname, 'app'),
  //     "~": path.resolve(__dirname, 'app'),
  //   },
  // },
});
