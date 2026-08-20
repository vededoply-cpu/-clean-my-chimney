// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        console.log('Form Data:', { name, email, message });
        
        // Show success message
        const form = this;
        form.style.display = 'none';
        document.getElementById('successMessage').classList.add('success');
        
        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            document.getElementById('successMessage').classList.remove('success');
        }, 2000);
    }
});