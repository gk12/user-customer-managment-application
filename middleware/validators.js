// check email validation
function emailval(email)
{
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// check password validation
function passwordval(password){
    if(password.length <8)
    {
        return "Password should be at least 8 characters long.";
    }
    const passtype = [/[A-Z]/, /[a-z]/, /\d/, /[@#$%^&!]/];
    
    if (passtype.every(regex => regex.test(password))) {
        return "Password is strong";
    } else {
        return "Password should include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

}

module.exports = {
    emailval,
    passwordval
}