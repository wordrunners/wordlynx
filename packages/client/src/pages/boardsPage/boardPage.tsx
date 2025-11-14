import { FC, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useAuth, useAppDispatch, useAppSelector } from "@/hooks";
import {
  getComments,
  getLikes,
  getBoards,
  selectBoardsData,
} from '@/store/boards'
import { FormBox, CommentBox } from './components'
import { Loader } from "@/components/Loader";
import './boardPage.scss';
import { LinkButton } from "@/components/LinkButton";

type boardIdParams = {
  boardId?: string
}

export const BoardPage: FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const { boards, likes, comments, status } = useAppSelector(selectBoardsData)
  const { boardId } = useParams<boardIdParams>()
  const board = boards?.find(item => item.id === Number(boardId))

  useEffect(() => {
    if (user) {
      if (user.id! > 0) {
        dispatch(getComments({ id: Number(boardId) }))
        dispatch(getBoards())
        dispatch(getLikes({ id: user.id! }))
      }
    }
  }, [user])

  if ((user) && (board)) {
    return (
      <section className="forum">
        <LinkButton to='/boards' modifier='header-btn'>Back</LinkButton>
        <div className="forum__wrapper">
          <h3 className="forum__topic-title">{board.title}</h3>
          <h4 className="forum__topic-desc">{board.description}</h4>
          <div className="forum__comment-list">
            {status !== 'FETCH_FULFILLED' ? (
              <Loader />
            ) : (
              <>
                {comments?.length ? (
                  <>
                    {comments
                      ?.filter(item => item.parent_id === null)
                      .slice(0).reverse().map(comment => {
                        return (
                          <CommentBox
                            key={`CommentBox=${comment.id}`}
                            like={
                              likes?.find(
                                it => it.comment_id === comment.id
                              )?.isLike
                            }
                            comment={comment}
                            userLogin={comment?.user_login}
                            childComment={comments?.filter(
                              it => it.parent_id === comment.id
                            )}
                          />
                        )
                      })}
                  </>
                ) : (
                  <p className="forum__topic-desc">No comments</p>
                )}
              </>
            )}
          </div>
          <FormBox
            parentId={null}
            boardId={Number(boardId)}
          />
        </div>
      </section>
    )
  } else {
    return (
      <Loader />
    )
  }
}
