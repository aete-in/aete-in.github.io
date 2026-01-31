export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const handlePayment = async (name, email, phone, price, description, onSuccess) => {
    const res = await loadRazorpay();

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
    }

    const key = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!key || !key.startsWith('rzp_')) {
        alert('Invalid Razorpay Key ID. It should start with "rzp_test_" or "rzp_live_". Please check your .env file.');
        return;
    }

    const options = {
        key: key,
        amount: price * 100, // Amount in paise
        currency: "INR",
        name: "AETE Platform",
        description: description || "Platform Access Fee",
        image: "/logo.png",
        handler: function (response) {
            onSuccess(response.razorpay_payment_id);
        },
        prefill: {
            name: name,
            email: email,
            contact: phone || ""
        },
        notes: {
            address: "AETE Corporate Office"
        },
        theme: {
            color: "#002D62"
        }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};
