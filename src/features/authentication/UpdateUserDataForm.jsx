import {useState} from 'react';
import {useUpdateUser} from './useUpdateUser';
import {useUser} from "./useUser.js";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Button from "../../ui/Button.jsx";

function UpdateUserDataForm() {
    // We don't need the loading state
    const {
        user: {
            email,
            user_metadata: {fullName: currentFullName},
        },
    } = useUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    const {updateUser, isLoading: isUpdating} = useUpdateUser();

    function handleSubmit(e) {
        e.preventDefault();
        if (!fullName) return;

        updateUser(
            {fullName, avatar},
            {
                onSuccess: () => {
                    setAvatar(null);
                    // Resetting form using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
                    e.target.reset();
                },
            }
        );
    }

    function handleCancel(e) {
        // We don't even need preventDefault because this button was designed to reset the form (remember, it has the HTML attribute 'reset')
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label='Email address'>
                <Input value={email} disabled/>
            </FormRow>
            <FormRow label='Full name'>
                <Input type='text' value={fullName} disabled={isUpdating} id='fullName'
                        onChange={(e) => setFullName(e.target.value)}
                />
            </FormRow>
            <FormRow label='Avatar image'>
                <FileInput disabled={isUpdating} id='avatar' accept='image/*'
                    onChange={(e) => setAvatar(e.target.files[0])}
                    // We should also validate that it's actually an image, but never mind
                />
            </FormRow>
            <FormRow>
                <Button onClick={handleCancel} type='reset' variation='secondary'>Cancel</Button>
                <Button disabled={isUpdating}>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
