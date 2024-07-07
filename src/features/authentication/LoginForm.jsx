import {useState} from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {useLogin} from "./useLogin.js";

function LoginForm() {
    const [email, setEmail] = useState("vihanga@example.com");
    const [password, setPassword] = useState("pw12345");
    const {login, isLoading} = useLogin();

    function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) return;

        login({email, password}, {
            onSettled: () => {
                setEmail("");
                setPassword("");
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address" orientation="vertical">
                <Input type="email" id="email" autoComplete="username" value={email}
                    onChange={(e) => setEmail(e.target.value)} disabled={isLoading}
                />
            </FormRow>
            <FormRow label="Password" orientation="vertical">
                <Input type="password" id="password" autoComplete="current-password" value={password}
                    onChange={(e) => setPassword(e.target.value)} disabled={isLoading}
                />
            </FormRow>
            <FormRow orientation="vertical">
                <Button size="large" disabled={isLoading}>{!isLoading ? 'Login' : <SpinnerMini/>}</Button>
            </FormRow>
        </Form>
    );
}

export default LoginForm;
