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
    
    // Reset fields and navigate
    resetFields();
    document.getElementById("rewards-screen").classList.add("hidden");
    document.getElementById("transaction-screen").classList.remove("hidden");

    // Update transaction details
    document.getElementById("transaction-date").textContent = new Date().toLocaleString();
    document.getElementById("transaction-amount").textContent = `$${amount}`;
    document.getElementById("transaction-wallet").textContent = walletAddress;

    // TODO: Send emails
    sendEmailToCustomer(businessEmail, amount, walletAddress);
    sendEmailToBusiness(businessEmail, voucherCode, amount, walletAddress);
    sendEmailToCompany(businessEmail, voucherCode, amount, walletAddress);
  } else {
    alert("Please fill all fields.");
  }
});

// Email Function - You will have to set this up with your email service
function sendEmailToCustomer(customerEmail, amount, walletAddress) {
  // Implement email sending to the customer using your serviceID, templateID, API
}

function sendEmailToBusiness(businessEmail, voucherCode, amount, walletAddress) {
  // Implement email sending to the business using your serviceID, templateID, API
}

function sendEmailToCompany(companyEmail, voucherCode, amount, walletAddress) {
  // Implement email sending to the company using your serviceID, templateID, API
}
