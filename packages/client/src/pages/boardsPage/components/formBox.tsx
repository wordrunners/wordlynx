import { FC } from 'react'
import { Formik, Field, Form } from 'formik';
import { useAuth, useAppDispatch } from "@/hooks";
import { getComments, addComment } from '@/store/boards'
import { Loader } from '@/components/Loader';
import { Button } from '@/components/Button';
import '../boardPage.scss';

type Props = {
  parentId: number | null
  boardId: number
}

export const FormBox: FC<Props> = ({ parentId, boardId }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const onSubmit = (value: { comment: string }) => {
    if (user) {
      dispatch(
        addComment({
          parentId: parentId,
          boardId: boardId,
          userId: user.id!,
          userLogin: user.login,
          comment: value.comment,
        })
      ).then(() => {
        return dispatch(getComments({ id: boardId }))
      })
    }
  }

  if (user) {
    const initial = {
      parentId: parentId,
      boardId: boardId,
      userId: user.id,
      userLogin: user.login,
      comment: '',
    }

    return (
      <Formik
        initialValues={initial}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="forum__form forum__form_comments">
            {parentId ? (
              <>
                <Field
                  id="newComment"
                  name="comment"
                  title="newComment"
                  type='text'
                  placeholder="Reply"
                  key="newComment"
                  className="forum__field forum__field_answer"
                />
                <Button type="submit" className="forum__button forum__button_comments">Reply</Button>
              </>
            ) : (
              <>
                <Field
                  id="newComment"
                  name="comment"
                  title="newComment"
                  type='text'
                  placeholder="Comment"
                  key="newComment"
                  className="forum__field forum__field_comments"
                />
                <Button type="submit" className="forum__button forum__button_comments">
                  Comment
                </Button>
              </>
            )
            }
          </Form>
        )}
      </Formik>
    )
  } else {
    return (
      <Loader />
    )
  }
}
