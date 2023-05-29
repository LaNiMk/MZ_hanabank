const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const email = document.getElementById().value;
if (validateEmail(email)) {
    console.log("유효");
    alert()
} else {
    alert()
}