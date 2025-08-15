document.addEventListener("DOMContentLoaded", () => {
    // Password Generator Logic
    const passwordInput = document.getElementById('password');
    const copyBtn = document.getElementById('copy');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const copyNotification = document.getElementById('copyNotification');
    const strengthBadge = document.getElementById('strengthBadge');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');
    const strengthText = document.getElementById('strengthText');
    const strengthBar = document.getElementById('strengthBar');
    const generateBtn = document.getElementById('generate');
    const clearBtn = document.getElementById('clear');

    const symbolChars = '!@#$%^&*()_+-={}[]|:;<>,.?/~';

    function updateLength() {
        lengthValue.textContent = lengthSlider.value;
    }
    lengthSlider.addEventListener('input', updateLength);

    function getCharset() {
        let charset = '';
        if (uppercase.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lowercase.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (numbers.checked) charset += '0123456789';
        if (symbols.checked) charset += symbolChars;
        return charset;
    }

    function generatePassword() {
        const charset = getCharset();
        const length = parseInt(lengthSlider.value);
        if (!charset) {
            passwordInput.value = '';
            updateStrength('None');
            return;
        }
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        passwordInput.value = password;
        updateStrength(getStrength(password));
    }

    generateBtn.addEventListener('click', generatePassword);

    function clearAll() {
        passwordInput.value = '';
        updateStrength('None');
    }
    clearBtn.addEventListener('click', clearAll);

    // Show/Hide password toggle
    let passwordVisible = false;
    togglePasswordBtn.addEventListener('click', () => {
        passwordVisible = !passwordVisible;
        passwordInput.type = passwordVisible ? 'text' : 'password';
        eyeIcon.textContent = passwordVisible ? '🙈' : '👁️';
    });

    copyBtn.addEventListener('click', () => {
        if (passwordInput.value) {
            navigator.clipboard.writeText(passwordInput.value);
            copyBtn.innerHTML = '<span class="icon">✅</span>';
            copyNotification.textContent = 'Password is successfully copied!';
            copyNotification.style.display = 'block';
            setTimeout(() => {
                copyBtn.innerHTML = '<span class="icon">📋</span>';
                copyNotification.style.display = 'none';
            }, 1500);
        }
    });

    function getStrength(password) {
        let score = 0;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (password.length >= 12) score++;
        if (score <= 2) return 'Weak';
        if (score === 3 || score === 4) return 'Medium';
        return 'Strong';
    }

    function updateStrength(strength) {
        let color = '#e3eaff';
        strengthBadge.textContent = strength;
        strengthBadge.classList.remove('strong', 'medium', 'weak');
        if (strength === 'Weak') {
            color = '#ef4444';
            strengthBadge.classList.add('weak');
        } else if (strength === 'Medium') {
            color = '#fbbf24';
            strengthBadge.classList.add('medium');
        } else if (strength === 'Strong') {
            color = '#22c55e';
            strengthBadge.classList.add('strong');
        }
        strengthBar.style.background = color;
    }

    // Initial setup
    updateLength();
    updateStrength('None');
});
