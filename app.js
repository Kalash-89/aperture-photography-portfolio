document.querySelector('.booking-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const statusEl = document.getElementById('form-status');
  const submitBtn = document.querySelector('.submit-btn');

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    sessionType: document.getElementById('session-type').value,
    date: document.getElementById('date').value,
    message: document.getElementById('message').value
  };

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch('http://localhost:5050/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      statusEl.textContent = '✓ Request sent! We will get back to you soon.';
      statusEl.style.color = '#C9A961';
      e.target.reset();
    } else {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    statusEl.textContent = '✗ Failed to send. Please try again.';
    statusEl.style.color = '#c0392b';
  }

  submitBtn.textContent = 'Send Request';
  submitBtn.disabled = false;
});