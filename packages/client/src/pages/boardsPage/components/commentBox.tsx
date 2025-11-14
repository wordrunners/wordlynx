import { FC, useState } from 'react'
import { addLike, Comment, selectBoardsData } from '@/store/boards'
import { useAuth, useAppDispatch, useAppSelector } from "@/hooks";
import { FormBox, Like } from '.'
import { Loader } from '@/components/Loader';
import '../boardPage.scss';
import { format } from "date-fns";

type Props = {
  like: boolean | undefined
  comment: Comment
  childComment: Comment[]
  userLogin: string;
}

export const CommentBox: FC<Props> = ({ like, comment, childComment, userLogin }): JSX.Element => {
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const { status } = useAppSelector(selectBoardsData)
  const formattedDate: string = format(new Date(comment?.createdAt), "dd-MM-yyyy, HH:mm");

  const clickLike = (value: boolean) => {
    if (user) {
      dispatch(
        addLike({
          isLike: value,
          commentId: comment.id,
          userId: user.id!,
          userLogin: user.login,
        })
      )
    }
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(previous => !previous)
  }

  return (
    <div className="forum__comment-box">
      {user && (
        <>
          <div className='forum__details'>
            <p className='forum__text forum__text_login'>{userLogin}</p>
            <p className="forum__date">{formattedDate}</p>
            <Like
              color={like ? '#dedc00' : 'grey'}
              onClick={() => clickLike(!like)}
            />
          </div>
          <p className='forum__text'>{comment.comment}</p>

          {!comment.parent_id && (
            <p onClick={handleOpen} className='forum__comments-counter'>
              {!open ? (!childComment?.length ? 'Reply' : 'Replies: ' + childComment?.length) : 'Hide'}
            </p>
          )}

          {open && (
            status !== 'FETCH_FULFILLED' ? (
              <Loader />
            ) : (
              <>
                {childComment?.length ? (
                  <div className='forum__answers'>
                    Replies:
                    {childComment?.map(comment => {
                      return (
                        <div key={`comment-${comment.id}`}>
                          <p className='forum__text forum__text_login'>{comment.user_login}</p>
                          <p className='forum__text'>{comment.comment}</p>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  null
                )}
                <FormBox
                  parentId={comment.id}
                  boardId={comment.board_id}
                />
              </>
            )
          )}
        </>
      )}
    </div>
  )
}
