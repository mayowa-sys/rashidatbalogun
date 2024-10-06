document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('desktopNavbar');

    function handleScroll() {
        if (window.pageYOffset > 150) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Collapse the navbar after a link is clicked
document.addEventListener('DOMContentLoaded', function () {
    const topnav = document.getElementById('myTopnav');
    const links = topnav.querySelectorAll('a:not(.icon)'); // Target all links except the icon

    links.forEach(link => {
        link.addEventListener('click', function () {
            // Collapse the navbar
            if (topnav.className.includes('responsive')) {
                topnav.className = 'topnav';
            }
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();  

    document.getElementById('error-message').textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    if (!name) {
        isValid = false;
        document.getElementById('error-message').textContent += 'Name is required.\n';
    }

    if (!email) {
        isValid = false;
        document.getElementById('error-message').textContent += 'Email is required.\n';
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            document.getElementById('error-message').textContent += 'Please enter a valid email address.\n';
        }
    }

    if (!message) {
        isValid = false;
        document.getElementById('error-message').textContent += 'Message is required.\n';
    }

    if (isValid) {
        const formData = new FormData(event.target);

        // Log form data for debugging purposes
        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            // Use a relative URL instead of hardcoded localhost
            const response = await fetch('/contact', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                alert('Email sent successfully');
                window.location.href = data.redirectUrl;
            } else {
                alert('Failed to send email. Try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending the email. Please try again.');
        }
    }
});
