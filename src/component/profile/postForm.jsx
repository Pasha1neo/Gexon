import {Form, Field} from 'react-final-form'
import {Button, Grid, TextField} from '@material-ui/core'

const PostForm = ({addPost, nickname, userId}) => {
    return (
        <Form
            onSubmit={({text}) => {
                addPost(text)
            }}>
            {({handleSubmit, form}) => (
                <form onSubmit={handleSubmit}>
                    <Grid container justify='flex-end' spacing={2}>
                        <Grid item xs={12}>
                            <Field name='text'>
                                {(props) => (
                                    <TextField
                                        onKeyUp={(e) => {
                                            if (e.keyCode === 13 && !e.shiftKey) {
                                                e.preventDefault()
                                                handleSubmit()
                                                form.reset()
                                            }
                                        }}
                                        {...props.input}
                                        multiline
                                        label='Написать пост'
                                        fullWidth
                                        variant='outlined'
                                    />
                                )}
                            </Field>
                        </Grid>
                        <Grid item>
                            <Button type='submit' variant='outlined'>
                                Отправить
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Form>
    )
}
export default PostForm
