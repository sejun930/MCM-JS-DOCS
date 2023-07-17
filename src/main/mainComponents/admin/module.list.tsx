import AdminBlockPage from "./modules/block/block.container.tsx";
import AdminCommentsPage from "./modules/comments/admin.comments.container";

export const AdminModulesList: { [key: string]: JSX.Element } = {
  Block: <AdminBlockPage />, // 아이피 관리 페이지
  Comments: <AdminCommentsPage />, // 댓글 관리 페이지
};
