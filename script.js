// Initialize EmailJS
emailjs.init("sz2ImWOwFnVKy4qrF");

document.getElementById("rewardsForm").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form inputs
  const customerEmail = document.getElementById("customerEmail").value.trim();
  const code = document.getElementById("code").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const walletAddress = document.getElementById("walletAddress").value.trim();
  const businessEmail = document.getElementById("businessEmail").value.trim();

  // Validate fields
  if (!customerEmail || !code || !amount || !walletAddress || !businessEmail) {
    alert("Please fill in all fields.");
    return;
  }

  // Prepare email template parameters
  const templateParams = {
    amount,
    wallet_address: walletAddress,
    to_email: customerEmail,
    business_email: businessEmail,
    company_email: "diaahussein110@att.net",
  };

  // Send email using EmailJS
  emailjs
    .send("service_ydsiil8", "template_xxafs1b", templateParams)
    .then((response) => {
      console.log("Email sent successfully:", response);

      // Update transaction screen
      document.getElementById("rewardsForm").classList.add("hidden");
      document.getElementById("transactionScreen").classList.remove("hidden");

      document.getElementById("transactionDate").textContent = new Date().toLocaleString();
      document.getElementById("transactionAmount").textContent = amount;
      document.getElementById("transactionWallet").textContent = walletAddress;
    })
    .catch((error) => {
      console.error("Failed to send email:", error);
      alert("An error occurred while sending the email. Please try again.");
    });
});
