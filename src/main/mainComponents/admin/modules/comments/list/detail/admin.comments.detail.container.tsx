import AdminCommentsDetailUIPage from "./admin.comments.detail.presenter";

import {
  CommentsAllInfoTypes,
  InfoTypes,
} from "src/main/commonsComponents/units/template/form/comments/comments.types";
import { FetchCommentsTypes } from "../../admin.comments.types";
import { WriteInfoTypes } from "src/main/commonsComponents/units/template/form/comments/write/comments.write.types";

import blockApis from "src/commons/libraries/apis/block/block.apis";
import commentsApis from "src/commons/libraries/apis/comments/comments.apis";
// import { checkAccessToken } from "src/main/commonsComponents/withAuth/check";
import adminApis from "src/commons/libraries/apis/admin/admin.apis";
import { AdminLoginTypes } from "src/commons/store/store.types";

export default function AdminCommentsDetailPage({
  info,
  commentsInfo,
  changeLoading,
  fetchComments,
  adminLoginInfo,
}: {
  info: InfoTypes;
  commentsInfo: CommentsAllInfoTypes;
  changeLoading: (bool: boolean) => void;
  adminLoginInfo: AdminLoginTypes;
} & FetchCommentsTypes) {
  // 이미 삭제된 댓글인지 체크
  const isAlreadyDeleted = info.deletedAt !== null;

  // 댓글 삭제하기
  const removeComments = async (isBlock: boolean) => {
    // 관리자 권한 체크
    if (!(await adminApis().check(true))) return;
    // 삭제일 경우 이미 삭제된 게시물인지 체크
    if (!isBlock && info.deletedAt) return;
    // 테스트 모드일 경우 사용 불가
    if (adminLoginInfo.isTest)
      return alert("테스트 로그인 상태에서는 조회만 가능합니다.");

    let msg = "해당 댓글을 삭제하시겠습니까?";
    if (isBlock)
      msg = "해당 유저를 차단하시겠습니까? \n댓글은 자동으로 삭제됩니다.";

    if (window.confirm(msg)) {
      changeLoading(true);
      const _info: WriteInfoTypes = { ...(info as WriteInfoTypes) };
      let ableBlock = isBlock; // 차단 가능 여부

      try {
        // 댓글 삭제하기
        const removeResult = await (
          await commentsApis({
            module: commentsInfo.selectModule,
            ip: _info.ip,
            isAdmin: true,
          })
        ).removeComments({
          input: _info,
          password: "",
          updateCategory: true,
        });

        if (removeResult.msg) {
          // 삭제 실패
          alert(removeResult.msg);
        } else if (isBlock) {
          // 삭제 성공, 차단이라면 유저까지 차단
          if (!(await blockApis().checkBlock(_info.ip)).isBlock) {
            try {
              // 차단되지 않은 유저일 경우에만 차단
              const { ip, contents, category } = info;

              // 유저 차단하기
              await blockApis().block({
                commentId: info.id,
                ip,
                contents,
                category,
                module: commentsInfo.selectModule,
              });
            } catch (blockErr) {
              console.log(blockErr);
              alert("유저 차단에 실패했습니다.");
            }
          } else {
            // 차단된 유저일 경우
            alert("이미 차단된 유저입니다.");
            ableBlock = false;
          }
        }

        fetchComments({
          info: commentsInfo,
          alertMsg:
            isBlock && ableBlock
              ? "차단이 완료되었습니다."
              : "댓글 삭제가 완료되었습니다.",
        });
      } catch (err) {
        console.log(err);
        alert(`${isBlock ? "유저 차단" : "댓글 삭제"}에 실패했습니다.`);
      }
    }
  };

  return (
    <AdminCommentsDetailUIPage
      info={info}
      commentsInfo={commentsInfo}
      isAlreadyDeleted={isAlreadyDeleted}
      removeComments={removeComments}
      changeLoading={changeLoading}
      fetchComments={fetchComments}
      adminLoginInfo={adminLoginInfo}
    />
  );
}
