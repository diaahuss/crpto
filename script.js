// Constants for EmailJS
const serviceID = "service_ydsiil8"; // Your EmailJS service ID
const templateID = "template_y0f3pw9"; // Template ID for the email
const apiKey = "sz2ImWOwFnVKy4qrF"; // EmailJS API Key

const companyEmail = "diaahussein110@gmail.com"; // Company email

// Utility function to reset all input fields and states
function resetFields() {
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.getElementById('balance').innerText = 'Balance: $0.00';
}

// Initialize EmailJS
emailjs.init(apiKey);

// Email preparation and sending functions
function prepareEmail(type, data) {
  let templateParams = {};

  if (type === 'customer') {
    templateParams = {
      to_email: data.customerEmail,
      amount: data.amount,
      wallet: data.wallet,
      note: "Thank you for using our rewards system! Your coins have been successfully sent to your wallet."
    };
  } else if (type === 'company') {
    templateParams = {
      to_email: companyEmail,
      name: data.name,
      amount: data.amount,
      wallet: data.wallet,
      business_email: data.businessEmail,
      note: "A customer has used the app, and they want their coins. Please transfer the amount to the company bank account."
    };
  } else if (type === 'business') {
    templateParams = {
      to_email: data.businessEmail,
      name: data.name,
      code: data.code,
      amount: data.amount,
      wallet: data.wallet,
      note: "Please process this request and transfer the amount to the company bank account."
    };
  }

  // Send the email using EmailJS
  emailjs.send(serviceID, templateID, templateParams)
    .then(response => {
      console.log(`Email to ${type} sent successfully:`, response);
      alert(`Email sent to ${type} successfully!`);
    })
    .catch(error => {
      console.error(`Error sending email to ${type}:`, error);
      alert(`Failed to send email to ${type}. Please try again.`);
    });
}

// Event listener for the submit button on the rewards form
document.getElementById('submit-reward-btn').addEventListener('click', () => {
  const amount = document.getElementById('amount').value.trim();
  const walletAddress = document.getElementById('wallet-address').value.trim();
  const businessEmail = document.getElementById('business-email').value.trim();
  const customerEmail = document.getElementById('customer-email').value.trim();
  const customerName = document.getElementById('customer-name').value.trim();

  if (!amount || !walletAddress || !businessEmail || !customerEmail || !customerName) {
    alert('Please fill all fields.');
    return;
  }

  const data = {
    amount,
    wallet: walletAddress,
    businessEmail,
    customerEmail,
    customerName
  };

  // Prepare and send the email to business and company
  prepareEmail('business', data);
  prepareEmail('company', data);

  // Prepare and send the confirmation email to the customer
  prepareEmail('customer', data);

  // Display transaction details
  document.getElementById('transaction-date').innerText = new Date().toLocaleString();
  document.getElementById('transaction-amount').innerText = `$${amount}`;
  document.getElementById('transaction-wallet').innerText = walletAddress;

  // Reset fields and show the transaction screen
  resetFields();
  document.getElementById('submit-rewards-screen').classList.add('hidden');
  document.getElementById('transaction-screen').classList.remove('hidden');
});

// Navigation handlers (back buttons)
document.getElementById('back-to-login').addEventListener('click', () => {
  resetFields();
  document.getElementById('sign-up-screen').classList.add('hidden');
  document.getElementById('open-screen').classList.remove('hidden');
});

document.getElementById('back-to-open').addEventListener('click', () => {
  resetFields();
  document.getElementById('submit-rewards-screen').classList.add('hidden');
  document.getElementById('open-screen').classList.remove('hidden');
});

document.getElementById('back-to-submit').addEventListener('click', () => {
  resetFields();
  document.getElementById('transaction-screen').classList.add('hidden');
  document.getElementById('submit-rewards-screen').classList.remove('hidden');
});
