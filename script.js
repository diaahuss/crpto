// Voucher Code to Amount Mapping
const vouchers = {
  "CRYPTOZ50": 50,
  "CRYPTOZ100": 100,
};

// Utility Function to Reset Fields
function resetFields() {
  document.querySelectorAll('input').forEach(input => (input.value = ""));
}

// Navigation Handlers
document.getElementById("go-to-sign-up").addEventListener("click", () => {
  resetFields();
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("sign-up-screen").classList.remove("hidden");
});

document.querySelectorAll(".back-btn").forEach(button => {
  button.addEventListener("click", () => {
    resetFields();
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
    document.getElementById("login-screen").classList.remove("hidden");
  });
});

// Login Button Handler
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (email && password) {
    alert("Login Successful");
    resetFields();
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("rewards-screen").classList.remove("hidden");
  } else {
    alert("Please enter both email and password.");
  }
});

// Sign-Up Button Handler
document.getElementById("sign-up-btn").addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("sign-up-email").value;
  const password = document.getElementById("sign-up-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (name && email && password && password === confirmPassword) {
    alert("Sign-Up Successful. Please log in.");
    resetFields();
    document.getElementById("sign-up-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
  } else {
    alert("Please fill all fields correctly and ensure passwords match.");
  }
});

// Voucher Code Input Handler
document.getElementById("voucher-code").addEventListener("input", () => {
  const voucherCode = document.getElementById("voucher-code").value;
  const amount = vouchers[voucherCode] || 0;
  document.getElementById("amount").value = amount;
});

// Rewards Submission Handler
document.getElementById("submit-reward-btn").addEventListener("click", () => {
  const voucherCode = document.getElementById("voucher-code").value;
  const amount = document.getElementById("amount").value;
  const walletAddress = document.getElementById("wallet-address").value;
  const businessEmail = document.getElementById("business-email").value;

  if (voucherCode && amount && walletAddress && businessEmail) {
    alert("Reward Submitted Successfully!");
    resetFields();
    document.getElementById("rewards-screen").classList.add("hidden");
    document.getElementById("transaction-screen").classList.remove("hidden");

    // Update transaction details
    document.getElementById("transaction-date").textContent = new Date().toLocaleString();
    document.getElementById("transaction-amount").textContent = `$${amount}`;
    document.getElementById("transaction-wallet").textContent = walletAddress;

    // Send email to customer
    sendEmailToCustomer({ name: name, amount: amount, wallet: walletAddress });

    // Send email to company
    sendEmailToCompany({ name: name, code: voucherCode, amount: amount, wallet: walletAddress, businessEmail: businessEmail });

    // Send email to the company's bank (if needed, can be set later)
    // sendEmailToBank({ name: name, code: voucherCode, amount: amount, wallet: walletAddress, businessEmail: businessEmail });
  } else {
    alert("Please fill all fields.");
  }
});

// Function to Send Email to Customer
function sendEmailToCustomer(details) {
  const emailDetails = {
    serviceID: "service_ydsiil8",
    templateID: "template_y0f3pw9",
    userID: "sz2ImWOwFnVKy4qrF",
    template_params: {
      name: details.name,
      amount: details.amount,
      wallet: details.wallet,
      note: "Your submission has been successfully recorded. Please allow some time for the processing of your rewards.",
    }
  };
  
  EmailJS.send(emailDetails.serviceID, emailDetails.templateID, emailDetails.template_params, emailDetails.userID)
    .then((response) => {
      console.log('Email sent successfully to customer:', response);
    }, (error) => {
      console.error('Error sending email to customer:', error);
    });
}

// Function to Send Email to Company
function sendEmailToCompany(details) {
  const emailDetails = {
    serviceID: "service_ydsiil8",
    templateID: "template_y0f3pw9",
    userID: "sz2ImWOwFnVKy4qrF",
    template_params: {
      name: details.name,
      code: details.code,
      amount: details.amount,
      wallet: details.wallet,
      businessEmail: details.businessEmail,
      note: "The app was used, and the customer has requested coins. Please transfer the amount to your bank account."
    }
  };
  
  EmailJS.send(emailDetails.serviceID, emailDetails.templateID, emailDetails.template_params, emailDetails.userID)
    .then((response) => {
      console.log('Email sent successfully to company:', response);
    }, (error) => {
      console.error('Error sending email to company:', error);
    });
}
