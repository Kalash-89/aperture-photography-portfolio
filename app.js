document.querySelector('.booking-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const statusEl = document.getElementById('form-status');
  const submitBtn = document.querySelector('.submit-btn');

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    sessionType: document.getElementById('session-type'),
    date: document.getElementById('date'),
    message: document.getElementById('message')
  };

  // Clear previous errors
  ['name', 'email', 'phone', 'session-type', 'date'].forEach(id => {
    document.getElementById(id + '-error').textContent = '';
    document.getElementById(id).classList.remove('invalid');
  });
  statusEl.textContent = '';

  let isValid = true;

  // Name validation
  if (fields.name.value.trim().length < 2) {
    document.getElementById('name-error').textContent = 'Please enter your full name';
    fields.name.classList.add('invalid');
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.email.value.trim())) {
    document.getElementById('email-error').textContent = 'Please enter a valid email address';
    fields.email.classList.add('invalid');
    isValid = false;
  }

  // Phone validation (10 digits)
  const phoneDigits = fields.phone.value.replace(/\D/g, '');
  if (phoneDigits.length !== 10) {
    document.getElementById('phone-error').textContent = 'Phone number must be 10 digits';
    fields.phone.classList.add('invalid');
    isValid = false;
  }

  // Session type validation
  if (!fields.sessionType.value) {
    document.getElementById('session-type-error').textContent = 'Please select a session type';
    fields.sessionType.classList.add('invalid');
    isValid = false;
  }

  // Date validation (must be today or future)
  const selectedDate = new Date(fields.date.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!fields.date.value) {
    document.getElementById('date-error').textContent = 'Please select a date';
    fields.date.classList.add('invalid');
    isValid = false;
  } else if (selectedDate < today) {
    document.getElementById('date-error').textContent = 'Date cannot be in the past';
    fields.date.classList.add('invalid');
    isValid = false;
  }

  if (!isValid) {
    statusEl.textContent = 'Please fix the errors above';
    statusEl.style.color = '#c0392b';
    return;
  }

  const formData = {
    name: fields.name.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    sessionType: fields.sessionType.value,
    date: fields.date.value,
    message: fields.message.value.trim()
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