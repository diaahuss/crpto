// Constants for EmailJS
const serviceID = "service_ydsiil8"; // Your EmailJS service ID
const templateIDBusiness = "template_xxafs1b"; // Template ID for business email
const templateIDCompany = "template_xxafs1b"; // Template ID for company email (same as business)
const templateIDCustomer = "template_abcd1234"; // Template ID for customer email
const apiKey = "sz2ImWOwFnVKy4qrF"; // EmailJS API Key

const companyEmail = "diaahussein110@gmail.com"; // Company email

const vouchers = {
  "CRYPTOZ50": 50,
  "CRYPTOZ100": 100,
};

// Utility function to reset all input fields and states
function resetFields() {
  document.querySelectorAll('input').forEach(input => input.value = '');
  document.getElementById('balance').innerText = 'Balance: $0.00';
}

// Initialize EmailJS
emailjs.init(apiKey);

// Navigation handlers
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  if (email && password) {
    document.getElementById('open-screen').style.display = 'none';
    document.getElementById('submit-rewards-screen').style.display = 'block';
  } else {
    alert('Please enter email and password.');
  }
});

document.getElementById('go-to-sign-up').addEventListener('click', () => {
  resetFields();
  document.getElementById('open-screen').style.display = 'none';
  document.getElementById('sign-up-screen').style.display = 'block';
});

document.getElementById('back-to-login').addEventListener('click', () => {
  resetFields();
  document.getElementById('sign-up-screen').style.display = 'none';
  document.getElementById('open-screen').style.display = 'block';
});

document.getElementById('back-to-open').addEventListener('click', () => {
  resetFields();
  document.getElementById('submit-rewards-screen').style.display = 'none';
  document.getElementById('open-screen').style.display = 'block';
});

document.getElementById('back-to-submit').addEventListener('click', () => {
  resetFields();
  document.getElementById('transaction-screen').style.display = 'none';
  document.getElementById('submit-rewards-screen').style.display = 'block';
});

// Sign-Up handler
document.getElementById('sign-up-btn').addEventListener('click', () => {
  const email = document.getElementById('sign-up-email').value;
  const password = document.getElementById('sign-up-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (email && password && password === confirmPassword) {
    alert('Sign-Up Successful. Please Login.');
    resetFields();
    document.getElementById('sign-up-screen').style.display = 'none';
    document.getElementById('open-screen').style.display = 'block';
  } else {
    alert('Please fill all fields and ensure passwords match.');
  }
});

// Voucher handling
document.getElementById('voucher-code').addEventListener('input', () => {
  const voucherCode = document.getElementById('voucher-code').value;
  const amount = vouchers[voucherCode] || 0;
  document.getElementById('amount').value = amount;
  document.getElementById('balance').innerText = `Balance: $${amount.toFixed(2)}`;
});

document.getElementById('submit-reward-btn').addEventListener('click', () => {
  const amount = parseFloat(document.getElementById('amount').value);
  const walletAddress = document.getElementById('wallet-address').value;
  const businessEmail = document.getElementById('business-email').value;

  if (!amount || !walletAddress || !businessEmail) {
    alert('Please fill all fields.');
    return;
  }

  if (confirm('Are you sure you want to submit the rewards?')) {
    // Sending email to business
    emailjs.send(serviceID, templateIDBusiness, {
      to_email: businessEmail,
      wallet_address: walletAddress,
      amount: `$${amount.toFixed(2)}`,
    })
    .then(() => {
      console.log('Email to business sent successfully.');
      alert('Email sent to the business successfully!');
    })
    .catch(error => {
      console.error('Error sending email to business:', error);
      alert('Failed to send email to the business. Please try again.');
    });

    // Sending email to company
    emailjs.send(serviceID, templateIDCompany, {
      to_email: companyEmail,
      wallet_address: walletAddress,
      amount: `$${amount.toFixed(2)}`,
      business_email: businessEmail,
    })
    .then(() => {
      console.log('Email to company sent successfully.');
      alert('Email sent to the company successfully!');
    })
    .catch(error => {
      console.error('Error sending email to company:', error);
      alert('Failed to send email to the company. Please try again.');
    });

    // Sending confirmation email to customer
    emailjs.send(serviceID, templateIDCustomer, {
      to_email: businessEmail,
      wallet_address: walletAddress,
      amount: `$${amount.toFixed(2)}`,
    })
    .then(() => {
      console.log('Confirmation email sent to customer successfully.');
      alert('Confirmation email sent to the customer successfully!');
    })
    .catch(error => {
      console.error('Error sending email to customer:', error);
      alert('Failed to send confirmation email to customer. Please try again.');
    });

    // Display transaction details
    resetFields();
    document.getElementById('submit-rewards-screen').style.display = 'none';
    document.getElementById('transaction-screen').style.display = 'block';
    document.getElementById('transaction-date').innerText = new Date().toLocaleString();
    document.getElementById('transaction-amount').innerText = `$${amount.toFixed(2)}`;
    document.getElementById('transaction-wallet').innerText = walletAddress;
  }
});
