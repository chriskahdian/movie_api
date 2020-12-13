import React from 'react'

export default function formValidation(props) {
    const [usernameErr, setUsernameErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [emailErr, setEmailErr] = useState({});
    const formValidation = () => {
        const usernameErr = {};
        const passwordErr = {};
        const emailErr = {};
        let isValid = true;
    
        if (username.trim().length < 5) {
          usernameErr.usernameShort = "Username must be at least 5 characters";
          isValid = false;
        }
    
        if (/[^0-9a-zA-Z]/.test(username)) {
          // It has an invalid character
          usernameErr.username = "Username cannot contain symbols";
          isValid = false;
        }
    
        if (password.trim().length < 1) {
          passwordErr.passwordMissing = "You must enter a password";
          isValid = false;
        }
    
        if (!email.includes(".") && !email.includes("@")) {
          emailErr.emailNotEmail = "A valid email address is required";
          isValid = false;
        }
    
        setUsernameErr(usernameErr);
        setPasswordErr(passwordErr);
        setEmailErr(emailErr);
        return isValid;
      };
    return (
        <View>
            <Text></Text>
        </View>
    )
}
