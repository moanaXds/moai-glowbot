// Initialize Supabase
const supabase = Supabase.createClient(
  'YOUR_SUPABASE_URL', // Replace with your Supabase project URL
  'YOUR_SUPABASE_ANON_KEY' // Replace with your Supabase anon key
);

// Smooth Scrolling for Navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = this.getAttribute('href');
  });
});

// Registration Form Handling
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Client-side validation
    if (password.length < 6) {
      errorMessage.textContent = 'Password must be at least 6 characters long';
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });

      if (error) {
        errorMessage.textContent = error.message;
      } else {
        errorMessage.textContent = 'Registration successful! Check your email to confirm.';
        errorMessage.style.color = 'green';
        registerForm.reset();
        setTimeout(() => {
          window.location.href = 'chat.html';
        }, 2000);
      }
    } catch (err) {
      errorMessage.textContent = 'An error occurred. Please try again.';
    }
  });
}

// Google Sign-In
const googleSignInButton = document.getElementById('google-signin');
if (googleSignInButton) {
  googleSignInButton.addEventListener('click', async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/chat.html' }
      });

      if (error) {
        errorMessage.textContent = error.message;
      }
    } catch (err) {
      errorMessage.textContent = 'Google sign-in failed. Please try again.';
    }
  });
}

// Password Toggle
const passwordInput = document.getElementById('password');
const toggleButton = document.getElementById('toggle-password');
if (toggleButton) {
  toggleButton.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleButton.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      toggleButton.textContent = 'Show';
    }
  });
}

// Button Animation
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.05)';
  });
  button.addEventListener('mouseout', () => {
    button.style.transform = 'scale(1)';
  });
});